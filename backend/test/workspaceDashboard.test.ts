import assert from "node:assert/strict";

Object.assign(process.env, {
  NODE_ENV: "test",
  MONGODB_URI: "mongodb://127.0.0.1/workspace-dashboard-test",
  JWT_SECRET: "workspace-dashboard-test-secret-123456789",
  DISCORD_CLIENT_ID: "test-discord-client",
  DISCORD_CLIENT_SECRET: "test-discord-secret",
  DISCORD_REDIRECT_URI: "http://127.0.0.1/discord/callback",
  BOT_API_TOKEN: "workspace-dashboard-test-service-token",
  DASHBOARD_ADMIN_DISCORD_IDS: "",
  KELLA_LOCKDOWN: "false"
});

const { workspaceDashboardClient } = await import("../src/views/workspaceDashboard.js");
const { kellaDashboardHtml } = await import("../src/views/kellaDashboard.js");
const { kellaPageAssets } = await import("../src/views/kellaPage.js");
const { createApp } = await import("../src/app.js");
const { UserModel } = await import("../src/models/user.model.js");
const { env } = await import("../src/config/env.js");
const { signSessionToken } = await import("../src/middleware/auth.js");

const html = kellaDashboardHtml();
for (const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)) {
  if (match[1].trim()) new Function(match[1]);
}
for (const asset of kellaPageAssets.values()) {
  if (asset.type === "application/javascript") new Function(asset.body);
}
new Function(workspaceDashboardClient);

const escapeHtml = (value: unknown) => String(value ?? "")
  .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;").replaceAll("'", "&#39;");
const renderer = new Function("escapeHtml", workspaceDashboardClient +
  "return {render:workspaceOverviewHtml,count:wsCount};")(escapeHtml);
assert.equal(renderer.count(undefined), "—", "unavailable metrics must not become invented zeros");
assert.equal(renderer.count(null), "—");
assert.equal(renderer.count(NaN), "—");
assert.equal(renderer.count(0), "0", "a real empty count remains zero");

const future = new Date(Date.now() + 86_400_000).toISOString();
const later = new Date(Date.now() + 172_800_000).toISOString();
const past = new Date(Date.now() - 86_400_000).toISOString();
const injected = '<script>steal()</script>';
const data = {
  isAdmin: false,
  allianceName: injected,
  allianceTag: "EVO",
  summary: { totalMembers: 42, todayCheckIns: 9, activeAlerts: 2, pendingApplications: 3,
    recentAdminActions: [{type:"attack_alert",officer:"Private officer",target:"Private player",sentAt:past}] },
  events: [
    { id: "old", title: "Past event", startsAt: past },
    { id: "later", title: "Later event", startsAt: later },
    { id: "next", title: injected, description: injected, startsAt: future,
      groups: { attending: ["One", "Two", "Three"], absent: ["Four"] } },
    { id: "invalid", title: "Invalid date", startsAt: "not a date" }
  ],
  signups: [{status:"pending"}],
  tickets: [{status:"open",active:true}],
  errors: []
};
const memberView = renderer.render(data);
assert.match(memberView, /Your tools/);
assert.match(memberView, /<strong>3<\/strong> attending/);
assert.match(memberView, /<strong>1<\/strong> absent/);
assert.doesNotMatch(memberView, /Past event|Invalid date/);
assert.match(memberView, /Later event/);
assert.match(memberView, /&lt;script&gt;steal\(\)&lt;\/script&gt;/);
assert.doesNotMatch(memberView, /<script>steal/);
assert.doesNotMatch(memberView, /Needs attention|Member requests|Open tickets|Admin log|Private officer|Private player/,
  "member overview must not render private admin datasets even if accidentally supplied");
assert.match(memberView, /href="\/training-tools\?dashboard=1"/);
assert.match(memberView, /href="\/base"/);
assert.doesNotMatch(memberView, /href="\/base\?dashboard=1"/);
assert.doesNotMatch(workspaceDashboardClient, /\/api\/(?:tenants|communities|guilds|servers)/,
  "the design must use the existing community instead of pretending tenant backend support exists");

const adminView = renderer.render({ ...data, isAdmin: true,
  signups: [{status:"pending"},{status:"approved"},{status:"terminated"}],
  tickets: [{status:"open",active:true},{status:"closed",active:false},{status:"deleted",active:false}] });
assert.match(adminView, /Needs attention/);
assert.match(adminView, /Private officer/);
assert.match(adminView, /href="\/kingdom\/admin"/);
assert.match(adminView, /href="\/officer\?section=attendance&amp;kind=tickets&amp;dashboard=1"/,
  "ticket shortcut must select the existing Tickets tab rather than war alerts");
assert.match(adminView, /Member requests[\s\S]*?<b>1<\/b>/);
assert.match(adminView, /Open tickets[\s\S]*?<b>1<\/b>/);

const emptyView = renderer.render({events:[],summary:{totalMembers:0},isAdmin:false});
assert.match(emptyView, /No upcoming events are scheduled/);
assert.doesNotMatch(emptyView, /Calendar unavailable/);
const unavailable = renderer.render({isAdmin:true,errors:[{label:"Calendar",message:injected}]});
assert.match(unavailable, /Calendar unavailable/);
assert.match(unavailable, /Activity could not be loaded/);
assert.doesNotMatch(unavailable, /No recent admin activity/);
assert.match(unavailable, /Requests unavailable|Tickets unavailable/);
assert.match(unavailable, /&lt;script&gt;steal\(\)&lt;\/script&gt;/);
assert.doesNotMatch(unavailable, /You’re all caught up/,
  "unavailable data must not falsely report a clear admin queue");
const loading = renderer.render({loading:true});
assert.match(loading, /aria-busy="true"/);
assert.match(loading, /data-action="refresh-workspace" disabled/);

// Execute only an application-level function, without a fake browser or DB.
function applicationFunction(name: string) {
  const pattern = new RegExp("^      (?:async )?function " + name + "\\(", "m");
  const match = pattern.exec(html);
  assert.ok(match, `application function ${name} must exist`);
  const after = match.index + match[0].length;
  const next = /^      (?:async )?function \w+\(/m.exec(html.slice(after));
  assert.ok(next, `application function ${name} must have a following boundary`);
  return html.slice(match.index, after + next.index);
}
const makeDestination = (pathname: string, search = "", embeddedTool = false) =>
  new Function("location", "embeddedTool", applicationFunction("isWorkspaceRoute") +
    applicationFunction("workspaceDestination") + "return workspaceDestination;")(
      {origin:"https://www.kella.online",pathname,search}, embeddedTool);
const destination = makeDestination("/dashboard");
assert.equal(destination("/members?manage=1"), "/members?manage=1&dashboard=1");
assert.equal(destination("/officer?section=attendance&kind=tickets"), "/officer?section=attendance&kind=tickets&dashboard=1");
assert.equal(destination("/research#tree"), "/research?dashboard=1#tree");
for (const path of ["/", "/base", "/kingdom/admin", "/kingdom/payment", "/migration"]) {
  assert.equal(destination(path), path, `full document/public destination ${path} retains its existing flow`);
}
assert.equal(destination("https://ko-fi.com/exuz19/tiers"), "https://ko-fi.com/exuz19/tiers");
assert.equal(destination("/research?embed=1&hud=1"), "/research?embed=1&hud=1");
assert.equal(destination("/training-tools?embed=1"), "/training-tools?embed=1");
assert.equal(makeDestination("/members", "?dashboard=1")("/profile?section=lord"), "/profile?section=lord&dashboard=1");
assert.equal(makeDestination("/")("/research"), "/research", "public-home navigation is unchanged");
assert.equal(makeDestination("/research", "?dashboard=1&embed=1", true)("/training-tools?embed=1"), "/training-tools?embed=1",
  "embedded building tools keep their existing HUD without a dashboard shell");

// Sidebar items have both a bare route (active highlighting) and a complete
// href (category + dashboard context). A click must retain the complete href.
const delegatedLinkStart = html.indexOf('        const link = event.target.closest("[data-link]");');
const delegatedLinkEnd = html.indexOf('        const linkButton = event.target.closest("[data-link-button]");', delegatedLinkStart);
assert.ok(delegatedLinkStart >= 0 && delegatedLinkEnd > delegatedLinkStart);
const clickLink = new Function("event", "navigate", "openBoardDestination", html.slice(delegatedLinkStart, delegatedLinkEnd));
for (const href of ["/officer?section=attendance&kind=tickets&dashboard=1", "/members?manage=1&dashboard=1"]) {
  let navigated = "";
  let prevented = false;
  const link = {hasAttribute:(name:string)=>name==="data-workspace-item",matches:()=>false,
    getAttribute:(name:string)=>name==="href" ? href : name==="data-path" ? href.split("?")[0] : null};
  clickLink({target:{closest:()=>link},preventDefault:()=>{prevented=true;}},(path:string)=>{navigated=path;},()=>{});
  assert.equal(navigated, href, "sidebar navigation must preserve selected category/management mode");
  assert.equal(prevented, true);
  navigated = "";
  prevented = false;
  clickLink({target:{closest:()=>link},ctrlKey:true,preventDefault:()=>{prevented=true;}},(path:string)=>{navigated=path;},()=>{});
  assert.equal(navigated, "", "modified click retains browser new-tab behavior");
  assert.equal(prevented, false);
}

function loaderHarness(admin: boolean, options: {fail?:string;events?:Promise<unknown>} = {}) {
  const calls: {url:string;admin:boolean}[] = [];
  const renders: any[] = [];
  const app = {innerHTML:""};
  const location = {pathname:"/dashboard"};
  const responses: Record<string, unknown> = {
    "/api/dashboard/summary": {totalMembers:42},
    "/api/dashboard/summary/admin": data.summary,
    "/api/dashboard/events": {events:[{id:"next",title:"Next event",startsAt:future,
      attendance:{attending:["One","Two"],absent:["Three"]}}]},
    "/api/dashboard/settings": {alliance:{name:"Evolution",tag:"EVO"}},
    "/api/dashboard/settings/admin": {alliance:{name:"Evolution",tag:"EVO"}},
    "/api/dashboard/tickets": {tickets:[{status:"open",active:true}]},
    "/api/dashboard/kingdom-signups": {members:[{status:"pending"}]}
  };
  const fetchJson = async (url: string, adminHeader = false) => {
    calls.push({url,admin:adminHeader});
    if (options.fail === url) throw new Error("Private backend detail must never be shown to a member");
    if (url === "/api/dashboard/events" && options.events) return options.events;
    assert.ok(url in responses, `unexpected request ${url}`);
    return responses[url];
  };
  const deps = {app,location,state:{auth:{user:{username:"A member"}},summary:null,settings:null},
    hasAdminAccess:()=>admin,fetchJson,applyGuildHeader:()=>{},
    workspaceOverviewHtml:(view: any)=>{renders.push(structuredClone(view));return view.loading ? "Loading overview" : "Final overview";}};
  const harness = new Function("deps", "let navigationVersion=0; const {app,location,state,hasAdminAccess,fetchJson,applyGuildHeader,workspaceOverviewHtml}=deps;\n" +
    applicationFunction("loadSummary") + applicationFunction("loadDashboardEvents") + applicationFunction("loadSettings") +
    applicationFunction("attendanceGroups") + applicationFunction("renderWorkspaceDashboard") +
    "return {render:renderWorkspaceDashboard,navigate:function(){navigationVersion++;location.pathname='/research';app.innerHTML='Research page';}};")(deps);
  return {calls,renders,app,...harness};
}
const memberLoader = loaderHarness(false);
await memberLoader.render();
assert.deepEqual(memberLoader.calls.map(call=>call.url).sort(), ["/api/dashboard/events","/api/dashboard/settings","/api/dashboard/summary"].sort());
assert.ok(memberLoader.calls.every(call=>!call.admin), "member overview never sends admin headers or requests admin endpoints");
assert.equal(memberLoader.renders.at(-1).tickets, null);
assert.equal(memberLoader.renders.at(-1).signups, null);
assert.deepEqual(memberLoader.renders.at(-1).events[0].groups.attending, ["One","Two"], "existing attendance response arrays are normalized without fabricated counts");
assert.deepEqual(memberLoader.renders.at(-1).events[0].groups.absent, ["Three"]);
assert.equal(memberLoader.renders.at(-1).loading, false);

const adminLoader = loaderHarness(true,{fail:"/api/dashboard/tickets"});
await adminLoader.render();
assert.ok(adminLoader.calls.some(call=>call.url==="/api/dashboard/kingdom-signups" && call.admin));
assert.ok(adminLoader.calls.some(call=>call.url==="/api/dashboard/tickets" && call.admin));
const partial = adminLoader.renders.at(-1);
assert.equal(partial.summary.totalMembers, 42, "a ticket failure does not discard unrelated valid datasets");
assert.equal(partial.events.length, 1);
assert.equal(partial.signups.length, 1);
assert.equal(partial.tickets, null);
assert.deepEqual(partial.errors.map((error: any)=>error.label), ["Tickets"]);
assert.doesNotMatch(JSON.stringify(partial.errors), /Private backend detail/);
assert.equal(partial.loading, false);

let resolveEvents!: (value: unknown) => void;
const delayedEvents = new Promise(resolve=>{resolveEvents=resolve;});
const staleLoader = loaderHarness(false,{events:delayedEvents});
const late = staleLoader.render();
staleLoader.navigate();
resolveEvents({events:[]});
await late;
assert.equal(staleLoader.app.innerHTML, "Research page", "late overview requests must not overwrite a newly selected tool");
assert.equal(staleLoader.renders.length, 1, "only the initial loading render is allowed after navigation");

const allianceId = "aaaaaaaaaaaaaaaaaaaaaaaa";
const common = {role:"Member",allianceId,disabled:false,discordRoleIds:["1485933229168005282"]};
const users: Record<string, any> = {
  regular: {...common,_id:"regular",discordId:"regular-discord",privateSiteAccess:true},
  local: {...common,_id:"local",discordId:"local:approved",localApprovalStatus:"approved"},
  vip: {...common,_id:"vip",discordId:"vip-discord",kofiPaymentEmail:"vip@example.com",kofiPaidThrough:new Date(Date.now()+86_400_000)},
  gift: {...common,_id:"gift",discordId:"private-member:bbbbbbbbbbbbbbbbbbbbbbbb",privateSiteAccess:true},
  admin: {...common,_id:"admin",discordId:"admin-discord",discordRoleIds:["1522274495728062475"]},
  owner: {...common,_id:"owner",discordId:"owner-discord",role:"Owner",discordRoleIds:[]},
  pending: {...common,_id:"pending",discordId:"local:pending",localApprovalStatus:"pending",disabled:true}
};
(UserModel as any).findById = (id: string) => {
  const query: any = Promise.resolve(users[id] || null);
  query.select = query.populate = query.lean = () => query;
  return query;
};
const headers = (id: string, extra: Record<string, unknown> = {}) => ({cookie:`${env.SESSION_COOKIE_NAME}=${signSessionToken({
  id,discordId:users[id].discordId,role:users[id].role,allianceId,...extra
})}`});
const app = createApp();
const server = app.listen(0, "127.0.0.1");
await new Promise<void>(resolve => server.once("listening", resolve));
const base = `http://127.0.0.1:${(server.address() as any).port}`;
try {
  assert.equal((await fetch(base + "/dashboard")).status, 401, "guest cannot load private dashboard");
  for (const id of ["regular", "local"]) {
    const response = await fetch(base + "/dashboard", {headers:headers(id)});
    assert.equal(response.status, 403, `${id} retains regular-member access limits`);
    assert.match(await response.text(), /Guardian/);
    assert.equal((await fetch(base + "/dashboard?dashboard=1", {headers:headers(id)})).status, 403);
    assert.equal((await fetch(base + "/members?dashboard=1", {headers:headers(id)})).status, 200);
  }
  for (const id of ["vip", "gift", "admin", "owner"]) {
    const response = await fetch(base + "/dashboard", {headers:headers(id)});
    assert.equal(response.status, 200, `${id} can load dashboard using existing authorization`);
    assert.match(response.headers.get("cache-control") || "", /no-store/);
    assert.match(await response.text(), /workspace-dashboard\.css/);
  }
  assert.equal((await fetch(base + "/dashboard", {headers:headers("regular",{hasVipAccess:true,role:"Owner"})})).status, 403,
    "new dashboard authorization recomputes VIP/admin rights from the DB");
  users.vip.kofiPaidThrough = new Date(Date.now() - 1000);
  assert.equal((await fetch(base + "/dashboard", {headers:headers("vip")})).status, 403, "expired paid access locks the new dashboard");
  assert.equal((await fetch(base + "/dashboard", {headers:headers("pending")})).status, 401);
  assert.equal((await fetch(base + "/")).status, 200, "public cinematic homepage remains public");
} finally {
  await new Promise<void>(resolve => server.close(() => resolve()));
}

console.log("Workspace dashboard: private route access, existing authorization, generated script syntax, role-scoped requests, partial failures, stale navigation, honest data states, escaping, and contextual navigation passed.");

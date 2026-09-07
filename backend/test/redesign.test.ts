import assert from 'node:assert/strict';
import { rankMembers } from '../src/services/ranking.service.js';
import { kellaPageAssets, kellaPageHtml } from '../src/views/kellaPage.js';
import { kellaDashboardHtml } from '../src/views/kellaDashboard.js';

// Deliberately different Power and Merits leaders: limit must follow metric sort.
const members = Array.from({length:60},(_,i)=>({ign:`test-${i}`,power:60-i,statHistory:[{date:'2026-08-01',metrics:{merits:i+100}},{date:'2026-09-01',metrics:{merits:i}}]}));
assert.equal(rankMembers(members,'merits',10)[0].ign,'test-59');
assert.equal(rankMembers(members,'power',10)[0].ign,'test-0');
assert.equal(rankMembers(members,'merits',10).length,10);
assert.equal(rankMembers(members,'merits',10)[9].ign,'test-50');
assert.equal(members[0].ign,'test-0','ranking must not mutate the source roster');
assert.equal(rankMembers([{ign:'missing'},{ign:'known',power:5}],'power',10)[0].ign,'known');

assert.ok(Buffer.byteLength(kellaPageHtml)<15000,'document should not embed the application bundle');
assert.equal(kellaPageAssets.size,2);
for(const [path,item] of kellaPageAssets) {
  assert.ok(kellaPageHtml.includes(path),'each generated asset must be linked');
  if(item.type === 'application/javascript') new Function(item.body);
}
const html=kellaDashboardHtml();
function extract(name:string,nextName:string) { const a=html.indexOf(`      function ${name}(`),b=html.indexOf(`      function ${nextName}(`,a); assert.ok(a>=0&&b>a);return html.slice(a,b); }
const requiresAdmin=new Function(extract('pathRequiresAdmin','navItemHtml')+'return pathRequiresAdmin;')();
for(const route of ['/officer','/tools','/settings','/events','/embed-sender']) assert.equal(requiresAdmin(route),true,route);
for(const route of ['/','/calendar','/wiki','/members','/attendance','/research','/training-tools']) assert.equal(requiresAdmin(route),false,route);
console.log('Ranking limits, selected metric order, cached assets, syntax, and route access tests passed.');

async function verifyLateNavigation() {
  const start=html.indexOf('      async function renderWiki(');
  const end=html.indexOf('      function trainingValue',start);
  assert.ok(start>=0 && end>start);
  const app={innerHTML:'Training'};
  let resolvePages:(pages:unknown[])=>void=()=>{};
  const pending=new Promise<unknown[]>(resolve=>{resolvePages=resolve;});
  const harness=new Function('app','loadWiki','skeleton','hasWikiEditAccess',
    'let navigationVersion=0;\n'+html.slice(start,end)+'\nreturn {render:renderWiki,navigate:function(){navigationVersion++;}};'
  )(app,()=>pending,()=>{},()=>false);
  const loading=harness.render();
  harness.navigate();
  resolvePages([]);
  await loading;
  assert.equal(app.innerHTML,'Training','a late Wiki response must not overwrite the current page');
  console.log('Delayed-response navigation regression test passed.');
}
verifyLateNavigation().catch(error=>{console.error(error);process.exitCode=1;});

// Current-event choice uses the calendar day in UTC and never promotes old events.
const chooseEvent = new Function('sortedEvents','dayKey',extract('boardCurrentEvent','renderAllianceBoard')+'return boardCurrentEvent;')(
  (items:any[])=>items.slice().sort((a,b)=>Date.parse(a.startsAt)-Date.parse(b.startsAt)),
  (value:any)=>new Date(value).toISOString().slice(0,10)
);
const now=new Date('2026-09-06T12:00:00Z');
const past={id:'past',startsAt:'2026-09-05T14:00:00Z'};
const today={id:'today',startsAt:'2026-09-06T10:00:00Z'};
const next={id:'next',startsAt:'2026-09-07T14:00:00Z'};
assert.equal(chooseEvent([next,past,today],now)?.id,'today');
assert.equal(chooseEvent([past,next],now)?.id,'next');
assert.equal(chooseEvent([past],now),null);
assert.equal(chooseEvent([],now),null);
console.log('Current event selection checks passed.');

// Home exposes the tools hub only to the existing authorized admin role.
function homeForRole(admin:boolean) {
  return new Function('document','boardCurrentEvent','hasAdminAccess','escapeHtml',
    extract('renderAllianceBoard','initializeCharacterVideo')+'return renderAllianceBoard([]);'
  )({body:{classList:{contains:()=>false}}},()=>null,()=>admin,(text:string)=>text);
}
assert.match(homeForRole(true), /href="\/officer"[^>]*>[\s\S]*?<strong>Admin Tools<\/strong>/);
assert.ok(!homeForRole(false).includes('href="/officer"'));
console.log('Home admin tools visibility checks passed.');

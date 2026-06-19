const navItems = [
  { path: "/", icon: "🏠", label: "Dashboard" },
  { path: "/members", icon: "👥", label: "Members" },
  { path: "/roots-registration", icon: "⚔", label: "Roots Registration" },
  { path: "/roots-reports", icon: "📊", label: "Roots Reports" },
  { path: "/events", icon: "📅", label: "Events" },
  { path: "/alerts", icon: "🚨", label: "Alerts" },
  { path: "/shield-alerts", icon: "🛡", label: "Shield Alerts" },
  { path: "/embed-sender", icon: "✉", label: "Embed Sender" },
  { path: "/settings", icon: "⚙", label: "Settings" }
];

const modules = [
  { id: "shield", name: "Shield Alerts", badge: "Live", command: "/shield @player", description: "DM a player instantly and log the officer, player, and sent time." },
  { id: "attack", name: "Attack Alert", badge: "Critical", command: "/attack", description: "Post an alliance-wide attack alert with one-click response buttons." },
  { id: "roots", name: "Roots Registration", badge: "Core", command: "/roots", description: "14 UTC and 20 UTC availability buttons for Available, Absent, and Not Sure." },
  { id: "reports", name: "Roots Reports", badge: "Reports", command: "Dashboard", description: "Historical Roots reports with CSV, JSON, report copy, and Discord send." },
  { id: "embed", name: "Embed Sender", badge: "Admin", command: "Dashboard", description: "Build, preview, save, and send Discord embeds from the website." },
  { id: "summit", name: "Summit Registration", badge: "Fast", command: "/summit", description: "Simple Summit attendance buttons for Attending, Absent, and Not Sure." },
  { id: "checkin", name: "Daily Check-In", badge: "Activity", command: "/checkin", description: "One button daily activity tracking for weekly and inactive member reports." },
  { id: "absence", name: "Absence Notices", badge: "Modal", command: "/absence", description: "Members submit reason, start date, and end date. Officers see who is away." },
  { id: "applications", name: "Applications", badge: "Recruiting", command: "/apply", description: "Simple application modal for IGN, power, timezone, and main legion." },
  { id: "reminders", name: "Event Reminders", badge: "Auto", command: "/remind", description: "Queue reminders for Summit, Roots, Fortress, Stronghold, Pass Defense, or Behemoth." },
  { id: "members", name: "Members", badge: "Roster", command: "Dashboard", description: "Search members, see Discord ID, IGN, alliance role, attendance, and notes." },
  { id: "settings", name: "Settings", badge: "Setup", command: "Dashboard", description: "Admin key, channels, alliance label, and module switches." }
];

function navLink(item: (typeof navItems)[number]) {
  return `<a href="${item.path}" data-link data-path="${item.path}"><span>${item.icon} ${item.label}</span></a>`;
}

export function kellaDashboardHtml() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Kella Dashboard</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #08090d;
        --panel: #12141c;
        --panel-2: #0c0e14;
        --panel-3: #181b26;
        --line: #2c3343;
        --muted: #939bb0;
        --text: #f8fafc;
        --green: #4ff0aa;
        --red: #ff4565;
        --gold: #facc15;
        --blue: #8097ff;
        --pink: #ff4d75;
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        background:
          radial-gradient(circle at 10% 96%, rgba(255, 69, 101, 0.18), transparent 28%),
          radial-gradient(circle at 92% 0%, rgba(128, 151, 255, 0.13), transparent 26%),
          linear-gradient(180deg, #11131a 0%, #08090d 38%, #08090d 100%),
          var(--bg);
        color: var(--text);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      button, input, select, textarea { font: inherit; }
      button { cursor: pointer; }
      button:disabled { cursor: not-allowed; opacity: 0.62; }
      a { color: inherit; }

      .shell {
        width: min(1180px, calc(100vw - 32px));
        min-height: min(820px, calc(100vh - 32px));
        margin: 16px auto;
        display: grid;
        grid-template-columns: 245px 1fr;
        overflow: hidden;
        border: 1px solid #596170;
        border-radius: 24px;
        background: rgba(9, 11, 17, 0.96);
        box-shadow: 0 30px 90px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.08);
      }
      .shell > aside {
        border-right: 1px solid var(--line);
        background: linear-gradient(180deg, #141822 0%, #0c0e15 62%, #0b0d13 100%);
        padding: 20px 14px;
        display: flex;
        flex-direction: column;
      }

      .brand { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; padding: 0 7px; }
      .mark {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: linear-gradient(135deg, var(--pink), #9f1731);
        display: grid;
        place-items: center;
        font-weight: 1000;
        color: white;
        box-shadow: 0 0 26px rgba(255, 69, 101, 0.26);
      }
      .brand-logo {
        width: 48px;
        height: 48px;
        border-radius: 14px;
        object-fit: cover;
        background: #12141c;
        box-shadow: 0 0 26px rgba(255, 69, 101, 0.22);
      }
      .brand strong { display: block; letter-spacing: 0.02em; font-size: 16px; }
      .brand span { color: #ff92a7; font-size: 11px; text-transform: uppercase; font-weight: 900; letter-spacing: 0.08em; }

      nav { display: grid; gap: 7px; }
      nav a {
        color: #c4cbdb;
        text-decoration: none;
        border-radius: 7px;
        padding: 11px 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 900;
        font-size: 14px;
        transition: background 160ms ease, color 160ms ease, transform 160ms ease;
      }
      nav a.active, nav a:hover { background: var(--pink); color: white; transform: translateX(2px); box-shadow: 0 12px 28px rgba(255, 69, 101, 0.22); }
      .side-spacer { flex: 1; min-height: 24px; }
      .side-footer {
        margin-top: 24px;
        padding: 14px 8px 0;
        border-top: 1px solid var(--line);
        color: var(--muted);
        font-size: 12px;
        font-weight: 850;
        line-height: 1.45;
      }
      .side-footer strong { display: block; color: var(--text); font-size: 13px; margin-bottom: 4px; }

      main { padding: 0; min-width: 0; background: #090b11; }
      .topbar {
        display: grid;
        grid-template-columns: 1fr minmax(260px, 360px) auto;
        align-items: center;
        gap: 14px;
        min-height: 58px;
        border-bottom: 1px solid var(--line);
        background: rgba(12, 14, 20, 0.94);
        padding: 10px 20px;
      }
      .command-search {
        height: 34px;
        border-radius: 999px;
        padding: 0 14px;
        background: #151923;
        border-color: #33394b;
        font-size: 12px;
      }
      .top-actions { display: flex; align-items: center; gap: 8px; }
      .icon-button {
        width: 34px;
        height: 34px;
        border-radius: 9px;
        display: grid;
        place-items: center;
        background: #151923;
        color: #dbe1ef;
        border: 1px solid #343a4d;
        padding: 0;
      }
      .content { padding: 24px 20px 28px; }
      .guild { display: flex; align-items: center; gap: 14px; }
      .avatar {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: radial-gradient(circle, #facc15, #7f1d1d 62%, #111827);
        border: 2px solid #394150;
        font-weight: 1000;
      }
      .avatar-img {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #394150;
        background: #111827;
        box-shadow: 0 0 22px rgba(250, 204, 21, 0.16);
      }
      h1 { margin: 0; font-size: 22px; }
      h2 { margin: 0 0 10px; font-size: 28px; }
      h3 { margin: 0; font-size: 18px; }
      .muted { color: var(--muted); }

      .primary, .secondary, .danger, .ghost {
        border: 1px solid #343a4d;
        border-radius: 8px;
        padding: 9px 13px;
        font-weight: 900;
        text-decoration: none;
        background: #10131b;
        color: #dbeafe;
      }
      .primary { background: linear-gradient(135deg, var(--pink), #ff284f); border-color: #ff7281; color: white; box-shadow: 0 14px 28px rgba(255,69,101,0.22); }
      .secondary { background: #171b26; color: #dbeafe; }
      .danger { background: #3b1016; color: #fecdd3; border-color: #7f1d1d; }
      .ghost { background: transparent; }

      .hero { display: grid; grid-template-columns: 1fr auto; gap: 18px; align-items: end; margin-bottom: 22px; }
      .hero p { margin: 0; max-width: 840px; color: var(--muted); line-height: 1.65; font-weight: 650; }
      .toolbar { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }

      input, select, textarea {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: #252a36;
        color: var(--text);
        padding: 12px 13px;
        outline: none;
      }
      textarea { min-height: 130px; resize: vertical; line-height: 1.45; }
      label { display: grid; gap: 7px; color: #cbd5e1; font-weight: 850; font-size: 13px; }
      .search { height: 46px; max-width: 380px; }
      .form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
      .form-grid .wide { grid-column: 1 / -1; }

      .stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-bottom: 18px; }
      .stat, .card, .module-card, .table-wrap, .preview {
        background: linear-gradient(180deg, rgba(24, 27, 38, 0.98), rgba(14, 17, 25, 0.98));
        border: 1px solid var(--line);
        border-radius: 10px;
        box-shadow: 0 18px 50px rgba(0, 0, 0, 0.16);
      }
      .stat { padding: 17px; }
      .stat span { color: var(--muted); display: block; font-size: 13px; font-weight: 850; }
      .stat strong { display: block; margin-top: 8px; font-size: 27px; overflow-wrap: anywhere; }

      .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
      .two { display: grid; grid-template-columns: 1.12fr 0.88fr; gap: 18px; }
      .dashboard-main { display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: 16px; margin-bottom: 16px; }
      .panel-title { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
      .panel-title h3 { font-size: 21px; }
      .status-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      .command-chip {
        border-radius: 999px;
        padding: 6px 10px;
        background: rgba(255, 69, 101, 0.14);
        color: #ff9daf;
        border: 1px solid rgba(255, 69, 101, 0.36);
        font-size: 11px;
        font-weight: 1000;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
      .overview-panel {
        min-height: 248px;
        padding: 22px;
        overflow: hidden;
        position: relative;
        background:
          linear-gradient(180deg, rgba(10, 12, 18, 0.30), rgba(10, 12, 18, 0.92)),
          radial-gradient(circle at 54% 48%, rgba(255, 69, 101, 0.48), transparent 24%),
          linear-gradient(135deg, #101521, #0b0d13 65%);
      }
      .overview-panel:before {
        content: "";
        position: absolute;
        inset: 54px 18px 18px;
        border: 1px solid rgba(255,255,255,0.05);
        background:
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
        background-size: 26px 26px;
        opacity: 0.75;
        mask-image: linear-gradient(180deg, transparent, black 18%, black 80%, transparent);
      }
      .overview-content { position: relative; z-index: 1; display: grid; gap: 14px; height: 100%; align-content: end; }
      .overview-kpis { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
      .kpi-card { background: rgba(14,17,25,0.86); border: 1px solid rgba(255,255,255,0.09); border-radius: 10px; padding: 13px; }
      .kpi-card span { display: block; color: var(--muted); font-size: 11px; font-weight: 1000; text-transform: uppercase; letter-spacing: 0.08em; }
      .kpi-card strong { display: block; margin-top: 7px; font-size: 22px; color: var(--text); }
      .activity-card { min-height: 248px; }
      .activity-list { display: grid; gap: 10px; }
      .activity-item { display: grid; grid-template-columns: 30px 1fr; gap: 10px; align-items: start; padding: 10px; background: #0d1018; border: 1px solid #272d3d; border-radius: 9px; }
      .activity-dot { width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center; background: rgba(255,69,101,0.13); color: #ff8ca0; border: 1px solid rgba(255,69,101,0.35); font-size: 13px; }
      .activity-item strong { display: block; font-size: 13px; line-height: 1.25; }
      .activity-time { display: block; color: var(--muted); font-size: 12px; margin-top: 3px; }
      .quick-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin-bottom: 18px; }
      .quick-card { min-height: 128px; display: grid; align-content: space-between; gap: 14px; transition: transform 160ms ease, border-color 160ms ease; }
      .quick-card:hover { transform: translateY(-2px); border-color: #465069; }
      .quick-card .big { font-size: 25px; font-weight: 1000; color: var(--text); }
      .readiness { display: grid; gap: 9px; }
      .readiness-row { display: grid; gap: 6px; }
      .readiness-row span { display: flex; justify-content: space-between; gap: 10px; color: #cbd5e1; font-size: 12px; font-weight: 850; }
      .bar { height: 7px; background: #262b39; border-radius: 999px; overflow: hidden; }
      .bar i { display: block; height: 100%; background: linear-gradient(90deg, var(--green), var(--gold)); }
      .card, .preview { padding: 20px; }
      .card-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 16px; }
      .card p { color: #aeb8d3; line-height: 1.55; font-weight: 650; }

      .module-card { min-height: 168px; padding: 21px 19px; transition: transform 160ms ease, border-color 160ms ease; }
      .module-card:hover { transform: translateY(-2px); border-color: #3b445c; }
      .module-top { display: flex; justify-content: space-between; gap: 16px; align-items: flex-start; }
      .meta { margin-top: 11px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      .meta span, .meta strong, .badge {
        border-radius: 5px;
        padding: 5px 8px;
        font-size: 12px;
        font-weight: 1000;
      }
      .meta span { background: #1e2432; color: #c7d2fe; }
      .meta strong, .badge.good { background: rgba(92, 255, 200, 0.13); color: var(--green); }
      .badge.warn { background: rgba(250, 204, 21, 0.14); color: var(--gold); }
      .badge.bad { background: rgba(255, 79, 98, 0.14); color: #ff9aa5; }
      .module-card p { min-height: 58px; color: #aeb8d3; line-height: 1.45; font-weight: 700; }

      .switch {
        width: 52px;
        height: 26px;
        border: 0;
        border-radius: 999px;
        background: #202431;
        padding: 3px;
        flex: 0 0 auto;
      }
      .switch i { display: block; width: 20px; height: 20px; border-radius: 50%; background: #7f879a; }
      .switch.on i { margin-left: auto; background: var(--green); box-shadow: 0 0 18px rgba(92, 255, 200, 0.42); }
      .module-actions { display: flex; gap: 10px; align-items: center; }
      .module-actions button {
        border: 0;
        border-radius: 5px;
        background: #222737;
        color: #ff6676;
        padding: 9px 12px;
        font-weight: 1000;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }

      table { width: 100%; border-collapse: collapse; min-width: 760px; }
      th, td { padding: 14px 16px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
      th { color: #aeb8d3; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; background: #10131b; }
      td { color: #eef2ff; }
      .table-wrap { overflow-x: auto; }

      .empty, .error, .skeleton {
        border: 1px dashed #343b4f;
        border-radius: 10px;
        padding: 28px;
        color: var(--muted);
        background: rgba(16, 19, 27, 0.72);
        text-align: center;
        font-weight: 800;
      }
      .error { border-color: #7f1d1d; color: #fecdd3; }
      .locked-note {
        margin-bottom: 16px;
        border: 1px solid rgba(250, 204, 21, 0.32);
        background: rgba(250, 204, 21, 0.08);
        color: #fde68a;
        border-radius: 10px;
        padding: 13px 15px;
        font-weight: 850;
      }
      .skeleton { position: relative; overflow: hidden; min-height: 160px; }
      .skeleton:after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
        animation: shimmer 1.2s infinite;
      }
      @keyframes shimmer { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
      @keyframes spin { to { transform: rotate(360deg); } }
      .spinner {
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 2px solid currentColor;
        border-right-color: transparent;
        animation: spin 700ms linear infinite;
        vertical-align: -2px;
        margin-right: 7px;
      }

      .list { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
      .list li { background: #10131b; border: 1px solid var(--line); border-radius: 7px; padding: 12px 14px; }
      .member-cell { display: flex; align-items: center; gap: 12px; min-width: 240px; }
      .member-avatar {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        flex: 0 0 auto;
        object-fit: cover;
        background: linear-gradient(135deg, #272d3d, #111827);
        border: 1px solid #3f4659;
        color: #e5e7eb;
        font-weight: 1000;
      }
      .member-name { display: block; font-weight: 1000; color: var(--text); }
      .member-username { display: block; margin-top: 3px; color: var(--muted); font-size: 12px; font-weight: 800; }
      .players { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
      .stack { display: grid; gap: 14px; }
      .preview {
        border-left: 5px solid var(--gold);
        min-height: 220px;
      }
      .preview h3 { margin-bottom: 12px; }
      .preview .image { display: none; margin-top: 14px; width: 100%; border-radius: 8px; border: 1px solid var(--line); }
      .preview .thumb { width: 64px; height: 64px; object-fit: cover; border-radius: 8px; border: 1px solid var(--line); float: right; display: none; margin-left: 12px; }
      .preview footer { margin-top: 16px; color: var(--muted); font-size: 13px; }

      .toast-stack { position: fixed; right: 18px; bottom: 18px; z-index: 30; display: grid; gap: 10px; width: min(380px, calc(100vw - 36px)); }
      .toast { border: 1px solid var(--line); background: #151821; color: var(--text); border-radius: 9px; padding: 13px 14px; box-shadow: 0 18px 40px rgba(0,0,0,0.35); font-weight: 750; }
      .toast.success { border-color: rgba(92,255,200,0.35); }
      .toast.error { border-color: rgba(255,79,98,0.5); }

      @media (max-width: 1120px) {
        .grid, .stats, .form-grid, .quick-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .two, .players, .dashboard-main { grid-template-columns: 1fr; }
      }
      @media (max-width: 780px) {
        .shell { width: 100%; min-height: 100vh; margin: 0; border-radius: 0; grid-template-columns: 1fr; }
        .shell > aside { min-height: auto; }
        nav { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .content { padding: 20px 14px 26px; }
        .hero, .topbar { grid-template-columns: 1fr; display: grid; align-items: start; }
        .grid, .stats, .form-grid, .quick-grid, .overview-kpis { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <div class="shell">
      <aside class="sidebar">
        <div class="brand">
          <img class="brand-logo" src="/assets/kellacoin.png" alt="Kella logo" />
          <div>
            <strong>KELLA</strong>
            <span>Call of Dragons tools</span>
          </div>
        </div>
        <nav aria-label="Dashboard navigation">${navItems.map(navLink).join("")}</nav>
        <div class="side-spacer"></div>
        <div class="side-footer">
          <strong>Alliance Ops</strong>
          Fast tools for Roots, alerts, embeds, and officer reports.
        </div>
      </aside>
      <main>
        <header class="topbar">
          <div class="guild">
            <img class="avatar-img" id="guildAvatar" src="/assets/kellacoin.png" alt="Kella logo" />
            <div>
              <h1 id="guildName">Kella</h1>
              <span class="muted" id="guildTagline">Command Center</span>
            </div>
          </div>
          <input class="command-search" data-command-search placeholder="Search command tools..." />
          <div class="top-actions" aria-label="Quick actions">
            <button class="icon-button" type="button" data-link-button="/embed-sender" title="Embed Sender">+</button>
            <button class="icon-button" type="button" data-link-button="/alerts" title="Alerts">!</button>
            <button class="icon-button" type="button" data-action="refresh-current" title="Refresh">↻</button>
          </div>
        </header>
        <div class="content">
          <section id="app" aria-live="polite"><div class="skeleton">Loading Kella dashboard...</div></section>
        </div>
      </main>
    </div>
    <div id="toasts" class="toast-stack" aria-live="polite"></div>
    <script>
      const app = document.getElementById("app");
      const toasts = document.getElementById("toasts");
      const state = { summary: null, reports: [], members: [], alerts: [], settings: null, channels: null, templates: null, currentReport: null };
      const dashboardModules = ${JSON.stringify(modules)};

      function escapeHtml(value) {
        return String(value ?? "").replace(/[&<>"']/g, function(char) {
          return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char];
        });
      }

      function formatDate(value) {
        if (!value) return "Unknown";
        return new Intl.DateTimeFormat("en", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value));
      }

      function formatDateTime(value) {
        if (!value) return "Unknown";
        return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
      }

      function adminToken() {
        return localStorage.getItem("kellaAdminKey") || "";
      }

      function requestHeaders(json) {
        const headers = { accept: "application/json" };
        if (json) headers["content-type"] = "application/json";
        if (adminToken()) headers["x-dashboard-admin-token"] = adminToken();
        return headers;
      }

      function toast(message, type = "success") {
        const item = document.createElement("div");
        item.className = "toast " + type;
        item.textContent = message;
        toasts.appendChild(item);
        setTimeout(function() { item.remove(); }, 3600);
      }

      async function parseResponse(response) {
        const payload = await response.json().catch(() => ({ message: response.statusText }));
        if (!response.ok) throw new Error(payload.message || payload.error || "Request failed");
        return payload;
      }

      async function fetchJson(url, admin = false) {
        const response = await fetch(url, { headers: admin ? requestHeaders(false) : { accept: "application/json" } });
        return parseResponse(response);
      }

      async function sendJson(method, url, body, admin = false) {
        const response = await fetch(url, { method, headers: admin ? requestHeaders(true) : { accept: "application/json", "content-type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
        return parseResponse(response);
      }

      function setLoading(button, isLoading) {
        if (!button) return;
        if (isLoading) {
          button.dataset.label = button.innerHTML;
          button.disabled = true;
          button.innerHTML = '<span class="spinner"></span>Working';
        } else {
          button.disabled = false;
          button.innerHTML = button.dataset.label || button.innerHTML;
        }
      }

      async function withFeedback(button, work, successMessage) {
        setLoading(button, true);
        try {
          const message = await work();
          toast(message || successMessage);
        } catch (error) {
          toast(error.message || "Action failed", "error");
        } finally {
          setLoading(button, false);
        }
      }

      function skeleton(title) {
        app.innerHTML = '<div class="skeleton">' + escapeHtml(title) + '</div>';
      }

      function empty(message) {
        return '<div class="empty">' + escapeHtml(message) + '</div>';
      }

      function pageHeader(title, description, actions = "") {
        return '<section class="hero"><div><h2>' + title + '</h2><p>' + description + '</p></div><div class="toolbar">' + actions + '</div></section>';
      }

      function stat(label, value) {
        return '<div class="stat"><span>' + label + '</span><strong>' + escapeHtml(value) + '</strong></div>';
      }

      function moduleState(moduleId) {
        const states = state.settings?.settings?.moduleStates || {};
        return states[moduleId] !== false;
      }

      function moduleCard(module) {
        const enabled = moduleState(module.id);
        return '<article class="module-card" data-module-card="' + escapeHtml(module.id) + '">' +
          '<div class="module-top"><div><h3>' + escapeHtml(module.name) + '</h3><div class="meta"><span>' + escapeHtml(module.command) + '</span><strong>' + escapeHtml(module.badge) + '</strong></div></div>' +
          '<button class="switch ' + (enabled ? "on" : "") + '" type="button" data-action="toggle-module" data-module-id="' + escapeHtml(module.id) + '" data-module="' + escapeHtml(module.name) + '" aria-label="Toggle ' + escapeHtml(module.name) + '"><i></i></button></div>' +
          '<p>' + escapeHtml(module.description) + '</p>' +
          '<div class="module-actions"><button type="button" data-action="copy-command" data-value="' + escapeHtml(module.command) + '">Copy</button><button type="button" data-action="module-settings" data-module="' + escapeHtml(module.name) + '">Settings</button></div>' +
          '</article>';
      }

      function renderModulesGrid() {
        return '<section class="card" style="margin-top:18px"><div class="card-header"><div><h3>Modules</h3><span class="muted">Fast tools your admins can use without spreadsheets.</span></div><input class="search" data-module-search placeholder="Search modules" /></div></section>' +
          '<section class="grid" id="module-grid">' + dashboardModules.map(moduleCard).join("") + '</section>';
      }

      function setActiveNav() {
        document.querySelectorAll("[data-link]").forEach(function(link) {
          const path = link.getAttribute("data-path");
          const active = path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
          link.classList.toggle("active", active);
        });
      }

      function filterDashboardCards(term) {
        document.querySelectorAll("[data-module-card], [data-quick-card]").forEach(function(card) {
          card.style.display = card.textContent.toLowerCase().includes(term) ? "" : "none";
        });
      }

      async function loadSummary() {
        if (!state.summary) state.summary = await fetchJson("/api/dashboard/summary");
        return state.summary;
      }

      async function loadReports() {
        const data = await fetchJson("/api/dashboard/roots-reports");
        state.reports = data.reports || [];
        return state.reports;
      }

      async function loadMembers(query = "") {
        const data = await fetchJson("/api/dashboard/members" + (query ? "?q=" + encodeURIComponent(query) : ""));
        state.members = data.members || [];
        return state.members;
      }

      async function loadAlerts() {
        const data = await fetchJson("/api/dashboard/alerts");
        state.alerts = data.alerts || [];
        return state.alerts;
      }

      async function loadSettings() {
        if (!state.settings) {
          state.settings = await fetchJson("/api/dashboard/settings");
          applyGuildHeader(state.settings);
        }
        return state.settings;
      }

      async function loadChannels() {
        if (!state.channels) {
          const data = await fetchJson("/api/embed/channels", true);
          state.channels = data.channels || [];
        }
        return state.channels;
      }

      async function loadTemplates() {
        if (!state.templates) {
          const data = await fetchJson("/api/embed/templates", true);
          state.templates = data.templates || [];
        }
        return state.templates;
      }

      async function saveSettings(payload) {
        const body = payload && (payload.settings || payload.name || payload.tag || payload.timezone) ? payload : { settings: payload };
        state.settings = await sendJson("PATCH", "/api/dashboard/settings", body, true);
        applyGuildHeader(state.settings);
        return state.settings;
      }

      function applyGuildHeader(settings) {
        const alliance = settings?.alliance || {};
        const name = alliance.name || "Kella";
        const tag = alliance.tag || "COD";
        document.getElementById("guildAvatar").alt = name + " logo";
        document.getElementById("guildName").textContent = name;
        document.getElementById("guildTagline").textContent = tag + " Command Center";
      }

      function channelOptions(selected = "") {
        const channels = state.channels || [];
        const options = channels.map(function(channel) {
          return '<option value="' + escapeHtml(channel.id) + '"' + (channel.id === selected ? " selected" : "") + '>#' + escapeHtml(channel.name) + '</option>';
        }).join("");
        return '<option value="">Select channel</option>' + options;
      }

      function percent(value, total) {
        if (!total) return 0;
        return Math.max(0, Math.min(100, Math.round((Number(value || 0) / Number(total || 1)) * 100)));
      }

      function renderDashboardData(summary) {
        const roots = summary.upcomingRoots;
        const slots = roots?.slots || [];
        const slot14 = slots.find(function(slot) { return slot.slot === "14UTC"; }) || { label: "14:00 UTC", available: 0, absent: 0, unsure: 0 };
        const slot20 = slots.find(function(slot) { return slot.slot === "20UTC"; }) || { label: "20:00 UTC", available: 0, absent: 0, unsure: 0 };
        const rootsLabel = roots ? formatDate(roots.date) + " by " + roots.createdBy : "None";
        const reportPath = roots ? "/roots-reports/" + roots.id + "_14UTC" : "/roots-registration";
        const totalMembers = Number(summary.totalMembers || 0);
        const checkinPercent = percent(summary.todayCheckIns || 0, totalMembers || 1);
        const rootsResponses = slot14.available + slot14.absent + slot14.unsure + slot20.available + slot20.absent + slot20.unsure;
        const shieldCount = (summary.latestShieldAlerts || []).length;
        const adminCount = (summary.recentAdminActions || []).length;
        const activityItems = [];

        if (roots) {
          activityItems.push({
            icon: "R",
            title: "Roots registration active for " + formatDate(roots.date),
            meta: "Created by " + (roots.createdBy || "Unknown Officer")
          });
        }
        (summary.recentRegistrations || []).slice(0, 3).forEach(function(registration) {
          activityItems.push({
            icon: "V",
            title: (registration.player || "Player") + " chose " + (registration.status || "Unknown"),
            meta: (registration.slot || "Roots") + " - " + formatDateTime(registration.sentAt)
          });
        });
        (summary.latestShieldAlerts || []).slice(0, 2).forEach(function(alert) {
          activityItems.push({
            icon: "S",
            title: "Shield warning sent to " + (alert.player || "Unknown Player"),
            meta: (alert.officer || "Dashboard") + " - " + formatDateTime(alert.sentAt)
          });
        });
        (summary.recentAdminActions || []).slice(0, 3).forEach(function(action) {
          activityItems.push({
            icon: "A",
            title: (action.type || "Admin action").replaceAll("_", " "),
            meta: (action.officer || "Dashboard") + " - " + formatDateTime(action.sentAt)
          });
        });

        const activityHtml = activityItems.length
          ? '<div class="activity-list">' + activityItems.slice(0, 7).map(function(item) {
              return '<div class="activity-item"><span class="activity-dot">' + escapeHtml(item.icon) + '</span><div><strong>' + escapeHtml(item.title) + '</strong><span class="activity-time">' + escapeHtml(item.meta) + '</span></div></div>';
            }).join("") + '</div>'
          : empty("No recent alliance activity yet.");

        app.innerHTML =
          pageHeader("Dashboard", "Welcome back, Commander. Kella keeps Roots, alerts, embeds, and officer reports in one fast control room.", '<button class="secondary" data-action="sync-discord-members">Sync Data</button><button class="primary" data-link-button="/embed-sender">Direct Command</button>') +
          '<section class="dashboard-main">' +
            '<div class="card overview-panel">' +
              '<div class="overview-content">' +
                '<div class="panel-title"><div><span class="command-chip">Alliance Overview</span><h3>Command Board</h3></div><div class="status-row"><span class="badge good">' + escapeHtml(summary.botStatus) + '</span>' + (roots ? '<span class="badge warn">Roots of War</span>' : '<span class="badge bad">No Roots Active</span>') + '</div></div>' +
                '<p>Kella is tracking live alliance actions from Discord and the dashboard. Use the command tools below when officers need to move fast.</p>' +
                '<div class="overview-kpis">' +
                  '<div class="kpi-card"><span>Total Members</span><strong>' + escapeHtml(totalMembers) + '</strong></div>' +
                  '<div class="kpi-card"><span>Today Check-ins</span><strong>' + escapeHtml(summary.todayCheckIns || 0) + '</strong></div>' +
                  '<div class="kpi-card"><span>Active Alerts</span><strong>' + escapeHtml(summary.activeAlerts || 0) + '</strong></div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="card activity-card"><div class="card-header"><h3>Live Activity</h3><button class="secondary" data-link-button="/alerts">Open</button></div>' + activityHtml + '</div>' +
          '</section>' +
          '<section class="quick-grid">' +
            '<div class="card quick-card" data-quick-card><div><h3>Upcoming Roots</h3><p>' + (roots ? escapeHtml(rootsLabel) : "No Roots registration has been created yet.") + '</p></div><button class="secondary" data-link-button="' + reportPath + '">' + (roots ? "Quick View" : "Open Setup") + '</button></div>' +
            '<div class="card quick-card" data-quick-card><div><h3>Roots Availability</h3><p><strong>' + escapeHtml(slot14.label) + '</strong>: ' + slot14.available + ' available<br><strong>' + escapeHtml(slot20.label) + '</strong>: ' + slot20.available + ' available</p></div><button class="secondary" data-link-button="/roots-reports">Reports</button></div>' +
            '<div class="card quick-card" data-quick-card><div><h3>Troop Readiness</h3><div class="readiness"><div class="readiness-row"><span><b>Daily Activity</b><b>' + checkinPercent + '%</b></span><div class="bar"><i style="width:' + checkinPercent + '%"></i></div></div><div class="readiness-row"><span><b>Roots Responses</b><b>' + rootsResponses + '</b></span><div class="bar"><i style="width:' + Math.min(100, rootsResponses) + '%"></i></div></div></div></div><button class="secondary" data-link-button="/members">Members</button></div>' +
            '<div class="card quick-card" data-quick-card><div><h3>Officer Signals</h3><p><span class="big">' + (shieldCount + adminCount) + '</span><br>' + shieldCount + ' shield alerts, ' + adminCount + ' admin actions</p></div><button class="secondary" data-link-button="/shield-alerts">Shield Alerts</button></div>' +
          '</section>' +
          '<section class="stats">' +
            stat("Bot Status", summary.botStatus) +
            stat("Pending Shield Warnings", summary.pendingShieldWarnings || 0) +
            stat("Pending Applications", summary.pendingApplications || 0) +
          '</section>' +
          renderModulesGrid();
      }

      async function renderDashboard() {
        skeleton("Loading dashboard...");
        try {
          const results = await Promise.all([loadSummary(), loadSettings()]);
          renderDashboardData(results[0]);
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load dashboard data. ' + escapeHtml(error.message) + '</div>';
        }
      }

      function renderMembersTable(members) {
        if (!members.length) return empty("No members found yet.");
        return '<div class="table-wrap"><table><thead><tr><th>Member</th><th>IGN</th><th>Alliance Role</th><th>Attendance</th><th>Officer Notes</th></tr></thead><tbody>' +
          members.map(function(member) {
            const displayName = member.discordDisplayName || member.discordName || member.ign || member.discordId || "Unknown Member";
            const username = member.discordUsername || member.discordId || "";
            const avatar = member.discordAvatarUrl
              ? '<img class="member-avatar" src="' + escapeHtml(member.discordAvatarUrl) + '" alt="" loading="lazy" />'
              : '<span class="member-avatar">' + escapeHtml(displayName.slice(0, 1).toUpperCase()) + '</span>';
            return '<tr><td><div class="member-cell">' + avatar + '<span><span class="member-name">' + escapeHtml(displayName) + '</span><span class="member-username">' + escapeHtml(username ? "@" + username.replace(/^@/, "") : "No Discord username") + '</span></span></div></td><td>' + escapeHtml(member.ign) + '</td><td>' + escapeHtml(member.role) + '</td><td>' + escapeHtml(member.attendance) + '</td><td>' + escapeHtml(member.notes || "") + '</td></tr>';
          }).join("") + '</tbody></table></div>';
      }

      async function renderMembers() {
        skeleton("Loading members...");
        try {
          const members = await loadMembers();
          app.innerHTML = pageHeader("Members", "Search members and review Discord profile, IGN, alliance role, attendance, and notes.", '<input class="search" data-member-search placeholder="Search members" /><button class="secondary" data-action="sync-discord-members">Sync Data</button>') + renderMembersTable(members);
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load members. ' + escapeHtml(error.message) + '</div>';
        }
      }

      async function renderRootsRegistration() {
        skeleton("Loading Roots registration...");
        try {
          const reports = await loadReports();
          const latest = reports[0];
          app.innerHTML =
            pageHeader("Roots Registration", "Use /roots in Discord. Members click one button for 14 UTC or 20 UTC, and Kella saves one current answer per player per slot.", '<button class="primary" data-action="copy-command" data-value="/roots">Copy /roots</button>') +
            '<section class="two"><div class="card"><h3>Buttons Included</h3><p>14 UTC: ⚔ Available, ❌ Absent, ❔ Not Sure</p><p>20 UTC: ⚔ Available, ❌ Absent, ❔ Not Sure</p><p>Members can click again to update their answer.</p></div>' +
            '<div class="card"><div class="card-header"><h3>Latest Report</h3><button class="secondary" data-link-button="/roots-reports">Reports</button></div>' +
            (latest ? '<p>' + formatDate(latest.date) + ' - ' + latest.timeSlot + '</p><p>' + latest.available + ' Available, ' + latest.absent + ' Absent, ' + latest.unsure + ' Not Sure</p>' : '<p>No Roots reports yet.</p>') +
            '</div></section>';
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load Roots data. ' + escapeHtml(error.message) + '</div>';
        }
      }

      async function renderRootsReports() {
        skeleton("Loading Roots reports...");
        try {
          const reports = await loadReports();
          const rows = reports.length
            ? reports.map(function(report) {
                return '<tr><td>' + formatDate(report.date) + '</td><td>' + escapeHtml(report.timeSlot) + '</td><td>' + report.available + '</td><td>' + report.absent + '</td><td>' + report.unsure + '</td><td>' + escapeHtml(report.createdBy) + '</td><td><button class="secondary" data-link-button="/roots-reports/' + report.id + '">View Report</button></td></tr>';
              }).join("")
            : "";
          app.innerHTML =
            pageHeader("Roots Reports", "Historical Roots of War registrations grouped by Discord message and time slot.", '<button class="secondary" data-action="refresh-reports">Refresh</button>') +
            (reports.length ? '<div class="table-wrap"><table><thead><tr><th>Date</th><th>Time Slot</th><th>Available Count</th><th>Absent Count</th><th>Not Sure Count</th><th>Created By</th><th></th></tr></thead><tbody>' + rows + '</tbody></table></div>' : empty("No Roots reports yet. Run /roots in Discord to create the first one."));
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load Roots reports. ' + escapeHtml(error.message) + '</div>';
        }
      }

      function numbered(players) {
        return players.length ? players.map(function(player, index) { return (index + 1) + ". " + player; }).join("\\n") : "None";
      }

      function reportText(report) {
        return [
          "ROOTS OF WAR REPORT",
          "",
          "Date: " + formatDate(report.date),
          "Time Slot: " + report.timeSlot,
          "",
          "AVAILABLE:",
          numbered(report.available || []),
          "",
          "ABSENT:",
          numbered(report.absent || []),
          "",
          "NOT SURE:",
          numbered(report.unsure || [])
        ].join("\\n");
      }

      async function renderRootsReportDetails(id) {
        skeleton("Loading report details...");
        try {
          const data = await fetchJson("/api/dashboard/roots-reports/" + encodeURIComponent(id));
          const report = data.report;
          state.currentReport = report;
          const section = function(title, players, className) {
            return '<div class="card"><div class="card-header"><h3>' + title + '</h3><span class="badge ' + className + '">' + players.length + ' total</span></div>' +
              (players.length ? '<ul class="list">' + players.map(function(player) { return '<li>' + escapeHtml(player) + '</li>'; }).join("") + '</ul>' : empty("No players in this section.")) +
              '</div>';
          };
          let channelHtml = '<label>Discord Channel<select data-report-channel><option value="">Set Admin Key to load channels</option></select></label>';
          try {
            await loadChannels();
            channelHtml = '<label>Discord Channel<select data-report-channel>' + channelOptions() + '</select></label>';
          } catch {
            channelHtml = '<label>Discord Channel ID<input data-report-channel-manual placeholder="Paste channel ID" /></label>';
          }
          app.innerHTML =
            pageHeader("Roots Report", "Detailed Roots of War attendance list with export tools.", '<button class="secondary" data-link-button="/roots-reports">Back</button><button class="secondary" data-action="export-csv">Export CSV</button><button class="secondary" data-action="export-json">Export JSON</button><button class="primary" data-action="copy-report">Copy Report</button>') +
            '<section class="card"><div class="card-header"><h3>' + formatDate(report.date) + ' - ' + escapeHtml(report.timeSlot) + '</h3>' + (report.messageLink ? '<a class="secondary" target="_blank" rel="noreferrer" href="' + escapeHtml(report.messageLink) + '">Discord Message Link</a>' : '<span class="badge warn">No message link</span>') + '</div><p>Created By: ' + escapeHtml(report.createdBy) + '</p></section>' +
            '<section class="players" style="margin-top:18px">' +
              section("⚔ Available", report.available || [], "good") +
              section("❌ Absent", report.absent || [], "bad") +
              section("❔ Not Sure", report.unsure || [], "warn") +
            '</section>' +
            '<section class="card" style="margin-top:18px"><div class="card-header"><h3>Send Report to Discord</h3><button class="primary" data-action="send-roots-report">Send Report</button></div><div class="form-grid">' + channelHtml + '<label>Role Mention ID<input data-report-role placeholder="Optional role ID" /></label></div></section>';
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load report details. ' + escapeHtml(error.message) + '</div>';
        }
      }

      function renderEvents() {
        const commands = ["/roots", "/summit", "/attack", "/checkin", "/remind", "/absence", "/apply"];
        app.innerHTML = pageHeader("Events", "Create officer-friendly Discord workflows with one command.", "") +
          '<section class="grid">' + commands.map(function(command) {
            return '<div class="card"><div class="card-header"><h3>' + command + '</h3><button class="secondary" data-action="copy-command" data-value="' + command + '">Copy Command</button></div><p>Use this in Discord to create the matching Kella workflow.</p></div>';
          }).join("") + '</section>';
      }

      async function renderAlerts(type) {
        skeleton("Loading alerts...");
        try {
          const alerts = await loadAlerts();
          const filtered = type === "shield" ? alerts.filter(function(alert) { return alert.type === "shield_alert"; }) : alerts;
          app.innerHTML =
            pageHeader(type === "shield" ? "Shield Alerts" : "Alerts", "Recent Kella alert activity from MongoDB.", '<button class="secondary" data-action="refresh-alerts">Refresh</button>') +
            (type === "shield" ? renderShieldTool() : renderAttackTool()) +
            '<div style="height:18px"></div>' + renderAlertsTable(filtered);
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load alerts. ' + escapeHtml(error.message) + '</div>';
        }
      }

      function renderAlertsTable(alerts) {
        if (!alerts.length) return empty("No alerts recorded yet.");
        return '<div class="table-wrap"><table><thead><tr><th>Type</th><th>Officer</th><th>Target Player</th><th>Status</th><th>Time Sent</th></tr></thead><tbody>' +
          alerts.map(function(alert) {
            return '<tr><td>' + escapeHtml(alert.type) + '</td><td>' + escapeHtml(alert.officer || "") + '</td><td>' + escapeHtml(alert.player || "") + '</td><td>' + escapeHtml(alert.status || "") + '</td><td>' + formatDateTime(alert.sentAt) + '</td></tr>';
          }).join("") +
          '</tbody></table></div>';
      }

      function memberOptions() {
        return '<option value="">Select member</option>' + (state.members || []).map(function(member) {
          return '<option value="' + escapeHtml(member.id) + '">' + escapeHtml(member.ign || member.discordId) + '</option>';
        }).join("");
      }

      function renderShieldTool() {
        return '<section class="card"><div class="card-header"><h3>Send Shield Warning</h3><button class="primary" data-action="send-shield-alert">Send DM</button></div><div class="form-grid"><label>Select Member<select data-shield-member>' + memberOptions() + '</select></label><label class="wide">Custom Message Optional<textarea data-shield-message placeholder="🛡 Shield Warning\\n\\nYou may be at risk. Please check your shield immediately."></textarea></label></div></section>';
      }

      function renderAttackTool() {
        const channelSelect = state.channels
          ? '<select data-attack-channel>' + channelOptions() + '</select>'
          : '<input data-attack-channel-manual placeholder="Paste channel ID or add Admin Key in Settings" />';
        return '<section class="card"><div class="card-header"><h3>Send Attack Alert</h3><button class="primary" data-action="send-attack-alert">Send Alert</button></div><div class="form-grid"><label>Target Channel' + channelSelect + '</label><label>Role to Mention<input data-attack-role placeholder="Optional role ID" /></label><label class="wide">Message<textarea data-attack-message>🚨 ATTACK ALERT\\n\\nCome online now. There is a fight.</textarea></label></div></section>';
      }

      function embedFormValue(name) {
        return document.querySelector('[data-embed="' + name + '"]')?.value?.trim() || "";
      }

      function embedPayload() {
        return {
          channelId: embedFormValue("channelId") || embedFormValue("channelManual"),
          title: embedFormValue("title"),
          description: embedFormValue("description"),
          color: embedFormValue("color") || "#facc15",
          imageUrl: embedFormValue("imageUrl"),
          thumbnailUrl: embedFormValue("thumbnailUrl"),
          footer: embedFormValue("footer"),
          roleMentionId: embedFormValue("roleMentionId")
        };
      }

      function updateEmbedPreview() {
        const payload = embedPayload();
        const preview = document.querySelector("[data-embed-preview]");
        if (!preview) return;
        preview.style.borderLeftColor = payload.color || "#facc15";
        preview.querySelector("[data-preview-title]").textContent = payload.title || "Embed title";
        preview.querySelector("[data-preview-description]").textContent = payload.description || "Embed description will appear here.";
        preview.querySelector("[data-preview-footer]").textContent = payload.footer || "";
        const image = preview.querySelector("[data-preview-image]");
        const thumb = preview.querySelector("[data-preview-thumb]");
        image.style.display = payload.imageUrl ? "block" : "none";
        image.src = payload.imageUrl || "";
        thumb.style.display = payload.thumbnailUrl ? "block" : "none";
        thumb.src = payload.thumbnailUrl || "";
      }

      async function renderEmbedSender() {
        skeleton("Loading embed sender...");
        let channelsError = "";
        let templatesError = "";
        try { await loadChannels(); } catch (error) { channelsError = error.message || "Could not load channels."; state.channels = []; }
        try { await loadTemplates(); } catch (error) { templatesError = error.message || "Could not load templates."; state.templates = []; }
        const channelField = state.channels.length
          ? '<label>Discord Channel Select<select data-embed="channelId">' + channelOptions() + '</select></label>'
          : '<label>Discord Channel ID<input data-embed="channelManual" placeholder="Paste channel ID" /></label>';
        const templateOptions = '<option value="">Load saved template</option>' + state.templates.map(function(template) {
          return '<option value="' + escapeHtml(template.id) + '">' + escapeHtml(template.name) + '</option>';
        }).join("");
        app.innerHTML =
          pageHeader("Embed Sender", "Build a Discord embed, preview it live, save templates, and send through Kella.", '<button class="secondary" data-action="preview-embed">Preview</button><button class="secondary" data-action="save-template">Save Template</button><button class="danger" data-action="delete-template">Delete Template</button><button class="primary" data-action="send-embed">Send Embed</button>') +
          (channelsError || templatesError ? '<div class="error" style="margin-bottom:14px">' + escapeHtml(channelsError || templatesError) + '. Add your Admin Key in Settings if needed.</div>' : '') +
          '<section class="two"><div class="card stack"><div class="form-grid">' +
            '<label>Saved Template<select data-template-select>' + templateOptions + '</select></label>' +
            channelField +
            '<label>Embed Title<input data-embed="title" value="⚔ Roots of War Reminder" /></label>' +
            '<label>Embed Color<input data-embed="color" value="#facc15" /></label>' +
            '<label class="wide">Embed Description<textarea data-embed="description">Roots of War registration is now open. Please choose your availability for 14 UTC or 20 UTC.</textarea></label>' +
            '<label>Image URL<input data-embed="imageUrl" placeholder="Optional image URL" /></label>' +
            '<label>Thumbnail URL<input data-embed="thumbnailUrl" placeholder="Optional thumbnail URL" /></label>' +
            '<label>Footer Text<input data-embed="footer" value="Sent by Kella" /></label>' +
            '<label>Mention Role<input data-embed="roleMentionId" placeholder="Optional role ID" /></label>' +
          '</div></div>' +
          '<aside class="preview" data-embed-preview><img class="thumb" data-preview-thumb alt="" /><h3 data-preview-title></h3><p data-preview-description></p><img class="image" data-preview-image alt="" /><footer data-preview-footer></footer></aside></section>';
        updateEmbedPreview();
      }

      async function renderSettings() {
        skeleton("Loading settings...");
        try {
          const data = await loadSettings();
          const alliance = data.alliance || {};
          const settings = data.settings || {};
          const locked = !adminToken();
          const lockedAttr = locked ? " disabled" : "";
          app.innerHTML = pageHeader("Settings", "Saved admin preferences for Kella channels, officer roles, and enabled modules.", '<button class="primary" data-action="save-settings"' + lockedAttr + '>Save Settings</button>') +
            '<div class="locked-note" data-settings-locked-note' + (locked ? "" : ' style="display:none"') + '>Enter the admin password first. Only admins with the correct password can edit and save settings.</div>' +
            '<section class="grid" data-settings-panel>' +
              '<div class="card"><h3>Password</h3><p>Used only in this browser for admin actions.</p><input type="password" data-setting="adminKey" value="' + escapeHtml(adminToken()) + '" placeholder="Password" /></div>' +
              '<div class="card"><h3>Alliance Name</h3><p>Name shown at the top of the dashboard.</p><input data-setting="allianceName" data-admin-required value="' + escapeHtml(alliance.name || "") + '"' + lockedAttr + ' /></div>' +
              '<div class="card"><h3>Alliance Tag</h3><p>Short tag shown in the round badge.</p><input data-setting="allianceTag" data-admin-required value="' + escapeHtml(alliance.tag || "") + '"' + lockedAttr + ' /></div>' +
              '<div class="card"><h3>Announcement Channel</h3><p>Where Kella should post event announcements.</p><input data-setting="announcementChannel" data-admin-required placeholder="Channel name or ID" value="' + escapeHtml(settings.announcementChannel || "") + '"' + lockedAttr + ' /></div>' +
              '<div class="card"><h3>Attendance Channel</h3><p>Where Roots, Summit, and check-in panels should be used.</p><input data-setting="attendanceChannel" data-admin-required placeholder="Channel name or ID" value="' + escapeHtml(settings.attendanceChannel || "") + '"' + lockedAttr + ' /></div>' +
              '<div class="card"><h3>Alert Channel</h3><p>Where attack and shield alert logs should be reviewed.</p><input data-setting="alertChannel" data-admin-required placeholder="Channel name or ID" value="' + escapeHtml(settings.alertChannel || "") + '"' + lockedAttr + ' /></div>' +
              '<div class="card"><h3>Officer Roles</h3><p>Comma-separated Discord roles that can operate Kella.</p><input data-setting="officerRoles" data-admin-required value="' + escapeHtml((settings.officerRoles || []).join(", ")) + '"' + lockedAttr + ' /></div>' +
              '<div class="card"><h3>Enabled Modules</h3><p>' + dashboardModules.filter(function(module) { return moduleState(module.id); }).length + ' of ' + dashboardModules.length + ' modules enabled.</p><button class="secondary" data-link-button="/">Back to Modules</button></div>' +
            '</section>';
          syncSettingsLock();
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load settings. ' + escapeHtml(error.message) + '</div>';
        }
      }

      function syncSettingsLock() {
        if (location.pathname !== "/settings") return;
        const password = (document.querySelector('[data-setting="adminKey"]')?.value || "").trim();
        const locked = !password;
        document.querySelectorAll("[data-admin-required]").forEach(function(input) {
          input.disabled = locked;
        });
        const saveButton = document.querySelector('[data-action="save-settings"]');
        if (saveButton) saveButton.disabled = locked;
        const note = document.querySelector("[data-settings-locked-note]");
        if (note) note.style.display = locked ? "" : "none";
      }

      function readSettingsForm() {
        const value = function(name) {
          return (document.querySelector('[data-setting="' + name + '"]')?.value || "").trim();
        };
        if (!value("adminKey")) throw new Error("Password required to save settings.");
        localStorage.setItem("kellaAdminKey", value("adminKey"));
        state.channels = null;
        state.templates = null;
        return {
          name: value("allianceName"),
          tag: value("allianceTag"),
          settings: {
            announcementChannel: value("announcementChannel"),
            attendanceChannel: value("attendanceChannel"),
            alertChannel: value("alertChannel"),
            officerRoles: value("officerRoles").split(",").map(function(role) { return role.trim(); }).filter(Boolean)
          }
        };
      }

      async function route() {
        setActiveNav();
        if (!state.settings) loadSettings().catch(function() {});
        const path = location.pathname;
        state.currentReport = null;
        if (path === "/") return renderDashboard();
        if (path === "/members") return renderMembers();
        if (path === "/roots-registration") return renderRootsRegistration();
        if (path === "/roots-reports") return renderRootsReports();
        if (path.startsWith("/roots-reports/")) return renderRootsReportDetails(path.split("/").pop());
        if (path === "/events") return renderEvents();
        if (path === "/alerts") {
          await loadChannels().catch(function() { state.channels = []; });
          return renderAlerts();
        }
        if (path === "/shield-alerts") {
          await loadMembers().catch(function() {});
          return renderAlerts("shield");
        }
        if (path === "/embed-sender") return renderEmbedSender();
        if (path === "/settings") return renderSettings();
        navigate("/");
      }

      function navigate(path) {
        history.pushState({}, "", path);
        route();
      }

      document.addEventListener("click", function(event) {
        const link = event.target.closest("[data-link]");
        if (link) {
          event.preventDefault();
          navigate(link.getAttribute("data-path") || link.getAttribute("href"));
          return;
        }

        const linkButton = event.target.closest("[data-link-button]");
        if (linkButton) {
          navigate(linkButton.getAttribute("data-link-button"));
          return;
        }

        const action = event.target.closest("[data-action]");
        if (!action) return;
        const kind = action.getAttribute("data-action");
        if (kind === "copy-command") withFeedback(action, function() { return navigator.clipboard.writeText(action.getAttribute("data-value") || ""); }, "Command copied.");
        if (kind === "toggle-module") {
          const moduleId = action.getAttribute("data-module-id");
          const enabled = !action.classList.contains("on");
          withFeedback(action, async function() {
            if (!moduleId) throw new Error("Module id missing");
            const current = state.settings?.settings?.moduleStates || {};
            await saveSettings({ moduleStates: { ...current, [moduleId]: enabled } });
            action.classList.toggle("on", enabled);
          }, (action.getAttribute("data-module") || "Module") + " updated.");
        }
        if (kind === "module-settings") {
          toast((action.getAttribute("data-module") || "Module") + " settings opened.");
          navigate("/settings");
        }
        if (kind === "sync-discord-members") withFeedback(action, async function() {
          const sync = await sendJson("POST", "/api/dashboard/sync-discord-members", {}, true);
          state.summary = null;
          state.members = [];
          state.alerts = [];
          if (location.pathname === "/members") {
            await renderMembers();
          } else {
            await renderDashboard();
          }
          return "Synced " + sync.total + " Discord members (" + sync.created + " new, " + sync.updated + " updated).";
        }, "Discord members synced. Open Members to view profiles.");
        if (kind === "refresh-current") withFeedback(action, async function() {
          state.summary = null;
          state.alerts = [];
          state.reports = [];
          await route();
        }, "Page refreshed.");
        if (kind === "refresh-dashboard") withFeedback(action, async function() { state.summary = null; await renderDashboard(); }, "Dashboard refreshed.");
        if (kind === "refresh-reports") withFeedback(action, async function() { await renderRootsReports(); }, "Reports refreshed.");
        if (kind === "refresh-alerts") withFeedback(action, async function() { state.alerts = []; await loadAlerts(); await renderAlerts(location.pathname === "/shield-alerts" ? "shield" : undefined); }, "Alerts refreshed.");
        if (kind === "save-settings") withFeedback(action, async function() { await saveSettings(readSettingsForm()); }, "Settings saved.");
        if (kind === "copy-report") withFeedback(action, function() { return navigator.clipboard.writeText(reportText(state.currentReport)); }, "Report copied.");
        if (kind === "export-json") withFeedback(action, async function() { downloadBlob(new Blob([JSON.stringify(state.currentReport, null, 2)], { type: "application/json" }), "roots-report.json"); }, "JSON exported.");
        if (kind === "export-csv") withFeedback(action, async function() {
          const rows = [["Status", "Player"]];
          (state.currentReport.available || []).forEach(function(player) { rows.push(["Available", player]); });
          (state.currentReport.absent || []).forEach(function(player) { rows.push(["Absent", player]); });
          (state.currentReport.unsure || []).forEach(function(player) { rows.push(["Not Sure", player]); });
          const csv = rows.map(function(row) { return row.map(function(cell) { return '"' + String(cell).replaceAll('"', '""') + '"'; }).join(","); }).join("\\n");
          downloadBlob(new Blob([csv], { type: "text/csv" }), "roots-report.csv");
        }, "CSV exported.");
        if (kind === "send-roots-report") withFeedback(action, async function() {
          const channelId = document.querySelector("[data-report-channel]")?.value || document.querySelector("[data-report-channel-manual]")?.value || "";
          const roleMentionId = document.querySelector("[data-report-role]")?.value || "";
          await sendJson("POST", "/api/dashboard/roots-reports/" + encodeURIComponent(state.currentReport.id) + "/send", { channelId, roleMentionId }, true);
        }, "Roots report sent.");
        if (kind === "send-shield-alert") withFeedback(action, async function() {
          await sendJson("POST", "/api/dashboard/tools/shield-alert", {
            memberId: document.querySelector("[data-shield-member]")?.value || "",
            message: document.querySelector("[data-shield-message]")?.value || ""
          }, true);
          state.summary = null;
          state.alerts = [];
          await loadAlerts();
          await renderAlerts("shield");
        }, "Shield warning sent.");
        if (kind === "send-attack-alert") withFeedback(action, async function() {
          await sendJson("POST", "/api/dashboard/tools/attack-alert", {
            channelId: document.querySelector("[data-attack-channel]")?.value || document.querySelector("[data-attack-channel-manual]")?.value || "",
            roleMentionId: document.querySelector("[data-attack-role]")?.value || "",
            message: document.querySelector("[data-attack-message]")?.value || ""
          }, true);
          state.summary = null;
          state.alerts = [];
          await loadAlerts();
          await renderAlerts();
        }, "Attack alert sent.");
        if (kind === "preview-embed") withFeedback(action, async function() { updateEmbedPreview(); }, "Preview updated.");
        if (kind === "send-embed") withFeedback(action, async function() { await sendJson("POST", "/api/embed/send", embedPayload(), true); state.summary = null; }, "Embed sent.");
        if (kind === "save-template") withFeedback(action, async function() {
          const name = prompt("Template name");
          if (!name) throw new Error("Template name required");
          await sendJson("POST", "/api/embed/templates", { name, ...embedPayload() }, true);
          state.templates = null;
          await renderEmbedSender();
        }, "Template saved.");
        if (kind === "delete-template") withFeedback(action, async function() {
          const id = document.querySelector("[data-template-select]")?.value || "";
          if (!id) throw new Error("Choose a template first");
          await sendJson("DELETE", "/api/embed/templates/" + encodeURIComponent(id), undefined, true);
          state.templates = null;
          await renderEmbedSender();
        }, "Template deleted.");
      });

      document.addEventListener("change", function(event) {
        if (event.target.matches("[data-template-select]")) {
          const template = (state.templates || []).find(function(item) { return item.id === event.target.value; });
          if (!template) return;
          Object.entries({
            channelId: template.channelId,
            title: template.title,
            description: template.description,
            color: template.color,
            imageUrl: template.imageUrl,
            thumbnailUrl: template.thumbnailUrl,
            footer: template.footer,
            roleMentionId: template.roleMentionId
          }).forEach(function(entry) {
            const input = document.querySelector('[data-embed="' + entry[0] + '"]');
            if (input) input.value = entry[1] || "";
          });
          updateEmbedPreview();
        }
      });

      document.addEventListener("input", async function(event) {
        if (event.target.matches("[data-command-search]")) {
          const term = event.target.value.toLowerCase();
          if (location.pathname !== "/" && term) {
            navigate("/");
            setTimeout(function() { filterDashboardCards(term); }, 100);
          } else {
            filterDashboardCards(term);
          }
        }
        if (event.target.matches("[data-module-search]")) {
          const term = event.target.value.toLowerCase();
          document.querySelectorAll("[data-module-card]").forEach(function(card) {
            card.style.display = card.textContent.toLowerCase().includes(term) ? "" : "none";
          });
        }
        if (event.target.matches("[data-member-search]")) {
          const members = await loadMembers(event.target.value);
          const table = renderMembersTable(members);
          const current = app.querySelector(".table-wrap, .empty");
          if (current) current.outerHTML = table;
        }
        if (event.target.matches('[data-setting="adminKey"]')) syncSettingsLock();
        if (event.target.matches("[data-embed]")) updateEmbedPreview();
      });

      function downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      }

      window.addEventListener("popstate", route);
      setInterval(function() {
        if (document.hidden) return;
        if (document.activeElement && document.activeElement.matches("input, textarea, select")) return;
        if (location.pathname === "/" || location.pathname.startsWith("/roots") || location.pathname === "/alerts" || location.pathname === "/shield-alerts") {
          state.summary = null;
          state.alerts = [];
          route();
        }
      }, 45000);
      route();
    </script>
  </body>
</html>`;
}

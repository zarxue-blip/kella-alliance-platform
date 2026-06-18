const navItems = [
  { path: "/", icon: "🏠", label: "Dashboard" },
  { path: "/members", icon: "👥", label: "Members" },
  { path: "/roots-registration", icon: "⚔", label: "Roots Registration" },
  { path: "/roots-reports", icon: "📊", label: "Roots Reports" },
  { path: "/events", icon: "📅", label: "Events" },
  { path: "/alerts", icon: "🚨", label: "Alerts" },
  { path: "/shield-alerts", icon: "🛡", label: "Shield Alerts" },
  { path: "/settings", icon: "⚙", label: "Settings" }
];

const modules = [
  { id: "shield", name: "Shield Alerts", badge: "Live", command: "/shield @player", description: "DM a player instantly and log the officer, player, and sent time." },
  { id: "attack", name: "Attack Alert", badge: "Critical", command: "/attack", description: "Post an alliance-wide attack alert with one-click response buttons." },
  { id: "roots", name: "Roots Registration", badge: "Core", command: "/roots", description: "14 UTC and 20 UTC availability buttons for Available, Absent, and Unsure." },
  { id: "reports", name: "Roots Reports", badge: "Reports", command: "Dashboard", description: "Historical Roots reports with CSV, JSON, and copyable attendance lists." },
  { id: "summit", name: "Summit Registration", badge: "Fast", command: "/summit", description: "Simple Summit attendance buttons for Attending, Absent, and Not Sure." },
  { id: "checkin", name: "Daily Check-In", badge: "Activity", command: "/checkin", description: "One button daily activity tracking for weekly and inactive member reports." },
  { id: "absence", name: "Absence Notices", badge: "Modal", command: "/absence", description: "Members submit reason, start date, and end date. Officers see who is away." },
  { id: "applications", name: "Applications", badge: "Recruiting", command: "/apply", description: "Simple application modal for IGN, power, timezone, and main legion." },
  { id: "reminders", name: "Event Reminders", badge: "Auto", command: "/remind", description: "Queue reminders for Summit, Roots, Fortress, Stronghold, Pass Defense, or Behemoth." },
  { id: "members", name: "Members", badge: "Roster", command: "Dashboard", description: "Search members, see Discord name, IGN, alliance role, attendance, and notes." },
  { id: "alerts", name: "Alerts Log", badge: "Audit", command: "Dashboard", description: "Review shield alerts, attack alerts, recent alerts, and officer activity." },
  { id: "settings", name: "Settings", badge: "Admin", command: "Setup", description: "Discord OAuth, role permissions, announcement channels, and alert channels." }
];

function navLink(item: (typeof navItems)[number]) {
  return `<a href="${item.path}" data-link data-path="${item.path}"><span>${item.icon} ${item.label}</span><small></small></a>`;
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
        --bg: #0b0d13;
        --panel: #151821;
        --panel-2: #10131b;
        --line: #242938;
        --muted: #8790aa;
        --text: #f7f8fb;
        --green: #5cffc8;
        --red: #ff4f62;
        --gold: #facc15;
        --blue: #7ca3ff;
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        background:
          radial-gradient(circle at 20% 100%, rgba(239, 68, 68, 0.2), transparent 28%),
          radial-gradient(circle at 90% 0%, rgba(250, 204, 21, 0.12), transparent 30%),
          var(--bg);
        color: var(--text);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      button, input, select { font: inherit; }
      button { cursor: pointer; }
      button:disabled { cursor: not-allowed; opacity: 0.62; }
      a { color: inherit; }

      .shell { min-height: 100vh; display: grid; grid-template-columns: 270px 1fr; }
      aside {
        position: sticky;
        top: 0;
        height: 100vh;
        border-right: 1px solid var(--line);
        background: rgba(13, 15, 23, 0.94);
        padding: 28px 18px;
      }

      .brand { display: flex; align-items: center; gap: 12px; margin-bottom: 34px; padding: 0 8px; }
      .mark {
        width: 42px;
        height: 42px;
        border-radius: 11px;
        background: linear-gradient(135deg, var(--red), #8b1d2c);
        display: grid;
        place-items: center;
        font-weight: 1000;
        box-shadow: 0 0 30px rgba(255, 79, 98, 0.24);
      }
      .brand strong { display: block; letter-spacing: 0.14em; font-size: 20px; }
      .brand span { color: var(--muted); font-size: 12px; }

      nav { display: grid; gap: 7px; }
      nav a {
        color: #c8cee0;
        text-decoration: none;
        border-radius: 8px;
        padding: 13px 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 850;
      }
      nav a.active, nav a:hover { background: #191d29; color: var(--green); }

      main { padding: 28px 36px 48px; min-width: 0; }
      .topbar { display: flex; align-items: center; justify-content: space-between; gap: 18px; margin-bottom: 30px; }
      .guild { display: flex; align-items: center; gap: 14px; }
      .avatar {
        width: 58px;
        height: 58px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: radial-gradient(circle, #facc15, #7f1d1d 62%, #111827);
        border: 2px solid #394150;
        font-weight: 1000;
      }
      h1 { margin: 0; font-size: clamp(26px, 4vw, 42px); }
      h2 { margin: 0 0 10px; font-size: 28px; }
      h3 { margin: 0; font-size: 18px; }
      .muted { color: var(--muted); }

      .pill, .primary, .secondary, .danger {
        border: 1px solid #2d3447;
        border-radius: 8px;
        padding: 10px 14px;
        font-weight: 900;
        text-decoration: none;
        background: #10131b;
        color: #dbeafe;
      }
      .primary { background: var(--red); border-color: #ff7281; color: white; }
      .secondary { background: #222737; color: #dbeafe; }
      .danger { background: #3b1016; color: #fecdd3; border-color: #7f1d1d; }

      .hero { display: grid; grid-template-columns: 1fr auto; gap: 18px; align-items: end; margin-bottom: 22px; }
      .hero p { margin: 0; max-width: 830px; color: var(--muted); line-height: 1.65; font-weight: 650; }
      .toolbar { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
      .search {
        width: min(100%, 360px);
        height: 46px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: #252a36;
        color: var(--text);
        padding: 0 15px;
        outline: none;
      }

      .stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-bottom: 22px; }
      .stat, .card, .module-card, .table-wrap {
        background: rgba(21, 24, 33, 0.94);
        border: 1px solid var(--line);
        border-radius: 9px;
        box-shadow: 0 18px 50px rgba(0, 0, 0, 0.16);
      }
      .stat { padding: 17px; }
      .stat span { color: var(--muted); display: block; font-size: 13px; font-weight: 850; }
      .stat strong { display: block; margin-top: 8px; font-size: 27px; }

      .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
      .two { display: grid; grid-template-columns: 1.25fr 0.75fr; gap: 18px; }
      .card { padding: 20px; }
      .card-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 16px; }
      .card p { color: #aeb8d3; line-height: 1.55; font-weight: 650; }

      .module-card { min-height: 168px; padding: 21px 19px; }
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
      .players { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }

      .toast-stack { position: fixed; right: 18px; bottom: 18px; z-index: 30; display: grid; gap: 10px; width: min(360px, calc(100vw - 36px)); }
      .toast { border: 1px solid var(--line); background: #151821; color: var(--text); border-radius: 9px; padding: 13px 14px; box-shadow: 0 18px 40px rgba(0,0,0,0.35); font-weight: 750; }
      .toast.success { border-color: rgba(92,255,200,0.35); }
      .toast.error { border-color: rgba(255,79,98,0.5); }

      @media (max-width: 1120px) {
        .grid, .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .two, .players { grid-template-columns: 1fr; }
      }
      @media (max-width: 780px) {
        .shell { grid-template-columns: 1fr; }
        aside { position: static; height: auto; }
        main { padding: 24px 16px; }
        .hero, .topbar { grid-template-columns: 1fr; display: grid; align-items: start; }
        .grid, .stats { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <div class="shell">
      <aside>
        <div class="brand">
          <div class="mark">K</div>
          <div>
            <strong>KELLA</strong>
            <span>Call of Dragons tools</span>
          </div>
        </div>
        <nav aria-label="Dashboard navigation">${navItems.map(navLink).join("")}</nav>
      </aside>
      <main>
        <header class="topbar">
          <div class="guild">
            <div class="avatar" id="guildAvatar">K</div>
            <div>
              <h1 id="guildName">Kella</h1>
              <span class="muted" id="guildTagline">Command Center</span>
            </div>
          </div>
          <a class="pill" href="/api/health">API Online</a>
        </header>
        <section id="app" aria-live="polite"><div class="skeleton">Loading Kella dashboard...</div></section>
      </main>
    </div>
    <div id="toasts" class="toast-stack" aria-live="polite"></div>
    <script>
      const app = document.getElementById("app");
      const toasts = document.getElementById("toasts");
      const state = { summary: null, reports: [], members: [], alerts: [], settings: null, currentReport: null };
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

      function toast(message, type = "success") {
        const item = document.createElement("div");
        item.className = "toast " + type;
        item.textContent = message;
        toasts.appendChild(item);
        setTimeout(function() { item.remove(); }, 3600);
      }

      async function fetchJson(url) {
        const response = await fetch(url, { headers: { accept: "application/json" } });
        if (!response.ok) throw new Error("Request failed: " + response.status);
        return response.json();
      }

      async function patchJson(url, body) {
        const response = await fetch(url, {
          method: "PATCH",
          headers: { accept: "application/json", "content-type": "application/json" },
          body: JSON.stringify(body)
        });
        if (!response.ok) throw new Error("Save failed: " + response.status);
        return response.json();
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
          await work();
          toast(successMessage);
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

      async function saveSettings(payload) {
        const body = payload && (payload.settings || payload.name || payload.tag || payload.timezone) ? payload : { settings: payload };
        state.settings = await patchJson("/api/dashboard/settings", body);
        applyGuildHeader(state.settings);
        return state.settings;
      }

      function applyGuildHeader(settings) {
        const alliance = settings?.alliance || {};
        const name = alliance.name || "Kella";
        const tag = alliance.tag || "COD";
        const avatar = document.getElementById("guildAvatar");
        const title = document.getElementById("guildName");
        const tagline = document.getElementById("guildTagline");
        if (avatar) avatar.textContent = tag.slice(0, 3).toUpperCase();
        if (title) title.textContent = name;
        if (tagline) tagline.textContent = tag + " Command Center";
      }

      function renderDashboardData(summary) {
        const roots = summary.upcomingRoots;
        const rootsHtml = roots
          ? '<div class="card"><div class="card-header"><h3>⚔ Upcoming Roots</h3><button class="secondary" data-link-button="/roots-reports/' + roots.id + '_14UTC">Quick View</button></div><p>Date: ' + formatDate(roots.date) + '</p>' +
            roots.slots.map(function(slot) { return '<p><strong>' + slot.label + '</strong>: ' + slot.available + ' Available, ' + slot.absent + ' Absent, ' + slot.unsure + ' Unsure</p>'; }).join("") + '</div>'
          : '<div class="card"><div class="card-header"><h3>⚔ Upcoming Roots</h3><button class="secondary" data-action="copy-command" data-value="/roots">Copy /roots</button></div><p>No Roots registration has been created yet. Use /roots in Discord.</p></div>';
        const recent = (summary.recentRegistrations || []).length
          ? '<ul class="list">' + summary.recentRegistrations.map(function(item) { return '<li><strong>' + escapeHtml(item.player) + '</strong> - ' + escapeHtml(item.status) + ' for ' + escapeHtml(item.slot) + '<br><span class="muted">' + formatDateTime(item.sentAt) + '</span></li>'; }).join("") + '</ul>'
          : empty("No recent Roots registrations yet.");

        app.innerHTML =
          pageHeader("Dashboard", "Fast overview for officers. Every number here comes from MongoDB activity logged by Kella.", '<button class="secondary" data-action="refresh-dashboard">Refresh</button>') +
          '<section class="stats">' +
            stat("Total Members", summary.totalMembers) +
            stat("Today\\'s Check-ins", summary.todayCheckIns) +
            stat("Active Alerts", summary.activeAlerts) +
            stat("Upcoming Roots", roots ? "Open" : "None") +
            stat("Pending Shield Warnings", summary.pendingShieldWarnings) +
            stat("Pending Applications", summary.pendingApplications) +
            stat("Recent Registrations", (summary.recentRegistrations || []).length) +
          '</section>' +
          '<section class="two">' +
            rootsHtml +
            '<div class="card"><div class="card-header"><h3>Recent Registrations</h3><button class="secondary" data-link-button="/roots-reports">View All</button></div>' + recent + '</div>' +
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

      async function renderModules() {
        if (!state.settings) await loadSettings();
        app.innerHTML =
          pageHeader("Modules", "Dyno-style module controls, focused only on Call of Dragons alliance work.", '<input class="search" data-module-search placeholder="Search modules" />') +
          '<section class="grid" id="module-grid">' + dashboardModules.map(moduleCard).join("") + '</section>';
      }

      async function renderMembers() {
        skeleton("Loading members...");
        try {
          const members = await loadMembers();
          app.innerHTML = pageHeader("Members", "Search members and review Discord ID, IGN, alliance role, attendance, and officer notes.", '<input class="search" data-member-search placeholder="Search members" />') + renderMembersTable(members);
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load members. ' + escapeHtml(error.message) + '</div>';
        }
      }

      function renderMembersTable(members) {
        if (!members.length) return empty("No members found yet.");
        return '<div class="table-wrap"><table><thead><tr><th>Discord Name</th><th>IGN</th><th>Alliance Role</th><th>Attendance</th><th>Officer Notes</th></tr></thead><tbody>' +
          members.map(function(member) {
            return '<tr><td>' + escapeHtml(member.discordName) + '</td><td>' + escapeHtml(member.ign) + '</td><td>' + escapeHtml(member.role) + '</td><td>' + escapeHtml(member.attendance) + '</td><td>' + escapeHtml(member.notes || "") + '</td></tr>';
          }).join("") +
          '</tbody></table></div>';
      }

      async function renderRootsRegistration() {
        skeleton("Loading Roots registration...");
        try {
          const reports = await loadReports();
          const latest = reports[0];
          app.innerHTML =
            pageHeader("Roots Registration", "Use /roots in Discord. Members click 14 UTC or 20 UTC availability buttons, and Kella updates the database automatically.", '<button class="primary" data-action="copy-command" data-value="/roots">Copy /roots</button>') +
            '<section class="two"><div class="card"><h3>How officers use it</h3><p>Run /roots in an event channel. Members click Available, Absent, or Unsure. No forms. No typing. The Roots Reports page updates from those clicks.</p></div>' +
            '<div class="card"><div class="card-header"><h3>Latest Report</h3><button class="secondary" data-link-button="/roots-reports">Reports</button></div>' +
            (latest ? '<p>' + formatDate(latest.date) + ' - ' + latest.timeSlot + '</p><p>' + latest.available + ' Available, ' + latest.absent + ' Absent, ' + latest.unsure + ' Unsure</p>' : '<p>No Roots reports yet.</p>') +
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
                return '<tr><td>' + formatDate(report.date) + '</td><td>' + escapeHtml(report.timeSlot) + '</td><td>' + report.available + ' Available</td><td>' + report.absent + ' Absent</td><td>' + report.unsure + ' Unsure</td><td>' + escapeHtml(report.createdBy) + '</td><td><button class="secondary" data-link-button="/roots-reports/' + report.id + '">View Report</button></td></tr>';
              }).join("")
            : "";
          app.innerHTML =
            pageHeader("Roots Reports", "Historical Roots of War registration reports grouped by message and time slot.", '<button class="secondary" data-action="refresh-reports">Refresh</button>') +
            (reports.length ? '<div class="table-wrap"><table><thead><tr><th>Date</th><th>Time Slot</th><th>Total Available</th><th>Total Absent</th><th>Total Unsure</th><th>Created By</th><th></th></tr></thead><tbody>' + rows + '</tbody></table></div>' : empty("No Roots reports yet. Run /roots in Discord to create the first one."));
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load Roots reports. ' + escapeHtml(error.message) + '</div>';
        }
      }

      function attendanceText(report) {
        return [
          "ROOTS OF WAR",
          report.slot === "14UTC" ? "14 UTC" : "20 UTC",
          "",
          "AVAILABLE",
          ...(report.available || []),
          "",
          "ABSENT",
          ...(report.absent || []),
          "",
          "UNSURE",
          ...(report.unsure || [])
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
          app.innerHTML =
            pageHeader("Roots Report", "Detailed Roots of War attendance list with export tools.", '<button class="secondary" data-link-button="/roots-reports">Back</button><button class="secondary" data-action="export-csv">Export CSV</button><button class="secondary" data-action="export-json">Export JSON</button><button class="primary" data-action="copy-attendance">Copy Attendance List</button>') +
            '<section class="card"><div class="card-header"><h3>' + formatDate(report.date) + ' - ' + escapeHtml(report.timeSlot) + '</h3>' + (report.messageLink ? '<a class="pill" target="_blank" rel="noreferrer" href="' + escapeHtml(report.messageLink) + '">Registration Message</a>' : '<span class="badge warn">No message link</span>') + '</div><p>Created By: ' + escapeHtml(report.createdBy) + '</p></section>' +
            '<section class="players" style="margin-top:18px">' +
              section("⚔ Available", report.available || [], "good") +
              section("❌ Absent", report.absent || [], "bad") +
              section("❔ Unsure", report.unsure || [], "warn") +
            '</section>';
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load report details. ' + escapeHtml(error.message) + '</div>';
        }
      }

      function renderEvents() {
        const commands = ["/roots", "/summit", "/attack", "/checkin", "/remind"];
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
          app.innerHTML = pageHeader(type === "shield" ? "Shield Alerts" : "Alerts", "Recent Kella alert activity from MongoDB.", '<button class="secondary" data-action="refresh-alerts">Refresh</button>') + renderAlertsTable(filtered);
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load alerts. ' + escapeHtml(error.message) + '</div>';
        }
      }

      function renderAlertsTable(alerts) {
        if (!alerts.length) return empty("No alerts recorded yet.");
        return '<div class="table-wrap"><table><thead><tr><th>Type</th><th>Officer</th><th>Player</th><th>Status</th><th>Time</th></tr></thead><tbody>' +
          alerts.map(function(alert) {
            return '<tr><td>' + escapeHtml(alert.type) + '</td><td>' + escapeHtml(alert.officer || "") + '</td><td>' + escapeHtml(alert.player || "") + '</td><td>' + escapeHtml(alert.status || "") + '</td><td>' + formatDateTime(alert.sentAt) + '</td></tr>';
          }).join("") +
          '</tbody></table></div>';
      }

      async function renderSettings() {
        skeleton("Loading settings...");
        try {
          const data = await loadSettings();
          const alliance = data.alliance || {};
          const settings = data.settings || {};
          app.innerHTML = pageHeader("Settings", "Saved admin preferences for Kella channels, officer roles, and enabled modules.", '<button class="primary" data-action="save-settings">Save Settings</button>') +
            '<section class="grid" data-settings-panel>' +
              '<div class="card"><h3>Alliance Name</h3><p>Name shown at the top of the dashboard.</p><input class="search" data-setting="allianceName" value="' + escapeHtml(alliance.name || "") + '" /></div>' +
              '<div class="card"><h3>Alliance Tag</h3><p>Short tag shown in the round badge.</p><input class="search" data-setting="allianceTag" value="' + escapeHtml(alliance.tag || "") + '" /></div>' +
              '<div class="card"><h3>Announcement Channel</h3><p>Where Kella should post event announcements.</p><input class="search" data-setting="announcementChannel" placeholder="Channel name or ID" value="' + escapeHtml(settings.announcementChannel || "") + '" /></div>' +
              '<div class="card"><h3>Attendance Channel</h3><p>Where Roots, Summit, and check-in panels should be used.</p><input class="search" data-setting="attendanceChannel" placeholder="Channel name or ID" value="' + escapeHtml(settings.attendanceChannel || "") + '" /></div>' +
              '<div class="card"><h3>Alert Channel</h3><p>Where attack and shield alert logs should be reviewed.</p><input class="search" data-setting="alertChannel" placeholder="Channel name or ID" value="' + escapeHtml(settings.alertChannel || "") + '" /></div>' +
              '<div class="card"><h3>Officer Roles</h3><p>Comma-separated Discord roles that can operate Kella.</p><input class="search" data-setting="officerRoles" value="' + escapeHtml((settings.officerRoles || []).join(", ")) + '" /></div>' +
              '<div class="card"><h3>Enabled Modules</h3><p>' + dashboardModules.filter(function(module) { return moduleState(module.id); }).length + ' of ' + dashboardModules.length + ' modules enabled.</p><button class="secondary" data-link-button="/">Back to Modules</button></div>' +
            '</section>';
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load settings. ' + escapeHtml(error.message) + '</div>';
        }
      }

      function readSettingsForm() {
        const value = function(name) {
          return (document.querySelector('[data-setting="' + name + '"]')?.value || "").trim();
        };
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
        if (path === "/alerts") return renderAlerts();
        if (path === "/shield-alerts") return renderAlerts("shield");
        if (path === "/settings") return renderSettings();
        renderModules();
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
        if (kind === "copy-command") {
          withFeedback(action, function() { return navigator.clipboard.writeText(action.getAttribute("data-value") || ""); }, "Command copied.");
        }
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
        if (kind === "refresh-dashboard") {
          withFeedback(action, async function() { state.summary = null; await renderDashboard(); }, "Dashboard refreshed.");
        }
        if (kind === "refresh-reports") {
          withFeedback(action, async function() { await renderRootsReports(); }, "Reports refreshed.");
        }
        if (kind === "refresh-alerts") {
          withFeedback(action, async function() { await renderAlerts(location.pathname === "/shield-alerts" ? "shield" : undefined); }, "Alerts refreshed.");
        }
        if (kind === "save-settings") {
          withFeedback(action, async function() { await saveSettings(readSettingsForm()); }, "Settings saved.");
        }
        if (kind === "copy-attendance") {
          withFeedback(action, function() { return navigator.clipboard.writeText(attendanceText(state.currentReport)); }, "Attendance list copied.");
        }
        if (kind === "export-json") {
          withFeedback(action, async function() {
            const blob = new Blob([JSON.stringify(state.currentReport, null, 2)], { type: "application/json" });
            downloadBlob(blob, "roots-report.json");
          }, "JSON exported.");
        }
        if (kind === "export-csv") {
          withFeedback(action, async function() {
            const rows = [["Status", "Player"]];
            (state.currentReport.available || []).forEach(function(player) { rows.push(["Available", player]); });
            (state.currentReport.absent || []).forEach(function(player) { rows.push(["Absent", player]); });
            (state.currentReport.unsure || []).forEach(function(player) { rows.push(["Unsure", player]); });
            const csv = rows.map(function(row) { return row.map(function(cell) { return '"' + String(cell).replaceAll('"', '""') + '"'; }).join(","); }).join("\\n");
            downloadBlob(new Blob([csv], { type: "text/csv" }), "roots-report.csv");
          }, "CSV exported.");
        }
      });

      document.addEventListener("input", async function(event) {
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
          route();
        }
      }, 30000);
      route();
    </script>
  </body>
</html>`;
}

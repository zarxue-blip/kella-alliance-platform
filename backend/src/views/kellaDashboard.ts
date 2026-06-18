const modules = [
  {
    name: "Shield Alerts",
    badge: "Live",
    enabled: true,
    command: "/shield @player",
    description: "DM a player instantly and log the officer, player, and sent time."
  },
  {
    name: "Attack Alert",
    badge: "Critical",
    enabled: true,
    command: "/attack",
    description: "Post an alliance-wide attack alert with one-click response buttons."
  },
  {
    name: "Roots of War",
    badge: "Core",
    enabled: true,
    command: "/roots",
    description: "14 UTC and 20 UTC registration buttons for available, absent, or not sure."
  },
  {
    name: "Summit Registration",
    badge: "Fast",
    enabled: true,
    command: "/summit",
    description: "Simple attendance buttons for attending, absent, and not sure."
  },
  {
    name: "Daily Check-In",
    badge: "Activity",
    enabled: true,
    command: "/checkin",
    description: "One button daily activity tracking for weekly and inactive member reports."
  },
  {
    name: "Absence Notices",
    badge: "Modal",
    enabled: true,
    command: "/absence",
    description: "Members submit reason, start date, and end date. Officers see who is away."
  },
  {
    name: "Applications",
    badge: "Recruiting",
    enabled: true,
    command: "/apply",
    description: "Simple application modal for IGN, power, timezone, and main legion."
  },
  {
    name: "Event Reminders",
    badge: "Auto",
    enabled: true,
    command: "/remind",
    description: "Queue reminders for Summit, Roots, Fortress, Stronghold, Pass Defense, or Behemoth."
  },
  {
    name: "Attendance Center",
    badge: "Reports",
    enabled: true,
    command: "Dashboard",
    description: "View Roots, Summit, Fortress, Stronghold, and filtered attendance history."
  },
  {
    name: "Members",
    badge: "Roster",
    enabled: true,
    command: "Dashboard",
    description: "Search members, see Discord name, IGN, alliance role, attendance, and notes."
  },
  {
    name: "Alerts Log",
    badge: "Audit",
    enabled: true,
    command: "Dashboard",
    description: "Review shield alerts, attack alerts, recent alerts, and officer activity."
  },
  {
    name: "Settings",
    badge: "Admin",
    enabled: false,
    command: "Setup",
    description: "Discord OAuth, role permissions, announcement channels, and alert channels."
  }
];

function moduleCard(module: (typeof modules)[number]) {
  const switchClass = module.enabled ? "switch on" : "switch";
  return `<article class="module-card">
    <div class="module-top">
      <div>
        <h3>${module.name}</h3>
        <div class="meta"><span>${module.command}</span><strong>${module.badge}</strong></div>
      </div>
      <span class="${switchClass}" aria-label="${module.enabled ? "Enabled" : "Disabled"}"><i></i></span>
    </div>
    <p>${module.description}</p>
    <div class="module-actions">
      <a href="/api/health">Status</a>
      <button type="button">Settings</button>
    </div>
  </article>`;
}

export function kellaDashboardHtml() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Kella Admin Dashboard</title>
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
          radial-gradient(circle at 20% 100%, rgba(239, 68, 68, 0.22), transparent 28%),
          radial-gradient(circle at 90% 0%, rgba(250, 204, 21, 0.1), transparent 28%),
          var(--bg);
        color: var(--text);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      .shell { min-height: 100vh; display: grid; grid-template-columns: 260px 1fr; }
      aside {
        position: sticky;
        top: 0;
        height: 100vh;
        border-right: 1px solid var(--line);
        background: rgba(13, 15, 23, 0.92);
        padding: 28px 22px;
      }

      .brand { display: flex; align-items: center; gap: 12px; margin-bottom: 42px; }
      .mark {
        width: 38px;
        height: 38px;
        border-radius: 10px;
        background: linear-gradient(135deg, var(--red), #8b1d2c);
        display: grid;
        place-items: center;
        font-weight: 1000;
        box-shadow: 0 0 30px rgba(255, 79, 98, 0.24);
      }
      .brand strong { display: block; letter-spacing: 0.14em; font-size: 20px; }
      .brand span { color: var(--muted); font-size: 12px; }

      nav { display: grid; gap: 8px; }
      nav a {
        color: #c8cee0;
        text-decoration: none;
        border-radius: 8px;
        padding: 13px 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 800;
      }
      nav a.active, nav a:hover { background: #191d29; color: var(--green); }
      nav small { color: var(--muted); font-weight: 900; }

      main { padding: 28px 36px 48px; min-width: 0; }
      .topbar { display: flex; align-items: center; justify-content: space-between; gap: 18px; margin-bottom: 34px; }
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
      .pill {
        border: 1px solid #2d3447;
        background: #10131b;
        color: #cbd5e1;
        border-radius: 999px;
        padding: 10px 14px;
        font-weight: 800;
        white-space: nowrap;
      }

      .hero {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 18px;
        align-items: end;
        margin-bottom: 28px;
      }
      .hero h2 { margin: 0 0 10px; font-size: 28px; }
      .hero p { margin: 0; max-width: 780px; color: var(--muted); line-height: 1.65; font-weight: 650; }
      .search {
        width: min(100%, 360px);
        height: 48px;
        border: 1px solid var(--line);
        border-radius: 7px;
        background: #252a36;
        color: var(--text);
        padding: 0 15px;
        font-size: 15px;
        outline: none;
      }

      .stats {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 14px;
        margin-bottom: 24px;
      }
      .stat {
        background: rgba(21, 24, 33, 0.9);
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 17px;
      }
      .stat span { color: var(--muted); display: block; font-size: 13px; font-weight: 850; }
      .stat strong { display: block; margin-top: 8px; font-size: 27px; }

      .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
      .module-card {
        min-height: 164px;
        border: 1px solid #1f2430;
        border-radius: 8px;
        background: rgba(21, 24, 33, 0.96);
        padding: 22px 20px;
        box-shadow: 0 18px 50px rgba(0, 0, 0, 0.16);
      }
      .module-card:hover { border-color: #394150; transform: translateY(-1px); transition: 140ms ease; }
      .module-top { display: flex; justify-content: space-between; gap: 16px; align-items: flex-start; }
      h3 { margin: 0; font-size: 18px; }
      .meta { margin-top: 11px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      .meta span, .meta strong {
        border-radius: 5px;
        padding: 5px 8px;
        font-size: 12px;
        font-weight: 1000;
      }
      .meta span { background: #1e2432; color: #c7d2fe; }
      .meta strong { background: rgba(92, 255, 200, 0.13); color: var(--green); }
      .module-card p { color: #aeb8d3; line-height: 1.45; font-weight: 700; min-height: 62px; }

      .switch {
        width: 52px;
        height: 26px;
        border-radius: 999px;
        background: #202431;
        padding: 3px;
        flex: 0 0 auto;
      }
      .switch i {
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #7f879a;
      }
      .switch.on i {
        margin-left: auto;
        background: var(--green);
        box-shadow: 0 0 18px rgba(92, 255, 200, 0.42);
      }

      .module-actions { display: flex; gap: 10px; align-items: center; }
      .module-actions a, .module-actions button {
        border: 0;
        border-radius: 5px;
        background: #222737;
        color: #ff6676;
        padding: 9px 12px;
        font-weight: 1000;
        font-size: 12px;
        text-transform: uppercase;
        text-decoration: none;
        letter-spacing: 0.06em;
      }
      .module-actions a { color: var(--green); }

      @media (max-width: 1120px) {
        .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
      @media (max-width: 780px) {
        .shell { grid-template-columns: 1fr; }
        aside { position: static; height: auto; }
        main { padding: 24px 18px; }
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
            <span>Alliance tools</span>
          </div>
        </div>
        <nav aria-label="Dashboard navigation">
          <a href="#"><span>Dashboard</span><small>Home</small></a>
          <a href="#" class="active"><span>Modules</span><small>12</small></a>
          <a href="#"><span>Members</span><small>Roster</small></a>
          <a href="#"><span>Attendance</span><small>Live</small></a>
          <a href="#"><span>Events</span><small>Create</small></a>
          <a href="#"><span>Alerts</span><small>Logs</small></a>
          <a href="#"><span>Applications</span><small>Pending</small></a>
          <a href="#"><span>Settings</span><small>Admin</small></a>
        </nav>
      </aside>
      <main>
        <header class="topbar">
          <div class="guild">
            <div class="avatar">881</div>
            <div>
              <h1>COD 881</h1>
              <span class="muted">Kella Command Center</span>
            </div>
          </div>
          <a class="pill" href="/api/health">API Online</a>
        </header>

        <section class="hero">
          <div>
            <h2>Modules</h2>
            <p>Fast Discord-first tools for Call of Dragons officers. Mention a player, pick an event, or click a button. Kella keeps the logs clean in the background.</p>
          </div>
          <input class="search" placeholder="Search modules" aria-label="Search modules" />
        </section>

        <section class="stats" aria-label="Kella overview">
          <div class="stat"><span>Members</span><strong>Ready</strong></div>
          <div class="stat"><span>Attendance</span><strong>Live</strong></div>
          <div class="stat"><span>Active Alerts</span><strong>0</strong></div>
          <div class="stat"><span>Pending Applications</span><strong>Open</strong></div>
        </section>

        <section class="grid" aria-label="Kella modules">
          ${modules.map(moduleCard).join("\n")}
        </section>
      </main>
    </div>
  </body>
</html>`;
}

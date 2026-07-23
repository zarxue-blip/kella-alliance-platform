const navItems = [
  { path: "/", icon: "/assets/icons/dashboard.png", label: "Dashboard" },
  { path: "/members", icon: "/assets/icons/members.png", label: "Members" },
  { path: "/attendance", icon: "/assets/icons/events.png", label: "Attendance" },
  { path: "/roots-of-war", icon: "/assets/icons/root-registration.png", label: "Roots of War", adminOnly: true },
  { path: "/tools", icon: "/assets/icons/events.png", label: "Tools", adminOnly: true },
  { path: "/complaints", icon: "/assets/icons/complaints.png", label: "Complaints", adminOnly: true },
  { path: "/settings", icon: "/assets/icons/settings.png", label: "Settings", adminOnly: true }
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
  { id: "members", name: "Members", badge: "Roster", command: "Dashboard", description: "Search members, see Discord User ID, Lord ID, alliance role, attendance, and notes." },
  { id: "settings", name: "Settings", badge: "Setup", command: "Dashboard", description: "Admin key, channels, alliance label, and module switches." }
];

function navLink(item: (typeof navItems)[number]) {
  return `<a href="${item.path}" data-link data-path="${item.path}"><img class="nav-icon" src="${item.icon}" alt="" loading="lazy" /><span>${item.label}</span></a>`;
}

export function kellaDashboardHtml() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Kella Dashboard</title>
    <link rel="icon" type="image/png" href="/assets/kellacoin.png?v=4" />
    <link rel="shortcut icon" type="image/png" href="/assets/kellacoin.png?v=4" />
    <link rel="apple-touch-icon" href="/assets/kellacoin.png?v=4" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #150f09;
        --panel: #ead8ae;
        --panel-2: #d9bf82;
        --panel-3: #f5e7bf;
        --line: rgba(98, 62, 24, 0.36);
        --muted: #725736;
        --text: #241509;
        --ink: #241509;
        --paper: #f2dfae;
        --paper-soft: #fff2c8;
        --paper-deep: #c9974f;
        --leather: #26170d;
        --green: #4ff0aa;
        --red: #b3262f;
        --gold: #ffd65a;
        --gold-soft: #fff1a8;
        --ember: #a4451f;
        --blue: #8097ff;
        --pink: #b3262f;
        --glass: rgba(255, 236, 187, 0.78);
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        background:
          linear-gradient(180deg, rgba(34, 25, 11, 0.28) 0%, rgba(31, 20, 9, 0.70) 46%, rgba(13, 8, 5, 0.88) 100%),
          radial-gradient(circle at 13% 92%, rgba(255, 210, 90, 0.20), transparent 28%),
          radial-gradient(circle at 86% 6%, rgba(255, 214, 90, 0.20), transparent 22%),
          url("/assets/kella-bg.png") center top / cover fixed,
          linear-gradient(180deg, #3d2b15 0%, #16100a 46%, #090604 100%),
          var(--bg);
        color: var(--text);
        font-family: "Trebuchet MS", "Segoe UI", ui-sans-serif, system-ui, sans-serif;
        min-height: 100vh;
      }

      button, input, select, textarea { font: inherit; }
      button { cursor: pointer; }
      button:disabled { cursor: not-allowed; opacity: 0.62; }
      a { color: inherit; }

      .shell {
        width: min(1240px, calc(100vw - 28px));
        min-height: min(820px, calc(100vh - 32px));
        margin: 16px auto;
        display: grid;
        grid-template-columns: 245px 1fr;
        overflow: hidden;
        border: 2px solid rgba(255, 214, 90, 0.52);
        border-radius: 18px;
        background:
          linear-gradient(90deg, rgba(67, 42, 20, 0.32), transparent 21%, transparent 79%, rgba(67, 42, 20, 0.22)),
          var(--paper);
        box-shadow: 0 34px 110px rgba(0, 0, 0, 0.58), inset 0 0 0 1px rgba(105, 64, 24, 0.22), inset 0 0 44px rgba(92, 55, 18, 0.16);
        backdrop-filter: blur(12px);
      }
      .shell > aside {
        color: #fff8d7;
        border-right: 2px solid rgba(111, 69, 25, 0.56);
        background:
          radial-gradient(circle at 50% -10%, rgba(255, 214, 90, 0.16), transparent 34%),
          linear-gradient(180deg, rgba(59, 36, 18, 0.82), rgba(17, 10, 6, 0.96) 64%, #090604 100%);
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
        border: 1px solid rgba(250, 204, 21, 0.28);
        box-shadow: 0 0 28px rgba(250, 204, 21, 0.16), 0 0 34px rgba(255, 69, 101, 0.18);
      }
      .brand strong { display: block; letter-spacing: 0.03em; font-size: 16px; color: #fff7d6; }
      .brand span { color: var(--gold-soft); font-size: 11px; text-transform: uppercase; font-weight: 900; letter-spacing: 0.08em; }

      nav { display: grid; gap: 7px; }
      nav a {
        color: #f3dfaa;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: 6px;
        padding: 9px 10px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
        font-weight: 900;
        font-size: 14px;
        text-shadow: 0 1px 0 rgba(0,0,0,0.42);
        transition: background 160ms ease, color 160ms ease, transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
      }
      .nav-icon {
        width: 28px;
        height: 28px;
        object-fit: contain;
        flex: 0 0 auto;
        filter: drop-shadow(0 0 8px rgba(250, 204, 21, 0.20));
        transition: transform 160ms ease, filter 160ms ease;
      }
      nav a.active, nav a:hover {
        background:
          linear-gradient(180deg, rgba(255, 246, 162, 0.98), rgba(236, 164, 50, 0.96)),
          var(--gold);
        border-color: rgba(255, 249, 184, 0.92);
        color: #221205;
        transform: translateX(2px);
        text-shadow: 0 1px 0 rgba(255,255,255,0.46);
        box-shadow: 0 0 0 1px rgba(103, 58, 14, 0.34), 0 0 20px rgba(255, 214, 90, 0.46), inset 0 0 18px rgba(255, 251, 210, 0.52);
      }
      nav a.active .nav-icon, nav a:hover .nav-icon {
        transform: scale(1.08);
        filter: drop-shadow(0 0 12px rgba(255, 247, 214, 0.42));
      }
      .side-spacer { flex: 1; min-height: 24px; }
      .side-footer {
        margin-top: 24px;
        padding: 14px 8px 0;
        border-top: 1px solid rgba(255, 214, 90, 0.24);
        color: #d7bd82;
        font-size: 12px;
        font-weight: 850;
        line-height: 1.45;
      }
      .side-footer strong { display: block; color: #fff7d6; font-size: 13px; margin-bottom: 4px; }

      main {
        padding: 0;
        min-width: 0;
        background:
          radial-gradient(circle at 72% 5%, rgba(255, 214, 90, 0.18), transparent 30%),
          linear-gradient(90deg, rgba(83, 49, 18, 0.16), transparent 16%, transparent 84%, rgba(83, 49, 18, 0.12)),
          radial-gradient(circle at 50% 36%, rgba(255,255,255,0.20), transparent 42%),
          var(--paper);
      }
      .topbar {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        gap: 14px;
        min-height: 58px;
        border-bottom: 2px solid rgba(102, 63, 24, 0.36);
        background:
          linear-gradient(180deg, rgba(255, 242, 197, 0.90), rgba(224, 189, 124, 0.64)),
          var(--paper-soft);
        padding: 10px 20px;
      }
      .server-clock {
        display: grid;
        justify-items: end;
        gap: 2px;
        min-width: 142px;
        border: 1px solid rgba(109, 69, 25, 0.30);
        border-radius: 10px;
        background: rgba(70, 43, 18, 0.12);
        padding: 8px 11px;
      }
      .server-clock span {
        color: #6a4b22;
        font-size: 10px;
        font-weight: 1000;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .server-clock strong {
        color: #241509;
        font-size: 13px;
      }
      .top-actions { display: flex; align-items: center; gap: 8px; }
      .top-actions .server-clock { min-width: 150px; }
      .auth-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        min-height: 36px;
        padding: 0 12px;
        border: 1px solid rgba(255, 214, 90, 0.42);
        border-radius: 999px;
        background: rgba(54, 35, 17, 0.54);
        color: #fff4cf;
        font-size: 12px;
        font-weight: 900;
        white-space: nowrap;
      }
      .icon-button {
        width: 34px;
        height: 34px;
        border-radius: 9px;
        display: grid;
        place-items: center;
        background: rgba(255, 244, 205, 0.62);
        color: #3b220c;
        border: 1px solid rgba(109, 69, 25, 0.30);
        padding: 0;
      }
      .auth-button {
        min-height: 36px;
        border-radius: 10px;
        border: 1px solid rgba(109, 69, 25, 0.30);
        background: rgba(255, 244, 205, 0.72);
        color: #3b220c;
        padding: 0 13px;
        font-weight: 1000;
      }
      [data-auth-login], [data-auth-logout] { width: auto; padding: 0 10px; }
      .icon-button:hover { border-color: rgba(255, 214, 90, 0.92); color: #5c3106; box-shadow: 0 0 16px rgba(255, 214, 90, 0.28); }
      .profile-top-button {
        min-height: 46px;
        min-width: 174px;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        border: 1px solid rgba(109, 69, 25, 0.30);
        border-radius: 14px;
        background: rgba(255, 244, 205, 0.72);
        color: #3b220c;
        padding: 5px 12px 5px 7px;
        font-weight: 1000;
        text-align: left;
      }
      .profile-top-button:hover { border-color: rgba(255, 214, 90, 0.88); box-shadow: 0 0 18px rgba(255, 214, 90, 0.28); }
      .profile-top-button img { width: 34px; height: 34px; object-fit: contain; display: block; flex: 0 0 auto; }
      .profile-top-button span { display: grid; gap: 1px; line-height: 1.1; }
      .profile-top-button strong { font-size: 13px; }
      .profile-top-button em { color: #725736; font-size: 11px; font-style: normal; font-weight: 850; white-space: nowrap; }
      .feedback-top-button {
        min-width: 178px;
        border-color: rgba(166, 105, 35, 0.34);
        background: linear-gradient(180deg, rgba(255, 246, 211, 0.98), rgba(228, 179, 89, 0.72));
      }
      .feedback-top-button img { filter: drop-shadow(0 4px 7px rgba(106, 61, 18, 0.22)); }
      .content { padding: 24px 20px 28px; }
      .guild { display: flex; align-items: center; gap: 14px; }
      .avatar {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: radial-gradient(circle, #facc15, #9a3412 58%, #111827);
        border: 2px solid rgba(250, 204, 21, 0.34);
        font-weight: 1000;
      }
      .avatar-img {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgba(250, 204, 21, 0.34);
        background: #111827;
        box-shadow: 0 0 24px rgba(250, 204, 21, 0.20);
      }
      h1, h2, h3 {
        font-family: Georgia, "Times New Roman", serif;
        color: #1f1308;
        letter-spacing: 0.01em;
        text-shadow: 0 1px 0 rgba(255,255,255,0.52);
      }
      h1 { margin: 0; font-size: 24px; }
      h2 { margin: 0 0 10px; font-size: 32px; }
      h3 { margin: 0; font-size: 20px; }
      .muted { color: var(--muted); }

      .primary, .secondary, .danger, .ghost {
        border: 1px solid rgba(100, 62, 22, 0.34);
        border-radius: 8px;
        padding: 9px 13px;
        font-weight: 900;
        text-decoration: none;
        background: rgba(255, 246, 217, 0.70);
        color: #2b1706;
      }
      .primary {
        background: linear-gradient(180deg, #fff08a, #e8a938 56%, #b86a1b);
        border-color: rgba(120, 71, 16, 0.46);
        color: #241205;
        box-shadow: 0 12px 26px rgba(151, 84, 14, 0.24), inset 0 1px 0 rgba(255,255,255,0.58);
      }
      .secondary { background: rgba(88, 53, 20, 0.10); color: #5d350e; border-color: rgba(100, 62, 22, 0.30); }
      .danger { background: #6d1e19; color: #fff0dc; border-color: #9b2d24; }
      .ghost { background: transparent; }

      .hero { display: grid; grid-template-columns: 1fr auto; gap: 18px; align-items: end; margin-bottom: 22px; }
      .hero p { margin: 0; max-width: 840px; color: var(--muted); line-height: 1.65; font-weight: 650; }
      .toolbar { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }

      input, select, textarea {
        width: 100%;
        border: 1px solid rgba(100, 62, 22, 0.30);
        border-radius: 8px;
        background: rgba(255, 247, 219, 0.68);
        color: var(--text);
        padding: 12px 13px;
        outline: none;
      }
      input:focus, select:focus, textarea:focus {
        border-color: rgba(250, 204, 21, 0.55);
        box-shadow: 0 0 0 3px rgba(255, 214, 90, 0.20), 0 0 18px rgba(255, 214, 90, 0.20);
      }
      textarea { min-height: 130px; resize: vertical; line-height: 1.45; }
      label { display: grid; gap: 7px; color: #4d3216; font-weight: 850; font-size: 13px; }
      .search { height: 46px; max-width: 380px; }
      .form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
      .form-grid .wide { grid-column: 1 / -1; }
      .time-row {
        display: grid;
        grid-template-columns: minmax(180px, 1fr) 110px 110px;
        gap: 12px;
        align-items: end;
      }

      .stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-bottom: 18px; }
      .stat, .card, .module-card, .table-wrap, .preview {
        background:
          radial-gradient(circle at 50% -10%, rgba(255,255,255,0.28), transparent 26%),
          linear-gradient(180deg, rgba(255, 243, 203, 0.94), rgba(222, 187, 123, 0.94)),
          var(--paper);
        border: 1px solid rgba(111, 69, 25, 0.36);
        border-radius: 8px;
        box-shadow: 0 18px 42px rgba(73, 42, 14, 0.18), inset 0 0 0 1px rgba(255,255,255,0.24), inset 0 0 28px rgba(103, 59, 18, 0.08);
      }
      .stat { padding: 17px; }
      .stat span { color: var(--muted); display: block; font-size: 13px; font-weight: 850; }
      .stat strong { display: block; margin-top: 8px; font-size: 27px; overflow-wrap: anywhere; color: #3a220c; }

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
          linear-gradient(180deg, rgba(255, 244, 207, 0.40), rgba(92, 50, 18, 0.20)),
          radial-gradient(circle at 62% 44%, rgba(255, 214, 90, 0.38), transparent 24%),
          radial-gradient(circle at 28% 18%, rgba(166, 82, 26, 0.18), transparent 20%),
          linear-gradient(135deg, #f1dca9, #cf9f58 65%);
        border-color: rgba(111, 69, 25, 0.42);
      }
      .overview-panel:before {
        content: "";
        position: absolute;
        inset: 54px 18px 18px;
        border: 1px solid rgba(78, 45, 15, 0.12);
        background:
          linear-gradient(rgba(78, 45, 15,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(78, 45, 15,0.05) 1px, transparent 1px);
        background-size: 26px 26px;
        opacity: 0.75;
        mask-image: linear-gradient(180deg, transparent, black 18%, black 80%, transparent);
      }
      .overview-content { position: relative; z-index: 1; display: grid; gap: 14px; height: 100%; align-content: end; }
      .overview-kpis { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
      .kpi-card { background: rgba(255, 247, 219, 0.54); border: 1px solid rgba(92, 55, 18, 0.18); border-radius: 10px; padding: 13px; }
      .kpi-card span { display: block; color: var(--muted); font-size: 11px; font-weight: 1000; text-transform: uppercase; letter-spacing: 0.08em; }
      .kpi-card strong { display: block; margin-top: 7px; font-size: 22px; color: var(--text); }
      .activity-card { min-height: 248px; }
      .activity-list { display: grid; gap: 10px; }
      .activity-item { display: grid; grid-template-columns: 30px 1fr; gap: 10px; align-items: start; padding: 10px; background: rgba(255, 247, 219, 0.42); border: 1px solid rgba(92, 55, 18, 0.18); border-radius: 9px; }
      .activity-dot { width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center; background: rgba(184,106,27,0.15); color: #8b3d15; border: 1px solid rgba(184,106,27,0.35); font-size: 13px; }
      .activity-item strong { display: block; font-size: 13px; line-height: 1.25; }
      .activity-time { display: block; color: var(--muted); font-size: 12px; margin-top: 3px; }
      .quick-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin-bottom: 18px; }
      .quick-card { min-height: 128px; display: grid; align-content: space-between; gap: 14px; transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease; }
      .quick-card:hover { transform: translateY(-2px); border-color: rgba(255, 214, 90, 0.72); box-shadow: 0 20px 44px rgba(100, 55, 17, 0.26), 0 0 20px rgba(255, 214, 90, 0.20); }
      .quick-card .big { font-size: 25px; font-weight: 1000; color: var(--text); }
      .readiness { display: grid; gap: 9px; }
      .readiness-row { display: grid; gap: 6px; }
      .readiness-row span { display: flex; justify-content: space-between; gap: 10px; color: #4d3216; font-size: 12px; font-weight: 850; }
      .bar { height: 7px; background: rgba(76, 47, 18, 0.20); border-radius: 999px; overflow: hidden; }
      .bar i { display: block; height: 100%; background: linear-gradient(90deg, #9b4d1e, var(--gold)); }
      .calendar-grid { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 10px; }
      .calendar-day {
        min-height: 122px;
        border: 1px solid rgba(92, 55, 18, 0.18);
        border-radius: 10px;
        background: rgba(255, 247, 219, 0.42);
        color: var(--text);
        cursor: pointer;
        font: inherit;
        padding: 10px;
        display: grid;
        gap: 8px;
        align-content: start;
        text-align: left;
        transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;
      }
      .calendar-day:hover, .calendar-day:focus-visible {
        transform: translateY(-2px);
        border-color: rgba(181, 111, 26, 0.56);
        box-shadow: 0 12px 26px rgba(111, 69, 25, 0.20), 0 0 18px rgba(255, 214, 90, 0.18);
        outline: none;
      }
      .calendar-day-top { display: flex; justify-content: space-between; gap: 8px; align-items: center; }
      .calendar-day strong { font-size: 18px; color: #3a220c; }
      .calendar-day em { color: #7b5b34; font-size: 11px; font-style: normal; font-weight: 950; text-transform: uppercase; letter-spacing: 0.05em; }
      .calendar-day-list { display: grid; gap: 5px; min-width: 0; }
      .calendar-entry {
        display: block;
        border-radius: 7px;
        background: rgba(255, 255, 255, 0.34);
        border: 1px solid rgba(92, 55, 18, 0.13);
        color: #3a220c;
        font-size: 11px;
        font-weight: 900;
        line-height: 1.28;
        overflow: hidden;
        padding: 5px 6px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .calendar-entry small { display: block; color: #6e512d; font-size: 10px; font-weight: 850; margin-top: 2px; overflow: hidden; text-overflow: ellipsis; }
      .calendar-empty { color: var(--muted); font-size: 12px; font-weight: 850; }
      .calendar-more { color: #7c4b08; font-size: 11px; font-weight: 1000; }
      .calendar-day.hot, .calendar-day.has-items { background: linear-gradient(180deg, rgba(255, 224, 109, 0.78), rgba(209, 142, 43, 0.50)); border-color: rgba(169, 99, 23, 0.40); }
      .calendar-day.event { box-shadow: inset 0 -3px 0 rgba(179, 38, 47, 0.48); }
      .calendar-day.today {
        border-color: rgba(34, 159, 92, 0.68);
        background: linear-gradient(180deg, rgba(178, 255, 194, 0.76), rgba(103, 184, 88, 0.46));
        box-shadow: inset 0 0 0 2px rgba(34, 159, 92, 0.16), 0 0 18px rgba(34, 159, 92, 0.18);
      }
      .calendar-day.today.event { box-shadow: inset 0 0 0 2px rgba(34, 159, 92, 0.18), inset 0 -3px 0 rgba(34, 159, 92, 0.70), 0 0 18px rgba(34, 159, 92, 0.18); }
      .calendar-day.today .calendar-day-top strong {
        min-width: 30px;
        text-align: center;
        border-radius: 999px;
        padding: 3px 8px;
        color: #f9ffe8;
        background: linear-gradient(180deg, #31b36a, #11633b);
        box-shadow: 0 0 12px rgba(34, 159, 92, 0.36);
      }
      .event-calendar .calendar-day { min-height: 148px; }
      .attendance-calendar-card .event-calendar .calendar-day { min-height: 172px; }
      .calendar-detail-list { display: grid; gap: 12px; margin-top: 16px; }
      .calendar-detail-card {
        border: 1px solid rgba(92, 55, 18, 0.16);
        border-radius: 10px;
        background: rgba(255, 247, 219, 0.50);
        padding: 14px;
      }
      .calendar-detail-card h3 { font-size: 18px; margin-top: 7px; }
      .calendar-detail-card p { margin: 8px 0 0; color: #5f4729; }
      .calendar-detail-card .activity-time { margin-top: 6px; }
      .attendance-summary-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 12px;
        margin-bottom: 18px;
      }
      .attendance-summary-card {
        border: 1px solid rgba(92, 55, 18, 0.16);
        border-radius: 10px;
        background: rgba(255, 247, 219, 0.50);
        padding: 14px;
      }
      .attendance-summary-card span {
        display: block;
        color: #76552e;
        font-size: 11px;
        font-weight: 1000;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .attendance-summary-card strong {
        display: block;
        margin-top: 7px;
        color: #2d1a08;
        font-size: 25px;
      }
      .attendance-focus-list { display: grid; gap: 10px; }
      .attendance-focus-item {
        display: grid;
        gap: 8px;
        border: 1px solid rgba(92, 55, 18, 0.16);
        border-radius: 10px;
        background: rgba(255, 247, 219, 0.46);
        padding: 13px;
      }
      .attendance-focus-item h4 { margin: 0; color: #2d1a08; }
      .complaint-form-card { display: grid; gap: 14px; }
      .complaint-form-card .form-grid { margin-top: 8px; }
      .complaint-preview {
        border: 1px dashed rgba(92, 55, 18, 0.28);
        border-radius: 10px;
        background: rgba(255, 247, 219, 0.42);
        padding: 12px;
        color: #5f4729;
        font-weight: 850;
      }
      .complaint-thumb {
        display: block;
        width: 120px;
        height: 84px;
        object-fit: cover;
        border-radius: 8px;
        border: 1px solid rgba(92, 55, 18, 0.18);
        margin-top: 8px;
      }
      .complaint-detail {
        display: grid;
        gap: 14px;
      }
      .complaint-detail-message {
        border: 1px solid rgba(92, 55, 18, 0.16);
        border-radius: 10px;
        background: rgba(255, 247, 219, 0.54);
        padding: 16px;
        color: #3a220c;
        white-space: pre-wrap;
        line-height: 1.55;
        font-weight: 750;
      }
      .complaint-detail-image {
        display: block;
        width: 100%;
        max-height: 62vh;
        object-fit: contain;
        border-radius: 12px;
        border: 1px solid rgba(92, 55, 18, 0.22);
        background: rgba(47, 27, 10, 0.10);
      }
      .complaint-detail-meta {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 10px;
      }
      .alliance-stats-card { padding: 24px; }
      .metric-picker {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(72px, 1fr));
        gap: 7px;
        margin: 0 0 16px;
      }
      .metric-button {
        min-height: 38px;
        border: 1px solid rgba(106, 63, 20, 0.22);
        border-radius: 8px;
        background: rgba(53, 25, 20, 0.08);
        color: #4d260f;
        padding: 6px 7px;
        font-size: 10px;
        font-weight: 1000;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        transition: transform 140ms ease, border-color 140ms ease, box-shadow 140ms ease, background 140ms ease;
      }
      .metric-button:hover, .metric-button:focus-visible {
        transform: translateY(-1px);
        border-color: rgba(210, 138, 30, 0.62);
        box-shadow: 0 8px 18px rgba(103, 63, 17, 0.12);
        outline: none;
      }
      .metric-button.active {
        background: linear-gradient(180deg, #ffec83, #c6791a);
        border-color: rgba(255, 240, 138, 0.94);
        color: #201006;
        box-shadow: 0 0 18px rgba(255, 214, 90, 0.36), inset 0 1px 0 rgba(255,255,255,0.55);
      }
      .power-list { display: grid; gap: 12px; }
      .power-trend-row {
        width: 100%;
        display: grid;
        grid-template-columns: minmax(190px, 1fr) minmax(280px, 1.8fr) auto;
        gap: 18px;
        align-items: center;
        border: 1px solid rgba(120, 73, 24, 0.20);
        border-radius: 10px;
        background: linear-gradient(180deg, rgba(255, 247, 219, 0.58), rgba(227, 188, 111, 0.24));
        padding: 14px 16px;
        color: #311d0a;
        text-align: left;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.42);
      }
      .power-trend-row.top-stat-player {
        border-color: rgba(32, 143, 79, 0.42);
        background: linear-gradient(180deg, rgba(222, 255, 218, 0.44), rgba(247, 219, 138, 0.40));
        box-shadow: inset 4px 0 0 rgba(32, 143, 79, 0.70), inset 0 1px 0 rgba(255,255,255,0.48);
      }
      .power-trend-row:hover, .power-trend-row:focus {
        transform: translateY(-1px);
        border-color: rgba(190, 123, 24, 0.45);
        box-shadow: 0 12px 24px rgba(103, 63, 17, 0.14), inset 0 1px 0 rgba(255,255,255,0.45);
        outline: none;
      }
      .power-player { display: flex; align-items: center; gap: 12px; min-width: 0; }
      .power-player .member-avatar { width: 48px; height: 48px; box-shadow: 0 0 18px rgba(170, 103, 18, 0.14); }
      .power-player-info { min-width: 0; }
      .power-player strong { display: block; font-size: 15px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .power-player span { display: block; margin-top: 4px; color: #76552e; font-size: 12px; font-weight: 900; }
      .stat-rank {
        display: inline-flex;
        width: max-content;
        margin-bottom: 7px;
        border-radius: 999px;
        padding: 3px 8px;
        background: rgba(32, 143, 79, 0.14);
        color: #11633b;
        border: 1px solid rgba(32, 143, 79, 0.25);
        font-size: 10px;
        font-weight: 1000;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .power-spark-wrap { display: grid; gap: 4px; min-width: 0; }
      .power-sparkline {
        width: 100%;
        height: 72px;
        border-radius: 8px;
        background: linear-gradient(180deg, rgba(255, 246, 208, 0.58), rgba(205, 144, 45, 0.20));
        border: 1px solid rgba(110, 69, 24, 0.14);
      }
      .power-sparkline .grid-line { stroke: rgba(110, 69, 24, 0.14); stroke-width: 1; }
      .power-sparkline .spark-fill { fill: rgba(185, 107, 28, 0.16); }
      .power-sparkline .spark-line { fill: none; stroke: #9b4c0e; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; filter: drop-shadow(0 0 4px rgba(255, 214, 90, 0.34)); }
      .power-sparkline .spark-dot { fill: #fff2a8; stroke: #8e430c; stroke-width: 2; }
      .power-sparkline .chart-label { fill: #6e512d; font-size: 10px; font-weight: 900; }
      .power-sparkline .chart-latest { fill: #3a220c; font-size: 11px; font-weight: 1000; }
      .power-spark-meta { color: #795a35; font-size: 11px; font-weight: 900; }
      .trend-pill {
        justify-self: end;
        min-width: 94px;
        border-radius: 999px;
        padding: 8px 10px;
        text-align: center;
        font-size: 12px;
        font-weight: 1000;
        border: 1px solid rgba(92, 55, 18, 0.16);
        background: rgba(255, 247, 219, 0.58);
      }
      .trend-pill.up { color: #12643d; background: rgba(72, 173, 93, 0.18); }
      .trend-pill.down { color: #8f1f22; background: rgba(179, 38, 47, 0.14); }
      .trend-pill.flat { color: #6b502f; }
      .member-power-chart {
        margin-top: 14px;
        border: 1px solid rgba(98, 62, 24, 0.20);
        border-radius: 10px;
        background: linear-gradient(180deg, rgba(255, 247, 219, 0.64), rgba(219, 171, 91, 0.28));
        padding: 14px;
      }
      .member-power-chart-head {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: flex-start;
        margin-bottom: 12px;
      }
      .member-power-chart h4 { margin: 0; font-size: 18px; }
      .member-power-chart p { margin: 4px 0 0; color: #6d512f; font-weight: 850; }
      .member-power-chart svg { display: block; width: 100%; height: 190px; }
      .power-history-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin-top: 10px; }
      .power-history-list span { border: 1px solid rgba(98, 62, 24, 0.14); border-radius: 8px; padding: 8px 10px; background: rgba(255,247,219,0.44); font-weight: 900; color: #4d3216; }
      .interactive-chart {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(180px, 0.42fr);
        gap: 12px;
        align-items: stretch;
      }
      .interactive-chart .power-sparkline { height: 210px; }
      .chart-point {
        fill: #fff2a8;
        stroke: #8e430c;
        stroke-width: 2.4;
        cursor: pointer;
        transition: r 140ms ease, filter 140ms ease, fill 140ms ease;
      }
      .chart-point:hover,
      .chart-point.selected {
        r: 6;
        fill: #4ff0aa;
        filter: drop-shadow(0 0 7px rgba(79, 240, 170, 0.72));
      }
      .chart-detail {
        border: 1px solid rgba(98, 62, 24, 0.18);
        border-radius: 10px;
        padding: 13px;
        background: rgba(255,247,219,0.48);
        display: grid;
        align-content: center;
        gap: 7px;
        color: #4d3216;
        font-weight: 900;
      }
      .chart-detail span { color: #725736; font-size: 12px; font-weight: 850; }
      .upload-comparison {
        margin-top: 12px;
        display: grid;
        gap: 8px;
      }
      .upload-comparison-row {
        display: grid;
        grid-template-columns: minmax(112px, 0.7fr) minmax(90px, 0.6fr) minmax(90px, 0.6fr) minmax(92px, 0.7fr);
        gap: 10px;
        align-items: center;
        border: 1px solid rgba(98, 62, 24, 0.14);
        border-radius: 8px;
        padding: 8px 10px;
        background: rgba(255,247,219,0.42);
        color: #4d3216;
        font-size: 12px;
        font-weight: 900;
        text-align: left;
      }
      .upload-comparison-row:hover,
      .upload-comparison-row.selected {
        border-color: rgba(32, 143, 79, 0.32);
        background: rgba(222, 255, 218, 0.30);
      }
      .upload-comparison-row small { display: block; margin-top: 3px; color: #80613a; font-weight: 800; }
      .upload-comparison-row strong { color: #2d1a08; }
      .upload-comparison-row strong.up { color: #12643d; }
      .upload-comparison-row strong.down { color: #8f1f22; }
      .upload-comparison-row strong.flat { color: #6b502f; }
      .account-link-note {
        margin-top: 14px;
        border: 1px solid rgba(32, 143, 79, 0.25);
        border-radius: 10px;
        background: rgba(222, 255, 218, 0.34);
        padding: 12px 14px;
        color: #31531e;
        font-weight: 900;
      }
      .farm-grid {
        margin-top: 12px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 10px;
      }
      .farm-card {
        border: 1px solid rgba(98, 62, 24, 0.18);
        border-radius: 10px;
        background: rgba(255, 247, 219, 0.50);
        padding: 12px;
        color: #3a220c;
        display: grid;
        gap: 9px;
        text-align: left;
      }
      .farm-card:hover, .farm-card:focus {
        border-color: rgba(190, 123, 24, 0.46);
        box-shadow: 0 10px 20px rgba(103, 63, 17, 0.12);
        outline: none;
      }
      .farm-card-head { display: flex; align-items: center; gap: 10px; }
      .farm-card-head .member-avatar { width: 42px; height: 42px; }
      .farm-card h4 { margin: 0; font-size: 15px; }
      .farm-card small { color: #725736; font-weight: 850; }
      .farm-stats { display: flex; flex-wrap: wrap; gap: 8px; }
      .farm-stats span {
        border-radius: 999px;
        background: rgba(92, 55, 18, 0.10);
        border: 1px solid rgba(92, 55, 18, 0.12);
        padding: 5px 8px;
        color: #5d350e;
        font-size: 11px;
        font-weight: 1000;
      }
      .farm-picker {
        display: grid;
        gap: 8px;
      }
      .farm-picker-selected {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        border: 1px solid rgba(32, 143, 79, 0.26);
        border-radius: 8px;
        background: rgba(222, 255, 218, 0.30);
        color: #31531e;
        padding: 8px 10px;
        font-size: 12px;
        font-weight: 1000;
      }
      .farm-picker-selected button {
        border: 0;
        background: transparent;
        color: #8f1f22;
        font-weight: 1000;
        padding: 0;
      }
      .farm-search-results {
        display: grid;
        gap: 6px;
        max-height: 220px;
        overflow: auto;
        border-radius: 8px;
      }
      .farm-search-result {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        border: 1px solid rgba(98, 62, 24, 0.16);
        border-radius: 8px;
        background: rgba(255, 247, 219, 0.48);
        color: #3a220c;
        padding: 8px 10px;
        text-align: left;
      }
      .farm-search-result:hover,
      .farm-search-result:focus {
        border-color: rgba(190, 123, 24, 0.46);
        background: rgba(255, 214, 90, 0.18);
        outline: none;
      }
      .farm-search-result .member-avatar { width: 34px; height: 34px; }
      .farm-search-result strong { display: block; font-size: 13px; }
      .farm-search-result span span { display: block; margin-top: 2px; color: #76552e; font-size: 11px; font-weight: 850; }
      .command-board { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
      .command-card { padding: 14px; border: 1px solid rgba(92, 55, 18, 0.18); border-radius: 10px; background: rgba(255, 247, 219, 0.48); }
      .command-card code { display: inline-block; margin-bottom: 8px; font-weight: 1000; color: #8b3d15; }
      .tool-picker { display: grid; gap: 14px; max-width: 420px; }
      .card, .preview { padding: 20px; }
      .card-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 16px; }
      .card p { color: #5f4729; line-height: 1.55; font-weight: 650; }

      .module-card { min-height: 168px; padding: 21px 19px; transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease; }
      .module-card:hover { transform: translateY(-2px); border-color: rgba(255, 214, 90, 0.72); box-shadow: 0 22px 44px rgba(100,55,17,0.28), 0 0 18px rgba(255,214,90,0.18); }
      .module-top { display: flex; justify-content: space-between; gap: 16px; align-items: flex-start; }
      .meta { margin-top: 11px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      .meta span, .meta strong, .badge {
        border-radius: 5px;
        padding: 5px 8px;
        font-size: 12px;
        font-weight: 1000;
      }
      .meta span { background: rgba(92, 55, 18, 0.12); color: #5d350e; border: 1px solid rgba(92,55,18,0.12); }
      .meta strong, .badge.good { background: rgba(18, 122, 70, 0.13); color: #16603d; }
      .badge.warn { background: rgba(255, 214, 90, 0.24); color: #7c4b08; }
      .badge.bad { background: rgba(179, 38, 47, 0.12); color: #8c1d22; }
      .module-card p { min-height: 58px; color: #5f4729; line-height: 1.45; font-weight: 700; }

      .switch {
        width: 52px;
        height: 26px;
        border: 0;
        border-radius: 999px;
        background: rgba(83, 49, 18, 0.20);
        padding: 3px;
        flex: 0 0 auto;
      }
      .switch i { display: block; width: 20px; height: 20px; border-radius: 50%; background: #8c6b41; }
      .switch.on i { margin-left: auto; background: linear-gradient(135deg, #ffe88a, #b96b1c); box-shadow: 0 0 18px rgba(255, 214, 90, 0.42); }
      .module-actions { display: flex; gap: 10px; align-items: center; }
      .module-actions button {
        border: 0;
        border-radius: 5px;
        background: rgba(255, 238, 183, 0.62);
        color: #5d350e;
        padding: 9px 12px;
        font-weight: 1000;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }

      table { width: 100%; border-collapse: collapse; min-width: 760px; }
      th, td { padding: 14px 16px; border-bottom: 1px solid rgba(98, 62, 24, 0.20); text-align: left; vertical-align: top; }
      th { color: #5d350e; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; background: rgba(210, 162, 83, 0.28); }
      td { color: #2b1706; }
      .table-wrap { overflow-x: auto; }
      tbody tr { transition: background 150ms ease, transform 150ms ease; }

      .empty, .error, .skeleton {
        border: 1px dashed rgba(100, 62, 22, 0.42);
        border-radius: 10px;
        padding: 28px;
        color: var(--muted);
        background: rgba(255, 247, 219, 0.38);
        text-align: center;
        font-weight: 800;
      }
      .error { border-color: #9b2d24; color: #7a1715; }
      .locked-note {
        margin-bottom: 16px;
        border: 1px solid rgba(250, 204, 21, 0.32);
        background: rgba(255, 224, 126, 0.22);
        color: #5d350e;
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
      .list li { background: rgba(255, 247, 219, 0.42); border: 1px solid var(--line); border-radius: 7px; padding: 12px 14px; }
      .member-cell { display: flex; align-items: center; gap: 12px; min-width: 240px; }
      .member-avatar {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        flex: 0 0 auto;
        object-fit: cover;
        background: linear-gradient(135deg, #f4db9d, #ba7b2c);
        border: 1px solid rgba(92, 55, 18, 0.36);
        color: #2b1706;
        font-weight: 1000;
      }
      .member-name { display: block; font-weight: 1000; color: var(--text); }
      .member-username { display: block; margin-top: 3px; color: var(--muted); font-size: 12px; font-weight: 800; }
      .member-row { cursor: pointer; }
      .member-row:hover, .member-row:focus {
        background: rgba(255, 214, 90, 0.16);
        outline: none;
      }
      .member-row:focus-visible { box-shadow: inset 3px 0 0 var(--gold); }
      .players { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
      .attendance-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
      .attendance-group {
        border: 1px solid rgba(98, 62, 24, 0.25);
        border-radius: 9px;
        background: rgba(255, 247, 219, 0.38);
        padding: 12px;
      }
      .attendance-group h4 { display: flex; justify-content: space-between; gap: 10px; margin: 0 0 10px; font-size: 14px; }
      .attendance-group ul { display: grid; gap: 7px; margin: 0; padding: 0; list-style: none; }
      .attendance-group li { border-bottom: 1px solid rgba(98, 62, 24, 0.14); padding-bottom: 7px; font-weight: 850; }
      .attendance-group li:last-child { border-bottom: 0; padding-bottom: 0; }
      .attendance-detail-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
      .attendance-detail-head h3 { margin: 0 0 8px; font-size: clamp(28px, 4vw, 44px); }
      .attendance-total { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 12px; }
      .stack { display: grid; gap: 14px; }
      .preview {
        border-left: 5px solid #b96b1c;
        min-height: 220px;
      }
      .preview h3 { margin-bottom: 12px; }
      .preview .image { display: none; margin-top: 14px; width: 100%; border-radius: 8px; border: 1px solid var(--line); }
      .preview .thumb { width: 64px; height: 64px; object-fit: cover; border-radius: 8px; border: 1px solid var(--line); float: right; display: none; margin-left: 12px; }
      .preview footer { margin-top: 16px; color: var(--muted); font-size: 13px; }

      .toast-stack { position: fixed; right: 18px; bottom: 18px; z-index: 30; display: grid; gap: 10px; width: min(380px, calc(100vw - 36px)); }
      .toast { border: 1px solid rgba(100, 62, 22, 0.40); background: #fff0c6; color: #241509; border-radius: 9px; padding: 13px 14px; box-shadow: 0 18px 40px rgba(0,0,0,0.35); font-weight: 750; }
      .toast.success { border-color: rgba(92,255,200,0.35); }
      .toast.error { border-color: rgba(255,79,98,0.5); }
      .kofi-tip {
        position: fixed;
        right: 22px;
        bottom: 22px;
        z-index: 40;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        border: 1px solid rgba(255,255,255,0.45);
        border-radius: 999px;
        padding: 10px 16px 10px 10px;
        background: linear-gradient(135deg, #00b9fe, #018bd8);
        color: #fff;
        font-weight: 1000;
        text-decoration: none;
        box-shadow: 0 18px 38px rgba(0, 185, 254, 0.32), 0 0 0 3px rgba(255,255,255,0.12);
        transition: transform 160ms ease, box-shadow 160ms ease;
      }
      .kofi-tip:hover { transform: translateY(-2px); box-shadow: 0 22px 44px rgba(0, 185, 254, 0.42), 0 0 0 4px rgba(255,255,255,0.16); }
      .kofi-tip img { width: 34px; height: 34px; border-radius: 50%; background: rgba(255,255,255,0.20); }

      .member-modal {
        position: fixed;
        inset: 0;
        z-index: 50;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 18px;
      }
      body.modal-open { overflow: hidden; }
      .member-modal.open { display: flex; }
      .member-modal-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(20, 12, 6, 0.72);
        backdrop-filter: blur(8px);
      }
      .member-modal-panel {
        position: relative;
        z-index: 1;
        width: min(720px, calc(100vw - 28px));
        max-height: calc(100vh - 36px);
        overflow: auto;
        border-radius: 12px;
        border: 1px solid rgba(111, 69, 25, 0.42);
        background:
          radial-gradient(circle at 50% -12%, rgba(255,255,255,0.32), transparent 28%),
          linear-gradient(180deg, rgba(255, 243, 203, 0.98), rgba(216, 178, 106, 0.98)),
          var(--paper);
        box-shadow: 0 35px 110px rgba(0, 0, 0, 0.66), inset 0 1px 0 rgba(255,255,255,0.07);
        padding: 22px;
      }
      .modal-close {
        position: absolute;
        top: 14px;
        right: 14px;
        width: 34px;
        height: 34px;
        border-radius: 8px;
        border: 1px solid rgba(250, 204, 21, 0.18);
        background: rgba(92, 55, 18, 0.12);
        color: #4a2b10;
        font-size: 20px;
        line-height: 1;
      }
      .member-profile-hero {
        display: grid;
        grid-template-columns: 92px 1fr;
        gap: 18px;
        align-items: center;
        padding-right: 42px;
      }
      .profile-avatar {
        width: 92px;
        height: 92px;
        border-radius: 22px;
        display: grid;
        place-items: center;
        object-fit: cover;
        border: 1px solid rgba(250, 204, 21, 0.42);
        background: radial-gradient(circle, rgba(250, 204, 21, 0.22), rgba(255, 77, 117, 0.14) 56%, rgba(15, 23, 42, 0.92));
        box-shadow: 0 0 34px rgba(250, 204, 21, 0.16);
        color: #fff7d6;
        font-size: 34px;
        font-weight: 1000;
      }
      .avatar-button {
        position: relative;
        width: 92px;
        height: 92px;
        border: 0;
        border-radius: 22px;
        padding: 0;
        background: transparent;
        cursor: pointer;
      }
      .avatar-button .profile-avatar {
        width: 100%;
        height: 100%;
      }
      .avatar-button::after {
        content: "Upload";
        position: absolute;
        inset: auto 8px 8px;
        border-radius: 999px;
        padding: 5px 8px;
        background: rgba(58, 34, 12, 0.84);
        color: #fff7d6;
        font-size: 10px;
        font-weight: 1000;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        opacity: 0;
        transform: translateY(4px);
        transition: 0.18s ease;
      }
      .avatar-button:hover::after,
      .avatar-button:focus-visible::after {
        opacity: 1;
        transform: translateY(0);
      }
      .avatar-button:focus-visible {
        outline: 3px solid rgba(250, 204, 21, 0.7);
        outline-offset: 4px;
      }
      .profile-kicker { color: var(--gold-soft); text-transform: uppercase; letter-spacing: 0.11em; font-size: 11px; font-weight: 1000; }
      .member-profile-hero h3 { margin-top: 4px; font-size: 28px; }
      .profile-subtitle { color: #6d512f; font-weight: 800; margin-top: 5px; }
      .profile-stats {
        margin-top: 20px;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
      }
      .profile-stat {
        border: 1px solid rgba(250, 204, 21, 0.13);
        border-radius: 8px;
        padding: 13px;
        background: rgba(255, 247, 219, 0.46);
      }
      .profile-stat span { color: #725736; display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 1000; }
      .profile-stat strong { display: block; margin-top: 6px; color: #3a220c; font-size: 17px; overflow-wrap: anywhere; }
      .profile-note {
        margin-top: 14px;
        border: 1px solid rgba(250, 204, 21, 0.13);
        border-radius: 8px;
        padding: 14px;
        background: rgba(255, 247, 219, 0.46);
        color: #4d3216;
        line-height: 1.55;
        font-weight: 700;
      }
      .power-meter {
        margin-top: 16px;
        height: 9px;
        border-radius: 999px;
        background: rgba(255,255,255,0.08);
        overflow: hidden;
      }
      .power-meter i {
        display: block;
        height: 100%;
        width: var(--power-width, 0%);
        background: linear-gradient(90deg, #ff4d75, #ff7438, #facc15);
        box-shadow: 0 0 18px rgba(250, 204, 21, 0.28);
      }
      .avatar-cropper {
        position: fixed;
        inset: 0;
        z-index: 80;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 18px;
      }
      .avatar-cropper.open { display: flex; }
      .avatar-cropper-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(20, 12, 6, 0.76);
        backdrop-filter: blur(8px);
      }
      .avatar-cropper-panel {
        position: relative;
        z-index: 1;
        width: min(460px, calc(100vw - 28px));
        border: 1px solid rgba(111, 69, 25, 0.42);
        border-radius: 12px;
        background:
          radial-gradient(circle at 50% -10%, rgba(255,255,255,0.36), transparent 28%),
          linear-gradient(180deg, rgba(255, 243, 203, 0.99), rgba(222, 184, 110, 0.99)),
          var(--paper);
        box-shadow: 0 35px 110px rgba(0, 0, 0, 0.68);
        padding: 22px;
      }
      .avatar-crop-frame {
        --avatar-zoom: 1;
        width: min(340px, calc(100vw - 84px));
        aspect-ratio: 1 / 1;
        margin: 18px auto 14px;
        overflow: hidden;
        border-radius: 28px;
        border: 2px solid rgba(250, 204, 21, 0.52);
        background: radial-gradient(circle, rgba(250, 204, 21, 0.20), rgba(45, 24, 8, 0.84));
        box-shadow: inset 0 0 32px rgba(0,0,0,0.26), 0 18px 42px rgba(70, 37, 9, 0.22);
      }
      .avatar-crop-frame img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(var(--avatar-zoom));
        transform-origin: center;
        transition: transform 0.12s ease;
      }
      .avatar-crop-controls {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 10px;
        align-items: center;
      }
      .avatar-crop-controls input[type="range"] {
        width: 100%;
        accent-color: #d99a12;
      }
      .avatar-crop-actions {
        margin-top: 16px;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        flex-wrap: wrap;
      }
      .avatar-zoom-readout {
        color: #6d512f;
        font-size: 12px;
        font-weight: 1000;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }

      @media (max-width: 1120px) {
        .grid, .stats, .form-grid, .quick-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .two, .players, .dashboard-main, .attendance-grid { grid-template-columns: 1fr; }
      }
      @media (max-width: 780px) {
        body { background-attachment: scroll; }
        .shell { width: 100%; min-height: 100vh; margin: 0; border-radius: 0; grid-template-columns: 1fr; border-left: 0; border-right: 0; }
        .shell > aside { min-height: auto; padding: 14px; }
        .brand { margin-bottom: 14px; }
        nav { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
        nav a { min-height: 44px; padding: 8px 9px; font-size: 13px; }
        .nav-icon { width: 26px; height: 26px; }
        .content { padding: 20px 14px 26px; }
        .hero, .topbar { grid-template-columns: 1fr; display: grid; align-items: start; }
        .topbar { padding: 14px; gap: 12px; }
        .top-actions { width: 100%; flex-wrap: wrap; }
        .top-actions .server-clock { flex: 1 1 100%; justify-items: start; }
        .top-actions .auth-button { flex: 1; }
        .profile-top-button { flex: 1 1 100%; min-width: 0; }
        .grid, .stats, .form-grid, .quick-grid, .overview-kpis, .time-row, .command-board, .power-trend-row, .power-history-list, .interactive-chart { grid-template-columns: 1fr; }
        .upload-comparison-row { grid-template-columns: 1fr 1fr; }
        .trend-pill { justify-self: stretch; }
        .calendar-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .member-modal { padding: 10px; align-items: end; }
        .member-modal-panel { width: 100%; max-height: calc(100vh - 24px); border-radius: 14px 14px 0 0; padding: 18px; }
        .member-profile-hero { grid-template-columns: 1fr; text-align: center; padding-right: 0; justify-items: center; }
        .profile-stats { grid-template-columns: 1fr; }
        .modal-close { top: 10px; right: 10px; }
        .kofi-tip { right: 14px; bottom: 14px; padding: 9px 13px 9px 9px; }
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
        <nav aria-label="Dashboard navigation" data-sidebar-nav>${navItems.filter((item) => !item.adminOnly).map(navLink).join("")}</nav>
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
          <div class="top-actions" aria-label="Quick actions">
            <div class="server-clock" title="Call of Dragons server time">
              <span>Server Time</span>
              <strong data-server-clock>--:--:-- UTC</strong>
            </div>
            <span class="auth-pill" data-auth-status>Checking login...</span>
            <button class="profile-top-button" type="button" data-link-button="/profile" data-profile-button title="My Profile" style="display:none"><img src="/assets/icons/members.png" alt="" /><span><strong>My Profile</strong><em>Edit your player card</em></span></button>
            <button class="profile-top-button feedback-top-button" type="button" data-action="open-complaint-form" title="Complaint or suggestion"><img src="/assets/icons/complaints.png" alt="" /><span><strong>Feedback</strong><em>Complaint or suggestion</em></span></button>
            <button class="auth-button" type="button" data-action="discord-login" data-auth-login title="Discord Login">Login</button>
            <button class="auth-button" type="button" data-action="discord-logout" data-auth-logout title="Logout" style="display:none">Logout</button>
          </div>
        </header>
        <div class="content">
          <section id="app" aria-live="polite"><div class="skeleton">Loading Kella dashboard...</div></section>
        </div>
      </main>
    </div>
    <div id="memberModal" class="member-modal" aria-hidden="true">
      <div class="member-modal-backdrop" data-member-modal-close></div>
      <section class="member-modal-panel" role="dialog" aria-modal="true" aria-labelledby="memberModalTitle">
        <button class="modal-close" type="button" data-member-modal-close aria-label="Close member stats">×</button>
        <div data-member-modal-content></div>
      </section>
    </div>
    <div id="avatarCropper" class="avatar-cropper" aria-hidden="true"></div>
    <div id="toasts" class="toast-stack" aria-live="polite"></div>
    <a class="kofi-tip" href="https://ko-fi.com/exuz19" target="_blank" rel="noreferrer"><img src="/assets/kellacoin.png" alt="" />Tip Me</a>
    <script>
      const app = document.getElementById("app");
      const toasts = document.getElementById("toasts");
      const memberModal = document.getElementById("memberModal");
      const memberModalContent = document.querySelector("[data-member-modal-content]");
      const avatarCropper = document.getElementById("avatarCropper");
      const state = { summary: null, reports: [], members: [], allMembers: [], alerts: [], events: [], complaints: [], uploads: null, settings: null, channels: null, templates: null, currentReport: null, profile: null, auth: null, statsMetric: "power", chartSelections: {}, avatarEditor: null };
      const dashboardNavItems = ${JSON.stringify(navItems)};
      const dashboardModules = ${JSON.stringify(modules)};
      const statMetricOptions = [
        { key: "power", label: "Power" },
        { key: "merits", label: "Merits" },
        { key: "unitsHealed", label: "Healed" },
        { key: "unitsDead", label: "Deaths" },
        { key: "unitsKilled", label: "Killed" },
        { key: "resourcesGathered", label: "Resources" },
        { key: "woodGathered", label: "Wood" },
        { key: "goldGathered", label: "Gold" },
        { key: "oreGathered", label: "Ore" },
        { key: "manaGathered", label: "Mana" },
        { key: "gemsGathered", label: "Gems" },
        { key: "timesScouted", label: "Scouted" },
        { key: "helpGiven", label: "Helps" },
        { key: "t1Kills", label: "T1 Kills" },
        { key: "t2Kills", label: "T2 Kills" },
        { key: "t3Kills", label: "T3 Kills" },
        { key: "t4Kills", label: "T4 Kills" },
        { key: "t5Kills", label: "T5 Kills" },
        { key: "kvkJoinCount", label: "KVK Join" },
        { key: "kvkWinCount", label: "KVK Win" },
        { key: "troopPower", label: "Troops" },
        { key: "buildingPower", label: "Building" },
        { key: "techPower", label: "Tech" },
        { key: "heroPower", label: "Hero" },
        { key: "policyPower", label: "Policy" },
        { key: "honourKills", label: "Honour" },
        { key: "mpRatio", label: "M/P Ratio" },
        { key: "buildTime", label: "Build Time" },
        { key: "destroyTime", label: "Destroy Time" },
        { key: "serverRank", label: "Server Rank" },
        { key: "castleLevel", label: "Castle" }
      ];
      dashboardModules.splice(Math.max(0, dashboardModules.length - 2), 0, {
        id: "complaints",
        name: "Complaints",
        badge: "Feedback",
        command: "/complain",
        description: "Members send private complaints or suggestions. Admins can mark them Pending or Resolved."
      });

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

      function formatUtcDateTime(value) {
        if (!value) return "Unknown";
        return new Intl.DateTimeFormat("en-GB", {
          timeZone: "UTC",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        }).format(new Date(value)).replace(",", "") + " UTC";
      }

      function updateServerClock() {
        const target = document.querySelector("[data-server-clock]");
        if (!target) return;
        target.textContent = new Intl.DateTimeFormat("en-GB", {
          timeZone: "UTC",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        }).format(new Date()) + " UTC";
      }

      function adminToken() {
        return localStorage.getItem("kellaAdminKey") || "";
      }

      function isDashboardAdmin() {
        return Boolean(state.auth?.isDashboardAdmin);
      }

      function hasAdminAccess() {
        return isDashboardAdmin() || Boolean(adminToken());
      }

      function pathRequiresAdmin(path) {
        return path.startsWith("/roots") ||
          ["/tools", "/events", "/alerts", "/shield-alerts", "/embed-sender", "/complaints", "/settings"].some(function(prefix) {
            return path === prefix || path.startsWith(prefix + "/");
          });
      }

      function navItemHtml(item) {
        return '<a href="' + escapeHtml(item.path) + '" data-link data-path="' + escapeHtml(item.path) + '"><img class="nav-icon" src="' + escapeHtml(item.icon) + '" alt="" loading="lazy" /><span>' + escapeHtml(item.label) + '</span></a>';
      }

      function renderSidebarNav() {
        const nav = document.querySelector("[data-sidebar-nav]");
        if (!nav) return;
        nav.innerHTML = dashboardNavItems
          .filter(function(item) { return !item.adminOnly || hasAdminAccess(); })
          .map(navItemHtml)
          .join("");
        setActiveNav();
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
        const response = await fetch(url, { credentials: "same-origin", headers: admin ? requestHeaders(false) : { accept: "application/json" } });
        return parseResponse(response);
      }

      async function sendJson(method, url, body, admin = false) {
        const response = await fetch(url, { method, credentials: "same-origin", headers: admin ? requestHeaders(true) : { accept: "application/json", "content-type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
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

      function formatNumber(value) {
        const parsed = Number(value || 0);
        return Number.isFinite(parsed) ? parsed.toLocaleString("en-US") : "0";
      }

      function memberDisplayName(member) {
        return member?.discordDisplayName || member?.discordName || member?.ign || member?.discordId || "Unknown Member";
      }

      function memberUsername(member) {
        const username = member?.discordUsername || memberDiscordUserId(member) || "";
        return username ? "@" + String(username).replace(/^@/, "") : "No Discord username";
      }

      function memberDiscordUserId(member) {
        const discordId = String(member?.discordId || "");
        return /^\\d{15,25}$/.test(discordId) ? discordId : "";
      }

      function memberLordId(member) {
        const uid = String(member?.uid || "");
        if (uid.startsWith("discord-")) return "";
        if (/^\\d{15,25}$/.test(uid)) return "";
        return uid;
      }

      function isDmCapableMember(member) {
        return Boolean(memberDiscordUserId(member));
      }

      function memberAvatar(member, className) {
        const displayName = memberDisplayName(member);
        const photoUrl = member?.profilePhotoUrl || member?.discordAvatarUrl;
        if (photoUrl) {
          return '<img class="' + className + '" src="' + escapeHtml(photoUrl) + '" alt="" loading="lazy" />';
        }
        return '<span class="' + className + '">' + escapeHtml(displayName.slice(0, 1).toUpperCase()) + '</span>';
      }

      function memberAvatarUploadButton(member, mode) {
        const memberId = mode === "manual" ? "" : (member?.id || "");
        const avatarHtml = mode === "manual"
          ? '<span class="profile-avatar">+</span>'
          : memberAvatar(member, "profile-avatar");
        return '<button class="avatar-button" type="button" data-action="open-avatar-upload" data-avatar-mode="' + escapeHtml(mode || "admin") + '" data-member-id="' + escapeHtml(memberId) + '" title="Upload and crop profile photo" aria-label="Upload and crop profile photo">' + avatarHtml + '</button>';
      }

      function closeAvatarCropper() {
        state.avatarEditor = null;
        if (!avatarCropper) return;
        avatarCropper.classList.remove("open");
        avatarCropper.setAttribute("aria-hidden", "true");
        avatarCropper.innerHTML = "";
      }

      function clampAvatarZoom(value) {
        const parsed = Number(value);
        if (!Number.isFinite(parsed)) return 1;
        return Math.max(1, Math.min(3, parsed));
      }

      function setAvatarZoom(value) {
        if (!state.avatarEditor) return;
        state.avatarEditor.zoom = clampAvatarZoom(value);
        const frame = avatarCropper?.querySelector("[data-avatar-frame]");
        const slider = avatarCropper?.querySelector("[data-avatar-zoom]");
        const readout = avatarCropper?.querySelector("[data-avatar-zoom-readout]");
        if (frame) frame.style.setProperty("--avatar-zoom", String(state.avatarEditor.zoom));
        if (slider && String(slider.value) !== String(state.avatarEditor.zoom)) slider.value = String(state.avatarEditor.zoom);
        if (readout) readout.textContent = Math.round(state.avatarEditor.zoom * 100) + "%";
      }

      function openAvatarCropper(imageSrc, mode, memberId) {
        if (!avatarCropper) return;
        state.avatarEditor = { imageSrc, mode: mode || "admin", memberId: memberId || "", zoom: 1 };
        avatarCropper.innerHTML =
          '<div class="avatar-cropper-backdrop" data-action="close-avatar-cropper"></div>' +
          '<section class="avatar-cropper-panel" role="dialog" aria-modal="true" aria-label="Crop player photo">' +
            '<button class="modal-close" type="button" data-action="close-avatar-cropper" aria-label="Close photo cropper">Ã—</button>' +
            '<span class="profile-kicker">Player Photo</span><h3>Frame the portrait</h3>' +
            '<p class="muted">Zoom until the face fits the square, then use the cropped photo before saving the player.</p>' +
            '<div class="avatar-crop-frame" data-avatar-frame style="--avatar-zoom:1"><img src="' + escapeHtml(imageSrc) + '" alt="" /></div>' +
            '<div class="avatar-zoom-readout" data-avatar-zoom-readout>100%</div>' +
            '<div class="avatar-crop-controls">' +
              '<button class="secondary" type="button" data-action="avatar-zoom-out">-</button>' +
              '<input type="range" min="1" max="3" step="0.05" value="1" data-avatar-zoom aria-label="Photo zoom" />' +
              '<button class="secondary" type="button" data-action="avatar-zoom-in">+</button>' +
            '</div>' +
            '<div class="avatar-crop-actions"><button class="secondary" type="button" data-action="close-avatar-cropper">Cancel</button><button class="primary" type="button" data-action="apply-avatar-crop">Use Cropped Photo</button></div>' +
          '</section>';
        avatarCropper.classList.add("open");
        avatarCropper.setAttribute("aria-hidden", "false");
      }

      function openAvatarFilePicker(mode, memberId) {
        if (!hasAdminAccess()) {
          toast("Admin access is required to upload profile photos.", "error");
          return;
        }
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/png,image/jpeg,image/webp,image/gif";
        input.addEventListener("change", function() {
          const file = input.files?.[0];
          if (!file) return;
          if (!file.type.startsWith("image/")) {
            toast("Please choose an image file.", "error");
            return;
          }
          if (file.size > 5 * 1024 * 1024) {
            toast("Image is too large. Choose one under 5 MB.", "error");
            return;
          }
          const reader = new FileReader();
          reader.onload = function() {
            if (typeof reader.result === "string") openAvatarCropper(reader.result, mode, memberId);
          };
          reader.onerror = function() { toast("Kella could not read that image.", "error"); };
          reader.readAsDataURL(file);
        });
        input.click();
      }

      function cropAvatarToDataUrl(imageSrc, zoom) {
        return new Promise(function(resolve, reject) {
          const image = new Image();
          image.onload = function() {
            const size = 360;
            const canvas = document.createElement("canvas");
            canvas.width = size;
            canvas.height = size;
            const context = canvas.getContext("2d");
            if (!context) {
              reject(new Error("Image editor is not available in this browser."));
              return;
            }
            context.fillStyle = "#2d1808";
            context.fillRect(0, 0, size, size);
            const coverScale = Math.max(size / image.naturalWidth, size / image.naturalHeight) * clampAvatarZoom(zoom);
            const drawWidth = image.naturalWidth * coverScale;
            const drawHeight = image.naturalHeight * coverScale;
            context.drawImage(image, (size - drawWidth) / 2, (size - drawHeight) / 2, drawWidth, drawHeight);
            resolve(canvas.toDataURL("image/jpeg", 0.86));
          };
          image.onerror = function() { reject(new Error("Kella could not prepare that image.")); };
          image.src = imageSrc;
        });
      }

      function setAvatarFormPhoto(dataUrl, mode, memberId) {
        const fieldSelector = mode === "manual" ? '[data-manual-member="profilePhotoUrl"]' : '[data-admin-member="profilePhotoUrl"]';
        const field = memberModalContent?.querySelector(fieldSelector);
        if (field) field.value = dataUrl;
        const buttonSelector = mode === "manual"
          ? '[data-avatar-mode="manual"]'
          : '[data-avatar-mode="admin"][data-member-id="' + CSS.escape(String(memberId || "")) + '"]';
        const button = memberModalContent?.querySelector(buttonSelector);
        if (button) button.innerHTML = '<img class="profile-avatar" src="' + escapeHtml(dataUrl) + '" alt="" loading="lazy" />';
      }

      async function applyAvatarCrop() {
        const editor = state.avatarEditor;
        if (!editor) throw new Error("Choose a photo first.");
        const dataUrl = await cropAvatarToDataUrl(editor.imageSrc, editor.zoom);
        setAvatarFormPhoto(dataUrl, editor.mode, editor.memberId);
        const message = editor.mode === "manual" ? "Photo ready. Click Save Member." : "Photo ready. Click Save Player.";
        closeAvatarCropper();
        return message;
      }

      function findMemberById(id) {
        return allRosterMembers().find(function(member) { return String(member.id) === String(id); });
      }

      function allRosterMembers() {
        const byId = new Map();
        (state.allMembers || []).concat(state.members || []).forEach(function(member) {
          if (member?.id) byId.set(String(member.id), member);
        });
        return Array.from(byId.values());
      }

      function mainAccountFor(member) {
        const mainId = String(member?.mainMemberId || "");
        return mainId ? findMemberById(mainId) : null;
      }

      function farmAccountsFor(member) {
        const id = String(member?.id || "");
        if (!id) return [];
        return allRosterMembers()
          .filter(function(item) { return String(item.mainMemberId || "") === id; })
          .sort(function(left, right) {
            const byPower = currentPowerValue(right) - currentPowerValue(left);
            if (byPower) return byPower;
            return memberDisplayName(left).localeCompare(memberDisplayName(right));
          });
      }

      function profileStat(label, value) {
        const safeValue = value === undefined || value === null || value === "" ? "Unknown" : value;
        return '<div class="profile-stat"><span>' + escapeHtml(label) + '</span><strong>' + escapeHtml(safeValue) + '</strong></div>';
      }

      function memberPowerPercent(member) {
        const strongestPower = Math.max.apply(null, (state.members || []).map(function(item) { return Number(item.power || 0); }).concat([Number(member?.power || 0), 1]));
        return Math.max(4, Math.min(100, Math.round((Number(member?.power || 0) / strongestPower) * 100)));
      }

      function dashboardAllianceTag(value) {
        const raw = String(value || "").trim();
        const bracketed = (raw.match(/\\[([^\\]]+)\\]/) || [])[1] || raw;
        return bracketed.replace(/[^a-z0-9]/gi, "").toLowerCase();
      }

      function isAllowedStatsAlliance(member) {
        return ["kog", "lwl", "mf"].includes(dashboardAllianceTag(member?.alliance));
      }

      function currentStatMetric() {
        return statMetricOptions.find(function(metric) { return metric.key === state.statsMetric; }) || statMetricOptions[0];
      }

      function formatCompactNumber(value) {
        const parsed = Number(value || 0);
        if (!Number.isFinite(parsed)) return "0";
        const sign = parsed < 0 ? "-" : "";
        const abs = Math.abs(parsed);
        const short = function(number, suffix) {
          const rounded = number >= 100 ? number.toFixed(0) : number >= 10 ? number.toFixed(1) : number.toFixed(2);
          return sign + rounded.replace(/\\.0+$|(?<=\\.\\d)0+$/g, "") + suffix;
        };
        if (abs >= 1000000000) return short(abs / 1000000000, "B");
        if (abs >= 1000000) return short(abs / 1000000, "M");
        if (abs >= 1000) return short(abs / 1000, "K");
        return sign + abs.toLocaleString("en-US");
      }

      function normalizeStatHistory(member, metricKey) {
        const metric = metricKey || currentStatMetric().key;
        const rows = [];
        (Array.isArray(member?.statHistory) ? member.statHistory : []).forEach(function(point) {
          const date = point?.date ? new Date(point.date) : null;
          const value = Number(point?.metrics?.[metric]);
          if (!date || !Number.isFinite(date.getTime()) || !Number.isFinite(value)) return;
          rows.push({ date: date, value: value, source: point?.source || "", filename: point?.filename || "" });
        });
        if (metric === "power") {
          (Array.isArray(member?.powerHistory) ? member.powerHistory : []).forEach(function(point) {
            const date = point?.date ? new Date(point.date) : null;
            const value = Number(point?.power || 0);
            if (!date || !Number.isFinite(date.getTime()) || !Number.isFinite(value)) return;
            rows.push({ date: date, value: value, source: point?.source || "", filename: point?.filename || "" });
          });
          if (!rows.length && Number(member?.power || 0) > 0) {
            rows.push({ date: new Date(), value: Number(member.power || 0), source: "Current", filename: "" });
          }
        }
        const byDay = new Map();
        rows
          .filter(function(point) { return Number.isFinite(point.value); })
          .sort(function(left, right) { return left.date.getTime() - right.date.getTime(); })
          .forEach(function(point) { byDay.set(point.date.toISOString().slice(0, 10), point); });
        return Array.from(byDay.values()).sort(function(left, right) { return left.date.getTime() - right.date.getTime(); });
      }

      function normalizePowerHistory(member) {
        return normalizeStatHistory(member, "power").map(function(point) {
          return { date: point.date, power: point.value, source: point.source, filename: point.filename };
        });
      }

      function latestStatPoint(member, metricKey) {
        const metric = metricKey || currentStatMetric().key;
        const history = normalizeStatHistory(member, metric);
        if (metric === "power") {
          const directPower = Number(member?.power || 0);
          if (Number.isFinite(directPower) && directPower > 0) {
            return { date: history.length ? history[history.length - 1].date : null, value: directPower };
          }
        }
        if (history.length) return history[history.length - 1];
        if (metric === "power") return { date: null, value: 0 };
        return { date: null, value: 0 };
      }

      function latestPowerPoint(member) {
        const latest = latestStatPoint(member, "power");
        return { date: latest.date, power: latest.value };
      }

      function currentPowerValue(member) {
        const directPower = Number(member?.power || 0);
        if (Number.isFinite(directPower) && directPower > 0) return directPower;
        const latest = latestPowerPoint(member);
        const latestPower = Number(latest.power || 0);
        return latestPower > 0 ? latestPower : 0;
      }

      function statDelta(member, metricKey) {
        const history = normalizeStatHistory(member, metricKey || currentStatMetric().key);
        if (history.length < 2) return null;
        return history[history.length - 1].value - history[history.length - 2].value;
      }

      function powerDelta(member) {
        return statDelta(member, "power");
      }

      function compactDate(value) {
        if (!value) return "";
        return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(value);
      }

      function formatDelta(delta) {
        if (delta === null || delta === undefined) return "No previous";
        if (delta === 0) return "No change";
        return (delta > 0 ? "+" : "") + formatCompactNumber(delta);
      }

      function trendClass(delta) {
        if (delta === null || delta === undefined || delta === 0) return "flat";
        return delta > 0 ? "up" : "down";
      }

      function statMetricPicker() {
        return '<div class="metric-picker" role="group" aria-label="Choose stat graph">' + statMetricOptions.map(function(metric) {
          return '<button class="metric-button ' + (metric.key === currentStatMetric().key ? "active" : "") + '" type="button" data-action="set-stats-metric" data-metric="' + escapeHtml(metric.key) + '">' + escapeHtml(metric.label) + '</button>';
        }).join("") + '</div>';
      }

      function sparklineSvg(history, height) {
        const h = height || 52;
        const width = 220;
        if (!history.length) {
          return '<div class="empty" style="padding:12px">No snapshots for this stat yet.</div>';
        }
        if (history.length === 1) {
          return '<svg class="power-sparkline" viewBox="0 0 ' + width + ' ' + h + '" role="img" aria-label="Single stat snapshot"><line class="grid-line" x1="8" y1="' + Math.round(h / 2) + '" x2="' + (width - 8) + '" y2="' + Math.round(h / 2) + '"></line><circle class="spark-dot" cx="' + Math.round(width / 2) + '" cy="' + Math.round(h / 2) + '" r="5"></circle><text class="chart-latest" x="' + (width - 10) + '" y="' + Math.max(16, Math.round(h / 2) - 8) + '" text-anchor="end">' + escapeHtml(formatCompactNumber(history[0].value)) + '</text></svg>';
        }

        const values = history.map(function(point) { return point.value; });
        const min = Math.min.apply(null, values);
        const max = Math.max.apply(null, values);
        const range = Math.max(1, max - min);
        const padX = 12;
        const padY = 18;
        const mid = min + range / 2;
        const points = history.map(function(point, index) {
          const x = padX + (index / Math.max(1, history.length - 1)) * (width - padX * 2);
          const y = h - padY - ((point.value - min) / range) * (h - padY * 2);
          return { x: x, y: y };
        });
        const pointText = points.map(function(point) { return point.x.toFixed(1) + "," + point.y.toFixed(1); }).join(" ");
        const fillText = padX + "," + (h - padY) + " " + pointText + " " + (width - padX) + "," + (h - padY);
        const first = points[0];
        const last = points[points.length - 1];
        return '<svg class="power-sparkline" viewBox="0 0 ' + width + ' ' + h + '" role="img" aria-label="Stat trend line">' +
          '<line class="grid-line" x1="8" y1="' + (h - padY) + '" x2="' + (width - 8) + '" y2="' + (h - padY) + '"></line>' +
          '<line class="grid-line" x1="8" y1="' + (h / 2).toFixed(1) + '" x2="' + (width - 8) + '" y2="' + (h / 2).toFixed(1) + '"></line>' +
          '<line class="grid-line" x1="8" y1="' + padY + '" x2="' + (width - 8) + '" y2="' + padY + '"></line>' +
          '<polygon class="spark-fill" points="' + fillText + '"></polygon>' +
          '<polyline class="spark-line" points="' + pointText + '"></polyline>' +
          '<text class="chart-label" x="10" y="' + (padY - 5) + '">' + escapeHtml(formatCompactNumber(max)) + '</text>' +
          '<text class="chart-label" x="10" y="' + ((h / 2) - 4).toFixed(1) + '">' + escapeHtml(formatCompactNumber(mid)) + '</text>' +
          '<text class="chart-label" x="10" y="' + (h - 4) + '">' + escapeHtml(formatCompactNumber(min)) + '</text>' +
          '<text class="chart-latest" x="' + (width - 10) + '" y="' + Math.max(16, last.y - 9).toFixed(1) + '" text-anchor="end">' + escapeHtml(formatCompactNumber(history[history.length - 1].value)) + '</text>' +
          '<circle class="spark-dot" cx="' + first.x.toFixed(1) + '" cy="' + first.y.toFixed(1) + '" r="4"></circle>' +
          '<circle class="spark-dot" cx="' + last.x.toFixed(1) + '" cy="' + last.y.toFixed(1) + '" r="5"></circle>' +
        '</svg>';
      }

      function chartSelectionKey(member, metricKey) {
        return String(member?.id || "profile") + ":" + String(metricKey || "power");
      }

      function selectedChartIndex(member, metricKey, history) {
        const key = chartSelectionKey(member, metricKey);
        const selected = Number(state.chartSelections[key]);
        if (Number.isInteger(selected) && selected >= 0 && selected < history.length) return selected;
        return Math.max(0, history.length - 1);
      }

      function uploadSourceLabel(point) {
        return point?.filename || point?.source || "Dashboard";
      }

      function uploadComparisonRows(member, metric, history, selectedIndex) {
        if (!history.length) return "";
        return '<div class="upload-comparison" aria-label="Upload comparisons">' + history.map(function(point, index) {
          const previous = index > 0 ? history[index - 1] : null;
          const delta = previous ? point.value - previous.value : null;
          return '<button type="button" class="upload-comparison-row' + (index === selectedIndex ? " selected" : "") + '" data-action="select-chart-point" data-member-id="' + escapeHtml(member?.id || "") + '" data-metric="' + escapeHtml(metric.key) + '" data-index="' + index + '">' +
            '<span><strong>' + escapeHtml(compactDate(point.date)) + '</strong><small>' + escapeHtml(uploadSourceLabel(point)) + '</small></span>' +
            '<span>' + escapeHtml(metric.label) + '<br><strong>' + escapeHtml(formatCompactNumber(point.value)) + '</strong></span>' +
            '<span>Vs Previous<br><strong class="' + trendClass(delta) + '">' + escapeHtml(delta === null ? "Baseline" : formatDelta(delta)) + '</strong></span>' +
            '<span>Upload #' + (index + 1) + '<br><strong>' + escapeHtml(formatDate(point.date)) + '</strong></span>' +
          '</button>';
        }).join("") + '</div>';
      }

      function interactiveStatChart(member, history, metric) {
        if (!history.length) return empty("No snapshots for this stat yet.");
        const width = 520;
        const h = 210;
        const padX = 34;
        const padY = 26;
        const values = history.map(function(point) { return Number(point.value || 0); });
        const min = Math.min.apply(null, values);
        const max = Math.max.apply(null, values);
        const range = Math.max(1, max - min);
        const flat = max === min;
        const mid = min + range / 2;
        const points = history.map(function(point, index) {
          const x = history.length === 1 ? width / 2 : padX + (index / Math.max(1, history.length - 1)) * (width - padX * 2);
          const y = flat ? h / 2 : h - padY - ((Number(point.value || 0) - min) / range) * (h - padY * 2);
          return { x: x, y: y, point: point };
        });
        const selectedIndex = selectedChartIndex(member, metric.key, history);
        const selected = history[selectedIndex] || history[history.length - 1];
        const previous = selectedIndex > 0 ? history[selectedIndex - 1] : null;
        const selectedDelta = previous ? selected.value - previous.value : null;
        const pointText = points.map(function(point) { return point.x.toFixed(1) + "," + point.y.toFixed(1); }).join(" ");
        const fillText = history.length > 1 ? padX + "," + (h - padY) + " " + pointText + " " + (width - padX) + "," + (h - padY) : "";
        const lineHtml = history.length > 1
          ? '<polygon class="spark-fill" points="' + fillText + '"></polygon><polyline class="spark-line" points="' + pointText + '"></polyline>'
          : '<line class="spark-line" x1="' + padX + '" y1="' + (h / 2).toFixed(1) + '" x2="' + (width - padX) + '" y2="' + (h / 2).toFixed(1) + '"></line>';
        const circleHtml = points.map(function(point, index) {
          const selectedClass = index === selectedIndex ? " selected" : "";
          return '<circle class="chart-point' + selectedClass + '" data-action="select-chart-point" data-member-id="' + escapeHtml(member?.id || "") + '" data-metric="' + escapeHtml(metric.key) + '" data-index="' + index + '" cx="' + point.x.toFixed(1) + '" cy="' + point.y.toFixed(1) + '" r="' + (index === selectedIndex ? 6 : 4.4) + '"><title>' + escapeHtml(compactDate(point.point.date) + ": " + formatCompactNumber(point.point.value)) + '</title></circle>';
        }).join("");
        const chart =
          '<div class="interactive-chart">' +
            '<svg class="power-sparkline" viewBox="0 0 ' + width + ' ' + h + '" role="img" aria-label="' + escapeHtml(metric.label) + ' upload trend">' +
              '<line class="grid-line" x1="12" y1="' + (h - padY) + '" x2="' + (width - 12) + '" y2="' + (h - padY) + '"></line>' +
              '<line class="grid-line" x1="12" y1="' + (h / 2).toFixed(1) + '" x2="' + (width - 12) + '" y2="' + (h / 2).toFixed(1) + '"></line>' +
              '<line class="grid-line" x1="12" y1="' + padY + '" x2="' + (width - 12) + '" y2="' + padY + '"></line>' +
              lineHtml +
              '<text class="chart-label" x="12" y="' + (padY - 8) + '">' + escapeHtml(formatCompactNumber(max)) + '</text>' +
              '<text class="chart-label" x="12" y="' + ((h / 2) - 6).toFixed(1) + '">' + escapeHtml(formatCompactNumber(mid)) + '</text>' +
              '<text class="chart-label" x="12" y="' + (h - 7) + '">' + escapeHtml(formatCompactNumber(min)) + '</text>' +
              circleHtml +
            '</svg>' +
            '<aside class="chart-detail"><strong>' + escapeHtml(compactDate(selected.date)) + ' Upload</strong><span>' + escapeHtml(metric.label) + ': ' + escapeHtml(formatCompactNumber(selected.value)) + '</span><span>' + escapeHtml(selectedDelta === null ? "First saved snapshot" : formatDelta(selectedDelta) + " from previous upload") + '</span><span>' + escapeHtml(uploadSourceLabel(selected)) + '</span></aside>' +
          '</div>';
        return chart + uploadComparisonRows(member, metric, history, selectedIndex);
      }

      function statTrendMeta(history) {
        if (!history.length) return "Upload dated Excel files to build this graph.";
        if (history.length === 1) return compactDate(history[0].date) + " only - upload another date to compare.";
        return compactDate(history[0].date) + " to " + compactDate(history[history.length - 1].date);
      }

      function powerTrendMeta(history) {
        return statTrendMeta(history.map(function(point) { return { date: point.date, value: point.power }; }));
      }

      function memberPowerChart(member) {
        const metric = currentStatMetric();
        const history = normalizeStatHistory(member, metric.key);
        const delta = statDelta(member, metric.key);
        return '<section class="member-power-chart"><div class="member-power-chart-head"><div><h4>' + escapeHtml(metric.label) + ' History</h4><p>' + escapeHtml(statTrendMeta(history)) + '</p></div><span class="trend-pill ' + trendClass(delta) + '">' + escapeHtml(formatDelta(delta)) + '</span></div>' +
          statMetricPicker() +
          interactiveStatChart(member, history, metric) +
          '</section>';
      }

      function accountRelationshipSection(member) {
        const main = mainAccountFor(member);
        if (!main) return "";
        return '<div class="account-link-note">Farm account under <button class="secondary" type="button" data-member-row data-member-id="' + escapeHtml(main.id || "") + '">' + escapeHtml(main.ign || memberDisplayName(main)) + '</button></div>';
      }

      function farmAccountsSection(member) {
        const farms = farmAccountsFor(member);
        if (!farms.length) return "";
        return '<section class="profile-note"><div class="card-header"><div><strong>Farm / Alt Accounts</strong><br><span class="muted">Linked accounts shown under this main profile.</span></div><span class="badge warn">' + farms.length + ' linked</span></div>' +
          '<div class="farm-grid">' + farms.map(function(farm) {
            const delta = powerDelta(farm);
            return '<button type="button" class="farm-card" data-member-row data-member-id="' + escapeHtml(farm.id || "") + '">' +
              '<span class="farm-card-head">' + memberAvatar(farm, "member-avatar") + '<span><h4>' + escapeHtml(farm.ign || memberDisplayName(farm)) + '</h4><small>' + escapeHtml(memberLordId(farm) || memberUsername(farm)) + '</small></span></span>' +
              '<span class="farm-stats"><span>Power ' + escapeHtml(formatCompactNumber(currentPowerValue(farm))) + '</span><span>' + escapeHtml(formatDelta(delta)) + '</span><span>' + escapeHtml(farm.alliance || "No alliance") + '</span></span>' +
              sparklineSvg(normalizeStatHistory(farm, "power"), 58) +
            '</button>';
          }).join("") + '</div></section>';
      }

      function roleOptions(selected) {
        return ["Owner", "Leader", "R4 Officer", "War Marshal", "Recruiter", "Event Manager", "Member"].map(function(role) {
          return '<option value="' + escapeHtml(role) + '"' + (role === selected ? " selected" : "") + '>' + escapeHtml(role) + '</option>';
        }).join("");
      }

      function memberSearchText(member) {
        return [
          member?.ign,
          memberDisplayName(member),
          memberUsername(member),
          memberLordId(member),
          memberDiscordUserId(member),
          member?.alliance,
          formatCompactNumber(currentPowerValue(member))
        ].join(" ").toLowerCase();
      }

      function mainAccountMatches(member, term = "", selectedOverride = "") {
        const selfId = String(member?.id || "");
        const searchTerm = String(term || "").trim().toLowerCase();
        const matches = allRosterMembers()
          .filter(function(item) { return String(item.id || "") !== selfId; })
          .filter(function(item) { return !searchTerm || memberSearchText(item).includes(searchTerm); })
          .sort(function(left, right) {
            const byPower = currentPowerValue(right) - currentPowerValue(left);
            if (byPower) return byPower;
            return memberDisplayName(left).localeCompare(memberDisplayName(right));
          });
        const currentMainId = String(selectedOverride || member?.mainMemberId || "");
        const selectedMember = currentMainId ? allRosterMembers().find(function(item) { return String(item.id || "") === currentMainId; }) : null;
        if (selectedMember && !matches.some(function(item) { return String(item.id || "") === currentMainId; })) {
          matches.unshift(selectedMember);
        }
        return matches;
      }

      function farmPickerSelected(member) {
        const main = mainAccountFor(member);
        if (!main) return "";
        return '<div class="farm-picker-selected"><span>Selected: ' + escapeHtml(main.ign || memberDisplayName(main)) + ' - ' + escapeHtml(formatCompactNumber(currentPowerValue(main))) + ' power</span><button type="button" data-action="clear-main-account">Clear</button></div>';
      }

      function farmSearchResults(member, term = "") {
        const searchTerm = String(term || "").trim();
        if (!searchTerm) return "";
        const matches = mainAccountMatches(member, searchTerm).slice(0, 12);
        if (!matches.length) return '<div class="empty" style="padding:12px">No players found. Try another name or Lord ID.</div>';
        return matches.map(function(item) {
          const meta = [
            memberLordId(item) ? "Lord ID " + memberLordId(item) : "",
            item.alliance || "",
            formatCompactNumber(currentPowerValue(item)) + " power"
          ].filter(Boolean).join(" - ");
          return '<button type="button" class="farm-search-result" data-action="select-main-account" data-main-member-id="' + escapeHtml(item.id || "") + '">' +
            memberAvatar(item, "member-avatar") +
            '<span><strong>' + escapeHtml(item.ign || memberDisplayName(item)) + '</strong><span>' + escapeHtml(meta) + '</span></span>' +
          '</button>';
        }).join("");
      }

      function farmPicker(member) {
        return '<div class="farm-picker">' +
          '<input type="hidden" data-admin-member="mainMemberId" value="' + escapeHtml(member?.mainMemberId || "") + '" />' +
          '<input data-admin-member-main-search placeholder="Search player name or Lord ID..." />' +
          '<div data-main-account-selected>' + farmPickerSelected(member) + '</div>' +
          '<div class="farm-search-results" data-main-account-results>' + farmSearchResults(member, "") + '</div>' +
        '</div>';
      }

      function adminMemberForm(member) {
        if (!isDashboardAdmin() && !adminToken()) {
          return '<div class="profile-note"><strong>Admin Edit</strong><br>Login as an admin or enter the Password in Settings to edit player data.</div>';
        }
        return '<section class="profile-note"><div class="card-header"><div><strong>Admin Edit</strong><br><span class="muted">Click the player portrait above to upload and crop a custom photo.</span></div><div class="toolbar"><button class="danger" data-action="delete-member" data-member-id="' + escapeHtml(member.id || "") + '">Delete Player</button><button class="primary" data-action="save-member-admin" data-member-id="' + escapeHtml(member.id || "") + '">Save Player</button></div></div><div class="form-grid" data-admin-member-form>' +
          '<input type="hidden" data-admin-member="profilePhotoUrl" value="' + escapeHtml(member.profilePhotoUrl || "") + '" />' +
          '<label>Discord User ID<input data-admin-member="discordId" value="' + escapeHtml(memberDiscordUserId(member)) + '" placeholder="Numeric Discord user ID" /><span class="muted">Used for Discord avatar/name sync, login, and DMs. Not the Call of Dragons Lord ID.</span></label>' +
          '<label>Discord Avatar URL<input data-admin-member="discordAvatarUrl" value="' + escapeHtml(member.discordAvatarUrl || "") + '" placeholder="https://..." /></label>' +
          '<label>IGN<input data-admin-member="ign" value="' + escapeHtml(member.ign || "") + '" /></label>' +
          '<label>Lord ID<input data-admin-member="uid" value="' + escapeHtml(memberLordId(member)) + '" /><span class="muted">Call of Dragons player ID used to sync roster stats.</span></label>' +
          '<label>Power<input type="number" min="0" data-admin-member="power" value="' + escapeHtml(member.power || 0) + '" /></label>' +
          '<label>Alliance<input data-admin-member="alliance" value="' + escapeHtml(member.alliance || "") + '" /></label>' +
          '<label>Farm Of' + farmPicker(member) + '</label>' +
          '<label>Rank<input data-admin-member="rank" value="' + escapeHtml(member.rank || "") + '" /></label>' +
          '<label>Role<select data-admin-member="role">' + roleOptions(member.role || "Member") + '</select></label>' +
          '<label>Timezone<input data-admin-member="timezone" value="' + escapeHtml(member.timezone || "") + '" /></label>' +
          '<label>Country<input data-admin-member="country" value="' + escapeHtml(member.country || "") + '" /></label>' +
          '<label class="wide">Officer Notes<textarea data-admin-member="notes">' + escapeHtml(member.notes || "") + '</textarea></label>' +
        '</div></section>';
      }

      function manualMemberForm() {
        const statFields = [
          ["merits", "Merits"],
          ["unitsKilled", "Units Killed"],
          ["unitsHealed", "Units Healed"],
          ["unitsDead", "Units Dead"],
          ["resourcesGathered", "Resources Gathered"],
          ["castleLevel", "Castle Level"]
        ];
        return '<section class="profile-note"><div class="card-header"><div><strong>Manual Player Card</strong><br><span class="muted">Create a member, add core stats, then save it into Kella.</span></div><button class="primary" data-action="save-manual-member">Save Member</button></div><div class="form-grid" data-manual-member-form>' +
          '<label>IGN<input data-manual-member="ign" placeholder="Player name" /></label>' +
          '<label>Lord ID<input data-manual-member="uid" placeholder="Call of Dragons Lord ID" /></label>' +
          '<label>Power<input type="number" min="0" data-manual-member="power" placeholder="0" /></label>' +
          '<label>Alliance<input data-manual-member="alliance" placeholder="KOGS" /></label>' +
          '<label>Game Rank<input data-manual-member="rank" placeholder="R4, R3, R2..." /></label>' +
          '<label>Role<select data-manual-member="role">' + roleOptions("Member") + '</select></label>' +
          '<input type="hidden" data-manual-member="profilePhotoUrl" />' +
          '<label>Discord User ID<input data-manual-member="discordId" placeholder="Optional numeric Discord User ID" /></label>' +
          '<label>Discord Username<input data-manual-member="discordUsername" placeholder="Optional" /></label>' +
          '<label>Country<input data-manual-member="country" placeholder="Unknown" /></label>' +
          '<label>Timezone<input data-manual-member="timezone" placeholder="UTC" /></label>' +
          '<label class="wide">Officer Notes<textarea data-manual-member="notes" placeholder="Private officer notes"></textarea></label>' +
          '<div class="wide"><h3 style="margin-bottom:10px">Stats</h3><div class="form-grid">' +
            statFields.map(function(field) {
              return '<label>' + escapeHtml(field[1]) + '<input type="number" min="0" data-manual-stat="' + escapeHtml(field[0]) + '" placeholder="0" /></label>';
            }).join("") +
          '</div></div>' +
        '</div></section>';
      }

      function openAddMemberModal() {
        if (!memberModal || !memberModalContent) return;
        memberModalContent.dataset.memberId = "";
        memberModalContent.innerHTML =
          '<div class="member-profile-hero">' +
            memberAvatarUploadButton(null, "manual") +
            '<div><span class="profile-kicker">Add Member</span><h3 id="memberModalTitle">Create Player Profile</h3><div class="profile-subtitle">Manual profile and stats entry for officers.</div></div>' +
          '</div>' +
          manualMemberForm();
        memberModal.classList.add("open");
        memberModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
      }

      function openMemberModal(member) {
        if (!member || !memberModal || !memberModalContent) return;
        memberModalContent.dataset.memberId = member.id || "";
        const displayName = memberDisplayName(member);
        const gameName = member.ign || displayName;
        const username = memberUsername(member);
        const power = formatNumber(member.power);
        memberModalContent.innerHTML =
          '<div class="member-profile-hero">' +
            (hasAdminAccess() ? memberAvatarUploadButton(member, "admin") : memberAvatar(member, "profile-avatar")) +
            '<div><span class="profile-kicker">Player Stats</span><h3 id="memberModalTitle">' + escapeHtml(displayName) + '</h3><div class="profile-subtitle">' + escapeHtml(username) + ' · IGN: ' + escapeHtml(gameName) + '</div><div class="power-meter" style="--power-width:' + memberPowerPercent(member) + '%"><i></i></div></div>' +
          '</div>' +
          '<div class="profile-stats">' +
            profileStat("Power", power) +
            profileStat("Lord ID", memberLordId(member) || "Not linked") +
            profileStat("Discord User ID", memberDiscordUserId(member) || "Not linked") +
            profileStat("Game Rank", member.rank || "") +
            profileStat("Alliance Role", member.role || "") +
            profileStat("Attendance", member.attendance ?? 0) +
            profileStat("Alliance", member.alliance || "") +
          '</div>' +
          '<div class="profile-note"><strong>Officer Notes</strong><br>' + escapeHtml(member.notes || "No notes yet.") + '</div>' +
          accountRelationshipSection(member) +
          memberPowerChart(member) +
          farmAccountsSection(member) +
          adminMemberForm(member);
        memberModal.classList.add("open");
        memberModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
      }

      function closeMemberModal() {
        if (!memberModal) return;
        closeAvatarCropper();
        memberModal.classList.remove("open");
        memberModal.setAttribute("aria-hidden", "true");
        if (memberModalContent) {
          delete memberModalContent.dataset.memberId;
          delete memberModalContent.dataset.complaintId;
        }
        document.body.classList.remove("modal-open");
      }

      function calendarDetailCard(item) {
        const eventActions = item.eventId
          ? '<p><button class="secondary" type="button" data-link-button="/attendance/' + escapeHtml(item.eventId) + '">View Attendance</button>' + (hasAdminAccess() ? '<button class="danger" type="button" data-action="delete-event" data-event-id="' + escapeHtml(item.eventId) + '" style="margin-left:8px">Delete Event</button>' : '') + '</p>'
          : '';
        return '<article class="calendar-detail-card">' +
          '<span class="badge warn">' + escapeHtml(item.kind || "Detail") + '</span>' +
          '<h3>' + escapeHtml(item.title || "Calendar Item") + '</h3>' +
          '<span class="activity-time">' + escapeHtml(item.meta || "") + '</span>' +
          '<p>' + escapeHtml(item.description || "") + '</p>' +
          eventActions +
        '</article>';
      }

      function attendanceGroups(event) {
        const attendance = event?.attendance || {};
        return {
          attending: Array.isArray(attendance.attending) ? attendance.attending : [],
          absent: Array.isArray(attendance.absent) ? attendance.absent : [],
          unsure: Array.isArray(attendance.unsure) ? attendance.unsure : []
        };
      }

      function attendanceGroup(title, players, badgeClass) {
        return '<div class="attendance-group"><h4><span>' + title + '</span><span class="badge ' + badgeClass + '">' + players.length + '</span></h4>' +
          (players.length ? '<ul>' + players.map(function(player) { return '<li>' + escapeHtml(player) + '</li>'; }).join("") + '</ul>' : '<span class="muted">None yet</span>') +
        '</div>';
      }

      function renderAttendanceGroups(event) {
        const groups = attendanceGroups(event);
        return '<div class="attendance-grid">' +
          attendanceGroup("Attending", groups.attending, "good") +
          attendanceGroup("Absent", groups.absent, "bad") +
          attendanceGroup("Not Sure", groups.unsure, "warn") +
        '</div>';
      }

      function calendarAttendanceSnapshot(events) {
        if (!events.length) return "";
        return '<div class="calendar-detail-list">' +
          events.map(function(event) {
            return '<article class="calendar-detail-card"><div class="card-header"><div><span class="badge warn">Event</span><h3>' + escapeHtml(event.title || "Alliance Event") + '</h3><span class="activity-time">' + formatUtcDateTime(event.startsAt) + '</span></div><div class="toolbar"><button class="secondary" type="button" data-link-button="/attendance/' + escapeHtml(event.id || "") + '">Full View</button>' + (hasAdminAccess() ? '<button class="danger" type="button" data-action="delete-event" data-event-id="' + escapeHtml(event.id || "") + '">Delete</button>' : '') + '</div></div><p>' + escapeHtml(event.description || "No description added.") + '</p>' + renderAttendanceGroups(event) + '</article>';
          }).join("") +
        '</div>';
      }

      function openCalendarDayModal(key, type) {
        if (!memberModal || !memberModalContent) return;
        const date = new Date(key + "T00:00:00Z");
        const title = type === "events" ? "Attendance Calendar" : "Activity Calendar";
        const dayEvents = eventsForDay(state.events || [], key);
        const items = type === "events"
          ? dayEvents.map(eventDetailItem)
          : calendarActivityItems(state.summary || {}, state.events || [], key);
        const dateLabel = new Intl.DateTimeFormat("en", {
          timeZone: "UTC",
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        }).format(date);
        memberModalContent.innerHTML =
          '<div class="member-profile-hero">' +
            '<span class="profile-avatar">' + date.getUTCDate() + '</span>' +
            '<div><span class="profile-kicker">' + escapeHtml(title) + '</span><h3 id="memberModalTitle">' + escapeHtml(dateLabel) + '</h3><div class="profile-subtitle">Call of Dragons server time - UTC</div></div>' +
          '</div>' +
          (type === "events"
            ? (dayEvents.length ? calendarAttendanceSnapshot(dayEvents) : empty("No event recorded for this day yet."))
            : ((items.length ? '<div class="calendar-detail-list">' + items.map(calendarDetailCard).join("") + '</div>' : empty("No activity recorded for this day yet.")) + calendarAttendanceSnapshot(dayEvents)));
        memberModal.classList.add("open");
        memberModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
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
          let active = path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
          if (path === "/roots-of-war") active = location.pathname.startsWith("/roots");
          if (path === "/tools") active = ["/tools", "/events", "/alerts", "/shield-alerts", "/embed-sender"].some(function(prefix) { return location.pathname.startsWith(prefix); });
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
        if (!query) {
          state.allMembers = state.members.slice();
        } else if (!state.allMembers.length) {
          const allData = await fetchJson("/api/dashboard/members");
          state.allMembers = allData.members || [];
        }
        return state.members;
      }

      async function loadProfile(force = false) {
        if (state.profile && !force) return state.profile;
        const data = await fetchJson("/api/dashboard/profile");
        state.profile = data.member;
        return state.profile;
      }

      async function loadAlerts() {
        const data = await fetchJson("/api/dashboard/alerts");
        state.alerts = data.alerts || [];
        return state.alerts;
      }

      async function loadDashboardEvents() {
        const data = await fetchJson("/api/dashboard/events");
        state.events = data.events || [];
        return state.events;
      }

      async function loadComplaints() {
        const data = await fetchJson("/api/dashboard/complaints", true);
        state.complaints = data.complaints || [];
        return state.complaints;
      }

      async function loadRosterUploads(force = false) {
        if (state.uploads && !force) return state.uploads;
        const data = await fetchJson("/api/dashboard/uploads", true);
        state.uploads = data.uploads || [];
        return state.uploads;
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

      function updateAuthStatus() {
        const target = document.querySelector("[data-auth-status]");
        const loginButton = document.querySelector("[data-auth-login]");
        const logoutButton = document.querySelector("[data-auth-logout]");
        const profileButton = document.querySelector("[data-profile-button]");
        const user = state.auth?.user;
        renderSidebarNav();
        if (!target) return;
        if (state.auth?.authenticated === false) {
          target.textContent = "Discord: not logged in";
          if (loginButton) loginButton.style.display = "";
          if (logoutButton) logoutButton.style.display = "none";
          if (profileButton) profileButton.style.display = "none";
          return;
        }
        if (user) {
          target.textContent = "Discord: " + (user.username || user.discordId) + (state.auth?.isDashboardAdmin ? " (Admin)" : " (Member)");
          if (loginButton) loginButton.style.display = "none";
          if (logoutButton) logoutButton.style.display = "";
          if (profileButton) profileButton.style.display = "";
          return;
        }
        target.textContent = "Checking login...";
      }

      async function loadAuth(force = false) {
        if (state.auth && !force) return state.auth;
        try {
          const response = await fetch("/api/auth/me", { credentials: "same-origin", headers: { accept: "application/json" } });
          if (response.status === 401) {
            state.auth = { authenticated: false, isDashboardAdmin: false };
          } else {
            state.auth = await parseResponse(response);
            state.auth.authenticated = true;
          }
        } catch {
          state.auth = { authenticated: false, isDashboardAdmin: false };
        }
        updateAuthStatus();
        return state.auth;
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

      function currentMonthDays() {
        const now = new Date();
        const year = now.getUTCFullYear();
        const month = now.getUTCMonth();
        const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
        return Array.from({ length: days }, function(_item, index) {
          return new Date(Date.UTC(year, month, index + 1));
        });
      }

      function monthTitle() {
        return new Intl.DateTimeFormat("en", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date());
      }

      function dayKey(value) {
        if (!value) return "";
        return new Date(value).toISOString().slice(0, 10);
      }

      function formatUtcTime(value) {
        if (!value) return "";
        return new Intl.DateTimeFormat("en-GB", {
          timeZone: "UTC",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        }).format(new Date(value)) + " UTC";
      }

      function inCurrentMonth(value) {
        if (!value) return false;
        const date = new Date(value);
        const now = new Date();
        return date.getUTCFullYear() === now.getUTCFullYear() && date.getUTCMonth() === now.getUTCMonth();
      }

      function addCount(map, value, amount = 1) {
        const key = dayKey(value);
        if (!key) return;
        map[key] = (map[key] || 0) + amount;
      }

      function eventAttendanceLine(event) {
        const attendance = event.attendance || {};
        const total = Number(attendance.attendingCount || 0) + Number(attendance.absentCount || 0) + Number(attendance.unsureCount || 0);
        return total
          ? attendance.attendingCount + " attending, " + attendance.absentCount + " absent, " + attendance.unsureCount + " unsure"
          : "No attendance yet";
      }

      function eventDetailItem(event) {
        return {
          kind: "Event",
          eventId: event.id || "",
          title: event.title || "Alliance Event",
          meta: formatUtcTime(event.startsAt) + " - " + eventAttendanceLine(event),
          description: event.description || "No description added.",
          link: event.messageLink || ""
        };
      }

      function eventsForDay(events, key) {
        return (events || [])
          .filter(function(event) { return dayKey(event.startsAt) === key; })
          .sort(function(a, b) { return new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(); });
      }

      function calendarActivityItems(summary, events, key) {
        const items = eventsForDay(events, key).map(eventDetailItem);
        if (summary.upcomingRoots && dayKey(summary.upcomingRoots.date) === key) {
          items.push({
            kind: "Roots",
            title: "Roots registration active",
            meta: "Created by " + (summary.upcomingRoots.createdBy || "Unknown Officer"),
            description: (summary.upcomingRoots.slots || []).map(function(slot) {
              return slot.label + ": " + slot.available + " available, " + slot.absent + " absent, " + slot.unsure + " unsure";
            }).join(" | ")
          });
        }
        (summary.recentRegistrations || []).forEach(function(registration) {
          if (dayKey(registration.sentAt) !== key) return;
          items.push({
            kind: "Roots Vote",
            title: (registration.player || "Player") + " chose " + (registration.status || "Unknown"),
            meta: (registration.slot || "Roots") + " - " + formatUtcTime(registration.sentAt),
            description: "Latest Roots of War attendance response."
          });
        });
        (summary.latestShieldAlerts || []).forEach(function(alert) {
          if (dayKey(alert.sentAt) !== key) return;
          items.push({
            kind: "Shield",
            title: "Shield warning sent to " + (alert.player || "Unknown Player"),
            meta: (alert.officer || "Dashboard") + " - " + formatUtcTime(alert.sentAt),
            description: "Officer shield alert activity."
          });
        });
        (summary.recentAdminActions || []).forEach(function(action) {
          if (dayKey(action.sentAt) !== key) return;
          items.push({
            kind: "Admin",
            title: (action.type || "Admin action").replaceAll("_", " "),
            meta: (action.officer || "Dashboard") + " - " + formatUtcTime(action.sentAt),
            description: action.target ? "Target: " + action.target : "Dashboard action."
          });
        });
        return items;
      }

      function renderCalendarCell(date, type, items) {
        const key = dayKey(date);
        const weekday = new Intl.DateTimeFormat("en", { weekday: "short", timeZone: "UTC" }).format(date);
        const isToday = key === dayKey(new Date());
        const visible = items.slice(0, 3);
        const entries = visible.length
          ? visible.map(function(item) {
              return '<span class="calendar-entry">' + escapeHtml(item.title) + '<small>' + escapeHtml(item.meta || item.kind || "") + '</small></span>';
            }).join("")
          : '<span class="calendar-empty">No event</span>';
        const more = items.length > visible.length ? '<span class="calendar-more">+' + (items.length - visible.length) + ' more</span>' : "";
        return '<button class="calendar-day' + (items.length ? " has-items event" : "") + (isToday ? " today" : "") + '" type="button" data-calendar-day="' + key + '" data-calendar-type="' + type + '">' +
          '<span class="calendar-day-top"><strong>' + date.getUTCDate() + '</strong><em>' + weekday + '</em></span>' +
          '<span class="calendar-day-list">' + entries + more + '</span>' +
        '</button>';
      }

      function renderActivityCalendar(summary, events) {
        return '<div class="calendar-grid activity-calendar">' + currentMonthDays().map(function(date) {
          const key = dayKey(date);
          return renderCalendarCell(date, "activity", calendarActivityItems(summary, events, key));
        }).join("") + '</div>';
      }

      function renderPowerBoard(members) {
        const metric = currentStatMetric();
        const allowedMembers = (members || []).filter(isAllowedStatsAlliance);
        const powerRankMap = new Map(allowedMembers
          .map(function(member) {
            return { member: member, value: currentPowerValue(member) };
          })
          .filter(function(item) { return item.value > 0; })
          .sort(function(a, b) { return Number(b.value || 0) - Number(a.value || 0); })
          .slice(0, 50)
          .map(function(item, index) { return [String(item.member.id || item.member.uid || item.member.discordId), index + 1]; }));
        const ranked = allowedMembers
          .map(function(member) {
            const latest = latestStatPoint(member, metric.key);
            const rankValue = metric.key === "power" ? currentPowerValue(member) : Number(latest.value || 0);
            return { member: member, power: currentPowerValue(member), rankValue: rankValue, latest: latest, history: normalizeStatHistory(member, metric.key), delta: statDelta(member, metric.key) };
          })
          .filter(function(item) { return Number(item.rankValue || 0) > 0 || item.history.length > 0; })
          .sort(function(a, b) {
            const byMetric = Number(b.rankValue || 0) - Number(a.rankValue || 0);
            if (byMetric) return byMetric;
            return Number(b.power || 0) - Number(a.power || 0);
          })
          .slice(0, 50);
        if (!ranked.length) return statMetricPicker() + empty("Upload a KoG, LWL, or mF Excel file to build the " + metric.label + " ranking.");
        return statMetricPicker() + '<div class="power-list">' + ranked.map(function(item, index) {
          const member = item.member;
          const rowId = escapeHtml(member.id || "");
          const powerRank = powerRankMap.get(String(member.id || member.uid || member.discordId));
          const statValueText = formatCompactNumber(item.rankValue);
          const metricRankLabel = "#" + (index + 1) + " " + metric.label.toUpperCase();
          return '<button type="button" class="power-trend-row' + (powerRank ? " top-stat-player" : "") + '" data-member-row data-member-id="' + rowId + '" aria-label="Open ' + escapeHtml(metric.label) + ' history for ' + escapeHtml(memberDisplayName(member)) + '">' +
            '<span class="power-player">' + memberAvatar(member, "member-avatar") + '<span class="power-player-info"><em class="stat-rank">' + escapeHtml(metricRankLabel) + (powerRank ? ' - Power #' + powerRank : '') + '</em><strong>' + escapeHtml(member.ign || memberDisplayName(member)) + '</strong><span>' + escapeHtml(memberUsername(member)) + ' - ' + escapeHtml(metric.label) + ': ' + statValueText + '</span></span></span>' +
            '<span class="power-spark-wrap">' + sparklineSvg(item.history, 82) + '<span class="power-spark-meta">' + escapeHtml(statTrendMeta(item.history)) + '</span></span>' +
            '<span class="trend-pill ' + trendClass(item.delta) + '">' + escapeHtml(formatDelta(item.delta)) + '</span>' +
          '</button>';
        }).join("") + '</div>';
      }

      function renderEventsCalendar(events) {
        return '<div class="calendar-grid event-calendar">' + currentMonthDays().map(function(date) {
          const key = dayKey(date);
          return renderCalendarCell(date, "events", eventsForDay(events, key).map(eventDetailItem));
        }).join("") + '</div>';
      }

      function renderActiveEvents(events) {
        const now = Date.now();
        const active = (events || []).filter(function(event) { return new Date(event.startsAt).getTime() >= now - 24 * 60 * 60 * 1000; }).slice(0, 5);
        if (!active.length) return empty("No active or upcoming events yet.");
        return '<div class="activity-list">' + active.map(function(event) {
          return '<div class="activity-item"><span class="activity-dot">E</span><div><strong>' + escapeHtml(event.title || "Alliance Event") + '</strong><span class="activity-time">' + formatUtcDateTime(event.startsAt) + '</span></div></div>';
        }).join("") + '</div>';
      }

      function renderCommandBoard() {
        const commands = [
          { command: "/roots", text: "Open Roots attendance." },
          { command: "/time utc:13 UTC", text: "Post a live countdown." },
          { command: "/complain message", text: "Send R4 feedback." },
          { command: "/checkin", text: "Daily activity button." }
        ];
        return '<div class="command-board">' + commands.map(function(item) {
          return '<button class="command-card" data-action="copy-command" data-value="' + escapeHtml(item.command) + '"><code>' + escapeHtml(item.command) + '</code><p>' + escapeHtml(item.text) + '</p></button>';
        }).join("") + '</div>';
      }

      function renderDashboardData(summary, members = [], events = []) {
        app.innerHTML =
          pageHeader("Dashboard", "A cleaner command room for events, power, and member activity.", '<button class="secondary" data-action="sync-discord-members">Sync Discord</button><button class="primary" data-link-button="/tools">Open Tools</button>') +
          '<section class="card" style="margin-bottom:18px"><div class="card-header"><div><h3>Event Calendar</h3><span class="muted">' + monthTitle() + ' active and past events. Click any day to view event attendance.</span></div><div class="toolbar"><button class="secondary" data-link-button="/attendance">Attendance</button><button class="primary" data-link-button="/tools">Create Event</button></div></div>' + renderEventsCalendar(events) + '</section>' +
          '<section class="card alliance-stats-card"><div class="card-header"><div><h3>Alliance Stats</h3><span class="muted">Top 50 rows follow the stat button you choose. Power uses current Power from the uploaded Excel file.</span></div><button class="secondary" data-link-button="/members">Members</button></div>' + renderPowerBoard(members) + '</section>';
      }

      async function renderDashboard() {
        skeleton("Loading dashboard...");
        try {
          const results = await Promise.all([loadSummary(), loadSettings(), loadMembers(), loadDashboardEvents()]);
          renderDashboardData(results[0], results[2], results[3]);
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load dashboard data. ' + escapeHtml(error.message) + '</div>';
        }
      }

      function renderMembersTable(members) {
        if (!members.length) return empty("No members found yet.");
        const sorted = members.slice().sort(function(a, b) {
          const byPower = Number(b.power || 0) - Number(a.power || 0);
          if (byPower) return byPower;
          return String(a.ign || "").localeCompare(String(b.ign || ""));
        });
        return '<div class="table-wrap"><table><thead><tr><th>Member</th><th>IGN</th><th>Lord ID</th><th>Power</th><th>Game Rank</th><th>Alliance Role</th><th>Attendance</th><th>Officer Notes</th></tr></thead><tbody>' +
          sorted.map(function(member) {
            const displayName = memberDisplayName(member);
            const rowId = escapeHtml(member.id || "");
            return '<tr class="member-row" data-member-row data-member-id="' + rowId + '" tabindex="0" role="button" aria-label="View stats for ' + escapeHtml(displayName) + '"><td><div class="member-cell">' + memberAvatar(member, "member-avatar") + '<span><span class="member-name">' + escapeHtml(displayName) + '</span><span class="member-username">' + escapeHtml(memberUsername(member)) + '</span></span></div></td><td>' + escapeHtml(member.ign) + '</td><td>' + escapeHtml(memberLordId(member) || "Not linked") + '</td><td>' + formatNumber(member.power) + '</td><td>' + escapeHtml(member.rank || "") + '</td><td>' + escapeHtml(member.role) + '</td><td>' + escapeHtml(member.attendance) + '</td><td>' + escapeHtml(member.notes || "") + '</td></tr>';
          }).join("") + '</tbody></table></div>';
      }

      function renderMemberUploadCard() {
        return '<section class="card" style="margin-bottom:18px"><div class="card-header"><div><h3>Roster Stat Upload</h3><span class="muted">Upload DragonStats JSON/CSV or Call of Dragons TopN Excel files for different dates. Kella keeps each dated snapshot for comparison graphs, imports only KoG, LWL, and mF, and uses the newest Power for ranking.</span></div><div class="toolbar"><button class="primary" data-action="upload-member-xlsx">Upload File</button></div></div><div class="form-grid">' +
          '<label class="wide">Roster File<input type="file" data-member-upload accept=".xlsx,.csv,.json,text/csv,application/json,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" /></label>' +
          '<label>Snapshot Date<input type="date" data-member-upload-date /><span class="muted">Optional. Kella reads dates from filenames like july-19-2026.xlsx. JSON also imports its previous values for the graph.</span></label>' +
        '</div></section>';
      }

      async function renderProfile() {
        skeleton("Loading your profile...");
        const auth = await loadAuth(true);
        if (!auth.authenticated) {
          app.innerHTML = pageHeader("My Profile", "Login with Discord to edit your own Kella profile card.", '<button class="primary" data-action="discord-login">Login with Discord</button>') +
            '<section class="card">' + empty("Your profile will appear here after Discord login.") + '</section>';
          return;
        }
        try {
          const profile = await loadProfile(true);
          const displayName = memberDisplayName(profile);
          app.innerHTML =
            pageHeader("My Profile", "Edit only your own IGN, timezone, country, and profile picture.", '<button class="primary" data-action="save-my-profile">Save Profile</button>') +
            '<section class="two"><div class="card">' +
              '<div class="member-profile-hero">' +
                memberAvatar(profile, "profile-avatar") +
                '<div><span class="profile-kicker">Logged-in Member</span><h3>' + escapeHtml(displayName) + '</h3><div class="profile-subtitle">' + escapeHtml(memberUsername(profile)) + ' · IGN: ' + escapeHtml(profile.ign || displayName) + '</div><div class="power-meter" style="--power-width:' + memberPowerPercent(profile) + '%"><i></i></div></div>' +
              '</div>' +
              '<div class="profile-stats">' +
                profileStat("Power", formatNumber(profile.power)) +
                profileStat("Lord ID", memberLordId(profile) || "Not linked") +
                profileStat("Discord User ID", memberDiscordUserId(profile) || "Not linked") +
                profileStat("Alliance Role", profile.role || "") +
              '</div>' +
              memberPowerChart(profile) +
            '</div><div class="card"><h3>Edit My Card</h3><div class="form-grid">' +
              '<label>IGN<input data-profile="ign" value="' + escapeHtml(profile.ign || "") + '" /></label>' +
              '<label>Timezone<input data-profile="timezone" value="' + escapeHtml(profile.timezone || "") + '" placeholder="UTC+8, EST, etc." /></label>' +
              '<label>Country<input data-profile="country" value="' + escapeHtml(profile.country || "") + '" /></label>' +
              '<label class="wide">Profile Photo URL<input data-profile="profilePhotoUrl" value="' + escapeHtml(profile.profilePhotoUrl || "") + '" placeholder="https://..." /></label>' +
            '</div><p class="muted" style="margin-top:12px">Only admins can change power, Lord ID, Discord User ID, rank, role, and officer notes.</p></div></section>';
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load your profile. ' + escapeHtml(error.message) + '</div>';
        }
      }

      async function renderMembers() {
        skeleton("Loading members...");
        try {
          const members = await loadMembers();
          const adminActions = hasAdminAccess()
            ? '<button class="secondary" data-action="sync-discord-members">Sync Discord</button><button class="primary" data-action="open-add-member">Add Member</button>'
            : "";
          app.innerHTML = pageHeader("Members", "Search members and review Discord profile, Lord ID, power, alliance role, attendance, and notes. Click any player row to open their full stats.", '<input class="search" data-member-search placeholder="Search members" />' + adminActions) + (hasAdminAccess() ? renderMemberUploadCard() : "") + renderMembersTable(members);
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load members. ' + escapeHtml(error.message) + '</div>';
        }
      }

      async function renderRootsRegistration() {
        skeleton("Loading Roots registration...");
        try {
          const reports = await loadReports();
          const latest = reports[0];
          let channelHtml = '<label>Discord Channel<input data-roots-channel-manual placeholder="Paste channel ID" /></label>';
          try {
            await loadChannels();
            channelHtml = '<label>Discord Channel<select data-roots-channel>' + channelOptions() + '</select></label>';
          } catch {
            channelHtml = '<label>Discord Channel<input data-roots-channel-manual placeholder="Paste channel ID or add Password in Settings" /></label>';
          }
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

      function defaultUtcParts() {
        const value = new Date(Date.now() + 60 * 60 * 1000);
        value.setUTCMinutes(0, 0, 0);
        return {
          date: value.toISOString().slice(0, 10),
          hour: String(value.getUTCHours()).padStart(2, "0"),
          minute: String(value.getUTCMinutes()).padStart(2, "0")
        };
      }

      function optionRange(count, selected) {
        return Array.from({ length: count }, function(_item, index) {
          const value = String(index).padStart(2, "0");
          return '<option value="' + value + '"' + (value === selected ? " selected" : "") + '>' + value + '</option>';
        }).join("");
      }

      function utcEventTimeControls() {
        const parts = defaultUtcParts();
        return '<div class="wide time-row">' +
          '<label>Event Date UTC<input type="date" data-event="date" value="' + parts.date + '" /></label>' +
          '<label>Hour UTC<select data-event="hour">' + optionRange(24, parts.hour) + '</select></label>' +
          '<label>Minute UTC<select data-event="minute">' + optionRange(60, parts.minute) + '</select></label>' +
        '</div>';
      }

      function eventFormValue(name) {
        return document.querySelector('[data-event="' + name + '"]')?.value?.trim() || "";
      }

      function eventPayload() {
        const date = eventFormValue("date");
        const hour = eventFormValue("hour");
        const minute = eventFormValue("minute");
        if (!date || !hour || !minute) throw new Error("Event date and 24-hour UTC time are required.");
        const startsAt = new Date(date + "T" + hour + ":" + minute + ":00Z");
        if (Number.isNaN(startsAt.getTime())) throw new Error("Event time is invalid.");
        return {
          channelId: eventFormValue("channelId") || eventFormValue("channelManual"),
          title: eventFormValue("title"),
          description: eventFormValue("description"),
          startsAt: startsAt.toISOString(),
          roleMentionId: eventFormValue("roleMentionId")
        };
      }

      function renderRecentEvents(events) {
        if (!events.length) return empty("No dashboard-created events yet.");
        function attendanceDetails(event) {
          return attendanceBadges(event) +
            '<details style="margin-top:8px"><summary>View players</summary><div style="margin-top:10px">' + renderAttendanceGroups(event) + '</div></details>';
        }
        return '<div class="table-wrap"><table><thead><tr><th>Event</th><th>Server Time</th><th>Attendance</th><th>Created By</th><th>Status</th><th>Actions</th></tr></thead><tbody>' +
          events.map(function(event) {
            const actions = '<div class="toolbar"><button class="secondary" type="button" data-link-button="/attendance/' + escapeHtml(event.id || "") + '">Open</button>' + (hasAdminAccess() ? '<button class="danger" type="button" data-action="delete-event" data-event-id="' + escapeHtml(event.id || "") + '">Delete</button>' : '') + '</div>';
            return '<tr><td><strong>' + escapeHtml(event.title || "Alliance Event") + '</strong><br><span class="muted">' + escapeHtml(event.description || "") + '</span></td><td>' + formatUtcDateTime(event.startsAt) + '</td><td>' + attendanceDetails(event) + '</td><td>' + escapeHtml(event.createdBy || "Dashboard") + '</td><td>' + escapeHtml(event.status || "Sent") + '</td><td>' + actions + '</td></tr>';
          }).join("") +
          '</tbody></table></div>';
      }

      function attendanceBadges(event) {
        const groups = attendanceGroups(event);
        return '<div class="toolbar"><span class="badge good">' + groups.attending.length + ' Attending</span><span class="badge bad">' + groups.absent.length + ' Absent</span><span class="badge warn">' + groups.unsure.length + ' Not Sure</span></div>';
      }

      function attendanceEventCard(event) {
        return '<article class="card"><div class="attendance-detail-head"><div><span class="badge warn">Event Attendance</span><h3>' + escapeHtml(event.title || "Alliance Event") + '</h3><p>' + escapeHtml(event.description || "No description added.") + '</p></div><div class="stack"><button class="primary" type="button" data-link-button="/attendance/' + escapeHtml(event.id || "") + '">View Attendance</button>' + (event.messageLink ? '<a class="secondary" target="_blank" rel="noreferrer" href="' + escapeHtml(event.messageLink) + '">Discord Message</a>' : "") + (hasAdminAccess() ? '<button class="danger" type="button" data-action="delete-event" data-event-id="' + escapeHtml(event.id || "") + '">Delete Event</button>' : "") + '</div></div>' +
          '<div class="attendance-total">' + attendanceBadges(event) + '</div>' +
          '<div style="margin-top:14px">' + renderAttendanceGroups(event) + '</div>' +
        '</article>';
      }

      function eventResponseTotal(event) {
        const groups = attendanceGroups(event);
        return groups.attending.length + groups.absent.length + groups.unsure.length;
      }

      function sortedEvents(events) {
        return (events || []).slice().sort(function(left, right) {
          return new Date(left.startsAt || 0).getTime() - new Date(right.startsAt || 0).getTime();
        });
      }

      function renderAttendanceSummary(events) {
        const today = dayKey(new Date());
        const now = Date.now();
        const monthEvents = (events || []).filter(function(event) { return inCurrentMonth(event.startsAt); });
        const todayEvents = (events || []).filter(function(event) { return dayKey(event.startsAt) === today; });
        const upcoming = (events || []).filter(function(event) { return new Date(event.startsAt || 0).getTime() >= now; });
        const responses = (events || []).reduce(function(total, event) { return total + eventResponseTotal(event); }, 0);
        return '<section class="attendance-summary-grid">' +
          '<div class="attendance-summary-card"><span>This Month</span><strong>' + monthEvents.length + '</strong><p>Events on the calendar</p></div>' +
          '<div class="attendance-summary-card"><span>Today</span><strong>' + todayEvents.length + '</strong><p>Events using UTC server day</p></div>' +
          '<div class="attendance-summary-card"><span>Upcoming</span><strong>' + upcoming.length + '</strong><p>Still active or scheduled</p></div>' +
          '<div class="attendance-summary-card"><span>Responses</span><strong>' + responses + '</strong><p>Total attendance clicks saved</p></div>' +
        '</section>';
      }

      function renderAttendanceFocus(events) {
        const now = Date.now();
        const upcoming = sortedEvents(events).filter(function(event) {
          return new Date(event.startsAt || 0).getTime() >= now - 2 * 60 * 60 * 1000;
        }).slice(0, 5);
        const needsReview = sortedEvents(events).filter(function(event) {
          return eventResponseTotal(event) === 0 || attendanceGroups(event).attending.length === 0;
        }).slice(0, 5);
        function item(event) {
          return '<button class="attendance-focus-item" type="button" data-link-button="/attendance/' + escapeHtml(event.id || "") + '"><h4>' + escapeHtml(event.title || "Alliance Event") + '</h4><span class="activity-time">' + formatUtcDateTime(event.startsAt) + '</span>' + attendanceBadges(event) + '</button>';
        }
        return '<section class="two" style="margin-top:18px">' +
          '<div class="card"><div class="card-header"><div><h3>Next Events</h3><span class="muted">Quick jump to upcoming attendance reports.</span></div></div>' + (upcoming.length ? '<div class="attendance-focus-list">' + upcoming.map(item).join("") + '</div>' : empty("No upcoming events yet.")) + '</div>' +
          '<div class="card"><div class="card-header"><div><h3>Needs Review</h3><span class="muted">Events with no responses or no attending players.</span></div></div>' + (needsReview.length ? '<div class="attendance-focus-list">' + needsReview.map(item).join("") + '</div>' : empty("Every event has at least one attending response.")) + '</div>' +
        '</section>';
      }

      async function renderAttendance() {
        skeleton("Loading attendance...");
        try {
          const events = await loadDashboardEvents();
          const actions = (hasAdminAccess() ? '<button class="secondary" data-link-button="/tools">Create Event</button>' : "") + '<button class="primary" data-action="refresh-events">Refresh</button>';
          app.innerHTML =
            pageHeader("Attendance Calendar", "Admin-friendly event attendance by UTC server day. Click any calendar day to see events and player responses.", actions) +
            renderAttendanceSummary(events) +
            '<section class="card attendance-calendar-card"><div class="card-header"><div><h3>' + monthTitle() + '</h3><span class="muted">Large days show event titles, server time, and response totals.</span></div><span class="badge good">Today is green</span></div>' + renderEventsCalendar(events) + '</section>' +
            renderAttendanceFocus(events) +
            '<section class="card" style="margin-top:18px"><div class="card-header"><div><h3>Recent Event Reports</h3><span class="muted">Use this table when you need exact counts or admin actions.</span></div></div>' + renderRecentEvents(sortedEvents(events).reverse()) + '</section>';
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load attendance. ' + escapeHtml(error.message) + '</div>';
        }
      }

      async function renderAttendanceDetails(id) {
        skeleton("Loading attendance report...");
        try {
          const events = await loadDashboardEvents();
          const event = events.find(function(item) { return String(item.id) === String(id); });
          if (!event) {
            app.innerHTML = pageHeader("Attendance", "This event could not be found.", '<button class="secondary" data-link-button="/attendance">Back to Attendance</button>') + '<section class="card">' + empty("No attendance report found for this event.") + '</section>';
            return;
          }
          app.innerHTML =
            pageHeader("Attendance Report", "One clean view for who is coming, absent, or unsure.", '<button class="secondary" data-link-button="/attendance">Back</button><button class="primary" data-action="refresh-events">Refresh</button>') +
            attendanceEventCard(event);
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load attendance report. ' + escapeHtml(error.message) + '</div>';
        }
      }

      async function renderEvents() {
        skeleton("Loading events...");
        let channelHtml = '<label>Discord Channel<input data-event="channelManual" placeholder="Paste channel ID" /></label>';
        try {
          await loadChannels();
          channelHtml = '<label>Discord Channel<select data-event="channelId">' + channelOptions() + '</select></label>';
        } catch {
          channelHtml = '<label>Discord Channel<input data-event="channelManual" placeholder="Paste channel ID or add Password in Settings" /></label>';
        }
        try {
          const events = await loadDashboardEvents();
          const commands = ["/roots", "/summit", "/attack", "/checkin", "/remind", "/absence", "/apply", "/complain"];
          app.innerHTML =
            pageHeader("Events", "Create event embeds with attendance buttons using Call of Dragons 24-hour UTC server time.", '<button class="primary" data-action="send-event-embed">Send Event</button>') +
            '<section class="card"><div class="card-header"><div><h3>Create Event Embed</h3><span class="muted">Kella sends Attending, Absent, and Not Sure buttons automatically.</span></div><span class="badge warn">24-hour UTC</span></div><div class="form-grid">' +
              channelHtml +
              '<label>Role Mention ID<input data-event="roleMentionId" placeholder="Optional role ID" /></label>' +
              '<label>Event Title<input data-event="title" placeholder="Summit, Roots of War, Fortress..." /></label>' +
              utcEventTimeControls() +
              '<label class="wide">Description<textarea data-event="description" placeholder="Tell members what to do, where to go, and what time to be ready."></textarea></label>' +
            '</div></section>' +
            '<section class="card" style="margin-top:18px"><div class="card-header"><h3>Recent Sent Events</h3><button class="secondary" data-action="refresh-events">Refresh</button></div>' + renderRecentEvents(events) + '</section>' +
            '<section class="grid" style="margin-top:18px">' + commands.map(function(command) {
              return '<div class="card"><div class="card-header"><h3>' + command + '</h3><button class="secondary" data-action="copy-command" data-value="' + command + '">Copy Command</button></div><p>Use this in Discord to create the matching Kella workflow.</p></div>';
            }).join("") + '</section>';
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load events. ' + escapeHtml(error.message) + '</div>';
        }
      }

      function toolPicker(selected) {
        const tools = [
          ["events", "Event Maker"],
          ["chat", "Kella Chat"],
          ["alerts", "Attack + DM Alerts"],
          ["shield", "Shield Alerts"],
          ["embed", "Embed Sender"]
        ];
        return '<section class="card tool-picker"><label>Choose Tool<select data-tool-select>' + tools.map(function(tool) {
          return '<option value="' + tool[0] + '"' + (tool[0] === selected ? " selected" : "") + '>' + tool[1] + '</option>';
        }).join("") + '</select></label></section>';
      }

      async function eventToolContent() {
        let channelHtml = '<label>Discord Channel<input data-event="channelManual" placeholder="Paste channel ID" /></label>';
        try {
          await loadChannels();
          channelHtml = '<label>Discord Channel<select data-event="channelId">' + channelOptions() + '</select></label>';
        } catch {
          channelHtml = '<label>Discord Channel<input data-event="channelManual" placeholder="Paste channel ID or add Password in Settings" /></label>';
        }
        const events = await loadDashboardEvents();
        return '<section class="card" style="margin-top:18px"><div class="card-header"><div><h3>Create Event Embed</h3><span class="muted">Kella sends Attending, Absent, and Not Sure buttons automatically.</span></div><div class="toolbar"><span class="badge warn">24-hour UTC</span><button class="primary" data-action="send-event-embed">Send Event</button></div></div><div class="form-grid">' +
            channelHtml +
            '<label>Role Mention ID<input data-event="roleMentionId" placeholder="Optional role ID" /></label>' +
            '<label>Event Title<input data-event="title" placeholder="Summit, Roots of War, Fortress..." /></label>' +
            utcEventTimeControls() +
            '<label class="wide">Description<textarea data-event="description" placeholder="Tell members what to do, where to go, and what time to be ready."></textarea></label>' +
          '</div></section>' +
          '<section class="card" style="margin-top:18px"><div class="card-header"><h3>Recent Sent Events</h3><button class="secondary" data-action="refresh-events">Refresh</button></div>' + renderRecentEvents(events) + '</section>';
      }

      async function chatToolContent() {
        let channelHtml = '<label>Discord Channel<input data-chat="channelManual" placeholder="Paste channel ID" /></label>';
        try {
          await loadChannels();
          channelHtml = '<label>Discord Channel<select data-chat="channelId">' + channelOptions() + '</select></label>';
        } catch {
          channelHtml = '<label>Discord Channel<input data-chat="channelManual" placeholder="Paste channel ID or add Password in Settings" /></label>';
        }
        return '<section class="card" style="margin-top:18px"><div class="card-header"><div><h3>Kella Chat</h3><span class="muted">Send a normal Discord message as Kella. Admin-only.</span></div><button class="primary" data-action="send-chat">Send as Kella</button></div><div class="form-grid">' +
          channelHtml +
          '<label>Role Mention ID<input data-chat="roleMentionId" placeholder="Optional role ID" /></label>' +
          '<label class="wide">Message<textarea data-chat="message" placeholder="Type the message Kella should send..."></textarea></label>' +
        '</div><p class="muted" style="margin-top:12px">This posts as the Kella bot account, not as your Discord user. Use it for normal alliance chat, reminders, and officer notes.</p></section>';
      }

      function alertsToolContent(alerts) {
        return '<section class="two" style="margin-top:18px">' + renderAttackTool() + renderDmAlertTool() + '</section>' +
          '<section class="card" style="margin-top:18px"><div class="card-header"><h3>Recent Alerts</h3><button class="secondary" data-action="refresh-alerts">Refresh</button></div>' + renderAlertsTable(alerts) + '</section>';
      }

      function shieldToolContent(alerts) {
        return '<section style="margin-top:18px">' + renderShieldTool() + '</section>' +
          '<section class="card" style="margin-top:18px"><div class="card-header"><h3>Recent Shield Alerts</h3><button class="secondary" data-action="refresh-alerts">Refresh</button></div>' + renderAlertsTable(alerts.filter(function(alert) { return alert.type === "shield_alert"; })) + '</section>';
      }

      async function embedToolContent() {
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
        return (channelsError || templatesError ? '<div class="error" style="margin-top:18px">' + escapeHtml(channelsError || templatesError) + '. Add your Admin Key in Settings if needed.</div>' : '') +
          '<section class="two" style="margin-top:18px"><div class="card stack"><div class="card-header"><h3>Embed Sender</h3><div class="toolbar"><button class="secondary" data-action="preview-embed">Preview</button><button class="secondary" data-action="save-template">Save Template</button><button class="danger" data-action="delete-template">Delete Template</button><button class="primary" data-action="send-embed">Send Embed</button></div></div><div class="form-grid">' +
            '<label>Saved Template<select data-template-select>' + templateOptions + '</select></label>' +
            channelField +
            '<label>Embed Title<input data-embed="title" value="Roots of War Reminder" /></label>' +
            '<label>Embed Color<input data-embed="color" value="#facc15" /></label>' +
            '<label class="wide">Embed Description<textarea data-embed="description">Roots of War registration is now open. Please choose your availability for 14 UTC or 20 UTC.</textarea></label>' +
            '<label>Image URL<input data-embed="imageUrl" placeholder="Optional image URL" /></label>' +
            '<label>Thumbnail URL<input data-embed="thumbnailUrl" placeholder="Optional thumbnail URL" /></label>' +
            '<label>Footer Text<input data-embed="footer" value="Sent by Kella" /></label>' +
            '<label>Mention Role<input data-embed="roleMentionId" placeholder="Optional role ID" /></label>' +
          '</div></div>' +
          '<aside class="preview" data-embed-preview><img class="thumb" data-preview-thumb alt="" /><h3 data-preview-title></h3><p data-preview-description></p><img class="image" data-preview-image alt="" /><footer data-preview-footer></footer></aside></section>';
      }

      async function renderTools(forcedTool) {
        skeleton("Loading tools...");
        const selected = forcedTool || new URLSearchParams(location.search).get("tool") || "events";
        try {
          let content = "";
          if (selected === "events") content = await eventToolContent();
          if (selected === "chat") content = await chatToolContent();
          if (selected === "alerts") {
            await Promise.all([loadChannels().catch(function() { state.channels = []; }), loadMembers().catch(function() { state.members = []; })]);
            content = alertsToolContent(await loadAlerts());
          }
          if (selected === "shield") {
            await loadMembers().catch(function() {});
            content = shieldToolContent(await loadAlerts());
          }
          if (selected === "embed") content = await embedToolContent();
          app.innerHTML = pageHeader("Tools", "Pick the admin tool you need. Events, chat, alerts, shield warnings, and embeds live here now.", "") + toolPicker(selected) + content;
          if (selected === "embed") updateEmbedPreview();
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load tools. ' + escapeHtml(error.message) + '</div>';
        }
      }

      async function renderAlerts(type) {
        skeleton("Loading alerts...");
        try {
          const alerts = await loadAlerts();
          const filtered = type === "shield" ? alerts.filter(function(alert) { return alert.type === "shield_alert"; }) : alerts;
          app.innerHTML =
            pageHeader(type === "shield" ? "Shield Alerts" : "Alerts", "Recent Kella alert activity from MongoDB.", '<button class="secondary" data-action="refresh-alerts">Refresh</button>') +
            (type === "shield" ? renderShieldTool() : '<section class="two">' + renderAttackTool() + renderDmAlertTool() + '</section>') +
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

      function renderComplaintsTable(complaints) {
        if (!complaints.length) return empty("No complaints or suggestions yet. Members can use /complain in Discord.");
        return '<div class="table-wrap"><table><thead><tr><th>Type</th><th>Player</th><th>Message</th><th>Status</th><th>Sent</th><th>Actions</th></tr></thead><tbody>' +
          complaints.map(function(item) {
            const resolved = item.status === "Resolved";
            return '<tr><td>' + escapeHtml(item.kind || "Complaint") + '</td><td><strong>' + escapeHtml(item.player || "Unknown") + '</strong><br><span class="muted">' + escapeHtml(item.discordId || "") + '</span></td><td>' + escapeHtml(item.message || "") + '</td><td><span class="badge ' + (resolved ? "good" : "warn") + '">' + escapeHtml(item.status || "Pending") + '</span></td><td>' + formatDateTime(item.sentAt) + '</td><td><div class="toolbar"><button class="secondary" data-action="set-complaint-status" data-complaint-id="' + escapeHtml(item.id) + '" data-status="Pending">Pending</button><button class="primary" data-action="set-complaint-status" data-complaint-id="' + escapeHtml(item.id) + '" data-status="Resolved">Resolve</button></div></td></tr>';
          }).join("") +
          '</tbody></table></div>';
      }

      async function renderComplaints() {
        skeleton("Loading complaints...");
        try {
          const complaints = await loadComplaints();
          app.innerHTML =
            pageHeader("Complaints", "Private complaints and suggestions submitted with /complain.", '<button class="secondary" data-action="refresh-complaints">Refresh</button>') +
            '<section class="card"><div class="card-header"><div><h3>Admin Inbox</h3><span class="muted">Use Pending while reviewing, then Resolve when handled.</span></div><button class="secondary" data-action="copy-command" data-value="/complain">Copy /complain</button></div>' +
            renderComplaintsTable(complaints) +
            '</section>';
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load complaints. ' + escapeHtml(error.message) + '. Add your Password in Settings if needed.</div>';
        }
      }

      async function openComplaintForm() {
        if (!memberModal || !memberModalContent) return;
        const auth = await loadAuth(true);
        if (!auth.authenticated) {
          memberModalContent.innerHTML =
            '<div class="member-profile-hero">' +
              '<img class="profile-avatar" src="/assets/icons/complaints.png" alt="" />' +
              '<div><span class="profile-kicker">Member Feedback</span><h3 id="memberModalTitle">Login Required</h3><div class="profile-subtitle">Login with Discord so R4s know who submitted the message.</div></div>' +
            '</div>' +
            '<section class="card complaint-form-card"><p>Complaints and suggestions are private to admins. Kella needs your Discord login before sending one.</p><button class="primary" type="button" data-action="discord-login">Login with Discord</button></section>';
        } else {
          memberModalContent.innerHTML =
            '<div class="member-profile-hero">' +
              '<img class="profile-avatar" src="/assets/icons/complaints.png" alt="" />' +
              '<div><span class="profile-kicker">Member Feedback</span><h3 id="memberModalTitle">Complaint or Suggestion</h3><div class="profile-subtitle">Send it straight to the R4 review inbox.</div></div>' +
            '</div>' +
            '<section class="card complaint-form-card" data-complaint-form>' +
              '<div class="form-grid">' +
                '<label>Type<select data-complaint="kind"><option value="Complaint">Complaint</option><option value="Suggestion">Suggestion</option></select></label>' +
                '<label>Title<input data-complaint="title" maxlength="140" placeholder="Short title" /></label>' +
                '<label class="wide">Description<textarea data-complaint="description" maxlength="1800" placeholder="Tell the R4s what happened or what should improve."></textarea></label>' +
                '<label class="wide">Optional Picture<input type="file" data-complaint-image accept="image/png,image/jpeg,image/webp" /><span class="muted">Optional screenshot, under 3 MB.</span></label>' +
              '</div>' +
              '<div class="complaint-preview" data-complaint-image-preview>No picture selected.</div>' +
              '<div class="toolbar"><button class="secondary" type="button" data-member-modal-close>Cancel</button><button class="primary" type="button" data-action="submit-complaint">Submit to R4s</button></div>' +
            '</section>';
        }
        memberModal.classList.add("open");
        memberModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
      }

      async function complaintImageDataUrl() {
        const input = document.querySelector("[data-complaint-image]");
        const file = input?.files?.[0];
        if (!file) return "";
        if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) throw new Error("Picture must be PNG, JPG, or WEBP.");
        if (file.size > 3 * 1024 * 1024) throw new Error("Picture is too large. Please use an image under 3 MB.");
        return "data:" + file.type + ";base64," + arrayBufferToBase64(await file.arrayBuffer());
      }

      async function readComplaintForm() {
        const root = document.querySelector("[data-complaint-form]");
        if (!root) throw new Error("Feedback form is missing.");
        const value = function(name) {
          return (root.querySelector('[data-complaint="' + name + '"]')?.value || "").trim();
        };
        const title = value("title");
        const description = value("description");
        if (!title) throw new Error("Add a short title first.");
        if (!description) throw new Error("Add a description first.");
        return {
          kind: value("kind") || "Complaint",
          title,
          description,
          imageDataUrl: await complaintImageDataUrl()
        };
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

      function renderDmAlertTool() {
        const recipients = (state.members || []).filter(isDmCapableMember);
        return '<section class="card"><div class="card-header"><div><h3>Send Private DM Alert</h3><span class="muted">Kella will DM every synced Discord member. Recipients: ' + recipients.length + '</span></div><button class="primary" data-action="send-dm-alert">Send DM Alert</button></div><div class="form-grid"><label>Alert Title<input data-dm-alert-title value="Kella Alliance Alert" /></label><label>Total Recipients<input value="' + recipients.length + ' synced members" disabled /></label><label class="wide">Private Message<textarea data-dm-alert-message placeholder="Write the alert members should receive in their DMs.">Commanders, please check Discord. Alliance action is needed.</textarea></label></div><p class="muted" style="margin-top:12px">Tip: Use this for important private notices only. Members who block DMs from server bots may fail.</p></section>';
      }

      function embedFormValue(name) {
        return document.querySelector('[data-embed="' + name + '"]')?.value?.trim() || "";
      }

      function chatFormValue(name) {
        return document.querySelector('[data-chat="' + name + '"]')?.value?.trim() || "";
      }

      function chatPayload() {
        return {
          channelId: chatFormValue("channelId") || chatFormValue("channelManual"),
          roleMentionId: chatFormValue("roleMentionId"),
          message: chatFormValue("message")
        };
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

      function renderRosterUploadManager(uploads, locked) {
        const lockedMessage = '<div class="empty">Admin access is required to view and manage uploaded roster files.</div>';
        const body = locked
          ? lockedMessage
          : uploads.length
            ? '<div class="table-wrap"><table><thead><tr><th>File</th><th>Type</th><th>Snapshot</th><th>Imported</th><th>Ignored</th><th>Uploaded</th><th>Actions</th></tr></thead><tbody>' +
              uploads.map(function(upload) {
                const snapshotDate = upload.snapshotDate ? String(upload.snapshotDate).slice(0, 10) : "";
                return '<tr><td><strong>' + escapeHtml(upload.filename || "Roster upload") + '</strong><br><span class="muted">' + escapeHtml(upload.source || "") + '</span></td><td>' + escapeHtml(String(upload.fileType || "").toUpperCase()) + '</td><td>' + escapeHtml(snapshotDate || "Unknown") + '</td><td>' + formatNumber(upload.total || 0) + '</td><td>' + formatNumber(upload.excluded || 0) + '</td><td>' + formatDateTime(upload.sentAt) + '</td><td><div class="toolbar"><button class="secondary" data-action="edit-roster-upload" data-upload-id="' + escapeHtml(upload.id) + '" data-upload-filename="' + escapeHtml(upload.filename || "") + '" data-upload-date="' + escapeHtml(snapshotDate) + '">Edit</button><button class="danger" data-action="delete-roster-upload" data-upload-id="' + escapeHtml(upload.id) + '" data-upload-filename="' + escapeHtml(upload.filename || "") + '">Delete</button></div></td></tr>';
              }).join("") +
              '</tbody></table></div>'
            : empty("No roster files are listed. If old player stats are still showing, use Clear Imported Data, then upload the latest JSON again.");
        return '<section class="card" style="margin-top:18px"><div class="card-header"><div><h3>Uploaded Roster Files</h3><span class="muted">Delete old JSON, CSV, or spreadsheet imports so they stop affecting member stats. Re-upload the latest file on Members when you want a clean roster.</span></div><div class="toolbar"><button class="secondary" data-action="refresh-roster-uploads"' + (locked ? " disabled" : "") + '>Refresh</button><button class="danger" data-action="clear-roster-imports"' + (locked ? " disabled" : "") + '>Clear Imported Data</button></div></div>' + body + '</section>';
      }

      async function renderSettings() {
        skeleton("Loading settings...");
        try {
          await loadAuth(true);
          const data = await loadSettings();
          const alliance = data.alliance || {};
          const settings = data.settings || {};
          const locked = !adminToken() && !isDashboardAdmin();
          const lockedAttr = locked ? " disabled" : "";
          const uploads = locked ? [] : await loadRosterUploads(true);
          app.innerHTML = pageHeader("Settings", "Saved admin preferences for Kella channels, officer roles, and enabled modules.", '<button class="primary" data-action="save-settings"' + lockedAttr + '>Save Settings</button>') +
            '<div class="locked-note" data-settings-locked-note' + (locked ? "" : ' style="display:none"') + '>Login with an approved Discord admin account or enter the fallback Password first.</div>' +
            '<section class="grid" data-settings-panel>' +
              '<div class="card"><h3>Password</h3><p>Used only in this browser for admin actions.</p><input type="password" data-setting="adminKey" value="' + escapeHtml(adminToken()) + '" placeholder="Password" /></div>' +
              '<div class="card"><h3>Alliance Name</h3><p>Name shown at the top of the dashboard.</p><input data-setting="allianceName" data-admin-required value="' + escapeHtml(alliance.name || "") + '"' + lockedAttr + ' /></div>' +
              '<div class="card"><h3>Alliance Tag</h3><p>Short tag shown in the round badge.</p><input data-setting="allianceTag" data-admin-required value="' + escapeHtml(alliance.tag || "") + '"' + lockedAttr + ' /></div>' +
              '<div class="card"><h3>Announcement Channel</h3><p>Where Kella should post event announcements.</p><input data-setting="announcementChannel" data-admin-required placeholder="Channel name or ID" value="' + escapeHtml(settings.announcementChannel || "") + '"' + lockedAttr + ' /></div>' +
              '<div class="card"><h3>Attendance Channel</h3><p>Where Roots, Summit, and check-in panels should be used.</p><input data-setting="attendanceChannel" data-admin-required placeholder="Channel name or ID" value="' + escapeHtml(settings.attendanceChannel || "") + '"' + lockedAttr + ' /></div>' +
              '<div class="card"><h3>Alert Channel</h3><p>Where attack and shield alert logs should be reviewed.</p><input data-setting="alertChannel" data-admin-required placeholder="Channel name or ID" value="' + escapeHtml(settings.alertChannel || "") + '"' + lockedAttr + ' /></div>' +
              '<div class="card"><h3>Officer Roles</h3><p>Comma-separated Discord roles that can operate Kella.</p><input data-setting="officerRoles" data-admin-required value="' + escapeHtml((settings.officerRoles || []).join(", ")) + '"' + lockedAttr + ' /></div>' +
              '<div class="card"><h3>Enabled Modules</h3><p>' + dashboardModules.filter(function(module) { return moduleState(module.id); }).length + ' of ' + dashboardModules.length + ' modules enabled.</p><button class="secondary" data-link-button="/">Back to Modules</button></div>' +
            '</section>' +
            renderRosterUploadManager(uploads, locked);
          syncSettingsLock();
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load settings. ' + escapeHtml(error.message) + '</div>';
        }
      }

      function syncSettingsLock() {
        if (location.pathname !== "/settings") return;
        const password = (document.querySelector('[data-setting="adminKey"]')?.value || "").trim();
        const locked = !password && !isDashboardAdmin();
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
        if (!value("adminKey") && !isDashboardAdmin()) throw new Error("Login with Discord admin or enter Password to save settings.");
        if (value("adminKey")) localStorage.setItem("kellaAdminKey", value("adminKey"));
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

      async function renderRootsRegistration() {
        skeleton("Loading Roots registration...");
        try {
          const reports = await loadReports();
          const latest = reports[0];
          let channelHtml = '<label>Discord Channel<input data-roots-channel-manual placeholder="Paste channel ID" /></label>';
          try {
            await loadChannels();
            channelHtml = '<label>Discord Channel<select data-roots-channel>' + channelOptions() + '</select></label>';
          } catch {
            channelHtml = '<label>Discord Channel<input data-roots-channel-manual placeholder="Paste channel ID or add Password in Settings" /></label>';
          }
          const reportRows = reports.length
            ? reports.map(function(report) {
                return '<tr><td>' + formatDate(report.date) + '</td><td>' + escapeHtml(report.timeSlot) + '</td><td>' + report.available + '</td><td>' + report.absent + '</td><td>' + report.unsure + '</td><td>' + escapeHtml(report.createdBy) + '</td><td><button class="secondary" data-link-button="/roots-reports/' + report.id + '">View</button></td></tr>';
              }).join("")
            : "";

          app.innerHTML =
            pageHeader("Roots of War", "Registration and reports in one place. Create the Discord panel, then review 14 UTC and 20 UTC attendance below.", '<button class="secondary" data-action="copy-command" data-value="/roots">Copy /roots</button><button class="primary" data-action="send-roots-registration">Create Roots Panel</button>') +
            '<section class="two"><div class="card"><div class="card-header"><div><h3>Create Roots Panel</h3><span class="muted">Kella sends 14 UTC and 20 UTC buttons to Discord, then stores every answer in reports.</span></div><span class="badge warn">24-hour UTC</span></div><div class="form-grid">' +
              channelHtml +
              '<label>Role Mention ID<input data-roots-role placeholder="Optional role ID" /></label>' +
            '</div><p class="muted" style="margin-top:12px">Members can choose Available, Absent, or Not Sure for each slot and update their answer any time.</p></div>' +
            '<div class="card"><div class="card-header"><h3>Latest Report</h3><button class="secondary" data-action="refresh-reports">Refresh</button></div>' +
            (latest ? '<p>' + formatDate(latest.date) + ' - ' + latest.timeSlot + '</p><p>' + latest.available + ' Available, ' + latest.absent + ' Absent, ' + latest.unsure + ' Not Sure</p>' : '<p>No Roots reports yet.</p>') +
            '</div></section>' +
            '<section class="card" style="margin-top:18px"><div class="card-header"><div><h3>Roots Reports</h3><span class="muted">Historical registrations grouped by message and time slot.</span></div></div>' +
            (reports.length ? '<div class="table-wrap"><table><thead><tr><th>Date</th><th>Time Slot</th><th>Available</th><th>Absent</th><th>Not Sure</th><th>Created By</th><th></th></tr></thead><tbody>' + reportRows + '</tbody></table></div>' : empty("No Roots reports yet. Create a Roots panel first.")) +
            '</section>';
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load Roots data. ' + escapeHtml(error.message) + '</div>';
        }
      }

      function renderAlertsTable(alerts) {
        if (!alerts.length) return empty("No alerts recorded yet.");
        return '<div class="table-wrap"><table><thead><tr><th>Type</th><th>Officer</th><th>Target Player</th><th>Status</th><th>Time Sent</th><th>Delivery</th></tr></thead><tbody>' +
          alerts.map(function(alert) {
            const failed = Number(alert.payload?.failed || 0);
            const delivery = alert.type === "dm_alert" && failed
              ? '<button class="secondary" data-action="resend-failed-dm-alert" data-alert-id="' + escapeHtml(alert.id) + '">Resend ' + failed + ' Failed</button>'
              : '<span class="muted">' + (alert.type === "dm_alert" ? escapeHtml(String(alert.payload?.sent || 0)) + " sent" : "Recorded") + '</span>';
            return '<tr><td>' + escapeHtml(alert.type) + '</td><td>' + escapeHtml(alert.officer || "") + '</td><td>' + escapeHtml(alert.player || "") + '</td><td>' + escapeHtml(alert.status || "") + '</td><td>' + formatDateTime(alert.sentAt) + '</td><td>' + delivery + '</td></tr>';
          }).join("") +
          '</tbody></table></div>';
      }

      function renderComplaintsTable(complaints) {
        if (!complaints.length) return empty("No complaints or suggestions yet. Members can use /complain in Discord.");
        return '<div class="table-wrap"><table><thead><tr><th>Type</th><th>Player</th><th>Message</th><th>Status</th><th>Admin Notes</th><th>Sent</th><th>Actions</th></tr></thead><tbody>' +
          complaints.map(function(item) {
            const resolved = item.status === "Resolved";
            const attachment = item.imageDataUrl ? '<button class="secondary" type="button" data-action="open-complaint-detail" data-complaint-id="' + escapeHtml(item.id) + '">View Image</button>' : '<span class="muted">No image</span>';
            const message = '<strong>' + escapeHtml(item.title || item.kind || "Feedback") + '</strong><br><span>' + escapeHtml(item.message || "") + '</span>' + attachment;
            const notes = [
              item.assignedTo ? "Assigned: " + item.assignedTo : "",
              item.adminNote ? "Note: " + item.adminNote : "",
              item.lastReply ? "Last reply: " + item.lastReply : ""
            ].filter(Boolean).join("\\n");
            return '<tr><td>' + escapeHtml(item.kind || "Complaint") + '</td><td><strong>' + escapeHtml(item.player || "Unknown") + '</strong><br><span class="muted">' + escapeHtml(item.discordId || "") + '</span></td><td>' + message + '</td><td><span class="badge ' + (resolved ? "good" : "warn") + '">' + escapeHtml(item.status || "Pending") + '</span></td><td><span class="muted">' + escapeHtml(notes || "No admin notes yet.") + '</span></td><td>' + formatDateTime(item.sentAt) + '</td><td><div class="toolbar"><button class="primary" data-action="open-complaint-detail" data-complaint-id="' + escapeHtml(item.id) + '">Open</button><button class="secondary" data-action="assign-complaint" data-complaint-id="' + escapeHtml(item.id) + '">Assign</button><button class="secondary" data-action="note-complaint" data-complaint-id="' + escapeHtml(item.id) + '">Note</button><button class="secondary" data-action="reply-complaint" data-complaint-id="' + escapeHtml(item.id) + '">Reply</button><button class="secondary" data-action="set-complaint-status" data-complaint-id="' + escapeHtml(item.id) + '" data-status="Pending">Pending</button><button class="primary" data-action="set-complaint-status" data-complaint-id="' + escapeHtml(item.id) + '" data-status="Resolved">Resolve</button></div></td></tr>';
          }).join("") +
          '</tbody></table></div>';
      }

      function findComplaintById(id) {
        return (state.complaints || []).find(function(item) { return String(item.id) === String(id); });
      }

      function complaintActionButtons(item) {
        const id = escapeHtml(item.id || "");
        return '<div class="toolbar">' +
          '<button class="secondary" data-action="assign-complaint" data-complaint-id="' + id + '">Assign</button>' +
          '<button class="secondary" data-action="note-complaint" data-complaint-id="' + id + '">Note</button>' +
          '<button class="secondary" data-action="reply-complaint" data-complaint-id="' + id + '">Reply</button>' +
          '<button class="secondary" data-action="set-complaint-status" data-complaint-id="' + id + '" data-status="Pending">Pending</button>' +
          '<button class="primary" data-action="set-complaint-status" data-complaint-id="' + id + '" data-status="Resolved">Resolve</button>' +
        '</div>';
      }

      function openComplaintDetail(item) {
        if (!item || !memberModal || !memberModalContent) return;
        memberModalContent.dataset.complaintId = item.id || "";
        const image = item.imageDataUrl
          ? '<div class="card"><div class="card-header"><div><h3>Attached Image</h3><span class="muted">Screenshot submitted by the member.</span></div><a class="secondary" href="' + escapeHtml(item.imageDataUrl) + '" target="_blank" rel="noreferrer">Open Full Image</a></div><img class="complaint-detail-image" src="' + escapeHtml(item.imageDataUrl) + '" alt="Complaint attachment" /></div>'
          : '<div class="empty">No image was attached to this complaint.</div>';
        memberModalContent.innerHTML =
          '<div class="member-profile-hero">' +
            '<img class="profile-avatar" src="/assets/icons/complaints.png" alt="" />' +
            '<div><span class="profile-kicker">' + escapeHtml(item.kind || "Feedback") + '</span><h3 id="memberModalTitle">' + escapeHtml(item.title || item.kind || "Complaint") + '</h3><div class="profile-subtitle">Submitted by ' + escapeHtml(item.player || "Unknown") + ' - ' + formatDateTime(item.sentAt) + '</div></div>' +
          '</div>' +
          '<section class="complaint-detail">' +
            '<div class="complaint-detail-meta">' +
              profileStat("Status", item.status || "Pending") +
              profileStat("Discord ID", item.discordId || "Unknown") +
              profileStat("Source", item.source || "discord") +
              profileStat("Assigned", item.assignedTo || "Unassigned") +
            '</div>' +
            '<div class="card"><div class="card-header"><div><h3>Message</h3><span class="muted">Full complaint or suggestion text.</span></div></div><div class="complaint-detail-message">' + escapeHtml(item.message || "No message added.") + '</div></div>' +
            image +
            '<div class="card"><div class="card-header"><div><h3>Admin Handling</h3><span class="muted">' + escapeHtml(item.adminNote || "No admin note yet.") + '</span></div></div>' + complaintActionButtons(item) + '</div>' +
          '</section>';
        memberModal.classList.add("open");
        memberModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
      }

      async function refreshComplaintsView() {
        const openComplaintId = memberModal?.classList.contains("open") ? (memberModalContent?.dataset?.complaintId || "") : "";
        state.complaints = [];
        if (location.pathname === "/complaints") {
          await renderComplaints();
        } else {
          await loadComplaints();
        }
        if (openComplaintId) {
          const selected = findComplaintById(openComplaintId);
          if (selected) {
            openComplaintDetail(selected);
          } else {
            closeMemberModal();
          }
        }
      }

      function arrayBufferToBase64(buffer) {
        const bytes = new Uint8Array(buffer);
        const chunkSize = 32768;
        let binary = "";
        for (let index = 0; index < bytes.length; index += chunkSize) {
          binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(index, index + chunkSize)));
        }
        return btoa(binary);
      }

      async function readMemberUploadForm() {
        if (!adminToken() && !isDashboardAdmin()) throw new Error("Login with Discord admin or enter your Password first.");
        const input = document.querySelector("[data-member-upload]");
        const file = input?.files?.[0];
        if (!file) throw new Error("Choose a roster .json, .csv, or .xlsx file first.");
        const lower = file.name.toLowerCase();
        if (!lower.endsWith(".xlsx") && !lower.endsWith(".json") && !lower.endsWith(".csv")) throw new Error("Please upload a .json, .csv, or .xlsx roster file.");
        if (file.size > 12 * 1024 * 1024) throw new Error("Roster file is too large. Please upload a file under 12 MB.");
        return {
          filename: file.name,
          snapshotDate: (document.querySelector("[data-member-upload-date]")?.value || "").trim(),
          fileBase64: arrayBufferToBase64(await file.arrayBuffer())
        };
      }

      function readProfileForm() {
        const value = function(name) {
          return (document.querySelector('[data-profile="' + name + '"]')?.value || "").trim();
        };
        return {
          ign: value("ign"),
          timezone: value("timezone"),
          country: value("country"),
          profilePhotoUrl: value("profilePhotoUrl")
        };
      }

      function readAdminMemberForm() {
        const root = document.querySelector("[data-admin-member-form]");
        if (!root) throw new Error("Member edit form is missing.");
        const value = function(name) {
          return (root.querySelector('[data-admin-member="' + name + '"]')?.value || "").trim();
        };
        const payload = {
          profilePhotoUrl: value("profilePhotoUrl"),
          discordAvatarUrl: value("discordAvatarUrl"),
          mainMemberId: value("mainMemberId"),
          rank: value("rank"),
          role: value("role") || "Member",
          timezone: value("timezone"),
          country: value("country"),
          notes: value("notes")
        };
        const ign = value("ign");
        const uid = value("uid");
        const discordId = value("discordId");
        const alliance = value("alliance");
        const power = value("power");
        if (ign) payload.ign = ign;
        if (uid) payload.uid = uid;
        if (discordId) payload.discordId = discordId;
        if (alliance) payload.alliance = alliance;
        if (power !== "") payload.power = Number(power);
        return payload;
      }

      function readManualMemberForm() {
        const root = document.querySelector("[data-manual-member-form]");
        if (!root) throw new Error("Manual member form is missing.");
        const value = function(name) {
          return (root.querySelector('[data-manual-member="' + name + '"]')?.value || "").trim();
        };
        const ign = value("ign");
        const uid = value("uid");
        if (!ign) throw new Error("IGN is required.");
        if (!uid) throw new Error("Lord ID is required.");
        const stats = {};
        root.querySelectorAll("[data-manual-stat]").forEach(function(input) {
          const key = input.getAttribute("data-manual-stat");
          const amount = Number(input.value || 0);
          if (key && Number.isFinite(amount) && amount > 0) stats[key] = amount;
        });
        return {
          ign,
          uid,
          discordId: value("discordId"),
          discordUsername: value("discordUsername"),
          discordDisplayName: value("ign"),
          profilePhotoUrl: value("profilePhotoUrl"),
          power: Number(value("power") || 0),
          alliance: value("alliance"),
          rank: value("rank"),
          role: value("role") || "Member",
          timezone: value("timezone"),
          country: value("country"),
          notes: value("notes"),
          stats
        };
      }

      function renderAdminAccessRequired() {
        app.innerHTML =
          pageHeader("Admin Access Required", "This section is only visible to Kella admins and officers with dashboard access.", '<button class="primary" data-action="discord-login">Login as Admin</button>') +
          '<section class="card">' + empty("Members can use Dashboard, Members, Attendance, and My Profile. Admin tools stay hidden until Kella confirms admin access.") + '</section>';
      }

      async function route() {
        if (!state.auth) {
          await loadAuth().catch(function() { updateAuthStatus(); });
        } else {
          renderSidebarNav();
        }
        if (!state.settings) loadSettings().catch(function() {});
        const path = location.pathname;
        state.currentReport = null;
        if (pathRequiresAdmin(path) && !hasAdminAccess()) {
          setActiveNav();
          return renderAdminAccessRequired();
        }
        setActiveNav();
        if (path === "/") return renderDashboard();
        if (path === "/profile") return renderProfile();
        if (path === "/members") return renderMembers();
        if (path === "/attendance") return renderAttendance();
        if (path.startsWith("/attendance/")) return renderAttendanceDetails(path.split("/").pop());
        if (path === "/roots-of-war" || path === "/roots-registration" || path === "/roots-reports") return renderRootsRegistration();
        if (path.startsWith("/roots-reports/")) return renderRootsReportDetails(path.split("/").pop());
        if (path === "/tools") return renderTools();
        if (path === "/events") return renderTools("events");
        if (path === "/alerts") {
          return renderTools("alerts");
        }
        if (path === "/shield-alerts") {
          return renderTools("shield");
        }
        if (path === "/embed-sender") return renderTools("embed");
        if (path === "/complaints") return renderComplaints();
        if (path === "/settings") return renderSettings();
        navigate("/");
      }

      function navigate(path) {
        history.pushState({}, "", path);
        route();
      }

      document.addEventListener("click", function(event) {
        const modalClose = event.target.closest("[data-member-modal-close]");
        if (modalClose) {
          closeMemberModal();
          return;
        }

        const link = event.target.closest("[data-link]");
        if (link) {
          event.preventDefault();
          navigate(link.getAttribute("data-path") || link.getAttribute("href"));
          return;
        }

        const linkButton = event.target.closest("[data-link-button]");
        if (linkButton) {
          if (memberModal?.classList.contains("open")) closeMemberModal();
          navigate(linkButton.getAttribute("data-link-button"));
          return;
        }

        const memberRow = event.target.closest("[data-member-row]");
        if (memberRow) {
          const member = findMemberById(memberRow.getAttribute("data-member-id"));
          if (member) openMemberModal(member);
          return;
        }

        const calendarDay = event.target.closest("[data-calendar-day]");
        if (calendarDay) {
          openCalendarDayModal(calendarDay.getAttribute("data-calendar-day"), calendarDay.getAttribute("data-calendar-type") || "activity");
          return;
        }

        const action = event.target.closest("[data-action]");
        if (!action) return;
        const kind = action.getAttribute("data-action");
        if (kind === "discord-login") {
          window.location.href = "/api/auth/discord";
          return;
        }
        if (kind === "open-complaint-form") {
          setLoading(action, true);
          openComplaintForm()
            .catch(function(error) { toast(error.message || "Could not open feedback form.", "error"); })
            .finally(function() { setLoading(action, false); });
          return;
        }
        if (kind === "open-avatar-upload") {
          openAvatarFilePicker(action.getAttribute("data-avatar-mode") || "admin", action.getAttribute("data-member-id") || "");
          return;
        }
        if (kind === "close-avatar-cropper") {
          closeAvatarCropper();
          return;
        }
        if (kind === "avatar-zoom-out") {
          setAvatarZoom((state.avatarEditor?.zoom || 1) - 0.1);
          return;
        }
        if (kind === "avatar-zoom-in") {
          setAvatarZoom((state.avatarEditor?.zoom || 1) + 0.1);
          return;
        }
        if (kind === "apply-avatar-crop") withFeedback(action, applyAvatarCrop, "Photo ready.");
        if (kind === "discord-logout") withFeedback(action, async function() {
          await sendJson("POST", "/api/auth/logout", {}, false);
          state.auth = { authenticated: false, isDashboardAdmin: false };
          state.channels = null;
          state.templates = null;
          state.profile = null;
          updateAuthStatus();
          await route();
        }, "Logged out.");
        if (kind === "copy-command") withFeedback(action, function() { return navigator.clipboard.writeText(action.getAttribute("data-value") || ""); }, "Command copied.");
        if (kind === "open-add-member") {
          if (!hasAdminAccess()) {
            toast("Admin access is required to add members.", "error");
            return;
          }
          openAddMemberModal();
          return;
        }
        if (kind === "set-stats-metric") {
          const nextMetric = action.getAttribute("data-metric") || "power";
          if (!statMetricOptions.some(function(metric) { return metric.key === nextMetric; })) return;
          state.statsMetric = nextMetric;
          const openMemberId = memberModalContent?.dataset?.memberId || "";
          if (openMemberId && memberModal?.classList.contains("open")) {
            const member = findMemberById(openMemberId) || (state.profile && String(state.profile.id) === String(openMemberId) ? state.profile : null);
            if (member) openMemberModal(member);
          }
          if (location.pathname === "/") renderDashboardData(state.summary || {}, state.members || [], state.events || []);
          if (location.pathname === "/profile") renderProfile();
          return;
        }
        if (kind === "select-chart-point") {
          const memberId = action.getAttribute("data-member-id") || "";
          const metricKey = action.getAttribute("data-metric") || state.statsMetric || "power";
          const index = Number(action.getAttribute("data-index") || 0);
          const member = findMemberById(memberId) || (state.profile && String(state.profile.id) === String(memberId) ? state.profile : null);
          if (!member || !Number.isInteger(index)) return;
          state.chartSelections[chartSelectionKey(member, metricKey)] = index;
          if (memberModal?.classList.contains("open")) {
            openMemberModal(member);
          } else if (location.pathname === "/profile") {
            renderProfile();
          }
          return;
        }
        if (kind === "select-main-account") {
          const root = action.closest("[data-admin-member-form]");
          const hidden = root?.querySelector('[data-admin-member="mainMemberId"]');
          const selectedBox = root?.querySelector("[data-main-account-selected]");
          const mainId = action.getAttribute("data-main-member-id") || "";
          const memberId = memberModalContent?.dataset?.memberId || "";
          const member = findMemberById(memberId);
          const selected = findMemberById(mainId);
          if (hidden) hidden.value = mainId;
          if (selectedBox && member) {
            selectedBox.innerHTML = selected
              ? '<div class="farm-picker-selected"><span>Selected: ' + escapeHtml(selected.ign || memberDisplayName(selected)) + ' - ' + escapeHtml(formatCompactNumber(currentPowerValue(selected))) + ' power</span><button type="button" data-action="clear-main-account">Clear</button></div>'
              : farmPickerSelected(member);
          }
          toast("Main account selected. Click Save Player to apply.", "success");
          return;
        }
        if (kind === "clear-main-account") {
          const root = action.closest("[data-admin-member-form]");
          const hidden = root?.querySelector('[data-admin-member="mainMemberId"]');
          const selectedBox = root?.querySelector("[data-main-account-selected]");
          const memberId = memberModalContent?.dataset?.memberId || "";
          const member = findMemberById(memberId);
          if (hidden) hidden.value = "";
          if (selectedBox && member) selectedBox.innerHTML = farmPickerSelected({ ...member, mainMemberId: "" });
          toast("Farm link cleared. Click Save Player to apply.", "success");
          return;
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
        if (kind === "sync-discord-members") withFeedback(action, async function() {
          const sync = await sendJson("POST", "/api/dashboard/sync-discord-members", {}, true);
          state.summary = null;
          state.members = [];
          state.allMembers = [];
          state.alerts = [];
          if (location.pathname === "/members") {
            await renderMembers();
          } else {
            await renderDashboard();
          }
          return "Synced " + sync.total + " Discord members (" + sync.created + " new, " + sync.updated + " updated" + (sync.skipped ? ", " + sync.skipped + " skipped" : "") + ").";
        }, "Discord members synced. Open Members to view profiles.");
        if (kind === "upload-member-xlsx") withFeedback(action, async function() {
          const sync = await sendJson("POST", "/api/dashboard/members/import-xlsx", await readMemberUploadForm(), true);
          state.summary = null;
          state.members = [];
          state.allMembers = [];
          state.uploads = null;
          await renderMembers();
          return "Imported " + sync.total + " allowed roster members (" + sync.created + " new, " + sync.updated + " updated, " + (sync.merged || 0) + " merged with Discord, " + sync.skipped + " skipped, " + (sync.excluded || 0) + " outside KoG/LWL/mF ignored). Dated snapshots are kept for graphs.";
        }, "Roster members imported.");
        if (kind === "save-my-profile") withFeedback(action, async function() {
          const data = await sendJson("PATCH", "/api/dashboard/profile", readProfileForm(), false);
          state.profile = data.member;
          state.members = [];
          state.allMembers = [];
          await renderProfile();
          return "Profile saved.";
        }, "Profile saved.");
        if (kind === "save-member-admin") withFeedback(action, async function() {
          const id = action.getAttribute("data-member-id") || "";
          if (!id) throw new Error("Member id missing.");
          const data = await sendJson("PATCH", "/api/dashboard/members/" + encodeURIComponent(id), readAdminMemberForm(), true);
          const updated = data.member;
          state.members = (state.members || []).map(function(member) {
            return String(member.id) === String(updated.id) ? updated : member;
          });
          state.allMembers = (state.allMembers || []).map(function(member) {
            return String(member.id) === String(updated.id) ? updated : member;
          });
          const current = app.querySelector(".table-wrap, .empty");
          if (location.pathname === "/members" && current) current.outerHTML = renderMembersTable(state.members);
          openMemberModal(updated);
          return "Player card updated.";
        }, "Player card updated.");
        if (kind === "save-manual-member") withFeedback(action, async function() {
          const data = await sendJson("POST", "/api/dashboard/members", readManualMemberForm(), true);
          state.summary = null;
          state.members = [];
          state.allMembers = [];
          await loadMembers();
          if (location.pathname === "/members") {
            await renderMembers();
          } else if (location.pathname === "/") {
            await renderDashboard();
          }
          openMemberModal(findMemberById(data.member?.id) || data.member);
          return data.created ? "Member added." : "Member updated.";
        }, "Member saved.");
        if (kind === "delete-member") withFeedback(action, async function() {
          const id = action.getAttribute("data-member-id") || "";
          const member = findMemberById(id);
          if (!id) throw new Error("Member id missing.");
          if (!window.confirm("Delete " + (memberDisplayName(member) || "this member") + " from Kella? This removes their member data from the dashboard.")) {
            return "Delete cancelled.";
          }
          await sendJson("DELETE", "/api/dashboard/members/" + encodeURIComponent(id), undefined, true);
          state.summary = null;
          state.members = (state.members || []).filter(function(item) { return String(item.id) !== String(id); });
          state.allMembers = (state.allMembers || []).filter(function(item) { return String(item.id) !== String(id); });
          closeMemberModal();
          if (location.pathname === "/members") {
            await renderMembers();
          } else if (location.pathname === "/") {
            await renderDashboard();
          }
          return "Member deleted.";
        }, "Member deleted.");
        if (kind === "refresh-current") withFeedback(action, async function() {
          state.summary = null;
          state.alerts = [];
          state.reports = [];
          await route();
        }, "Page refreshed.");
        if (kind === "refresh-dashboard") withFeedback(action, async function() { state.summary = null; await renderDashboard(); }, "Dashboard refreshed.");
        if (kind === "refresh-reports") withFeedback(action, async function() {
          state.reports = [];
          if (location.pathname.startsWith("/roots-reports/")) {
            await renderRootsReportDetails(location.pathname.split("/").pop());
          } else {
            await renderRootsRegistration();
          }
        }, "Reports refreshed.");
        if (kind === "refresh-alerts") withFeedback(action, async function() {
          state.alerts = [];
          await loadAlerts();
          const selectedTool = location.pathname === "/shield-alerts" || new URLSearchParams(location.search).get("tool") === "shield" ? "shield" : "alerts";
          await renderTools(selectedTool);
        }, "Alerts refreshed.");
        if (kind === "refresh-events") withFeedback(action, async function() {
          state.events = [];
          if (location.pathname === "/attendance") {
            await renderAttendance();
          } else if (location.pathname.startsWith("/attendance/")) {
            await renderAttendanceDetails(location.pathname.split("/").pop());
          } else {
            await renderTools("events");
          }
        }, "Events refreshed.");
        if (kind === "delete-event") withFeedback(action, async function() {
          const id = action.getAttribute("data-event-id") || "";
          const eventItem = (state.events || []).find(function(item) { return String(item.id) === String(id); });
          if (!id) throw new Error("Event id missing.");
          if (!window.confirm("Delete " + ((eventItem && eventItem.title) || "this event") + " from the calendar and attendance reports?")) {
            return "Delete cancelled.";
          }
          await sendJson("DELETE", "/api/dashboard/events/" + encodeURIComponent(id), undefined, true);
          state.summary = null;
          state.events = [];
          if (memberModal?.classList.contains("open")) closeMemberModal();
          if (location.pathname === "/") {
            await renderDashboard();
          } else if (location.pathname === "/attendance") {
            await renderAttendance();
          } else if (location.pathname.startsWith("/attendance/")) {
            navigate("/attendance");
          } else {
            await renderTools("events");
          }
          return "Event deleted.";
        }, "Event deleted.");
        if (kind === "refresh-complaints") withFeedback(action, async function() { state.complaints = []; await renderComplaints(); }, "Complaints refreshed.");
        if (kind === "submit-complaint") withFeedback(action, async function() {
          await sendJson("POST", "/api/dashboard/complaints", await readComplaintForm(), false);
          state.complaints = [];
          closeMemberModal();
          return "Submitted. Kella sent it to the R4 review inbox.";
        }, "Feedback submitted.");
        if (kind === "open-complaint-detail") {
          setLoading(action, true);
          Promise.resolve()
            .then(async function() {
              if (!state.complaints.length) await loadComplaints();
              const item = findComplaintById(action.getAttribute("data-complaint-id") || "");
              if (!item) throw new Error("Complaint could not be found.");
              openComplaintDetail(item);
            })
            .catch(function(error) { toast(error.message || "Could not open complaint.", "error"); })
            .finally(function() { setLoading(action, false); });
          return;
        }
        if (kind === "send-event-embed") withFeedback(action, async function() {
          await sendJson("POST", "/api/dashboard/events", eventPayload(), true);
          state.summary = null;
          state.events = [];
          await renderTools("events");
        }, "Event embed sent.");
        if (kind === "send-roots-registration") withFeedback(action, async function() {
          const channelId = document.querySelector("[data-roots-channel]")?.value || document.querySelector("[data-roots-channel-manual]")?.value || "";
          const roleMentionId = document.querySelector("[data-roots-role]")?.value || "";
          if (!channelId.trim()) throw new Error("Choose a Discord channel first.");
          await sendJson("POST", "/api/dashboard/tools/roots-registration", { channelId, roleMentionId }, true);
          state.summary = null;
          state.reports = [];
          await renderRootsRegistration();
        }, "Roots registration panel sent.");
        if (kind === "set-complaint-status") withFeedback(action, async function() {
          const id = action.getAttribute("data-complaint-id") || "";
          const status = action.getAttribute("data-status") || "Pending";
          await sendJson("PATCH", "/api/dashboard/complaints/" + encodeURIComponent(id) + "/status", { status }, true);
          await refreshComplaintsView();
        }, "Complaint updated.");
        if (kind === "assign-complaint") withFeedback(action, async function() {
          const id = action.getAttribute("data-complaint-id") || "";
          const assignedTo = prompt("Assign complaint to who?");
          if (assignedTo === null) return "Assignment cancelled.";
          await sendJson("PATCH", "/api/dashboard/complaints/" + encodeURIComponent(id) + "/status", { assignedTo }, true);
          await refreshComplaintsView();
        }, "Complaint assigned.");
        if (kind === "note-complaint") withFeedback(action, async function() {
          const id = action.getAttribute("data-complaint-id") || "";
          const adminNote = prompt("Admin note");
          if (adminNote === null) return "Note cancelled.";
          await sendJson("PATCH", "/api/dashboard/complaints/" + encodeURIComponent(id) + "/status", { adminNote }, true);
          await refreshComplaintsView();
        }, "Complaint note saved.");
        if (kind === "reply-complaint") withFeedback(action, async function() {
          const id = action.getAttribute("data-complaint-id") || "";
          const message = prompt("Reply by DM to this member");
          if (!message) return "Reply cancelled.";
          const resolve = window.confirm("Mark this complaint resolved after sending the reply?");
          await sendJson("POST", "/api/dashboard/complaints/" + encodeURIComponent(id) + "/reply", { message, resolve }, true);
          await refreshComplaintsView();
        }, "Reply sent.");
        if (kind === "save-settings") withFeedback(action, async function() { await saveSettings(readSettingsForm()); }, "Settings saved.");
        if (kind === "refresh-roster-uploads") withFeedback(action, async function() {
          await loadRosterUploads(true);
          await renderSettings();
        }, "Roster uploads refreshed.");
        if (kind === "edit-roster-upload") withFeedback(action, async function() {
          const id = action.getAttribute("data-upload-id") || "";
          const currentName = action.getAttribute("data-upload-filename") || "";
          const currentDate = action.getAttribute("data-upload-date") || "";
          if (!id) throw new Error("Upload id missing.");
          const filename = window.prompt("Roster file label:", currentName);
          if (filename === null) return "Edit cancelled.";
          const snapshotDate = window.prompt("Snapshot date (YYYY-MM-DD):", currentDate);
          if (snapshotDate === null) return "Edit cancelled.";
          await sendJson("PATCH", "/api/dashboard/uploads/" + encodeURIComponent(id), { filename: filename.trim(), snapshotDate: snapshotDate.trim() }, true);
          state.uploads = null;
          state.members = [];
          state.summary = null;
          await renderSettings();
          return "Roster upload updated.";
        }, "Roster upload updated.");
        if (kind === "delete-roster-upload") withFeedback(action, async function() {
          const id = action.getAttribute("data-upload-id") || "";
          const filename = action.getAttribute("data-upload-filename") || "this roster upload";
          if (!id) throw new Error("Upload id missing.");
          if (!window.confirm("Delete " + filename + " from Kella? This removes the stats imported from that upload.")) {
            return "Delete cancelled.";
          }
          const result = await sendJson("DELETE", "/api/dashboard/uploads/" + encodeURIComponent(id), undefined, true);
          state.uploads = null;
          state.members = [];
          state.summary = null;
          await renderSettings();
          return "Roster upload deleted. " + (result.deletedMembers || 0) + " upload-only members removed and " + (result.updatedMembers || 0) + " profiles recalculated.";
        }, "Roster upload deleted.");
        if (kind === "clear-roster-imports") withFeedback(action, async function() {
          if (!window.confirm("Clear all imported roster stats from Kella? Discord profiles and manually added members stay, but uploaded power/stat values are removed.")) {
            return "Clear cancelled.";
          }
          const result = await sendJson("DELETE", "/api/dashboard/uploads", undefined, true);
          state.uploads = null;
          state.members = [];
          state.summary = null;
          await renderSettings();
          return "Imported roster data cleared. " + (result.deletedUploads || 0) + " upload records removed, " + (result.deletedMembers || 0) + " upload-only members deleted, and " + (result.updatedMembers || 0) + " Discord profiles recalculated.";
        }, "Imported roster data cleared.");
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
          await renderTools("shield");
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
          await renderTools("alerts");
        }, "Attack alert sent.");
        if (kind === "send-chat") withFeedback(action, async function() {
          await sendJson("POST", "/api/dashboard/tools/chat", chatPayload(), true);
          state.summary = null;
          await renderTools("chat");
        }, "Kella chat message sent.");
        if (kind === "send-dm-alert") withFeedback(action, async function() {
          const title = document.querySelector("[data-dm-alert-title]")?.value || "Kella Alliance Alert";
          const message = document.querySelector("[data-dm-alert-message]")?.value || "";
          const recipients = (state.members || []).filter(isDmCapableMember).length;
          if (!recipients) throw new Error("No synced Discord members found. Use Sync Discord on the Members page first.");
          if (!message.trim()) throw new Error("Write a private message first.");
          if (!window.confirm("Send this private DM alert to " + recipients + " synced Discord members?")) return "DM alert cancelled.";
          const result = await sendJson("POST", "/api/dashboard/tools/dm-alert", { title, message }, true);
          state.summary = null;
          state.alerts = [];
          await loadAlerts();
          await renderTools("alerts");
          return "DM alert sent to " + result.sent + " of " + result.total + " members" + (result.failed ? " (" + result.failed + " failed)." : ".");
        }, "DM alert sent.");
        if (kind === "resend-failed-dm-alert") withFeedback(action, async function() {
          const id = action.getAttribute("data-alert-id") || "";
          if (!id) throw new Error("Alert id missing.");
          if (!window.confirm("Retry the failed private DM recipients for this alert?")) return "Retry cancelled.";
          const result = await sendJson("POST", "/api/dashboard/tools/dm-alert/" + encodeURIComponent(id) + "/resend-failed", {}, true);
          state.summary = null;
          state.alerts = [];
          await loadAlerts();
          await renderTools("alerts");
          return "Retried " + result.total + " failed recipients: " + result.sent + " sent" + (result.failed ? ", " + result.failed + " still failed." : ".");
        }, "Failed DM recipients retried.");
        if (kind === "preview-embed") withFeedback(action, async function() { updateEmbedPreview(); }, "Preview updated.");
        if (kind === "send-embed") withFeedback(action, async function() { await sendJson("POST", "/api/embed/send", embedPayload(), true); state.summary = null; }, "Embed sent.");
        if (kind === "save-template") withFeedback(action, async function() {
          const name = prompt("Template name");
          if (!name) throw new Error("Template name required");
          await sendJson("POST", "/api/embed/templates", { name, ...embedPayload() }, true);
          state.templates = null;
          await renderTools("embed");
        }, "Template saved.");
        if (kind === "delete-template") withFeedback(action, async function() {
          const id = document.querySelector("[data-template-select]")?.value || "";
          if (!id) throw new Error("Choose a template first");
          await sendJson("DELETE", "/api/embed/templates/" + encodeURIComponent(id), undefined, true);
          state.templates = null;
          await renderTools("embed");
        }, "Template deleted.");
      });

      document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && avatarCropper?.classList.contains("open")) {
          closeAvatarCropper();
          return;
        }
        if (event.key === "Escape" && memberModal?.classList.contains("open")) {
          closeMemberModal();
          return;
        }

        const memberRow = event.target.closest?.("[data-member-row]");
        if (!memberRow || (event.key !== "Enter" && event.key !== " ")) return;
        event.preventDefault();
        const member = findMemberById(memberRow.getAttribute("data-member-id"));
        if (member) openMemberModal(member);
      });

      document.addEventListener("change", function(event) {
        if (event.target.matches("[data-tool-select]")) {
          navigate("/tools?tool=" + encodeURIComponent(event.target.value || "events"));
          return;
        }
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
        if (event.target.matches("[data-complaint-image]")) {
          const preview = document.querySelector("[data-complaint-image-preview]");
          const file = event.target.files?.[0];
          if (preview) preview.textContent = file ? file.name + " ready to attach." : "No picture selected.";
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
        if (event.target.matches("[data-admin-member-main-search]")) {
          const root = event.target.closest("[data-admin-member-form]");
          const results = root?.querySelector("[data-main-account-results]");
          const memberId = memberModalContent?.dataset?.memberId || "";
          const member = findMemberById(memberId);
          if (results && member) results.innerHTML = farmSearchResults(member, event.target.value || "");
        }
        if (event.target.matches('[data-setting="adminKey"]')) syncSettingsLock();
        if (event.target.matches("[data-embed]")) updateEmbedPreview();
        if (event.target.matches("[data-avatar-zoom]")) setAvatarZoom(event.target.value);
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
      updateServerClock();
      setInterval(updateServerClock, 1000);
      let autoRefreshBusy = false;
      async function refreshDashboardSilently() {
        if (autoRefreshBusy || location.pathname !== "/") return;
        autoRefreshBusy = true;
        try {
          state.summary = null;
          state.members = [];
          state.events = [];
          const results = await Promise.all([loadSummary(), loadMembers(), loadDashboardEvents()]);
          if (location.pathname === "/" && !document.hidden) {
            renderDashboardData(results[0], results[1], results[2]);
          }
        } catch (error) {
          console.warn("Kella dashboard silent refresh failed", error);
        } finally {
          autoRefreshBusy = false;
        }
      }
      setInterval(function() {
        if (document.hidden) return;
        if (document.activeElement && document.activeElement.matches("input, textarea, select")) return;
        refreshDashboardSilently();
      }, 45000);
      route();
    </script>
  </body>
</html>`;
}

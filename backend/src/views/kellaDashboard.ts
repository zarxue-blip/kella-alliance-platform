import { lordResearchLevelCosts, lordResearchTreeData } from "../data/researchTree.data.js";

const navItems = [
  { path: "/", icon: "/assets/icons/dashboard.png", label: "Dashboard" },
  { path: "/buff-schedule", icon: "/assets/buffs/buff-schedule.png", label: "Buff Schedule" },
  { path: "/wiki", icon: "/assets/icons/embed-sender.png", label: "Wiki" },
  { path: "/members", icon: "/assets/icons/members.png", label: "Members" },
  { path: "/research", icon: "/assets/buffs/research.png", label: "Research" },
  { path: "/training-tools", icon: "/assets/icons/training-tools.png", label: "Training Tools" },
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
  { id: "wiki", name: "Wiki", badge: "Guides", command: "Dashboard", description: "Publish alliance rules, guides, images, and readable member notes." },
  { id: "summit", name: "Summit Registration", badge: "Fast", command: "/summit", description: "Simple Summit attendance buttons for Attending, Absent, and Not Sure." },
  { id: "checkin", name: "Daily Check-In", badge: "Activity", command: "/checkin", description: "One button daily activity tracking for weekly and inactive member reports." },
  { id: "absence", name: "Absence Notices", badge: "Modal", command: "/absence", description: "Members submit reason, start date, and end date. Officers see who is away." },
  { id: "applications", name: "Applications", badge: "Recruiting", command: "/apply", description: "Simple application modal for IGN, power, timezone, and main legion." },
  { id: "reminders", name: "Event Reminders", badge: "Auto", command: "/remind", description: "Queue reminders for Summit, Roots, Fortress, Stronghold, Pass Defense, or Behemoth." },
  { id: "members", name: "Members", badge: "Roster", command: "Dashboard", description: "Search members, see Discord User ID, Lord ID, alliance role, attendance, and notes." },
  { id: "settings", name: "Settings", badge: "Setup", command: "Dashboard", description: "Admin key, channels, alliance label, and module switches." }
];

const wikiMiscImages = [
  { src: "/assets/wiki-misc/alert.png", label: "Alert" },
  { src: "/assets/wiki-misc/bonk.webp", label: "Bonk" },
  { src: "/assets/wiki-misc/compaints.png", label: "Complaints" },
  { src: "/assets/wiki-misc/cool.webp", label: "Cool" },
  { src: "/assets/wiki-misc/crazy.webp", label: "Crazy" },
  { src: "/assets/wiki-misc/cry.webp", label: "Cry" },
  { src: "/assets/wiki-misc/dashboard.png", label: "Dashboard" },
  { src: "/assets/wiki-misc/embed-sender.png", label: "Embed Sender" },
  { src: "/assets/wiki-misc/event.png", label: "Event" },
  { src: "/assets/wiki-misc/facepalm.webp", label: "Facepalm" },
  { src: "/assets/wiki-misc/fumes.webp", label: "Fumes" },
  { src: "/assets/wiki-misc/heart.webp", label: "Heart" },
  { src: "/assets/wiki-misc/hmm.webp", label: "Hmm" },
  { src: "/assets/wiki-misc/img-planner-cavalry.png", label: "Cavalry" },
  { src: "/assets/wiki-misc/img-planner-infantry.png", label: "Infantry" },
  { src: "/assets/wiki-misc/img-planner-mage.png", label: "Mage" },
  { src: "/assets/wiki-misc/img-planner-marksman.png", label: "Marksman" },
  { src: "/assets/wiki-misc/kellacoin.png", label: "Kella Coin" },
  { src: "/assets/wiki-misc/kellacry.png", label: "Kella Cry" },
  { src: "/assets/wiki-misc/kellaquestion.png", label: "Kella Question" },
  { src: "/assets/wiki-misc/kellashock.png", label: "Kella Shock" },
  { src: "/assets/wiki-misc/kellasmirk.png", label: "Kella Smirk" },
  { src: "/assets/wiki-misc/lol.webp", label: "Laugh" },
  { src: "/assets/wiki-misc/meh.webp", label: "Meh" },
  { src: "/assets/wiki-misc/members.png", label: "Members" },
  { src: "/assets/wiki-misc/peace.webp", label: "Peace" },
  { src: "/assets/wiki-misc/pleased.webp", label: "Pleased" },
  { src: "/assets/wiki-misc/root-registration.png", label: "Roots Registration" },
  { src: "/assets/wiki-misc/roots-report.png", label: "Roots Report" },
  { src: "/assets/wiki-misc/settings.png", label: "Settings" },
  { src: "/assets/wiki-misc/shh.webp", label: "Shh" },
  { src: "/assets/wiki-misc/shield-alert.png", label: "Shield Alert" },
  { src: "/assets/wiki-misc/smile.webp", label: "Smile" },
  { src: "/assets/wiki-misc/uwu.webp", label: "Uwu" }
];

const wikiHeroImages = [
  { src: "/assets/wiki-heroes/Alistair.webp", label: "Alistair" },
  { src: "/assets/wiki-heroes/Alistair-icon.webp", label: "Alistair Icon" },
  { src: "/assets/wiki-heroes/Alwyn.webp", label: "Alwyn" },
  { src: "/assets/wiki-heroes/Atheus.webp", label: "Atheus" },
  { src: "/assets/wiki-heroes/Bahorn.webp", label: "Bahorn" },
  { src: "/assets/wiki-heroes/Bakhar.webp", label: "Bakhar" },
  { src: "/assets/wiki-heroes/Bakshi.webp", label: "Bakshi" },
  { src: "/assets/wiki-heroes/Bertrand.webp", label: "Bertrand" },
  { src: "/assets/wiki-heroes/Chakcha.webp", label: "Chakcha" },
  { src: "/assets/wiki-heroes/Danfel.webp", label: "Danfel" },
  { src: "/assets/wiki-heroes/Eliana.webp", label: "Eliana" },
  { src: "/assets/wiki-heroes/Eliana-Icon.webp", label: "Eliana Icon" },
  { src: "/assets/wiki-heroes/Emrys.webp", label: "Emrys" },
  { src: "/assets/wiki-heroes/Emrys-icon.webp", label: "Emrys Icon" },
  { src: "/assets/wiki-heroes/Falgrim.webp", label: "Falgrim" },
  { src: "/assets/wiki-heroes/Ffraegar.webp", label: "Ffraegar" },
  { src: "/assets/wiki-heroes/Forondil.webp", label: "Forondil" },
  { src: "/assets/wiki-heroes/Garwood.png", label: "Garwood" },
  { src: "/assets/wiki-heroes/Goresh.webp", label: "Goresh" },
  { src: "/assets/wiki-heroes/Gwanwyn.webp", label: "Gwanwyn" },
  { src: "/assets/wiki-heroes/Gwanwyn-icon.webp", label: "Gwanwyn Icon" },
  { src: "/assets/wiki-heroes/Hosk.png", label: "Hosk" },
  { src: "/assets/wiki-heroes/Hosk-icon.webp", label: "Hosk Icon" },
  { src: "/assets/wiki-heroes/Indis.webp", label: "Indis" },
  { src: "/assets/wiki-heroes/Indis-icon.webp", label: "Indis Icon" },
  { src: "/assets/wiki-heroes/Kella.webp", label: "Kella" },
  { src: "/assets/wiki-heroes/Kinnara.webp", label: "Kinnara" },
  { src: "/assets/wiki-heroes/Kregg.webp", label: "Kregg" },
  { src: "/assets/wiki-heroes/Kregg-icon.webp", label: "Kregg Icon" },
  { src: "/assets/wiki-heroes/Kuma.webp", label: "Kuma" },
  { src: "/assets/wiki-heroes/Lei-Kuan.webp", label: "Lei Kuan" },
  { src: "/assets/wiki-heroes/Lieh-Shan-Yen.webp", label: "Lieh Shan Yen" },
  { src: "/assets/wiki-heroes/Liliya.webp", label: "Liliya" },
  { src: "/assets/wiki-heroes/Liliya-icon.webp", label: "Liliya Icon" },
  { src: "/assets/wiki-heroes/Madeline.webp", label: "Madeline" },
  { src: "/assets/wiki-heroes/Madeline-icon.webp", label: "Madeline Icon" },
  { src: "/assets/wiki-heroes/Maggrat.webp", label: "Maggrat" },
  { src: "/assets/wiki-heroes/Mardok.webp", label: "Mardok" },
  { src: "/assets/wiki-heroes/Mogro.webp", label: "Mogro" },
  { src: "/assets/wiki-heroes/Mu-Hsiang.webp", label: "Mu Hsiang" },
  { src: "/assets/wiki-heroes/Naernin.webp", label: "Naernin" },
  { src: "/assets/wiki-heroes/Neya.webp", label: "Neya" },
  { src: "/assets/wiki-heroes/Nico.webp", label: "Nico" },
  { src: "/assets/wiki-heroes/Nika.webp", label: "Nika" },
  { src: "/assets/wiki-heroes/Nika-icon.webp", label: "Nika Icon" },
  { src: "/assets/wiki-heroes/Ordo.webp", label: "Ordo" },
  { src: "/assets/wiki-heroes/Pan.webp", label: "Pan" },
  { src: "/assets/wiki-heroes/Sibyl.webp", label: "Sibyl" },
  { src: "/assets/wiki-heroes/Skogul.webp", label: "Skogul" },
  { src: "/assets/wiki-heroes/Syndrion.webp", label: "Syndrion" },
  { src: "/assets/wiki-heroes/Tarra.webp", label: "Tarra" },
  { src: "/assets/wiki-heroes/Thaleia.webp", label: "Thaleia" },
  { src: "/assets/wiki-heroes/Theia.webp", label: "Theia" },
  { src: "/assets/wiki-heroes/Theodore.webp", label: "Theodore" },
  { src: "/assets/wiki-heroes/Thundelyn.webp", label: "Thundelyn" },
  { src: "/assets/wiki-heroes/Tobin.webp", label: "Tobin" },
  { src: "/assets/wiki-heroes/Tohar.webp", label: "Tohar" },
  { src: "/assets/wiki-heroes/Urag.webp", label: "Urag" },
  { src: "/assets/wiki-heroes/Velyn.webp", label: "Velyn" },
  { src: "/assets/wiki-heroes/Waldyr.webp", label: "Waldyr" },
  { src: "/assets/wiki-heroes/Waldyr-icon.webp", label: "Waldyr Icon" },
  { src: "/assets/wiki-heroes/Zayda.webp", label: "Zayda" }
];

const wikiMarkerImages = [
  { src: "/assets/wiki-markers/asseble.png", label: "Assemble" },
  { src: "/assets/wiki-markers/attack.png", label: "Attack" },
  { src: "/assets/wiki-markers/attention.png", label: "Attention" },
  { src: "/assets/wiki-markers/build.png", label: "Build" },
  { src: "/assets/wiki-markers/clover.png", label: "Clover" },
  { src: "/assets/wiki-markers/defend.png", label: "Defend" },
  { src: "/assets/wiki-markers/destroy.png", label: "Destroy" },
  { src: "/assets/wiki-markers/diamond.png", label: "Diamond" },
  { src: "/assets/wiki-markers/forbiden.png", label: "Forbidden" },
  { src: "/assets/wiki-markers/heart.png", label: "Heart" },
  { src: "/assets/wiki-markers/moon.png", label: "Moon" },
  { src: "/assets/wiki-markers/pyramid.png", label: "Pyramid" },
  { src: "/assets/wiki-markers/recover.png", label: "Recover" },
  { src: "/assets/wiki-markers/shield.png", label: "Shield" },
  { src: "/assets/wiki-markers/special.png", label: "Special" },
  { src: "/assets/wiki-markers/star.png", label: "Star" },
  { src: "/assets/wiki-markers/stope.png", label: "Stop" },
  { src: "/assets/wiki-markers/sun.png", label: "Sun" },
  { src: "/assets/wiki-markers/target.png", label: "Target" },
  { src: "/assets/wiki-markers/tear.png", label: "Tear" }
];

const wikiArtifactImages = [
  { src: "/assets/wiki-artifacts/about-call-of-dragons-artifacts-tier-list.jpg", label: "Artifacts Tier List" },
  { src: "/assets/wiki-artifacts/amulet-of-glory.jpg", label: "Amulet Of Glory" },
  { src: "/assets/wiki-artifacts/ancient-tree-roots.jpg", label: "Ancient Tree Roots" },
  { src: "/assets/wiki-artifacts/archery-masters-manual.jpg", label: "Archery Masters Manual" },
  { src: "/assets/wiki-artifacts/blade-of-reproach.jpg", label: "Blade Of Reproach" },
  { src: "/assets/wiki-artifacts/bloodblade-banner.jpg", label: "Bloodblade Banner" },
  { src: "/assets/wiki-artifacts/breath-of-jargentis.jpg", label: "Breath Of Jargentis" },
  { src: "/assets/wiki-artifacts/breath-of-the-forest.jpg", label: "Breath Of The Forest" },
  { src: "/assets/wiki-artifacts/butchers-blade.jpg", label: "Butchers Blade" },
  { src: "/assets/wiki-artifacts/centaur-bow.jpg", label: "Centaur Bow" },
  { src: "/assets/wiki-artifacts/cloak-of-stealth.jpg", label: "Cloak Of Stealth" },
  { src: "/assets/wiki-artifacts/codex-of-prophecy.jpg", label: "Codex Of Prophecy" },
  { src: "/assets/wiki-artifacts/dragonrift.jpg", label: "Dragonrift" },
  { src: "/assets/wiki-artifacts/dragonscale-armor.jpg", label: "Dragonscale Armor" },
  { src: "/assets/wiki-artifacts/enchiridion-of-advanced-incantations.jpg", label: "Enchiridion Of Advanced Incantations" },
  { src: "/assets/wiki-artifacts/fang-of-ashkari.jpg", label: "Fang Of Ashkari" },
  { src: "/assets/wiki-artifacts/freezing-ring.jpg", label: "Freezing Ring" },
  { src: "/assets/wiki-artifacts/giants-bone.jpg", label: "Giants Bone" },
  { src: "/assets/wiki-artifacts/goldcrest.jpg", label: "Goldcrest" },
  { src: "/assets/wiki-artifacts/greenfinger-sickle.jpg", label: "Greenfinger Sickle" },
  { src: "/assets/wiki-artifacts/greymars-warhammer.jpg", label: "Greymars Warhammer" },
  { src: "/assets/wiki-artifacts/heart-of-kamasi.jpg", label: "Heart Of Kamasi" },
  { src: "/assets/wiki-artifacts/heartpiercer.jpg", label: "Heartpiercer" },
  { src: "/assets/wiki-artifacts/infernal-flame.jpg", label: "Infernal Flame" },
  { src: "/assets/wiki-artifacts/kingslayer.jpg", label: "Kingslayer" },
  { src: "/assets/wiki-artifacts/lucias-horn.jpg", label: "Lucias Horn" },
  { src: "/assets/wiki-artifacts/magic-bomb.jpg", label: "Magic Bomb" },
  { src: "/assets/wiki-artifacts/mirage-orb.jpg", label: "Mirage Orb" },
  { src: "/assets/wiki-artifacts/oath-of-stormpeak.jpg", label: "Oath Of Stormpeak" },
  { src: "/assets/wiki-artifacts/phoenix-eye.jpg", label: "Phoenix Eye" },
  { src: "/assets/wiki-artifacts/potion-of-vigor.jpg", label: "Potion Of Vigor" },
  { src: "/assets/wiki-artifacts/rattle-spear.jpg", label: "Rattle Spear" },
  { src: "/assets/wiki-artifacts/shadowblades.jpg", label: "Shadowblades" },
  { src: "/assets/wiki-artifacts/sorlands-blade.jpg", label: "Sorlands Blade" },
  { src: "/assets/wiki-artifacts/spirit-bangle.jpg", label: "Spirit Bangle" },
  { src: "/assets/wiki-artifacts/spiritbone-torc.jpg", label: "Spiritbone Torc" },
  { src: "/assets/wiki-artifacts/springbird-feather.jpg", label: "Springbird Feather" },
  { src: "/assets/wiki-artifacts/springblades.jpg", label: "Springblades" },
  { src: "/assets/wiki-artifacts/spring-of-silence.jpg", label: "Spring Of Silence" },
  { src: "/assets/wiki-artifacts/springs-of-silence.jpg", label: "Springs Of Silence" },
  { src: "/assets/wiki-artifacts/staff-of-spring.jpg", label: "Staff Of Spring" },
  { src: "/assets/wiki-artifacts/staff-of-the-prophet.jpg", label: "Staff Of The Prophet" },
  { src: "/assets/wiki-artifacts/storm-arrows.jpg", label: "Storm Arrows" },
  { src: "/assets/wiki-artifacts/tear-of-arbon.jpg", label: "Tear Of Arbon" },
  { src: "/assets/wiki-artifacts/violas-bow.jpg", label: "Violas Bow" },
  { src: "/assets/wiki-artifacts/visage-of-the-sanctus.jpg", label: "Visage Of The Sanctus" },
  { src: "/assets/wiki-artifacts/wolf-woman-of-haelor.jpg", label: "Wolf Woman Of Haelor" }
];

const wikiPetImages = [
  { src: "/assets/wiki-pets/Auric-Warhound.webp", label: "Auric Warhound" },
  { src: "/assets/wiki-pets/Barbed-Manticore.webp", label: "Barbed Manticore" },
  { src: "/assets/wiki-pets/Berserk-Faedrake.webp", label: "Berserk Faedrake" },
  { src: "/assets/wiki-pets/Blade-Manticore.webp", label: "Blade Manticore" },
  { src: "/assets/wiki-pets/Bruin-Bear.webp", label: "Bruin Bear" },
  { src: "/assets/wiki-pets/Frost-Bear.webp", label: "Frost Bear" },
  { src: "/assets/wiki-pets/Golden-Roc.webp", label: "Golden Roc" },
  { src: "/assets/wiki-pets/Ice-Lizard.webp", label: "Ice Lizard" },
  { src: "/assets/wiki-pets/Moonbear.webp", label: "Moonbear" },
  { src: "/assets/wiki-pets/Mossrock-Aurochs.webp", label: "Mossrock Aurochs" },
  { src: "/assets/wiki-pets/Night-Roc.webp", label: "Night Roc" },
  { src: "/assets/wiki-pets/Sand-Lizard.webp", label: "Sand Lizard" },
  { src: "/assets/wiki-pets/Sapphire-Faedrake.webp", label: "Sapphire Faedrake" },
  { src: "/assets/wiki-pets/Seraphic-Faedrake.webp", label: "Seraphic Faedrake" },
  { src: "/assets/wiki-pets/Shadow-Faedrake.webp", label: "Shadow Faedrake" },
  { src: "/assets/wiki-pets/Shadow-Manticore.webp", label: "Shadow Manticore" },
  { src: "/assets/wiki-pets/Snowpeak-Roc.webp", label: "Snowpeak Roc" },
  { src: "/assets/wiki-pets/Striped-Bear.webp", label: "Striped Bear" },
  { src: "/assets/wiki-pets/Thunder-Lizard.webp", label: "Thunder Lizard" },
  { src: "/assets/wiki-pets/Venomous-Lizard.webp", label: "Venomous Lizard" }
];

const thumbnailBackgrounds = [
  "arti.webp", "athe.webp", "atk.webp", "baby-dragon.webp", "beach.webp", "boad.webp", "bondfire.webp",
  "chatgpt-image-jul-26-2026-02-52-14-am.webp", "chatgpt-image-jul-26-2026-02-56-35-am.webp",
  "chatgpt-image-jul-26-2026-02-57-50-am.webp", "donkey.webp", "draag.webp", "drags.webp", "eirlys.webp",
  "fly.webp", "gae.webp", "generated-image-1-2-copy.webp", "generated-image-1-2.webp", "generated-image-1-3.webp",
  "generated-image-1-4.webp", "generated-image-1-5.webp", "generated-image-1-6.webp", "generated-image-1.webp",
  "generated-image-2.webp", "hosk.webp", "hosky.webp", "ice-dragon.webp", "lil.webp", "lili.webp", "megachin.webp",
  "nikko.webp", "nikpose.webp", "peet.webp", "petparty.webp", "pets.webp", "shadow.webp", "text.webp", "textbex.webp"
].map((filename) => ({
  src: `/assets/thumbnail-backgrounds/${filename}`,
  label: filename.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())
}));

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
    <link rel="icon" type="image/png" href="/assets/kella-favicon.png?v=1" />
    <link rel="shortcut icon" type="image/png" href="/assets/kella-favicon.png?v=1" />
    <link rel="apple-touch-icon" href="/assets/kella-logo.png?v=1" />
    <link rel="stylesheet" href="/assets/thumbnail-editor.css?v=3" />
    <style>
      @font-face {
        font-family: "Hero King";
        src: url("/assets/fonts/Heroking-Regular.ttf") format("truetype");
        font-display: swap;
      }
      @font-face {
        font-family: "Dragon Force";
        src: url("/assets/fonts/DragonForcE.ttf") format("truetype");
        font-display: swap;
      }
      @font-face {
        font-family: "Tribal Dragon";
        src: url("/assets/fonts/TribalDragon-23Ll.ttf") format("truetype");
        font-display: swap;
      }
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
      html { min-width: 0; overflow-x: hidden; }
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
        min-width: 0;
        overflow-x: hidden;
      }
      body.mobile-nav-open { overflow: hidden; }

      button, input, select, textarea { font: inherit; }
      button { cursor: pointer; }
      button:disabled { cursor: not-allowed; opacity: 0.62; }
      a { color: inherit; }
      img, svg, video, canvas { max-width: 100%; }

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
        min-width: 0;
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
        min-width: 0;
      }
      nav a span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
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
        grid-template-columns: minmax(0, 1fr) auto;
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
      .top-actions { display: flex; align-items: center; justify-content: flex-end; gap: 8px; min-width: 0; }
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
      .mobile-nav-toggle, .mobile-nav-backdrop { display: none; }
      .wiki-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 14px;
      }
      .wiki-search-card {
        margin-bottom: 16px;
        padding: 16px;
      }
      .wiki-search-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 12px;
        align-items: center;
      }
      .wiki-search-row input {
        width: 100%;
        min-height: 46px;
        border-radius: 8px;
        border: 1px solid rgba(121, 82, 33, 0.32);
        background: rgba(255, 248, 221, 0.78);
        color: #2f1b09;
        font-weight: 800;
        padding: 0 14px;
      }
      .wiki-search-row input:focus {
        border-color: rgba(190, 123, 24, 0.78);
        box-shadow: 0 0 0 3px rgba(255, 214, 90, 0.22);
        outline: none;
      }
      .wiki-search-count {
        min-width: 112px;
        color: #68491f;
        font-size: 12px;
        font-weight: 1000;
        text-align: right;
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }
      .wiki-card {
        min-height: 220px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 14px;
        background:
          linear-gradient(180deg, rgba(255, 248, 221, 0.94), rgba(236, 206, 134, 0.82)),
          radial-gradient(circle at 20% 0%, rgba(255, 214, 90, 0.34), transparent 36%);
      }
      .wiki-card h3 { margin: 0 0 8px; font-family: Georgia, "Times New Roman", serif; font-size: 24px; }
      .wiki-card p { margin: 0; color: #5f4528; line-height: 1.45; }
      .wiki-thumb {
        width: 100%;
        height: 130px;
        border-radius: 12px;
        object-fit: cover;
        border: 1px solid rgba(113, 74, 30, 0.34);
        background: rgba(255, 246, 211, 0.72);
      }
      .wiki-editor {
        margin-bottom: 18px;
      }
      .wiki-builder-toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
        margin: 14px 0;
      }
      .wiki-builder {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 14px;
        align-items: start;
      }
      .wiki-canvas-wrap {
        overflow: auto;
        scrollbar-gutter: stable both-edges;
        box-sizing: border-box;
        border-radius: 18px;
        width: min(850px, 100%);
        max-height: min(1080px, calc(100vh - 300px));
        margin: 0 auto;
        padding: 22px;
        background:
          radial-gradient(circle at 50% 0%, rgba(255,255,255,0.28), transparent 40%),
          linear-gradient(180deg, rgba(77, 48, 18, 0.18), rgba(52, 31, 11, 0.10));
        border: 1px solid rgba(126, 82, 31, 0.24);
      }
      .wiki-page-canvas,
      .wiki-reader-page {
        position: relative;
        width: 760px;
        height: var(--wiki-page-height, 980px);
        min-height: 980px;
        max-width: 100%;
        margin: 0 auto;
        overflow: visible;
        border-radius: 8px;
        color: #3f2a13;
        background:
          linear-gradient(90deg, rgba(104, 70, 31, 0.08), transparent 7%, transparent 93%, rgba(104, 70, 31, 0.08)),
          radial-gradient(circle at 18% 16%, rgba(255,255,255,0.32), transparent 22%),
          radial-gradient(circle at 80% 78%, rgba(151, 98, 44, 0.16), transparent 28%),
          linear-gradient(180deg, #f7e9bd, #dfbd75);
        border: 1px solid rgba(111, 71, 25, 0.38);
        box-shadow: inset 0 0 42px rgba(122, 80, 34, 0.17), 0 18px 36px rgba(55, 32, 12, 0.24);
      }
      .wiki-page-canvas {
        max-width: none;
      }
      .wiki-reader-stage {
        position: relative;
        width: 100%;
        min-height: 240px;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-gutter: stable both-edges;
        box-sizing: border-box;
        overscroll-behavior-x: contain;
        overscroll-behavior-y: auto;
        touch-action: pan-y pinch-zoom;
        border-radius: 12px;
        background: rgba(77, 48, 18, 0.10);
      }
      .wiki-reader-stage .wiki-reader-page {
        position: absolute;
        top: 0;
        left: 0;
        max-width: none;
        margin: 0;
        transform: scale(var(--wiki-reader-scale, 1));
        transform-origin: top left;
      }
      .wiki-reader-sizer {
        position: relative;
        margin: 0 auto;
      }
      .wiki-reader-toolbar {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
        margin-bottom: 8px;
      }
      .wiki-reader-toolbar button {
        min-width: 38px;
        min-height: 36px;
        padding: 6px 10px;
      }
      .wiki-reader-zoom {
        min-width: 58px;
        color: #68491f;
        font-size: 12px;
        font-weight: 1000;
        text-align: center;
      }
      .wiki-page-canvas::before,
      .wiki-reader-page::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(116, 77, 35, 0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(116, 77, 35, 0.025) 1px, transparent 1px);
        background-size: 28px 28px;
        pointer-events: none;
      }
      .wiki-block {
        position: absolute;
        z-index: 1;
        box-sizing: border-box;
        border: 1px dashed transparent;
        border-radius: 12px;
        transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
      }
      .wiki-page-canvas .wiki-block:hover,
      .wiki-block.selected {
        border-color: rgba(170, 100, 11, 0.82);
        box-shadow: 0 0 0 4px rgba(255, 214, 90, 0.24);
      }
      /* D: shadow as a non-clipped layer behind content — does not affect block dimensions */
      .wiki-image-block.wiki-block--shadowed {
        position: relative;
        z-index: 0;
      }
      .wiki-image-block.wiki-block--shadowed::before {
        content: "";
        position: absolute;
        inset: 8px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.45);
        z-index: 0;
        pointer-events: none;
      }
      .wiki-image-block.wiki-block--shadowed .wiki-media-frame {
        overflow: visible;
        position: relative;
        z-index: 1;
      }
      /* D: text shadow — renders on the text element, does not change block dimensions */
      .wiki-block--shadowed .wiki-text-content {
        text-shadow: 2px 3px 6px rgba(0, 0, 0, 0.55);
      }
      .wiki-text-block {
        display: flex;
        align-items: flex-start;
        padding: 12px 14px;
        line-height: 1.35;
        white-space: pre-wrap;
        overflow: visible;
        min-height: 48px;
      }
      .wiki-text-content {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        min-height: 0;
        outline: none;
        overflow: auto;
        overscroll-behavior: contain;
        overflow-wrap: anywhere;
        word-break: break-word;
        white-space: pre-wrap;
      }
      .wiki-inline-image {
        display: inline-block;
        width: 1.35em;
        height: 1.35em;
        margin: 0 0.12em;
        vertical-align: -0.28em;
        object-fit: contain;
        border-radius: 0.22em;
        user-select: all;
      }
      .wiki-image-block {
        padding: 0;
        background: rgba(255, 246, 211, 0.28);
        touch-action: none;
      }
      .wiki-media-frame {
        position: absolute;
        inset: 8px;
        overflow: visible;
        border-radius: 10px;
        background: rgba(76, 47, 18, 0.08);
      }
      .wiki-image-block img[data-wiki-media] {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        max-width: none;
        transform-origin: center;
        cursor: grab;
        user-select: none;
        touch-action: none;
        will-change: transform;
      }
      .wiki-image-block img[data-wiki-media]:active {
        cursor: grabbing;
      }
      .wiki-video-block {
        padding: 8px;
        background: rgba(255, 246, 211, 0.28);
      }
      .wiki-video-block video {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
        border-radius: 10px;
        background: #1f160d;
        box-shadow: 0 10px 24px rgba(68, 39, 13, 0.20);
      }
      .wiki-drag-handle,
      .wiki-resize-handle,
      .wiki-delete-block-button {
        position: absolute;
        z-index: 4;
        display: grid;
        place-items: center;
        color: #3f2a13;
        background: rgba(255, 228, 138, 0.96);
        border: 1px solid rgba(127, 80, 25, 0.38);
        box-shadow: 0 8px 16px rgba(67, 37, 10, 0.16);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.15s ease, transform 0.15s ease;
      }
      .wiki-drag-handle {
        left: 50%;
        top: -16px;
        transform: translateX(-50%);
        width: 30px;
        height: 30px;
        padding: 0;
        border-radius: 999px;
        cursor: move;
        font-size: 0;
        font-weight: 1000;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .wiki-drag-handle::after {
        content: "";
        display: block;
        width: 13px;
        height: 13px;
        border-radius: 3px;
        background:
          linear-gradient(#3f2a13, #3f2a13) center / 13px 2px no-repeat,
          linear-gradient(#3f2a13, #3f2a13) center / 2px 13px no-repeat;
        opacity: 0.82;
      }
      .wiki-block:hover .wiki-drag-handle,
      .wiki-block:hover .wiki-resize-handle,
      .wiki-block.selected .wiki-drag-handle,
      .wiki-block.selected .wiki-resize-handle {
        opacity: 0.96;
        pointer-events: auto;
      }
      .wiki-resize-handle {
        width: 18px;
        height: 18px;
        border-radius: 6px;
      }
      .wiki-resize-nw { left: -7px; top: -7px; cursor: nwse-resize; }
      .wiki-resize-ne { right: -7px; top: -7px; cursor: nesw-resize; }
      .wiki-resize-sw { left: -7px; bottom: -7px; cursor: nesw-resize; }
      .wiki-resize-se { right: -7px; bottom: -7px; cursor: nwse-resize; }
      .wiki-delete-block-button {
        top: -17px;
        right: 20px;
        width: 30px;
        height: 30px;
        border: 1px solid rgba(127, 21, 18, 0.72);
        border-radius: 999px;
        color: #fff7df;
        background: linear-gradient(180deg, #9e241b, #72120f);
        font-size: 18px;
        font-weight: 1000;
        line-height: 1;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        box-shadow: 0 8px 16px rgba(67, 20, 10, 0.22);
      }
      .wiki-block:hover .wiki-delete-block-button,
      .wiki-block.selected .wiki-delete-block-button {
        opacity: 0.98;
        pointer-events: auto;
      }
      .wiki-add-text-inline {
        position: absolute;
        left: 50%;
        bottom: -44px;
        z-index: 6;
        transform: translateX(-50%);
        min-width: 150px;
        min-height: 34px;
        border: 1px solid rgba(121, 82, 33, 0.34);
        border-radius: 999px;
        background: linear-gradient(180deg, #fff3bc, #e7bc61);
        color: #5a3411;
        font-weight: 1000;
        box-shadow: 0 10px 20px rgba(64, 37, 11, 0.18);
        cursor: pointer;
      }
      .wiki-add-text-inline:hover {
        filter: brightness(1.04);
        transform: translateX(-50%) translateY(-1px);
      }
      .wiki-add-text-inline--empty {
        top: 150px;
        bottom: auto;
      }
      .wiki-inspector {
        position: sticky;
        top: 10px;
        z-index: 16;
        display: flex;
        flex-direction: column;
        gap: 8px;
        border-radius: 18px;
        border: 1px solid rgba(121, 82, 33, 0.34);
        padding: 12px;
        margin: 14px 0 16px;
        background: linear-gradient(180deg, rgba(255, 246, 214, 0.96), rgba(230, 193, 112, 0.82));
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.42);
      }
      .wiki-inspector--empty {
        flex-direction: column;
        gap: 8px;
      }
      .wiki-editor .wiki-inspector,
      .wiki-editor .wiki-inspector button,
      .wiki-editor .wiki-inspector input,
      .wiki-editor .wiki-inspector select {
        font-family: "Segoe UI", ui-sans-serif, system-ui, sans-serif;
      }
      /* F: new grouped inspector layout */
      .wiki-inspector__group {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .wiki-inspector__group--assets {
        flex-direction: column;
      }
      .wiki-inspector__header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0;
      }
      .wiki-inspector__label {
        color: #6b431c;
        font-size: 11px;
        font-weight: 1000;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        white-space: nowrap;
      }
      .wiki-control-row {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
        align-items: end;
      }
      .wiki-control-row label {
        min-width: 80px;
        flex: 1 1 100px;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .wiki-control-row button { min-height: 36px; }
      .wiki-control-row .wiki-format-button { min-width: 36px; }
      .wiki-color-control input[type="color"] {
        width: 36px;
        height: 32px;
        padding: 0;
        border: 1px solid rgba(121, 82, 33, 0.32);
        border-radius: 8px;
        background: #fff;
        cursor: pointer;
      }
      .wiki-editor .wiki-inspector button,
      .wiki-editor .wiki-inspector input,
      .wiki-editor .wiki-inspector select,
      .wiki-editor .wiki-inspector label {
        font-family: "Segoe UI", ui-sans-serif, system-ui, sans-serif;
      }
      .wiki-inspector h4 {
        margin: 0;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 22px;
        line-height: 1;
      }
      .wiki-shadow-button.active {
        border-color: rgba(190, 123, 24, 0.78);
        background: linear-gradient(180deg, #fff2b5, #e7b84e);
        box-shadow: 0 3px 8px rgba(55, 32, 12, 0.32);
      }
      .wiki-shadow-controls {
        grid-column: 1 / -1;
        border: 1px solid rgba(121, 82, 33, 0.18);
        border-radius: 10px;
        padding: 7px;
        background: rgba(255, 250, 231, 0.44);
      }
      .wiki-shadow-controls summary {
        cursor: pointer;
        font-size: 12px;
        font-weight: 1000;
      }
      .wiki-shadow-grid {
        display: grid;
        grid-template-columns: repeat(5, minmax(64px, 1fr));
        gap: 6px;
        margin-top: 7px;
      }
      .wiki-shadow-grid label { min-width: 0; }
      .wiki-shadow-toggle { display: flex !important; align-items: center; gap: 7px; }
      .wiki-shadow-toggle input { width: auto; }
      .wiki-inline-format {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: repeat(3, 38px) minmax(108px, 1fr) minmax(72px, 0.7fr);
        gap: 6px;
        align-items: end;
      }
      .wiki-format-button {
        min-width: 38px;
        min-height: 38px;
        padding: 6px;
        border: 1px solid rgba(121, 82, 33, 0.32);
        border-radius: 9px;
        background: rgba(255, 250, 230, 0.88);
        color: #3f2a13;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 16px;
        font-weight: 900;
      }
      .wiki-format-button:hover,
      .wiki-format-button.active {
        border-color: rgba(190, 123, 24, 0.78);
        background: linear-gradient(180deg, #fff2b5, #e7b84e);
      }
      .wiki-format-button[data-wiki-inline-command="italic"] { font-style: italic; }
      .wiki-format-button[data-wiki-inline-command="underline"] { text-decoration: underline; }
      .wiki-inline-format label { min-width: 0; }
      .wiki-color-control {
        display: flex !important;
        flex-direction: column;
        align-items: center;
        justify-content: end;
      }
      .wiki-color-wheel {
        width: 38px !important;
        height: 38px !important;
        min-height: 38px !important;
        padding: 2px !important;
        border-radius: 50% !important;
        cursor: pointer;
        overflow: hidden;
        background: rgba(255, 250, 230, 0.88);
      }
      .wiki-color-wheel::-webkit-color-swatch-wrapper { padding: 2px; }
      .wiki-color-wheel::-webkit-color-swatch {
        border: 0;
        border-radius: 50%;
      }
      .wiki-color-wheel::-moz-color-swatch {
        border: 0;
        border-radius: 50%;
      }
      .wiki-font-option-hero { font-family: "Hero King", Georgia, serif; }
      .wiki-font-option-force { font-family: "Dragon Force", Georgia, serif; }
      .wiki-font-option-tribal { font-family: "Tribal Dragon", Georgia, serif; }
      .wiki-share-button {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .wiki-style-actions {
        align-self: stretch;
        display: grid;
        align-content: stretch;
        min-width: 0;
        padding: 8px;
        border-radius: 14px;
        background: rgba(255, 248, 221, 0.38);
        border: 1px solid rgba(121, 82, 33, 0.16);
      }
      .wiki-inspector label {
        display: grid;
        gap: 4px;
        margin-bottom: 0;
        font-size: 12px;
        font-weight: 900;
        color: #5a3818;
      }
      .wiki-inspector input,
      .wiki-inspector select {
        min-height: 34px;
      }
      .wiki-image-tools {
        display: grid;
        gap: 6px;
        margin-top: 0;
      }
      .wiki-image-tool-row {
        display: grid;
        grid-template-columns: repeat(5, minmax(72px, 1fr));
        gap: 6px;
      }
      .wiki-add-block-row {
        display: grid;
        grid-template-columns: minmax(120px, 1fr);
        gap: 6px;
      }
      .wiki-add-block-row .secondary {
        width: 100%;
      }
      .wiki-misc-picker {
        min-width: 0;
        margin-top: 0;
        position: relative;
      }
      .wiki-misc-picker > button {
        width: 100%;
      }
      .wiki-misc-panel {
        position: absolute;
        right: 0;
        top: calc(100% + 8px);
        z-index: 20;
        display: grid;
        grid-template-columns: repeat(4, minmax(74px, 1fr));
        gap: 8px;
        width: min(420px, calc(100vw - 36px));
        max-height: min(460px, 68vh);
        margin-top: 0;
        padding: 8px;
        overflow: auto;
        border: 1px solid rgba(121, 82, 33, 0.30);
        border-radius: 14px;
        background:
          linear-gradient(180deg, rgba(255, 250, 226, 0.98), rgba(238, 207, 137, 0.96)),
          radial-gradient(circle at 50% 0%, rgba(255, 215, 87, 0.28), transparent 55%);
        box-shadow: 0 22px 46px rgba(64, 37, 11, 0.28);
      }
      .wiki-misc-panel--hero {
        width: min(430px, calc(100vw - 36px));
        max-height: min(520px, 72vh);
        grid-template-columns: repeat(2, minmax(160px, 1fr));
        padding: 12px;
      }
      .wiki-misc-panel[hidden] {
        display: none;
      }
      .wiki-asset-search {
        grid-column: 1 / -1;
        display: block;
      }
      .wiki-asset-search input {
        width: 100%;
        min-height: 38px;
        padding: 9px 12px;
        border: 1px solid rgba(121, 82, 33, 0.32);
        border-radius: 12px;
        background: rgba(255, 250, 230, 0.90);
        color: #3f2a13;
        font-weight: 800;
      }
      .wiki-asset-search input:focus {
        outline: 2px solid rgba(218, 154, 37, 0.46);
        border-color: rgba(173, 112, 28, 0.72);
      }
      .wiki-asset-empty {
        grid-column: 1 / -1;
        padding: 14px;
        border: 1px dashed rgba(121, 82, 33, 0.36);
        border-radius: 12px;
        color: #71512b;
        font-weight: 900;
        text-align: center;
      }

      .buff-schedule-shell { display: grid; gap: 16px; }
      .buff-notice, .buff-footer {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 16px 18px;
        border: 1px solid rgba(143, 95, 28, 0.28);
        border-radius: 10px;
        background: rgba(255, 250, 226, 0.68);
      }
      .buff-notice img, .buff-footer img { width: 38px; height: 38px; object-fit: contain; flex: 0 0 auto; }
      .buff-notice strong, .buff-footer strong { display: block; margin-bottom: 3px; color: #70400d; }
      .buff-week { overflow: hidden; padding: 0; }
      .buff-week-heading, .buff-day-row {
        display: grid;
        grid-template-columns: 140px minmax(260px, 1fr) minmax(280px, 0.9fr);
        align-items: center;
        gap: 20px;
      }
      .buff-week-heading {
        padding: 13px 22px;
        color: #75512b;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        border-bottom: 1px solid rgba(143, 95, 28, 0.25);
      }
      .buff-day-row { position: relative; min-height: 112px; padding: 14px 22px; border-bottom: 1px solid rgba(143, 95, 28, 0.19); }
      .buff-day-row:last-child { border-bottom: 0; }
      .buff-day-row.is-today { background: linear-gradient(90deg, rgba(117, 183, 91, 0.2), rgba(255, 250, 226, 0.18)); box-shadow: inset 5px 0 #62a54d; }
      .buff-day-name { display: flex; align-items: center; gap: 9px; font: 800 18px Georgia, serif; color: #34210f; }
      .buff-today { padding: 4px 8px; border-radius: 999px; background: #dff1d2; color: #39762e; font: 800 9px Arial, sans-serif; letter-spacing: 0.06em; text-transform: uppercase; }
      .buff-current { display: grid; grid-template-columns: 76px 1fr; align-items: center; gap: 14px; min-width: 0; }
      .buff-icon { width: 72px; height: 72px; object-fit: contain; filter: drop-shadow(0 5px 7px rgba(75, 45, 10, 0.2)); }
      .buff-current h3 { margin: 0 0 4px; color: #2f702e; font-size: 19px; }
      .buff-current p { margin: 0; color: #725837; font-size: 13px; line-height: 1.45; }
      .buff-note { display: block; margin-top: 6px; color: #c36516; font-size: 11px; font-weight: 800; }
      .buff-admin-setting { display: grid; gap: 8px; }
      .buff-admin-setting select, .buff-admin-setting input { width: 100%; margin: 0; }
      .buff-admin-setting select { min-height: 46px; font-weight: 800; }
      .buff-readonly { justify-self: start; padding: 8px 12px; border-radius: 999px; background: rgba(206, 151, 42, 0.13); color: #795119; font-size: 12px; font-weight: 800; }
      .buff-updated { text-align: right; color: #876a43; font-size: 12px; }
      .buff-publish-toggle {
        display: inline-flex;
        align-items: center;
        gap: 9px;
        min-height: 38px;
        padding: 6px 10px;
        border: 1px solid rgba(143, 95, 28, 0.28);
        border-radius: 999px;
        background: rgba(255, 250, 226, 0.66);
        color: #5d3d1b;
        cursor: pointer;
        font-size: 12px;
        font-weight: 900;
      }
      .buff-publish-toggle input { position: absolute; opacity: 0; pointer-events: none; }
      .buff-toggle-track { position: relative; width: 38px; height: 22px; flex: 0 0 auto; border-radius: 999px; background: #b9a78b; transition: background 150ms ease; }
      .buff-toggle-track::after { content: ""; position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; border-radius: 50%; background: #fff8df; box-shadow: 0 2px 5px rgba(64, 37, 11, 0.28); transition: transform 150ms ease; }
      .buff-publish-toggle input:checked + .buff-toggle-track { background: linear-gradient(180deg, #e4ad2f, #b96d12); }
      .buff-publish-toggle input:checked + .buff-toggle-track::after { transform: translateX(16px); }
      .buff-publish-toggle input:focus-visible + .buff-toggle-track { outline: 2px solid #d59b25; outline-offset: 2px; }
      .buff-date-list { display: grid; gap: 9px; }
      .buff-date-item { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; gap: 12px; align-items: center; padding: 11px 13px; border: 1px solid rgba(143, 95, 28, 0.22); border-radius: 9px; background: rgba(255, 250, 226, 0.54); }
      .buff-date-item img { width: 44px; height: 44px; object-fit: contain; }
      .buff-date-item h4 { margin: 0 0 3px; }
      .buff-date-item span { color: #76572f; font-size: 12px; }
      .training-shell { display: grid; gap: 16px; }
      .training-intro {
        display: grid;
        grid-template-columns: 84px minmax(0, 1fr);
        gap: 18px;
        align-items: center;
        padding: 18px 20px;
        border: 1px solid rgba(143, 95, 28, 0.28);
        border-radius: 12px;
        background: linear-gradient(110deg, rgba(255, 249, 224, 0.84), rgba(232, 195, 114, 0.48));
      }
      .training-intro img {
        width: 76px;
        height: 76px;
        object-fit: contain;
        filter: drop-shadow(0 8px 10px rgba(67, 37, 10, 0.24));
      }
      .training-intro strong { display: block; margin-bottom: 5px; color: #3d270f; font: 900 19px Georgia, serif; }
      .training-intro span { color: #775735; line-height: 1.5; }
      .training-resource-settings {
        display: grid;
        grid-template-columns: minmax(190px, 260px) minmax(0, 1fr);
        gap: 16px;
        align-items: center;
        padding: 14px 16px;
        border: 1px solid rgba(143, 95, 28, 0.26);
        border-radius: 12px;
        background: rgba(255, 248, 220, 0.72);
      }
      .training-resource-settings[hidden] { display: none; }
      .training-resource-settings label { display: grid; gap: 6px; color: #5e3c1c; font-size: 12px; font-weight: 900; }
      .training-resource-settings select { width: 100%; min-height: 46px; margin: 0; }
      .training-resource-settings strong { display: block; margin-bottom: 3px; color: #4c3015; }
      .training-resource-settings span { color: #7b5c38; font-size: 12px; line-height: 1.4; }
      .training-mode-tabs {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 8px;
        padding: 7px;
        border: 1px solid rgba(143, 95, 28, 0.28);
        border-radius: 12px;
        background: rgba(238, 208, 143, 0.62);
      }
      .training-mode-button {
        min-height: 48px;
        border: 1px solid transparent;
        border-radius: 9px;
        background: transparent;
        color: #6b4a25;
        font-weight: 950;
      }
      .training-mode-button:hover { border-color: rgba(172, 109, 22, 0.30); background: rgba(255, 249, 225, 0.55); }
      .training-mode-button.active {
        border-color: #c58619;
        background: linear-gradient(180deg, #ffe99a, #df9f24);
        color: #3e2609;
        box-shadow: 0 9px 20px rgba(137, 79, 12, 0.22), inset 0 1px rgba(255,255,255,0.68);
      }
      .training-panel[hidden] { display: none; }
      .training-calculator-card { padding: 20px; }
      .training-panel-head { display: flex; align-items: start; justify-content: space-between; gap: 16px; margin-bottom: 18px; }
      .training-panel-head h3 { margin: 0 0 4px; }
      .training-panel-head p { margin: 0; color: #7b5c38; line-height: 1.45; }
      .training-input-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
      .training-time-grid { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
      .training-input-grid label, .training-time-grid label { display: grid; gap: 6px; color: #5e3c1c; font-size: 12px; font-weight: 900; }
      .training-input-grid input, .training-input-grid select, .training-time-grid input { width: 100%; min-height: 46px; margin: 0; }
      .training-troop-inputs { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px; }
      .training-troop-inputs label { display: grid; gap: 5px; min-width: 0; color: #5e3c1c; font-size: 11px; font-weight: 950; text-align: center; }
      .training-troop-inputs input { width: 100%; min-height: 45px; margin: 0; text-align: center; }
      .training-results { margin-top: 18px; }
      .training-summary-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin: 0 0 14px; }
      .training-summary {
        min-height: 82px;
        padding: 13px 14px;
        border: 1px solid rgba(143, 95, 28, 0.22);
        border-radius: 10px;
        background: rgba(255, 249, 224, 0.64);
      }
      .training-summary span { display: block; margin-bottom: 6px; color: #84633d; font-size: 10px; font-weight: 900; letter-spacing: 0.06em; text-transform: uppercase; }
      .training-summary strong { color: #3a230d; font-size: 20px; line-height: 1.1; }
      .training-table-wrap { overflow-x: auto; border: 1px solid rgba(143, 95, 28, 0.26); border-radius: 11px; }
      .training-table { width: 100%; min-width: 570px; margin: 0; }
      .training-table-resources { min-width: 850px; }
      .training-table th { color: #73512c; background: rgba(219, 171, 75, 0.20); }
      .training-table td, .training-table th { border-color: rgba(143, 95, 28, 0.18); }
      .training-tier { display: flex; align-items: center; gap: 10px; font-weight: 950; }
      .training-tier-badge { display: grid; width: 38px; height: 32px; place-items: center; border-radius: 8px; background: #f2cf7b; color: #623a0d; }
      .training-note { margin: 12px 0 0; color: #806140; font-size: 12px; line-height: 1.5; }
      .training-empty { padding: 28px 16px; color: #806140; text-align: center; font-weight: 800; }
      .training-compact-value { white-space: nowrap; }
      .training-resource-list { display: grid; grid-template-columns: repeat(4, minmax(72px, 1fr)); gap: 6px; min-width: 330px; }
      .training-resource {
        display: grid;
        grid-template-columns: 30px 1fr;
        gap: 1px 5px;
        align-items: center;
        padding: 7px 8px;
        border: 1px solid rgba(139, 91, 24, 0.18);
        border-radius: 8px;
        background: rgba(255, 248, 221, 0.72);
      }
      .training-resource img { grid-row: 1 / 3; width: 30px; height: 30px; object-fit: contain; filter: drop-shadow(0 2px 2px rgba(67, 41, 15, .24)); }
      .training-resource small { color: #80603a; font-size: 8px; font-weight: 900; letter-spacing: 0.04em; text-transform: uppercase; }
      .training-resource strong { color: #43290f; font-size: 12px; }
      .training-resource-summary {
        display: grid;
        grid-template-columns: minmax(170px, 0.7fr) minmax(420px, 1.7fr);
        gap: 14px;
        align-items: center;
        margin: 0 0 14px;
        padding: 13px 14px;
        border: 1px solid rgba(143, 95, 28, 0.25);
        border-radius: 11px;
        background: linear-gradient(110deg, rgba(255, 246, 206, 0.88), rgba(231, 192, 105, 0.40));
      }
      .training-resource-summary-title strong { display: block; color: #44290f; font: 900 16px Georgia, serif; }
      .training-resource-summary-title span { color: #7b5c38; font-size: 10px; }
      .training-mix-tier-tabs {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 8px;
        margin: 16px 0;
      }
      .training-mix-tier-button {
        min-height: 48px;
        padding: 8px;
        border: 1px solid rgba(143, 95, 28, 0.28);
        border-radius: 9px;
        background: rgba(255, 249, 224, 0.72);
        color: #69461f;
        font-weight: 900;
      }
      .training-mix-tier-button.active {
        border-color: #c58619;
        background: linear-gradient(180deg, #ffe99a, #df9f24);
        color: #3e2609;
        box-shadow: 0 6px 14px rgba(137, 79, 12, 0.18);
      }
      .training-mix-troops { display: grid; gap: 8px; margin: 0 0 16px; }
      .training-mix-row {
        display: grid;
        grid-template-columns: 110px minmax(160px, 1fr) 110px 58px;
        gap: 10px;
        align-items: center;
        padding: 10px 12px;
        border: 1px solid rgba(143, 95, 28, 0.20);
        border-radius: 10px;
        background: rgba(255, 249, 224, 0.62);
      }
      .training-mix-row > strong { color: #4b2e13; }
      .training-mix-row input[type="range"] { width: 100%; accent-color: #cc8a18; }
      .training-mix-row input[type="number"] { width: 100%; min-height: 42px; margin: 0; text-align: center; }
      .training-mix-row output { color: #8a642f; font-size: 11px; font-weight: 900; text-align: right; }
      .training-plan-actions { display: flex; align-items: center; justify-content: flex-end; gap: 10px; margin: 14px 0; }
      .training-plan-actions button:disabled { cursor: not-allowed; opacity: 0.48; }
      .training-saved-plan { margin-top: 20px; }
      .training-saved-plan-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 10px; }
      .training-saved-plan-head h3 { margin: 0; }
      .training-step-units { display: flex; flex-wrap: wrap; gap: 4px 10px; min-width: 240px; }
      .training-step-units span { white-space: nowrap; }
      .training-step-remove { min-width: 34px; min-height: 34px; padding: 0; border-radius: 50%; }
      .wiki-misc-panel--artifact {
        width: min(470px, calc(100vw - 36px));
        max-height: min(520px, 72vh);
        grid-template-columns: repeat(3, minmax(120px, 1fr));
        padding: 12px;
      }
      .wiki-misc-panel--pet {
        width: min(470px, calc(100vw - 36px));
        max-height: min(520px, 72vh);
        grid-template-columns: repeat(3, minmax(120px, 1fr));
        padding: 12px;
      }
      .wiki-misc-panel--marker {
        width: min(350px, calc(100vw - 36px));
        max-height: min(440px, 66vh);
        grid-template-columns: repeat(4, minmax(62px, 1fr));
      }
      .wiki-misc-tile {
        display: grid;
        gap: 4px;
        justify-items: center;
        align-content: center;
        min-height: 86px;
        padding: 7px;
        border: 1px solid rgba(121, 82, 33, 0.24);
        border-radius: 12px;
        background: rgba(255, 244, 201, 0.72);
        color: #4a2d13;
        cursor: grab;
      }
      .wiki-misc-tile:hover {
        border-color: rgba(173, 112, 28, 0.68);
        box-shadow: 0 8px 18px rgba(101, 63, 20, 0.16);
      }
      .wiki-misc-upload {
        border-style: dashed;
        background: linear-gradient(180deg, rgba(255, 245, 202, 0.95), rgba(231, 196, 116, 0.72));
        cursor: pointer;
      }
      .wiki-upload-plus {
        display: grid;
        width: 44px;
        height: 44px;
        place-items: center;
        border: 1px solid rgba(121, 82, 33, 0.26);
        border-radius: 14px;
        background: rgba(255, 252, 232, 0.72);
        color: #8a4d08;
        font-size: 28px;
        font-weight: 950;
        line-height: 1;
      }
      .wiki-misc-tile img {
        width: 100%;
        height: 54px;
        object-fit: contain;
        pointer-events: none;
      }
      .wiki-misc-tile span {
        max-width: 100%;
        overflow: hidden;
        color: #68491f;
        font-size: 11px;
        font-weight: 800;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .wiki-misc-tile--hero {
        min-height: 190px;
        padding: 10px;
        gap: 8px;
        align-content: start;
        background: linear-gradient(180deg, rgba(255, 248, 217, 0.90), rgba(231, 196, 116, 0.72));
      }
      .wiki-misc-tile--hero img {
        height: 142px;
      }
      .wiki-misc-tile--hero span {
        font-size: 13px;
        line-height: 1.2;
        white-space: normal;
        overflow: visible;
        text-align: center;
        text-overflow: clip;
      }
      .wiki-misc-tile--artifact {
        min-height: 128px;
        padding: 9px;
        align-content: start;
      }
      .wiki-misc-tile--artifact img {
        height: 82px;
      }
      .wiki-misc-tile--artifact span {
        white-space: normal;
        overflow: visible;
        text-align: center;
        text-overflow: clip;
      }
      .wiki-misc-tile--pet {
        min-height: 128px;
        padding: 9px;
        align-content: start;
      }
      .wiki-misc-tile--pet img {
        height: 82px;
      }
      .wiki-misc-tile--pet span {
        white-space: normal;
        overflow: visible;
        text-align: center;
        text-overflow: clip;
      }
      .wiki-misc-tile--marker {
        min-height: 76px;
        padding: 6px;
      }
      .wiki-misc-tile--marker img {
        height: 38px;
      }
      .wiki-misc-tile--marker span {
        font-size: 10px;
      }
      .wiki-reader {
        display: grid;
        gap: 16px;
      }
      .wiki-reader h2 {
        margin: 0;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(28px, 4vw, 44px);
        line-height: 1;
      }
      .wiki-body {
        white-space: pre-wrap;
        line-height: 1.62;
        color: #3f2a13;
      }
      .wiki-font-serif { font-family: Georgia, "Times New Roman", serif; }
      .wiki-font-sans { font-family: "Trebuchet MS", "Segoe UI", ui-sans-serif, system-ui, sans-serif; }
      .wiki-font-display { font-family: Georgia, "Palatino Linotype", "Times New Roman", serif; font-weight: 850; letter-spacing: 0.01em; }
      .wiki-font-script { font-family: "Segoe Script", "Brush Script MT", cursive; }
      .wiki-font-mono { font-family: Consolas, "Courier New", monospace; }
      .wiki-font-cod { font-family: "Copperplate Gothic Bold", "Cinzel", Georgia, serif; font-weight: 900; letter-spacing: 0.03em; }
      .wiki-font-hero-king { font-family: "Hero King", Georgia, serif; }
      .wiki-font-dragon-force { font-family: "Dragon Force", Georgia, serif; }
      .wiki-font-tribal-dragon { font-family: "Tribal Dragon", Georgia, serif; }
      .wiki-size-small { font-size: 15px; }
      .wiki-size-medium { font-size: 18px; }
      .wiki-size-large { font-size: 22px; }
      .wiki-size-xlarge { font-size: 28px; }
      @media (max-width: 940px) {
        .wiki-builder { grid-template-columns: 1fr; }
        .wiki-canvas-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .wiki-page-canvas { width: 760px; max-width: none; }
      }
      .content { padding: 24px 20px 28px; min-width: 0; }
      .guild { display: flex; align-items: center; gap: 14px; }
      .guild, .guild > div { min-width: 0; }
      .guild h1, .guild span { overflow-wrap: anywhere; }
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
      .calendar-weekdays {
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        gap: 10px;
        margin-bottom: 8px;
        color: #725736;
        font-size: 11px;
        font-weight: 1000;
        letter-spacing: 0.06em;
        text-align: center;
        text-transform: uppercase;
      }
      .wiki-tag-filters,
      .wiki-card-tags,
      .wiki-editor-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .wiki-tag-filters { margin-top: 12px; }
      .wiki-tag-button,
      .wiki-tag-chip {
        min-height: 32px;
        border: 1px solid rgba(121, 82, 33, 0.28);
        border-radius: 999px;
        padding: 6px 12px;
        background: rgba(255, 248, 221, 0.72);
        color: #68491f;
        font-size: 12px;
        font-weight: 900;
      }
      .wiki-tag-button.active,
      .wiki-editor-tags .wiki-tag-button.selected {
        border-color: #d19a23;
        background: linear-gradient(180deg, #ffe88a, #e7ad2f);
        color: #3d2509;
        box-shadow: 0 4px 12px rgba(157, 99, 14, 0.2);
      }
      .wiki-card-tags { margin: 10px 0; }
      .wiki-tag-chip { min-height: 0; padding: 4px 9px; background: rgba(238, 201, 116, 0.45); }
      .wiki-tags-field small { display: block; margin-top: 6px; color: #76572f; }
      .wiki-editor-tags { margin-top: 9px; }
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
      .calendar-day-top-buff { display: flex; justify-content: center; font-size: 11px; font-weight: 950; color: #3a220c; margin-bottom: 2px; }
      .calendar-day-list-buff { display: flex; justify-content: center; align-items: center; padding: 0; }
      .calendar-day-bottom-buff { display: flex; justify-content: center; font-size: 10px; font-weight: 700; color: #7b5b34; text-transform: capitalize; margin-top: 2px; }
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
      .calendar-entry.buff { display: inline-flex; align-items: center; justify-content: center; padding: 0; margin: 2px 0; border-radius: 0; border: 0; background: transparent; overflow: visible; }
      .calendar-entry.buff img { width: 22px; height: 22px; object-fit: contain; filter: drop-shadow(0 2px 3px rgba(72, 42, 12, 0.20)); }
      .calendar-entry.buff small { display: none; }
      .calendar-entry:not(.buff) { display: grid; grid-template-columns: 28px minmax(0, 1fr); align-items: center; column-gap: 6px; }
      .calendar-entry:not(.buff) img { grid-row: 1 / span 2; width: 28px; height: 28px; object-fit: contain; }
      .calendar-entry:not(.buff) span { display: block; font: 800 10px Arial, sans-serif; color: #34210f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .calendar-entry:not(.buff) small { display: block; color: #6e512d; font-size: 9px; font-weight: 850; margin-top: 2px; overflow: hidden; text-overflow: ellipsis; }
      .calendar-buff-image { position: relative; display: inline-flex; cursor: pointer; }
      .calendar-buff-image img { width: 24px; height: 24px; }
      .calendar-buff-tooltip { display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(255, 255, 255, 0.95); border: 1px solid rgba(120, 75, 25, 0.5); border-radius: 8px; padding: 8px; text-align: center; font: 800 11px Arial, sans-serif; color: #34210f; white-space: nowrap; z-index: 10; pointer-events: none; }
      .calendar-buff-image:hover .calendar-buff-tooltip { display: block; }
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
      .calendar-detail-card .calendar-detail-buff-icon { width: 28px; height: 28px; object-fit: contain; filter: drop-shadow(0 2px 3px rgba(72, 42, 12, 0.20)); margin-right: 6px; vertical-align: middle; }
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
      .feedback-page {
        width: min(100%, 860px);
        margin: 0 auto;
      }
      .feedback-page .complaint-form-card { padding: clamp(18px, 3vw, 30px); }
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
      .metric-selector {
        margin: 0 0 16px;
        border: 1px solid rgba(106, 63, 20, 0.22);
        border-radius: 10px;
        background: rgba(255, 247, 219, 0.48);
        overflow: hidden;
      }
      .metric-selector summary {
        min-height: 48px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 14px;
        color: #4d260f;
        cursor: pointer;
        list-style: none;
        font-weight: 900;
      }
      .metric-selector summary::-webkit-details-marker { display: none; }
      .metric-selector summary::after {
        content: "+";
        margin-left: auto;
        width: 28px;
        height: 28px;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: rgba(198, 121, 26, 0.14);
        font-size: 20px;
        line-height: 1;
      }
      .metric-selector[open] summary::after { content: "−"; }
      .metric-selector-label {
        color: #76532f;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .metric-selector-value {
        padding: 5px 10px;
        border-radius: 999px;
        background: linear-gradient(180deg, #ffec83, #c6791a);
        color: #201006;
        font-size: 11px;
        text-transform: uppercase;
      }
      .metric-picker {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(72px, 1fr));
        gap: 7px;
        padding: 0 12px 12px;
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
      .profile-season-card {
        margin-top: 18px;
        border: 1px solid rgba(106, 63, 20, 0.24);
        border-radius: 12px;
        padding: clamp(14px, 3vw, 22px);
        background:
          radial-gradient(circle at 50% 42%, rgba(255, 201, 111, 0.30), transparent 48%),
          linear-gradient(180deg, rgba(255, 244, 207, 0.84), rgba(237, 203, 137, 0.72));
        overflow: hidden;
      }
      .profile-season-topbar {
        display: grid;
        grid-template-columns: minmax(132px, 1fr) auto minmax(132px, 1fr);
        align-items: start;
        gap: 12px;
        min-width: 0;
      }
      .profile-season-head { grid-column: 2; text-align: center; margin-bottom: 6px; }
      .profile-season-head h4 { margin: 0; font-size: 20px; }
      .profile-season-head p { margin: 3px 0 0; color: #76532f; font-size: 12px; font-weight: 800; }
      .profile-graph-toggle {
        grid-column: 3;
        justify-self: end;
        display: inline-grid;
        grid-template-columns: 30px auto 32px;
        align-items: center;
        gap: 7px;
        min-height: 42px;
        max-width: 168px;
        border: 1px solid rgba(122, 73, 18, 0.34);
        border-radius: 999px;
        padding: 5px 8px 5px 5px;
        background: linear-gradient(180deg, rgba(255, 246, 211, 0.96), rgba(224, 188, 115, 0.92));
        color: #4d2a12;
        box-shadow: 0 5px 14px rgba(95, 54, 13, 0.14), inset 0 1px 0 rgba(255,255,255,0.72);
        cursor: pointer;
        transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease;
      }
      .profile-graph-toggle:hover, .profile-graph-toggle:focus-visible {
        transform: translateY(-1px);
        border-color: rgba(177, 105, 14, 0.72);
        box-shadow: 0 8px 18px rgba(95, 54, 13, 0.20), 0 0 0 3px rgba(255, 220, 94, 0.24);
        outline: none;
      }
      .profile-graph-toggle img { width: 30px; height: 30px; border-radius: 50%; object-fit: cover; }
      .profile-graph-toggle-copy { display: grid; gap: 1px; min-width: 0; text-align: left; line-height: 1.05; }
      .profile-graph-toggle-copy strong { font-size: 10px; white-space: nowrap; }
      .profile-graph-toggle-copy small { color: #7c5732; font-size: 9px; font-weight: 800; }
      .profile-graph-switch { position: relative; width: 32px; height: 18px; border-radius: 999px; background: rgba(89, 55, 23, 0.25); box-shadow: inset 0 1px 3px rgba(65, 35, 10, 0.24); transition: background 160ms ease; }
      .profile-graph-switch::after { content: ""; position: absolute; top: 3px; left: 3px; width: 12px; height: 12px; border-radius: 50%; background: #fff4cf; box-shadow: 0 1px 4px rgba(59, 29, 5, 0.34); transition: transform 180ms ease; }
      .profile-graph-toggle.active .profile-graph-switch { background: linear-gradient(90deg, #b66e12, #f0b93e); }
      .profile-graph-toggle.active .profile-graph-switch::after { transform: translateX(14px); }
      .profile-radar { display: block; width: min(100%, 640px); height: auto; margin: 2px auto 0; overflow: visible; }
      .radar-ring { fill: none; stroke: rgba(112, 72, 31, 0.22); stroke-width: 1; }
      .radar-axis { stroke: rgba(112, 72, 31, 0.22); stroke-width: 1; }
      .radar-area { fill: rgba(255, 91, 67, 0.57); stroke: #e65e40; stroke-width: 2.5; }
      .radar-area, .radar-dot { transform-box: fill-box; transform-origin: center; animation: radar-grow 360ms ease-out; }
      .radar-dot { fill: #ff7658; stroke: #fff0c7; stroke-width: 2; }
      .radar-label { fill: #604523; font-size: 13px; font-weight: 900; }
      .radar-value { fill: #9a4b28; font-size: 10px; font-weight: 900; }
      .profile-radar-controls { display: grid; gap: 10px; margin-top: 10px; }
      .profile-radar-controls details { margin: 0; }
      .profile-radar-controls .metric-picker { padding-top: 2px; }
      .profile-radar-snapshots { display: grid; gap: 7px; min-width: 0; }
      .profile-radar-snapshots-label { color: #76532f; font-size: 10px; font-weight: 900; letter-spacing: 0.08em; text-align: center; text-transform: uppercase; }
      .profile-radar-dates { display: flex; flex-wrap: wrap; justify-content: center; gap: 7px; min-width: 0; }
      .profile-radar-date { flex: 0 0 auto; min-width: 54px; min-height: 34px; border-radius: 999px; padding: 6px 11px; font-size: 10px; font-weight: 900; cursor: pointer; pointer-events: auto; touch-action: manipulation; }
      .profile-radar-date:hover, .profile-radar-date:focus-visible { border-color: #bd7618; box-shadow: 0 5px 12px rgba(115, 67, 15, 0.18); outline: none; }
      .profile-radar-date.active { background: linear-gradient(180deg, #fff3a2, #d88a20); border-color: #94500a; color: #201006; box-shadow: 0 0 0 3px rgba(255, 224, 87, 0.76), 0 7px 16px rgba(116, 67, 13, 0.30); animation: snapshot-selected 280ms ease-out; }
      .profile-radar-date-select-shell { display: none; }
      .profile-radar-date-select {
        width: 100%;
        min-height: 44px;
        border: 1px solid rgba(134, 81, 20, 0.42);
        border-radius: 10px;
        padding: 9px 38px 9px 12px;
        background: linear-gradient(180deg, #fff4ce, #e9c77f);
        color: #3f260e;
        font: inherit;
        font-size: 14px;
        font-weight: 900;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.7), 0 5px 14px rgba(101, 61, 16, 0.12);
      }
      .profile-trend-chart { display: grid; gap: 10px; width: min(100%, 640px); margin: 4px auto 0; }
      .profile-trend-summary { display: flex; align-items: end; justify-content: space-between; gap: 12px; padding: 0 24px; color: #684420; }
      .profile-trend-summary span { display: grid; gap: 1px; }
      .profile-trend-summary small { color: #8a633d; font-size: 10px; font-weight: 900; letter-spacing: 0.06em; text-transform: uppercase; }
      .profile-trend-summary strong { font-size: clamp(20px, 4vw, 30px); }
      .profile-trend-change { border-radius: 999px; padding: 6px 11px; background: rgba(110, 72, 31, 0.09); font-size: 12px; font-weight: 900; }
      .profile-trend-change.positive { background: rgba(76, 151, 77, 0.16); color: #246834; }
      .profile-trend-change.negative { background: rgba(181, 65, 52, 0.13); color: #9c3329; }
      .profile-trend-svg { display: block; width: 100%; height: auto; overflow: visible; }
      .profile-trend-grid { stroke: rgba(112, 72, 31, 0.17); stroke-width: 1; }
      .profile-trend-axis-label { fill: #8a633d; font-size: 10px; font-weight: 800; }
      .profile-trend-area { fill: url(#profileTrendFill); }
      .profile-trend-line { fill: none; stroke: #aa5b18; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
      .profile-trend-dot { fill: #f3b73f; stroke: #77400e; stroke-width: 2; cursor: pointer; transition: r 140ms ease, fill 140ms ease; }
      .profile-trend-dot:hover { r: 6; fill: #fff0a4; }
      .profile-trend-dot.active { fill: #ff6b4c; stroke: #fff1c1; stroke-width: 3; animation: snapshot-selected 280ms ease-out; }
      .profile-trend-empty { display: grid; place-items: center; min-height: 230px; border: 1px dashed rgba(106, 63, 20, 0.28); border-radius: 12px; color: #7b5b38; font-weight: 800; text-align: center; }
      .profile-edit-button { margin-top: 9px; min-height: 30px; padding: 5px 11px; font-size: 11px; }
      .admin-profile-editor { position: fixed; inset: 0; z-index: 4; display: none; align-items: center; justify-content: center; padding: 24px; }
      .admin-profile-editor.open { display: flex; }
      .admin-profile-editor-backdrop { position: absolute; inset: 0; background: rgba(35, 19, 7, 0.66); backdrop-filter: blur(4px); }
      .admin-profile-editor-panel { position: relative; width: min(680px, calc(100vw - 28px)); max-height: calc(100vh - 42px); overflow: auto; border: 1px solid rgba(106, 63, 20, 0.38); border-radius: 12px; padding: 18px; background: linear-gradient(180deg, #fff1c5, #e6be78); box-shadow: 0 28px 80px rgba(0,0,0,0.48); }
      .admin-profile-editor-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
      .admin-profile-editor-avatar { display: flex; justify-content: center; margin-bottom: 12px; }
      @keyframes radar-grow { from { opacity: 0.2; transform: scale(0.55); } to { opacity: 1; transform: scale(1); } }
      @keyframes snapshot-selected { from { transform: scale(0.88); } 65% { transform: scale(1.08); } to { transform: scale(1); } }
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
      .optional-link-button {
        padding: 14px;
        border: 1px solid rgba(92, 55, 18, 0.20);
        border-radius: 8px;
        background: rgba(255, 248, 218, 0.42);
      }
      .optional-link-button-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        margin-bottom: 12px;
      }
      .optional-link-button-head strong { display: block; }
      .optional-link-button-head span { display: block; margin-top: 3px; color: var(--muted); font-size: 13px; }
      .optional-link-button-fields { display: grid; grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr); gap: 12px; }
      .optional-link-button-fields input:disabled { opacity: 0.55; cursor: not-allowed; }
      .command-settings { margin-top: 18px; }
      .command-settings-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 16px; }
      .command-setting {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 13px 14px;
        border: 1px solid rgba(92, 55, 18, 0.20);
        border-radius: 8px;
        background: rgba(255, 247, 219, 0.46);
      }
      .command-setting strong { display: block; color: #3f250e; }
      .command-setting small { display: block; margin-top: 3px; color: #775a36; line-height: 1.35; }
      .command-setting .switch:disabled { cursor: not-allowed; opacity: 0.5; }
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
      .table-wrap {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
      }
      .table-wrap table { margin: 0; }
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
      .preview-link-button {
        display: none;
        width: fit-content;
        margin-top: 14px;
        padding: 9px 15px;
        border-radius: 999px;
        background: #5865f2;
        color: white;
        font: inherit;
        font-weight: 900;
        text-decoration: none;
        pointer-events: none;
      }

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
      .member-modal.wiki-modal .member-modal-panel {
        width: min(940px, calc(100vw - 28px));
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

      .lord-tools-shell { display: grid; gap: 16px; }
      .profile-hub-nav { display: flex; gap: 8px; padding: 7px; overflow-x: auto; border: 1px solid var(--line); border-radius: 8px; background: rgba(231, 207, 151, 0.52); scrollbar-width: thin; }
      .profile-hub-nav button { flex: 0 0 auto; min-height: 42px; padding: 9px 15px; border: 1px solid rgba(122, 79, 27, 0.24); background: rgba(255, 249, 226, 0.82); color: #5b3817; font-size: 12px; font-weight: 1000; }
      .profile-hub-nav button.active { border-color: #b4760f; background: linear-gradient(180deg, #f8d96c, #e9ad29); color: #291500; box-shadow: inset 0 1px rgba(255,255,255,0.62), 0 4px 12px rgba(124, 69, 8, 0.18); }
      .profile-hub-nav + .two { margin-top: 16px; }
      .lord-intro { display: grid; grid-template-columns: 76px minmax(0, 1fr) auto; gap: 18px; align-items: center; padding: 18px; border: 1px solid var(--line); border-radius: 8px; background: rgba(255, 247, 215, 0.74); }
      .lord-intro > img { width: 76px; height: 76px; padding: 8px; object-fit: contain; border: 1px solid rgba(156, 100, 22, 0.34); border-radius: 50%; background: #16263e; }
      .lord-intro h3 { margin: 0 0 5px; font-size: 25px; }
      .lord-intro p { margin: 0; color: var(--muted); }
      .lord-save-state { display: grid; gap: 4px; text-align: right; color: var(--muted); font-size: 12px; font-weight: 900; }
      .lord-navigation { display: grid; grid-template-columns: minmax(0, 1fr) minmax(190px, 250px); gap: 10px; align-items: center; }
      .lord-tabs { display: flex; gap: 7px; min-width: 0; padding: 7px; overflow-x: auto; border: 1px solid var(--line); border-radius: 8px; background: rgba(231, 207, 151, 0.56); scrollbar-width: thin; }
      .lord-tab { flex: 0 0 auto; min-height: 40px; padding: 8px 13px; border: 1px solid rgba(122, 79, 27, 0.26); background: rgba(255, 249, 226, 0.82); color: #5b3817; font-size: 12px; font-weight: 1000; }
      .lord-tab.active { border-color: #b4760f; background: #efbd3f; color: #291500; box-shadow: inset 0 1px rgba(255,255,255,0.55), 0 4px 12px rgba(124, 69, 8, 0.18); }
      .lord-view-select { min-height: 54px; border-color: rgba(139, 91, 23, 0.42); background: rgba(255, 249, 226, 0.9); color: #4f3014; font-weight: 1000; }
      .lord-panel { display: grid; gap: 16px; }
      .lord-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
      .lord-summary-card { min-width: 0; padding: 15px; border: 1px solid var(--line); border-radius: 8px; background: rgba(255, 249, 224, 0.72); }
      .lord-summary-card span { display: block; margin-bottom: 6px; color: var(--muted); font-size: 10px; font-weight: 1000; letter-spacing: 0.08em; text-transform: uppercase; }
      .lord-summary-card strong { display: block; font-size: clamp(20px, 2.5vw, 30px); line-height: 1; overflow-wrap: anywhere; }
      .lord-progress { height: 8px; margin-top: 12px; overflow: hidden; border-radius: 999px; background: rgba(107, 67, 23, 0.16); }
      .lord-progress i { display: block; width: var(--lord-progress, 0%); height: 100%; border-radius: inherit; background: #c78414; transition: width 0.22s ease; }
      .lord-section-heading { display: flex; align-items: end; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
      .lord-section-heading h3 { margin: 0; }
      .lord-section-heading p { margin: 4px 0 0; color: var(--muted); }
      .lord-tool-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
      .lord-tool-card { display: grid; grid-template-columns: 52px minmax(0, 1fr); gap: 12px; align-items: center; min-height: 118px; padding: 15px; border: 1px solid var(--line); border-radius: 8px; background: rgba(255, 249, 224, 0.72); color: var(--text); text-align: left; }
      .lord-tool-card:hover { border-color: #b77912; transform: translateY(-1px); }
      .lord-tool-card img { width: 52px; height: 52px; object-fit: contain; }
      .lord-tool-card strong { display: block; margin-bottom: 4px; font-size: 17px; }
      .lord-tool-card span { color: var(--muted); font-size: 13px; line-height: 1.45; }
      .lord-form { padding: 18px; }
      .lord-form .form-grid { align-items: start; }
      .lord-form label > small { display: block; margin-top: 5px; color: var(--muted); font-weight: 700; line-height: 1.35; }
      .lord-table { min-width: 760px; }
      .lord-table th:first-child, .lord-table td:first-child { position: sticky; left: 0; z-index: 1; background: #f1dba4; }
      .lord-table input { min-width: 92px; text-align: right; }
      .lord-speedups { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
      .lord-speedup-card { display: grid; gap: 7px; padding: 16px; border: 1px solid var(--line); border-radius: 8px; background: rgba(255, 249, 224, 0.72); }
      .lord-speedup-card img { width: 46px; height: 46px; object-fit: contain; }
      .lord-speedup-card input { font-size: 24px; font-weight: 1000; }
      .lord-catalog-toolbar { display: grid; grid-template-columns: minmax(220px, 1fr) auto; gap: 10px; align-items: center; }
      .lord-catalog { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
      .lord-catalog-card { display: grid; gap: 11px; min-width: 0; padding: 13px; border: 1px solid var(--line); border-radius: 8px; background: rgba(255, 249, 224, 0.72); }
      .lord-catalog-card.hidden { display: none; }
      .lord-catalog-head { display: grid; grid-template-columns: 52px minmax(0, 1fr) auto; gap: 10px; align-items: center; }
      .lord-catalog-head img { width: 52px; height: 52px; border-radius: 7px; object-fit: cover; background: rgba(81, 48, 15, 0.1); }
      .lord-catalog-head strong { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .lord-catalog-head small { color: var(--muted); }
      .lord-catalog-fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
      .lord-skill-row { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; }
      .lord-skill-row input { min-width: 0; padding: 8px 4px; text-align: center; }
      .lord-pill { min-height: 34px; padding: 6px 10px; border: 1px solid rgba(115, 72, 24, 0.26); border-radius: 999px; background: rgba(239, 220, 174, 0.66); color: #68421c; font-size: 11px; font-weight: 1000; }
      .lord-pill.on { border-color: #418857; background: #d9edc6; color: #1e6539; }
      .lord-pairings { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
      .lord-pair-card { padding: 16px; border: 1px solid var(--line); border-radius: 8px; background: rgba(255, 249, 224, 0.72); }
      .lord-pair-card h4 { margin: 0 0 12px; font-size: 19px; }
      .lord-pet-preview { display: grid; grid-template-columns: 110px minmax(0, 1fr); gap: 18px; align-items: center; }
      .lord-pet-preview img { width: 110px; height: 110px; object-fit: contain; }
      .lord-calc-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
      .lord-calc-card { padding: 17px; border: 1px solid var(--line); border-radius: 8px; background: rgba(255, 249, 224, 0.72); }
      .lord-calc-card h3 { margin: 0 0 4px; }
      .lord-calc-card > p { margin: 0 0 14px; color: var(--muted); }
      .lord-calc-results { display: grid; grid-template-columns: repeat(auto-fit, minmax(105px, 1fr)); gap: 8px; margin-top: 12px; }
      .lord-calc-results div { min-width: 0; padding: 10px; border: 1px solid rgba(119, 77, 26, 0.18); border-radius: 7px; background: rgba(239, 216, 160, 0.44); }
      .lord-calc-results span { display: block; color: var(--muted); font-size: 9px; font-weight: 1000; text-transform: uppercase; }
      .lord-calc-results strong { display: block; margin-top: 4px; overflow-wrap: anywhere; }
      .lord-calc-results .lord-calc-resource { display: grid; grid-template-columns: 34px minmax(0, 1fr); grid-template-rows: auto auto; column-gap: 8px; align-items: center; }
      .lord-calc-resource img { grid-row: 1 / 3; width: 34px; height: 34px; object-fit: contain; filter: drop-shadow(0 2px 2px rgba(67, 41, 15, .24)); }
      .lord-research-workspace { overflow: hidden; border: 1px solid #5e4d1f; border-radius: 8px; background: #080a0b; color: #f4ead0; box-shadow: 0 22px 52px rgba(31, 18, 4, 0.28); }
      .lord-tools-shell:has(.lord-research-workspace) > .lord-intro { display: none; }
      .shell:has(.lord-research-workspace) { width: min(1540px, calc(100vw - 28px)); grid-template-columns: 210px minmax(0, 1fr); }
      .lord-research-head { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 20px; border-bottom: 1px solid #403a25; background: linear-gradient(180deg, #17191b, #0d0f11); }
      .lord-research-head h3 { margin: 0; color: #f1dca6; font-size: 25px; font-weight: 800; letter-spacing: 0.02em; }
      .lord-research-head p { margin: 4px 0 0; color: #8e8b82; font-size: 13px; }
      .lord-research-reset { min-width: 76px; border-color: #9a7809; background: #121313; color: #efd351; }
      .lord-research-layout { display: grid; grid-template-columns: 224px minmax(0, 1fr); min-height: 650px; }
      .lord-research-settings { display: flex; flex-direction: column; align-items: stretch; gap: 15px; min-width: 0; padding: 18px 16px; border-right: 1px solid #393527; background: linear-gradient(180deg, #141618, #0d0f10); }
      .lord-research-settings-heading { min-width: 0; padding-bottom: 13px; border-bottom: 1px solid #30312d; }
      .lord-research-settings-heading strong { display: block; color: #ead48d; font-size: 13px; letter-spacing: .08em; text-transform: uppercase; }
      .lord-research-settings-heading small { display: block; margin-top: 4px; color: #777a76; font-size: 10px; line-height: 1.3; }
      .lord-research-settings label { display: grid; gap: 5px; min-width: 0; color: #99978f; font-size: 10px; font-weight: 900; letter-spacing: .03em; text-transform: uppercase; }
      .lord-research-settings input, .lord-research-settings select { width: 100%; min-width: 0; min-height: 40px; padding: 8px 10px; border-color: #5b4b19; border-radius: 5px; background: #0b0d0f; color: #eee5ce; }
      .lord-research-inspector { border-left: 1px solid #333226; }
      .lord-research-panel-title { display: flex; align-items: center; gap: 9px; margin: 0 0 14px; color: #e9d392; font-size: 13px; font-weight: 1000; letter-spacing: 0.08em; text-transform: uppercase; }
      .lord-research-panel-title::before { content: ""; width: 28px; height: 28px; border: 1px solid #705c1f; border-radius: 50%; background: radial-gradient(circle, #493b12, #18170e); }
      .lord-research-toggle { display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%; min-height: 62px; margin-top: 3px; padding: 10px 12px; border: 1px solid #5b4b19; border-radius: 6px; background: #0b0d0f; color: #d4c9ab; text-align: left; }
      .lord-research-toggle i { position: relative; width: 35px; height: 19px; flex: 0 0 auto; border-radius: 999px; background: #343536; }
      .lord-research-toggle i::after { content: ""; position: absolute; top: 3px; left: 3px; width: 13px; height: 13px; border-radius: 50%; background: #aaa; transition: transform .18s ease, background .18s ease; }
      .lord-research-toggle.on { border-color: #9b7b17; color: #f2d967; }
      .lord-research-toggle.on i { background: #59490f; }
      .lord-research-toggle.on i::after { transform: translateX(16px); background: #f0cc3e; }
      .lord-research-main { display: grid; grid-template-rows: auto minmax(0, 1fr); min-width: 0; background: #060809; }
      body.lord-research-fullscreen-open { overflow: hidden; }
      .lord-research-main.is-fullscreen, .lord-research-main:fullscreen { position: fixed; inset: 0; z-index: 10000; width: 100vw; height: 100dvh; min-height: 100vh; background: #060809; }
      .lord-research-main.is-fullscreen .lord-research-tree-scroll, .lord-research-main:fullscreen .lord-research-tree-scroll { height: auto; min-height: 0; }
      .lord-research-tabs { display: flex; align-items: stretch; min-height: 52px; border-bottom: 1px solid #343328; background: #0d0f11; }
      .lord-research-tab { min-width: 142px; border: 0; border-right: 1px solid #252728; border-radius: 0; background: transparent; color: #9b9990; font-weight: 900; }
      .lord-research-tab.active { color: #f0d05b; box-shadow: inset 0 -2px #d0a500; }
      .lord-research-tab:hover { color: #f5df8c; background: rgba(208, 165, 0, .07); }
      .lord-research-hint { display: flex; align-items: center; justify-content: flex-end; margin-left: auto; padding: 0 16px; color: #7f827d; font-size: 11px; font-weight: 800; white-space: nowrap; }
      .lord-research-fullscreen-control { display: flex; align-items: center; padding-right: 10px; }
      .lord-research-fullscreen-toggle { display: grid; place-items: center; width: 36px; min-width: 36px; height: 34px; padding: 0; border: 1px solid #544819; border-radius: 6px; background: #151717; color: #ead16e; }
      .lord-research-fullscreen-toggle:hover { border-color: #b99318; background: #20211b; }
      .lord-research-fullscreen-icon { position: relative; width: 16px; height: 16px; }
      .lord-research-fullscreen-icon::before, .lord-research-fullscreen-icon::after { content: ""; position: absolute; inset: 0; background: linear-gradient(#ead16e, #ead16e) left top / 6px 2px no-repeat, linear-gradient(#ead16e, #ead16e) left top / 2px 6px no-repeat, linear-gradient(#ead16e, #ead16e) right top / 6px 2px no-repeat, linear-gradient(#ead16e, #ead16e) right top / 2px 6px no-repeat, linear-gradient(#ead16e, #ead16e) left bottom / 6px 2px no-repeat, linear-gradient(#ead16e, #ead16e) left bottom / 2px 6px no-repeat, linear-gradient(#ead16e, #ead16e) right bottom / 6px 2px no-repeat, linear-gradient(#ead16e, #ead16e) right bottom / 2px 6px no-repeat; }
      .lord-research-main.is-fullscreen .lord-research-fullscreen-icon::before, .lord-research-main:fullscreen .lord-research-fullscreen-icon::before { transform: scale(.68); }
      .lord-research-main.is-fullscreen .lord-research-fullscreen-icon::after, .lord-research-main:fullscreen .lord-research-fullscreen-icon::after { transform: scale(-1); }
      .lord-research-summary { position: absolute; z-index: 8; top: 12px; left: 12px; width: min(390px, calc(100% - 24px)); overflow: hidden; border: 1px solid #263b47; border-radius: 8px; background: rgba(5, 10, 20, .94); box-shadow: 0 10px 28px rgba(0, 0, 0, .4); backdrop-filter: blur(7px); }
      .lord-research-summary-title { padding: 10px 12px; border-bottom: 1px solid #26313c; color: #d5d6d4; font-size: 11px; font-weight: 1000; letter-spacing: .04em; }
      .lord-research-summary-speed, .lord-research-summary-resources { display: flex; align-items: center; gap: 9px; min-width: 0; padding: 9px 12px; }
      .lord-research-summary-speed { border-bottom: 1px solid #1c2933; }
      .lord-research-summary span { color: #777f79; font-size: 9px; font-weight: 900; letter-spacing: .04em; text-transform: uppercase; }
      .lord-research-summary strong { color: #9ee4ca; font-size: 11px; white-space: nowrap; }
      .lord-research-summary-speed strong { margin-left: auto; color: #efd970; }
      .lord-research-summary-resources { flex-wrap: wrap; }
      .lord-research-summary-resources > span { margin-right: 3px; }
      .lord-research-summary .lord-research-resource { display: inline-flex; align-items: center; gap: 4px; }
      .lord-research-resource img { width: 18px; height: 18px; object-fit: contain; filter: drop-shadow(0 2px 3px rgba(0, 0, 0, .55)); }
      .lord-research-tree-scroll { position: relative; min-height: 650px; height: clamp(650px, calc(100vh - 222px), 870px); overflow: hidden; overscroll-behavior: contain; touch-action: none; cursor: grab; background-color: #02070d; background-image: radial-gradient(circle at 8% 26%, rgba(174, 214, 255, .72) 0 1px, transparent 1.5px), radial-gradient(circle at 28% 72%, rgba(174, 214, 255, .48) 0 1px, transparent 1.5px), radial-gradient(circle at 52% 18%, rgba(174, 214, 255, .56) 0 1px, transparent 1.5px), radial-gradient(circle at 76% 64%, rgba(174, 214, 255, .44) 0 1px, transparent 1.5px), radial-gradient(circle at 91% 33%, rgba(174, 214, 255, .58) 0 1px, transparent 1.5px), radial-gradient(ellipse at 52% 60%, rgba(11, 47, 68, .48), transparent 66%), linear-gradient(180deg, #010407 0%, #020a12 48%, #071a29 100%); background-size: 173px 137px, 229px 181px, 311px 223px, 263px 197px, 347px 251px, auto, auto; }
      .lord-research-tree-scroll.is-dragging { cursor: grabbing; user-select: none; }
      .lord-research-tree { position: absolute; top: 0; left: 0; margin: 0; transform-origin: 0 0; will-change: transform; background: radial-gradient(ellipse at center, rgba(8, 52, 42, .2), transparent 70%); box-shadow: none; }
      .lord-research-lines { position: absolute; inset: 0; z-index: 1; width: 100%; height: 100%; overflow: visible; }
      .lord-research-line { fill: none; stroke: #3a6a7b; stroke-width: 2; opacity: .45; filter: drop-shadow(0 0 1px #1a3a4b); }
      .lord-research-line.done { stroke: #d4a853; opacity: 1; filter: drop-shadow(0 0 2px rgba(212, 168, 83, .4)); }
      .lord-research-node { position: absolute; z-index: 2; display: flex; flex-direction: column; align-items: center; width: 84px; min-height: 76px; padding: 0; border: 0; border-radius: 6px; background: transparent; color: #d8d6cb; text-align: center; }
      .lord-research-node:hover, .lord-research-node.selected { transform: translateY(-2px); filter: brightness(1.12); }
      .lord-research-node.selected .lord-research-node-art { filter: drop-shadow(0 0 7px #efc631); }
      .lord-research-node-art { position: relative; width: 48px; height: 48px; padding: 4px; background-position: center; background-repeat: no-repeat; background-size: contain; }
      .lord-research-node.t1 .lord-research-node-art { background-image: url('/assets/research/ui/t1_bg.png'); }
      .lord-research-node.t2 .lord-research-node-art { background-image: url('/assets/research/ui/t2_bg.png'); }
      .lord-research-node.t3 .lord-research-node-art { background-image: url('/assets/research/ui/t3_bg.png'); }
      .lord-research-node.t4 .lord-research-node-art { background-image: url('/assets/research/ui/t4_bg.png'); }
      .lord-research-node.t5 .lord-research-node-art { background-image: url('/assets/research/ui/t5_bg.png'); }
      .lord-research-node-art::after { content: ""; position: absolute; inset: 0; z-index: 2; pointer-events: none; background: url('/assets/research/ui/frame.png') center / contain no-repeat; }
      .lord-research-node-art img { position: relative; z-index: 1; width: 100%; height: 100%; object-fit: contain; image-rendering: auto; transform: translateZ(0); backface-visibility: hidden; }
      .lord-research-node.available .lord-research-node-art { filter: brightness(.82) saturate(.92); }
      .lord-research-node.locked .lord-research-node-art { filter: brightness(.52) saturate(.55); opacity: .8; }
      .lord-research-node.locked > strong { color: #898b88; }
      .lord-research-node-level { position: absolute; left: 50%; bottom: -3px; z-index: 3; display: grid; place-items: center; width: 32px; min-width: 32px; height: 14px; padding: 0 2px; border: 1px solid #6b6a65; border-radius: 3px; background: rgba(3, 4, 5, .92); color: #ece8dc; font-size: 8px; line-height: 1; font-weight: 1000; transform: translateX(-50%); }
      .lord-research-node > strong { display: -webkit-box; width: 84px; max-height: 24px; margin-top: 3px; overflow: hidden; color: #d8d6cb; font-family: system-ui, sans-serif; font-size: 10px; line-height: 12px; font-weight: 800; text-shadow: 0 1px 2px #000; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
      .lord-research-inspector-inner { display: grid; gap: 13px; }
      .lord-research-selected { display: grid; justify-items: center; gap: 8px; padding: 15px; border: 1px solid #3f3b28; border-radius: 7px; background: #0c0e10; text-align: center; }
      .lord-research-selected img { width: 82px; height: 82px; padding: 8px; object-fit: contain; background: url('/assets/research/ui/frame.png') center / contain no-repeat; }
      .lord-research-selected h4 { margin: 0; color: #f0dfad; font-size: 17px; }
      .lord-research-selected p { margin: 0; color: #8f8e88; font-size: 11px; }
      .lord-research-level-controls { display: grid; grid-template-columns: 38px 1fr 38px; gap: 6px; width: 100%; }
      .lord-research-level-controls button { min-height: 36px; padding: 5px; border-color: #594a1c; background: #181916; color: #eed160; }
      .lord-research-level-controls strong { display: grid; place-items: center; border: 1px solid #3d3c31; border-radius: 5px; background: #080a0b; }
      .lord-research-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; width: 100%; }
      .lord-research-actions button { min-height: 34px; padding: 6px; border-color: #594a1c; background: #151615; color: #d8c98f; font-size: 10px; }
      .lord-research-costs { display: grid; gap: 6px; }
      .lord-research-costs div { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 8px 9px; border: 1px solid #2c302c; border-radius: 5px; background: #0c0f0e; }
      .lord-research-costs span { color: #8d8f8b; font-size: 10px; text-transform: uppercase; }
      .lord-research-costs strong { color: #e6d9b7; font-size: 12px; }
      .lord-research-empty { padding: 20px 8px; color: #85857f; font-size: 12px; text-align: center; }
      .lord-building-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
      .lord-building-card { display: grid; grid-template-columns: 50px minmax(0, 1fr) 86px; gap: 11px; align-items: center; padding: 13px; border: 1px solid var(--line); border-radius: 8px; background: rgba(255, 249, 224, 0.72); }
      .lord-building-card img { width: 50px; height: 50px; object-fit: contain; }
      .lord-building-card strong { display: block; }
      .lord-building-card small { color: var(--muted); }
      .lord-building-card input { min-width: 0; padding: 8px; text-align: center; }
      .lord-active-decorations { color: #1f683e; font-size: 12px; font-weight: 1000; }
      .lord-empty { grid-column: 1 / -1; }

      @media (max-width: 1120px) {
        .shell { width: min(100%, calc(100vw - 20px)); grid-template-columns: 220px minmax(0, 1fr); }
        .shell:has(.lord-research-workspace) { width: min(100%, calc(100vw - 20px)); grid-template-columns: 190px minmax(0, 1fr); }
        .topbar { grid-template-columns: 1fr; align-items: start; }
        .top-actions { justify-content: flex-start; flex-wrap: wrap; }
        .grid, .stats, .form-grid, .quick-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .two, .players, .dashboard-main, .attendance-grid { grid-template-columns: 1fr; }
        .wiki-inspector { grid-template-columns: 1fr; align-items: stretch; }
        .wiki-style-controls { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .wiki-style-controls--picture { grid-template-columns: 1fr; }
        .calendar-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .event-calendar .calendar-day,
        .attendance-calendar-card .event-calendar .calendar-day { min-height: 150px; }
        .command-board { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .buff-week-heading, .buff-day-row { grid-template-columns: 110px minmax(230px, 1fr) minmax(220px, 0.8fr); gap: 14px; }
        .lord-grid, .lord-speedups { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .lord-tool-grid, .lord-catalog { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .lord-research-layout { grid-template-columns: 205px minmax(0, 1fr); }
        .lord-building-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
      @media (max-width: 780px) {
        body { background-attachment: scroll; }
        .command-settings-grid { grid-template-columns: 1fr; }
        .lord-intro { grid-template-columns: 58px minmax(0, 1fr); }
        .lord-intro > img { width: 58px; height: 58px; }
        .lord-save-state { grid-column: 1 / -1; display: flex; justify-content: space-between; text-align: left; }
        .lord-tool-grid, .lord-catalog, .lord-pairings, .lord-calc-grid, .lord-building-grid { grid-template-columns: 1fr; }
        .lord-research-head { align-items: flex-start; padding: 15px; }
        .lord-research-head h3 { font-size: 21px; }
        .lord-research-layout { grid-template-columns: 1fr; min-height: 0; }
        .lord-research-settings, .lord-research-inspector { border: 0; border-bottom: 1px solid #333226; }
        .lord-research-settings { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; padding: 12px; }
        .lord-research-settings-heading { grid-column: 1 / -1; }
        .lord-research-main { min-height: 590px; }
        .lord-research-tabs { min-height: 54px; }
        .lord-research-tab { min-width: 42%; }
        .lord-research-hint { display: none; }
        .lord-research-tabs { flex-wrap: wrap; }
        .lord-research-fullscreen-control { margin-left: auto; padding: 7px 10px; }
        .lord-research-summary { top: 8px; left: 8px; width: min(370px, calc(100% - 16px)); }
        .lord-research-summary-title { padding: 8px 10px; }
        .lord-research-summary-speed, .lord-research-summary-resources { padding: 7px 10px; }
        .lord-research-resource img { width: 17px; height: 17px; }
        .lord-research-summary span { font-size: 8px; }
        .lord-research-summary strong { font-size: 10px; }
        .lord-research-tree-scroll { min-height: 520px; height: 68dvh; max-height: 720px; }
        .lord-research-inspector-inner { grid-template-columns: 1fr; }
        .lord-catalog-toolbar { grid-template-columns: 1fr; }
        .profile-hub-nav { margin-inline: -4px; }
        .lord-navigation { grid-template-columns: 1fr; }
        .lord-tabs { display: none; }
        .lord-view-select { min-height: 48px; }
        .shell {
          width: 100%;
          min-height: 100vh;
          margin: 0;
          border-radius: 0;
          grid-template-columns: 1fr;
          border-left: 0;
          border-right: 0;
          overflow: visible;
        }
        .shell:has(.lord-research-workspace) { width: 100%; grid-template-columns: 1fr; }
        .shell > aside {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 60;
          width: min(82vw, 310px);
          height: 100dvh;
          max-height: 100dvh;
          min-height: 100dvh;
          overflow-y: auto;
          padding: 18px 14px;
          border-right: 1px solid rgba(255, 214, 90, 0.34);
          transform: translateX(-105%);
          transition: transform 220ms ease;
          box-shadow: 22px 0 54px rgba(0, 0, 0, 0.42);
        }
        .shell > aside.open { transform: translateX(0); }
        .mobile-nav-backdrop {
          position: fixed;
          inset: 0;
          z-index: 55;
          border: 0;
          background: rgba(13, 8, 4, 0.58);
          backdrop-filter: blur(3px);
        }
        .mobile-nav-backdrop.open { display: block; }
        .brand { margin-bottom: 18px; padding: 0 2px; }
        .brand-logo { width: 42px; height: 42px; border-radius: 50%; }
        .brand strong { font-size: 14px; }
        .brand span { font-size: 10px; }
        nav {
          display: grid;
          gap: 7px;
          overflow-y: auto;
          padding: 0 2px 18px;
        }
        nav a {
          width: 100%;
          min-height: 48px;
          max-width: none;
          padding: 9px 11px;
          font-size: 14px;
        }
        nav a.active, nav a:hover { transform: translateX(2px); }
        .nav-icon { width: 26px; height: 26px; }
        .side-spacer, .side-footer { display: none; }
        .content { padding: 18px 12px 92px; }
        .hero { grid-template-columns: 1fr; display: grid; align-items: start; }
        .topbar {
          position: sticky;
          top: 0;
          z-index: 40;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 64px;
          padding: 8px 10px;
          gap: 8px;
          box-shadow: 0 8px 20px rgba(67, 37, 10, 0.12);
        }
        .guild { gap: 8px; flex: 1 1 auto; }
        .mobile-nav-toggle {
          width: 42px;
          height: 42px;
          flex: 0 0 42px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(109, 69, 25, 0.30);
          border-radius: 10px;
          background: rgba(255, 244, 205, 0.78);
          color: #3b220c;
          font-size: 22px;
          line-height: 1;
        }
        .guild .avatar-img { width: 40px; height: 40px; }
        .guild .muted { display: none; }
        h1 { font-size: 21px; line-height: 1.05; }
        h2 { font-size: 28px; line-height: 1.08; }
        h3 { font-size: 18px; }
        .hero { gap: 13px; margin-bottom: 18px; }
        .hero p { line-height: 1.5; }
        .top-actions { width: auto; flex: 0 0 auto; display: flex; gap: 6px; }
        .top-actions .server-clock, .auth-pill, [data-profile-button] { display: none !important; }
        .top-actions .auth-button, .profile-top-button { width: auto; min-width: 42px; min-height: 42px; justify-content: center; }
        .feedback-top-button { min-width: 42px; padding: 4px; }
        .feedback-top-button img { width: 30px; height: 30px; }
        .feedback-top-button span { display: none; }
        [data-auth-login], [data-auth-logout] { padding: 0 10px; }
        .toolbar { width: 100%; gap: 8px; }
        .toolbar > button,
        .toolbar > a,
        .toolbar > label { flex: 1 1 150px; min-width: 0; }
        .card, .preview, .alliance-stats-card { padding: 16px; }
        .card-header { align-items: flex-start; flex-direction: column; gap: 10px; }
        .buff-week-heading { display: none; }
        .buff-day-row { grid-template-columns: 1fr; gap: 12px; padding: 18px; }
        .buff-current { grid-template-columns: 64px 1fr; }
        .buff-icon { width: 60px; height: 60px; }
        .buff-updated { text-align: left; }
        .training-intro { grid-template-columns: 62px 1fr; padding: 15px; }
        .training-intro img { width: 58px; height: 58px; }
        .training-resource-settings, .training-resource-summary { grid-template-columns: 1fr; }
        .training-resource-summary .training-resource-list { min-width: 0; }
        .training-mix-tier-tabs { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .training-mix-row { grid-template-columns: 90px minmax(120px, 1fr) 90px 48px; }
        .training-time-grid, .training-troop-inputs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .training-troop-inputs label:last-child { grid-column: 1 / -1; }
        .training-summary-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .grid, .stats, .form-grid, .quick-grid, .overview-kpis, .time-row, .command-board, .power-trend-row, .power-history-list, .interactive-chart, .attendance-summary-grid, .optional-link-button-fields { grid-template-columns: 1fr; }
        .upload-comparison-row { grid-template-columns: 1fr 1fr; }
        .trend-pill { justify-self: stretch; }
        .calendar-weekdays { gap: 3px; margin-bottom: 5px; font-size: 10px; }
        .calendar-grid { grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 3px; }
        .calendar-day { min-height: 68px; padding: 5px 3px; border-radius: 8px; gap: 3px; text-align: center; }
        .event-calendar .calendar-day,
        .attendance-calendar-card .event-calendar .calendar-day { min-height: 68px; }
        .calendar-day-top { justify-content: center; }
        .calendar-day strong { font-size: 15px; }
        .calendar-day em { display: none; }
        .calendar-day-list { display: flex; justify-content: center; align-items: center; gap: 3px; overflow: hidden; }
        .calendar-entry { width: 6px; height: 6px; min-width: 6px; border: 0; border-radius: 50%; padding: 0; background: #b3262f; color: transparent; font-size: 0; }
        .calendar-entry small, .calendar-empty { display: none; }
        .calendar-entry.buff { display: block; width: 26px; height: 26px; min-width: 26px; border-radius: 7px; background: rgba(255, 250, 226, 0.72); }
        .calendar-entry.buff img { display: block; width: 24px; height: 24px; }
        .calendar-more { font-size: 9px; line-height: 1; }
        .metric-picker { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
        .metric-button { min-height: 36px; padding: 5px 6px; font-size: 9px; }
        table { min-width: 680px; }
        th, td { padding: 11px 12px; }
        .member-modal { padding: 10px; align-items: end; }
        .member-modal-panel { width: 100%; max-height: calc(100vh - 24px); border-radius: 14px 14px 0 0; padding: 18px; }
        .member-profile-hero { grid-template-columns: 1fr; text-align: center; padding-right: 0; justify-items: center; }
        .profile-stats { grid-template-columns: 1fr; }
        .profile-season-card { margin-inline: -8px; padding: 14px 8px; border-radius: 10px; }
        .profile-season-topbar { grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 8px; padding: 0 2px; }
        .profile-season-head { grid-column: 1; text-align: left; margin-bottom: 0; }
        .profile-season-head h4 { font-size: 19px; }
        .profile-season-head p { font-size: 10px; }
        .profile-graph-toggle { grid-column: 2; grid-template-columns: 28px auto 30px; gap: 5px; min-height: 40px; max-width: 154px; padding: 5px 7px 5px 5px; }
        .profile-graph-toggle img { width: 28px; height: 28px; }
        .profile-graph-toggle-copy strong { font-size: 9px; }
        .profile-graph-toggle-copy small { font-size: 8px; }
        .profile-radar { width: calc(100% + 4px); max-width: 520px; margin-inline: -2px; }
        .radar-label { font-size: 12px; }
        .radar-value { font-size: 9px; }
        .profile-trend-summary { padding: 8px 8px 0; }
        .profile-trend-summary strong { font-size: 22px; }
        .profile-trend-svg { width: calc(100% + 2px); margin-inline: -1px; }
        .profile-radar-snapshots-label { text-align: left; padding-left: 2px; }
        .profile-radar-dates { display: none; }
        .profile-radar-date-select-shell { display: grid; gap: 5px; }
        .profile-radar-date-select-shell span { color: #76532f; font-size: 10px; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; }
        .profile-radar-date-select:focus { border-color: #a85f0d; outline: 3px solid rgba(255, 211, 67, 0.52); }
        .modal-close { top: 10px; right: 10px; }
        .wiki-builder-toolbar .muted { flex-basis: 100%; }
        .wiki-search-row { grid-template-columns: 1fr; }
        .wiki-search-count { text-align: left; }
        .wiki-canvas-wrap { width: 100%; max-height: none; padding: 12px; margin: 0 -4px; }
        .wiki-page-canvas { width: 760px; max-width: none; }
        .wiki-reader { width: 100%; min-width: 0; overflow: hidden; }
        .wiki-reader-stage { width: 100%; overflow-x: auto; overflow-y: hidden; }
        .wiki-inspector { top: 236px; padding: 10px; max-height: calc(100vh - 250px); overflow: auto; }
        .wiki-style-controls { grid-template-columns: 1fr; }
        .wiki-inline-format { grid-template-columns: repeat(3, 38px) minmax(100px, 1fr); }
        .wiki-inline-format label:last-child { grid-column: 1 / -1; }
        .wiki-misc-panel { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .avatar-cropper { align-items: end; padding: 10px; }
        .avatar-cropper-panel { width: 100%; border-radius: 14px 14px 0 0; padding: 18px; }
        .toast-stack { right: 12px; bottom: 78px; width: calc(100vw - 24px); }
        .kofi-tip { right: 14px; bottom: 14px; padding: 9px 13px 9px 9px; }
      }
      @media (max-width: 520px) {
        .shell > aside { padding: 16px 12px; }
        .topbar { top: 0; }
        .lord-research-head { gap: 10px; padding: 13px 12px; }
        .lord-research-head h3 { font-size: 19px; }
        .lord-research-head p { font-size: 11px; line-height: 1.35; }
        .lord-research-reset { min-width: 62px; padding: 8px; }
        .lord-research-settings { grid-template-columns: 1fr; }
        .lord-research-settings-heading { grid-column: auto; }
        .lord-research-tabs { min-height: 50px; }
        .lord-research-tab { min-width: 50%; padding-inline: 8px; }
        .lord-research-summary { padding: 0; }
        .lord-research-summary-title, .lord-research-summary-speed, .lord-research-summary-resources { padding: 7px 9px; }
        .lord-research-summary strong { font-size: 10px; }
        .lord-research-tree-scroll { min-height: 470px; max-height: 65vh; }
        .profile-top-button, .auth-button { min-height: 42px; }
        .stats, .quick-grid { gap: 10px; }
        .stat strong { font-size: 23px; }
        .overview-panel { min-height: 220px; padding: 17px; }
        .calendar-grid { grid-template-columns: repeat(7, minmax(0, 1fr)); }
        .calendar-day,
        .event-calendar .calendar-day,
        .attendance-calendar-card .event-calendar .calendar-day { min-height: 58px; }
        .metric-picker { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .member-cell { min-width: 190px; }
        table { min-width: 620px; }
        .power-sparkline { height: 86px; }
        .interactive-chart .power-sparkline { height: 180px; }
        .wiki-page-canvas { width: 760px; }
        .wiki-reader-toolbar { justify-content: center; }
        .wiki-misc-panel { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .training-mode-tabs { gap: 5px; padding: 5px; }
        .training-mode-button { min-height: 42px; padding: 7px 5px; font-size: 11px; }
        .training-input-grid { grid-template-columns: 1fr; }
        .training-time-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .training-calculator-card { padding: 15px; }
        .training-summary strong { font-size: 17px; }
        .training-resource-list { grid-template-columns: repeat(2, minmax(90px, 1fr)); min-width: 205px; }
        .training-table-resources { min-width: 760px; }
        .training-mode-tabs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .training-mix-tier-tabs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .training-mix-row { grid-template-columns: minmax(0, 1fr) 78px 48px; }
        .training-mix-row > strong { grid-column: 1 / -1; }
        .training-plan-actions { align-items: stretch; flex-direction: column; }
        .training-plan-actions button { width: 100%; }
        .lord-grid, .lord-speedups { grid-template-columns: 1fr 1fr; gap: 8px; }
        .lord-summary-card { padding: 12px; }
        .lord-summary-card strong { font-size: 19px; }
        .lord-tool-card { min-height: 96px; grid-template-columns: 44px minmax(0, 1fr); padding: 12px; }
        .lord-tool-card img { width: 44px; height: 44px; }
        .lord-catalog-card, .lord-calc-card, .lord-pair-card { padding: 12px; }
        .lord-calc-results { grid-template-columns: 1fr 1fr; }
        .lord-pet-preview { grid-template-columns: 72px minmax(0, 1fr); }
        .lord-pet-preview img { width: 72px; height: 72px; }
        .kofi-tip { gap: 0; padding: 8px; font-size: 0; }
        .kofi-tip img { width: 32px; height: 32px; }
      }
    </style>
  </head>
  <body>
    <div class="shell">
      <aside class="sidebar">
        <div class="brand">
          <img class="brand-logo" src="/assets/kella-logo.png?v=1" alt="Kella logo" />
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
      <button class="mobile-nav-backdrop" type="button" data-mobile-nav-close aria-label="Close navigation"></button>
      <main>
        <header class="topbar">
          <div class="guild">
            <button class="mobile-nav-toggle" type="button" data-mobile-nav-toggle aria-label="Open navigation" aria-expanded="false">☰</button>
            <img class="avatar-img" id="guildAvatar" src="/assets/kella-logo.png?v=1" alt="Kella logo" />
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
            <button class="profile-top-button feedback-top-button" type="button" data-link-button="/complains" title="Complaint or suggestion"><img src="/assets/icons/complaints.png" alt="" /><span><strong>Feedback</strong><em>Complaint or suggestion</em></span></button>
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
    <a class="kofi-tip" href="https://ko-fi.com/exuz19" target="_blank" rel="noreferrer"><img src="/assets/kella-logo.png?v=1" alt="" />Tip Me</a>
    <script src="/assets/thumbnail-editor.js?v=3"></script>
    <script>
      const app = document.getElementById("app");
      const toasts = document.getElementById("toasts");
      const memberModal = document.getElementById("memberModal");
      const memberModalContent = document.querySelector("[data-member-modal-content]");
      const avatarCropper = document.getElementById("avatarCropper");
      const state = { summary: null, buffSchedule: null, reports: [], members: [], dashboardMembers: [], dashboardMembersMetric: "", allMembers: [], alerts: [], events: [], complaints: [], wiki: null, wikiSearch: "", wikiTag: "", uploads: null, settings: null, channels: null, templates: null, currentReport: null, profile: null, openMember: null, auth: null, statsMetric: "power", chartSelections: {}, profileRadarMetrics: {}, profileRadarDates: {}, profileGraphModes: {}, avatarEditor: null, wikiBlocks: [], selectedWikiBlockId: "", wikiDrag: null, wikiInteractionMode: null, wikiStockUploadKind: "misc", wikiCustomImages: null, wikiTextSelection: null, wikiReaderZoom: 1, trainingMode: "points", trainingTroopType: "cavalry", trainingMixedTier: "t5", trainingMixedSteps: [], trainingSummary: "", lordTools: null, lordView: "overview", lordSearch: "", lordResearchTree: "economy", lordResearchSelected: "", lordResearchZoom: 0.6, lordResearchPanX: 0, lordResearchPanY: 0 };
      let lordResearchPan = null;
      let lordResearchPinch = null;
      const lordResearchPointers = new Map();
      let lordResearchBlockClickUntil = 0;
      const WIKI_CUSTOM_IMAGE_KEY = "kellaWikiCustomImages";
      const LORD_TOOLS_KEY = "kellaLordToolsV1";
      const dashboardNavItems = ${JSON.stringify(navItems)};
      const dashboardModules = ${JSON.stringify(modules)};
      const dashboardCommands = [
        { name: "shield", label: "Shield Alert", description: "DM a shield warning to one player." },
        { name: "attack", label: "Attack Alert", description: "Post an emergency alliance attack alert." },
        { name: "roots", label: "Roots Registration", description: "Open 14 UTC and 20 UTC Roots registration." },
        { name: "summit", label: "Summit Registration", description: "Open a Summit attendance panel." },
        { name: "time", label: "UTC Timer", description: "Post a live Discord countdown." },
        { name: "remind", label: "Event Reminder", description: "Queue a reminder for an alliance event." },
        { name: "checkin", label: "Daily Check-In", description: "Post the daily member check-in button." },
        { name: "absence", label: "Absence Notice", description: "Let members submit time-away notices." },
        { name: "apply", label: "Alliance Application", description: "Open the alliance application form." },
        { name: "complain", label: "Complaint", description: "Let members privately contact R4s." },
        { name: "suggest", label: "Suggestion", description: "Let members send private suggestions." },
        { name: "wiki-admin", label: "Wiki", description: "Post the Kella Wiki reader link." },
        { name: "dashboard", label: "Dashboard Link", description: "Give members the Kella website link." }
      ];
      const buffTypes = {
        Gathering: { label: "Gathering Boost", icon: "/assets/buffs/gathering.png", description: "Increase gathering speed and resource collection rate." },
        Research: { label: "Research Speed", icon: "/assets/buffs/research.png", description: "Reduce research time and speed up technology development." },
        Training: { label: "Troop Training", icon: "/assets/buffs/training.png", description: "Reduce training time and speed up troop recruitment." },
        Construction: { label: "Construction Speed", icon: "/assets/buffs/construction.png", description: "Reduce building time for alliance development." },
        Healing: { label: "Healing Speed", icon: "/assets/buffs/healing.png", description: "Recover wounded troops faster and return to battle." }
      };
      const defaultBuffSchedule = [
        { day: "Monday", buff: "Gathering", note: "" },
        { day: "Tuesday", buff: "Research", note: "" },
        { day: "Wednesday", buff: "Gathering", note: "" },
        { day: "Thursday", buff: "Research", note: "" },
        { day: "Friday", buff: "Gathering", note: "" },
        { day: "Saturday", buff: "Training", note: "War time: may be changed" },
        { day: "Sunday", buff: "Research", note: "War time: may be changed" }
      ];
      const trainingTierOrder = ["t3", "t4", "t5", "p34", "p45"];
      const trainingTiers = {
        t3: { label: "T3", seconds: 60, power: 20 },
        t4: { label: "T4", seconds: 80, power: 40 },
        t5: { label: "T5", seconds: 120, power: 100 },
        p34: { label: "T3 to T4", seconds: 20, power: 20 },
        p45: { label: "T4 to T5", seconds: 40, power: 60 }
      };
      const trainingEventScores = {
        mge1: { label: "MGE Day 1", t3: 20, t4: 40, t5: 100, p34: 20, p45: 60 },
        mge5: { label: "MGE Day 5", t3: 16, t4: 32, t5: 80, p34: 16, p45: 48 },
        greatHeight: { label: "Great Height", t3: 3, t4: 4, t5: 10, p34: 1, p45: 6 },
        preKvk: { label: "Pre-KVK", t3: 8, t4: 16, t5: 40, p34: 8, p45: 24 }
      };
      const trainingTroopTypes = {
        infantry: "Infantry",
        mage: "Mage",
        archer: "Archer",
        cavalry: "Cavalry",
        flying: "Flying"
      };
      const trainingResourceOrder = ["ore", "mana", "wood", "gold"];
      const trainingResourceLabels = { ore: "Ore", mana: "Mana", wood: "Wood", gold: "Gold" };
      const resourceIconPaths = {
        ore: "/assets/resources/stone.png",
        mana: "/assets/resources/mana.png",
        wood: "/assets/resources/wood.png",
        gold: "/assets/resources/gold.png",
        gem: "/assets/resources/gem.png"
      };
      const trainingResourceCosts = {
        t3: {
          infantry: { ore: 0, mana: 30, wood: 150, gold: 150 },
          mage: { ore: 112, mana: 30, wood: 150, gold: 0 },
          archer: { ore: 112, mana: 30, wood: 0, gold: 150 },
          cavalry: { ore: 90, mana: 30, wood: 90, gold: 90 },
          flying: { ore: 90, mana: 30, wood: 90, gold: 90 }
        },
        t4: {
          infantry: { ore: 0, mana: 100, wood: 300, gold: 300 },
          mage: { ore: 225, mana: 100, wood: 300, gold: 0 },
          archer: { ore: 225, mana: 100, wood: 0, gold: 300 },
          cavalry: { ore: 180, mana: 100, wood: 180, gold: 180 },
          flying: { ore: 180, mana: 100, wood: 180, gold: 180 }
        },
        t5: {
          infantry: { ore: 0, mana: 400, wood: 800, gold: 800 },
          mage: { ore: 600, mana: 400, wood: 800, gold: 0 },
          archer: { ore: 600, mana: 400, wood: 0, gold: 800 },
          cavalry: { ore: 480, mana: 400, wood: 480, gold: 480 },
          flying: { ore: 480, mana: 400, wood: 480, gold: 480 }
        },
        p34: {
          infantry: { ore: 0, mana: 70, wood: 150, gold: 150 },
          mage: { ore: 113, mana: 70, wood: 150, gold: 0 },
          archer: { ore: 112, mana: 70, wood: 0, gold: 150 },
          cavalry: { ore: 90, mana: 70, wood: 90, gold: 90 },
          flying: { ore: 90, mana: 70, wood: 90, gold: 90 }
        },
        p45: {
          infantry: { ore: 0, mana: 300, wood: 500, gold: 500 },
          mage: { ore: 375, mana: 300, wood: 500, gold: 0 },
          archer: { ore: 375, mana: 300, wood: 0, gold: 500 },
          cavalry: { ore: 300, mana: 300, wood: 300, gold: 300 },
          flying: { ore: 300, mana: 300, wood: 300, gold: 300 }
        }
      };
      const wikiMiscImages = ${JSON.stringify(wikiMiscImages)};
      const wikiHeroImages = ${JSON.stringify(wikiHeroImages)};
      const wikiMarkerImages = ${JSON.stringify(wikiMarkerImages)};
      const wikiArtifactImages = ${JSON.stringify(wikiArtifactImages)};
      const wikiPetImages = ${JSON.stringify(wikiPetImages)};
      const thumbnailBackgrounds = ${JSON.stringify(thumbnailBackgrounds)};
      const lordUnitTypes = ["Infantry", "Mage", "Marksman", "Cavalry", "Flying"];
      const lordTiers = ["t1", "t2", "t3", "t4", "t5"];
      const lordDecorationNames = ["Forest Guardian", "Celestial Tower", "Dragon Banner", "Spring Fountain", "Golden Tree", "Victory Monument", "Moonlit Garden", "Royal Library", "Ancient Obelisk", "Alliance Beacon", "War Drums", "Hall of Heroes"];
      const lordBuildingNames = ["City Hall", "Alliance Center", "Hall of Order", "Hospital", "Storehouse", "Scout Camp", "Barracks", "Stable", "Archery Range", "Mage Academy", "Engineering Workshop", "Research Center"];
      const lordResearchTrees = ${JSON.stringify(lordResearchTreeData)};
      let lordResearchNodes = lordResearchTrees.economy;
      /* Legacy layout retained here only as a source reference.
      const legacyLordResearchNodes = [
        { id: "101", name: "Ore Prospecting", max: 1, col: 0, row: 1, requires: [] },
        { id: "102", name: "Gold Processing I", max: 5, col: 1, row: 1, requires: ["101"] },
        { id: "103", name: "Forestry I", max: 5, col: 1, row: 2, requires: ["101"] },
        { id: "104", name: "Gold Mining I", max: 5, col: 2, row: 0, requires: ["102"] },
        { id: "105", name: "Architecture I", max: 5, col: 2, row: 1, requires: ["102", "103"] },
        { id: "106", name: "Logging Techniques I", max: 5, col: 2, row: 2, requires: ["103"] },
        { id: "107", name: "Weak Points I", max: 5, col: 3, row: 0, requires: ["104"] },
        { id: "108", name: "Container Upgrade I", max: 5, col: 3, row: 1, requires: ["105"] },
        { id: "109", name: "Military Leadership I", max: 5, col: 3, row: 2, requires: ["106"] },
        { id: "145", name: "Gem Prospecting", max: 1, col: 4, row: 0, requires: ["107"] },
        { id: "110", name: "Mana Prospecting", max: 1, col: 4, row: 1, requires: ["108", "109"] },
        { id: "111", name: "Stamina I", max: 5, col: 5, row: 0, requires: ["145"] },
        { id: "112", name: "Breath Control I", max: 5, col: 5, row: 1, requires: ["110"] },
        { id: "113", name: "Ironworking I", max: 5, col: 5, row: 2, requires: ["110"] },
        { id: "114", name: "Scholarship I", max: 5, col: 6, row: 1, requires: ["111", "112"] },
        { id: "115", name: "Advanced Mana I", max: 5, col: 6, row: 2, requires: ["113"] },
        { id: "116", name: "Rock Breaking I", max: 5, col: 7, row: 0, requires: ["114"] },
        { id: "117", name: "Mana Harvesting I", max: 5, col: 7, row: 2, requires: ["114", "115"] },
        { id: "118", name: "Gold Processing II", max: 10, col: 8, row: 0, requires: ["116"] },
        { id: "119", name: "Container Upgrade II", max: 10, col: 8, row: 1, requires: ["117"] },
        { id: "120", name: "Forestry II", max: 10, col: 8, row: 2, requires: ["117"] },
        { id: "121", name: "Ironworking II", max: 10, col: 9, row: 0, requires: ["118"] },
        { id: "122", name: "Advanced Mana II", max: 10, col: 9, row: 2, requires: ["120"] },
        { id: "123", name: "Gold Mining II", max: 10, col: 10, row: 0, requires: ["121"] },
        { id: "124", name: "Architecture II", max: 10, col: 10, row: 1, requires: ["119"] },
        { id: "125", name: "Logging Techniques II", max: 10, col: 10, row: 2, requires: ["122"] },
        { id: "126", name: "Rock Breaking II", max: 10, col: 11, row: 0, requires: ["123"] },
        { id: "127", name: "Supply Chains I", max: 10, col: 11, row: 1, requires: ["124"] },
        { id: "128", name: "Mana Harvesting II", max: 10, col: 11, row: 2, requires: ["125"] },
        { id: "129", name: "Weak Points II", max: 10, col: 12, row: 0, requires: ["126"] },
        { id: "130", name: "Container Upgrade III", max: 10, col: 12, row: 1, requires: ["127"] },
        { id: "131", name: "Stamina II", max: 10, col: 12, row: 2, requires: ["128"] },
        { id: "132", name: "Military Leadership II", max: 10, col: 13, row: 0, requires: ["129"] },
        { id: "133", name: "Breath Control II", max: 10, col: 13, row: 1, requires: ["130"] },
        { id: "134", name: "Scholarship II", max: 10, col: 13, row: 2, requires: ["131"] },
        { id: "135", name: "Gold Processing III", max: 10, col: 14, row: 0, requires: ["132"] },
        { id: "136", name: "Forestry III", max: 10, col: 14, row: 1, requires: ["133"] },
        { id: "137", name: "Ironworking III", max: 10, col: 14, row: 2, requires: ["134"] },
        { id: "138", name: "Advanced Mana III", max: 10, col: 15, row: 0, requires: ["135"] },
        { id: "139", name: "Gold Mining III", max: 10, col: 15, row: 1, requires: ["136"] },
        { id: "140", name: "Logging Techniques III", max: 10, col: 15, row: 2, requires: ["137"] },
        { id: "141", name: "Rock Breaking III", max: 10, col: 16, row: 0, requires: ["138"] },
        { id: "142", name: "Mana Harvesting III", max: 10, col: 16, row: 1, requires: ["139"] },
        { id: "143", name: "Land of Plenty", max: 10, col: 16, row: 2, requires: ["140"] },
        { id: "144", name: "Supply Chains II", max: 10, col: 17, row: 1, requires: ["141", "142", "143"] }
      ]; */
      const lordResearchCosts = {"101":{"seconds":35,"gold":100,"wood":100,"ore":0,"mana":0,"power":5},"102":{"seconds":7871,"gold":155000,"wood":155000,"ore":112500,"mana":0,"power":1491},"103":{"seconds":7871,"gold":155000,"wood":155000,"ore":112500,"mana":0,"power":1491},"104":{"seconds":8294,"gold":155000,"wood":155000,"ore":112500,"mana":0,"power":1519},"105":{"seconds":15812,"gold":310000,"wood":310000,"ore":232500,"mana":0,"power":3011},"106":{"seconds":8294,"gold":155000,"wood":155000,"ore":112500,"mana":0,"power":1519},"107":{"seconds":19765,"gold":310000,"wood":310000,"ore":232500,"mana":0,"power":3279},"108":{"seconds":16624,"gold":310000,"wood":310000,"ore":232500,"mana":0,"power":3066},"109":{"seconds":19765,"gold":310000,"wood":310000,"ore":232500,"mana":0,"power":3279},"145":{"seconds":2118,"gold":20000,"wood":20000,"ore":15000,"mana":0,"power":269},"110":{"seconds":2118,"gold":20000,"wood":20000,"ore":15000,"mana":0,"power":269},"111":{"seconds":42000,"gold":310000,"wood":310000,"ore":232500,"mana":232500,"power":5956},"112":{"seconds":42000,"gold":310000,"wood":310000,"ore":232500,"mana":232500,"power":5956},"113":{"seconds":42000,"gold":310000,"wood":310000,"ore":232500,"mana":232500,"power":5956},"114":{"seconds":42000,"gold":465000,"wood":465000,"ore":348750,"mana":348750,"power":7506},"115":{"seconds":42000,"gold":310000,"wood":310000,"ore":232500,"mana":232500,"power":5956},"116":{"seconds":75353,"gold":465000,"wood":465000,"ore":348750,"mana":348750,"power":9774},"117":{"seconds":75353,"gold":465000,"wood":465000,"ore":348750,"mana":348750,"power":9774},"118":{"seconds":114882,"gold":1789000,"wood":1789000,"ore":1341750,"mana":1341750,"power":25702},"119":{"seconds":114882,"gold":2288000,"wood":2288000,"ore":1716000,"mana":1716000,"power":30692},"120":{"seconds":114882,"gold":1789000,"wood":1789000,"ore":1341750,"mana":1341750,"power":25702},"121":{"seconds":114882,"gold":1789000,"wood":1789000,"ore":1341750,"mana":1341750,"power":25702},"122":{"seconds":114882,"gold":1789000,"wood":1789000,"ore":1341750,"mana":1341750,"power":25702},"123":{"seconds":960000,"gold":5680500,"wood":5680500,"ore":4282000,"mana":4282000,"power":122258},"124":{"seconds":1440000,"gold":11361000,"wood":11361000,"ore":8564000,"mana":8564000,"power":211876},"125":{"seconds":960000,"gold":5680500,"wood":5680500,"ore":4282000,"mana":4282000,"power":122258},"126":{"seconds":960000,"gold":5680500,"wood":5680500,"ore":4282000,"mana":4282000,"power":122258},"127":{"seconds":1440000,"gold":11361000,"wood":11361000,"ore":8564000,"mana":8564000,"power":211876},"128":{"seconds":960000,"gold":5680500,"wood":5680500,"ore":4282000,"mana":4282000,"power":122258},"129":{"seconds":1440000,"gold":11361000,"wood":11361000,"ore":8564000,"mana":8564000,"power":211876},"130":{"seconds":1920000,"gold":17044000,"wood":17044000,"ore":12783000,"mana":12783000,"power":301000},"131":{"seconds":1440000,"gold":11361000,"wood":11361000,"ore":8564000,"mana":8564000,"power":211876},"132":{"seconds":1440000,"gold":11361000,"wood":11361000,"ore":8564000,"mana":8564000,"power":211876},"133":{"seconds":1440000,"gold":11361000,"wood":11361000,"ore":8564000,"mana":8564000,"power":211876},"134":{"seconds":1920000,"gold":22685000,"wood":22685000,"ore":17041000,"mana":17041000,"power":357628},"135":{"seconds":1440000,"gold":17051000,"wood":17051000,"ore":12788250,"mana":12788250,"power":268430},"136":{"seconds":1440000,"gold":17051000,"wood":17051000,"ore":12788250,"mana":12788250,"power":268430},"137":{"seconds":1440000,"gold":17051000,"wood":17051000,"ore":12788250,"mana":12788250,"power":268430},"138":{"seconds":1440000,"gold":17051000,"wood":17051000,"ore":12788250,"mana":12788250,"power":268430},"139":{"seconds":1440000,"gold":22685000,"wood":22685000,"ore":17041000,"mana":17041000,"power":324988},"140":{"seconds":1440000,"gold":22685000,"wood":22685000,"ore":17041000,"mana":17041000,"power":324988},"141":{"seconds":1440000,"gold":22685000,"wood":22685000,"ore":17041000,"mana":17041000,"power":324988},"142":{"seconds":1440000,"gold":22685000,"wood":22685000,"ore":17041000,"mana":17041000,"power":324988},"143":{"seconds":1920000,"gold":45385000,"wood":45385000,"ore":34015000,"mana":34015000,"power":584220},"144":{"seconds":1920000,"gold":45385000,"wood":45385000,"ore":34015000,"mana":34015000,"power":584220}};
      const lordResearchCostsByTree = ${JSON.stringify(lordResearchLevelCosts)};
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
        return new Intl.DateTimeFormat("en", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC" }).format(new Date(value));
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

      function isDashboardWikiEditor() {
        return Boolean(state.auth?.isDashboardWikiEditor);
      }

      function hasAdminAccess() {
        return isDashboardAdmin() || Boolean(adminToken());
      }

      function hasWikiEditAccess() {
        return hasAdminAccess() || isDashboardWikiEditor();
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
        return '<section class="hero"><div><h2>' + title + '</h2>' + (description ? '<p>' + description + '</p>' : '') + '</div><div class="toolbar">' + actions + '</div></section>';
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
        const photoUrl = member?.discordAvatarUrl || member?.profilePhotoUrl;
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
        // Compact dashboard rows intentionally omit most history. Add them first so
        // full member/profile responses replace them when the same player exists.
        (state.dashboardMembers || []).concat(state.members || [], state.allMembers || [], state.profile ? [state.profile] : []).forEach(function(member) {
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
        const pool = ((state.members && state.members.length) ? state.members : state.dashboardMembers) || [];
        const strongestPower = Math.max.apply(null, pool.map(function(item) { return Number(item.power || 0); }).concat([Number(member?.power || 0), 1]));
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
        return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", timeZone: "UTC" }).format(value);
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
        const selectedMetric = currentStatMetric();
        return '<details class="metric-selector"><summary><span class="metric-selector-label">Ranking metric</span><span class="metric-selector-value">' + escapeHtml(selectedMetric.label) + '</span></summary><div class="metric-picker" role="group" aria-label="Choose stat graph">' + statMetricOptions.map(function(metric) {
          return '<button class="metric-button ' + (metric.key === currentStatMetric().key ? "active" : "") + '" type="button" data-action="set-stats-metric" data-metric="' + escapeHtml(metric.key) + '">' + escapeHtml(metric.label) + '</button>';
        }).join("") + '</div></details>';
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

      function memberMetricValue(member, metricKey, dateKey) {
        if (!dateKey) {
          if (metricKey === "power") return currentPowerValue(member);
          return Number(latestStatPoint(member, metricKey).value || 0);
        }
        const history = normalizeStatHistory(member, metricKey).filter(function(point) {
          return point.date.toISOString().slice(0, 10) <= dateKey;
        });
        if (history.length) return Number(history[history.length - 1].value || 0);
        return 0;
      }

      function profileRadarDateOptions(member) {
        const days = new Set();
        (Array.isArray(member?.statHistory) ? member.statHistory : []).forEach(function(point) {
          const date = point?.date ? new Date(point.date) : null;
          if (date && Number.isFinite(date.getTime())) days.add(date.toISOString().slice(0, 10));
        });
        (Array.isArray(member?.powerHistory) ? member.powerHistory : []).forEach(function(point) {
          const date = point?.date ? new Date(point.date) : null;
          if (date && Number.isFinite(date.getTime())) days.add(date.toISOString().slice(0, 10));
        });
        return Array.from(days).sort();
      }

      function profileRadarMetrics(member) {
        const id = String(member?.id || "profile");
        const defaults = ["merits", "unitsKilled", "resourcesGathered", "serverRank", "unitsHealed", "buildingPower"];
        const saved = state.profileRadarMetrics[id];
        return Array.isArray(saved) && saved.length >= 3 ? saved : defaults;
      }

      function profileGraphMode(member) {
        const mode = state.profileGraphModes[String(member?.id || "profile")];
        return mode === "trend" ? "trend" : "radar";
      }

      function profilePowerTrend(member, selectedDate) {
        const history = normalizeStatHistory(member, "power");
        if (!history.length) {
          return '<div class="profile-trend-empty">Power history will appear after two or more roster uploads.</div>';
        }
        const width = 560;
        const height = 300;
        const left = 58;
        const right = 24;
        const top = 30;
        const bottom = 42;
        const chartWidth = width - left - right;
        const chartHeight = height - top - bottom;
        const values = history.map(function(point) { return Number(point.value || 0); });
        const rawMin = Math.min.apply(null, values);
        const rawMax = Math.max.apply(null, values);
        const padding = Math.max(1, (rawMax - rawMin) * 0.14, rawMax * 0.025);
        const minValue = Math.max(0, rawMin - padding);
        const maxValue = rawMax + padding;
        const range = Math.max(1, maxValue - minValue);
        const xFor = function(index) { return history.length === 1 ? left + chartWidth / 2 : left + (chartWidth * index) / (history.length - 1); };
        const yFor = function(value) { return top + chartHeight - ((value - minValue) / range) * chartHeight; };
        let selectedIndex = history.findIndex(function(point) { return point.date.toISOString().slice(0, 10) === selectedDate; });
        if (selectedIndex < 0 && selectedDate) {
          history.forEach(function(point, index) {
            if (point.date.toISOString().slice(0, 10) <= selectedDate) selectedIndex = index;
          });
        }
        if (selectedIndex < 0) selectedIndex = history.length - 1;
        const points = history.map(function(point, index) { return { x: xFor(index), y: yFor(point.value), point: point, index: index }; });
        const linePath = points.map(function(point, index) { return (index ? "L" : "M") + point.x.toFixed(1) + " " + point.y.toFixed(1); }).join(" ");
        const areaPath = "M" + points[0].x.toFixed(1) + " " + (top + chartHeight).toFixed(1) + " " + points.map(function(point) { return "L" + point.x.toFixed(1) + " " + point.y.toFixed(1); }).join(" ") + " L" + points[points.length - 1].x.toFixed(1) + " " + (top + chartHeight).toFixed(1) + " Z";
        const grid = [0, 0.25, 0.5, 0.75, 1].map(function(scale) {
          const y = top + chartHeight * scale;
          const value = maxValue - range * scale;
          return '<line class="profile-trend-grid" x1="' + left + '" y1="' + y.toFixed(1) + '" x2="' + (width - right) + '" y2="' + y.toFixed(1) + '"></line>' +
            '<text class="profile-trend-axis-label" x="' + (left - 8) + '" y="' + (y + 3).toFixed(1) + '" text-anchor="end">' + escapeHtml(formatCompactNumber(value)) + '</text>';
        }).join("");
        const labelIndexes = Array.from(new Set([0, selectedIndex, history.length - 1]));
        const dateLabels = labelIndexes.map(function(index) {
          const point = points[index];
          const anchor = index === 0 ? "start" : index === history.length - 1 ? "end" : "middle";
          return '<text class="profile-trend-axis-label" x="' + point.x.toFixed(1) + '" y="' + (height - 12) + '" text-anchor="' + anchor + '">' + escapeHtml(compactDate(point.point.date)) + '</text>';
        }).join("");
        const memberId = String(member?.id || "profile");
        const dots = points.map(function(point) {
          const date = point.point.date.toISOString().slice(0, 10);
          return '<circle class="profile-trend-dot ' + (point.index === selectedIndex ? "active" : "") + '" cx="' + point.x.toFixed(1) + '" cy="' + point.y.toFixed(1) + '" r="' + (point.index === selectedIndex ? "6" : "4") + '" data-action="set-profile-radar-date" data-member-id="' + escapeHtml(memberId) + '" data-radar-date="' + escapeHtml(date) + '"><title>' + escapeHtml(formatDate(point.point.date) + ": " + formatCompactNumber(point.point.value)) + '</title></circle>';
        }).join("");
        const selectedPoint = history[selectedIndex];
        const previousPoint = selectedIndex > 0 ? history[selectedIndex - 1] : null;
        const change = previousPoint ? Number(selectedPoint.value || 0) - Number(previousPoint.value || 0) : 0;
        const changeClass = change > 0 ? "positive" : change < 0 ? "negative" : "";
        const changeLabel = previousPoint ? (change > 0 ? "+" : change < 0 ? "-" : "") + formatCompactNumber(Math.abs(change)) : "First upload";
        return '<div class="profile-trend-chart"><div class="profile-trend-summary"><span><small>Power at selected snapshot</small><strong>' + escapeHtml(formatCompactNumber(selectedPoint.value)) + '</strong></span><span class="profile-trend-change ' + changeClass + '">' + escapeHtml(changeLabel) + '</span></div>' +
          '<svg class="profile-trend-svg" viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="Player power trend across roster uploads"><defs><linearGradient id="profileTrendFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f1b23d" stop-opacity="0.48"></stop><stop offset="100%" stop-color="#f1b23d" stop-opacity="0.04"></stop></linearGradient></defs>' + grid + '<path class="profile-trend-area" d="' + areaPath + '"></path><path class="profile-trend-line" d="' + linePath + '"></path>' + dots + dateLabels + '</svg></div>';
      }

      function memberSeasonRadar(member) {
        const metricKeys = profileRadarMetrics(member);
        const axes = metricKeys.map(function(key) {
          const option = statMetricOptions.find(function(metric) { return metric.key === key; });
          return option || { key: key, label: key };
        });
        const memberId = String(member?.id || "profile");
        const availableDates = profileRadarDateOptions(member);
        const selectedDate = state.profileRadarDates[memberId] || availableDates[availableDates.length - 1] || "";
        const graphMode = profileGraphMode(member);
        const roster = allRosterMembers().filter(isAllowedStatsAlliance);
        const centerX = 280;
        const centerY = 174;
        const radius = axes.length > 7 ? 104 : 114;
        const labelRadius = axes.length > 7 ? 136 : 146;
        const angleFor = function(index) { return -Math.PI / 2 + (Math.PI * 2 * index) / axes.length; };
        const pointAt = function(distance, index) {
          const angle = angleFor(index);
          return { x: centerX + Math.cos(angle) * distance, y: centerY + Math.sin(angle) * distance };
        };
        const maxima = axes.map(function(axis) {
          return Math.max(1, ...roster.map(function(item) { return memberMetricValue(item, axis.key, selectedDate); }));
        });
        const values = axes.map(function(axis) { return memberMetricValue(member, axis.key, selectedDate); });
        const scores = values.map(function(value, index) {
          if (axes[index].key === "serverRank") return value > 0 ? Math.max(0, 1 - ((value - 1) / Math.max(1, maxima[index] - 1))) : 0;
          return Math.max(0, Math.min(1, value / maxima[index]));
        });
        const rings = [0.25, 0.5, 0.75, 1].map(function(scale) {
          return '<polygon class="radar-ring" points="' + axes.map(function(_axis, index) {
            const point = pointAt(radius * scale, index);
            return point.x.toFixed(1) + ',' + point.y.toFixed(1);
          }).join(' ') + '"></polygon>';
        }).join('');
        const spokes = axes.map(function(_axis, index) {
          const point = pointAt(radius, index);
          return '<line class="radar-axis" x1="' + centerX + '" y1="' + centerY + '" x2="' + point.x.toFixed(1) + '" y2="' + point.y.toFixed(1) + '"></line>';
        }).join('');
        const areaPoints = axes.map(function(_axis, index) {
          const point = pointAt(radius * scores[index], index);
          return point.x.toFixed(1) + ',' + point.y.toFixed(1);
        });
        const areaKey = 'radar-area-' + (selectedDate || 'latest');
        const dots = areaPoints.map(function(point) {
          const parts = point.split(',');
          return '<circle class="radar-dot" cx="' + parts[0] + '" cy="' + parts[1] + '" r="4"></circle>';
        }).join('');
        const labels = axes.map(function(axis, index) {
          const point = pointAt(labelRadius, index);
          const anchor = Math.abs(point.x - centerX) < 20 ? 'middle' : point.x < centerX ? 'end' : 'start';
          const valueY = point.y + (point.y < centerY ? 13 : -13);
          return '<text class="radar-label" x="' + point.x.toFixed(1) + '" y="' + point.y.toFixed(1) + '" text-anchor="' + anchor + '">' + escapeHtml(axis.label) + '</text>' +
            '<text class="radar-value" x="' + point.x.toFixed(1) + '" y="' + valueY.toFixed(1) + '" text-anchor="' + anchor + '">' + escapeHtml(formatCompactNumber(values[index])) + '</text>';
        }).join('');
        const metricButtons = statMetricOptions.map(function(option) {
          const selected = metricKeys.includes(option.key);
          return '<button class="metric-button ' + (selected ? "active" : "") + '" type="button" data-action="toggle-profile-radar-metric" data-member-id="' + escapeHtml(memberId) + '" data-metric="' + escapeHtml(option.key) + '">' + escapeHtml(option.label) + '</button>';
        }).join("");
        const dateButtons = availableDates.map(function(date) {
          return '<button class="secondary profile-radar-date ' + (date === selectedDate ? "active" : "") + '" type="button" data-action="set-profile-radar-date" data-member-id="' + escapeHtml(memberId) + '" data-radar-date="' + escapeHtml(date) + '" aria-pressed="' + String(date === selectedDate) + '" title="Show stats from ' + escapeHtml(formatDate(new Date(date + "T00:00:00Z"))) + '">' + escapeHtml(compactDate(new Date(date + "T00:00:00Z"))) + '</button>';
        }).join("");
        const dateOptions = availableDates.map(function(date) {
          return '<option value="' + escapeHtml(date) + '" ' + (date === selectedDate ? "selected" : "") + '>' + escapeHtml(formatDate(new Date(date + "T00:00:00Z"))) + '</option>';
        }).join("");
        const graphToggle = '<button class="profile-graph-toggle ' + (graphMode === "trend" ? "active" : "") + '" type="button" data-action="toggle-profile-graph" data-member-id="' + escapeHtml(memberId) + '" aria-pressed="' + String(graphMode === "trend") + '" title="Switch to ' + (graphMode === "trend" ? "radar stats" : "power trend") + '"><img src="/assets/icons/change-graph.png?v=1" alt="" width="30" height="30" loading="lazy" decoding="async"><span class="profile-graph-toggle-copy"><strong>Change graph</strong><small>' + (graphMode === "trend" ? "Power trend" : "Radar stats") + '</small></span><span class="profile-graph-switch" aria-hidden="true"></span></button>';
        const graph = graphMode === "trend"
          ? profilePowerTrend(member, selectedDate)
          : '<svg class="profile-radar" viewBox="0 0 560 348" role="img" aria-label="Current season player statistics radar chart" data-radar-date="' + escapeHtml(selectedDate) + '">' + rings + spokes + '<polygon class="radar-area" key="' + areaKey + '" points="' + areaPoints.join(" ") + '"></polygon>' + dots + labels + "</svg>";
        const radarSelector = graphMode === "radar" ? '<details class="metric-selector"><summary><span class="metric-selector-label">Radar stats</span><span class="metric-selector-value">' + axes.length + ' selected</span></summary><div class="metric-picker">' + metricButtons + '</div></details>' : '';
        return '<section class="profile-season-card"><div class="profile-season-topbar"><div class="profile-season-head"><h4>Current Season</h4><p>' + escapeHtml(selectedDate ? "Roster snapshot " + formatDate(new Date(selectedDate + "T00:00:00Z")) : "Compared with the current alliance roster") + '</p></div>' + graphToggle + '</div>' + graph +
          '<div class="profile-radar-controls">' + radarSelector +
          (dateButtons ? '<div class="profile-radar-snapshots"><span class="profile-radar-snapshots-label">Roster snapshot</span><label class="profile-radar-date-select-shell"><span>Selected date</span><select class="profile-radar-date-select" data-radar-date-select data-member-id="' + escapeHtml(memberId) + '" aria-label="Choose roster snapshot date">' + dateOptions + '</select></label><div class="profile-radar-dates" aria-label="Choose roster snapshot date">' + dateButtons + '</div></div>' : '') + '</div></section>';
      }

      function refreshMemberSeasonRadar(member) {
        if (!member) return;
        const modalIsOpen = Boolean(memberModal?.classList.contains("open"));
        const root = modalIsOpen ? memberModalContent : app;
        const current = root?.querySelector(".profile-season-card");
        if (!current) {
          if (modalIsOpen) openMemberModal(member);
          else if (location.pathname === "/profile") renderProfile();
          return;
        }
        const panel = modalIsOpen ? memberModal?.querySelector(".member-modal-panel") : null;
        const scrollTop = panel?.scrollTop || 0;
        const html = memberSeasonRadar(member);
        const span = document.createElement("span");
        span.innerHTML = html;
        const replacement = span.firstElementChild;
        if (replacement) {
          current.parentNode?.replaceChild(replacement, current);
        }
        requestAnimationFrame(function() {
          if (panel) panel.scrollTop = scrollTop;
        });
      }

      function selectProfileRadarDate(memberId, date) {
        const parsed = date ? new Date(date + "T00:00:00Z") : null;
        if (!parsed || !Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) return;
        const member = (state.openMember && String(state.openMember.id) === String(memberId) ? state.openMember : null) || findMemberById(memberId) || (state.profile && String(state.profile.id) === String(memberId) ? state.profile : null);
        if (!member) return;
        state.profileRadarDates[String(member.id || "profile")] = date;
        refreshMemberSeasonRadar(member);
      }

      function memberPowerChart(member) {
        return memberSeasonRadar(member);
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
        state.openMember = member;
        memberModalContent.dataset.memberId = member.id || "";
        const displayName = memberDisplayName(member);
        const gameName = member.ign || displayName;
        const username = memberUsername(member);
        const power = formatNumber(member.power);
        const adminEditButton = hasAdminAccess()
          ? '<button class="secondary profile-edit-button" type="button" data-action="open-admin-profile-editor">Edit Profile</button>'
          : '';
        const adminEditor = hasAdminAccess()
          ? '<div class="admin-profile-editor" data-admin-profile-editor><div class="admin-profile-editor-backdrop" data-action="close-admin-profile-editor"></div><section class="admin-profile-editor-panel"><div class="admin-profile-editor-head"><div><span class="profile-kicker">Officer Controls</span><h3>Edit ' + escapeHtml(displayName) + '</h3></div><button class="modal-close" type="button" data-action="close-admin-profile-editor" aria-label="Close profile editor">×</button></div><div class="admin-profile-editor-avatar">' + memberAvatarUploadButton(member, "admin") + '</div>' + adminMemberForm(member) + '</section></div>'
          : '';
        memberModalContent.innerHTML =
          '<div class="member-profile-hero">' +
            memberAvatar(member, "profile-avatar") +
            '<div><span class="profile-kicker">Player Stats</span><h3 id="memberModalTitle">' + escapeHtml(displayName) + '</h3><div class="profile-subtitle">' + escapeHtml(username) + ' · IGN: ' + escapeHtml(gameName) + '</div><div class="power-meter" style="--power-width:' + memberPowerPercent(member) + '%"><i></i></div>' + adminEditButton + '</div>' +
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
          adminEditor;
        memberModal.classList.add("open");
        memberModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
      }

      function closeMemberModal() {
        if (!memberModal) return;
        closeAvatarCropper();
        memberModal.classList.remove("open");
        memberModal.classList.remove("wiki-modal");
        memberModal.setAttribute("aria-hidden", "true");
        if (memberModalContent) {
          delete memberModalContent.dataset.memberId;
          delete memberModalContent.dataset.complaintId;
        }
        document.body.classList.remove("modal-open");
      }

      function calendarDetailCard(item) {
        const eventActions = item.eventId
          ? (hasAdminAccess() ? '<p><button class="danger" type="button" data-action="delete-event" data-event-id="' + escapeHtml(item.eventId) + '">Delete Event</button></p>' : '')
          : '';
        return '<article class="calendar-detail-card">' +
          '<span class="badge warn">' + escapeHtml(item.kind || "Detail") + '</span>' +
          (item.icon ? '<img class="calendar-detail-buff-icon" src="' + escapeHtml(item.icon) + '" alt="" />' : '') +
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
            return '<article class="calendar-detail-card"><div class="card-header"><div><span class="badge warn">Event</span><h3>' + escapeHtml(event.title || "Alliance Event") + '</h3><span class="activity-time">' + formatUtcDateTime(event.startsAt) + '</span></div>' + (hasAdminAccess() ? '<div class="toolbar"><button class="danger" type="button" data-action="delete-event" data-event-id="' + escapeHtml(event.id || "") + '">Delete</button></div>' : '') + '</div><p>' + escapeHtml(event.description || "No description added.") + '</p>' + renderAttendanceGroups(event) + '</article>';
          }).join("") +
        '</div>';
      }

      function calendarDayEventForm(key) {
        if (!hasAdminAccess()) return "";
        const channelField = (state.channels || []).length
          ? '<label data-calendar-channel-field hidden>Discord Channel<select data-calendar-event="channelId">' + channelOptions(state.settings?.settings?.attendanceChannel || state.settings?.settings?.announcementChannel || "") + '</select></label>'
          : '<label data-calendar-channel-field hidden>Discord Channel ID<input data-calendar-event="channelId" placeholder="Channel ID" /></label>';
        return '<section class="card calendar-create-card" style="margin-top:16px" data-calendar-event-form>' +
          '<div class="card-header"><div><h3>Admin Event</h3><span class="muted">Save it to this calendar, with optional Discord publishing.</span></div><button class="primary" type="button" data-action="toggle-calendar-event-form" aria-expanded="false">+ Event</button></div>' +
          '<div data-calendar-event-fields hidden>' +
            '<div class="form-grid">' +
              '<label>Event Name<input data-calendar-event="title" maxlength="120" placeholder="Alliance event" /></label>' +
              '<label>Selected Date<input data-calendar-event="date" type="date" value="' + escapeHtml(key) + '" readonly /></label>' +
              '<label>Time UTC<input data-calendar-event="time" type="time" value="14:00" /></label>' +
              '<label>Publish Mode<select data-calendar-event="mode"><option value="calendar">Calendar Only</option><option value="discord">Publish to Discord</option></select></label>' +
              channelField +
            '</div>' +
            '<div class="toolbar" style="margin-top:12px"><button class="primary" type="button" data-action="save-calendar-event" data-calendar-date="' + escapeHtml(key) + '">Save Event</button></div>' +
          '</div>' +
        '</section>';
      }

      function buffScheduleDayName(key) {
        const date = new Date(key + "T00:00:00Z");
        return new Intl.DateTimeFormat("en-US", { timeZone: "UTC", weekday: "long" }).format(date);
      }

      function realmBuffForDate(key) {
        const schedule = state.buffSchedule || {};
        const override = (schedule.datedBuffs || []).find(function(item) { return item.date === key; });
        const day = buffScheduleDayName(key);
        const weekly = (schedule.days || defaultBuffSchedule).find(function(item) { return item.day === day; });
        const saved = override || weekly;
        if (!saved) return null;
        const type = buffTypes[saved.buff] || buffTypes.Gathering;
        return {
          date: key,
          day,
          buff: saved.buff,
          label: type.label,
          icon: type.icon,
          description: type.description,
          timeUtc: override?.timeUtc || "14:00",
          note: saved.note || "",
          isOverride: Boolean(override),
          updatedBy: override?.updatedBy || schedule.updatedBy || ""
        };
      }

      function realmBuffCalendarItem(key) {
        const buff = realmBuffForDate(key);
        if (!buff) return null;
        return {
          kind: "Realm Buff",
          title: buff.label,
          meta: buff.timeUtc + " UTC",
          description: buff.note || buff.description,
          icon: buff.icon,
          buffDate: key,
          isOverride: buff.isOverride
        };
      }

      function buffDiscordToggleHtml(attribute) {
        return '<label class="buff-publish-toggle"><input type="checkbox" ' + attribute + ' /><span class="buff-toggle-track" aria-hidden="true"></span><span>Send to Discord</span></label>';
      }

      function calendarDayBuffForm(key) {
        if (!hasAdminAccess()) return "";
        const current = realmBuffForDate(key) || { buff: "Gathering", timeUtc: "14:00", note: "", isOverride: false };
        const options = Object.keys(buffTypes).map(function(buff) {
          return '<option value="' + escapeHtml(buff) + '"' + (buff === current.buff ? " selected" : "") + '>' + escapeHtml(buffTypes[buff].label) + '</option>';
        }).join("");
        return '<section class="card calendar-create-card" style="margin-top:16px" data-calendar-buff-form>' +
          '<div class="card-header"><div><h3>Realm Buff</h3><span class="muted">Always saves to Kella and the calendar. Discord is optional.</span></div><button class="primary" type="button" data-action="toggle-calendar-buff-form" aria-expanded="false">+ Buff</button></div>' +
          '<div data-calendar-buff-fields hidden>' +
            '<div class="form-grid">' +
              '<label>Buff<select data-calendar-buff="buff">' + options + '</select></label>' +
              '<label>Selected Date<input data-calendar-buff="date" type="date" value="' + escapeHtml(key) + '" readonly /></label>' +
              '<label>Time UTC<input data-calendar-buff="timeUtc" type="time" value="' + escapeHtml(current.timeUtc || "14:00") + '" /></label>' +
              '<label>Note<input data-calendar-buff="note" maxlength="160" value="' + escapeHtml(current.note || "") + '" placeholder="Optional note" /></label>' +
            '</div>' +
            '<div class="toolbar" style="margin-top:12px">' + buffDiscordToggleHtml("data-calendar-buff-send-discord") + '<button class="primary" type="button" data-action="save-calendar-buff" data-calendar-date="' + escapeHtml(key) + '">Save Buff</button>' + (current.isOverride ? '<button class="danger" type="button" data-action="delete-calendar-buff" data-calendar-date="' + escapeHtml(key) + '">Remove Date Override</button>' : "") + '</div>' +
          '</div>' +
        '</section>';
      }

      async function openCalendarDayModal(key, type) {
        if (!memberModal || !memberModalContent) return;
        await loadBuffSchedule().catch(function() {});
        if (hasAdminAccess()) {
          await Promise.all([
            loadChannels().catch(function() { state.channels = []; }),
            loadSettings().catch(function() {})
          ]);
        }
        const date = new Date(key + "T00:00:00Z");
        const title = type === "events" ? "Attendance Calendar" : "Activity Calendar";
        const dayEvents = eventsForDay(state.events || [], key);
        const buffItem = realmBuffCalendarItem(key);
        const items = type === "events"
          ? dayEvents.map(eventDetailItem)
          : calendarActivityItems(state.summary || {}, state.events || [], key);
        if (buffItem) items.unshift(buffItem);
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
            ? ((buffItem ? '<div class="calendar-detail-list">' + calendarDetailCard(buffItem) + '</div>' : "") + (dayEvents.length ? calendarAttendanceSnapshot(dayEvents) : empty("No event recorded for this day yet.")))
            : ((items.length ? '<div class="calendar-detail-list">' + items.map(calendarDetailCard).join("") + '</div>' : empty("No activity recorded for this day yet.")) + calendarAttendanceSnapshot(dayEvents))) +
          calendarDayEventForm(key) + calendarDayBuffForm(key);
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
          '<div class="module-actions"><button type="button" data-action="module-settings" data-module="' + escapeHtml(module.name) + '">Settings</button></div>' +
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

      async function loadDashboardMembers(force = false) {
        const metric = state.statsMetric || "power";
        if (state.dashboardMembers.length && state.dashboardMembersMetric === metric && !force) return state.dashboardMembers;
        const data = await fetchJson("/api/dashboard/members?view=dashboard&limit=500&metric=" + encodeURIComponent(metric));
        state.dashboardMembers = data.members || [];
        state.dashboardMembersMetric = metric;
        return state.dashboardMembers;
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

      async function loadWiki(force = false) {
        if (state.wiki && !force) return state.wiki;
        const canEditWiki = hasWikiEditAccess();
        const data = await fetchJson(canEditWiki ? "/api/dashboard/wiki/admin" : "/api/dashboard/wiki", canEditWiki);
        state.wiki = data.pages || [];
        return state.wiki;
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

      async function loadBuffSchedule(force = false) {
        if (state.buffSchedule && !force) return state.buffSchedule;
        state.buffSchedule = await fetchJson("/api/dashboard/buff-schedule");
        return state.buffSchedule;
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
          target.textContent = "Discord: " + (user.username || user.discordId) + (state.auth?.isDashboardAdmin ? " (Admin)" : state.auth?.isDashboardWikiEditor ? " (Wiki Editor)" : " (Member)");
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
            state.auth = { authenticated: false, isDashboardAdmin: false, isDashboardWikiEditor: false };
          } else {
            state.auth = await parseResponse(response);
            state.auth.authenticated = true;
          }
        } catch {
          state.auth = { authenticated: false, isDashboardAdmin: false, isDashboardWikiEditor: false };
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

      function calendarItemsForDay(events, key) {
        const items = eventsForDay(events, key).map(eventDetailItem);
        const buff = realmBuffCalendarItem(key);
        if (buff) items.unshift(buff);
        return items;
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
              const icon = item.icon ? '<img src="' + escapeHtml(item.icon) + '" alt="" />' : "";
              const title = escapeHtml(item.title || "Buff");
              const meta = escapeHtml(item.meta || "");
              const weekday = date ? new Intl.DateTimeFormat("en", { weekday: "short", timeZone: "UTC" }).format(date) : "";
              const dayNum = date ? String(date.getUTCDate()) : "";
              const isBuff = !!item.icon;
              return '<span class="calendar-entry' + (isBuff ? " buff" : "") + '">' + (isBuff
                ? '<span class="calendar-buff-image" data-buff-title="' + title + '" data-buff-meta="' + meta + '" data-buff-day="' + escapeHtml(dayNum) + '" data-buff-weekday="' + escapeHtml(weekday) + '">' + icon + '<span class="calendar-buff-tooltip">' + dayNum + '<br><img src="' + escapeHtml(item.icon) + '" alt="" /><br>' + weekday + '</span></span>'
                : icon + '<span>' + title + '</span><small>' + meta + '</small>'
              ) + '</span>';
            }).join("")
          : '<span class="calendar-empty">No event</span>';
        const more = items.length > visible.length ? '<span class="calendar-more">+' + (items.length - visible.length) + ' more</span>' : "";
        const buffOnly = items.length > 0 && items.every(function(item) { return !!item.icon; });
        return '<button class="calendar-day' + (items.length ? " has-items event" : "") + (isToday ? " today" : "") + '" type="button" data-calendar-day="' + key + '" data-calendar-type="' + type + '">' +
          (buffOnly
            ? '<span class="calendar-day-top calendar-day-top-buff">' + date.getUTCDate() + '</span>' +
              '<span class="calendar-day-list calendar-day-list-buff">' + entries + '</span>' +
              '<span class="calendar-day-bottom calendar-day-bottom-buff">' + weekday + '</span>'
            : '<span class="calendar-day-top"><strong>' + date.getUTCDate() + '</strong><em>' + weekday + '</em></span>' +
              '<span class="calendar-day-list">' + entries + more + '</span>'
          ) +
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
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return '<div class="calendar-weekdays" aria-hidden="true">' + weekdays.map(function(day) { return '<span>' + day + '</span>'; }).join("") + '</div><div class="calendar-grid event-calendar">' + currentMonthDays().map(function(date) {
          const key = dayKey(date);
          return renderCalendarCell(date, "events", calendarItemsForDay(events, key));
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
          return '<article class="command-card"><code>' + escapeHtml(item.command) + '</code><p>' + escapeHtml(item.text) + '</p></article>';
        }).join("") + '</div>';
      }

      function wikiClass(page) {
        const family = ["serif", "sans", "display", "script", "mono", "cod", "hero-king", "dragon-force", "tribal-dragon"].includes(page?.fontFamily) ? page.fontFamily : "serif";
        const size = ["small", "medium", "large", "xlarge"].includes(page?.fontSize) ? page.fontSize : "medium";
        return "wiki-font-" + family + " wiki-size-" + size;
      }

      function wikiBlockId() {
        return "wiki-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
      }

      const WIKI_PAGE_WIDTH = 760;
      const WIKI_MIN_PAGE_HEIGHT = 980;
      const WIKI_MAX_PAGE_HEIGHT = 50000;
      const WIKI_PAGE_BOTTOM_PADDING = 96;

      function wikiClamp(value, min, max) {
        const numeric = Number(value);
        if (!Number.isFinite(numeric)) return min;
        return Math.max(min, Math.min(max, numeric));
      }

      function wikiFontSizePx(size) {
        if (size === "small") return 18;
        if (size === "large") return 36;
        if (size === "xlarge") return 48;
        return 24;
      }

      function wikiFontCss(family) {
        if (family === "hero-king") return '"Hero King", Georgia, serif';
        if (family === "dragon-force") return '"Dragon Force", Georgia, serif';
        if (family === "tribal-dragon") return '"Tribal Dragon", Georgia, serif';
        if (family === "sans") return '"Trebuchet MS", "Segoe UI", ui-sans-serif, system-ui, sans-serif';
        if (family === "display") return 'Georgia, "Palatino Linotype", "Times New Roman", serif';
        if (family === "script") return '"Segoe Script", "Brush Script MT", cursive';
        if (family === "mono") return 'Consolas, "Courier New", monospace';
        if (family === "cod") return '"Copperplate Gothic Bold", "Cinzel", Georgia, serif';
        return 'Georgia, "Times New Roman", serif';
      }

      function isWikiAssetSrc(src) {
        const value = String(src || "").trim();
        if (/^data:image\\/(png|jpe?g|webp);base64,/i.test(value)) return true;
        return ["/assets/wiki-misc/", "/assets/wiki-heroes/", "/assets/wiki-markers/", "/assets/wiki-artifacts/", "/assets/wiki-pets/"].some(function(prefix) {
          return value.startsWith(prefix);
        });
      }

      function wikiInlineImageToken(src) {
        return "[[kella-img:" + String(src || "").replace(/\\]/g, "") + "]]";
      }

      function wikiInlineImageHtml(src) {
        if (!isWikiAssetSrc(src)) return "";
        return '<img class="wiki-inline-image" src="' + escapeHtml(src) + '" alt="" data-wiki-inline-image="' + escapeHtml(src) + '" contenteditable="false" draggable="false" />';
      }

      function wikiTextContentHtml(text, richTextHtml) {
        if (String(richTextHtml || "").trim()) return String(richTextHtml);
        const raw = String(text || "Write here...");
        const pattern = /\\[\\[kella-img:([^\\]]+)\\]\\]/g;
        let cursor = 0;
        let html = "";
        raw.replace(pattern, function(match, src, offset) {
          html += escapeHtml(raw.slice(cursor, offset));
          html += wikiInlineImageHtml(src) || escapeHtml(match);
          cursor = offset + match.length;
          return match;
        });
        html += escapeHtml(raw.slice(cursor));
        return html;
      }

      function sanitizeWikiBlock(block) {
        const type = block?.type === "video" ? "video" : block?.type === "image" ? "image" : "text";
        const minWidth = type === "text" ? 80 : 24;
        const minHeight = type === "text" ? 48 : 24;
        const width = wikiClamp(block?.width, minWidth, WIKI_PAGE_WIDTH - 40);
        const height = wikiClamp(block?.height, minHeight, WIKI_MAX_PAGE_HEIGHT);
        const x = wikiClamp(block?.x, 0, WIKI_PAGE_WIDTH - width);
        const y = wikiClamp(block?.y, 0, WIKI_MAX_PAGE_HEIGHT - height);
        return {
          id: String(block?.id || wikiBlockId()).slice(0, 80),
          type,
          text: String(block?.text || "").slice(0, 50000),
          richTextHtml: type === "text" ? String(block?.richTextHtml || "").slice(0, 500000) : "",
          imageDataUrl: String(block?.imageDataUrl || ""),
          x,
          y,
          width,
          height,
          fontFamily: ["serif", "sans", "display", "script", "mono", "cod", "hero-king", "dragon-force", "tribal-dragon"].includes(block?.fontFamily) ? block.fontFamily : "serif",
          fontSize: ["small", "medium", "large", "xlarge"].includes(block?.fontSize) ? block.fontSize : "medium",
          fontSizePx: wikiClamp(Number.isFinite(Number(block?.fontSizePx)) ? Number(block.fontSizePx) : wikiFontSizePx(block?.fontSize), 8, 240),
          color: /^#[0-9a-fA-F]{6}$/.test(block?.color || "") ? block.color : "#3f2a13",
          align: ["left", "center", "right"].includes(block?.align) ? block.align : "center",
          imagePositionX: wikiClamp(Number.isFinite(Number(block?.imagePositionX)) ? Number(block.imagePositionX) : 0, -2000, 2000),
          imagePositionY: wikiClamp(Number.isFinite(Number(block?.imagePositionY)) ? Number(block.imagePositionY) : 0, -2000, 2000),
          imageScale: wikiClamp(Number.isFinite(Number(block?.imageScale)) ? Number(block.imageScale) : 1, 0.1, 8),
          shadowEnabled: Boolean(block?.shadowEnabled),
          shadowBlur: wikiClamp(Number.isFinite(Number(block?.shadowBlur)) ? Number(block.shadowBlur) : 12, 0, 100),
          shadowOffsetX: wikiClamp(Number.isFinite(Number(block?.shadowOffsetX)) ? Number(block.shadowOffsetX) : 0, -100, 100),
          shadowOffsetY: wikiClamp(Number.isFinite(Number(block?.shadowOffsetY)) ? Number(block.shadowOffsetY) : 6, -100, 100),
          shadowOpacity: wikiClamp(Number.isFinite(Number(block?.shadowOpacity)) ? Number(block.shadowOpacity) : 0.35, 0, 1),
          shadowColor: /^#[0-9a-fA-F]{6}$/.test(block?.shadowColor || "") ? block.shadowColor : "#3f2a13",
          zIndex: wikiClamp(block?.zIndex || 1, 0, 500)
        };
      }

      function normalizeWikiLayers(blocks) {
        return (blocks || []).slice().sort(function(a, b) {
          const layerDifference = Number(a?.zIndex || 0) - Number(b?.zIndex || 0);
          return layerDifference || String(a?.id || "").localeCompare(String(b?.id || ""));
        }).map(function(block, index) {
          return { ...sanitizeWikiBlock(block), zIndex: index + 1 };
        });
      }

      function bringWikiBlockToFront(blockId) {
        const block = (state.wikiBlocks || []).find(function(item) { return String(item.id) === String(blockId); });
        if (!block) return;
        block.zIndex = Math.max(0, ...(state.wikiBlocks || []).map(function(item) { return Number(item.zIndex || 0); })) + 1;
        state.wikiBlocks = normalizeWikiLayers(state.wikiBlocks);
      }

      function wikiPageHeight(blocks) {
        const bottom = (blocks || []).reduce(function(max, rawBlock) {
          const block = sanitizeWikiBlock(rawBlock);
          return Math.max(max, Number(block.y || 0) + Number(block.height || 0));
        }, 0);
        return wikiClamp(bottom + WIKI_PAGE_BOTTOM_PADDING, WIKI_MIN_PAGE_HEIGHT, WIKI_MAX_PAGE_HEIGHT);
      }

      function wikiPageStyle(blocks) {
        return 'style="--wiki-page-height:' + wikiPageHeight(blocks) + 'px"';
      }

      function resizeWikiPageToContent() {
        const canvas = document.querySelector("[data-wiki-canvas]");
        if (!canvas) return;
        canvas.style.setProperty("--wiki-page-height", wikiPageHeight(state.wikiBlocks || []) + "px");
      }

      function defaultWikiBlocks(page) {
        const blocks = Array.isArray(page?.blocks) && page.blocks.length ? page.blocks.map(sanitizeWikiBlock) : [];
        if (blocks.length) return normalizeWikiLayers(blocks);
        const fallback = [];
        if (page?.imageDataUrl) {
          fallback.push(sanitizeWikiBlock({ id: wikiBlockId(), type: "image", imageDataUrl: page.imageDataUrl, x: 150, y: 90, width: 460, height: 260 }));
        }
        if (page?.body) {
          fallback.push(sanitizeWikiBlock({ id: wikiBlockId(), type: "text", text: page.body, x: 90, y: page.imageDataUrl ? 385 : 130, width: 580, height: page.imageDataUrl ? 360 : 420, fontFamily: page.fontFamily, fontSize: page.fontSize }));
        }
        if (!fallback.length) {
          fallback.push(sanitizeWikiBlock({ id: wikiBlockId(), type: "text", text: "Kella Tips & Tricks", x: 90, y: 90, width: 580, height: 92, fontFamily: "display", fontSize: "large", align: "center", color: "#3f2a13" }));
          fallback.push(sanitizeWikiBlock({ id: wikiBlockId(), type: "text", text: "Write the guide here. Drag blocks around, add pictures, and make it readable for the alliance.", x: 90, y: 220, width: 580, height: 160, fontFamily: "serif", fontSize: "medium", align: "center" }));
        }
        return normalizeWikiLayers(fallback);
      }

      function selectedWikiBlock() {
        return state.wikiBlocks.find(function(block) { return String(block.id) === String(state.selectedWikiBlockId); }) || null;
      }

      function lastWikiTextBlock() {
        const textBlocks = (state.wikiBlocks || []).filter(function(item) { return item.type === "text"; });
        if (!textBlocks.length) return null;
        return textBlocks.slice().sort(function(a, b) {
          return (Number(b.y || 0) + Number(b.height || 0)) - (Number(a.y || 0) + Number(a.height || 0));
        })[0];
      }

      function wikiPlainTextFromEditable(node) {
        if (!node) return "";
        const parts = [];
        const blockTags = new Set(["ADDRESS", "ARTICLE", "ASIDE", "BLOCKQUOTE", "DIV", "FIGCAPTION", "FIGURE", "FOOTER", "H1", "H2", "H3", "H4", "H5", "H6", "HEADER", "LI", "MAIN", "NAV", "OL", "P", "PRE", "SECTION", "UL"]);
        const appendBreak = function() {
          if (parts.length && parts[parts.length - 1] !== "\\n") parts.push("\\n");
        };
        const walk = function(current) {
          if (!current) return;
          if (current.nodeType === Node.TEXT_NODE) {
            parts.push((current.nodeValue || "").replace(/\\u00a0/g, " "));
            return;
          }
          if (current.nodeType !== Node.ELEMENT_NODE) return;
          const element = current;
          const tag = element.tagName || "";
          if (tag === "IMG") {
            const src = element.getAttribute("data-wiki-inline-image") || element.getAttribute("src") || "";
            if (isWikiAssetSrc(src)) parts.push(wikiInlineImageToken(src));
            return;
          }
          if (tag === "BR") {
            appendBreak();
            return;
          }
          const isBlock = blockTags.has(tag);
          if (isBlock) appendBreak();
          Array.from(element.childNodes || []).forEach(walk);
          if (isBlock) appendBreak();
        };
        Array.from(node.childNodes || []).forEach(walk);
        return parts.join("").replace(/\\n+$/g, "");
      }

      function syncWikiTextFromDom() {
        document.querySelectorAll("[data-wiki-text-content]").forEach(function(node) {
          const id = node.closest("[data-wiki-block]")?.getAttribute("data-wiki-block") || "";
          const block = state.wikiBlocks.find(function(item) { return item.id === id; });
          if (block) {
            block.text = wikiPlainTextFromEditable(node);
            block.richTextHtml = node.innerHTML;
          }
        });
      }

      function autoFitWikiTextBlock(block, contentNode) {
        if (!block || block.type !== "text" || !contentNode) return;
        // Text scrolls inside its saved bounds. Geometry changes only through resize handles.
        contentNode.style.overflow = "auto";
      }

      function autoFitWikiTextBlocksFromDom() {
        document.querySelectorAll("[data-wiki-text-content]").forEach(function(node) {
          const id = node.closest("[data-wiki-block]")?.getAttribute("data-wiki-block") || "";
          const block = state.wikiBlocks.find(function(item) { return item.id === id; });
          autoFitWikiTextBlock(block, node);
        });
      }

      function wikiExcerpt(page) {
        const blockText = Array.isArray(page?.blocks) ? page.blocks.filter(function(block) { return block.type === "text"; }).map(function(block) { return block.text || ""; }).join(" ") : "";
        const text = String(page?.body || blockText || "").replace(/\\s+/g, " ").trim();
        return text.length > 170 ? text.slice(0, 170) + "..." : text || "No wiki text added.";
      }

      function wikiImageHtml(page, className) {
        return page?.imageDataUrl ? '<img class="' + className + '" src="' + escapeHtml(page.imageDataUrl) + '" alt="' + escapeHtml(page.title || "Wiki image") + '" />' : "";
      }

      function wikiBlockStyle(block) {
        return "left:" + block.x + "px;top:" + block.y + "px;width:" + block.width + "px;height:" + block.height + "px;font-family:" + wikiFontCss(block.fontFamily) + ";font-size:" + block.fontSizePx + "px;color:" + block.color + ";text-align:" + block.align + ";z-index:" + block.zIndex + ";";
      }

      function wikiHexRgba(hex, opacity) {
        const value = String(hex || "#000000").replace("#", "");
        const red = parseInt(value.slice(0, 2), 16) || 0;
        const green = parseInt(value.slice(2, 4), 16) || 0;
        const blue = parseInt(value.slice(4, 6), 16) || 0;
        return "rgba(" + red + "," + green + "," + blue + "," + wikiClamp(opacity, 0, 1) + ")";
      }

      function wikiMediaStyle(block) {
        return "transform:translate(" + block.imagePositionX + "px," + block.imagePositionY + "px) scale(" + block.imageScale + ");";
      }

      function wikiTextContentStyle(block) {
        return "";
      }

      function wikiBlockStyleAttr(block) {
        return escapeHtml(wikiBlockStyle(block));
      }

      function wikiBlockHandlesHtml(editable, blockId) {
        return editable
          ? '<button class="wiki-drag-handle" type="button" data-wiki-drag-handle title="Drag block" aria-label="Drag block"></button><span class="wiki-resize-handle wiki-resize-nw" data-wiki-resize-handle data-resize-corner="nw" title="Resize from corner"></span><span class="wiki-resize-handle wiki-resize-ne" data-wiki-resize-handle data-resize-corner="ne" title="Resize from corner"></span><span class="wiki-resize-handle wiki-resize-sw" data-wiki-resize-handle data-resize-corner="sw" title="Resize from corner"></span><span class="wiki-resize-handle wiki-resize-se" data-wiki-resize-handle data-resize-corner="se" title="Resize from corner"></span>'
          : "";
      }

      function isLastWikiTextBlock(blockId) {
        const last = lastWikiTextBlock();
        return Boolean(last && String(last.id) === String(blockId));
      }

      function wikiInlineAddTextHtml(editable, block) {
        if (!editable || block.type !== "text" || !isLastWikiTextBlock(block.id)) return "";
        return '<button class="wiki-add-text-inline" type="button" data-action="add-wiki-text-after" data-after-wiki-block="' + escapeHtml(block.id) + '">+ Add Text</button>';
      }

      function renderWikiBlockHtml(rawBlock, editable) {
        const block = sanitizeWikiBlock(rawBlock);
        const selected = editable && String(block.id) === String(state.selectedWikiBlockId);
        const classes = "wiki-block " + (block.type === "video" ? "wiki-video-block" : block.type === "image" ? "wiki-image-block" : "wiki-text-block") + (block.shadowEnabled ? " wiki-block--shadowed" : "") + (selected ? " selected" : "");
        const handles = wikiBlockHandlesHtml(editable, block.id);
        const addText = wikiInlineAddTextHtml(editable, block);
        if (block.type === "video") {
          const video = block.imageDataUrl
            ? '<div class="wiki-media-frame"><video data-wiki-media src="' + escapeHtml(block.imageDataUrl) + '" controls preload="metadata" style="' + escapeHtml(wikiMediaStyle(block)) + '"></video></div>'
            : '<div class="empty">Choose a video.</div>';
          return '<div class="' + classes + '" data-wiki-block="' + escapeHtml(block.id) + '" style="' + wikiBlockStyleAttr(block) + '">' + video + handles + '</div>';
        }
        if (block.type === "image") {
          const image = block.imageDataUrl
            ? '<div class="wiki-media-frame"><img data-wiki-media src="' + escapeHtml(block.imageDataUrl) + '" alt="Wiki image" style="' + escapeHtml(wikiMediaStyle(block)) + '" /></div>'
            : '<div class="empty">Choose an image.</div>';
          return '<div class="' + classes + '" data-wiki-block="' + escapeHtml(block.id) + '" style="' + wikiBlockStyleAttr(block) + '">' + image + handles + '</div>';
        }
        return '<div class="' + classes + '" data-wiki-block="' + escapeHtml(block.id) + '" style="' + wikiBlockStyleAttr(block) + '">' +
          '<div class="wiki-text-content" style="' + escapeHtml(wikiTextContentStyle(block)) + '" ' + (editable ? 'contenteditable="true" spellcheck="true" data-wiki-text-content' : "") + '>' + wikiTextContentHtml(block.text || "Write here...", block.richTextHtml) + '</div>' +
          addText +
          handles +
        '</div>';
      }

      function renderWikiBlockEditorHtml(rawBlock, editable) {
        const block = sanitizeWikiBlock(rawBlock);
        const selected = editable && String(block.id) === String(state.selectedWikiBlockId);
        const classes = "wiki-block " + (block.type === "video" ? "wiki-video-block" : block.type === "image" ? "wiki-image-block" : "wiki-text-block") + (block.shadowEnabled ? " wiki-block--shadowed" : "") + (selected ? " selected" : "");
        const handles = wikiBlockHandlesHtml(editable, block.id);
        const addText = wikiInlineAddTextHtml(editable, block);
        if (block.type === "video") {
          const video = block.imageDataUrl
            ? '<div class="wiki-media-frame"><video data-wiki-media src="' + escapeHtml(block.imageDataUrl) + '" controls preload="metadata" style="' + escapeHtml(wikiMediaStyle(block)) + '"></video></div>'
            : '<div class="empty">Choose a video.</div>';
          return '<div class="' + classes + '" data-wiki-block="' + escapeHtml(block.id) + '" style="' + wikiBlockStyleAttr(block) + '">' + video + handles + '</div>';
        }
        if (block.type === "image") {
          const image = block.imageDataUrl
            ? '<div class="wiki-media-frame"><img data-wiki-media src="' + escapeHtml(block.imageDataUrl) + '" alt="Wiki image" style="' + escapeHtml(wikiMediaStyle(block)) + '" /></div>'
            : '<div class="empty">Choose an image.</div>';
          return '<div class="' + classes + '" data-wiki-block="' + escapeHtml(block.id) + '" style="' + wikiBlockStyleAttr(block) + '">' + image + handles + '</div>';
        }
        return '<div class="' + classes + '" data-wiki-block="' + escapeHtml(block.id) + '" style="' + wikiBlockStyleAttr(block) + '">' +
          '<div class="wiki-text-content" style="' + escapeHtml(wikiTextContentStyle(block)) + '" ' + (editable ? 'contenteditable="true" spellcheck="true" data-wiki-text-content' : "") + '>' + wikiTextContentHtml(block.text || "Write here...", block.richTextHtml) + '</div>' +
          addText +
          handles +
        '</div>';
      }

      function renderWikiCanvasBlocks(editable) {
        const blocks = (state.wikiBlocks || []).map(function(block) { return renderWikiBlockEditorHtml(block, editable); }).join("");
        if (!editable || (state.wikiBlocks || []).some(function(block) { return block.type === "text"; })) return blocks;
        return blocks + '<button class="wiki-add-text-inline wiki-add-text-inline--empty" type="button" data-action="add-wiki-text">+ Add Text</button>';
      }

      function wikiArticleMarkup(page, includeTitle = true) {
        const blocks = defaultWikiBlocks(page);
        const pageHeight = wikiPageHeight(blocks);
        return '<article class="wiki-reader ' + wikiClass(page) + '">' +
          (includeTitle ? '<h2>' + escapeHtml(page?.title || "Kella Wiki") + '</h2><div class="wiki-article-author">By ' + escapeHtml(page?.author || page?.createdBy || "Kella Officer") + '</div>' : "") +
          '<div class="wiki-reader-toolbar"><button class="secondary" type="button" data-action="wiki-reader-zoom-out" aria-label="Zoom out">-</button><span class="wiki-reader-zoom" data-wiki-reader-zoom>Fit</span><button class="secondary" type="button" data-action="wiki-reader-zoom-in" aria-label="Zoom in">+</button><button class="secondary" type="button" data-action="wiki-reader-zoom-reset">Fit</button></div>' +
          '<div class="wiki-reader-stage" data-wiki-reader-stage data-wiki-page-height="' + pageHeight + '"><div class="wiki-reader-sizer" data-wiki-reader-sizer><div class="wiki-reader-page" data-wiki-reader-page ' + wikiPageStyle(blocks) + '>' + blocks.map(function(block) { return renderWikiBlockEditorHtml(block, false); }).join("") + '</div></div></div>' +
        '</article>';
      }

      function fitWikiReader() {
        const stage = document.querySelector("[data-wiki-reader-stage]");
        const sizer = stage?.querySelector("[data-wiki-reader-sizer]");
        const page = stage?.querySelector("[data-wiki-reader-page]");
        if (!stage || !sizer || !page) return;
        const pageHeight = Number(stage.getAttribute("data-wiki-page-height") || WIKI_MIN_PAGE_HEIGHT);
        const availableWidth = Math.max(240, stage.clientWidth - 2);
        const fitScale = Math.min(1, availableWidth / WIKI_PAGE_WIDTH);
        const scale = wikiClamp(fitScale * (state.wikiReaderZoom || 1), 0.25, 2);
        page.style.setProperty("--wiki-reader-scale", String(scale));
        sizer.style.width = Math.round(WIKI_PAGE_WIDTH * scale) + "px";
        sizer.style.height = Math.round(pageHeight * scale) + "px";
        stage.style.height = Math.round(pageHeight * scale) + "px";
        const readout = document.querySelector("[data-wiki-reader-zoom]");
        if (readout) readout.textContent = (state.wikiReaderZoom || 1) === 1 ? "Fit" : Math.round(scale * 100) + "%";
      }

      function setWikiReaderZoom(value) {
        state.wikiReaderZoom = wikiClamp(value, 0.6, 1.8);
        fitWikiReader();
      }

      function wikiCard(page) {
        const editAction = hasWikiEditAccess()
          ? '<button class="secondary" type="button" data-action="edit-wiki-page" data-wiki-id="' + escapeHtml(page.id) + '">Edit</button>'
          : "";
        const deleteAction = hasAdminAccess()
          ? '<button class="danger" type="button" data-action="delete-wiki-page" data-wiki-id="' + escapeHtml(page.id) + '">Delete</button>'
          : "";
        const shareSlug = String(page.slug || "").trim();
        const shareAction = shareSlug
          ? '<button class="secondary wiki-share-button" type="button" data-action="share-wiki-page" data-wiki-slug="' + escapeHtml(shareSlug) + '" aria-label="Share ' + escapeHtml(page.title || "wiki page") + '"><span aria-hidden="true">&#8599;</span> Share</button>'
          : "";
        const tags = Array.isArray(page.tags) ? page.tags : [];
        const tagChips = tags.length
          ? '<div class="wiki-card-tags">' + tags.map(function(tag) { return '<span class="wiki-tag-chip">' + escapeHtml(tag) + '</span>'; }).join("") + '</div>'
          : "";
        return '<article class="card wiki-card">' +
          '<div>' + wikiImageHtml(page, "wiki-thumb") + '<h3>' + escapeHtml(page.title || "Kella Wiki") + '</h3><span class="muted">By ' + escapeHtml(page.author || page.createdBy || "Kella Officer") + '</span>' + tagChips + '<p>' + escapeHtml(wikiExcerpt(page)) + '</p></div>' +
          '<div class="toolbar"><button class="primary" type="button" data-action="open-wiki-page" data-wiki-id="' + escapeHtml(page.id) + '">Read</button>' + shareAction + editAction + deleteAction + '</div>' +
          '<span class="muted">Updated ' + formatDateTime(page.updatedAt || page.createdAt) + (hasWikiEditAccess() ? " - " + escapeHtml(page.status || "Published") : "") + '</span>' +
        '</article>';
      }

      function wikiSearchText(page) {
        const blockText = Array.isArray(page?.blocks)
          ? page.blocks.map(function(block) {
              return [block.text, block.richTextHtml, block.label, block.caption].filter(Boolean).join(" ");
            }).join(" ")
          : "";
        return normalizeWikiSearchText([
          page?.title,
          page?.body,
          page?.richTextHtml,
          page?.author,
          Array.isArray(page?.tags) ? page.tags.join(" ") : "",
          page?.createdBy,
          page?.slug,
          wikiExcerpt(page),
          blockText,
          page?.status
        ].filter(Boolean).join(" "));
      }

      function normalizeWikiSearchText(value) {
        return String(value || "")
          .replace(/<[^>]*>/g, " ")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, " ")
          .trim();
      }

      function normalizedWikiTag(value) {
        return String(value || "").trim().toLowerCase();
      }

      function wikiTags(pages) {
        const tags = new Map();
        (pages || []).forEach(function(page) {
          (Array.isArray(page.tags) ? page.tags : []).forEach(function(rawTag) {
            const tag = String(rawTag || "").trim();
            const key = normalizedWikiTag(tag);
            if (tag && !tags.has(key)) tags.set(key, tag);
          });
        });
        return Array.from(tags.values()).sort(function(a, b) { return a.localeCompare(b); });
      }

      function filteredWikiPages(pages, query, activeTag = state.wikiTag) {
        const terms = normalizeWikiSearchText(query).split(" ").filter(Boolean);
        return (pages || []).filter(function(page) {
          const matchesTag = !activeTag || (Array.isArray(page.tags) ? page.tags : []).some(function(tag) {
            return normalizedWikiTag(tag) === normalizedWikiTag(activeTag);
          });
          const searchable = wikiSearchText(page);
          return matchesTag && terms.every(function(term) { return searchable.includes(term); });
        });
      }

      function wikiResultsHtml(pages, query) {
        const matches = filteredWikiPages(pages, query);
        if (!pages.length) return empty("No wiki pages yet. Admins can create the first guide from this page.");
        if (!matches.length) return empty("No wiki pages match the selected tag and search.");
        return matches.map(wikiCard).join("");
      }

      function wikiSearchCountText(pages, query) {
        const matches = filteredWikiPages(pages, query);
        return String(query || "").trim() || state.wikiTag ? matches.length + " found" : (pages || []).length + " pages";
      }

      function wikiTagFiltersHtml(pages) {
        const activeTag = state.wikiTag || "";
        const tags = wikiTags(pages);
        if (!tags.length) return "";
        return '<div class="wiki-tag-filters" data-wiki-tag-filters>' +
          '<button class="wiki-tag-button' + (!activeTag ? " active" : "") + '" type="button" data-action="filter-wiki-tag" data-wiki-tag="">All</button>' +
          tags.map(function(tag) {
            return '<button class="wiki-tag-button' + (normalizedWikiTag(tag) === normalizedWikiTag(activeTag) ? " active" : "") + '" type="button" data-action="filter-wiki-tag" data-wiki-tag="' + escapeHtml(tag) + '">' + escapeHtml(tag) + '</button>';
          }).join("") +
        '</div>';
      }

      function renderWikiLibrary(pages) {
        const query = state.wikiSearch || "";
        return '<section class="card wiki-search-card">' +
          '<div class="wiki-search-row">' +
            '<input type="search" data-wiki-search value="' + escapeHtml(query) + '" placeholder="Search wiki guides, events, rules, heroes..." aria-label="Search wiki pages" autocomplete="off" spellcheck="false" />' +
            '<span class="wiki-search-count" data-wiki-search-count>' + escapeHtml(wikiSearchCountText(pages, query)) + '</span>' +
          '</div>' + wikiTagFiltersHtml(pages) +
        '</section>' +
        '<section class="wiki-grid" data-wiki-results>' + wikiResultsHtml(pages, query) + '</section>';
      }

      function refreshWikiResults() {
        const pages = state.wiki || [];
        const query = state.wikiSearch || "";
        const results = document.querySelector("[data-wiki-results]");
        const count = document.querySelector("[data-wiki-search-count]");
        if (results) results.innerHTML = wikiResultsHtml(pages, query);
        if (count) count.textContent = wikiSearchCountText(pages, query);
      }

      function optionSelected(value, selected) {
        return value === selected ? " selected" : "";
      }

      function loadWikiCustomImages() {
        if (Array.isArray(state.wikiCustomImages)) return state.wikiCustomImages;
        try {
          const parsed = JSON.parse(localStorage.getItem(WIKI_CUSTOM_IMAGE_KEY) || "[]");
          state.wikiCustomImages = Array.isArray(parsed)
            ? parsed.filter(function(image) {
                return image && typeof image.src === "string" && isWikiAssetSrc(image.src) && typeof image.kind === "string";
              }).slice(0, 80)
            : [];
        } catch (_error) {
          state.wikiCustomImages = [];
        }
        return state.wikiCustomImages;
      }

      function saveWikiCustomImages(images) {
        state.wikiCustomImages = images.slice(0, 80);
        localStorage.setItem(WIKI_CUSTOM_IMAGE_KEY, JSON.stringify(state.wikiCustomImages));
      }

      function wikiAssetImagesForKind(images, kind) {
        const custom = loadWikiCustomImages().filter(function(image) {
          return image.kind === kind;
        });
        return custom.concat(images || []);
      }

      function wikiBaseImagesForKind(kind) {
        if (kind === "hero") return wikiHeroImages;
        if (kind === "artifact") return wikiArtifactImages;
        if (kind === "marker") return wikiMarkerImages;
        if (kind === "pet") return wikiPetImages;
        return wikiMiscImages;
      }

      function wikiAssetTileHtml(image, kind) {
        const safeKind = kind || "misc";
        const tileClass = "wiki-misc-tile wiki-misc-tile--" + safeKind;
        return '<button class="' + tileClass + '" type="button" draggable="true" data-action="add-wiki-asset-image" data-wiki-asset-label="' + escapeHtml(image.label || "") + '" data-wiki-asset-image="' + escapeHtml(image.src) + '" title="Drag or click to add ' + escapeHtml(image.label) + '">' +
          '<img src="' + escapeHtml(image.src) + '" alt="" loading="lazy" decoding="async" />' +
          '<span>' + escapeHtml(image.label) + '</span>' +
        '</button>';
      }

      function hydrateWikiAssetPanel(panel) {
        if (!panel || panel.getAttribute("data-wiki-asset-loaded") === "true") return;
        const kind = panel.getAttribute("data-wiki-asset-kind") || "misc";
        const tiles = panel.querySelector("[data-wiki-asset-tiles]");
        if (!tiles) return;
        tiles.innerHTML = wikiAssetImagesForKind(wikiBaseImagesForKind(kind), kind).map(function(image) {
          return wikiAssetTileHtml(image, kind);
        }).join("");
        panel.setAttribute("data-wiki-asset-loaded", "true");
        const input = panel.querySelector("[data-wiki-asset-search]");
        if (input) filterWikiAssetPanel(input);
      }

      function renderWikiAssetPickerHtml(label, images, kind) {
        const safeKind = kind || "misc";
        const panelClass = "wiki-misc-panel wiki-misc-panel--" + safeKind;
        const tileClass = "wiki-misc-tile wiki-misc-tile--" + safeKind;
        const search = '<label class="wiki-asset-search"><input data-wiki-asset-search placeholder="Search ' + escapeHtml(label.toLowerCase()) + ' pictures..." aria-label="Search ' + escapeHtml(label) + ' pictures" /></label>';
        const upload = '<button class="' + tileClass + ' wiki-misc-upload" type="button" data-action="upload-wiki-stock-image" data-wiki-stock-kind="' + escapeHtml(safeKind) + '" title="Upload custom ' + escapeHtml(label) + ' image">' +
          '<span class="wiki-upload-plus">+</span>' +
          '<span>Upload</span>' +
        '</button>';
        return '<div class="wiki-misc-picker"><button class="secondary" type="button" data-action="toggle-wiki-asset-panel">' + escapeHtml(label) + '</button><div class="' + panelClass + '" data-wiki-asset-panel data-wiki-asset-kind="' + escapeHtml(safeKind) + '" data-wiki-asset-loaded="false" hidden>' + search + upload + '<div data-wiki-asset-tiles></div><div class="wiki-asset-empty" data-wiki-asset-empty hidden>No matching pictures.</div></div></div>';
      }

      function renderWikiAssetToolsHtml() {
        return '<div class="wiki-image-tools">' +
          '<div class="wiki-image-tool-row">' +
            renderWikiAssetPickerHtml("Hero", wikiHeroImages, "hero") +
            renderWikiAssetPickerHtml("Artifacts", wikiArtifactImages, "artifact") +
            renderWikiAssetPickerHtml("Marker", wikiMarkerImages, "marker") +
            renderWikiAssetPickerHtml("Pet", wikiPetImages, "pet") +
            renderWikiAssetPickerHtml("Misc", wikiMiscImages, "misc") +
          '</div>' +
          '<div class="wiki-add-block-row">' +
            '<button class="secondary" type="button" data-action="add-wiki-image">Upload Picture or Video</button>' +
          '</div>' +
        '</div>';
      }

      function wikiFontOptionHtml(value, label, selected) {
        return '<option value="' + value + '"' + optionSelected(value, selected) + '>' + label + '</option>';
      }

      function wikiFontOptionsHtml(selected) {
        return wikiFontOptionHtml("serif", "Old paper serif", selected) +
          wikiFontOptionHtml("sans", "Clean readable", selected) +
          wikiFontOptionHtml("display", "Alliance title", selected) +
          wikiFontOptionHtml("script", "Royal script", selected) +
          wikiFontOptionHtml("cod", "Dragon title", selected) +
          wikiFontOptionHtml("mono", "Tactical mono", selected) +
          wikiFontOptionHtml("hero-king", "Hero King", selected) +
          wikiFontOptionHtml("dragon-force", "Dragon Force", selected) +
          wikiFontOptionHtml("tribal-dragon", "Tribal Dragon", selected);
      }

      function wikiSelectionSizeOptionsHtml(selected) {
        return [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 160, 200, 240].map(function(size) {
          return '<option value="' + size + '"' + optionSelected(String(size), String(selected || 24)) + '>' + size + ' px</option>';
        }).join("");
      }

      function renderWikiInspectorHtml() {
        const block = selectedWikiBlock();
        if (!block) {
          return '<section class="wiki-inspector wiki-inspector--empty" data-wiki-inspector>' +
            '<div class="wiki-inspector__group"><span class="wiki-inspector__label">Formatting</span>' +
              '<div class="wiki-control-row">' +
                '<button class="wiki-format-button" type="button" data-action="format-wiki-selection" data-wiki-inline-command="bold" title="Bold" aria-label="Bold">B</button>' +
                '<button class="wiki-format-button" type="button" data-action="format-wiki-selection" data-wiki-inline-command="italic" title="Italic" aria-label="Italic">I</button>' +
                '<button class="wiki-format-button" type="button" data-action="format-wiki-selection" data-wiki-inline-command="underline" title="Underline" aria-label="Underline">U</button>' +
                '<button class="wiki-format-button wiki-shadow-button" type="button" data-action="toggle-wiki-shadow" aria-pressed="false">Shadow</button>' +
              '</div>' +
            '</div>' +
            '<div class="wiki-inspector__group wiki-inspector__group--assets">' + renderWikiAssetToolsHtml() + '</div>' +
          '</section>';
        }
        const formattingControls = block.type === "text"
          ? '<div class="wiki-inspector__group">' +
              '<div class="wiki-inspector__header"><span class="wiki-inspector__label">Formatting</span></div>' +
              '<div class="wiki-control-row">' +
                '<button class="wiki-format-button" type="button" data-action="format-wiki-selection" data-wiki-inline-command="bold" title="Bold selected text" aria-label="Bold selected text">B</button>' +
                '<button class="wiki-format-button" type="button" data-action="format-wiki-selection" data-wiki-inline-command="italic" title="Italic selected text" aria-label="Italic selected text">I</button>' +
                '<button class="wiki-format-button" type="button" data-action="format-wiki-selection" data-wiki-inline-command="underline" title="Underline selected text" aria-label="Underline selected text">U</button>' +
                '<button class="wiki-format-button wiki-shadow-button' + (block.shadowEnabled ? " active" : "") + '" type="button" data-action="toggle-wiki-shadow" aria-pressed="' + String(block.shadowEnabled) + '">Shadow</button>' +
              '</div>' +
              '<div class="wiki-control-row">' +
                '<label>Font<select data-wiki-inline-style="fontFamily">' + wikiFontOptionsHtml(block.fontFamily) + '</select></label>' +
                '<label>Size<select data-wiki-inline-style="fontSize">' + wikiSelectionSizeOptionsHtml(block.fontSizePx) + '</select></label>' +
                '<label>Align<select data-wiki-block-style="align"><option value="left"' + optionSelected("left", block.align) + '>Left</option><option value="center"' + optionSelected("center", block.align) + '>Center</option><option value="right"' + optionSelected("right", block.align) + '>Right</option></select></label>' +
                '<label class="wiki-color-control">Color<input class="wiki-color-wheel" type="color" data-wiki-inline-style="color" value="' + escapeHtml(block.color) + '" /></label>' +
              '</div>' +
            '</div>'
          : '<div class="wiki-inspector__group">' +
              '<div class="wiki-inspector__header"><span class="wiki-inspector__label">Formatting</span></div>' +
              '<div class="wiki-control-row">' +
                '<button class="secondary" type="button" data-action="change-wiki-image">Change ' + (block.type === "video" ? "Video" : "Picture") + '</button>' +
                '<button class="wiki-format-button wiki-shadow-button' + (block.shadowEnabled ? " active" : "") + '" type="button" data-action="toggle-wiki-shadow" aria-pressed="' + String(block.shadowEnabled) + '">Shadow</button>' +
              '</div>' +
              '<div class="wiki-control-row">' +
                '<label>Crop X<input type="number" min="-2000" max="2000" data-wiki-block-style="imagePositionX" value="' + block.imagePositionX + '" /></label>' +
                '<label>Crop Y<input type="number" min="-2000" max="2000" data-wiki-block-style="imagePositionY" value="' + block.imagePositionY + '" /></label>' +
                '<label>Zoom<input type="range" min="0.1" max="8" step="0.05" data-wiki-block-style="imageScale" value="' + block.imageScale + '" /></label>' +
              '</div>' +
            '</div>';
        return '<section class="wiki-inspector" data-wiki-inspector">' +
          formattingControls +
          '<div class="wiki-inspector__group wiki-inspector__group--assets">' +
            '<div class="wiki-inspector__header"><span class="wiki-inspector__label">Assets</span></div>' +
            renderWikiAssetToolsHtml() +
          '</div>' +
        '</section>';
      }

      function renderWikiEditor(page) {
        const editing = page || {};
        state.wikiBlocks = defaultWikiBlocks(editing);
        state.selectedWikiBlockId = state.wikiBlocks[0]?.id || "";
        const title = editing.id ? "Edit Wiki Page" : "Create Wiki Page";
        const selectedTags = Array.isArray(editing.tags) ? editing.tags : [];
        const existingTags = wikiTags(state.wiki || []);
        const tagSuggestions = existingTags.length
          ? '<div class="wiki-editor-tags">' + existingTags.map(function(tag) {
              const selected = selectedTags.some(function(item) { return normalizedWikiTag(item) === normalizedWikiTag(tag); });
              return '<button class="wiki-tag-button' + (selected ? " selected" : "") + '" type="button" data-action="toggle-wiki-editor-tag" data-wiki-tag="' + escapeHtml(tag) + '">' + escapeHtml(tag) + '</button>';
            }).join("") + '</div>'
          : "";
        return '<section class="card wiki-editor" data-wiki-editor>' +
          '<div class="card-header"><div><h3>' + title + '</h3></div><div class="toolbar"><button class="secondary" type="button" data-action="clear-wiki-form">New Page</button><button class="primary" type="button" data-action="save-wiki-page">' + (editing.id ? "Save Changes" : "Publish Wiki") + '</button></div></div>' +
          '<input type="hidden" data-wiki="id" value="' + escapeHtml(editing.id || "") + '" />' +
          '<input type="file" data-wiki-block-image accept="image/png,image/jpeg,image/webp,video/mp4,video/webm" style="display:none" />' +
          '<input type="file" data-wiki-stock-image accept="image/png,image/jpeg,image/webp" style="display:none" />' +
          '<div class="form-grid">' +
            '<label>Title<input data-wiki="title" maxlength="120" placeholder="Roots of War Guide" value="' + escapeHtml(editing.title || "") + '" /></label>' +
            '<label>Author<input data-wiki="author" maxlength="120" placeholder="Officer name" value="' + escapeHtml(editing.author || state.auth?.user?.displayName || state.auth?.user?.username || "") + '" /></label>' +
            '<label class="wide wiki-tags-field">Tags<input data-wiki="tags" maxlength="380" placeholder="Pets, Heroes, Roots of War" value="' + escapeHtml(selectedTags.join(", ")) + '" /><small>Separate tags with commas, or select an existing tag.</small>' + tagSuggestions + '</label>' +
            '<label>Status<select data-wiki="status"><option value="Published"' + optionSelected("Published", editing.status || "Published") + '>Published</option><option value="Draft"' + optionSelected("Draft", editing.status || "Published") + '>Draft</option></select></label>' +
          '</div>' +
          renderWikiInspectorHtml() +
          '<div class="wiki-builder">' +
            '<div class="wiki-canvas-wrap"><div class="wiki-page-canvas" data-wiki-canvas ' + wikiPageStyle(state.wikiBlocks) + '>' + renderWikiCanvasBlocks(true) + '</div></div>' +
          '</div>' +
        '</section>';
      }

      function findWikiPageById(id) {
        return (state.wiki || []).find(function(page) { return String(page.id) === String(id); });
      }

      function readWikiFormValues() {
        const root = document.querySelector("[data-wiki-editor]");
        if (!root) throw new Error("Wiki editor is not open.");
        const value = function(name) {
          return (root.querySelector('[data-wiki="' + name + '"]')?.value || "").trim();
        };
        const title = value("title");
        if (!title) throw new Error("Add a wiki title first.");
        const author = value("author");
        if (!author) throw new Error("Add the author name.");
        return {
          id: value("id"),
          title,
          author,
          tags: value("tags").split(",").map(function(tag) { return tag.trim(); }).filter(Boolean).slice(0, 12),
          status: value("status") || "Published"
        };
      }

      async function readWikiImageFile(file) {
        const isImage = /^image\\/(png|jpe?g|webp)$/i.test(file.type);
        const isVideo = /^video\\/(mp4|webm)$/i.test(file.type);
        if (!isImage && !isVideo) throw new Error("Wiki media must be PNG, JPG, WEBP, MP4, or WEBM.");
        if (isImage) return compressWikiImageFile(file, 1920, 1_900_000);
        const maxSize = 6 * 1024 * 1024;
        if (file.size > maxSize) throw new Error("Wiki video is too large. Please use a video under 6 MB.");
        return "data:" + file.type + ";base64," + arrayBufferToBase64(await file.arrayBuffer());
      }

      function wikiImageFileDataUrl(file) {
        if (!/^image\\/(png|jpe?g|webp)$/i.test(file.type)) throw new Error("Wiki image must be PNG, JPG, or WEBP.");
        if (file.size > 30 * 1024 * 1024) throw new Error("Image is too large. Please use a picture under 30 MB.");
        return URL.createObjectURL(file);
      }

      function loadWikiImageElement(src) {
        return new Promise(function(resolve, reject) {
          const image = new Image();
          image.onload = function() { resolve(image); };
          image.onerror = function() { reject(new Error("Could not read that image.")); };
          image.src = src;
        });
      }

      async function compressWikiImageFile(file, maxSide, maxDataUrlLength) {
        const src = wikiImageFileDataUrl(file);
        try {
          const image = await loadWikiImageElement(src);
          const naturalWidth = image.naturalWidth || image.width || maxSide;
          const naturalHeight = image.naturalHeight || image.height || maxSide;
          let scale = Math.min(1, maxSide / Math.max(naturalWidth, naturalHeight));
          let quality = 0.88;
          let result = "";
          for (let attempt = 0; attempt < 8; attempt += 1) {
            const width = Math.max(1, Math.round(naturalWidth * scale));
            const height = Math.max(1, Math.round(naturalHeight * scale));
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext("2d");
            if (!context) throw new Error("Your browser could not resize this image.");
            context.clearRect(0, 0, width, height);
            context.drawImage(image, 0, 0, width, height);
            result = canvas.toDataURL("image/webp", quality);
            if (result.length <= maxDataUrlLength) return result;
            if (quality > 0.58) quality -= 0.1;
            else scale *= 0.78;
          }
          if (result && result.length <= 4_000_000) return result;
          throw new Error("This image could not be reduced enough. Please choose a smaller picture.");
        } finally {
          URL.revokeObjectURL(src);
        }
      }

      async function readWikiStockImageFile(file) {
        return compressWikiImageFile(file, 512, 550_000);
      }

      function wikiStockImageLabel(filename) {
        return String(filename || "Custom Image")
          .replace(/\\.[^.]+$/, "")
          .replace(/[-_]+/g, " ")
          .replace(/\\s+/g, " ")
          .trim()
          .slice(0, 42) || "Custom Image";
      }

      function addWikiCustomStockImage(kind, src, label) {
        const safeKind = ["hero", "artifact", "marker", "pet", "misc"].includes(kind) ? kind : "misc";
        const images = loadWikiCustomImages().filter(function(image) {
          return !(image.kind === safeKind && image.src === src);
        });
        images.unshift({ kind: safeKind, src, label: label || "Custom Image", uploadedAt: new Date().toISOString() });
        saveWikiCustomImages(images);
      }

      function closeWikiAssetPanels(exceptPicker) {
        document.querySelectorAll("[data-wiki-asset-panel]").forEach(function(panel) {
          if (exceptPicker && exceptPicker.contains(panel)) return;
          panel.hidden = true;
        });
      }

      function filterWikiAssetPanel(input) {
        const panel = input.closest("[data-wiki-asset-panel]");
        if (!panel) return;
        const query = String(input.value || "").trim().toLowerCase();
        let visible = 0;
        panel.querySelectorAll("[data-wiki-asset-label]").forEach(function(tile) {
          const label = String(tile.getAttribute("data-wiki-asset-label") || "").toLowerCase();
          const match = !query || label.includes(query);
          tile.hidden = !match;
          if (match) visible += 1;
        });
        const emptyState = panel.querySelector("[data-wiki-asset-empty]");
        if (emptyState) emptyState.hidden = visible > 0;
      }

      async function wikiPayload() {
        syncWikiTextFromDom();
        autoFitWikiTextBlocksFromDom();
        const values = readWikiFormValues();
        state.wikiBlocks = normalizeWikiLayers(state.wikiBlocks || []);
        const blocks = state.wikiBlocks.map(sanitizeWikiBlock);
        const body = blocks.filter(function(block) { return block.type === "text"; }).map(function(block) { return (block.text || "").trim(); }).filter(Boolean).join("\\n\\n");
        const firstText = blocks.find(function(block) { return block.type === "text"; }) || {};
        const firstImage = blocks.find(function(block) { return block.type === "image" && block.imageDataUrl; }) || {};
        if (!body && !firstImage.imageDataUrl) throw new Error("Add text or a picture before saving the wiki page.");
        return {
          ...values,
          body: body || values.title,
          imageDataUrl: firstImage.imageDataUrl || "",
          fontFamily: firstText.fontFamily || "serif",
          fontSize: firstText.fontSize || "medium",
          blocks
        };
      }

      function refreshWikiBuilder() {
        const canvas = document.querySelector("[data-wiki-canvas]");
        const inspector = document.querySelector("[data-wiki-inspector]");
        if (canvas) {
          canvas.innerHTML = renderWikiCanvasBlocks(true);
          resizeWikiPageToContent();
        }
        if (inspector) inspector.outerHTML = renderWikiInspectorHtml();
        requestAnimationFrame(autoFitWikiTextBlocksFromDom);
      }

      function refreshWikiSelection() {
        document.querySelectorAll("[data-wiki-block]").forEach(function(node) {
          node.classList.toggle("selected", node.getAttribute("data-wiki-block") === state.selectedWikiBlockId);
        });
        const inspector = document.querySelector("[data-wiki-inspector]");
        if (inspector) inspector.outerHTML = renderWikiInspectorHtml();
      }

      function wikiBlockElement(id) {
        return Array.from(document.querySelectorAll("[data-wiki-block]")).find(function(node) {
          return node.getAttribute("data-wiki-block") === id;
        }) || null;
      }

      function updateWikiBlockElement(block) {
        const node = wikiBlockElement(block.id);
        if (!node) return;
        node.setAttribute("style", wikiBlockStyle(block));
        // D: toggle shadow class for CSS-based shadow layer
        node.classList.toggle("wiki-block--shadowed", !!block.shadowEnabled);
        const media = node.querySelector("[data-wiki-media]");
        if (media) media.setAttribute("style", wikiMediaStyle(block));
        const content = node.querySelector("[data-wiki-text-content]");
        if (content) {
          autoFitWikiTextBlock(block, content);
          content.setAttribute("style", wikiTextContentStyle(block));
          node.setAttribute("style", wikiBlockStyle(block));
        }
      }

      function focusedWikiTextNode() {
        const active = document.activeElement?.closest?.("[data-wiki-text-content]");
        if (active) return active;
        const savedBlockId = state.wikiTextSelection?.blockId || "";
        const savedText = savedBlockId ? wikiBlockElement(savedBlockId)?.querySelector("[data-wiki-text-content]") : null;
        if (savedText) return savedText;
        const selection = window.getSelection?.();
        const anchor = selection?.anchorNode;
        const selectedText = anchor?.parentElement?.closest?.("[data-wiki-text-content]");
        if (selectedText) return selectedText;
        if (state.selectedWikiBlockId) {
          return wikiBlockElement(state.selectedWikiBlockId)?.querySelector("[data-wiki-text-content]") || null;
        }
        return null;
      }

      function rememberWikiTextSelection() {
        const selection = window.getSelection?.();
        if (!selection?.rangeCount) return;
        const range = selection.getRangeAt(0);
        const element = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
          ? range.commonAncestorContainer
          : range.commonAncestorContainer.parentElement;
        const textNode = element?.closest?.("[data-wiki-text-content]");
        if (!textNode) return;
        const blockId = textNode.closest("[data-wiki-block]")?.getAttribute("data-wiki-block") || "";
        if (!blockId) return;
        state.wikiTextSelection = { blockId, range: range.cloneRange() };
      }

      function restoreWikiTextSelection() {
        const saved = state.wikiTextSelection;
        const textNode = saved?.blockId ? wikiBlockElement(saved.blockId)?.querySelector("[data-wiki-text-content]") : null;
        if (!saved?.range || !textNode || !saved.range.startContainer?.isConnected || !textNode.contains(saved.range.commonAncestorContainer)) return null;
        const selection = window.getSelection?.();
        selection?.removeAllRanges();
        selection?.addRange(saved.range.cloneRange());
        return { selection, range: selection?.rangeCount ? selection.getRangeAt(0) : null, textNode };
      }

      function applyWikiSelectionMarkup(kind, value) {
        const restored = restoreWikiTextSelection();
        if (!restored?.range || restored.range.collapsed) {
          toast("Select the words you want to format first.", "error");
          return false;
        }
        const wrapper = kind === "bold"
          ? document.createElement("strong")
          : kind === "italic"
            ? document.createElement("em")
            : kind === "underline"
              ? document.createElement("u")
              : document.createElement("span");
        if (kind === "fontSize") wrapper.style.fontSize = wikiClamp(value, 8, 240) + "px";
        if (kind === "color" && /^#[0-9a-fA-F]{6}$/.test(value || "")) wrapper.style.color = value;
        if (kind === "fontFamily") {
          const familyNames = {
            serif: "Georgia",
            sans: '"Trebuchet MS"',
            display: "Georgia",
            script: '"Segoe Script"',
            mono: "Consolas",
            cod: '"Copperplate Gothic Bold"',
            "hero-king": '"Hero King"',
            "dragon-force": '"Dragon Force"',
            "tribal-dragon": '"Tribal Dragon"'
          };
          wrapper.style.fontFamily = familyNames[value] || "Georgia";
        }
        const fragment = restored.range.extractContents();
        wrapper.appendChild(fragment);
        restored.range.insertNode(wrapper);
        restored.range.selectNodeContents(wrapper);
        restored.selection?.removeAllRanges();
        restored.selection?.addRange(restored.range);
        rememberWikiTextSelection();
        const blockId = restored.textNode.closest("[data-wiki-block]")?.getAttribute("data-wiki-block") || "";
        const block = state.wikiBlocks.find(function(item) { return item.id === blockId; });
        if (block) {
          block.text = wikiPlainTextFromEditable(restored.textNode);
          block.richTextHtml = restored.textNode.innerHTML;
          autoFitWikiTextBlock(block, restored.textNode);
        }
        return true;
      }

      function insertWikiInlineImage(src) {
        if (!isWikiAssetSrc(src)) return false;
        const textNode = focusedWikiTextNode();
        if (!textNode) return false;
        const blockEl = textNode.closest("[data-wiki-block]");
        const blockId = blockEl?.getAttribute("data-wiki-block") || "";
        const block = state.wikiBlocks.find(function(item) { return item.id === blockId && item.type === "text"; });
        if (!block) return false;

        const restored = restoreWikiTextSelection();
        const selection = restored?.selection || window.getSelection?.();
        let range = restored?.textNode === textNode ? restored.range : (selection?.rangeCount ? selection.getRangeAt(0) : null);
        if (!range || !textNode.contains(range.commonAncestorContainer)) {
          range = document.createRange();
          range.selectNodeContents(textNode);
          range.collapse(false);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }

        const image = document.createElement("img");
        image.className = "wiki-inline-image";
        image.src = src;
        image.alt = "";
        image.setAttribute("data-wiki-inline-image", src);
        image.setAttribute("contenteditable", "false");
        image.setAttribute("draggable", "false");
        const spacer = document.createTextNode(" ");
        range.deleteContents();
        range.insertNode(spacer);
        range.insertNode(image);
        range.setStartAfter(spacer);
        range.collapse(true);
        selection?.removeAllRanges();
        selection?.addRange(range);
        block.text = wikiPlainTextFromEditable(textNode);
        block.richTextHtml = textNode.innerHTML;
        rememberWikiTextSelection();
        autoFitWikiTextBlock(block, textNode);
        return true;
      }

      function applyWikiBlockStyleChange(target) {
        if (!target?.matches?.("[data-wiki-block-style]")) return false;
        const block = selectedWikiBlock();
        if (!block) return true;
        syncWikiTextFromDom();
        const key = target.getAttribute("data-wiki-block-style");
        const raw = target.type === "checkbox" ? target.checked : target.value;
        if (["x", "y", "width", "height", "fontSizePx", "imagePositionX", "imagePositionY", "imageScale", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "shadowOpacity", "zIndex"].includes(key)) {
          block[key] = Number(raw || 0);
        } else {
          block[key] = raw;
        }
        Object.assign(block, sanitizeWikiBlock(block));
        updateWikiBlockElement(block);
        return true;
      }

      function applyWikiInlineStyleChange(target) {
        if (!target?.matches?.("[data-wiki-inline-style]")) return false;
        applyWikiSelectionMarkup(target.getAttribute("data-wiki-inline-style") || "", target.value || "");
        return true;
      }

      function insertWikiImageBlock(src, x, y) {
        if (!src) return;
        syncWikiTextFromDom();
        const mediaType = /^data:video\\//i.test(src) ? "video" : "image";
        const block = sanitizeWikiBlock({
          id: wikiBlockId(),
          type: mediaType,
          imageDataUrl: src,
          x: wikiClamp(Number.isFinite(x) ? x : 150, 0, WIKI_PAGE_WIDTH - 220),
          y: wikiClamp(Number.isFinite(y) ? y : 170 + (state.wikiBlocks.length * 24), 0, WIKI_MAX_PAGE_HEIGHT - 220),
          width: 220,
          height: 220,
          zIndex: Math.max(0, ...(state.wikiBlocks || []).map(function(item) { return Number(item.zIndex || 0); })) + 1
        });
        state.wikiBlocks.push(block);
        state.selectedWikiBlockId = block.id;
        refreshWikiBuilder();
      }

      function insertWikiTextBlock(afterBlockId) {
        syncWikiTextFromDom();
        const source = (state.wikiBlocks || []).find(function(item) { return String(item.id) === String(afterBlockId); }) || lastWikiTextBlock();
        const block = sanitizeWikiBlock({
          id: wikiBlockId(),
          type: "text",
          text: "New text block",
          x: source ? source.x : 110,
          y: source ? wikiClamp(Number(source.y || 0) + Number(source.height || 0) + 54, 0, WIKI_MAX_PAGE_HEIGHT - 110) : wikiClamp(140 + (state.wikiBlocks.length * 26), 0, WIKI_MAX_PAGE_HEIGHT - 110),
          width: source ? source.width : 420,
          height: 110,
          fontFamily: source?.fontFamily || "serif",
          fontSize: source?.fontSize || "medium",
          fontSizePx: source?.fontSizePx || wikiFontSizePx(source?.fontSize || "medium"),
          align: source?.align || "center",
          color: source?.color || "#3f2a13",
          zIndex: Math.max(0, ...(state.wikiBlocks || []).map(function(item) { return Number(item.zIndex || 0); })) + 1
        });
        state.wikiBlocks.push(block);
        state.selectedWikiBlockId = block.id;
        refreshWikiBuilder();
      }

      function openWikiPage(page) {
        if (!memberModal || !memberModalContent) return;
        state.wikiReaderZoom = 1;
        memberModalContent.dataset.wikiId = page.id || "";
        memberModalContent.innerHTML =
          '<div class="member-profile-hero">' +
            '<img class="profile-avatar" src="/assets/icons/embed-sender.png" alt="" />' +
            '<div><span class="profile-kicker">Kella Wiki</span><h3 id="memberModalTitle">' + escapeHtml(page.title || "Wiki Page") + '</h3><div class="profile-subtitle">By ' + escapeHtml(page.author || page.createdBy || "Kella Officer") + '</div></div>' +
          '</div>' +
          wikiArticleMarkup(page, false);
        memberModal.classList.add("wiki-modal");
        memberModal.classList.add("open");
        memberModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        requestAnimationFrame(fitWikiReader);
      }

      async function renderWiki(slug = "") {
        skeleton("Loading wiki...");
        try {
          const pages = await loadWiki();
          if (slug) {
            const decodedSlug = decodeURIComponent(String(slug || ""));
            const page = pages.find(function(item) { return String(item.slug || "") === decodedSlug; });
            if (!page || (!hasWikiEditAccess() && page.status !== "Published")) {
              app.innerHTML = pageHeader("Kella Wiki", "", '<button class="secondary" data-link-button="/wiki">Back to Wiki</button>') +
                '<div class="empty">This wiki page could not be found.</div>';
              return;
            }
            state.wikiReaderZoom = 1;
            app.innerHTML = pageHeader(escapeHtml(page.title || "Kella Wiki"), "By " + escapeHtml(page.author || page.createdBy || "Kella Officer"), '<button class="secondary" data-link-button="/wiki">Back to Wiki</button>') +
              '<section class="card wiki-shared-reader">' + wikiArticleMarkup(page, false) + '</section>';
            requestAnimationFrame(fitWikiReader);
            return;
          }
          const actions = hasWikiEditAccess() ? '<button class="primary" data-action="clear-wiki-form">Create Wiki</button>' : "";
          app.innerHTML =
            pageHeader("Kella Wiki", "", actions) +
            (hasWikiEditAccess() ? renderWikiEditor() : "") +
            renderWikiLibrary(pages);
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load wiki. ' + escapeHtml(error.message) + '</div>';
        }
      }

      function buffScheduleRows(schedule) {
        const today = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", weekday: "long" }).format(new Date());
        const editable = hasAdminAccess();
        return (schedule.days || defaultBuffSchedule).map(function(item) {
          const type = buffTypes[item.buff] || buffTypes.Gathering;
          const options = Object.keys(buffTypes).map(function(key) {
            return '<option value="' + escapeHtml(key) + '"' + (key === item.buff ? " selected" : "") + '>' + escapeHtml(buffTypes[key].label) + '</option>';
          }).join("");
          const adminSetting = editable
            ? '<div class="buff-admin-setting"><select data-buff-day-select data-buff-day="' + escapeHtml(item.day) + '">' + options + '</select><input data-buff-day-note data-buff-day="' + escapeHtml(item.day) + '" value="' + escapeHtml(item.note || "") + '" placeholder="Optional note" maxlength="160" /></div>'
            : '<span class="buff-readonly">Weekly schedule</span>';
          return '<article class="buff-day-row' + (item.day === today ? " is-today" : "") + '" data-buff-row data-buff-day="' + escapeHtml(item.day) + '">' +
            '<div class="buff-day-name">' + escapeHtml(item.day) + (item.day === today ? '<span class="buff-today">Today</span>' : '') + '</div>' +
            '<div class="buff-current"><img class="buff-icon" data-buff-icon src="' + escapeHtml(type.icon) + '" alt="" /><div><h3 data-buff-label>' + escapeHtml(type.label) + '</h3><p data-buff-description>' + escapeHtml(type.description) + '</p><span class="buff-note" data-buff-note' + (item.note ? "" : ' hidden') + '>' + escapeHtml(item.note || "") + '</span></div></div>' +
            adminSetting +
          '</article>';
        }).join("");
      }

      function readBuffScheduleForm() {
        return Array.from(document.querySelectorAll("[data-buff-row]")).map(function(row) {
          return {
            day: row.getAttribute("data-buff-day") || "",
            buff: row.querySelector("[data-buff-day-select]")?.value || "Gathering",
            note: row.querySelector("[data-buff-day-note]")?.value.trim() || ""
          };
        });
      }

      function buffDatedOverridesHtml(schedule) {
        const overrides = (schedule.datedBuffs || []).slice().sort(function(left, right) {
          return String(left.date || "").localeCompare(String(right.date || ""));
        });
        if (!overrides.length) return "";
        return '<section class="card"><div class="card-header"><div><h3>Date Overrides</h3><span class="muted">These dates replace the normal weekly buff and are shared with the Event Calendar.</span></div></div><div class="buff-date-list">' + overrides.map(function(item) {
          const type = buffTypes[item.buff] || buffTypes.Gathering;
          return '<article class="buff-date-item"><img src="' + escapeHtml(type.icon) + '" alt="" /><div><h4>' + escapeHtml(type.label) + '</h4><span>' + escapeHtml(item.date || "") + ' - ' + escapeHtml(item.day || "") + ' - ' + escapeHtml(item.timeUtc || "14:00") + ' UTC' + (item.note ? '<br>' + escapeHtml(item.note) : "") + '</span></div>' + (hasAdminAccess() ? '<button class="danger" type="button" data-action="delete-calendar-buff" data-calendar-date="' + escapeHtml(item.date || "") + '">Remove</button>' : "") + '</article>';
        }).join("") + '</div></section>';
      }

      async function renderBuffSchedule() {
        skeleton("Loading weekly buff schedule...");
        try {
          const schedule = await loadBuffSchedule();
          const actions = hasAdminAccess()
            ? '<button class="secondary" type="button" data-action="reset-buff-schedule">Reset to Default</button>' + buffDiscordToggleHtml("data-buff-send-discord") + '<button class="primary" type="button" data-action="save-buff-schedule">Save Schedule</button>'
            : "";
          const updated = schedule.updatedAt
            ? 'Last saved ' + formatDateTime(schedule.updatedAt) + ' by ' + escapeHtml(schedule.updatedBy || "Kella officer")
            : "Using Kella's recommended weekly schedule";
          app.innerHTML =
            pageHeader("Weekly Buff Schedule", "The real alliance buff plan for every day of the week.", actions) +
            '<div class="buff-schedule-shell">' +
              '<section class="buff-notice"><img src="/assets/buffs/buff-schedule.png" alt="" /><div><strong>War Time Override</strong><span>Buffs may change when alliance strategy requires it.</span></div></section>' +
              '<section class="card buff-week"><div class="buff-week-heading"><span>Day of week</span><span>Current buff</span><span>' + (hasAdminAccess() ? "Admin setting" : "Schedule") + '</span></div>' + buffScheduleRows(schedule) + '</section>' +
              buffDatedOverridesHtml(schedule) +
              '<div class="buff-footer"><img src="/assets/buffs/buff-schedule.png" alt="" /><div><strong>Call of Dragons server time - UTC</strong><span>Buffs scheduled at 14:00 UTC. (time may change depends on situation)</span></div></div>' +
              '<div class="buff-updated">' + updated + '</div>' +
            '</div>';
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load the buff schedule. ' + escapeHtml(error.message) + '</div>';
        }
      }

      function trainingValue(selector, fallback = 0) {
        const value = Number(document.querySelector(selector)?.value ?? fallback);
        return Number.isFinite(value) ? Math.max(0, value) : Math.max(0, fallback);
      }

      function trainingDuration(seconds) {
        const totalMinutes = Math.max(0, Math.ceil(Number(seconds || 0) / 60));
        const days = Math.floor(totalMinutes / 1440);
        const hours = Math.floor((totalMinutes % 1440) / 60);
        const minutes = totalMinutes % 60;
        const parts = [];
        if (days) parts.push(days + "d");
        if (hours || days) parts.push(hours + "h");
        parts.push(minutes + "m");
        return parts.join(" ");
      }

      function trainingTierLabel(key) {
        return trainingTiers[key]?.label || key;
      }

      function trainingTierCell(key) {
        const tier = trainingTiers[key];
        const badge = key.startsWith("p") ? "UP" : tier.label;
        return '<span class="training-tier"><span class="training-tier-badge">' + escapeHtml(badge) + '</span>' + escapeHtml(tier.label) + '</span>';
      }

      function trainingSummaryCard(label, value) {
        return '<div class="training-summary"><span>' + escapeHtml(label) + '</span><strong>' + escapeHtml(value) + '</strong></div>';
      }

      function trainingCompactNumber(value) {
        const number = Math.max(0, Number(value) || 0);
        const scales = [
          { value: 1000000000, suffix: "B" },
          { value: 1000000, suffix: "M" },
          { value: 1000, suffix: "K" }
        ];
        const scale = scales.find(function(item) { return number >= item.value; });
        if (!scale) return formatNumber(Math.floor(number));
        const compact = number / scale.value;
        const digits = compact >= 100 ? 0 : compact >= 10 ? 1 : 2;
        return String(Number(compact.toFixed(digits))) + scale.suffix;
      }

      function trainingCompactValue(value) {
        return '<span class="training-compact-value" title="' + escapeHtml(formatNumber(Math.floor(Number(value) || 0))) + '">' + escapeHtml(trainingCompactNumber(value)) + '</span>';
      }

      function trainingSelectedTroopType() {
        const selected = document.querySelector("[data-training-troop-type]")?.value || state.trainingTroopType || "cavalry";
        state.trainingTroopType = Object.prototype.hasOwnProperty.call(trainingTroopTypes, selected) ? selected : "cavalry";
        return state.trainingTroopType;
      }

      function trainingResourceTotals(key, units, troopType) {
        const cost = trainingResourceCosts[key]?.[troopType] || trainingResourceCosts[key]?.cavalry || {};
        return trainingResourceOrder.reduce(function(total, resource) {
          total[resource] = Math.max(0, Math.floor((Number(units) || 0) * (Number(cost[resource]) || 0)));
          return total;
        }, {});
      }

      function addTrainingResources(total, resources) {
        trainingResourceOrder.forEach(function(resource) {
          total[resource] = (Number(total[resource]) || 0) + (Number(resources[resource]) || 0);
        });
        return total;
      }

      function trainingResourcesCell(resources) {
        return '<div class="training-resource-list">' + trainingResourceOrder.map(function(resource) {
          return '<span class="training-resource training-resource-' + resource + '"><img src="' + resourceIconPaths[resource] + '" alt="" loading="lazy" /><small>' + escapeHtml(trainingResourceLabels[resource]) + '</small><strong>' + trainingCompactValue(resources[resource]) + '</strong></span>';
        }).join("") + '</div>';
      }

      function trainingResourceSummary(resources) {
        return '<div class="training-resource-summary"><div class="training-resource-summary-title"><strong>Resources Needed</strong><span>Ore, Mana, Wood, and Gold.</span></div>' + trainingResourcesCell(resources) + '</div>';
      }

      function trainingResourcesText(resources) {
        return trainingResourceOrder.map(function(resource) {
          return trainingResourceLabels[resource] + " " + trainingCompactNumber(resources[resource]);
        }).join(" | ");
      }

      function trainingTroopInputs(scope) {
        return '<div class="training-troop-inputs">' + trainingTierOrder.map(function(key) {
          return '<label>' + escapeHtml(trainingTierLabel(key)) + '<input type="number" min="0" step="1" inputmode="numeric" value="0" data-training-input data-training-' + scope + '="' + key + '" /></label>';
        }).join("") + '</div>';
      }

      function emptyTrainingResources() {
        return { ore: 0, mana: 0, wood: 0, gold: 0 };
      }

      function trainingMixedTroopRows() {
        return '<div class="training-mix-troops">' + Object.entries(trainingTroopTypes).map(function(entry) {
          return '<label class="training-mix-row"><strong>' + escapeHtml(entry[1]) + '</strong><input type="range" min="0" max="0" step="1" value="0" data-training-input data-training-mix-range="' + entry[0] + '" aria-label="' + escapeHtml(entry[1]) + ' allocation" /><input type="number" min="0" max="0" step="1" inputmode="numeric" value="0" data-training-input data-training-mix-unit="' + entry[0] + '" aria-label="' + escapeHtml(entry[1]) + ' units" /><output data-training-mix-percent="' + entry[0] + '">0%</output></label>';
        }).join("") + '</div>';
      }

      function lordDefaultData() {
        const troops = {};
        lordUnitTypes.forEach(function(unit) {
          troops[unit] = {};
          lordTiers.forEach(function(tier) { troops[unit][tier] = 0; });
        });
        const pairings = {};
        ["Infantry", "Cavalry", "Marksman", "Mage"].forEach(function(unit) {
          pairings[unit] = { mainHero: "", deputyHero: "", artifact: "", pet: "", notes: "" };
        });
        return {
          identity: { name: "", server: "881", lordId: "", faction: "league_of_order" },
          troops,
          speedups: { universal: 0, training: 0, building: 0, research: 0 },
          heroes: {},
          artifacts: {},
          research: {},
          researchSettings: {
            faction: "league_of_order",
            allianceCenter: 25,
            speed: 70,
            helps: 30,
            heightsOfPower: false
          },
          buildings: {},
          warPet: { pet: "", buildName: "", notes: "" },
          decorations: {},
          pairings,
          calculators: {
            researchHours: 24,
            researchBuff: 20,
            researchDays: 0,
            buildingHours: 24,
            buildingBuff: 20,
            buildingDays: 0,
            wounded: 100000,
            woundedTier: "t4",
            healingBuff: 20,
            eventDays: 7,
            dailyHours: 2
          },
          updatedAt: ""
        };
      }

      function lordMerge(target, source) {
        if (!source || typeof source !== "object") return target;
        Object.keys(source).forEach(function(key) {
          if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
            if (!target[key] || typeof target[key] !== "object") target[key] = {};
            lordMerge(target[key], source[key]);
          } else {
            target[key] = source[key];
          }
        });
        return target;
      }

      function loadLordToolsData() {
        if (state.lordTools) return state.lordTools;
        let saved = {};
        try { saved = JSON.parse(localStorage.getItem(LORD_TOOLS_KEY) || "{}"); } catch (error) { saved = {}; }
        state.lordTools = lordMerge(lordDefaultData(), saved);
        if (!state.lordTools.identity.name && state.profile) {
          state.lordTools.identity.name = state.profile.ign || memberDisplayName(state.profile) || "";
          state.lordTools.identity.lordId = memberLordId(state.profile) || "";
        }
        return state.lordTools;
      }

      function saveLordToolsData(showMessage) {
        const data = loadLordToolsData();
        data.updatedAt = new Date().toISOString();
        localStorage.setItem(LORD_TOOLS_KEY, JSON.stringify(data));
        const status = document.querySelector("[data-lord-save-status]");
        if (status) status.textContent = "Saved " + formatDateTime(data.updatedAt);
        if (showMessage) toast("My Lord profile saved.");
      }

      function lordSetPath(path, value) {
        const parts = String(path || "").split(".").filter(Boolean);
        if (!parts.length) return;
        let target = loadLordToolsData();
        parts.forEach(function(part, index) {
          if (index === parts.length - 1) target[part] = value;
          else {
            if (!target[part] || typeof target[part] !== "object") target[part] = {};
            target = target[part];
          }
        });
        saveLordToolsData(false);
      }

      function lordNumber(value) {
        const parsed = Number(value || 0);
        return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
      }

      function lordAssetList(items) {
        const seen = new Set();
        return (items || []).filter(function(item) {
          const name = String(item.label || "").replace(/\\s+Icon$/i, "").trim();
          if (!name || /\\s+Icon$/i.test(String(item.label || "")) || seen.has(name.toLowerCase())) return false;
          seen.add(name.toLowerCase());
          item.lordName = name;
          return true;
        });
      }

      function lordHeroList() { return lordAssetList(wikiHeroImages); }
      function lordArtifactList() { return lordAssetList(wikiArtifactImages); }
      function lordPetList() { return lordAssetList(wikiPetImages); }

      function lordSelectOptions(items, selected, placeholder) {
        return '<option value="">' + escapeHtml(placeholder || "Choose") + '</option>' + items.map(function(item) {
          const value = item.lordName || item.label || item;
          return '<option value="' + escapeHtml(value) + '"' + (value === selected ? ' selected' : '') + '>' + escapeHtml(value) + '</option>';
        }).join("");
      }

      function lordTroopTotal(data) {
        return lordUnitTypes.reduce(function(total, unit) {
          return total + lordTiers.reduce(function(unitTotal, tier) { return unitTotal + lordNumber(data.troops?.[unit]?.[tier]); }, 0);
        }, 0);
      }

      function lordCollectionCount(collection) {
        return Object.values(collection || {}).filter(function(item) { return lordNumber(item?.level) > 0 || item?.owned; }).length;
      }

      function lordCompletion(data) {
        const checks = [
          Boolean(data.identity.name && data.identity.lordId),
          lordTroopTotal(data) > 0,
          Object.values(data.speedups || {}).some(function(value) { return lordNumber(value) > 0; }),
          lordCollectionCount(data.heroes) > 0,
          lordCollectionCount(data.artifacts) > 0,
          Object.values(data.research || {}).some(function(value) { return lordNumber(value) > 0; }),
          Object.values(data.buildings || {}).some(function(value) { return lordNumber(value) > 0; }),
          Boolean(data.warPet.pet),
          lordCollectionCount(data.decorations) > 0,
          Object.values(data.pairings || {}).some(function(item) { return Boolean(item.mainHero || item.deputyHero); })
        ];
        return Math.round((checks.filter(Boolean).length / checks.length) * 100);
      }

      function lordSummaryText() {
        const data = loadLordToolsData();
        const activeDecorations = Object.entries(data.decorations || {}).filter(function(entry) { return entry[1]?.active; }).map(function(entry) { return entry[0]; });
        const marches = Object.entries(data.pairings || {}).filter(function(entry) { return entry[1]?.mainHero; }).map(function(entry) {
          return entry[0] + ": " + entry[1].mainHero + (entry[1].deputyHero ? " + " + entry[1].deputyHero : "");
        });
        return [
          "KELLA - MY LORD",
          data.identity.name || "Unnamed commander",
          "Server " + (data.identity.server || "-") + " | Lord ID " + (data.identity.lordId || "-"),
          "Troops: " + formatNumber(lordTroopTotal(data)),
          "Heroes: " + lordCollectionCount(data.heroes) + " | Artifacts: " + lordCollectionCount(data.artifacts),
          "Research nodes started: " + Object.values(data.research || {}).filter(function(value) { return lordNumber(value) > 0; }).length,
          "Buildings tracked: " + Object.values(data.buildings || {}).filter(function(value) { return lordNumber(value) > 0; }).length,
          "Speedups: " + formatNumber(Object.values(data.speedups || {}).reduce(function(sum, value) { return sum + lordNumber(value); }, 0)) + " days",
          "Active decorations: " + (activeDecorations.join(", ") || "None"),
          marches.length ? "Marches:\\n" + marches.join("\\n") : "Marches: None"
        ].join("\\n");
      }

      function lordOverview(data) {
        const heroes = lordCollectionCount(data.heroes);
        const artifacts = lordCollectionCount(data.artifacts);
        const speedups = Object.values(data.speedups || {}).reduce(function(total, value) { return total + lordNumber(value); }, 0);
        const completion = lordCompletion(data);
        const quickTools = [
          { view: "troops", icon: "/assets/icons/training-tools.png", title: "Troop Ledger", text: "Record every troop type from T1 through T5." },
          { view: "heroes", icon: lordHeroList()[0]?.src || "/assets/icons/members.png", title: "Hero Collection", text: "Track levels, stars, and all four skills." },
          { view: "artifacts", icon: lordArtifactList()[0]?.src || "/assets/icons/settings.png", title: "Artifact Vault", text: "Track artifact levels and exemplar unlocks." },
          { view: "research", icon: "/assets/research/economy/league_of_order/114.png", title: "Research Progress", text: "Track every League of Order economy research level." },
          { view: "buildings", icon: "/assets/buffs/construction.png", title: "Building Levels", text: "Keep city and troop-building levels together." },
          { view: "pairings", icon: "/assets/wiki-misc/img-planner-infantry.png", title: "March Pairings", text: "Build four reusable hero, pet, and artifact marches." },
          { view: "calculators", icon: "/assets/icons/training-tools.png", title: "Planning Calculators", text: "Estimate research, buildings, healing, and event reserves." },
          { path: "/training-tools", icon: "/assets/icons/training-tools.png", title: "Training Tools", text: "Open Kella's full troop and resource calculator." }
        ];
        return '<section class="lord-panel">' +
          '<div class="lord-grid">' +
            '<div class="lord-summary-card"><span>Profile complete</span><strong>' + completion + '%</strong><div class="lord-progress" style="--lord-progress:' + completion + '%"><i></i></div></div>' +
            '<div class="lord-summary-card"><span>Total troops</span><strong>' + escapeHtml(trainingCompactNumber(lordTroopTotal(data))) + '</strong></div>' +
            '<div class="lord-summary-card"><span>Owned collection</span><strong>' + formatNumber(heroes + artifacts) + '</strong></div>' +
            '<div class="lord-summary-card"><span>Speedups</span><strong>' + escapeHtml(trainingCompactNumber(speedups)) + 'd</strong></div>' +
          '</div>' +
          '<div class="lord-section-heading"><div><h3>Commander tools</h3><p>Everything in one profile, without spreadsheet hopping.</p></div></div>' +
          '<div class="lord-tool-grid">' + quickTools.map(function(item) {
            const attr = item.path ? 'data-link-button="' + item.path + '"' : 'data-action="lord-view" data-lord-view="' + item.view + '"';
            return '<button class="lord-tool-card" type="button" ' + attr + '><img src="' + escapeHtml(item.icon) + '" alt="" loading="lazy" /><span><strong>' + escapeHtml(item.title) + '</strong><span>' + escapeHtml(item.text) + '</span></span></button>';
          }).join("") + '</div>' +
        '</section>';
      }

      function lordIdentityPanel(data) {
        const fields = [
          { key: "name", label: "In-game name", placeholder: "Commander name" },
          { key: "server", label: "Server", placeholder: "881" },
          { key: "lordId", label: "Lord ID", placeholder: "Numeric player ID" },
          { key: "faction", label: "Faction", placeholder: "League of Order" }
        ];
        return '<section class="card lord-form"><div class="lord-section-heading"><div><h3>Commander Identity</h3><p>Your Kella profile header and in-game identifiers.</p></div></div><div class="form-grid">' + fields.map(function(field) {
          return '<label>' + field.label + '<input value="' + escapeHtml(data.identity[field.key] || "") + '" placeholder="' + escapeHtml(field.placeholder) + '" data-lord-field="identity.' + field.key + '" /></label>';
        }).join("") + '</div></section>';
      }

      function lordTroopsPanel(data) {
        return '<section class="card lord-form"><div class="lord-section-heading"><div><h3>Troop Ledger</h3><p>Enter current units by class and tier.</p></div><strong>' + formatNumber(lordTroopTotal(data)) + ' total</strong></div><div class="table-wrap"><table class="lord-table"><thead><tr><th>Unit Type</th>' + lordTiers.map(function(tier) { return '<th>' + tier.toUpperCase() + '</th>'; }).join("") + '<th>Total</th></tr></thead><tbody>' + lordUnitTypes.map(function(unit) {
          const total = lordTiers.reduce(function(sum, tier) { return sum + lordNumber(data.troops?.[unit]?.[tier]); }, 0);
          return '<tr><td><strong>' + unit + '</strong></td>' + lordTiers.map(function(tier) {
            return '<td><input type="number" min="0" step="1" inputmode="numeric" value="' + lordNumber(data.troops?.[unit]?.[tier]) + '" data-lord-troop-unit="' + unit + '" data-lord-troop-tier="' + tier + '" /></td>';
          }).join("") + '<td><strong>' + formatNumber(total) + '</strong></td></tr>';
        }).join("") + '</tbody></table></div></section>';
      }

      function lordSpeedupsPanel(data) {
        const types = [
          { key: "universal", label: "Universal", icon: "/assets/icons/lord-tools.svg" },
          { key: "training", label: "Training", icon: "/assets/buffs/training.png" },
          { key: "building", label: "Building", icon: "/assets/buffs/construction.png" },
          { key: "research", label: "Research", icon: "/assets/buffs/research.png" }
        ];
        return '<section class="lord-panel"><div class="lord-section-heading"><div><h3>Speedup Inventory</h3><p>Store totals in days. Calculators use these reserves.</p></div></div><div class="lord-speedups">' + types.map(function(item) {
          return '<label class="lord-speedup-card"><img src="' + item.icon + '" alt="" /><strong>' + item.label + '</strong><input type="number" min="0" step="0.01" value="' + lordNumber(data.speedups[item.key]) + '" data-lord-field="speedups.' + item.key + '" /><small>days</small></label>';
        }).join("") + '</div></section>';
      }

      function lordHeroesPanel(data) {
        const heroes = lordHeroList();
        return '<section class="lord-panel"><div class="lord-section-heading"><div><h3>Hero Collection</h3><p>Track level, stars, and skill progress.</p></div><span>' + lordCollectionCount(data.heroes) + ' owned</span></div><div class="lord-catalog-toolbar"><input type="search" value="' + escapeHtml(state.lordSearch || "") + '" placeholder="Search heroes..." data-lord-search="hero" /><button class="secondary" type="button" data-action="lord-clear-search">Clear</button></div><div class="lord-catalog" data-lord-catalog="hero">' + heroes.map(function(hero) {
          const item = data.heroes[hero.lordName] || {};
          const term = hero.lordName.toLowerCase();
          const hidden = state.lordSearch && !term.includes(state.lordSearch.toLowerCase());
          return '<article class="lord-catalog-card' + (hidden ? ' hidden' : '') + '" data-lord-catalog-item="' + escapeHtml(term) + '"><div class="lord-catalog-head"><img src="' + escapeHtml(hero.src) + '" alt="" loading="lazy" /><span><strong>' + escapeHtml(hero.lordName) + '</strong><small>Hero progress</small></span><button class="lord-pill" type="button" data-action="lord-hero-max" data-lord-name="' + escapeHtml(hero.lordName) + '">Max</button></div><div class="lord-catalog-fields"><label>Level<input type="number" min="0" max="60" value="' + lordNumber(item.level) + '" data-lord-hero="' + escapeHtml(hero.lordName) + '" data-lord-prop="level" /></label><label>Stars<input type="number" min="0" max="6" value="' + lordNumber(item.stars) + '" data-lord-hero="' + escapeHtml(hero.lordName) + '" data-lord-prop="stars" /></label></div><div class="lord-skill-row">' + [1,2,3,4].map(function(skill) { return '<input aria-label="Skill ' + skill + '" type="number" min="0" max="5" value="' + lordNumber(item["skill" + skill]) + '" data-lord-hero="' + escapeHtml(hero.lordName) + '" data-lord-prop="skill' + skill + '" />'; }).join("") + '</div></article>';
        }).join("") + '</div></section>';
      }

      function lordArtifactsPanel(data) {
        const artifacts = lordArtifactList();
        return '<section class="lord-panel"><div class="lord-section-heading"><div><h3>Artifact Vault</h3><p>Record artifact level and exemplar status.</p></div><span>' + lordCollectionCount(data.artifacts) + ' owned</span></div><div class="lord-catalog-toolbar"><input type="search" value="' + escapeHtml(state.lordSearch || "") + '" placeholder="Search artifacts..." data-lord-search="artifact" /><button class="secondary" type="button" data-action="lord-clear-search">Clear</button></div><div class="lord-catalog" data-lord-catalog="artifact">' + artifacts.map(function(artifact) {
          const item = data.artifacts[artifact.lordName] || {};
          const term = artifact.lordName.toLowerCase();
          const hidden = state.lordSearch && !term.includes(state.lordSearch.toLowerCase());
          return '<article class="lord-catalog-card' + (hidden ? ' hidden' : '') + '" data-lord-catalog-item="' + escapeHtml(term) + '"><div class="lord-catalog-head"><img src="' + escapeHtml(artifact.src) + '" alt="" loading="lazy" /><span><strong>' + escapeHtml(artifact.lordName) + '</strong><small>Artifact progress</small></span><button class="lord-pill' + (item.exemplar ? ' on' : '') + '" type="button" data-action="lord-artifact-exemplar" data-lord-name="' + escapeHtml(artifact.lordName) + '">Exemplar</button></div><label>Level<input type="number" min="0" max="5" value="' + lordNumber(item.level) + '" data-lord-artifact="' + escapeHtml(artifact.lordName) + '" data-lord-prop="level" /></label></article>';
        }).join("") + '</div></section>';
      }

      function lordWarPetPanel(data) {
        const pets = lordPetList();
        const selected = pets.find(function(item) { return item.lordName === data.warPet.pet; });
        return '<section class="card lord-form"><div class="lord-section-heading"><div><h3>War Pet Build</h3><p>Keep your preferred pet and build notes with your commander profile.</p></div></div><div class="lord-pet-preview"><img src="' + escapeHtml(selected?.src || "/assets/icons/lord-tools.svg") + '" alt="" data-lord-pet-image /><div class="form-grid"><label>War Pet<select data-lord-field="warPet.pet" data-lord-pet-select>' + lordSelectOptions(pets, data.warPet.pet, "Choose a war pet") + '</select></label><label>Build name<input value="' + escapeHtml(data.warPet.buildName || "") + '" placeholder="PvP cavalry build" data-lord-field="warPet.buildName" /></label><label class="full">Build notes<textarea rows="5" placeholder="Talents, attributes, and intended march..." data-lord-field="warPet.notes">' + escapeHtml(data.warPet.notes || "") + '</textarea></label></div></div></section>';
      }

      function lordDecorationsPanel(data) {
        const activeCount = Object.values(data.decorations || {}).filter(function(item) { return item?.active; }).length;
        return '<section class="lord-panel"><div class="lord-section-heading"><div><h3>City Decorations</h3><p>Track levels and choose up to five active bonuses.</p></div><span class="lord-active-decorations" data-lord-active-count>' + activeCount + ' / 5 active</span></div><div class="lord-catalog">' + lordDecorationNames.map(function(name) {
          const item = data.decorations[name] || {};
          return '<article class="lord-catalog-card"><div class="lord-catalog-head"><img src="/assets/icons/dashboard.png" alt="" loading="lazy" /><span><strong>' + escapeHtml(name) + '</strong><small>City decoration</small></span><button class="lord-pill' + (item.active ? ' on' : '') + '" type="button" data-action="lord-decoration-active" data-lord-name="' + escapeHtml(name) + '">' + (item.active ? 'Active' : 'Inactive') + '</button></div><label>Level<input type="number" min="0" max="9" value="' + lordNumber(item.level) + '" data-lord-decoration="' + escapeHtml(name) + '" data-lord-prop="level" /></label></article>';
        }).join("") + '</div></section>';
      }

      function lordPairingsPanel(data) {
        const heroes = lordHeroList();
        const artifacts = lordArtifactList();
        const pets = lordPetList();
        return '<section class="lord-panel"><div class="lord-section-heading"><div><h3>March Pairings</h3><p>Save a main hero, deputy, artifact, and pet for each combat class.</p></div></div><div class="lord-pairings">' + Object.entries(data.pairings || {}).map(function(entry) {
          const unit = entry[0];
          const pair = entry[1] || {};
          return '<article class="lord-pair-card"><h4>' + escapeHtml(unit) + ' March</h4><div class="form-grid"><label>Main Hero<select data-lord-pair="' + unit + '" data-lord-prop="mainHero">' + lordSelectOptions(heroes, pair.mainHero, "Choose main hero") + '</select></label><label>Deputy Hero<select data-lord-pair="' + unit + '" data-lord-prop="deputyHero">' + lordSelectOptions(heroes, pair.deputyHero, "Choose deputy") + '</select></label><label>Artifact<select data-lord-pair="' + unit + '" data-lord-prop="artifact">' + lordSelectOptions(artifacts, pair.artifact, "Choose artifact") + '</select></label><label>War Pet<select data-lord-pair="' + unit + '" data-lord-prop="pet">' + lordSelectOptions(pets, pair.pet, "Choose pet") + '</select></label><label class="full">Notes<input value="' + escapeHtml(pair.notes || "") + '" placeholder="Purpose, formation, or swap..." data-lord-pair="' + unit + '" data-lord-prop="notes" /></label></div></article>';
        }).join("") + '</div></section>';
      }

      function lordResearchSettings(data) {
        data.researchSettings = data.researchSettings || {};
        const defaults = lordDefaultData().researchSettings;
        Object.keys(defaults).forEach(function(key) {
          if (typeof data.researchSettings[key] === "undefined") data.researchSettings[key] = defaults[key];
        });
        const factionAliases = {
          "League of Order": "league_of_order",
          "Springwardens": "springwardens",
          "Wilderburg": "wilderburg"
        };
        data.researchSettings.faction = factionAliases[data.researchSettings.faction] || data.researchSettings.faction || "league_of_order";
        return data.researchSettings;
      }

      function lordResearchTreeKey() {
        return state.lordResearchTree === "military" ? "military" : "economy";
      }

      function lordResearchCurrentNodes() {
        lordResearchNodes = lordResearchTrees[lordResearchTreeKey()] || lordResearchTrees.economy;
        return lordResearchNodes;
      }

      function lordResearchTier(node) {
        if (node.quality) return node.quality;
        if (node.col <= 4) return "t1";
        if (node.col <= 9) return "t2";
        if (node.col <= 13) return "t3";
        if (node.col <= 17) return "t4";
        return "t5";
      }

      function lordResearchLevelKey(node) {
        return lordResearchTreeKey() + ":" + node.id;
      }

      function lordResearchNodeLevel(data, node) {
        const key = lordResearchLevelKey(node);
        const legacy = lordResearchTreeKey() === "economy" ? data.research?.[node.id] : 0;
        return Math.max(0, Math.min(node.max, Math.round(lordNumber(data.research?.[key] ?? legacy))));
      }

      function lordResearchSetNodeLevel(data, node, value) {
        data.research = data.research || {};
        data.research[lordResearchLevelKey(node)] = Math.max(0, Math.min(node.max, Math.round(lordNumber(value))));
      }

      function lordResearchTotals(data) {
        const settings = lordResearchSettings(data);
        const totals = { seconds: 0, gold: 0, wood: 0, ore: 0, mana: 0 };
        const costs = lordResearchCostsByTree[lordResearchTreeKey()] || {};
        lordResearchCurrentNodes().forEach(function(node) {
          const levels = costs[node.id] || [];
          const currentLevel = lordResearchNodeLevel(data, node);
          const current = levels[currentLevel] || levels[0] || {};
          const maximum = levels[node.max] || levels[levels.length - 1] || {};
          Object.keys(totals).forEach(function(key) {
            totals[key] += Math.max(0, lordNumber(maximum[key]) - lordNumber(current[key]));
          });
        });
        const eventSpeed = settings.heightsOfPower ? 15 : 0;
        const speedMultiplier = 1 + ((lordNumber(settings.speed) + eventSpeed) / 100);
        totals.seconds = totals.seconds / speedMultiplier;
        return totals;
      }

      function lordResearchSummaryHtml(data) {
        const totals = lordResearchTotals(data);
        const totalSeconds = Math.max(0, Math.round(totals.seconds));
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const exactDuration = days.toLocaleString() + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
        const resourceTotal = function(resource, value) {
          return '<span class="lord-research-resource" title="' + trainingResourceLabels[resource] + ' left"><img src="' + resourceIconPaths[resource] + '" alt="" loading="lazy" /><strong>' + trainingCompactNumber(value) + '</strong></span>';
        };
        return '<div class="lord-research-summary-title">' + lordResearchTreeKey().toUpperCase() + ' &mdash; TREE TOTALS</div>' +
          '<div class="lord-research-summary-speed"><span>Speedups left</span><strong>' + exactDuration + '</strong></div>' +
          '<div class="lord-research-summary-resources"><span>Resources left</span>' + resourceTotal("gold", totals.gold) + resourceTotal("wood", totals.wood) + resourceTotal("ore", totals.ore) + resourceTotal("mana", totals.mana) + '</div>';
      }

      function lordResearchTreeHtml(data) {
        lordResearchCurrentNodes();
        const iconSize = 48;
        const nodeWidth = 84;
        const colStep = 120;
        const rowStep = 120;
        const padding = 60;
        const minCol = Math.min.apply(null, lordResearchNodes.map(function(node) { return node.col; }));
        const maxCol = Math.max.apply(null, lordResearchNodes.map(function(node) { return node.col; }));
        const minRow = Math.min.apply(null, lordResearchNodes.map(function(node) { return node.row; }));
        const maxRow = Math.max.apply(null, lordResearchNodes.map(function(node) { return node.row; }));
        const globalCenter = (minRow + maxRow) / 2;
        const columnRows = {};
        lordResearchNodes.forEach(function(node) {
          if (!columnRows[node.col]) columnRows[node.col] = [];
          columnRows[node.col].push(node.row);
        });
        const columnShift = {};
        Object.keys(columnRows).forEach(function(column) {
          const rows = columnRows[column];
          const columnCenter = (Math.min.apply(null, rows) + Math.max.apply(null, rows)) / 2;
          columnShift[column] = globalCenter - columnCenter;
        });
        const specialRowOffset = function(node) {
          const id = lordNumber(node.id);
          if (id === 110 || id === 145) return -0.5;
          if (id === 225) return 0.5;
          return 0;
        };
        const visualRow = function(node) {
          return node.row + lordNumber(columnShift[node.col]) + specialRowOffset(node);
        };
        const visualRows = lordResearchNodes.map(visualRow);
        const minVisualRow = Math.min.apply(null, visualRows);
        const maxVisualRow = Math.max.apply(null, visualRows);
        const treeWidth = ((maxCol - minCol) * colStep) + iconSize + (padding * 2);
        const treeHeight = ((maxVisualRow - minVisualRow) * rowStep) + iconSize + (padding * 2);
        const offsetX = padding - (minCol * colStep);
        const offsetY = padding - (minVisualRow * rowStep);
        const nodeCenter = function(node) {
          return {
            x: (node.col * colStep) + offsetX,
            y: (visualRow(node) * rowStep) + offsetY
          };
        };
        const settings = lordResearchSettings(data);
        const faction = ["league_of_order", "springwardens", "wilderburg"].includes(settings.faction) ? settings.faction : "league_of_order";
        const tree = lordResearchTreeKey();
        const nodeById = Object.fromEntries(lordResearchNodes.map(function(node) { return [node.id, node]; }));
        const nodeState = function(node) {
          if (lordResearchNodeLevel(data, node) > 0) return "active";
          const missingRequirement = node.requires.some(function(requirement) {
            const requiredId = String(requirement.id || requirement);
            const requiredLevel = lordNumber(requirement.level || nodeById[requiredId]?.max || 1);
            const source = nodeById[requiredId];
            return !source || lordResearchNodeLevel(data, source) < requiredLevel;
          });
          return missingRequirement ? "locked" : "available";
        };
        const lines = [];
        lordResearchNodes.forEach(function(node) {
          node.requires.forEach(function(requirement) {
            const requiredId = String(requirement.id || requirement);
            const requiredLevel = lordNumber(requirement.level || nodeById[requiredId]?.max || 1);
            const source = nodeById[requiredId];
            if (!source) return;
            const columnDistance = node.col - source.col;
            if (columnDistance < 0 || columnDistance > 2) return;
            const sourceCenter = nodeCenter(source);
            const targetCenter = nodeCenter(node);
            const done = lordResearchNodeLevel(data, source) > 0 && lordResearchNodeLevel(data, node) > 0;
            lines.push('<path class="lord-research-line' + (done ? ' done' : '') + '" data-research-source="' + source.id + '" data-research-target="' + node.id + '" data-research-required-level="' + requiredLevel + '" d="M ' + sourceCenter.x + ' ' + sourceCenter.y + ' L ' + targetCenter.x + ' ' + targetCenter.y + '" />');
          });
        });
        const selectedId = String(state.lordResearchSelected || lordResearchNodes[0].id);
        const nodes = lordResearchNodes.map(function(node) {
          const level = lordResearchNodeLevel(data, node);
          const center = nodeCenter(node);
          return '<button class="lord-research-node ' + lordResearchTier(node) + ' ' + nodeState(node) + (selectedId === node.id ? ' selected' : '') + '" style="left:' + (center.x - (nodeWidth / 2)) + 'px;top:' + (center.y - (iconSize / 2)) + 'px" type="button" data-action="lord-research-select" data-research-id="' + node.id + '" title="Left click adds a level. Right click removes one." aria-label="' + escapeHtml(node.name) + ', level ' + level + ' of ' + node.max + '"><span class="lord-research-node-art"><img src="/assets/research/' + tree + '/' + faction + '/' + node.id + '.png" alt="" loading="eager" decoding="async" draggable="false" /><span class="lord-research-node-level">' + level + '/' + node.max + '</span></span><strong>' + escapeHtml(node.name) + '</strong></button>';
        }).join("");
        return '<div class="lord-research-tree" data-lord-research-tree-canvas style="width:' + treeWidth + 'px;height:' + treeHeight + 'px;transform:translate3d(' + state.lordResearchPanX + 'px,' + state.lordResearchPanY + 'px,0) scale(' + state.lordResearchZoom + ')"><svg class="lord-research-lines" viewBox="0 0 ' + treeWidth + ' ' + treeHeight + '" aria-hidden="true">' + lines.join("") + '</svg>' + nodes + '</div>';
      }

      function lordResearchPanel(data) {
        lordResearchCurrentNodes();
        const settings = lordResearchSettings(data);
        const completed = lordResearchNodes.filter(function(node) { return lordResearchNodeLevel(data, node) >= node.max; }).length;
        const factionLabels = { league_of_order: "League of Order", springwardens: "Springwardens", wilderburg: "Wilderburg" };
        const treeLabel = lordResearchTreeKey() === "military" ? "Military" : "Economy";
        return '<section class="lord-research-workspace"><header class="lord-research-head"><div><h3>Research Calculator</h3><p>' + escapeHtml(factionLabels[settings.faction] || factionLabels.league_of_order) + ' ' + treeLabel.toLowerCase() + ' tree - ' + completed + ' of ' + lordResearchNodes.length + ' technologies completed</p></div><div><button class="primary" type="button" data-action="save-lord-tools">Save</button> <button class="lord-research-reset" type="button" data-action="lord-research-reset-all">Reset</button></div></header>' +
          '<div class="lord-research-layout"><div class="lord-research-settings"><div class="lord-research-settings-heading"><strong>Calculator settings</strong><small>Set your city and active research bonuses.</small></div>' +
            '<label>Faction<select data-lord-research-setting="faction">' + Object.entries(factionLabels).map(function(entry) { return '<option value="' + entry[0] + '"' + (entry[0] === settings.faction ? ' selected' : '') + '>' + entry[1] + '</option>'; }).join("") + '</select></label>' +
            '<label>Alliance Center<select data-lord-research-setting="allianceCenter">' + Array.from({ length: 25 }, function(_, index) { const level = index + 1; return '<option value="' + level + '"' + (level === lordNumber(settings.allianceCenter) ? ' selected' : '') + '>Level ' + level + '</option>'; }).join("") + '</select></label>' +
            '<label>Research speed %<input type="number" min="0" max="500" step="1" value="' + lordNumber(settings.speed) + '" data-lord-research-setting="speed" /></label>' +
            '<button class="lord-research-toggle' + (settings.heightsOfPower ? ' on' : '') + '" type="button" data-action="lord-research-event"><span>Heights of Power <b>+15%</b></span><i aria-hidden="true"></i></button></div>' +
            '<main class="lord-research-main" data-lord-research-fullscreen><div class="lord-research-tabs"><button class="lord-research-tab' + (lordResearchTreeKey() === "economy" ? ' active' : '') + '" type="button" data-action="lord-research-tree" data-research-tree="economy">Economy</button><button class="lord-research-tab' + (lordResearchTreeKey() === "military" ? ' active' : '') + '" type="button" data-action="lord-research-tree" data-research-tree="military">Military</button><span class="lord-research-hint">Click +1 &middot; Right click -1 &middot; Drag to move</span><span class="lord-research-fullscreen-control"><button class="lord-research-fullscreen-toggle" type="button" data-action="lord-research-fullscreen" aria-label="Open research tree full screen" title="Full screen"><span class="lord-research-fullscreen-icon" aria-hidden="true"></span></button></span></div><div class="lord-research-tree-scroll" data-lord-research-scroll tabindex="0" aria-label="' + treeLabel + ' research tree. Drag to move and scroll or pinch to zoom."><div class="lord-research-summary" data-lord-research-summary>' + lordResearchSummaryHtml(data) + '</div>' + lordResearchTreeHtml(data) + '</div></main></div></section>';
      }

      function applyLordResearchTransform() {
        const canvas = document.querySelector("[data-lord-research-tree-canvas]");
        if (canvas) canvas.style.transform = 'translate3d(' + state.lordResearchPanX + 'px,' + state.lordResearchPanY + 'px,0) scale(' + state.lordResearchZoom + ')';
      }

      function syncLordResearchFullscreenState(active) {
        const target = document.querySelector("[data-lord-research-fullscreen]");
        if (!target) return;
        target.classList.toggle("is-fullscreen", active);
        document.body.classList.toggle("lord-research-fullscreen-open", active);
        const button = target.querySelector("[data-action=lord-research-fullscreen]");
        if (button) {
          button.setAttribute("aria-label", active ? "Exit research tree full screen" : "Open research tree full screen");
          button.setAttribute("title", active ? "Exit full screen" : "Full screen");
        }
        requestAnimationFrame(function() { fitLordResearchTree(true); });
      }

      async function toggleLordResearchFullscreen() {
        const target = document.querySelector("[data-lord-research-fullscreen]");
        if (!target) return;
        const active = target.classList.contains("is-fullscreen") || document.fullscreenElement === target;
        if (active) {
          if (document.fullscreenElement && document.exitFullscreen) {
            try { await document.exitFullscreen(); } catch (_) { /* CSS fallback still closes below. */ }
          }
          syncLordResearchFullscreenState(false);
          return;
        }
        syncLordResearchFullscreenState(true);
        if (target.requestFullscreen) {
          try { await target.requestFullscreen(); } catch (_) { /* Keep the iOS-compatible fixed-screen fallback. */ }
        }
      }

      function setLordResearchZoom(value, clientX, clientY) {
        const viewport = document.querySelector("[data-lord-research-scroll]");
        const previous = state.lordResearchZoom || 0.6;
        const next = Math.max(0.08, Math.min(1.8, Math.round(value * 100) / 100));
        if (viewport && previous > 0) {
          const rect = viewport.getBoundingClientRect();
          const anchorX = Number.isFinite(clientX) ? clientX - rect.left : rect.width / 2;
          const anchorY = Number.isFinite(clientY) ? clientY - rect.top : rect.height / 2;
          const worldX = (anchorX - state.lordResearchPanX) / previous;
          const worldY = (anchorY - state.lordResearchPanY) / previous;
          state.lordResearchPanX = anchorX - (worldX * next);
          state.lordResearchPanY = anchorY - (worldY * next);
        }
        state.lordResearchZoom = next;
        applyLordResearchTransform();
      }

      function fitLordResearchTree(preferReadable) {
        const viewport = document.querySelector("[data-lord-research-scroll]");
        const canvas = document.querySelector("[data-lord-research-tree-canvas]");
        if (!viewport || !canvas) return;
        const width = Number.parseFloat(canvas.style.width) || canvas.scrollWidth || 1;
        const height = Number.parseFloat(canvas.style.height) || canvas.scrollHeight || 1;
        const exactFit = Math.max(0.08, Math.min(1, Math.min((viewport.clientWidth - 40) / width, (viewport.clientHeight - 40) / height)));
        const fit = Math.max(0.08, exactFit);
        state.lordResearchZoom = Math.floor(fit * 100) / 100;
        state.lordResearchPanX = Math.round((viewport.clientWidth - (width * state.lordResearchZoom)) / 2);
        state.lordResearchPanY = Math.round((viewport.clientHeight - (height * state.lordResearchZoom)) / 2 + 18);
        applyLordResearchTransform();
      }

      function refreshLordResearchWorkspace() {
        if (state.lordView !== "research") return;
        const data = loadLordToolsData();
        lordResearchCurrentNodes();
        const nodeById = Object.fromEntries(lordResearchNodes.map(function(item) { return [item.id, item]; }));
        const summary = document.querySelector("[data-lord-research-summary]");
        if (summary) summary.innerHTML = lordResearchSummaryHtml(data);
        document.querySelectorAll("[data-action=lord-research-select]").forEach(function(button) {
          const id = button.getAttribute("data-research-id") || "";
          const node = lordResearchNodes.find(function(item) { return item.id === id; });
          const level = node ? lordResearchNodeLevel(data, node) : 0;
          button.classList.toggle("selected", id === String(state.lordResearchSelected || lordResearchNodes[0].id));
          if (node) {
            const missingRequirement = node.requires.some(function(requirement) {
              const requiredId = String(requirement.id || requirement);
              const requiredLevel = lordNumber(requirement.level || nodeById[requiredId]?.max || 1);
              const source = nodeById[requiredId];
              return !source || lordResearchNodeLevel(data, source) < requiredLevel;
            });
            button.classList.remove("active", "available", "locked");
            button.classList.add(level > 0 ? "active" : (missingRequirement ? "locked" : "available"));
          }
          const badge = button.querySelector(".lord-research-node-level");
          if (badge && node) {
            badge.textContent = level + "/" + node.max;
            button.setAttribute("aria-label", node.name + ", level " + level + " of " + node.max);
          }
        });
        document.querySelectorAll("[data-research-source]").forEach(function(path) {
          const sourceId = path.getAttribute("data-research-source") || "";
          const targetId = path.getAttribute("data-research-target") || "";
          const source = lordResearchNodes.find(function(item) { return item.id === sourceId; });
          const target = lordResearchNodes.find(function(item) { return item.id === targetId; });
          path.classList.toggle("done", Boolean(source && target && lordResearchNodeLevel(data, source) > 0 && lordResearchNodeLevel(data, target) > 0));
        });
      }

      function lordBuildingsPanel(data) {
        const tracked = lordBuildingNames.filter(function(name) { return lordNumber(data.buildings?.[name]) > 0; }).length;
        return '<section class="lord-panel"><div class="lord-section-heading"><div><h3>Building Levels</h3><p>Store the city levels used when planning upgrades and training.</p></div><span>' + tracked + ' tracked</span></div><div class="lord-building-grid">' + lordBuildingNames.map(function(name) {
          const level = Math.min(25, lordNumber(data.buildings?.[name]));
          return '<label class="lord-building-card"><img src="/assets/buffs/construction.png" alt="" loading="lazy" /><span><strong>' + escapeHtml(name) + '</strong><small>Level ' + level + ' / 25</small></span><input type="number" min="0" max="25" step="1" value="' + level + '" data-lord-field="buildings.' + escapeHtml(name) + '" aria-label="' + escapeHtml(name) + ' level" /></label>';
        }).join("") + '</div></section>';
      }

      function lordAdjustedHours(hours, buff) {
        return lordNumber(hours) / (1 + (lordNumber(buff) / 100));
      }

      function lordCalculatorValues(data) {
        const calc = data.calculators || {};
        const researchHours = lordAdjustedHours(calc.researchHours, calc.researchBuff);
        const buildingHours = lordAdjustedHours(calc.buildingHours, calc.buildingBuff);
        const wounded = lordNumber(calc.wounded);
        const tierKey = ["t3", "t4", "t5"].includes(calc.woundedTier) ? calc.woundedTier : "t4";
        const healingHours = lordAdjustedHours((wounded * (trainingTiers[tierKey]?.seconds || 80)) / 3600 / 2, calc.healingBuff);
        const healingResources = trainingResourceTotals(tierKey, wounded, "cavalry");
        const eventHours = lordNumber(calc.eventDays) * lordNumber(calc.dailyHours);
        return { researchHours, buildingHours, healingHours, healingResources, eventHours };
      }

      function lordCalcResultsHtml(kind, data) {
        const values = lordCalculatorValues(data);
        const resourceResult = function(resource, value) {
          return '<div class="lord-calc-resource"><img src="' + resourceIconPaths[resource] + '" alt="" loading="lazy" /><span>' + trainingResourceLabels[resource] + '</span><strong data-lord-result="healing-' + resource + '">' + trainingCompactNumber(value) + '</strong></div>';
        };
        if (kind === "research") return '<div><span>Adjusted time</span><strong data-lord-result="research-time">' + trainingDuration(values.researchHours * 3600) + '</strong></div><div><span>Research reserve</span><strong>' + trainingCompactNumber(data.speedups.research) + 'd</strong></div><div><span>Universal reserve</span><strong>' + trainingCompactNumber(data.speedups.universal) + 'd</strong></div>';
        if (kind === "building") return '<div><span>Adjusted time</span><strong data-lord-result="building-time">' + trainingDuration(values.buildingHours * 3600) + '</strong></div><div><span>Building reserve</span><strong>' + trainingCompactNumber(data.speedups.building) + 'd</strong></div><div><span>Universal reserve</span><strong>' + trainingCompactNumber(data.speedups.universal) + 'd</strong></div>';
        if (kind === "healing") return '<div><span>Estimated time</span><strong data-lord-result="healing-time">' + trainingDuration(values.healingHours * 3600) + '</strong></div>' + trainingResourceOrder.map(function(resource) { return resourceResult(resource, values.healingResources[resource]); }).join("");
        return '<div><span>Planned activity</span><strong data-lord-result="event-time">' + trainingDuration(values.eventHours * 3600) + '</strong></div><div><span>All speedups</span><strong>' + trainingCompactNumber(Object.values(data.speedups || {}).reduce(function(sum, value) { return sum + lordNumber(value); }, 0)) + 'd</strong></div><div><span>Training reserve</span><strong>' + trainingCompactNumber(data.speedups.training) + 'd</strong></div>';
      }

      function lordCalculatorsPanel(data) {
        const calc = data.calculators || {};
        return '<section class="lord-panel"><div class="lord-section-heading"><div><h3>Commander Calculators</h3><p>Fast planning estimates using the profile values above.</p></div><button class="primary" type="button" data-link-button="/training-tools">Open Full Training Tools</button></div><div class="lord-calc-grid">' +
          '<article class="lord-calc-card"><h3>Research Planner</h3><p>Apply your research speed and compare stored speedups.</p><div class="form-grid"><label>Base hours<input type="number" min="0" step="0.1" value="' + lordNumber(calc.researchHours) + '" data-lord-calc="researchHours" /></label><label>Research speed %<input type="number" min="0" step="1" value="' + lordNumber(calc.researchBuff) + '" data-lord-calc="researchBuff" /></label></div><div class="lord-calc-results">' + lordCalcResultsHtml("research", data) + '</div></article>' +
          '<article class="lord-calc-card"><h3>Building Planner</h3><p>Estimate construction time after city speed bonuses.</p><div class="form-grid"><label>Base hours<input type="number" min="0" step="0.1" value="' + lordNumber(calc.buildingHours) + '" data-lord-calc="buildingHours" /></label><label>Building speed %<input type="number" min="0" step="1" value="' + lordNumber(calc.buildingBuff) + '" data-lord-calc="buildingBuff" /></label></div><div class="lord-calc-results">' + lordCalcResultsHtml("building", data) + '</div></article>' +
          '<article class="lord-calc-card"><h3>Healing Estimator</h3><p>Estimate time and resources before a large hospital heal.</p><div class="form-grid"><label>Wounded units<input type="number" min="0" step="1" value="' + lordNumber(calc.wounded) + '" data-lord-calc="wounded" /></label><label>Tier<select data-lord-calc="woundedTier">' + ["t3", "t4", "t5"].map(function(tier) { return '<option value="' + tier + '"' + (tier === calc.woundedTier ? ' selected' : '') + '>' + tier.toUpperCase() + '</option>'; }).join("") + '</select></label><label>Healing speed %<input type="number" min="0" step="1" value="' + lordNumber(calc.healingBuff) + '" data-lord-calc="healingBuff" /></label></div><div class="lord-calc-results">' + lordCalcResultsHtml("healing", data) + '</div></article>' +
          '<article class="lord-calc-card"><h3>Event Reserve</h3><p>Set a play window and compare it with all stored speedups.</p><div class="form-grid"><label>Event days<input type="number" min="0" step="1" value="' + lordNumber(calc.eventDays) + '" data-lord-calc="eventDays" /></label><label>Hours per day<input type="number" min="0" step="0.25" value="' + lordNumber(calc.dailyHours) + '" data-lord-calc="dailyHours" /></label></div><div class="lord-calc-results">' + lordCalcResultsHtml("event", data) + '</div></article>' +
        '</div></section>';
      }

      function profileHubNav(active) {
        return '<nav class="profile-hub-nav" aria-label="Profile sections">' +
          '<button class="' + (active === "profile" ? 'active' : '') + '" type="button" data-link-button="/profile">Player Card</button>' +
          '<button class="' + (active === "commander" ? 'active' : '') + '" type="button" data-link-button="/profile?section=lord">Commander Tools</button>' +
          '<button class="' + (active === "research" ? 'active' : '') + '" type="button" data-link-button="/research">Research</button>' +
        '</nav>';
      }

      function renderLordTools(embeddedInProfile, forcedView) {
        const embedded = typeof embeddedInProfile === "boolean" ? embeddedInProfile : location.pathname === "/profile";
        const researchOnly = forcedView === "research" || location.pathname === "/research";
        const data = loadLordToolsData();
        const views = [
          { id: "overview", label: "Overview" },
          { id: "identity", label: "Identity" },
          { id: "troops", label: "Troops" },
          { id: "speedups", label: "Speedups" },
          { id: "heroes", label: "Heroes" },
          { id: "artifacts", label: "Artifacts" },
          { id: "research", label: "Research" },
          { id: "buildings", label: "Buildings" },
          { id: "warpet", label: "War Pet" },
          { id: "decorations", label: "Decorations" },
          { id: "pairings", label: "Pairings" },
          { id: "calculators", label: "Calculators" }
        ];
        if (forcedView && views.some(function(item) { return item.id === forcedView; })) state.lordView = forcedView;
        if (!views.some(function(item) { return item.id === state.lordView; })) state.lordView = "overview";
        const panels = {
          overview: lordOverview,
          identity: lordIdentityPanel,
          troops: lordTroopsPanel,
          speedups: lordSpeedupsPanel,
          heroes: lordHeroesPanel,
          artifacts: lordArtifactsPanel,
          research: lordResearchPanel,
          buildings: lordBuildingsPanel,
          warpet: lordWarPetPanel,
          decorations: lordDecorationsPanel,
          pairings: lordPairingsPanel,
          calculators: lordCalculatorsPanel
        };
        const updated = data.updatedAt ? "Saved " + formatDateTime(data.updatedAt) : "Ready to save";
        const featuredViews = ["overview", "identity", "troops", "research", "calculators"];
        const standardHeader = pageHeader(embedded ? "Commander Hub" : "My Lord", "A clean home for your commander, collections, progress, and planning tools.", '<button class="secondary" type="button" data-action="copy-lord-summary">Copy Summary</button><button class="primary" type="button" data-action="save-lord-tools">Save</button>');
        const standardIntro = profileHubNav("commander");
        app.innerHTML =
          (researchOnly ? '' : standardHeader) +
          '<div class="lord-tools-shell">' +
            (researchOnly ? '' : standardIntro) +
            '<section class="lord-intro"><img src="/assets/icons/lord-tools.svg" alt="" /><div><h3>' + escapeHtml(data.identity.name || "Commander Profile") + '</h3><p>Server ' + escapeHtml(data.identity.server || "-") + ' · Lord ID ' + escapeHtml(data.identity.lordId || "Not set") + '</p></div><div class="lord-save-state"><span data-lord-save-status>' + escapeHtml(updated) + '</span><button class="ghost" type="button" data-action="reset-lord-tools">Reset profile</button></div></section>' +
            (researchOnly ? '' : '<div class="lord-navigation"><nav class="lord-tabs" aria-label="Commander shortcuts">' + views.filter(function(item) { return featuredViews.includes(item.id); }).map(function(item) { return '<button class="lord-tab' + (item.id === state.lordView ? ' active' : '') + '" type="button" data-action="lord-view" data-lord-view="' + item.id + '">' + item.label + '</button>'; }).join("") + '</nav><select class="lord-view-select" data-lord-view-select aria-label="Choose commander tool">' + views.map(function(item) { return '<option value="' + item.id + '"' + (item.id === state.lordView ? ' selected' : '') + '>' + item.label + '</option>'; }).join("") + '</select></div>') +
            (panels[state.lordView] || lordOverview)(data) +
          '</div>';
        if (state.lordView === "research") {
          requestAnimationFrame(function() { fitLordResearchTree(true); });
        }
      }

      function updateLordCalculatorResults() {
        if (state.lordView !== "calculators") return;
        const data = loadLordToolsData();
        const values = lordCalculatorValues(data);
        const set = function(name, value) { const node = document.querySelector('[data-lord-result="' + name + '"]'); if (node) node.textContent = value; };
        set("research-time", trainingDuration(values.researchHours * 3600));
        set("building-time", trainingDuration(values.buildingHours * 3600));
        set("healing-time", trainingDuration(values.healingHours * 3600));
        set("healing-ore", trainingCompactNumber(values.healingResources.ore));
        set("healing-mana", trainingCompactNumber(values.healingResources.mana));
        set("healing-wood", trainingCompactNumber(values.healingResources.wood));
        set("healing-gold", trainingCompactNumber(values.healingResources.gold));
        set("event-time", trainingDuration(values.eventHours * 3600));
      }

      function handleLordControl(target) {
        if (!target || !target.matches) return false;
        const value = target.type === "number" ? lordNumber(target.value) : target.value;
        if (target.matches("[data-lord-research-setting]")) {
          const key = target.getAttribute("data-lord-research-setting") || "";
          const data = loadLordToolsData();
          const settings = lordResearchSettings(data);
          settings[key] = target.type === "number" ? lordNumber(value) : value;
          saveLordToolsData(false);
          if (key === "faction") {
            renderLordTools();
            return true;
          }
          refreshLordResearchWorkspace();
          return true;
        }
        if (target.matches("[data-lord-field]")) {
          lordSetPath(target.getAttribute("data-lord-field"), value);
          if (target.matches("[data-lord-pet-select]")) {
            const pet = lordPetList().find(function(item) { return item.lordName === target.value; });
            const image = document.querySelector("[data-lord-pet-image]");
            if (image) image.src = pet?.src || "/assets/icons/lord-tools.svg";
          }
          return true;
        }
        if (target.matches("[data-lord-troop-unit]")) {
          const unit = target.getAttribute("data-lord-troop-unit") || "";
          const tier = target.getAttribute("data-lord-troop-tier") || "";
          const data = loadLordToolsData();
          if (data.troops[unit] && lordTiers.includes(tier)) data.troops[unit][tier] = lordNumber(value);
          saveLordToolsData(false);
          return true;
        }
        if (target.matches("[data-lord-hero]")) {
          const name = target.getAttribute("data-lord-hero") || "";
          const prop = target.getAttribute("data-lord-prop") || "level";
          const data = loadLordToolsData();
          data.heroes[name] = data.heroes[name] || {};
          data.heroes[name][prop] = lordNumber(value);
          data.heroes[name].owned = Object.keys(data.heroes[name]).some(function(key) { return key !== "owned" && lordNumber(data.heroes[name][key]) > 0; });
          saveLordToolsData(false);
          return true;
        }
        if (target.matches("[data-lord-artifact]")) {
          const name = target.getAttribute("data-lord-artifact") || "";
          const prop = target.getAttribute("data-lord-prop") || "level";
          const data = loadLordToolsData();
          data.artifacts[name] = data.artifacts[name] || {};
          data.artifacts[name][prop] = lordNumber(value);
          data.artifacts[name].owned = lordNumber(data.artifacts[name].level) > 0 || Boolean(data.artifacts[name].exemplar);
          saveLordToolsData(false);
          return true;
        }
        if (target.matches("[data-lord-decoration]")) {
          const name = target.getAttribute("data-lord-decoration") || "";
          const prop = target.getAttribute("data-lord-prop") || "level";
          const data = loadLordToolsData();
          data.decorations[name] = data.decorations[name] || {};
          data.decorations[name][prop] = lordNumber(value);
          data.decorations[name].owned = lordNumber(data.decorations[name].level) > 0 || Boolean(data.decorations[name].active);
          saveLordToolsData(false);
          return true;
        }
        if (target.matches("[data-lord-pair]")) {
          const unit = target.getAttribute("data-lord-pair") || "";
          const prop = target.getAttribute("data-lord-prop") || "notes";
          const data = loadLordToolsData();
          data.pairings[unit] = data.pairings[unit] || {};
          data.pairings[unit][prop] = value;
          saveLordToolsData(false);
          return true;
        }
        if (target.matches("[data-lord-calc]")) {
          const key = target.getAttribute("data-lord-calc") || "";
          const data = loadLordToolsData();
          data.calculators[key] = target.type === "number" ? lordNumber(value) : value;
          saveLordToolsData(false);
          updateLordCalculatorResults();
          return true;
        }
        return false;
      }

      function renderTrainingTools() {
        const selected = ["points", "speedup", "power", "mixed"].includes(state.trainingMode) ? state.trainingMode : "points";
        state.trainingMode = selected;
        const selectedTroopType = Object.prototype.hasOwnProperty.call(trainingTroopTypes, state.trainingTroopType) ? state.trainingTroopType : "cavalry";
        state.trainingTroopType = selectedTroopType;
        const tabs = [
          { id: "points", label: "Event Points" },
          { id: "speedup", label: "Speedups" },
          { id: "power", label: "Target Power" },
          { id: "mixed", label: "Mixed Plan" }
        ].map(function(item) {
          const active = item.id === selected;
          return '<button class="training-mode-button' + (active ? ' active' : '') + '" type="button" role="tab" aria-selected="' + String(active) + '" data-action="training-mode" data-training-mode="' + item.id + '">' + item.label + '</button>';
        }).join("");
        const eventOptions = Object.entries(trainingEventScores).map(function(entry) {
          return '<option value="' + entry[0] + '">' + escapeHtml(entry[1].label) + '</option>';
        }).join("");
        const troopTypeOptions = Object.entries(trainingTroopTypes).map(function(entry) {
          return '<option value="' + entry[0] + '"' + (entry[0] === selectedTroopType ? ' selected' : '') + '>' + escapeHtml(entry[1]) + '</option>';
        }).join("");
        const mixedTierButtons = trainingTierOrder.map(function(key) {
          const active = key === state.trainingMixedTier;
          return '<button class="training-mix-tier-button' + (active ? ' active' : '') + '" type="button" data-action="training-mixed-tier" data-training-tier="' + key + '">' + escapeHtml(trainingTierLabel(key)) + '</button>';
        }).join("");
        app.innerHTML =
          pageHeader("Training Tools", "Plan troop training, event points, speedups, and power before spending your reserves.", '<button class="secondary" data-action="reset-training">Reset</button><button class="primary" data-action="copy-training-summary">Copy Results</button>') +
          '<div class="training-shell">' +
            '<section class="training-intro"><img src="/assets/icons/training-tools.png" alt="" /><div><strong>Commander Training Planner</strong><span>Calculations use Call of Dragons base troop times. Set your city training buff to match the value shown in game.</span></div></section>' +
            '<section class="training-resource-settings" data-training-resource-settings' + (selected === "mixed" ? ' hidden' : '') + '><label>Troop Type<select data-training-input data-training-troop-type>' + troopTypeOptions + '</select></label><div><strong>Resource calculation</strong><span>Costs change by troop type. Every result includes Ore, Mana, Wood, and Gold.</span></div></section>' +
            '<div class="training-mode-tabs" role="tablist" aria-label="Training calculator mode">' + tabs + '</div>' +
            '<section class="card training-calculator-card training-panel" data-training-panel="points"' + (selected === "points" ? '' : ' hidden') + '>' +
              '<div class="training-panel-head"><div><h3>Event Points</h3><p>See how many troops and event points your available training time can produce.</p></div></div>' +
              '<div class="training-input-grid"><div class="training-time-grid">' +
                '<label>Days<input type="number" min="0" step="1" value="1" inputmode="numeric" data-training-input data-training-points="days" /></label>' +
                '<label>Hours<input type="number" min="0" max="23" step="1" value="0" inputmode="numeric" data-training-input data-training-points="hours" /></label>' +
                '<label>Minutes<input type="number" min="0" max="59" step="1" value="0" inputmode="numeric" data-training-input data-training-points="minutes" /></label>' +
                '<label>Training Buff %<input type="number" min="0" step="1" value="75" inputmode="decimal" data-training-input data-training-points="buff" /></label>' +
              '</div><label>Scoring Event<select data-training-input data-training-points="event">' + eventOptions + '</select></label></div>' +
              '<div class="training-results"><div class="training-summary-grid" data-training-points-summary></div><div class="training-table-wrap"><table class="training-table training-table-resources"><thead><tr><th>Troop action</th><th>Units</th><th>Points each</th><th>Total points</th><th>Resources needed</th></tr></thead><tbody data-training-points-body></tbody></table></div></div>' +
              '<p class="training-note">Upgrade rows require existing lower-tier troops. Results are estimates and round down to complete units.</p>' +
            '</section>' +
            '<section class="card training-calculator-card training-panel" data-training-panel="speedup"' + (selected === "speedup" ? '' : ' hidden') + '>' +
              '<div class="training-panel-head"><div><h3>Speedup Planner</h3><p>Enter the troops you plan to train or upgrade and Kella will total the time and power.</p></div></div>' +
              '<div class="training-input-grid"><label>Training Buff %<input type="number" min="0" step="1" value="75" inputmode="decimal" data-training-input data-training-speedup="buff" /></label><div class="wide">' + trainingTroopInputs("speedup") + '</div></div>' +
              '<div class="training-results"><div class="training-summary-grid" data-training-speedup-summary></div><div data-training-speedup-resources></div><div class="training-table-wrap"><table class="training-table training-table-resources"><thead><tr><th>Troop action</th><th>Quantity</th><th>Base time</th><th>With buff</th><th>Power</th><th>Resources needed</th></tr></thead><tbody data-training-speedup-body></tbody></table></div></div>' +
            '</section>' +
            '<section class="card training-calculator-card training-panel" data-training-panel="power"' + (selected === "power" ? '' : ' hidden') + '>' +
              '<div class="training-panel-head"><div><h3>Target Power</h3><p>Compare the units and time needed to reach a troop-power goal.</p></div></div>' +
              '<div class="training-input-grid"><label>Target Power<input type="number" min="0" step="1000" value="100000" inputmode="numeric" data-training-input data-training-power="target" /></label><label>Training Buff %<input type="number" min="0" step="1" value="75" inputmode="decimal" data-training-input data-training-power="buff" /></label></div>' +
              '<div class="training-results"><div class="training-summary-grid" data-training-power-summary></div><div class="training-table-wrap"><table class="training-table training-table-resources"><thead><tr><th>Troop action</th><th>Units needed</th><th>Power each</th><th>Speedup needed</th><th>Resources needed</th></tr></thead><tbody data-training-power-body></tbody></table></div></div>' +
              '<p class="training-note">Target Power compares each option separately. Upgrade rows require the same number of existing lower-tier troops.</p>' +
            '</section>' +
            '<section class="card training-calculator-card training-panel" data-training-panel="mixed"' + (selected === "mixed" ? '' : ' hidden') + '>' +
              '<div class="training-panel-head"><div><h3>Mixed Troop Plan</h3><p>Split your available time between troop types, then save each training step into one complete plan.</p></div></div>' +
              '<div class="training-input-grid"><div class="training-time-grid">' +
                '<label>Days<input type="number" min="0" step="1" value="1" inputmode="numeric" data-training-input data-training-mixed="days" /></label>' +
                '<label>Hours<input type="number" min="0" max="23" step="1" value="0" inputmode="numeric" data-training-input data-training-mixed="hours" /></label>' +
                '<label>Minutes<input type="number" min="0" max="59" step="1" value="0" inputmode="numeric" data-training-input data-training-mixed="minutes" /></label>' +
                '<label>Training Buff %<input type="number" min="0" step="1" value="75" inputmode="decimal" data-training-input data-training-mixed="buff" /></label>' +
              '</div><label>Scoring Event<select data-training-input data-training-mixed="event">' + eventOptions + '</select></label></div>' +
              '<div class="training-mix-tier-tabs" data-training-mixed-tiers>' + mixedTierButtons + '</div>' +
              trainingMixedTroopRows() +
              '<div class="training-summary-grid" data-training-mixed-summary></div>' +
              '<div data-training-mixed-resources></div>' +
              '<div class="training-plan-actions"><button class="primary" type="button" data-action="save-training-step" data-training-save-step>Save Step</button></div>' +
              '<div class="training-saved-plan" data-training-saved-plan></div>' +
            '</section>' +
          '</div>';
        requestAnimationFrame(updateTrainingTools);
      }

      function setTrainingMode(mode) {
        state.trainingMode = ["points", "speedup", "power", "mixed"].includes(mode) ? mode : "points";
        document.querySelectorAll("[data-training-mode]").forEach(function(button) {
          const active = button.getAttribute("data-training-mode") === state.trainingMode;
          button.classList.toggle("active", active);
          button.setAttribute("aria-selected", String(active));
        });
        document.querySelectorAll("[data-training-panel]").forEach(function(panel) {
          panel.hidden = panel.getAttribute("data-training-panel") !== state.trainingMode;
        });
        const resourceSettings = document.querySelector("[data-training-resource-settings]");
        if (resourceSettings) resourceSettings.hidden = state.trainingMode === "mixed";
        updateTrainingTools();
      }

      function updateTrainingPoints() {
        const days = trainingValue('[data-training-points="days"]');
        const hours = Math.min(23, trainingValue('[data-training-points="hours"]'));
        const minutes = Math.min(59, trainingValue('[data-training-points="minutes"]'));
        const buff = trainingValue('[data-training-points="buff"]');
        const eventKey = document.querySelector('[data-training-points="event"]')?.value || "mge1";
        const event = trainingEventScores[eventKey] || trainingEventScores.mge1;
        const troopType = trainingSelectedTroopType();
        const availableSeconds = ((days * 24 + hours) * 60 + minutes) * 60;
        const multiplier = 1 + buff / 100;
        const results = trainingTierOrder.map(function(key) {
          const tier = trainingTiers[key];
          const units = Math.floor((availableSeconds * multiplier) / tier.seconds);
          return { key, units, score: event[key], total: units * event[key], resources: trainingResourceTotals(key, units, troopType) };
        });
        const best = results.slice().sort(function(a, b) { return b.total - a.total; })[0];
        const body = document.querySelector("[data-training-points-body]");
        const summary = document.querySelector("[data-training-points-summary]");
        if (body) body.innerHTML = results.map(function(result) {
          return '<tr><td>' + trainingTierCell(result.key) + '</td><td>' + trainingCompactValue(result.units) + '</td><td>' + formatNumber(result.score) + '</td><td><strong>' + trainingCompactValue(result.total) + '</strong></td><td>' + trainingResourcesCell(result.resources) + '</td></tr>';
        }).join("");
        if (summary) summary.innerHTML =
          trainingSummaryCard("Available time", trainingDuration(availableSeconds)) +
          trainingSummaryCard("Training buff", formatNumber(buff) + "%") +
          trainingSummaryCard("Troop type", trainingTroopTypes[troopType]) +
          trainingSummaryCard("Highest result", best ? trainingCompactNumber(best.total) + " pts" : "0 pts");
        state.trainingSummary = "KELLA TRAINING - EVENT POINTS\\nEvent: " + event.label + "\\nTroop type: " + trainingTroopTypes[troopType] + "\\nAvailable time: " + trainingDuration(availableSeconds) + "\\nTraining buff: " + formatNumber(buff) + "%\\n\\n" + results.map(function(result) {
          return trainingTierLabel(result.key) + ": " + trainingCompactNumber(result.units) + " units - " + trainingCompactNumber(result.total) + " points\\n" + trainingResourcesText(result.resources);
        }).join("\\n");
      }

      function updateTrainingSpeedup() {
        const buff = trainingValue('[data-training-speedup="buff"]');
        const troopType = trainingSelectedTroopType();
        const multiplier = 1 + buff / 100;
        const results = trainingTierOrder.map(function(key) {
          const quantity = Math.floor(trainingValue('[data-training-speedup="' + key + '"]'));
          const tier = trainingTiers[key];
          return { key, quantity, base: quantity * tier.seconds, adjusted: quantity * tier.seconds / multiplier, power: quantity * tier.power, resources: trainingResourceTotals(key, quantity, troopType) };
        });
        const total = results.reduce(function(value, result) {
          value.quantity += result.quantity;
          value.base += result.base;
          value.adjusted += result.adjusted;
          value.power += result.power;
          addTrainingResources(value.resources, result.resources);
          return value;
        }, { quantity: 0, base: 0, adjusted: 0, power: 0, resources: { ore: 0, mana: 0, wood: 0, gold: 0 } });
        const body = document.querySelector("[data-training-speedup-body]");
        const summary = document.querySelector("[data-training-speedup-summary]");
        const resources = document.querySelector("[data-training-speedup-resources]");
        if (body) body.innerHTML = results.map(function(result) {
          return '<tr><td>' + trainingTierCell(result.key) + '</td><td>' + trainingCompactValue(result.quantity) + '</td><td>' + trainingDuration(result.base) + '</td><td>' + trainingDuration(result.adjusted) + '</td><td>' + trainingCompactValue(result.power) + '</td><td>' + trainingResourcesCell(result.resources) + '</td></tr>';
        }).join("");
        if (summary) summary.innerHTML =
          trainingSummaryCard("Total troops", trainingCompactNumber(total.quantity)) +
          trainingSummaryCard("Base time", trainingDuration(total.base)) +
          trainingSummaryCard("Speedup needed", trainingDuration(total.adjusted)) +
          trainingSummaryCard("Power gained", trainingCompactNumber(total.power));
        if (resources) resources.innerHTML = trainingResourceSummary(total.resources);
        state.trainingSummary = "KELLA TRAINING - SPEEDUP PLAN\\nTroop type: " + trainingTroopTypes[troopType] + "\\nTraining buff: " + formatNumber(buff) + "%\\nTotal troops: " + trainingCompactNumber(total.quantity) + "\\nSpeedup needed: " + trainingDuration(total.adjusted) + "\\nPower gained: " + trainingCompactNumber(total.power) + "\\nResources: " + trainingResourcesText(total.resources) + "\\n\\n" + results.filter(function(result) { return result.quantity > 0; }).map(function(result) {
          return trainingTierLabel(result.key) + ": " + trainingCompactNumber(result.quantity) + " - " + trainingDuration(result.adjusted) + "\\n" + trainingResourcesText(result.resources);
        }).join("\\n");
      }

      function updateTrainingPower() {
        const target = Math.floor(trainingValue('[data-training-power="target"]'));
        const buff = trainingValue('[data-training-power="buff"]');
        const troopType = trainingSelectedTroopType();
        const multiplier = 1 + buff / 100;
        const results = trainingTierOrder.map(function(key) {
          const tier = trainingTiers[key];
          const units = target ? Math.ceil(target / tier.power) : 0;
          return { key, units, adjusted: units * tier.seconds / multiplier, power: units * tier.power, resources: trainingResourceTotals(key, units, troopType) };
        });
        const fastest = results.slice().sort(function(a, b) { return a.adjusted - b.adjusted; })[0];
        const body = document.querySelector("[data-training-power-body]");
        const summary = document.querySelector("[data-training-power-summary]");
        if (body) body.innerHTML = results.map(function(result) {
          return '<tr><td>' + trainingTierCell(result.key) + '</td><td>' + trainingCompactValue(result.units) + '</td><td>' + formatNumber(trainingTiers[result.key].power) + '</td><td><strong>' + trainingDuration(result.adjusted) + '</strong></td><td>' + trainingResourcesCell(result.resources) + '</td></tr>';
        }).join("");
        if (summary) summary.innerHTML =
          trainingSummaryCard("Target power", trainingCompactNumber(target)) +
          trainingSummaryCard("Training buff", formatNumber(buff) + "%") +
          trainingSummaryCard("Troop type", trainingTroopTypes[troopType]) +
          trainingSummaryCard("Fastest time", fastest ? trainingDuration(fastest.adjusted) : "0m");
        state.trainingSummary = "KELLA TRAINING - TARGET POWER\\nTarget: " + trainingCompactNumber(target) + " power\\nTroop type: " + trainingTroopTypes[troopType] + "\\nTraining buff: " + formatNumber(buff) + "%\\n\\n" + results.map(function(result) {
          return trainingTierLabel(result.key) + ": " + trainingCompactNumber(result.units) + " units - " + trainingDuration(result.adjusted) + "\\n" + trainingResourcesText(result.resources);
        }).join("\\n");
      }

      function trainingMixedSavedTotals() {
        return state.trainingMixedSteps.reduce(function(total, step) {
          total.units += Number(step.totalUnits) || 0;
          total.time += Number(step.adjustedSeconds) || 0;
          total.points += Number(step.points) || 0;
          total.power += Number(step.power) || 0;
          addTrainingResources(total.resources, step.resources || emptyTrainingResources());
          return total;
        }, { units: 0, time: 0, points: 0, power: 0, resources: emptyTrainingResources() });
      }

      function renderTrainingSavedPlan() {
        const container = document.querySelector("[data-training-saved-plan]");
        if (!container) return;
        if (!state.trainingMixedSteps.length) {
          container.innerHTML = '<div class="training-empty">No saved training steps yet.</div>';
          return;
        }
        const totals = trainingMixedSavedTotals();
        container.innerHTML =
          '<div class="training-saved-plan-head"><h3>Saved Steps</h3><button class="secondary" type="button" data-action="clear-training-steps">Clear</button></div>' +
          '<div class="training-table-wrap"><table class="training-table training-table-resources"><thead><tr><th>Action</th><th>Time used</th><th>Troop mix</th><th>Points</th><th>Resources</th><th></th></tr></thead><tbody>' +
          state.trainingMixedSteps.map(function(step) {
            const mix = Object.entries(trainingTroopTypes).filter(function(entry) { return Number(step.units?.[entry[0]]) > 0; }).map(function(entry) {
              return '<span>' + escapeHtml(entry[1]) + ': <strong>' + trainingCompactValue(step.units[entry[0]]) + '</strong></span>';
            }).join("");
            return '<tr><td>' + trainingTierCell(step.key) + '</td><td>' + escapeHtml(trainingDuration(step.adjustedSeconds)) + '</td><td><div class="training-step-units">' + mix + '</div></td><td>' + trainingCompactValue(step.points) + '</td><td>' + trainingResourcesCell(step.resources) + '</td><td><button class="danger training-step-remove" type="button" title="Remove step" aria-label="Remove step" data-action="remove-training-step" data-training-step-id="' + escapeHtml(step.id) + '">&times;</button></td></tr>';
          }).join("") +
          '</tbody><tfoot><tr><th>Total</th><th>' + escapeHtml(trainingDuration(totals.time)) + '</th><th>' + trainingCompactValue(totals.units) + ' units</th><th>' + trainingCompactValue(totals.points) + '</th><th colspan="2">' + trainingResourcesCell(totals.resources) + '</th></tr></tfoot></table></div>';
      }

      function updateTrainingMixed() {
        const days = trainingValue('[data-training-mixed="days"]');
        const hours = Math.min(23, trainingValue('[data-training-mixed="hours"]'));
        const minutes = Math.min(59, trainingValue('[data-training-mixed="minutes"]'));
        const buff = trainingValue('[data-training-mixed="buff"]');
        const eventKey = document.querySelector('[data-training-mixed="event"]')?.value || "mge1";
        const event = trainingEventScores[eventKey] || trainingEventScores.mge1;
        const key = trainingTierOrder.includes(state.trainingMixedTier) ? state.trainingMixedTier : "t5";
        state.trainingMixedTier = key;
        const tier = trainingTiers[key];
        const multiplier = 1 + buff / 100;
        const budgetSeconds = ((days * 24 + hours) * 60 + minutes) * 60;
        const savedTotals = trainingMixedSavedTotals();
        const remainingSeconds = Math.max(0, budgetSeconds - savedTotals.time);
        const maxUnits = Math.floor((remainingSeconds * multiplier) / tier.seconds);
        const units = {};
        let unitsLeft = maxUnits;
        let totalUnits = 0;
        const resources = emptyTrainingResources();
        Object.keys(trainingTroopTypes).forEach(function(troopType) {
          const numberInput = document.querySelector('[data-training-mix-unit="' + troopType + '"]');
          const rangeInput = document.querySelector('[data-training-mix-range="' + troopType + '"]');
          const desired = Math.max(0, Math.floor(Number(numberInput?.value) || 0));
          const value = Math.min(desired, unitsLeft);
          units[troopType] = value;
          unitsLeft -= value;
          totalUnits += value;
          if (numberInput) {
            numberInput.max = String(maxUnits);
            if (Number(numberInput.value) !== value) numberInput.value = String(value);
          }
          if (rangeInput) {
            rangeInput.max = String(maxUnits);
            rangeInput.value = String(value);
          }
          const percent = document.querySelector('[data-training-mix-percent="' + troopType + '"]');
          if (percent) percent.textContent = (maxUnits ? Math.round(value / maxUnits * 100) : 0) + "%";
          addTrainingResources(resources, trainingResourceTotals(key, value, troopType));
        });
        document.querySelectorAll('[data-action="training-mixed-tier"]').forEach(function(button) {
          button.classList.toggle("active", button.getAttribute("data-training-tier") === key);
        });
        const adjustedSeconds = totalUnits * tier.seconds / multiplier;
        const points = totalUnits * (Number(event[key]) || 0);
        const power = totalUnits * tier.power;
        const current = { key, eventKey, eventLabel: event.label, buff, units, totalUnits, adjustedSeconds, points, power, resources, maxUnits, budgetSeconds, remainingSeconds };
        state.trainingMixedCurrent = current;
        const summary = document.querySelector("[data-training-mixed-summary]");
        const resourceContainer = document.querySelector("[data-training-mixed-resources]");
        const saveButton = document.querySelector("[data-training-save-step]");
        if (summary) summary.innerHTML =
          trainingSummaryCard("Selected", trainingCompactNumber(totalUnits) + " / " + trainingCompactNumber(maxUnits)) +
          trainingSummaryCard("Time used", trainingDuration(adjustedSeconds)) +
          trainingSummaryCard("Time left", trainingDuration(Math.max(0, remainingSeconds - adjustedSeconds))) +
          trainingSummaryCard("Event points", trainingCompactNumber(points));
        if (resourceContainer) resourceContainer.innerHTML = trainingResourceSummary(resources);
        if (saveButton) saveButton.disabled = totalUnits <= 0;
        renderTrainingSavedPlan();
        const savedLines = state.trainingMixedSteps.map(function(step, index) {
          const mix = Object.entries(trainingTroopTypes).filter(function(entry) { return Number(step.units?.[entry[0]]) > 0; }).map(function(entry) {
            return entry[1] + " " + trainingCompactNumber(step.units[entry[0]]);
          }).join(", ");
          return (index + 1) + ". " + trainingTierLabel(step.key) + " - " + mix + " - " + trainingCompactNumber(step.points) + " points - " + trainingResourcesText(step.resources);
        });
        state.trainingSummary = "KELLA TRAINING - MIXED PLAN\\nEvent: " + event.label + "\\nBudget: " + trainingDuration(budgetSeconds) + "\\nTraining buff: " + formatNumber(buff) + "%\\n\\n" + (savedLines.length ? savedLines.join("\\n") : "Current selection: " + trainingCompactNumber(totalUnits) + " " + trainingTierLabel(key) + " units\\n" + trainingResourcesText(resources));
      }

      function syncTrainingMixedInput(target) {
        const troopType = target.getAttribute("data-training-mix-unit") || target.getAttribute("data-training-mix-range");
        if (!troopType) return;
        const numberInput = document.querySelector('[data-training-mix-unit="' + troopType + '"]');
        const rangeInput = document.querySelector('[data-training-mix-range="' + troopType + '"]');
        const maxUnits = Math.max(0, Number(numberInput?.max || rangeInput?.max) || 0);
        const others = Object.keys(trainingTroopTypes).filter(function(key) { return key !== troopType; }).reduce(function(total, key) {
          return total + Math.max(0, Number(document.querySelector('[data-training-mix-unit="' + key + '"]')?.value) || 0);
        }, 0);
        const value = Math.min(Math.max(0, Math.floor(Number(target.value) || 0)), Math.max(0, maxUnits - others));
        if (numberInput) numberInput.value = String(value);
        if (rangeInput) rangeInput.value = String(value);
      }

      function saveTrainingMixedStep() {
        const current = state.trainingMixedCurrent;
        if (!current || current.totalUnits <= 0) throw new Error("Select at least one troop before saving.");
        state.trainingMixedSteps.push({
          id: String(Date.now()) + Math.random().toString(16).slice(2),
          key: current.key,
          eventKey: current.eventKey,
          eventLabel: current.eventLabel,
          buff: current.buff,
          units: { ...current.units },
          totalUnits: current.totalUnits,
          adjustedSeconds: current.adjustedSeconds,
          points: current.points,
          power: current.power,
          resources: { ...current.resources }
        });
        document.querySelectorAll("[data-training-mix-unit], [data-training-mix-range]").forEach(function(input) { input.value = "0"; });
        updateTrainingMixed();
      }

      function updateTrainingTools() {
        if (location.pathname !== "/training-tools") return;
        if (state.trainingMode === "speedup") return updateTrainingSpeedup();
        if (state.trainingMode === "power") return updateTrainingPower();
        if (state.trainingMode === "mixed") return updateTrainingMixed();
        updateTrainingPoints();
      }

      function renderDashboardData(summary, members = [], events = []) {
        const dashboardActions = hasAdminAccess()
          ? '<button class="secondary" data-action="sync-discord-members">Sync Discord</button><button class="primary" data-link-button="/tools">Open Tools</button>'
          : "";
        const eventActions = hasAdminAccess()
          ? '<button class="primary" data-link-button="/tools">Create Event</button>'
          : '';
        app.innerHTML =
          pageHeader("Dashboard", "A cleaner command room for events, power, and member activity.", dashboardActions) +
          '<section class="card" style="margin-bottom:18px"><div class="card-header"><div><h3>Event Calendar</h3><span class="muted">' + monthTitle() + ' active and past events. Click any day to view event attendance.</span></div><div class="toolbar">' + eventActions + '</div></div>' + renderEventsCalendar(events) + '</section>' +
          '<section class="card alliance-stats-card"><div class="card-header"><div><h3>Members Stats</h3><span class="muted">Top 50 ranking graph based on the selected stat from your latest roster uploads.</span></div></div>' + renderPowerBoard(members) + '</section>';
      }

      async function renderDashboard() {
        skeleton("Loading dashboard...");
        try {
          const results = await Promise.all([loadSummary(), loadSettings(), loadDashboardMembers(), loadDashboardEvents(), loadBuffSchedule()]);
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
        const profileParams = new URLSearchParams(location.search);
        if (profileParams.get("section") === "lord") {
          const requestedTool = profileParams.get("tool") || "";
          return renderLordTools(true, requestedTool || undefined);
        }
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
            pageHeader("My Profile", "Your player card, Discord identity, and personal alliance progress.", '<button class="primary" data-action="save-my-profile">Save Profile</button>') +
            profileHubNav("profile") +
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
            pageHeader("Roots Registration", "Members click one button for 14 UTC or 20 UTC, and Kella saves one current answer per player per slot.", '<button class="primary" data-action="send-roots-registration">Create Roots Panel</button>') +
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
          const results = await Promise.all([loadDashboardEvents(), loadBuffSchedule()]);
          const events = results[0];
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
              return '<div class="card"><div class="card-header"><h3>' + command + '</h3></div><p>Use this in Discord to create the matching Kella workflow.</p></div>';
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
          ["embed", "Embed Sender"],
          ["thumbnails", "Thumbnails"]
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
        const results = await Promise.all([loadDashboardEvents(), loadBuffSchedule()]);
        const events = results[0];
        return '<section class="card" style="margin-top:18px"><div class="card-header"><div><h3>Create Event Embed</h3><span class="muted">Kella sends Attending, Absent, and Not Sure buttons automatically.</span></div><div class="toolbar"><span class="badge warn">24-hour UTC</span><button class="primary" data-action="send-event-embed">Send Event</button></div></div><div class="form-grid">' +
            channelHtml +
            '<label>Role Mention ID<input data-event="roleMentionId" placeholder="Optional role ID" /></label>' +
            '<label>Event Title<input data-event="title" placeholder="Summit, Roots of War, Fortress..." /></label>' +
            utcEventTimeControls() +
            '<label class="wide">Description<textarea data-event="description" placeholder="Tell members what to do, where to go, and what time to be ready."></textarea></label>' +
          '</div></section>' +
          '<section class="card" style="margin-top:18px"><div class="card-header"><h3>Recent Sent Events</h3><button class="secondary" data-action="refresh-events">Refresh</button></div>' + renderRecentEvents(events) + '</section>';
      }

      function optionalLinkButtonFields(scope) {
        return '<div class="wide optional-link-button" data-link-button-settings="' + escapeHtml(scope) + '">' +
          '<div class="optional-link-button-head"><div><strong>Add Link Button</strong><span>Optional button shown below the Discord message.</span></div>' +
            '<button class="switch" type="button" data-action="toggle-message-link-button" data-button-scope="' + escapeHtml(scope) + '" aria-pressed="false" aria-label="Toggle link button"><i></i></button>' +
          '</div><div class="optional-link-button-fields">' +
            '<label>Button Name<input data-' + escapeHtml(scope) + '="buttonLabel" maxlength="80" placeholder="Open Registration" disabled /></label>' +
            '<label>Button Link<input data-' + escapeHtml(scope) + '="buttonUrl" type="url" placeholder="https://..." disabled /></label>' +
          '</div></div>';
      }

      function setOptionalLinkButtonState(scope, enabled) {
        const panel = document.querySelector('[data-link-button-settings="' + scope + '"]');
        const toggle = panel?.querySelector('[data-action="toggle-message-link-button"]');
        if (!panel || !toggle) return;
        toggle.classList.toggle("on", Boolean(enabled));
        toggle.setAttribute("aria-pressed", enabled ? "true" : "false");
        panel.querySelectorAll("input").forEach(function(input) { input.disabled = !enabled; });
      }

      function optionalLinkButtonEnabled(scope) {
        return document.querySelector('[data-link-button-settings="' + scope + '"] [data-action="toggle-message-link-button"]')?.classList.contains("on") || false;
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
          optionalLinkButtonFields("chat") +
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
            optionalLinkButtonFields("embed") +
          '</div></div>' +
          '<aside class="preview" data-embed-preview><img class="thumb" data-preview-thumb alt="" /><h3 data-preview-title></h3><p data-preview-description></p><img class="image" data-preview-image alt="" /><a class="preview-link-button" data-preview-button></a><footer data-preview-footer></footer></aside></section>';
      }

      async function thumbnailToolContent() {
        let channelField = '<label>Discord Channel<input data-thumbnail-send="channelManual" placeholder="Paste channel ID" /></label>';
        try {
          await loadChannels();
          channelField = '<label>Discord Channel<select data-thumbnail-send="channelId">' + channelOptions() + '</select></label>';
        } catch {
          state.channels = [];
        }
        const backgrounds = thumbnailBackgrounds.map(function(item) {
          return '<button class="thumbnail-background" type="button" data-thumbnail-background="' + escapeHtml(item.src) + '" title="' + escapeHtml(item.label) + '"><img src="' + escapeHtml(item.src) + '" alt="' + escapeHtml(item.label) + '" loading="lazy" /></button>';
        }).join("");
        return '<section class="card" style="margin-top:18px" data-thumbnail-editor>' +
          '<div class="card-header"><div><h3>Thumbnails</h3><span class="muted">Design an announcement image, download it, or send it through Kella.</span></div><button class="primary" type="button" data-action="send-thumbnail">Send Picture</button></div>' +
          '<div class="form-grid">' + channelField +
            '<label>Role Mention ID<input data-thumbnail-send="roleMentionId" placeholder="Optional role ID" /></label>' +
            '<label class="wide">Discord Message<input data-thumbnail-send="message" maxlength="1000" placeholder="Optional message above the picture" /></label>' +
          '</div>' +
          '<div class="thumbnail-workspace"><div class="thumbnail-stage-card">' +
            '<div class="thumbnail-toolbar">' +
              '<button class="secondary" type="button" data-thumbnail-action="add-text">Add Text</button>' +
            '</div>' +
            '<div class="thumbnail-canvas-shell"><canvas class="thumbnail-canvas" data-thumbnail-canvas aria-label="Thumbnail editor canvas"></canvas></div>' +
            '<h4 style="margin:14px 0 8px">Backgrounds</h4><div class="thumbnail-backgrounds">' + backgrounds + '</div>' +
          '</div><aside class="thumbnail-sidebar">' +
            '<h4>Text Style</h4><div class="thumbnail-controls" data-thumbnail-controls></div>' +
            '<div class="thumbnail-status" data-thumbnail-status>Click text to type. Drag to move, use any corner to resize, or use X to delete.</div>' +
          '</aside></div>' +
        '</section>';
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
          if (selected === "thumbnails") content = await thumbnailToolContent();
          app.innerHTML = pageHeader("Tools", "Pick the admin tool you need. Events, chat, alerts, shield warnings, embeds, and thumbnails live here.", "") + toolPicker(selected) + content;
          if (selected === "embed") updateEmbedPreview();
          if (selected === "thumbnails") requestAnimationFrame(function() { window.KellaThumbnailEditor?.mount(document.querySelector("[data-thumbnail-editor]")); });
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
            '<section class="card"><div class="card-header"><div><h3>Admin Inbox</h3><span class="muted">Use Pending while reviewing, then Resolve when handled.</span></div></div>' +
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
                '<label class="wide wiki-toggle-field"><input type="checkbox" data-complaint="anonymous" /> Submit anonymously to R4s</label>' +
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

      function complaintFormMarkup() {
        return '<section class="card complaint-form-card" data-complaint-form>' +
          '<div class="card-header"><div><h3>Complaint or Suggestion</h3><span class="muted">Privately send your message to the R4 review inbox.</span></div></div>' +
          '<div class="form-grid">' +
            '<label>Type<select data-complaint="kind"><option value="Complaint">Complaint</option><option value="Suggestion">Suggestion</option></select></label>' +
            '<label>Title<input data-complaint="title" maxlength="140" placeholder="Short title" /></label>' +
            '<label class="wide">Description<textarea data-complaint="description" maxlength="1800" placeholder="Tell the R4s what happened or what should improve."></textarea></label>' +
            '<label class="wide wiki-toggle-field"><input type="checkbox" data-complaint="anonymous" /> Submit anonymously to R4s</label>' +
            '<label class="wide">Optional Picture<input type="file" data-complaint-image accept="image/png,image/jpeg,image/webp" /><span class="muted">Optional screenshot, under 3 MB.</span></label>' +
          '</div>' +
          '<div class="complaint-preview" data-complaint-image-preview>No picture selected.</div>' +
          '<div class="toolbar"><button class="secondary" type="button" data-link-button="/">Back to Dashboard</button><button class="primary" type="button" data-action="submit-complaint">Submit to R4s</button></div>' +
        '</section>';
      }

      async function renderMemberFeedback() {
        skeleton("Loading feedback form...");
        try {
          const auth = await loadAuth(true);
          const content = auth.authenticated
            ? complaintFormMarkup()
            : '<section class="card complaint-form-card"><div class="card-header"><div><h3>Discord Login Required</h3><span class="muted">Login confirms that you are an alliance member. You can still submit anonymously.</span></div></div><p>Your complaint or suggestion stays private to alliance admins.</p><div class="toolbar"><button class="secondary" type="button" data-link-button="/">Back to Dashboard</button><button class="primary" type="button" data-action="discord-login">Login with Discord</button></div></section>';
          app.innerHTML =
            pageHeader("Feedback", "Send a private complaint or suggestion to the R4 team.") +
            '<div class="feedback-page">' + content + '</div>';
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load the feedback form. ' + escapeHtml(error.message || "Please try again.") + '</div>';
        }
      }

      function renderFeedbackSuccess() {
        app.innerHTML =
          pageHeader("Feedback Sent", "Kella delivered your message to the R4 review inbox.") +
          '<div class="feedback-page"><section class="card complaint-form-card"><div class="card-header"><div><h3>Submission Confirmed</h3><span class="muted">Your complaint or suggestion is now being reviewed by the R4 team.</span></div></div><div class="toolbar"><button class="secondary" type="button" data-link-button="/">Back to Dashboard</button><button class="primary" type="button" data-action="new-complaint">Send Another</button></div></section></div>';
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
          anonymous: Boolean(root.querySelector('[data-complaint="anonymous"]')?.checked),
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
          message: chatFormValue("message"),
          buttonEnabled: optionalLinkButtonEnabled("chat"),
          buttonLabel: chatFormValue("buttonLabel"),
          buttonUrl: chatFormValue("buttonUrl")
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
          roleMentionId: embedFormValue("roleMentionId"),
          buttonEnabled: optionalLinkButtonEnabled("embed"),
          buttonLabel: embedFormValue("buttonLabel"),
          buttonUrl: embedFormValue("buttonUrl")
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
        const button = preview.querySelector("[data-preview-button]");
        button.style.display = payload.buttonEnabled ? "inline-block" : "none";
        button.textContent = payload.buttonLabel || "Open Link";
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
            optionalLinkButtonFields("embed") +
          '</div></div>' +
          '<aside class="preview" data-embed-preview><img class="thumb" data-preview-thumb alt="" /><h3 data-preview-title></h3><p data-preview-description></p><img class="image" data-preview-image alt="" /><a class="preview-link-button" data-preview-button></a><footer data-preview-footer></footer></aside></section>';
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
            renderCommandSettings(settings.disabledCommands || [], locked) +
            renderRosterUploadManager(uploads, locked);
          syncSettingsLock();
        } catch (error) {
          app.innerHTML = '<div class="error">Could not load settings. ' + escapeHtml(error.message) + '</div>';
        }
      }

      function renderCommandSettings(disabledCommands, locked) {
        const disabled = new Set(disabledCommands || []);
        return '<section class="card command-settings"><div class="card-header"><div><h3>Discord Commands</h3><span class="muted">Choose which slash commands Kella will answer. Changes apply within about 30 seconds.</span></div></div>' +
          '<div class="command-settings-grid">' +
            dashboardCommands.map(function(command) {
              const enabled = !disabled.has(command.name);
              return '<div class="command-setting"><div><strong>/' + escapeHtml(command.name) + ' - ' + escapeHtml(command.label) + '</strong><small>' + escapeHtml(command.description) + '</small></div>' +
                '<button class="switch ' + (enabled ? "on" : "") + '" type="button" data-action="toggle-command-setting" data-command-name="' + escapeHtml(command.name) + '" data-admin-required aria-pressed="' + (enabled ? "true" : "false") + '" aria-label="Toggle /' + escapeHtml(command.name) + '"' + (locked ? " disabled" : "") + '><i></i></button></div>';
            }).join("") +
          '</div></section>';
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
            officerRoles: value("officerRoles").split(",").map(function(role) { return role.trim(); }).filter(Boolean),
            disabledCommands: Array.from(document.querySelectorAll("[data-command-name]"))
              .filter(function(toggle) { return !toggle.classList.contains("on"); })
              .map(function(toggle) { return toggle.getAttribute("data-command-name"); })
              .filter(Boolean)
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
            pageHeader("Roots of War", "Registration and reports in one place. Create the Discord panel, then review 14 UTC and 20 UTC attendance below.", '<button class="primary" data-action="send-roots-registration">Create Roots Panel</button>') +
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
        if (path === "/buff-schedule") return renderBuffSchedule();
        if (path === "/lord-tools") return navigate("/profile?section=lord");
        if (path === "/research") return renderLordTools(true, "research");
        if (path === "/training-tools") return renderTrainingTools();
        if (path === "/wiki") return renderWiki();
        if (path.startsWith("/wiki/")) return renderWiki(path.slice("/wiki/".length));
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
        if (path === "/complains") return renderMemberFeedback();
        if (path === "/complaints") return renderComplaints();
        if (path === "/settings") return renderSettings();
        navigate("/");
      }

      function navigate(path) {
        history.pushState({}, "", path);
        closeMobileNav();
        route();
      }

      function closeMobileNav() {
        const sidebar = document.querySelector(".sidebar");
        const backdrop = document.querySelector("[data-mobile-nav-close]");
        const toggle = document.querySelector("[data-mobile-nav-toggle]");
        sidebar?.classList.remove("open");
        backdrop?.classList.remove("open");
        toggle?.setAttribute("aria-expanded", "false");
        document.body.classList.remove("mobile-nav-open");
      }

      function toggleMobileNav() {
        const sidebar = document.querySelector(".sidebar");
        const backdrop = document.querySelector("[data-mobile-nav-close]");
        const toggle = document.querySelector("[data-mobile-nav-toggle]");
        const opening = !sidebar?.classList.contains("open");
        sidebar?.classList.toggle("open", opening);
        backdrop?.classList.toggle("open", opening);
        toggle?.setAttribute("aria-expanded", String(opening));
        document.body.classList.toggle("mobile-nav-open", opening);
      }

      function finishLordResearchPan(event) {
        if (!event) return;
        lordResearchPointers.delete(event.pointerId);
        if (lordResearchPan && event.pointerId === lordResearchPan.pointerId) {
          const pan = lordResearchPan;
          pan.viewport.classList.remove("is-dragging");
          if (pan.moved) lordResearchBlockClickUntil = Date.now() + 250;
          if (pan.viewport.hasPointerCapture?.(event.pointerId)) pan.viewport.releasePointerCapture(event.pointerId);
          lordResearchPan = null;
        }
        if (lordResearchPointers.size < 2) lordResearchPinch = null;
      }

      document.addEventListener("pointerdown", function(event) {
        const viewport = event.target.closest?.("[data-lord-research-scroll]");
        if (!viewport || event.button !== 0) return;
        lordResearchPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
        viewport.setPointerCapture?.(event.pointerId);
        if (lordResearchPointers.size === 2) {
          const points = Array.from(lordResearchPointers.values());
          const rect = viewport.getBoundingClientRect();
          const midX = ((points[0].x + points[1].x) / 2) - rect.left;
          const midY = ((points[0].y + points[1].y) / 2) - rect.top;
          lordResearchPinch = {
            viewport: viewport,
            distance: Math.max(1, Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y)),
            zoom: state.lordResearchZoom,
            worldX: (midX - state.lordResearchPanX) / state.lordResearchZoom,
            worldY: (midY - state.lordResearchPanY) / state.lordResearchZoom
          };
          lordResearchPan = null;
          return;
        }
        lordResearchPan = {
          viewport: viewport,
          pointerId: event.pointerId,
          startX: event.clientX,
          startY: event.clientY,
          panX: state.lordResearchPanX,
          panY: state.lordResearchPanY,
          moved: false
        };
      });

      document.addEventListener("pointermove", function(event) {
        if (!lordResearchPointers.has(event.pointerId)) return;
        lordResearchPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
        if (lordResearchPinch && lordResearchPointers.size >= 2) {
          const points = Array.from(lordResearchPointers.values()).slice(0, 2);
          const rect = lordResearchPinch.viewport.getBoundingClientRect();
          const distance = Math.max(1, Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y));
          const midX = ((points[0].x + points[1].x) / 2) - rect.left;
          const midY = ((points[0].y + points[1].y) / 2) - rect.top;
          state.lordResearchZoom = Math.max(0.12, Math.min(1.8, lordResearchPinch.zoom * (distance / lordResearchPinch.distance)));
          state.lordResearchPanX = midX - (lordResearchPinch.worldX * state.lordResearchZoom);
          state.lordResearchPanY = midY - (lordResearchPinch.worldY * state.lordResearchZoom);
          applyLordResearchTransform();
          lordResearchBlockClickUntil = Date.now() + 250;
          event.preventDefault();
          return;
        }
        if (!lordResearchPan || event.pointerId !== lordResearchPan.pointerId) return;
        const dx = event.clientX - lordResearchPan.startX;
        const dy = event.clientY - lordResearchPan.startY;
        if (!lordResearchPan.moved && Math.hypot(dx, dy) < 5) return;
        lordResearchPan.moved = true;
        lordResearchPan.viewport.classList.add("is-dragging");
        state.lordResearchPanX = lordResearchPan.panX + dx;
        state.lordResearchPanY = lordResearchPan.panY + dy;
        applyLordResearchTransform();
        event.preventDefault();
      });

      document.addEventListener("pointerup", finishLordResearchPan);
      document.addEventListener("pointercancel", finishLordResearchPan);
      document.addEventListener("wheel", function(event) {
        const viewport = event.target.closest?.("[data-lord-research-scroll]");
        if (!viewport) return;
        event.preventDefault();
        const factor = Math.exp(-event.deltaY * 0.0015);
        setLordResearchZoom(state.lordResearchZoom * factor, event.clientX, event.clientY);
      }, { passive: false });

      document.addEventListener("click", function(event) {
        document.querySelectorAll(".profile-radar-controls details[open]").forEach(function(panel) {
          if (!panel.contains(event.target)) panel.removeAttribute("open");
        });
        if (event.target.closest("[data-mobile-nav-toggle]")) {
          toggleMobileNav();
          return;
        }
        if (event.target.closest("[data-mobile-nav-close]")) {
          closeMobileNav();
          return;
        }
        const modalClose = event.target.closest("[data-member-modal-close]");
        if (modalClose) {
          closeMemberModal();
          return;
        }

        const radarDateAction = event.target.closest('[data-action="set-profile-radar-date"]');
        if (radarDateAction) {
          event.preventDefault();
          const memberId = radarDateAction.getAttribute("data-member-id") || "";
          const date = radarDateAction.getAttribute("data-radar-date") || "";
          selectProfileRadarDate(memberId, date);
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
          openCalendarDayModal(calendarDay.getAttribute("data-calendar-day"), calendarDay.getAttribute("data-calendar-type") || "activity")
            .catch(function(error) { toast(error.message || "Could not open that calendar day.", "error"); });
          return;
        }

        const wikiAssetPicker = event.target.closest(".wiki-misc-picker");
        if (!wikiAssetPicker) closeWikiAssetPanels();

        const wikiBlock = event.target.closest("[data-wiki-block]");
        const wikiCanvas = event.target.closest("[data-wiki-canvas]");
        if (!wikiBlock && wikiCanvas && document.querySelector("[data-wiki-editor]")) {
          syncWikiTextFromDom();
          state.selectedWikiBlockId = "";
          state.wikiTextSelection = null;
          refreshWikiSelection();
          return;
        }
        if (wikiBlock && document.querySelector("[data-wiki-editor]")) {
          const wikiBlockIdValue = wikiBlock.getAttribute("data-wiki-block") || "";
          if (String(state.selectedWikiBlockId) !== String(wikiBlockIdValue)) {
            syncWikiTextFromDom();
            state.selectedWikiBlockId = wikiBlockIdValue;
            bringWikiBlockToFront(wikiBlockIdValue);
            (state.wikiBlocks || []).forEach(updateWikiBlockElement);
            refreshWikiSelection();
          }
          if (!event.target.closest("[data-wiki-text-content]") && !event.target.closest("[data-action]")) return;
        }

        const action = event.target.closest("[data-action]");
        if (!action) return;
        const kind = action.getAttribute("data-action");
        if (kind === "discord-login") {
          window.location.href = "/api/auth/discord";
          return;
        }
        if (kind === "open-my-lord") {
          navigate("/profile?section=lord");
          return;
        }
        if (kind === "back-to-profile") {
          navigate("/profile");
          return;
        }
        if (kind === "lord-view") {
          state.lordView = action.getAttribute("data-lord-view") || "overview";
          state.lordSearch = "";
          if (location.pathname === "/profile") history.replaceState({}, "", "/profile?section=lord&tool=" + encodeURIComponent(state.lordView));
          renderLordTools();
          return;
        }
        if (kind === "save-lord-tools") {
          saveLordToolsData(true);
          return;
        }
        if (kind === "reset-lord-tools") {
          if (!window.confirm("Reset your entire My Lord profile on this device?")) return;
          localStorage.removeItem(LORD_TOOLS_KEY);
          state.lordTools = lordDefaultData();
          state.lordView = "overview";
          state.lordSearch = "";
          renderLordTools();
          toast("My Lord profile reset.");
          return;
        }
        if (kind === "copy-lord-summary") {
          withFeedback(action, function() { return navigator.clipboard.writeText(lordSummaryText()); }, "Commander summary copied.");
          return;
        }
        if (kind === "lord-clear-search") {
          state.lordSearch = "";
          const search = document.querySelector("[data-lord-search]");
          if (search) search.value = "";
          document.querySelectorAll("[data-lord-catalog-item]").forEach(function(card) { card.classList.remove("hidden"); });
          return;
        }
        if (kind === "lord-research-fullscreen") {
          toggleLordResearchFullscreen();
          return;
        }
        if (kind === "lord-research-select") {
          if (Date.now() < lordResearchBlockClickUntil) return;
          lordResearchCurrentNodes();
          state.lordResearchSelected = action.getAttribute("data-research-id") || lordResearchNodes[0].id;
          const node = lordResearchNodes.find(function(item) { return item.id === state.lordResearchSelected; });
          if (node) {
            const data = loadLordToolsData();
            lordResearchSetNodeLevel(data, node, lordResearchNodeLevel(data, node) + 1);
            saveLordToolsData(false);
          }
          refreshLordResearchWorkspace();
          return;
        }
        if (kind === "lord-research-tree") {
          state.lordResearchTree = action.getAttribute("data-research-tree") === "military" ? "military" : "economy";
          lordResearchCurrentNodes();
          state.lordResearchSelected = lordResearchNodes[0]?.id || "";
          renderLordTools();
          return;
        }
        if (kind === "lord-research-step" || kind === "lord-research-max" || kind === "lord-research-reset-node") {
          lordResearchCurrentNodes();
          const nodeId = action.getAttribute("data-research-id") || "";
          const node = lordResearchNodes.find(function(item) { return item.id === nodeId; });
          if (!node) return;
          const data = loadLordToolsData();
          const current = lordResearchNodeLevel(data, node);
          if (kind === "lord-research-step") lordResearchSetNodeLevel(data, node, current + lordNumber(action.getAttribute("data-step")));
          if (kind === "lord-research-max") lordResearchSetNodeLevel(data, node, node.max);
          if (kind === "lord-research-reset-node") lordResearchSetNodeLevel(data, node, 0);
          saveLordToolsData(false);
          refreshLordResearchWorkspace();
          return;
        }
        if (kind === "lord-research-event") {
          const data = loadLordToolsData();
          const settings = lordResearchSettings(data);
          settings.heightsOfPower = !settings.heightsOfPower;
          saveLordToolsData(false);
          action.classList.toggle("on", settings.heightsOfPower);
          refreshLordResearchWorkspace();
          return;
        }
        if (kind === "lord-research-reset-all") {
          const tree = lordResearchTreeKey();
          if (!window.confirm("Reset every " + tree + " research level?")) return;
          const data = loadLordToolsData();
          Object.keys(data.research || {}).forEach(function(key) {
            if (key.startsWith(tree + ":") || (tree === "economy" && !key.includes(":"))) delete data.research[key];
          });
          lordResearchCurrentNodes();
          state.lordResearchSelected = lordResearchNodes[0]?.id || "";
          saveLordToolsData(false);
          renderLordTools();
          toast((tree === "military" ? "Military" : "Economy") + " research reset.");
          return;
        }
        if (kind === "lord-hero-max") {
          const name = action.getAttribute("data-lord-name") || "";
          if (!name) return;
          loadLordToolsData().heroes[name] = { level: 60, stars: 6, skill1: 5, skill2: 5, skill3: 5, skill4: 5, owned: true };
          saveLordToolsData(false);
          renderLordTools();
          toast(name + " marked maxed.");
          return;
        }
        if (kind === "lord-artifact-exemplar") {
          const name = action.getAttribute("data-lord-name") || "";
          if (!name) return;
          const data = loadLordToolsData();
          data.artifacts[name] = data.artifacts[name] || {};
          data.artifacts[name].exemplar = !data.artifacts[name].exemplar;
          data.artifacts[name].owned = true;
          saveLordToolsData(false);
          action.classList.toggle("on", Boolean(data.artifacts[name].exemplar));
          return;
        }
        if (kind === "lord-decoration-active") {
          const name = action.getAttribute("data-lord-name") || "";
          if (!name) return;
          const data = loadLordToolsData();
          data.decorations[name] = data.decorations[name] || {};
          const next = !data.decorations[name].active;
          const activeCount = Object.values(data.decorations).filter(function(item) { return item?.active; }).length;
          if (next && activeCount >= 5) {
            toast("Only five decorations can be active.", "error");
            return;
          }
          data.decorations[name].active = next;
          data.decorations[name].owned = true;
          saveLordToolsData(false);
          action.classList.toggle("on", next);
          action.textContent = next ? "Active" : "Inactive";
          const count = document.querySelector("[data-lord-active-count]");
          if (count) count.textContent = (next ? activeCount + 1 : Math.max(0, activeCount - 1)) + " / 5 active";
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
          state.auth = { authenticated: false, isDashboardAdmin: false, isDashboardWikiEditor: false };
          state.channels = null;
          state.templates = null;
          state.profile = null;
          updateAuthStatus();
          await route();
        }, "Logged out.");
        if (kind === "copy-command") withFeedback(action, function() { return navigator.clipboard.writeText(action.getAttribute("data-value") || ""); }, "Command copied.");
        if (kind === "toggle-message-link-button") {
          const scope = action.getAttribute("data-button-scope") || "";
          const enabled = !action.classList.contains("on");
          setOptionalLinkButtonState(scope, enabled);
          if (scope === "embed") updateEmbedPreview();
          return;
        }
        if (kind === "save-buff-schedule") withFeedback(action, async function() {
          const sendToDiscord = Boolean(document.querySelector("[data-buff-send-discord]")?.checked);
          const result = await sendJson("PUT", "/api/dashboard/buff-schedule", { days: readBuffScheduleForm(), sendToDiscord }, true);
          state.buffSchedule = result;
          await renderBuffSchedule();
          return result.warning || result.message || "Weekly buff schedule saved.";
        }, "Weekly buff schedule saved.");
        if (kind === "reset-buff-schedule") {
          if (!window.confirm("Reset all seven days to Kella's recommended schedule? Save afterward to keep it.")) return;
          state.buffSchedule = { days: defaultBuffSchedule.map(function(item) { return { ...item }; }), updatedAt: null, updatedBy: "Unsaved reset" };
          renderBuffSchedule();
          toast("Defaults restored. Click Save Schedule to keep them.");
          return;
        }
        if (kind === "training-mode") {
          setTrainingMode(action.getAttribute("data-training-mode") || "points");
          return;
        }
        if (kind === "training-mixed-tier") {
          state.trainingMixedTier = action.getAttribute("data-training-tier") || "t5";
          updateTrainingMixed();
          return;
        }
        if (kind === "save-training-step") {
          withFeedback(action, function() { saveTrainingMixedStep(); }, "Training step saved.");
          return;
        }
        if (kind === "remove-training-step") {
          const stepId = action.getAttribute("data-training-step-id") || "";
          state.trainingMixedSteps = state.trainingMixedSteps.filter(function(step) { return step.id !== stepId; });
          updateTrainingMixed();
          toast("Training step removed.");
          return;
        }
        if (kind === "clear-training-steps") {
          state.trainingMixedSteps = [];
          updateTrainingMixed();
          toast("Saved training steps cleared.");
          return;
        }
        if (kind === "reset-training") {
          state.trainingMode = "points";
          state.trainingTroopType = "cavalry";
          state.trainingMixedTier = "t5";
          state.trainingMixedSteps = [];
          state.trainingMixedCurrent = null;
          state.trainingSummary = "";
          renderTrainingTools();
          toast("Training calculator reset.");
          return;
        }
        if (kind === "copy-training-summary") {
          withFeedback(action, function() {
            if (!state.trainingSummary) throw new Error("Enter training values first.");
            return navigator.clipboard.writeText(state.trainingSummary);
          }, "Training results copied.");
          return;
        }
        if (kind === "open-wiki-page") {
          const page = findWikiPageById(action.getAttribute("data-wiki-id") || "");
          if (page) openWikiPage(page);
          return;
        }
        if (kind === "edit-wiki-page") {
          if (!hasWikiEditAccess()) {
            toast("Wiki editor access is required to edit wiki pages.", "error");
            return;
          }
          const page = findWikiPageById(action.getAttribute("data-wiki-id") || "");
          if (!page) {
            toast("Wiki page not found.", "error");
            return;
          }
          const editor = document.querySelector("[data-wiki-editor]");
          if (editor) editor.outerHTML = renderWikiEditor(page);
          document.querySelector("[data-wiki-editor]")?.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        if (kind === "clear-wiki-form") {
          if (!hasWikiEditAccess()) {
            toast("Wiki editor access is required to create wiki pages.", "error");
            return;
          }
          const editor = document.querySelector("[data-wiki-editor]");
          if (editor) editor.outerHTML = renderWikiEditor();
          document.querySelector("[data-wiki-editor]")?.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        if (kind === "add-wiki-text" || kind === "add-wiki-text-after") {
          insertWikiTextBlock(action.getAttribute("data-after-wiki-block") || "");
          return;
        }
        if (kind === "new-complaint") {
          renderMemberFeedback();
          return;
        }
        if (kind === "share-wiki-page") {
          const slug = action.getAttribute("data-wiki-slug") || "";
          if (!slug) {
            toast("This wiki page does not have a share link yet.", "error");
            return;
          }
          const shareUrl = location.origin + "/wiki/" + encodeURIComponent(slug);
          const page = (state.wiki || []).find(function(item) { return String(item.slug || "") === slug; });
          if (navigator.share) {
            navigator.share({ title: page?.title || "Kella Wiki", url: shareUrl }).catch(function(error) {
              if (error?.name !== "AbortError") toast("Could not open the share menu.", "error");
            });
          } else if (navigator.clipboard) {
            navigator.clipboard.writeText(shareUrl).then(function() {
              toast("Wiki link copied.", "success");
            }).catch(function() {
              toast("Could not copy the wiki link.", "error");
            });
          } else {
            window.prompt("Copy this wiki link:", shareUrl);
          }
          return;
        }
        if (kind === "format-wiki-selection") {
          applyWikiSelectionMarkup(action.getAttribute("data-wiki-inline-command") || "");
          return;
        }
        if (kind === "wiki-reader-zoom-out") {
          setWikiReaderZoom((state.wikiReaderZoom || 1) - 0.15);
          return;
        }
        if (kind === "wiki-reader-zoom-in") {
          setWikiReaderZoom((state.wikiReaderZoom || 1) + 0.15);
          return;
        }
        if (kind === "wiki-reader-zoom-reset") {
          setWikiReaderZoom(1);
          return;
        }
        if (kind === "add-wiki-image") {
          state.wikiImageTarget = "";
          document.querySelector("[data-wiki-block-image]")?.click();
          return;
        }
        if (kind === "toggle-wiki-asset-panel") {
          const picker = action.closest(".wiki-misc-picker");
          const panel = picker?.querySelector("[data-wiki-asset-panel]");
          if (panel) {
            const shouldOpen = panel.hidden;
            closeWikiAssetPanels(picker);
            panel.hidden = !shouldOpen;
            if (!panel.hidden) {
              hydrateWikiAssetPanel(panel);
              panel.querySelector("[data-wiki-asset-search]")?.focus();
            }
          }
          return;
        }
        if (kind === "upload-wiki-stock-image") {
          state.wikiStockUploadKind = action.getAttribute("data-wiki-stock-kind") || "misc";
          document.querySelector("[data-wiki-stock-image]")?.click();
          return;
        }
        if (kind === "filter-wiki-tag") {
          state.wikiTag = action.getAttribute("data-wiki-tag") || "";
          document.querySelectorAll("[data-action='filter-wiki-tag']").forEach(function(button) {
            button.classList.toggle("active", normalizedWikiTag(button.getAttribute("data-wiki-tag")) === normalizedWikiTag(state.wikiTag));
          });
          refreshWikiResults();
          return;
        }
        if (kind === "toggle-wiki-editor-tag") {
          const input = document.querySelector('[data-wiki="tags"]');
          if (!input) return;
          const tag = String(action.getAttribute("data-wiki-tag") || "").trim();
          const tags = String(input.value || "").split(",").map(function(item) { return item.trim(); }).filter(Boolean);
          const index = tags.findIndex(function(item) { return normalizedWikiTag(item) === normalizedWikiTag(tag); });
          if (index >= 0) tags.splice(index, 1);
          else if (tag && tags.length < 12) tags.push(tag);
          input.value = tags.join(", ");
          action.classList.toggle("selected", index < 0);
          return;
        }
        if (kind === "add-wiki-asset-image") {
          const src = action.getAttribute("data-wiki-asset-image") || "";
          if (insertWikiInlineImage(src)) {
            toast("Image inserted beside your text.", "success");
          } else {
            insertWikiImageBlock(src);
            toast("Image added to the wiki canvas.", "success");
          }
          return;
        }
        if (kind === "change-wiki-image") {
          const block = selectedWikiBlock();
          if (!block || !["image", "video"].includes(block.type)) {
            toast("Select a picture or video block first.", "error");
            return;
          }
          state.wikiImageTarget = block.id;
          document.querySelector("[data-wiki-block-image]")?.click();
          return;
        }
        if (kind === "toggle-wiki-shadow") {
          const block = selectedWikiBlock();
          if (!block) return;
          block.shadowEnabled = !block.shadowEnabled;
          updateWikiBlockElement(block);
          refreshWikiSelection();
          return;
        }
        if (kind === "bring-wiki-forward") {
          const block = selectedWikiBlock();
          if (!block) return;
          bringWikiBlockToFront(block.id);
          (state.wikiBlocks || []).forEach(updateWikiBlockElement);
          refreshWikiSelection();
          return;
        }
        if (kind === "duplicate-wiki-block") {
          const source = selectedWikiBlock();
          if (!source) return;
          syncWikiTextFromDom();
          const duplicate = sanitizeWikiBlock({
            ...source,
            id: wikiBlockId(),
            x: wikiClamp(source.x + 24, 0, WIKI_PAGE_WIDTH - source.width),
            y: wikiClamp(source.y + 24, 0, WIKI_MAX_PAGE_HEIGHT - source.height),
            zIndex: Math.max(0, ...(state.wikiBlocks || []).map(function(item) { return Number(item.zIndex || 0); })) + 1
          });
          state.wikiBlocks.push(duplicate);
          state.selectedWikiBlockId = duplicate.id;
          refreshWikiBuilder();
          return;
        }
        if (kind === "delete-wiki-block") {
          const blockId = action.getAttribute("data-wiki-delete-block") || action.closest("[data-wiki-block]")?.getAttribute("data-wiki-block") || selectedWikiBlock()?.id || "";
          const block = state.wikiBlocks.find(function(item) { return String(item.id) === String(blockId); });
          if (!block) return;
          state.wikiBlocks = state.wikiBlocks.filter(function(item) { return item.id !== block.id; });
          state.selectedWikiBlockId = state.wikiBlocks[0]?.id || "";
          refreshWikiBuilder();
          return;
        }
        if (kind === "save-wiki-page") withFeedback(action, async function() {
          if (!hasWikiEditAccess()) throw new Error("Wiki editor access is required to save wiki pages.");
          const payload = await wikiPayload();
          if (payload.id) {
            await sendJson("PATCH", "/api/dashboard/wiki/" + encodeURIComponent(payload.id), payload, true);
          } else {
            await sendJson("POST", "/api/dashboard/wiki", payload, true);
          }
          state.wiki = null;
          await renderWiki();
        }, "Wiki saved.");
        if (kind === "delete-wiki-page") withFeedback(action, async function() {
          if (!hasAdminAccess()) throw new Error("Admin access is required to delete wiki pages.");
          const id = action.getAttribute("data-wiki-id") || "";
          const page = findWikiPageById(id);
          if (!id || !page) throw new Error("Wiki page not found.");
          if (!window.confirm("Delete wiki page: " + (page.title || "Wiki page") + "?")) return "Delete cancelled.";
          await sendJson("DELETE", "/api/dashboard/wiki/" + encodeURIComponent(id), undefined, true);
          state.wiki = null;
          await renderWiki();
        }, "Wiki deleted.");
        if (kind === "open-add-member") {
          if (!hasAdminAccess()) {
            toast("Admin access is required to add members.", "error");
            return;
          }
          openAddMemberModal();
          return;
        }
        if (kind === "open-admin-profile-editor") {
          memberModalContent?.querySelector("[data-admin-profile-editor]")?.classList.add("open");
          return;
        }
        if (kind === "close-admin-profile-editor") {
          memberModalContent?.querySelector("[data-admin-profile-editor]")?.classList.remove("open");
          return;
        }
        if (kind === "toggle-profile-graph") {
          const memberId = action.getAttribute("data-member-id") || "";
          const member = findMemberById(memberId) || (state.openMember && String(state.openMember.id) === String(memberId) ? state.openMember : null) || (state.profile && String(state.profile.id) === String(memberId) ? state.profile : null);
          if (!member) return;
          const key = String(member.id || "profile");
          state.profileGraphModes[key] = profileGraphMode(member) === "trend" ? "radar" : "trend";
          refreshMemberSeasonRadar(member);
          return;
        }
        if (kind === "toggle-profile-radar-metric") {
          const memberId = action.getAttribute("data-member-id") || "";
          const metricKey = action.getAttribute("data-metric") || "";
          const member = findMemberById(memberId) || (state.openMember && String(state.openMember.id) === String(memberId) ? state.openMember : null) || (state.profile && String(state.profile.id) === String(memberId) ? state.profile : null);
          if (!member || !statMetricOptions.some(function(metric) { return metric.key === metricKey; })) return;
          const selected = profileRadarMetrics(member).slice();
          const index = selected.indexOf(metricKey);
          if (index >= 0) {
            if (selected.length <= 3) {
              toast("Keep at least three stats on the radar.", "error");
              return;
            }
            selected.splice(index, 1);
          } else {
            if (selected.length >= 10) {
              toast("Choose up to ten radar stats so labels remain readable.", "error");
              return;
            }
            selected.push(metricKey);
          }
          state.profileRadarMetrics[String(member.id || "profile")] = selected;
          if (memberModal?.classList.contains("open")) {
            refreshMemberSeasonRadar(member);
            memberModalContent?.querySelector(".profile-radar-controls details")?.setAttribute("open", "");
          } else if (location.pathname === "/profile") {
            refreshMemberSeasonRadar(member);
            app.querySelector(".profile-radar-controls details")?.setAttribute("open", "");
          }
          return;
        }
        if (kind === "set-stats-metric") {
          const nextMetric = action.getAttribute("data-metric") || "power";
          if (!statMetricOptions.some(function(metric) { return metric.key === nextMetric; })) return;
          state.statsMetric = nextMetric;
          const openMemberId = memberModalContent?.dataset?.memberId || "";
          if (location.pathname === "/") {
            setLoading(action, true);
            Promise.resolve()
              .then(async function() {
                const members = await loadDashboardMembers(true);
                renderDashboardData(state.summary || {}, members, state.events || []);
                if (openMemberId && memberModal?.classList.contains("open")) {
                  const refreshed = findMemberById(openMemberId);
                  if (refreshed) openMemberModal(refreshed);
                }
              })
              .catch(function(error) { toast(error.message || "Could not load that stat.", "error"); })
              .finally(function() { setLoading(action, false); });
            return;
          }
          if (openMemberId && memberModal?.classList.contains("open")) {
            const member = findMemberById(openMemberId) || (state.profile && String(state.profile.id) === String(openMemberId) ? state.profile : null);
            if (member) openMemberModal(member);
          }
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
          state.dashboardMembers = [];
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
          state.dashboardMembers = [];
          state.allMembers = [];
          state.uploads = null;
          await renderMembers();
          return "Imported " + sync.total + " allowed roster members (" + sync.created + " new, " + sync.updated + " updated, " + (sync.merged || 0) + " merged with Discord, " + sync.skipped + " skipped, " + (sync.excluded || 0) + " outside KoG/LWL/mF ignored). Dated snapshots are kept for graphs.";
        }, "Roster members imported.");
        if (kind === "save-my-profile") withFeedback(action, async function() {
          const data = await sendJson("PATCH", "/api/dashboard/profile", readProfileForm(), false);
          state.profile = data.member;
          state.members = [];
          state.dashboardMembers = [];
          state.allMembers = [];
          await renderProfile();
          return "Profile saved.";
        }, "Profile saved.");
        if (kind === "save-member-admin") withFeedback(action, async function() {
          const id = action.getAttribute("data-member-id") || "";
          if (!id) throw new Error("Member id missing.");
          const data = await sendJson("PATCH", "/api/dashboard/members/" + encodeURIComponent(id), readAdminMemberForm(), true);
          const updated = data.member;
          state.dashboardMembers = [];
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
          state.dashboardMembers = [];
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
          state.dashboardMembers = [];
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
          state.dashboardMembers = [];
          await route();
        }, "Page refreshed.");
        if (kind === "refresh-dashboard") withFeedback(action, async function() {
          state.summary = null;
          state.dashboardMembers = [];
          await renderDashboard();
        }, "Dashboard refreshed.");
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
        if (kind === "toggle-calendar-event-form") {
          const form = action.closest("[data-calendar-event-form]");
          const fields = form?.querySelector("[data-calendar-event-fields]");
          if (!fields) return;
          const willOpen = fields.hidden;
          fields.hidden = !willOpen;
          action.setAttribute("aria-expanded", String(willOpen));
          action.textContent = willOpen ? "Close" : "+ Add Event";
          if (willOpen) form.querySelector('[data-calendar-event="title"]')?.focus();
          return;
        }
        if (kind === "toggle-calendar-buff-form") {
          const form = action.closest("[data-calendar-buff-form]");
          const fields = form?.querySelector("[data-calendar-buff-fields]");
          if (!fields) return;
          const willOpen = fields.hidden;
          fields.hidden = !willOpen;
          action.setAttribute("aria-expanded", String(willOpen));
          action.textContent = willOpen ? "Close" : "+ Buff";
          if (willOpen) form.querySelector('[data-calendar-buff="buff"]')?.focus();
          return;
        }
        if (kind === "save-calendar-buff") withFeedback(action, async function() {
          const form = action.closest("[data-calendar-buff-form]");
          if (!form) throw new Error("Realm Buff form is missing.");
          const value = function(name) {
            return (form.querySelector('[data-calendar-buff="' + name + '"]')?.value || "").trim();
          };
          const date = value("date") || action.getAttribute("data-calendar-date") || "";
          const buff = value("buff");
          const timeUtc = value("timeUtc") || "14:00";
          const note = value("note");
          const sendToDiscord = Boolean(form.querySelector("[data-calendar-buff-send-discord]")?.checked);
          if (!date || !buff) throw new Error("Choose a date and Realm Buff.");
          const result = await sendJson("PUT", "/api/dashboard/buff-schedule/date/" + encodeURIComponent(date), { buff, timeUtc, note, sendToDiscord }, true);
          state.buffSchedule = result;
          if (location.pathname === "/") await renderDashboard();
          else if (location.pathname === "/attendance") await renderAttendance();
          else if (location.pathname === "/buff-schedule") await renderBuffSchedule();
          else await renderTools("events");
          if (location.pathname !== "/buff-schedule") await openCalendarDayModal(date, "events");
          return result.warning || result.message || "Buff saved and calendar updated.";
        }, "Buff saved and calendar updated.");
        if (kind === "delete-calendar-buff") withFeedback(action, async function() {
          const date = action.getAttribute("data-calendar-date") || "";
          if (!date) throw new Error("Realm Buff date is missing.");
          if (!window.confirm("Remove the Realm Buff override for " + date + "? The weekly schedule will apply again.")) return "Remove cancelled.";
          const result = await sendJson("DELETE", "/api/dashboard/buff-schedule/date/" + encodeURIComponent(date), undefined, true);
          state.buffSchedule = result;
          if (location.pathname === "/") await renderDashboard();
          else if (location.pathname === "/attendance") await renderAttendance();
          else if (location.pathname === "/buff-schedule") await renderBuffSchedule();
          else await renderTools("events");
          if (location.pathname !== "/buff-schedule") await openCalendarDayModal(date, "events");
          return result.message || "Dated buff removed.";
        }, "Dated buff removed.");
        if (kind === "save-calendar-event") withFeedback(action, async function() {
          const form = action.closest("[data-calendar-event-form]");
          if (!form) throw new Error("Calendar event form is missing.");
          const value = function(name) {
            return (form.querySelector('[data-calendar-event="' + name + '"]')?.value || "").trim();
          };
          const title = value("title");
          const date = value("date") || action.getAttribute("data-calendar-date") || "";
          const time = value("time");
          const publishToDiscord = value("mode") === "discord";
          const channelId = value("channelId");
          if (!title) throw new Error("Add an event name first.");
          if (!date || !time) throw new Error("Choose a valid UTC date and time.");
          const startsAt = new Date(date + "T" + time + ":00Z");
          if (Number.isNaN(startsAt.getTime())) throw new Error("Event time is invalid.");
          const result = await sendJson("POST", "/api/dashboard/events", {
            title,
            description: "",
            startsAt: startsAt.toISOString(),
            channelId,
            publishToDiscord
          }, true);
          state.summary = null;
          await loadDashboardEvents();
          await openCalendarDayModal(date, "events");
          return result.warning || result.message || (publishToDiscord ? "Event saved and published to Discord." : "Event saved to the calendar.");
        }, "Event saved.");
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
          if (location.pathname === "/complains") {
            renderFeedbackSuccess();
          } else {
            closeMemberModal();
          }
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
        if (kind === "toggle-command-setting") {
          const enabled = !action.classList.contains("on");
          action.classList.toggle("on", enabled);
          action.setAttribute("aria-pressed", enabled ? "true" : "false");
          toast("/" + (action.getAttribute("data-command-name") || "command") + " will be " + (enabled ? "enabled" : "disabled") + " when you save settings.");
        }
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
          state.dashboardMembers = [];
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
          state.dashboardMembers = [];
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
          state.dashboardMembers = [];
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
        if (kind === "send-thumbnail") withFeedback(action, async function() {
          const root = document.querySelector("[data-thumbnail-editor]");
          const editor = window.KellaThumbnailEditor?.get(root);
          if (!editor) throw new Error("Thumbnail editor is not ready yet.");
          const channelId = root.querySelector('[data-thumbnail-send="channelId"]')?.value || root.querySelector('[data-thumbnail-send="channelManual"]')?.value || "";
          if (!channelId.trim()) throw new Error("Choose a Discord channel first.");
          const imageDataUrl = editor.toDataUrl();
          await sendJson("POST", "/api/dashboard/tools/thumbnail", {
            channelId,
            roleMentionId: root.querySelector('[data-thumbnail-send="roleMentionId"]')?.value || "",
            message: root.querySelector('[data-thumbnail-send="message"]')?.value || "",
            filename: "kella-announcement.png",
            imageDataUrl
          }, true);
          state.summary = null;
          editor.status("Picture sent to Discord.");
          return "Thumbnail sent through Kella.";
        }, "Thumbnail sent.");
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

      document.addEventListener("dragstart", function(event) {
        const tile = event.target.closest?.("[data-wiki-asset-image]");
        if (!tile || !event.dataTransfer) return;
        const src = tile.getAttribute("data-wiki-asset-image") || "";
        if (!src) return;
        event.dataTransfer.effectAllowed = "copy";
        event.dataTransfer.setData("application/x-kella-wiki-image", src);
        event.dataTransfer.setData("text/plain", src);
      });

      document.addEventListener("dragover", function(event) {
        const canvas = event.target.closest?.("[data-wiki-canvas]");
        if (!canvas || !event.dataTransfer) return;
        if (!Array.from(event.dataTransfer.types || []).includes("application/x-kella-wiki-image")) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
      });

      document.addEventListener("drop", function(event) {
        const canvas = event.target.closest?.("[data-wiki-canvas]");
        if (!canvas || !event.dataTransfer) return;
        const src = event.dataTransfer.getData("application/x-kella-wiki-image") || event.dataTransfer.getData("text/plain");
        const isWikiAsset = isWikiAssetSrc(src);
        if (!src || !isWikiAsset) return;
        event.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.offsetWidth ? WIKI_PAGE_WIDTH / canvas.offsetWidth : 1;
        const scaleY = canvas.offsetHeight ? wikiPageHeight(state.wikiBlocks || []) / canvas.offsetHeight : 1;
        insertWikiImageBlock(src, ((event.clientX - rect.left) * scaleX) - 110, ((event.clientY - rect.top) * scaleY) - 110);
        toast("Image dropped into the wiki page.", "success");
      });

      document.addEventListener("paste", function(event) {
        if (!event.target.matches?.("[data-wiki-text-content]")) return;
        const text = event.clipboardData?.getData("text/plain");
        if (!text) return;
        event.preventDefault();
        document.execCommand("insertText", false, text);
      });

      document.addEventListener("pointerdown", function(event) {
        if (event.target.closest("[data-action='format-wiki-selection']")) {
          event.preventDefault();
          return;
        }
        const editor = document.querySelector("[data-wiki-editor]");
        if (!editor) return;
        if (event.target.closest("[data-action]")) return;
        const blockEl = event.target.closest("[data-wiki-block]");
        if (!blockEl || (event.pointerType === "mouse" && event.button !== 0)) return;
        const isResize = !!event.target.closest("[data-wiki-resize-handle]");
        const isDragHandle = !!event.target.closest("[data-wiki-drag-handle]");
        const isImageBlock = blockEl.classList.contains("wiki-image-block");
        // A: broaden image drag hit detection — clicking anywhere inside .wiki-media-frame uses move-image
        const isMediaCrop = isImageBlock && (!!event.target.closest("[data-wiki-media]") || !!event.target.closest(".wiki-media-frame"));
        if (!isResize && !isDragHandle && !isMediaCrop) return;
        const id = blockEl.getAttribute("data-wiki-block") || "";
        syncWikiTextFromDom();
        bringWikiBlockToFront(id);
        const block = state.wikiBlocks.find(function(item) { return item.id === id; });
        if (!block) return;
        state.selectedWikiBlockId = id;
        const canvas = blockEl.closest("[data-wiki-canvas]");
        const scrollContainer = blockEl.closest(".wiki-canvas-wrap");
        const canvasScaleX = canvas?.offsetWidth ? WIKI_PAGE_WIDTH / canvas.offsetWidth : 1;
        const canvasScaleY = canvas?.offsetHeight ? wikiPageHeight(state.wikiBlocks || []) / canvas.offsetHeight : canvasScaleX;
        const mode = isResize ? "resize-element" : isMediaCrop ? "move-image" : "move-element";
        state.wikiInteractionMode = mode;
        // B: defer pointer capture + drag activation until movement exceeds threshold
        state.wikiDrag = {
          id,
          pointerId: event.pointerId,
          pointerTarget: event.target,
          mode,
          corner: event.target.closest("[data-wiki-resize-handle]")?.getAttribute("data-resize-corner") || "se",
          startX: event.clientX,
          startY: event.clientY,
          canvasScaleX,
          canvasScaleY,
          scrollContainer,
          startScrollLeft: scrollContainer?.scrollLeft || 0,
          startScrollTop: scrollContainer?.scrollTop || 0,
          baseX: block.x,
          baseY: block.y,
          baseWidth: block.width,
          baseHeight: block.height,
          baseImageX: block.imagePositionX,
          baseImageY: block.imagePositionY,
          captured: false,
          threshold: 5
        };
        // Select the block visually but do NOT capture pointer or preventDefault yet
        (state.wikiBlocks || []).forEach(updateWikiBlockElement);
        refreshWikiSelection();
      });

      document.addEventListener("pointermove", function(event) {
        const drag = state.wikiDrag;
        if (!drag || drag.pointerId !== event.pointerId) return;
        // B: wait for movement threshold before activating drag
        const deltaX = Math.abs(event.clientX - drag.startX);
        const deltaY = Math.abs(event.clientY - drag.startY);
        if (!drag.captured && deltaX < drag.threshold && deltaY < drag.threshold) return;
        const block = state.wikiBlocks.find(function(item) { return item.id === drag.id; });
        if (!block) return;
        // B: capture the pointer only after threshold is crossed
        if (!drag.captured) {
          drag.captured = true;
          drag.pointerTarget.setPointerCapture?.(event.pointerId);
        }
        // C: edge auto-scroll — support both vertical and horizontal for all drag modes
        if (drag.scrollContainer) {
          const bounds = drag.scrollContainer.getBoundingClientRect();
          const edge = 54;
          const scrollStep = 14;
          if (event.clientX < bounds.left + edge) drag.scrollContainer.scrollLeft -= scrollStep;
          else if (event.clientX > bounds.right - edge) drag.scrollContainer.scrollLeft += scrollStep;
          if (event.clientY < bounds.top + edge) drag.scrollContainer.scrollTop -= scrollStep;
          else if (event.clientY > bounds.bottom - edge) drag.scrollContainer.scrollTop += scrollStep;
        }
        const scrollDx = (drag.scrollContainer?.scrollLeft || 0) - drag.startScrollLeft;
        const scrollDy = (drag.scrollContainer?.scrollTop || 0) - drag.startScrollTop;
        const dx = (event.clientX - drag.startX + scrollDx) * drag.canvasScaleX;
        const dy = (event.clientY - drag.startY + scrollDy) * drag.canvasScaleY;
        if (drag.mode === "resize-element") {
          const minWidth = block.type === "text" ? 80 : 24;
          const minHeight = block.type === "text" ? 48 : 24;
          let nextX = drag.baseX;
          let nextY = drag.baseY;
          let nextWidth = drag.baseWidth;
          let nextHeight = drag.baseHeight;
          if (drag.corner.includes("e")) nextWidth = drag.baseWidth + dx;
          if (drag.corner.includes("s")) nextHeight = drag.baseHeight + dy;
          if (drag.corner.includes("w")) {
            nextX = drag.baseX + dx;
            nextWidth = drag.baseWidth - dx;
          }
          if (drag.corner.includes("n")) {
            nextY = drag.baseY + dy;
            nextHeight = drag.baseHeight - dy;
          }
          if (nextWidth < minWidth) {
            if (drag.corner.includes("w")) nextX -= minWidth - nextWidth;
            nextWidth = minWidth;
          }
          if (nextHeight < minHeight) {
            if (drag.corner.includes("n")) nextY -= minHeight - nextHeight;
            nextHeight = minHeight;
          }
          nextX = wikiClamp(nextX, 0, WIKI_PAGE_WIDTH - minWidth);
          nextY = wikiClamp(nextY, 0, WIKI_MAX_PAGE_HEIGHT - minHeight);
          nextWidth = wikiClamp(nextWidth, minWidth, WIKI_PAGE_WIDTH - nextX);
          nextHeight = wikiClamp(nextHeight, minHeight, WIKI_MAX_PAGE_HEIGHT - nextY);
          block.x = nextX;
          block.y = nextY;
          block.width = nextWidth;
          block.height = nextHeight;
        } else if (drag.mode === "move-image") {
          block.x = drag.baseX;
          block.y = drag.baseY;
          block.width = drag.baseWidth;
          block.height = drag.baseHeight;
          block.imagePositionX = wikiClamp(drag.baseImageX + dx, -2000, 2000);
          block.imagePositionY = wikiClamp(drag.baseImageY + dy, -2000, 2000);
        } else if (drag.mode === "move-element") {
          block.x = wikiClamp(drag.baseX + dx, 0, WIKI_PAGE_WIDTH - block.width);
          block.y = wikiClamp(drag.baseY + dy, 0, WIKI_MAX_PAGE_HEIGHT - block.height);
        }
        updateWikiBlockElement(block);
        if (drag.mode !== "move-image") resizeWikiPageToContent();
        // C: only preventDefault after drag is actively moving the element
        event.preventDefault();
        event.stopPropagation();
      });

      function finishWikiPointer(event) {
        const drag = state.wikiDrag;
        if (!drag || drag.pointerId !== event.pointerId) return;
        state.wikiDrag = null;
        state.wikiInteractionMode = null;
        drag.pointerTarget?.releasePointerCapture?.(event.pointerId);
        const block = state.wikiBlocks.find(function(item) { return item.id === drag.id; });
        if (block) {
          if (drag.mode === "move-image") {
            block.x = drag.baseX;
            block.y = drag.baseY;
            block.width = drag.baseWidth;
            block.height = drag.baseHeight;
          }
          updateWikiBlockElement(block);
        }
        if (drag.mode !== "move-image") resizeWikiPageToContent();
        refreshWikiSelection();
      }

      document.addEventListener("pointerup", finishWikiPointer);
      document.addEventListener("pointercancel", finishWikiPointer);

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

      document.addEventListener("contextmenu", function(event) {
        const researchNodeButton = event.target.closest?.('[data-action="lord-research-select"]');
        if (!researchNodeButton) return;
        event.preventDefault();
        lordResearchCurrentNodes();
        const nodeId = researchNodeButton.getAttribute("data-research-id") || "";
        const node = lordResearchNodes.find(function(item) { return item.id === nodeId; });
        if (!node) return;
        state.lordResearchSelected = nodeId;
        const data = loadLordToolsData();
        lordResearchSetNodeLevel(data, node, lordResearchNodeLevel(data, node) - 1);
        saveLordToolsData(false);
        refreshLordResearchWorkspace();
      });

      document.addEventListener("change", async function(event) {
        if (event.target.matches("[data-lord-view-select]")) {
          state.lordView = event.target.value || "overview";
          state.lordSearch = "";
          history.replaceState({}, "", "/profile?section=lord&tool=" + encodeURIComponent(state.lordView));
          renderLordTools(true);
          return;
        }
        if (handleLordControl(event.target)) return;
        if (event.target.matches("[data-training-input]")) {
          if (event.target.matches("[data-training-mix-unit], [data-training-mix-range]")) syncTrainingMixedInput(event.target);
          updateTrainingTools();
          return;
        }
        if (event.target.matches("[data-radar-date-select]")) {
          selectProfileRadarDate(event.target.getAttribute("data-member-id") || "", event.target.value || "");
          return;
        }
        if (event.target.matches("[data-buff-day-select]")) {
          const row = event.target.closest("[data-buff-row]");
          const type = buffTypes[event.target.value] || buffTypes.Gathering;
          const icon = row?.querySelector("[data-buff-icon]");
          const label = row?.querySelector("[data-buff-label]");
          const description = row?.querySelector("[data-buff-description]");
          if (icon) icon.src = type.icon;
          if (label) label.textContent = type.label;
          if (description) description.textContent = type.description;
          return;
        }
        if (event.target.matches('[data-calendar-event="mode"]')) {
          const form = event.target.closest("[data-calendar-event-form]");
          const channelField = form?.querySelector("[data-calendar-channel-field]");
          if (channelField) channelField.hidden = event.target.value !== "discord";
          return;
        }
        if (applyWikiInlineStyleChange(event.target)) return;
        if (applyWikiBlockStyleChange(event.target)) return;
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
            roleMentionId: template.roleMentionId,
            buttonLabel: template.buttonLabel,
            buttonUrl: template.buttonUrl
          }).forEach(function(entry) {
            const input = document.querySelector('[data-embed="' + entry[0] + '"]');
            if (input) input.value = entry[1] || "";
          });
          setOptionalLinkButtonState("embed", Boolean(template.buttonEnabled));
          updateEmbedPreview();
        }
        if (event.target.matches("[data-complaint-image]")) {
          const preview = document.querySelector("[data-complaint-image-preview]");
          const file = event.target.files?.[0];
          if (preview) preview.textContent = file ? file.name + " ready to attach." : "No picture selected.";
        }
        if (event.target.matches("[data-wiki-block-image]")) {
          const file = event.target.files?.[0];
          if (!file) return;
          try {
            const imageDataUrl = await readWikiImageFile(file);
            syncWikiTextFromDom();
            const targetId = state.wikiImageTarget || "";
            const mediaType = /^data:video\\//i.test(imageDataUrl) ? "video" : "image";
            const existing = state.wikiBlocks.find(function(block) { return block.id === targetId && ["image", "video"].includes(block.type); });
            if (existing) {
              existing.type = mediaType;
              existing.imageDataUrl = imageDataUrl;
              state.selectedWikiBlockId = existing.id;
            } else {
              insertWikiImageBlock(imageDataUrl);
            }
            event.target.value = "";
            state.wikiImageTarget = "";
            refreshWikiBuilder();
            toast(mediaType === "video" ? "Video added to the wiki canvas." : "Picture added to the wiki canvas.", "success");
          } catch (error) {
            toast(error.message || "Could not add that picture.", "error");
          }
        }
        if (event.target.matches("[data-wiki-stock-image]")) {
          const file = event.target.files?.[0];
          if (!file) return;
          try {
            const imageDataUrl = await readWikiStockImageFile(file);
            const label = wikiStockImageLabel(file.name);
            addWikiCustomStockImage(state.wikiStockUploadKind || "misc", imageDataUrl, label);
            event.target.value = "";
            refreshWikiBuilder();
            toast("Stock image added. Open that picture tab again to use it.", "success");
          } catch (error) {
            toast(error.message || "Could not add that stock image.", "error");
          }
        }
      });

      document.addEventListener("input", async function(event) {
        if (event.target.matches("[data-lord-search]")) {
          state.lordSearch = event.target.value || "";
          const term = state.lordSearch.toLowerCase();
          document.querySelectorAll("[data-lord-catalog-item]").forEach(function(card) {
            card.classList.toggle("hidden", Boolean(term) && !String(card.getAttribute("data-lord-catalog-item") || "").includes(term));
          });
          return;
        }
        if (handleLordControl(event.target)) return;
        if (event.target.matches("[data-training-input]")) {
          if (event.target.matches("[data-training-mix-unit], [data-training-mix-range]")) syncTrainingMixedInput(event.target);
          updateTrainingTools();
          return;
        }
        if (event.target.matches("[data-buff-day-note]")) {
          const note = event.target.closest("[data-buff-row]")?.querySelector("[data-buff-note]");
          if (note) {
            note.textContent = event.target.value;
            note.hidden = !event.target.value.trim();
          }
          return;
        }
        if (event.target.matches("[data-wiki-asset-search]")) {
          hydrateWikiAssetPanel(event.target.closest("[data-wiki-asset-panel]"));
          filterWikiAssetPanel(event.target);
          return;
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
        if (event.target.matches("[data-wiki-search]")) {
          state.wikiSearch = event.target.value || "";
          refreshWikiResults();
          return;
        }
        if (event.target.matches("[data-admin-member-main-search]")) {
          const root = event.target.closest("[data-admin-member-form]");
          const results = root?.querySelector("[data-main-account-results]");
          const memberId = memberModalContent?.dataset?.memberId || "";
          const member = findMemberById(memberId);
          if (results && member) results.innerHTML = farmSearchResults(member, event.target.value || "");
        }
        if (event.target.matches('[data-setting="adminKey"]')) syncSettingsLock();
        if (event.target.matches("[data-wiki-text-content]")) {
          const id = event.target.closest("[data-wiki-block]")?.getAttribute("data-wiki-block") || "";
          const block = state.wikiBlocks.find(function(item) { return item.id === id; });
          if (block) {
            block.text = wikiPlainTextFromEditable(event.target);
            block.richTextHtml = event.target.innerHTML;
            autoFitWikiTextBlock(block, event.target);
          }
        }
        if (applyWikiInlineStyleChange(event.target)) return;
        if (applyWikiBlockStyleChange(event.target)) return;
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

      memberModal?.addEventListener("wheel", function(event) {
        if (!memberModal.classList.contains("wiki-modal")) return;
        const stage = event.target.closest?.("[data-wiki-reader-stage]");
        if (!stage || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
        const panel = memberModal.querySelector(".member-modal-panel");
        if (!panel) return;
        panel.scrollTop += event.deltaY;
        event.preventDefault();
      }, { passive: false });

      window.addEventListener("popstate", route);
      window.addEventListener("resize", fitWikiReader);
      document.addEventListener("fullscreenchange", function() {
        const target = document.querySelector("[data-lord-research-fullscreen]");
        if (!target) {
          document.body.classList.remove("lord-research-fullscreen-open");
          return;
        }
        syncLordResearchFullscreenState(document.fullscreenElement === target);
      });
      document.addEventListener("selectionchange", rememberWikiTextSelection);
      updateServerClock();
      setInterval(updateServerClock, 1000);
      let autoRefreshBusy = false;
      async function refreshDashboardSilently() {
        if (autoRefreshBusy || location.pathname !== "/") return;
        autoRefreshBusy = true;
        try {
          state.summary = null;
          state.dashboardMembers = [];
          state.events = [];
          const results = await Promise.all([loadSummary(), loadDashboardMembers(true), loadDashboardEvents()]);
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
      }, 120000);
      route();
    </script>
  </body>
</html>`;
}

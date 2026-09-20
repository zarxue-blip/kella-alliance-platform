export const baseGameHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
  <meta name="robots" content="noindex,nofollow,noarchive">
  <title>Freya's Sanctuary · Private Base</title>
  <link rel="icon" href="/assets/kella-favicon.png">
  <link rel="stylesheet" href="/assets/base-game/base-game.css?v=1">
</head>
<body>
  <main class="base-app" aria-label="Freya's private sanctuary">
    <section class="base-viewport" aria-label="Playable base world">
      <canvas id="base-world"></canvas>
    </section>

    <header class="base-topbar">
      <a class="brand-chip back-home" href="/" aria-label="Return to Kella home">
        <img src="/assets/base-game/assets/alliance-hub.png" alt="">
        <span><strong>Freya's Sanctuary</strong><span>Owner-only prototype</span></span>
      </a>
      <div class="resource-bar" aria-label="Resources">
        <div class="resource gold"><i>●</i><span>Gold</span><b data-resource="gold">0</b></div>
        <div class="resource wood"><i>◆</i><span>Wood</span><b data-resource="wood">0</b></div>
        <div class="resource stone"><i>■</i><span>Stone</span><b data-resource="stone">0</b></div>
      </div>
      <nav class="top-actions"><a class="game-button back-home" href="/">Return to Kella</a></nav>
    </header>

    <button class="freya-status" id="focus-freya" type="button"><i></i> Find Freya</button>
    <p class="base-hint">Drag to explore · Scroll or pinch to zoom · Select a building to manage it</p>
    <span class="privacy-mark">Private owner workspace</span>

    <div class="build-dock">
      <button class="game-button primary build-toggle" id="build-toggle" type="button"><span>⚒</span> Build</button>
      <section class="build-panel" id="build-panel" aria-label="Build menu">
        <header class="panel-heading"><div><h2>Build</h2><p>Grow your woodland sanctuary.</p></div><button class="icon-button" id="build-close" type="button" aria-label="Close build menu">×</button></header>
        <div class="category-tabs" role="group" aria-label="Building category">
          <button type="button" data-build-category="Buildings" aria-pressed="true">Buildings</button>
          <button type="button" data-build-category="Decorations" aria-pressed="false">Decorations</button>
        </div>
        <div class="build-list" id="build-list"></div>
      </section>
    </div>

    <section class="selection-panel" id="selection-panel" hidden>
      <div class="selection-head"><img id="selection-image" alt=""><div><h2 id="selection-name"></h2><p id="selection-level">Level 1</p></div></div>
      <div class="selection-actions"><button id="move-building" type="button">Move</button><button id="building-info" type="button">Info</button><button id="upgrade-building" type="button">Upgrade</button></div>
    </section>

    <div class="placement-bar" id="placement-bar" hidden><strong id="placement-name">Building</strong><span>Choose a clear spot</span><button class="game-button" id="placement-cancel" type="button">Cancel</button></div>
    <div class="game-toast" id="game-toast" role="status"></div>
    <video class="media-source" id="freya-video" src="/assets/base-game/assets/freya.mp4" muted loop autoplay playsinline preload="auto"></video>
    <video class="media-source" id="altar-video" src="/assets/base-game/assets/altar.mp4" muted loop autoplay playsinline preload="metadata"></video>
  </main>
  <script type="module" src="/assets/base-game/game.js?v=1"></script>
</body>
</html>`;

export function baseGameDeniedHtml(authenticated: boolean) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Private Sanctuary</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:radial-gradient(circle at 50% 20%,#263328,#0a100d 70%);color:#f2e4c4;font:16px/1.6 system-ui}.gate{width:min(470px,calc(100% - 40px));padding:34px;border:1px solid #b99b5866;border-radius:18px;background:#151d18e8;box-shadow:0 25px 70px #0009;text-align:center}.gate img{width:90px;height:90px;object-fit:contain}.gate h1{font:32px Georgia,serif;margin:10px 0}.gate p{color:#b9c1b6}.gate a{display:inline-block;margin:8px 5px;padding:11px 17px;border:1px solid #c8a85e;border-radius:9px;background:#b8913d;color:#18130a;font-weight:800;text-decoration:none}.gate a.secondary{background:transparent;color:#ead9b5}</style></head><body><main class="gate"><img src="/assets/base-game/assets/alliance-hub.png" alt=""><h1>Private Sanctuary</h1><p>${authenticated ? 'This base is reserved for the Kella owner account.' : 'Sign in with the owner Discord account to enter.'}</p>${authenticated ? '' : '<a href="/api/auth/discord">Sign in with Discord</a>'}<a class="secondary" href="/">Return home</a></main></body></html>`;
}

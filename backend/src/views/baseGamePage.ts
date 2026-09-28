export const baseGameHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta
    name="viewport"
    content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
  >
  <meta name="robots" content="noindex,nofollow,noarchive">

  <title>EVO Members Tool</title>

  <link
    rel="icon"
    href="/assets/kella-favicon.png"
  >

  <link
    rel="stylesheet"
    href="/assets/base-game/base-game.css?v=10"
  >
  <link rel="stylesheet" href="/assets/base-game/research-hud.css?v=2">

  <script type="importmap">
    {"imports":{"three":"/assets/base-game/vendor/three.module.js"}}
  </script>
</head>

<body>
  <main
    class="base-app"
    aria-label="EVO members tool"
  >

    <section
      class="base-viewport"
      aria-label="Playable base world"
    >
      <canvas id="base-world"></canvas>
    </section>

    <header class="base-topbar" aria-label="Base status">
      <div class="base-topbar-main">
        <a
          class="base-home-button"
          href="/"
          aria-label="Return to Kella home"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5m6-6-6 6 6 6" />
          </svg>
          <span class="base-home-copy"><small>Return to</small><strong>Home</strong></span>
        </a>

        <span class="base-crest" aria-hidden="true">
          <svg viewBox="0 0 64 64">
            <path d="M32 3 57 14v28L32 61 7 42V14Z" />
            <path d="M32 11 49 19v20L32 51 15 39V19Z" />
            <path d="M19 36c9-1 13-8 13-17 0 9 4 16 13 17-6 1-10 4-13 10-3-6-7-9-13-10Z" />
          </svg>
        </span>
        <div class="base-heading">
          <span class="base-kicker">Alliance sanctuary</span>
          <h1>Woodland <span>Keep</span></h1>
        </div>
      </div>

      <div class="base-topbar-status" aria-label="Alliance details">
        <span class="base-status-token">
          <span class="base-status-glyph" aria-hidden="true">✦</span>
          <span><small>ALLIANCE</small><strong>EVO</strong></span>
        </span>
        <span class="base-status-token">
          <span class="base-status-glyph" aria-hidden="true">◇</span>
          <span><small>REALM</small><strong>881</strong></span>
        </span>
        <span class="base-status-token base-status-access">
          <span class="base-status-glyph" aria-hidden="true">◆</span>
          <span><small>ACCESS</small><strong>Members only</strong></span>
        </span>
      </div>
    </header>

    <p class="base-hint">
      <span class="base-hint-marker" aria-hidden="true">✧</span>
      <span><strong>Explore the keep</strong><small>Drag to explore · Scroll or pinch to zoom</small></span>
    </p>

    <div class="editor-controls" aria-label="Base controls">
      <span class="control-rail-label">World controls</span>
      <button
        class="game-button"
        id="edit-layout"
        type="button"
        aria-label="Arrange buildings"
        aria-pressed="false"
      >
        <span class="control-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" /></svg>
        </span>
        <span class="control-copy"><strong data-arrange-label>Arrange</strong><small data-arrange-subtitle>Move buildings</small></span>
      </button>

      <button
        class="game-button"
        id="fit-base"
        type="button"
        aria-label="Center the base camera"
      >
        <span class="control-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M8 12h8m-4-4v8" /></svg>
        </span>
        <span class="control-copy"><strong>View base</strong><small>Center camera</small></span>
      </button>
    </div>

    <span class="privacy-mark">
      <span aria-hidden="true">✦</span> EVO · 881 <small>Alliance territory</small>
    </span>

    <div class="build-dock">

      <button
        class="game-button primary build-toggle"
        id="build-toggle"
        type="button"
        aria-label="Build menu"
      >
        <span class="build-toggle-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="m14 4 6 6-2 2-6-6m2-2-3 3M4 20l10-10M3 21l5-1-4-4-1 5Z" /></svg>
        </span>
        <span class="build-toggle-copy"><small>Expand the keep</small><strong>Build</strong></span>
        <span class="build-toggle-plus" aria-hidden="true">+</span>
      </button>

      <section
        class="build-panel"
        id="build-panel"
        aria-label="Build menu"
      >

        <header class="panel-heading">
          <div>
            <span class="panel-kicker">Woodland keep</span>
            <h2>Construction</h2>
            <p>
              Grow your alliance sanctuary.
            </p>
          </div>

          <button
            class="icon-button"
            id="build-close"
            type="button"
            aria-label="Close build menu"
          >
            ×
          </button>
        </header>

        <div
          class="category-tabs"
          role="group"
          aria-label="Building category"
        >

          <button
            type="button"
            data-build-category="Buildings"
            aria-pressed="true"
          >
            Buildings
          </button>

          <button
            type="button"
            data-build-category="Decorations"
            aria-pressed="false"
          >
            Decorations
          </button>

          <button
            type="button"
            data-build-category="Roads"
            aria-pressed="false"
          >
            Roads
          </button>

        </div>

        <div
          class="build-list"
          id="build-list"
        ></div>

      </section>
    </div>

    <div
      class="placement-bar"
      id="placement-bar"
      hidden
    >

      <strong id="placement-name">
        Building
      </strong>

      <span
        id="placement-status"
        role="status"
      >
        Choose a clear spot
      </span>

      <button
        class="game-button primary"
        id="placement-confirm"
        type="button"
        aria-label="Confirm placement"
      >
        ✓
      </button>

      <button
        class="game-button"
        id="placement-cancel"
        type="button"
      >
        Cancel
      </button>

    </div>

    <div
      class="game-toast"
      id="game-toast"
      role="status"
    ></div>

    <div
      class="building-modal-backdrop"
      id="building-tool-backdrop"
      hidden
      aria-hidden="true"
    ></div>

    <section
      class="building-modal"
      id="building-tool-modal"
      hidden
      role="dialog"
      aria-modal="true"
      aria-labelledby="building-tool-title"
    >

      <h2
        class="building-modal-title"
        id="building-tool-title"
      >
        Building Tool
      </h2>

      <button
        class="building-modal-close"
        id="building-tool-close"
        type="button"
        aria-label="Close"
      >
        ×
      </button>

      <iframe
        class="building-tool-frame"
        id="building-tool-frame"
        src="about:blank"
        title="Building tool"
        loading="lazy"
      ></iframe>

    </section>

    ${[
      "elf-1",
      "elf-4",
      "goblin-1",
      "goblin-5",
      "pixie-1",
      "pixie-4",
      "wizard-1",
      "wizard-5"
    ]
      .map(
        (name) =>
          `<video
            class="media-source"
            data-character-video
            src="/assets/base-game/assets/characters/${name}.mp4"
            muted
            loop
            autoplay
            playsinline
            preload="auto"
          ></video>`
      )
      .join("")}

  </main>

  <script
    type="module"
    src="/assets/base-game/game.js?v=20"
  ></script>

</body>
</html>`;

export function baseGameDeniedHtml(
  authenticated: boolean
) {
  return `<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">

  <meta
    name="viewport"
    content="width=device-width,initial-scale=1"
  >

  <meta
    name="robots"
    content="noindex,nofollow"
  >

  <title>EVO Members Tool</title>

  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;

      background:
        radial-gradient(
          circle at 50% 20%,
          #263328,
          #0a100d 70%
        );

      color: #f2e4c4;
      font: 16px/1.6 system-ui;
    }

    .gate {
      width: min(
        470px,
        calc(100% - 40px)
      );

      padding: 34px;

      border:
        1px solid
        #b99b5866;

      border-radius: 18px;

      background:
        #151d18e8;

      box-shadow:
        0 25px 70px #0009;

      text-align: center;
    }

    .gate img {
      width: 90px;
      height: 90px;
      object-fit: contain;
    }

    .gate h1 {
      margin: 10px 0;
      font: 32px Georgia, serif;
    }

    .gate p {
      color: #b9c1b6;
    }

    .gate a {
      display: inline-block;

      margin:
        8px 5px;

      padding:
        11px 17px;

      border:
        1px solid #c8a85e;

      border-radius:
        9px;

      background:
        #b8913d;

      color:
        #18130a;

      font-weight:
        800;

      text-decoration:
        none;
    }

    .gate a.secondary {
      background:
        transparent;

      color:
        #ead9b5;
    }
  </style>
</head>

<body>

  <main class="gate">

    <img
      src="/assets/base-game/assets/alliance-hub.png"
      alt=""
    >

    <h1>
      EVO Members Tool
    </h1>

    <p>
      ${
        authenticated
          ? "Access is available to members with the @881 Discord role."
          : "Sign in with Discord to access the EVO Members Tool."
      }
    </p>

    ${
      authenticated
        ? ""
        : '<a href="/api/auth/discord">Sign in with Discord</a>'
    }

    <a
      class="secondary"
      href="/"
    >
      Return home
    </a>

  </main>

</body>
</html>`;
}

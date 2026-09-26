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
    href="/assets/base-game/base-game.css?v=7"
  >

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

    <header class="base-topbar">
      <a
        class="base-home-button"
        href="/"
        aria-label="Return to Kella home"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M3 11.1 12 3l9 8.1v9.4a.5.5 0 0 1-.5.5h-5.3v-6.5H8.8V21H3.5a.5.5 0 0 1-.5-.5z"
          />
          <path
            d="m1.7 12.2 10.3-9.3 10.3 9.3"
          />
        </svg>

        <span>Home</span>
      </a>
    </header>

    <p class="base-hint">
      Drag to explore · Scroll or pinch to zoom · Arrange to move buildings
    </p>

    <div class="editor-controls">

      <button
        class="game-button"
        id="edit-layout"
        aria-pressed="false"
      >
        Arrange
      </button>

      <button
        class="game-button"
        id="fit-base"
      >
        View base
      </button>

    </div>

    <span class="privacy-mark">
      EVO · 881 Members
    </span>

    <div class="build-dock">

      <button
        class="game-button primary build-toggle"
        id="build-toggle"
        type="button"
      >
        <span>⚒</span>
        Build
      </button>

      <section
        class="build-panel"
        id="build-panel"
        aria-label="Build menu"
      >

        <header class="panel-heading">
          <div>
            <h2>Build</h2>
            <p>
              Grow your woodland sanctuary.
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
    src="/assets/base-game/game.js?v=13"
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

const notices: Record<string, string> = {
  pending: "Your signup is waiting for a Kella admin to approve it. Return here and log in after approval.",
  "payment-required": "Your Forest Guardian access has expired. Renew the $5 monthly membership using the same email as your Google account, then return to log in after payment is verified.",
  terminated: "This signup has been closed. Contact a Kella admin if you believe this is a mistake.",
  "invalid-credentials": "That username or password did not match. Please try again.",
  "invalid-signup": "Check your in-game username, Lord ID, and password, then try again.",
  "username-taken": "That in-game username is already registered. Log in or choose another username.",
  cancelled: "Google sign-in was cancelled. You can try again.",
  expired: "That sign-in expired. Please start again.",
  unavailable: "Google sign-in is being configured. Discord sign-in is still available."
};

function pageStart(title: string) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="robots" content="noindex,nofollow,noarchive"/><meta name="referrer" content="no-referrer"/><title>${title} · EVO</title><link rel="icon" href="/assets/kella-favicon.png"/><link rel="stylesheet" href="/assets/kingdom-access.css?v=2"/></head><body>`;
}

export function kingdomAccessHtml(status = "", googleConfigured = false, kofiConfigured = false) {
  const notice = notices[status] || "";
  const googleLogin = googleConfigured
    ? '<a class="kingdom-action" href="/api/auth/google"><span class="google-g" aria-hidden="true">G</span> Continue with Google</a>'
    : '<span class="kingdom-action disabled" aria-disabled="true"><span class="google-g" aria-hidden="true">G</span> Google sign-in unavailable</span>';
  const signupOpen = status === "invalid-signup" || status === "username-taken";
  return pageStart("Kingdom Access") + `<main class="kingdom-access">
    <a class="kingdom-back" href="/">← Home</a>
    <div class="kingdom-art" aria-hidden="true"><img src="/assets/base-game/assets/sacred-hall.png" alt=""/></div>
    <section class="kingdom-card" aria-labelledby="kingdom-title">
      <span class="kingdom-kicker">EVO · 881</span><h1 id="kingdom-title">Enter the Kingdom</h1>
      <p class="kingdom-lead">Your own woodland keep awaits.</p>
      ${notice ? `<p class="kingdom-notice" role="status">${notice}</p>` : ""}
      ${status === "payment-required" ? `<a class="kingdom-action secondary kingdom-after-signup" href="https://ko-fi.com/exuz19/tiers" target="_blank" rel="noopener noreferrer">${kofiConfigured ? "Join Forest Guardian · $5/month" : "View Forest Guardian membership"} ↗</a>` : ""}
      <div class="kingdom-options">
        <section class="kingdom-login" aria-labelledby="kingdom-login-title">
          <h2 id="kingdom-login-title">Log in</h2><p>Welcome back. Return to your saved base.</p>
          <form action="/api/auth/local/login" method="post">
            <label for="kingdom-login-username">In-game username</label>
            <input id="kingdom-login-username" name="username" autocomplete="username" required maxlength="40" placeholder="Your Call of Dragons name"/>
            <label for="kingdom-login-password">Password</label>
            <input id="kingdom-login-password" name="password" type="password" autocomplete="current-password" required placeholder="Your password"/>
            <button class="kingdom-action" type="submit">Log in</button>
          </form>
          <div class="kingdom-divider"><span>or continue with</span></div>
          <div class="kingdom-social">${googleLogin}<a class="kingdom-action secondary" href="/api/auth/discord">Continue with Discord</a></div>
        </section>
        <details class="kingdom-signup"${signupOpen ? " open" : ""}>
          <summary class="kingdom-signup-trigger">New to EVO? <span>Sign up</span></summary>
          <div class="kingdom-signup-panel">
            <h2>Create your account</h2>
            <p>Enter your Call of Dragons details. A Kella admin will review your request.</p>
            <form action="/api/auth/local/signup" method="post">
              <label for="kingdom-signup-username">In-game username</label>
              <input id="kingdom-signup-username" name="username" autocomplete="username" required minlength="2" maxlength="40" placeholder="Your Call of Dragons name"/>
              <label for="kingdom-signup-lord-id">Lord ID</label>
              <input id="kingdom-signup-lord-id" name="lordId" type="text" inputmode="numeric" pattern="[0-9]{4,20}" required placeholder="Your Call of Dragons player ID"/>
              <label for="kingdom-signup-password">Password</label>
              <input id="kingdom-signup-password" name="password" type="password" autocomplete="new-password" required minlength="12" maxlength="128" placeholder="At least 12 characters"/>
              <button class="kingdom-action" type="submit">Submit for approval</button>
            </form>
          </div>
        </details>
      </div>
    </section>
  </main></body></html>`;
}

export function kingdomCompleteHtml(kofiConfigured = false) {
  return pageStart("Complete Signup") + `<main class="kingdom-access">
    <a class="kingdom-back" href="/kingdom/access">← Back</a>
    <div class="kingdom-art" aria-hidden="true"><img src="/assets/base-game/assets/sacred-hall.png" alt=""/></div>
    <section class="kingdom-card kingdom-complete"><span class="kingdom-kicker">ONE LAST STEP</span><h1>Choose your in-game name</h1><p class="kingdom-lead">${kofiConfigured ? "Your Google account is verified. Use that email for Forest Guardian membership to unlock the kingdom after payment." : "Your Google account is verified. An admin will review your signup before the kingdom opens."}</p>
      <form action="/api/auth/google/complete" method="post"><label for="kingdom-ign">In-game username</label><input id="kingdom-ign" name="inGameUsername" autocomplete="nickname" required minlength="2" maxlength="40" autofocus placeholder="Your Call of Dragons name"/><button class="kingdom-action" type="submit">${kofiConfigured ? "Continue" : "Submit for approval"}</button></form>
    </section>
  </main></body></html>`;
}

export function kingdomAdminHtml() {
  return pageStart("Kingdom Members") + `<main class="kingdom-admin">
    <header class="kingdom-admin-head"><div><span class="kingdom-kicker">OFFICER WORKSPACE</span><h1>Kingdom Members</h1><p>Review player signups and their in-game names.</p></div><a class="kingdom-back" href="/officer">← Officer</a></header>
    <div class="kingdom-admin-summary" id="kingdom-summary" aria-live="polite">Loading signups…</div>
    <div class="kingdom-admin-list" id="kingdom-list"></div>
    <p class="kingdom-admin-feedback" id="kingdom-feedback" role="status" aria-live="polite"></p>
  </main><script src="/assets/kingdom-admin.js?v=2" defer></script></body></html>`;
}

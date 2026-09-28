const notices: Record<string, string> = {
  pending: "Your signup is waiting for an admin to approve it. Return here and log in after approval.",
  terminated: "This signup has been closed. Contact a Kella admin if you believe this is a mistake.",
  cancelled: "Google sign-in was cancelled. You can try again.",
  expired: "That sign-in expired. Please start again.",
  unavailable: "Google sign-in is being configured. Discord sign-in is still available."
};

function pageStart(title: string) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="robots" content="noindex,nofollow,noarchive"/><meta name="referrer" content="no-referrer"/><title>${title} · EVO</title><link rel="icon" href="/assets/kella-favicon.png"/><link rel="stylesheet" href="/assets/kingdom-access.css?v=1"/></head><body>`;
}

export function kingdomAccessHtml(status = "", googleConfigured = false) {
  const notice = notices[status] || "";
  const googleLogin = googleConfigured
    ? '<a class="kingdom-action" href="/api/auth/google"><span class="google-g" aria-hidden="true">G</span> Continue with Google</a>'
    : '<span class="kingdom-action disabled" aria-disabled="true"><span class="google-g" aria-hidden="true">G</span> Google sign-in unavailable</span>';
  const signup = googleConfigured
    ? '<form action="/api/auth/google/signup" method="post"><label for="kingdom-ign">In-game username</label><input id="kingdom-ign" name="inGameUsername" autocomplete="nickname" required minlength="2" maxlength="40" placeholder="Your Call of Dragons name"/><button class="kingdom-action" type="submit"><span class="google-g" aria-hidden="true">G</span> Sign up with Google</button></form>'
    : '<p class="kingdom-muted">Google signup will open when the site’s OAuth client is configured.</p>';
  return pageStart("Kingdom Access") + `<main class="kingdom-access">
    <a class="kingdom-back" href="/">← Home</a>
    <div class="kingdom-art" aria-hidden="true"><img src="/assets/base-game/assets/sacred-hall.png" alt=""/></div>
    <section class="kingdom-card" aria-labelledby="kingdom-title">
      <span class="kingdom-kicker">EVO · 881</span><h1 id="kingdom-title">Enter the Kingdom</h1>
      <p class="kingdom-lead">Your own woodland keep awaits.</p>
      ${notice ? `<p class="kingdom-notice" role="status">${notice}</p>` : ""}
      <div class="kingdom-options">
        <section><h2>Log in</h2><p>Already approved? Return to your saved base.</p>${googleLogin}<a class="kingdom-action secondary" href="/api/auth/discord">Continue with Discord</a></section>
        <section><h2>Sign up</h2><p>New player? Tell us your in-game name. An admin will review your request.</p>${signup}</section>
      </div>
    </section>
  </main></body></html>`;
}

export function kingdomCompleteHtml() {
  return pageStart("Complete Signup") + `<main class="kingdom-access">
    <a class="kingdom-back" href="/kingdom/access">← Back</a>
    <div class="kingdom-art" aria-hidden="true"><img src="/assets/base-game/assets/sacred-hall.png" alt=""/></div>
    <section class="kingdom-card kingdom-complete"><span class="kingdom-kicker">ONE LAST STEP</span><h1>Choose your in-game name</h1><p class="kingdom-lead">Your Google account is verified. An admin will review your signup before the kingdom opens.</p>
      <form action="/api/auth/google/complete" method="post"><label for="kingdom-ign">In-game username</label><input id="kingdom-ign" name="inGameUsername" autocomplete="nickname" required minlength="2" maxlength="40" autofocus placeholder="Your Call of Dragons name"/><button class="kingdom-action" type="submit">Submit for approval</button></form>
    </section>
  </main></body></html>`;
}

export function kingdomAdminHtml() {
  return pageStart("Kingdom Members") + `<main class="kingdom-admin">
    <header class="kingdom-admin-head"><div><span class="kingdom-kicker">OFFICER WORKSPACE</span><h1>Kingdom Members</h1><p>Review Google signups and their in-game names.</p></div><a class="kingdom-back" href="/officer">← Officer</a></header>
    <div class="kingdom-admin-summary" id="kingdom-summary" aria-live="polite">Loading signups…</div>
    <div class="kingdom-admin-list" id="kingdom-list"></div>
    <p class="kingdom-admin-feedback" id="kingdom-feedback" role="status" aria-live="polite"></p>
  </main><script src="/assets/kingdom-admin.js?v=1" defer></script></body></html>`;
}

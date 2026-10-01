import { sitePolicyLinksHtml } from "./sitePolicies.js";
const notices: Record<string, string> = {
  pending: "Your account is saved and waiting for approval. Regular access includes Members and Calendar.",
  "pending-local": "Your account is saved. An admin will review it. Forest Guardian VIP is optional for extra tools.",
  "payment-required": "Forest Guardian VIP unlocks the base and extra tools. Regular members can view Members and Calendar.",
  terminated: "This signup has been closed. Contact a Kella admin if you believe this is a mistake.",
  "invalid-credentials": "That username or password did not match. Please try again.",
  "invalid-signup": "Check your in-game username, Lord ID, and password, then try again.",
  "username-taken": "That in-game username is already registered. Log in or choose another username.",
  "rate-limited": "Too many attempts. Please wait a little before trying again.",
  cancelled: "Google sign-in was cancelled. You can try again.",
  expired: "That sign-in expired. Please start again.",
  unavailable: "Google sign-in is being configured. Discord sign-in is still available."
};

function pageStart(title: string) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="robots" content="noindex,nofollow,noarchive"/><meta name="referrer" content="no-referrer"/><title>${title} · EVO</title><link rel="icon" href="/assets/kella-favicon.png"/><link rel="stylesheet" href="/assets/kingdom-access.css?v=8"/></head><body>`;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[character] || character));
}

function forestGuardianPrompt(message: string) {
  return `<section class="kingdom-membership" aria-labelledby="forest-guardian-title">
    <span class="kingdom-membership-kicker">OPTIONAL VIP · $5 / MONTH</span>
    <h2 id="forest-guardian-title">Forest Guardian membership</h2>
    <p>${message}</p>
    <a class="kingdom-action kingdom-kofi-action" href="https://ko-fi.com/exuz19/tiers" target="_blank" rel="noopener noreferrer">Join Forest Guardian · $5/month ↗</a>
  </section>`;
}

export function kingdomAccessHtml(status = "", googleConfigured = false, kofiConfigured = false) {
  const notice = status === "pending" && kofiConfigured
    ? "Your Google signup is saved. Wait for admin approval for regular access, or join Forest Guardian with your Google email for verified VIP access."
    : notices[status] || "";
  const googleLogin = googleConfigured
    ? '<a class="kingdom-action" href="/api/auth/google"><span class="google-g" aria-hidden="true">G</span> Continue with Google</a>'
    : '<span class="kingdom-action disabled" aria-disabled="true"><span class="google-g" aria-hidden="true">G</span> Google sign-in unavailable</span>';
  const signupOpen = status === "invalid-signup" || status === "username-taken";
  const membershipMessage = status === "pending"
    ? kofiConfigured
      ? "Use the same email as your Google account at Ko-fi. Return to log in after your payment is verified."
      : "Membership verification is temporarily unavailable. Please try again later."
    : status === "payment-required"
      ? "Use the same email as your Google account, or log in with username or Discord to connect your Ko-fi receipt."
      : "";
  return pageStart("Kingdom Access") + `<main class="kingdom-access">
    <a class="kingdom-back" href="/">← Home</a>
    <div class="kingdom-art" aria-hidden="true"><img src="/assets/base-game/assets/sacred-hall.png" alt=""/></div>
    <section class="kingdom-card" aria-labelledby="kingdom-title">
      <span class="kingdom-kicker">EVO · 881</span><h1 id="kingdom-title">Enter the Kingdom</h1>
      <p class="kingdom-lead">Your own woodland keep awaits.</p>
      ${notice ? `<p class="kingdom-notice" role="status">${notice}</p>` : ""}
      ${membershipMessage && kofiConfigured ? forestGuardianPrompt(membershipMessage) : ""}
      <div class="kingdom-options">
        <section class="kingdom-login" aria-labelledby="kingdom-login-title">
          <h2 id="kingdom-login-title">Log in</h2><p>Welcome back. Sign in to your membership.</p>
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
            <p>Enter your Call of Dragons details. Approved regular members can view Members and Calendar. Forest Guardian VIP unlocks the other member tools for $5/month.</p>
            <form action="/api/auth/local/signup" method="post">
              <label for="kingdom-signup-username">In-game username</label>
              <input id="kingdom-signup-username" name="username" autocomplete="username" required minlength="2" maxlength="40" placeholder="Your Call of Dragons name"/>
              <label for="kingdom-signup-lord-id">Lord ID</label>
              <input id="kingdom-signup-lord-id" name="lordId" type="text" inputmode="numeric" pattern="[0-9]{4,20}" required placeholder="Your Call of Dragons player ID"/>
              <label for="kingdom-signup-password">Password</label>
              <input id="kingdom-signup-password" name="password" type="password" autocomplete="new-password" required minlength="12" maxlength="128" placeholder="At least 12 characters"/>
              <p class="kingdom-signup-note">After signup, wait for approval or upgrade to Forest Guardian VIP. By creating an account, you agree to the <a href="/terms">Terms of Service</a> and acknowledge the <a href="/privacy">Privacy Policy</a>.</p>
              <button class="kingdom-action" type="submit">Create account</button>
            </form>
          </div>
        </details>
      </div>
      ${sitePolicyLinksHtml()}
    </section>
  </main></body></html>`;
}

export function kingdomCompleteHtml(kofiConfigured = false) {
  return pageStart("Complete Signup") + `<main class="kingdom-access">
    <a class="kingdom-back" href="/kingdom/access">← Back</a>
    <div class="kingdom-art" aria-hidden="true"><img src="/assets/base-game/assets/sacred-hall.png" alt=""/></div>
    <section class="kingdom-card kingdom-complete"><span class="kingdom-kicker">ACCOUNT SETUP</span><h1>Choose your in-game name</h1><p class="kingdom-lead">${kofiConfigured ? "Save your name for admin review. You can also choose Forest Guardian VIP." : "Your Google account is verified. Save your name for admin review."}</p>
      <form action="/api/auth/google/complete" method="post"><label for="kingdom-ign">In-game username</label><input id="kingdom-ign" name="inGameUsername" autocomplete="nickname" required minlength="2" maxlength="40" autofocus placeholder="Your Call of Dragons name"/><p class="kingdom-signup-note">By creating an account, you agree to the <a href="/terms">Terms of Service</a> and acknowledge the <a href="/privacy">Privacy Policy</a>.</p><button class="kingdom-action" type="submit">Save and continue</button></form>
      ${kofiConfigured ? forestGuardianPrompt("VIP includes the base and member tools. Use your Google email at Ko-fi for automatic payment matching. Regular access includes Members and Calendar after approval.") : ""}
    </section>
  </main></body></html>`;
}

export function kingdomPaymentHtml({ accountLabel, status, googleEmail, stage: requestedStage, canContinueRegular = false, regularAccessUrl = "/api/auth/kofi/regular" }: {
  accountLabel?: string;
  status?: string;
  googleEmail?: string;
  stage?: "payment" | "review" | "approval";
  canContinueRegular?: boolean;
  regularAccessUrl?: string;
} = {}) {
  const label = accountLabel ? escapeHtml(accountLabel) : "your account";
  const stage = requestedStage || (status === "claim-review" ? "review" : "payment");
  const headline = stage === "approval" ? "Waiting for approval"
    : stage === "review" ? "Payment under review"
      : status === "expired" ? "Renew your membership" : "Complete your membership";
  const introduction = stage === "approval"
    ? `Your Forest Guardian payment for ${label} is verified. An admin will finish reviewing your account.`
    : stage === "review"
      ? `Your payment details for ${label} have been sent for review. An admin will match them to a verified Ko-fi payment.`
      : status === "expired"
        ? `Forest Guardian for ${label} has expired. Renew your $5 monthly membership to restore VIP tools. Regular access remains available while your account is approved.`
        : `${label} is saved. A $5 monthly Forest Guardian membership unlocks VIP tools.`;
  const claimNotice = status === "claim-invalid" ? "Enter a valid Ko-fi payment email and try again." : "";
  const checkout = `<div class="kingdom-kofi-checkout">
      <iframe title="Forest Guardian Ko-fi membership checkout" src="https://ko-fi.com/exuz19/?hidefeed=true&amp;widget=true&amp;embed=true&amp;preview=true" loading="eager" referrerpolicy="strict-origin-when-cross-origin" allow="payment" ></iframe>
      <p>If checkout does not load here, <a href="https://ko-fi.com/exuz19/tiers" target="_blank" rel="noopener noreferrer">open Forest Guardian on Ko-fi ↗</a>.</p>
    </div>`;
  const claimForm = `<details class="kingdom-payment-receipt"${status === "claim-invalid" ? " open" : ""}>
      <summary>${stage === "review" ? "Update payment details" : "I have paid"}</summary>
      <div class="kingdom-payment-receipt-body">
        <p>${googleEmail ? `Paying with <strong>${escapeHtml(googleEmail)}</strong> matches automatically. If you used another email, submit its details here.` : "Enter the email used at Ko-fi. An admin will match your details to a verified payment."}</p>
        <form class="kingdom-payment-claim" action="/api/auth/kofi/claim" method="post">
          <label for="kingdom-payment-email">Ko-fi payment email</label>
          <input id="kingdom-payment-email" name="paymentEmail" type="email" autocomplete="email" required maxlength="320" placeholder="Email used at Ko-fi checkout"/>
          <label for="kingdom-transaction-id">Receipt reference <span>(optional)</span></label>
          <input id="kingdom-transaction-id" name="transactionId" type="text" autocomplete="off" maxlength="255" placeholder="Ko-fi transaction ID, if shown on your receipt"/>
          <button class="kingdom-action secondary" type="submit">Submit payment details</button>
        </form>
      </div>
    </details>`;
  return pageStart("Forest Guardian Membership") + `<main class="kingdom-access">
    <a class="kingdom-back" href="/kingdom/access">← Account access</a>
    <div class="kingdom-art" aria-hidden="true"><img src="/assets/base-game/assets/sacred-hall.png" alt=""/></div>
    <section class="kingdom-card kingdom-complete kingdom-payment" aria-labelledby="kingdom-payment-title" data-payment-stage="${stage}" data-can-continue-regular="${canContinueRegular}">
      <span class="kingdom-kicker">FOREST GUARDIAN · $5 / MONTH</span>
      <h1 id="kingdom-payment-title">${headline}</h1>
      <p class="kingdom-lead">${introduction}</p>
      ${claimNotice ? `<p class="kingdom-notice" role="status">${claimNotice}</p>` : ""}
      <ol class="kingdom-payment-progress" aria-label="Account setup progress">
        <li class="is-complete"><span>1</span><small>Signup</small></li>
        <li class="${stage === "payment" ? "is-current" : "is-complete"}"${stage === "payment" ? ' aria-current="step"' : ""}><span>2</span><small>Payment</small></li>
        <li class="${stage !== "payment" ? "is-current" : ""}"${stage !== "payment" ? ' aria-current="step"' : ""}><span>3</span><small>Approval</small></li>
      </ol>
      ${stage === "payment" ? `<p class="kingdom-payment-note">${googleEmail ? `Use <strong>${escapeHtml(googleEmail)}</strong> at Ko-fi for automatic matching.` : "Your payment will be checked against Ko-fi before access is approved."}</p>${checkout}${claimForm}` :
        `<div class="kingdom-payment-state" role="status"><p>${stage === "review" ? "We have your details. Please wait while an admin checks Ko-fi’s payment record." : "Your payment is verified. Your signup is awaiting admin approval."}</p></div>
        ${stage === "review" ? claimForm : ""}
        <details class="kingdom-payment-checkout-closed"><summary>Open Ko-fi checkout again</summary>${checkout}</details>`}
      <p class="kingdom-payment-return">VIP tools require verified membership. Admin permissions remain separate. <a href="/billing">Billing, cancellation & refunds</a></p>
      ${canContinueRegular ? `<a class="kingdom-action secondary" href="${escapeHtml(regularAccessUrl)}">Continue as a regular member</a><p class="kingdom-payment-note">Members and Calendar are included.</p>` : '<p class="kingdom-payment-note">Regular access to Members and Calendar is waiting for admin approval. You can return and log in after approval.</p>'}
      <p class="kingdom-payment-return" id="kingdom-payment-check-state" role="status" aria-live="polite"></p>
      <a class="kingdom-action" href="/kingdom/payment">Check access</a>
      <a class="kingdom-payment-login" href="/kingdom/access">Back to login</a>
      ${sitePolicyLinksHtml()}
    </section>
  </main><script src="/assets/kingdom-payment.js?v=2" defer></script></body></html>`;
}

export function kingdomAdminHtml() {
  return pageStart("Kingdom Members") + `<main class="kingdom-admin">
    <header class="kingdom-admin-head"><div><span class="kingdom-kicker">OFFICER WORKSPACE</span><h1>Kingdom Members</h1><p>Review player signups and their in-game names.</p></div><a class="kingdom-back" href="/officer">← Officer</a></header>
    <div class="kingdom-admin-summary" id="kingdom-summary" aria-live="polite">Loading signups…</div>
    <div class="kingdom-admin-list" id="kingdom-list"></div>
    <p class="kingdom-admin-feedback" id="kingdom-feedback" role="status" aria-live="polite"></p>
  </main><script src="/assets/kingdom-admin.js?v=4" defer></script></body></html>`;
}

export function kingdomVipLockedHtml() {
  return pageStart("Guardian VIP") + `<main class="kingdom-legal kingdom-vip-gate">
    <a class="kingdom-back" href="/">← Home</a>
    <section class="kingdom-card" aria-labelledby="vip-title">
      <img class="kingdom-vip-art" src="/assets/guardian-membership.webp" alt="Guardian Membership — premium alliance tools" width="1448" height="1086"/>
      <span class="kingdom-kicker">FOREST GUARDIAN · $5 / MONTH</span><h1 id="vip-title">Unlock Guardian VIP</h1>
      <p>Explore your base, research, training, healing, and other member tools. Admin permissions remain separate.</p>
      <a class="kingdom-action" href="/kingdom/payment">Upgrade to Guardian VIP</a>
      <nav class="kingdom-legal-links" aria-label="Regular member pages"><a href="/members">Members</a><a href="/calendar">Calendar</a></nav>
      ${sitePolicyLinksHtml()}
    </section>
  </main></body></html>`;
}

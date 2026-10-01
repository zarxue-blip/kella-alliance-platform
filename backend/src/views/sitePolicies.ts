const policyDate = "October 1, 2026";
const contact = '<a href="mailto:zarxue@gmail.com">zarxue@gmail.com</a>';

const policies = [
  { path: "/terms", title: "Terms of Service" },
  { path: "/privacy", title: "Privacy Policy" },
  { path: "/billing", title: "Billing & cancellation" },
  { path: "/cookies", title: "Cookies" }
] as const;

export function sitePolicyLinksHtml(currentPath = "") {
  return `<nav class="kingdom-legal-links" aria-label="Site policies">${policies.map((policy) =>
    `<a href="${policy.path}"${policy.path === currentPath ? ' aria-current="page"' : ""}>${policy.title}</a>`
  ).join("")}</nav>`;
}

function policyPage(path: string, title: string, description: string, content: string) {
  return `<!doctype html><html lang="en"><head>
    <meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
    <meta name="description" content="${description}"/><meta name="referrer" content="strict-origin-when-cross-origin"/>
    <title>${title} · Kella</title><link rel="canonical" href="https://www.kella.online${path}"/>
    <link rel="icon" href="/assets/kella-favicon.png"/><link rel="stylesheet" href="/assets/kingdom-access.css?v=8"/>
  </head><body><main class="kingdom-legal">
    <a class="kingdom-back" href="/">← Home</a>
    <article class="kingdom-card" aria-labelledby="policy-title">
      <span class="kingdom-kicker">KELLA · COMMUNITY & MEMBERSHIP</span><h1 id="policy-title">${title}</h1>
      <p class="kingdom-legal-date">Effective ${policyDate}</p>
      ${sitePolicyLinksHtml(path)}${content}
      <h2>Contact</h2><p>For account, membership, or policy questions, contact Kella’s operator at ${contact}.</p>
      <p><a href="/kingdom/access">Account access</a> · <a href="/">Return home</a></p>
    </article>
  </main></body></html>`;
}

export function siteTermsHtml() {
  return policyPage("/terms", "Terms of Service", "Kella account rules, regular member access, and Forest Guardian VIP membership terms.", `
    <p>Kella is an independent Call of Dragons community website operated by the creator exuz. These terms cover your Kella account and use of its community features.</p>
    <h2>Your account</h2>
    <p>Use your own in-game username and Lord ID, provide accurate information, and keep your password or sign-in account secure. Do not share account access, impersonate another player, or claim another person’s payment. Contact us if your account is compromised. Signups and membership links may require an admin review.</p>
    <h2>Regular and VIP access</h2>
    <p>Approved regular members can view Members and Calendar. Forest Guardian is the $5 USD monthly VIP membership for the base and additional member tools. VIP access requires a verified, current membership linked to your Kella account. Payment does not grant officer permissions, admin access, or permission to see another member’s private tools.</p>
    <p>Admins retain separate permissions to manage the community. Payment verification and signup review are distinct: a receipt you submit is checked before access is granted. See <a href="/billing">Billing & cancellation</a> before subscribing.</p>
    <h2>Community rules</h2>
    <p>Respect other players and their privacy. Do not harass people, upload unlawful content, disclose someone else’s private information, misuse tickets, bypass access restrictions, or disrupt the site. Upload only material you have permission to use. You keep ownership of your uploads and allow Kella to store and display them as needed for the features you use.</p>
    <h2>Tools and game content</h2>
    <p>Calculators, reports, and saved plans support your decisions; game updates, buffs, or incomplete data can affect their accuracy. Check important figures in the game before spending resources. Kella does not sell in-game items or guarantee game results.</p>
    <p>Call of Dragons names, artwork, and other third-party materials remain the property of their respective owners. Kella is not an official game service and is not endorsed by the game publisher. Google, Discord, and Ko-fi provide separate services under their own terms.</p>
    <h2>Changes, restrictions, and closure</h2>
    <p>Features may change or be unavailable during maintenance. Access can be restricted or terminated for misuse, a failed membership verification, or community eligibility changes. You can contact us to question a decision or request account closure. Closing your Kella account does not cancel a Ko-fi subscription; cancel it separately to stop renewal.</p>
    <p>The effective date identifies this version of the terms. Review the current membership description and billing terms before subscribing or renewing. Nothing in these terms removes consumer rights or remedies that apply by law.</p>
  `);
}

export function sitePrivacyHtml() {
  return policyPage("/privacy", "Privacy Policy", "How Kella uses account, community, payment, and saved member-tool information.", `
    <p>Kella’s operator is responsible for the personal information used to run this community site. This notice explains what we collect, how it is used, and how to contact us about your information.</p>
    <h2>Information collected</h2>
    <p><strong>Accounts:</strong> username-and-password signup collects your in-game username, Lord ID, and a salted password hash. Google sign-in supplies your Google account identifier, verified email address, and display name. Discord sign-in supplies your account identity, avatar, and relevant server membership and roles. We record account status, review decisions, and login dates.</p>
    <p><strong>Community features:</strong> we store profile details and images you provide, imported roster statistics and their history, event and attendance responses, reports, migration applications, and support tickets. Ticket history can include messages, author details, and attachment links. Your saved base layout and member-tool settings are linked to your account.</p>
    <p><strong>Membership:</strong> Ko-fi sends verified payment details including payment email, tier, amount, currency, transaction identifiers, and payment dates. We store which account a payment belongs to and its access period. We also store payment details you submit for review. Kella does not receive your full payment-card details.</p>
    <p><strong>Technical information:</strong> the site and its hosting services process request information such as IP address, browser details, timestamps, and requested pages for operation and security. Cookies keep sign-in and payment review working; browser storage remembers preferences or unfinished forms. See <a href="/cookies">Cookies</a>.</p>
    <h2>Why we use it</h2>
    <p>We use information to create and authenticate accounts, review membership, match payments, save your tools, display community records, respond to support requests, and prevent abuse. We process data as needed to provide the services you request, protect the site and its members, meet applicable obligations, and honour choices you make when using optional features.</p>
    <p>Google access is limited to basic sign-in identity; Kella does not request your Gmail, Google Drive, or contacts. We do not sell your personal information or use your Google identity for advertising.</p>
    <p><strong>Automated access decisions:</strong> a current verified Forest Guardian payment can approve and activate an eligible account automatically when its payment email matches the verified Google sign-in email, or when it renews an existing payment-to-account link. Expiry limits access to regular features. A terminated account is not automatically restored by paying. Contact us to ask for human review of a payment match or access decision.</p>
    <h2>Who can see information</h2>
    <p>Members can see the roster, player information, and events made available to them. Public community pages may display player names or game rankings. Authorized admins can review signup names, emails, payment matching, tickets, reports, and records needed to operate the alliance. Other members cannot fetch your private saved tools or base layout.</p>
    <p>Hosting, database, and storage providers process data to operate Kella. Discord receives information sent through its bot features, including alerts, attendance, migration reports, and tickets; visibility follows the destination channel’s permissions. Google, Discord, Ko-fi, and payment providers also process information under their own policies when you use those services. Services may process data outside your country.</p>
    <h2>Retention and protection</h2>
    <p>Account details and saved tools remain while your account is maintained. Roster removal or account termination does not automatically erase attendance, statistics, reports, tickets, or payment history. These records currently have no automatic deletion schedule and remain until reviewed for deletion or anonymization; contact us to request that review. Relevant history or payment records may need to be retained to resolve disputes, investigate abuse, or meet applicable obligations. We will explain any continuing need when responding to your request. Browser cookie durations are listed in <a href="/cookies">Cookies</a>; hosting and provider records follow their own retention settings.</p>
    <p>Passwords are hashed, sign-in uses protected cookies, and access is checked on the server. No online service can promise absolute security. Avoid putting unnecessary sensitive information in profiles, applications, or tickets.</p>
    <h2>Your choices and rights</h2>
    <p>Contact ${contact} to ask what information we hold, correct it, request a copy, or request deletion or restriction. We may need to confirm your identity and explain any records that must be retained. Depending on applicable law, you may also object to processing, withdraw consent where processing relies on it, request portability, or complain to your data protection authority. In the Philippines, this is the <a href="https://privacy.gov.ph/data-subject-rights/" target="_blank" rel="noopener noreferrer">National Privacy Commission</a>.</p>
    <p>You can revoke Google or Discord access in that provider’s account settings. Revocation does not by itself erase Kella records. An account deletion request does not cancel recurring Ko-fi payments; see <a href="/billing">Billing & cancellation</a>.</p>
  `);
}

export function siteBillingHtml() {
  return policyPage("/billing", "Billing & cancellation", "Forest Guardian VIP pricing, payment verification, cancellation, and refund requests.", `
    <p>Forest Guardian is Kella’s <strong>$5 USD monthly VIP membership</strong>, purchased through <a href="https://ko-fi.com/exuz19/tiers" target="_blank" rel="noopener noreferrer">exuz on Ko-fi</a>. It unlocks the base and additional member tools for an eligible account. Regular approved accounts can view Members and Calendar without VIP. A subscription does not grant admin privileges.</p>
    <h2>Before you pay</h2>
    <p>Ko-fi displays the recurring charge and available payment methods at checkout. Check the final amount, currency, renewal details, and any provider conversion charges before confirming. Your payment goes to the creator through the available payment provider. Kella does not store full card details or operate a separate payment processor.</p>
    <h2>Verification and activation</h2>
    <p>Kella checks Ko-fi’s verified payment notification before granting VIP. A payment can be linked to one Kella account. A matching verified Google email can be linked automatically; other payment details may require admin verification. A typed email or receipt reference alone is not payment confirmation.</p>
    <p>VIP remains available for the verified paid period while the account is eligible. Renewals extend access after verification. If a payment or account approval is awaiting review, the site shows that status. Contact us with your Kella username and Ko-fi receipt if a successful payment has not been matched; do not pay again just to refresh access.</p>
    <h2>Cancel renewal</h2>
    <p>In Ko-fi, open <strong>Account & Billing → Subscriptions</strong>, choose the membership, and select <strong>Don’t Renew</strong>. If you paid as a guest or cannot find the subscription, use Ko-fi’s account help or contact us with your receipt. For a PayPal subscription, automatic payments can also be managed in PayPal. See <a href="https://help.ko-fi.com/hc/en-us/articles/360007556993-How-to-help-a-supporter-cancel-their-membership" target="_blank" rel="noopener noreferrer">Ko-fi’s cancellation instructions</a>.</p>
    <p>Cancelling stops future renewals; it does not automatically refund a completed payment. VIP normally continues through the verified paid period, then the account returns to regular access. Logging out, deleting your Kella account, or contacting an admin to leave the alliance does not itself cancel a subscription. Complete cancellation with Ko-fi or your payment provider.</p>
    <h2>Refunds and billing problems</h2>
    <p>Request a refund or report a duplicate charge, an incorrect amount, or access not supplied by emailing ${contact}. Include your Kella username, payment date, and transaction reference. Do not send your password or full card details. We review requests against the payment record and the circumstances; contact us promptly so provider time limits can be checked.</p>
    <p>Refunds are handled by the creator through Ko-fi or the payment provider. Cancellation and refund are separate actions. Any approved refund will state its effect on the related VIP access. These terms do not restrict statutory refund rights or your ability to contact your payment provider. Read <a href="https://help.ko-fi.com/hc/en-us/articles/7733731935773-How-to-issue-a-refund" target="_blank" rel="noopener noreferrer">Ko-fi’s refund information</a> for how its refund process works.</p>
  `);
}

export function siteCookiesHtml() {
  return policyPage("/cookies", "Cookies & browser storage", "Kella sign-in cookies, saved preferences, and optional third-party checkout.", `
    <p>Kella uses cookies and browser storage to provide sign-in, save preferences, and complete payment verification. These are separate from the account and community records kept on the server.</p>
    <h2>Essential sign-in cookies</h2>
    <p>The member session cookie keeps you signed in for up to seven days. Temporary Google and Discord security cookies help validate sign-in requests and expire after about ten minutes. Google signup uses a short-lived identity cookie while you finish creating an account. Payment review uses a limited identity cookie for up to one day; it does not by itself unlock VIP. Migration may use a temporary Discord identity cookie for up to one hour.</p>
    <p>These sign-in cookies are restricted from normal page scripts and sent securely on the live site. Signing out or clearing site cookies ends the relevant browser session; server records and subscriptions are not deleted by clearing cookies.</p>
    <h2>Preferences and drafts</h2>
    <p>Browser storage can remember your Animation on/off choice and tool preferences. Session storage can keep an unfinished migration application during the current browsing session. Some preferences remain until you change them or clear this site’s data. Your account’s saved base and member-tool data are also stored on the server when you save them.</p>
    <h2>Other services</h2>
    <p>Google and Discord handle their own cookies during sign-in. When the payment page loads the embedded Ko-fi membership checkout, your browser connects directly to Ko-fi and its payment providers. They may use their own cookies for checkout, security, preferences, and other purposes described in <a href="https://more.ko-fi.com/privacy" target="_blank" rel="noopener noreferrer">Ko-fi’s Privacy and Cookie Policy</a>. Those services control their own cookie choices.</p>
    <p>Kella does not add advertising trackers to these account and policy pages. Provider features you choose to open can have their own privacy controls.</p>
    <h2>Your controls</h2>
    <p>You can manage or clear cookies and site storage in your browser. Blocking essential cookies can prevent sign-in or payment verification. Blocking third-party cookies can affect embedded checkout; the payment page also offers a direct Ko-fi link. You can browse the public policies without opening checkout.</p>
  `);
}

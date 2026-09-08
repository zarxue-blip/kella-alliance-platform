# /sum setup (development; not deployed)

Use /sum in a server channel or thread. Kella reads text messages from the five hours ending when the command was invoked and posts a short gold embed in that same channel. Bot messages, images and attachments are excluded. Busy histories are paginated and summarized in chunks; failures are reported instead of silently presenting a partial history as complete. There is a five-minute channel cooldown and one active summary per bot process.

1. Create an API key at https://console.groq.com/keys using an account on the Free plan. Do not enable paid billing. Set GROQ_API_KEY in the bot host's secret environment settings, never in source control or chat.
2. Enable Message Content Intent for the bot in the Discord Developer Portal and set ENABLE_MESSAGE_CONTENT_INTENT=true on the bot host. Kella and the requester need View Channel and Read Message History; Kella also needs Send Messages and Embed Links (and Send Messages in Threads when applicable).
3. After deployment approval, deploy/restart the bot. Its existing startup process registers /sum automatically.

Provider: Groq, openai/gpt-oss-20b. Channel text and display names go to Groq; no message history is saved by this feature. There is no paid-provider fallback. Free quota errors ask the user to try later. The application cannot detect a Groq account's billing plan, so keeping the provider account on Free is required to avoid charges.

Validation: bot TypeScript build and mocked tests for history pagination, five-hour boundaries, excluded bots/empty/future messages, complete chunking, summary merging, prompt boundaries, mention suppression and free-quota errors. No real Discord chat has been sent to Groq; no API key is configured by this change. Live end-to-end validation awaits secure key configuration and deployment approval.

## Mention replies
Mention @Kella in a server message to receive a direct text reply, not audio. She is a strict, gruff female halfling caravan keeper: fond of coins, caravans and her donkey; contemptuous of mud and fictional trolls, darklings and goblins. Replies are usually 1–3 sentences and use the message's language. Roster questions retain the existing roster lookup, supplied as factual context to the model. Only the triggering message and relevant roster response are sent to Groq; no additional chat history is collected for mention replies.

Uses the same Groq key and free-plan model as /sum, with no alternate paid provider. A 15-second per-user cooldown and maximum two concurrent mention requests reduce spam. Bots, webhooks and DMs do not trigger replies. All automatic pings are disabled. Service failures retain factual roster output or a short in-character fallback. Model tests use mocked responses; live reply quality still requires Discord testing.

Standing user instruction (September 8): deploy after fixes without asking again; this supersedes the earlier per-fix deployment approval gate.

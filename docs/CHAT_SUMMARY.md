# /sum setup (development; not deployed)

Use /sum in a server channel or thread. Kella reads text messages from the five hours ending when the command was invoked and posts a short gold embed in that same channel. Bot messages, images and attachments are excluded. Busy histories are paginated and summarized in chunks; failures are reported instead of silently presenting a partial history as complete. There is a five-minute channel cooldown and one active summary per bot process.

1. Create an API key at https://console.groq.com/keys using an account on the Free plan. Do not enable paid billing. Set GROQ_API_KEY in the bot host's secret environment settings, never in source control or chat.
2. Enable Message Content Intent for the bot in the Discord Developer Portal and set ENABLE_MESSAGE_CONTENT_INTENT=true on the bot host. Kella and the requester need View Channel and Read Message History; Kella also needs Send Messages and Embed Links (and Send Messages in Threads when applicable).
3. After deployment approval, deploy/restart the bot. Its existing startup process registers /sum automatically.

Provider: Groq, llama-3.1-8b-instant. Channel text and display names go to Groq; no message history is saved by this feature. There is no paid-provider fallback. Free quota errors ask the user to try later. The application cannot detect a Groq account's billing plan, so keeping the provider account on Free is required to avoid charges.

Validation: bot TypeScript build and mocked tests for history pagination, five-hour boundaries, excluded bots/empty/future messages, complete chunking, summary merging, prompt boundaries, mention suppression and free-quota errors. No real Discord chat has been sent to Groq; no API key is configured by this change. Live end-to-end validation awaits secure key configuration and deployment approval.

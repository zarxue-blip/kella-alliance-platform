# Kella bot privacy review — 9 September 2026

Scope: local code review of mention replies, /sum and flag translations. This is not a penetration test or certification of the live deployment. No production settings or data were changed.

## Data flow and audience

- Mentions: the question is sent to Groq; the handler does not fetch conversation history. Roster questions now return selected factual fields directly, without sending roster results to Groq.
- /sum: reads text from the invoking channel for the preceding five hours, excluding bot, empty and future messages. Text, timestamps and display names are sent to Groq. Attachments are not uploaded. The embed is public within that channel.
- Flag translation: sends the selected message text to Groq. Replies are visible in the source channel. Google/MyMemory fallback is now disabled unless explicitly enabled; those fallback services receive text through URL query parameters.
- No AI tool execution is configured in these services. Chat instructions do not grant access to environment variables, files, other channels or database operations. This does not guarantee perfectly reliable model behavior.

## Local fixes

- All three AI entry points require the configured DISCORD_GUILD_ID and reject DMs and other servers. If unset, these features remain disabled.
- Optional AI_ALLOWED_CHANNEL_IDS comma-separated allowlist restricts these features; allowed parent channels also allow their threads. Empty means accessible channels in the configured server. This only gates AI features, not every other bot command.
- Best-effort filtering removes configured secret values (eight or more characters), common API key patterns, labelled passwords/tokens, database connection strings, private key blocks and email addresses from provider input and AI output. Summary filtering occurs before chunking so secrets spanning chunk boundaries are handled.
- Factual roster answers bypass AI and are filtered before posting.
- Summary failures use a generic message; translation logging no longer prints arbitrary exception messages.
- Summary bot permission checks use thread-send permission in threads.
- ENABLE_PUBLIC_TRANSLATION_FALLBACK defaults off. Set true only if you accept sending translation text to Google/MyMemory when Groq fails.

## Validation

Bot TypeScript build and translation, summary, persona and privacy tests pass. Provider requests were mocked: no test chat or credentials were sent to Discord or external AI services. Tests cover configured-server/channel rejection, source and response filtering, pre-chunk redaction, existing translation fallback, summary time boundaries and mention suppression.

## Remaining limits and rollout

Filtering cannot recognize all private prose, unusual credentials, personal information or obfuscated secrets. Members should not post passwords or confidential material in AI-enabled channels. Summaries and translations retain their existing channel-visible behavior; they are not private replies. Display names and ordinary conversation content still go to Groq. AI output may be inaccurate.

Before rollout, verify DISCORD_GUILD_ID and choose an allowlist that excludes officer/private channels if those must never use AI. Discord channel permissions remain the primary boundary for bot access. Live Discord permissions, Render settings, Groq retention settings, logs, website endpoints, other bot commands and historical incidents were not fully audited here. These changes cannot establish whether a past disclosure occurred. They are local and have not been deployed.

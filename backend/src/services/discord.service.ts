import { env } from "../config/env.js";
import { HttpError } from "../utils/httpError.js";

interface EmbedInput {
  title?: string;
  description: string;
  color?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  footer?: string;
}

interface SendEmbedInput extends EmbedInput {
  channelId: string;
  roleMentionId?: string;
  buttonEnabled?: boolean;
  buttonLabel?: string;
  buttonUrl?: string;
}

interface SendAttackInput {
  channelId: string;
  roleMentionId?: string;
  message: string;
}

interface SendMessageInput {
  channelId: string;
  content: string;
  roleMentionId?: string;
  buttonEnabled?: boolean;
  buttonLabel?: string;
  buttonUrl?: string;
}

interface SendImageInput {
  mimeType?: string;
  buttonEnabled?: boolean;
  buttonLabel?: string;
  buttonUrl?: string;
  channelId: string;
  imageBuffer: Buffer;
  filename?: string;
  content?: string;
  roleMentionId?: string;
}

interface SendEventAttendanceInput extends SendEmbedInput {
  eventId: string;
  startsAt: Date;
}


interface SendPollInput {
  pollId: string;
  channelId: string;
  roleMentionId?: string;
  question: string;
  description?: string;
  kind?: "poll" | "best_online_time";
  options: Array<{ key: string; label: string; roleId?: string }>;
}

interface DiscordGuildMember {
  avatar?: string | null;
  joined_at?: string | null;
  nick?: string | null;
  user?: {
    id: string;
    username: string;
    global_name?: string | null;
    discriminator?: string;
    avatar?: string | null;
    bot?: boolean;
  };
}

function requireBotToken() {
  if (!env.DISCORD_BOT_TOKEN) throw new HttpError(503, "Discord bot token is not configured");
  return env.DISCORD_BOT_TOKEN;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseJsonText(text: string) {
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

async function discordRequest<T>(path: string, init: RequestInit = {}) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = await fetch(`https://discord.com/api/v10${path}`, {
      ...init,
      headers: {
        authorization: `Bot ${requireBotToken()}`,
        "content-type": "application/json"
      }
    });
    const text = response.status === 204 ? "" : await response.text().catch(() => "");

    if (response.status === 429 && attempt < 2) {
      const payload = parseJsonText(text);
      const retryAfter = Number(payload.retry_after || response.headers.get("retry-after") || 1);
      await sleep(Math.min(8000, retryAfter * 1000 + 300));
      continue;
    }

    if (!response.ok) {
      throw new HttpError(response.status >= 500 ? 502 : response.status, `Discord API error: ${text || response.statusText}`);
    }

    if (response.status === 204 || !text) return undefined as T;
    return JSON.parse(text) as T;
  }

  throw new HttpError(429, "Discord is rate limiting Kella. Please wait a moment and try again.");
}

export function parseDiscordColor(value?: string) {
  if (!value) return 0xfacc15;
  const cleaned = value.trim().replace(/^#/, "");
  const parsed = Number.parseInt(cleaned, 16);
  return Number.isFinite(parsed) ? parsed : 0xfacc15;
}

function embedPayload(input: EmbedInput) {
  return {
    title: input.title || undefined,
    description: input.description,
    color: parseDiscordColor(input.color),
    image: input.imageUrl ? { url: input.imageUrl } : undefined,
    thumbnail: input.thumbnailUrl ? { url: input.thumbnailUrl } : undefined,
    footer: input.footer ? { text: input.footer } : undefined
  };
}

function linkButtonComponents(input: { buttonEnabled?: boolean; buttonLabel?: string; buttonUrl?: string }) {
  if (!input.buttonEnabled || !input.buttonLabel || !input.buttonUrl) return undefined;
  return [
    {
      type: 1,
      components: [
        {
          type: 2,
          style: 5,
          label: input.buttonLabel,
          url: input.buttonUrl
        }
      ]
    }
  ];
}

export async function listDiscordTextChannels() {
  if (!env.DISCORD_GUILD_ID) throw new HttpError(503, "Discord guild id is not configured");
  const channels = await discordRequest<any[]>(`/guilds/${env.DISCORD_GUILD_ID}/channels`);
  return channels
    .filter((channel) => channel.type === 0 || channel.type === 5)
    .sort((a, b) => Number(a.position ?? 0) - Number(b.position ?? 0))
    .map((channel) => ({ id: channel.id, name: channel.name, type: channel.type }));
}

function discordAvatarUrl(member: DiscordGuildMember) {
  const user = member.user;
  if (!user) return "";
  if (member.avatar && env.DISCORD_GUILD_ID) {
    return `https://cdn.discordapp.com/guilds/${env.DISCORD_GUILD_ID}/users/${user.id}/avatars/${member.avatar}.png?size=128`;
  }
  if (user.avatar) {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;
  }
  const fallbackIndex = Number(user.discriminator || 0) % 5;
  return `https://cdn.discordapp.com/embed/avatars/${fallbackIndex}.png`;
}

export async function listDiscordGuildMembers() {
  if (!env.DISCORD_GUILD_ID) throw new HttpError(503, "Discord guild id is not configured");
  const members: DiscordGuildMember[] = [];
  let after = "0";

  try {
    for (let page = 0; page < 20; page += 1) {
      const batch = await discordRequest<DiscordGuildMember[]>(`/guilds/${env.DISCORD_GUILD_ID}/members?limit=1000&after=${after}`);
      members.push(...batch);
      if (batch.length < 1000) break;
      const lastUserId = batch[batch.length - 1]?.user?.id;
      if (!lastUserId) break;
      after = lastUserId;
    }
  } catch (error) {
    if (error instanceof HttpError && error.statusCode === 403) {
      throw new HttpError(
        403,
        "Discord blocked member sync. Enable Server Members Intent in Discord Developer Portal, make sure Kella is invited to this server, then restart the Render service.",
        error.details
      );
    }
    throw error;
  }

  return members
    .filter((member) => member.user?.id && !member.user.bot)
    .map((member) => {
      const user = member.user!;
      const displayName = member.nick || user.global_name || user.username;
      return {
        discordId: user.id,
        discordUsername: user.discriminator && user.discriminator !== "0" ? `${user.username}#${user.discriminator}` : user.username,
        discordDisplayName: displayName,
        discordAvatarUrl: discordAvatarUrl(member),
        joinedAt: member.joined_at || undefined
      };
    });
}

export async function assignDiscordRole(discordId: string, roleId: string) {
  if (!env.DISCORD_GUILD_ID) throw new HttpError(503, "Discord guild id is not configured");
  if (!discordId || !roleId) throw new HttpError(400, "Discord member and role are required");
  await discordRequest<void>(`/guilds/${env.DISCORD_GUILD_ID}/members/${discordId}/roles/${roleId}`, { method: "PUT" });
}

export async function removeDiscordRole(discordId: string, roleId: string) {
  if (!env.DISCORD_GUILD_ID) throw new HttpError(503, "Discord guild id is not configured");
  if (!discordId || !roleId) return;
  await discordRequest<void>(`/guilds/${env.DISCORD_GUILD_ID}/members/${discordId}/roles/${roleId}`, { method: "DELETE" });
}

export async function sendDiscordEmbed(input: SendEmbedInput) {
  if (!input.channelId) throw new HttpError(400, "Channel ID is required");
  if (!input.description?.trim()) throw new HttpError(400, "Embed description is required");

  return discordRequest<any>(`/channels/${input.channelId}/messages`, {
    method: "POST",
    body: JSON.stringify({
      content: input.roleMentionId ? `<@&${input.roleMentionId}>` : undefined,
      allowed_mentions: input.roleMentionId ? { roles: [input.roleMentionId] } : { parse: [] },
      embeds: [embedPayload(input)],
      components: linkButtonComponents(input)
    })
  });
}

export async function sendDiscordDm(recipientId: string, content: string) {
  if (!recipientId) throw new HttpError(400, "Discord user ID is required");
  const dm = await discordRequest<{ id: string }>("/users/@me/channels", {
    method: "POST",
    body: JSON.stringify({ recipient_id: recipientId })
  });
  return discordRequest<any>(`/channels/${dm.id}/messages`, {
    method: "POST",
    body: JSON.stringify({ content })
  });
}

export async function sendDiscordMessage(input: SendMessageInput) {
  if (!input.channelId) throw new HttpError(400, "Channel ID is required");
  const content = input.content?.trim();
  if (!content) throw new HttpError(400, "Message is required");

  const roleMention = input.roleMentionId ? `<@&${input.roleMentionId}>` : "";
  return discordRequest<any>(`/channels/${input.channelId}/messages`, {
    method: "POST",
    body: JSON.stringify({
      content: [roleMention, content].filter(Boolean).join("\n"),
      allowed_mentions: input.roleMentionId ? { roles: [input.roleMentionId] } : { parse: [] },
      components: linkButtonComponents(input)
    })
  });
}

export async function sendDiscordImage(input: SendImageInput) {
  if (!input.channelId) throw new HttpError(400, "Channel ID is required");
  if (!input.imageBuffer?.length) throw new HttpError(400, "Thumbnail image is required");

  const filename = (input.filename || "kella-announcement.png").replace(/[^a-z0-9._-]/gi, "-");
  const roleMention = input.roleMentionId ? `<@&${input.roleMentionId}>` : "";
  const form = new FormData();
  form.append(
    "payload_json",
    JSON.stringify({
      content: [roleMention, input.content?.trim()].filter(Boolean).join("\n") || undefined,
      allowed_mentions: input.roleMentionId ? { roles: [input.roleMentionId] } : { parse: [] },
      attachments: [{ id: 0, filename }],
      components: linkButtonComponents(input)
    })
  );
  const imageBytes = new Uint8Array(input.imageBuffer.length);
  imageBytes.set(input.imageBuffer);
  form.append("files[0]", new Blob([imageBytes], { type: input.mimeType || "image/png" }), filename);

  const response = await fetch(`https://discord.com/api/v10/channels/${input.channelId}/messages`, {
    method: "POST",
    headers: { authorization: `Bot ${requireBotToken()}` },
    body: form
  });
  const text = await response.text().catch(() => "");
  if (!response.ok) {
    throw new HttpError(response.status >= 500 ? 502 : response.status, `Discord API error: ${text || response.statusText}`);
  }
  return parseJsonText(text);
}

export async function sendAttackAlert(input: SendAttackInput) {
  if (!input.channelId) throw new HttpError(400, "Target channel is required");
  if (!input.message?.trim()) throw new HttpError(400, "Attack alert message is required");

  return discordRequest<any>(`/channels/${input.channelId}/messages`, {
    method: "POST",
    body: JSON.stringify({
      content: input.roleMentionId ? `<@&${input.roleMentionId}>` : undefined,
      allowed_mentions: input.roleMentionId ? { roles: [input.roleMentionId] } : { parse: [] },
      embeds: [
        {
          title: "🚨 ATTACK ALERT",
          description: input.message,
          color: 0xef4444
        }
      ],
      components: [
        {
          type: 1,
          components: [
            { type: 2, custom_id: "attack:Joining Fight", label: "⚔ Joining", style: 4 },
            { type: 2, custom_id: "attack:Defending", label: "🛡 Defending", style: 1 },
            { type: 2, custom_id: "attack:On The Way", label: "⌛ On the way", style: 3 },
            { type: 2, custom_id: "attack:Unavailable", label: "❌ Unavailable", style: 2 }
          ]
        }
      ]
    })
  });
}

export async function sendEventAttendanceEmbed(input: SendEventAttendanceInput) {
  if (!input.eventId) throw new HttpError(400, "Event id is required");
  if (!input.channelId) throw new HttpError(400, "Target channel is required");
  if (!input.description?.trim()) throw new HttpError(400, "Event description is required");

  const unix = Math.floor(input.startsAt.getTime() / 1000);
  const content = [input.roleMentionId ? `<@&${input.roleMentionId}>` : "", input.title ? `# ${input.title}` : ""].filter(Boolean).join("\n");
  const button = (status: "Attending" | "Absent" | "Unsure", label: string, style: number) => ({
    type: 2,
    custom_id: `event:${input.eventId}:${status}`,
    label,
    style
  });

  return discordRequest<any>(`/channels/${input.channelId}/messages`, {
    method: "POST",
    body: JSON.stringify({
      content: content || undefined,
      allowed_mentions: input.roleMentionId ? { roles: [input.roleMentionId] } : { parse: [] },
      embeds: [
        {
          ...embedPayload({ ...input, title: undefined }),
          fields: [
            { name: "Server Time", value: `<t:${unix}:F>\n<t:${unix}:R>`, inline: false },
            { name: "Attendance", value: "Click a button below. You can update your answer anytime.", inline: false }
          ]
        }
      ],
      components: [
        {
          type: 1,
          components: [
            button("Attending", "Attending", 3),
            button("Absent", "Absent", 4),
            button("Unsure", "Not Sure", 2)
          ]
        }
      ]
    })
  });
}

export async function sendDiscordPoll(input: SendPollInput) {
  if (!input.pollId) throw new HttpError(400, "Poll id is required");
  if (!input.channelId) throw new HttpError(400, "Target channel is required");
  if (!input.question.trim()) throw new HttpError(400, "Poll question is required");
  if (input.options.length < 2 || input.options.length > 10) throw new HttpError(400, "Polls need 2 to 10 options");

  const buttons = input.options.map((option, index) => ({
    type: 2,
    custom_id: `poll:${input.pollId}:${option.key}`,
    label: option.label.slice(0, 80),
    style: (index % 4) + 1
  }));
  const components = [];
  for (let index = 0; index < buttons.length; index += 5) {
    components.push({ type: 1, components: buttons.slice(index, index + 5) });
  }
  const mappedRoles = input.options.filter((option) => option.roleId).length;
  const description = [
    input.description?.trim(),
    input.kind === "best_online_time" ? "Choose the UTC window when you are usually online." : "Choose one option. You can change your vote anytime.",
    mappedRoles ? "Your choice also updates the matching Discord role." : ""
  ].filter(Boolean).join("\n\n");

  return discordRequest<any>(`/channels/${input.channelId}/messages`, {
    method: "POST",
    body: JSON.stringify({
      content: input.roleMentionId ? `<@&${input.roleMentionId}>` : undefined,
      allowed_mentions: input.roleMentionId ? { roles: [input.roleMentionId] } : { parse: [] },
      embeds: [{
        title: input.kind === "best_online_time" ? "BEST ONLINE TIME" : "ALLIANCE POLL",
        description: `**${input.question.trim()}**\n\n${description}`,
        color: 0xfacc15,
        footer: { text: "Kella saves results to the Attendance dashboard" }
      }],
      components
    })
  });
}

export async function sendMigrationEmbed(channelId: string, description: string, applicationId: string, page: number) {
  return discordRequest<{id:string}>(`/channels/${channelId}/messages`, {
    method: 'POST',
    body: JSON.stringify({
      allowed_mentions: {parse:[]},
      nonce: `${applicationId}${page}`.slice(-25), enforce_nonce:true,
      embeds:[{title:'New 881 SERVER Migration Application' + (page ? ` (continued ${page+1})` : ''),
        description,color:0xcda85a,footer:{text:`Application ${applicationId} • Leadership review`}}]
    })
  });
}

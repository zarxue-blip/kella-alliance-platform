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
}

interface SendAttackInput {
  channelId: string;
  roleMentionId?: string;
  message: string;
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

async function discordRequest<T>(path: string, init: RequestInit = {}) {
  const response = await fetch(`https://discord.com/api/v10${path}`, {
    ...init,
    headers: {
      authorization: `Bot ${requireBotToken()}`,
      "content-type": "application/json"
    }
  });

  if (!response.ok) {
    const text = await response.text().catch(() => response.statusText);
    throw new HttpError(response.status >= 500 ? 502 : response.status, `Discord API error: ${text || response.statusText}`);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
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

  for (let page = 0; page < 20; page += 1) {
    const batch = await discordRequest<DiscordGuildMember[]>(`/guilds/${env.DISCORD_GUILD_ID}/members?limit=1000&after=${after}`);
    members.push(...batch);
    if (batch.length < 1000) break;
    const lastUserId = batch[batch.length - 1]?.user?.id;
    if (!lastUserId) break;
    after = lastUserId;
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

export async function sendDiscordEmbed(input: SendEmbedInput) {
  if (!input.channelId) throw new HttpError(400, "Channel ID is required");
  if (!input.description?.trim()) throw new HttpError(400, "Embed description is required");

  return discordRequest<any>(`/channels/${input.channelId}/messages`, {
    method: "POST",
    body: JSON.stringify({
      content: input.roleMentionId ? `<@&${input.roleMentionId}>` : undefined,
      allowed_mentions: input.roleMentionId ? { roles: [input.roleMentionId] } : { parse: [] },
      embeds: [embedPayload(input)]
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

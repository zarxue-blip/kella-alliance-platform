import { isAiLocationAllowed, redactSensitiveText } from '../services/privacy.js';
import { chatImageButton } from '../services/chatImages.js';
import { kellaMention } from "../services/kellaMention.js";
import type { Message } from "discord.js";
import { kellaReply } from "../services/kellaPersona.js";
import { config } from "../config.js";
import { api } from "../services/api.js";

function hasAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function formatNumber(value?: number) {
  const number = Number(value || 0);
  return Number.isFinite(number) ? number.toLocaleString("en-US") : "0";
}

function isMemberStatsQuestion(text: string) {
  return hasAny(text, ["power", "stats", "profile", "uid", "rank", "attendance", "score"]);
}

function memberName(member: Awaited<ReturnType<typeof api.members>>["members"][number]) {
  return member.ign || member.discordDisplayName || member.discordUsername || member.discordId || "that player";
}

function memberStatsReply(member: Awaited<ReturnType<typeof api.members>>["members"][number], topic: string) {
  const name = memberName(member);
  if (topic.includes("power")) {
    return `${name} is sitting at ${formatNumber(member.power)} power. IGN: ${member.ign || "unknown"}. Rank: ${member.rank || "unknown"}. I checked the roster, because apparently numbers are my love language.`;
  }
  if (topic.includes("uid")) {
    return `${name}'s UID is ${member.uid || "not saved yet"}. If that is blank, upload the TopN file before blaming me.`;
  }
  if (topic.includes("attendance") || topic.includes("score")) {
    return `${name}'s attendance score is ${member.attendance ?? 0}. This is where excuses go to become statistics.`;
  }
  return [
    `${name}`,
    `Power: ${formatNumber(member.power)}`,
    `UID: ${member.uid || "not saved yet"}`,
    `Rank: ${member.rank || "unknown"}`,
    `Role: ${member.role || "Member"}`,
    `Alliance: ${member.alliance || "unknown"}`
  ].join("\n");
}

function possibleMemberSearchText(question: string) {
  const cleaned = question
    .toLowerCase()
    .replace(/<@!?\d+>/g, " ")
    .replace(/[^\p{L}\p{N}_ -]/gu, " ");
  const noise = new Set([
    "what",
    "whats",
    "what's",
    "is",
    "the",
    "power",
    "stats",
    "profile",
    "uid",
    "rank",
    "attendance",
    "score",
    "of",
    "for",
    "about",
    "tell",
    "me",
    "player",
    "member",
    "please",
    "pls",
    "kella",
    "are",
    "you"
  ]);
  return cleaned
    .split(/\s+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 1 && !noise.has(part))
    .join(" ")
    .trim();
}

async function answerMemberStats(message: Message, question: string) {
  const text = question.toLowerCase();
  if (!isMemberStatsQuestion(text)) return undefined;

  const botId = message.client.user?.id;
  const mentionedUser = message.mentions.users.find((user) => user.id !== botId);
  const myQuestion = hasAny(text, ["my power", "my stats", "my profile", "my uid", "my rank", "my attendance"]);
  const search = mentionedUser?.id || (myQuestion ? message.author.id : possibleMemberSearchText(question));
  if (!search) return undefined;

  try {
    const data = await api.members(search);
    const member =
      data.members.find((item) => mentionedUser && item.discordId === mentionedUser.id) ??
      data.members.find((item) => myQuestion && item.discordId === message.author.id) ??
      data.members[0];
    if (!member) {
      const name = mentionedUser?.globalName || mentionedUser?.username || search;
      return `I found ${name} in Discord, but not in the Kella roster yet. Sync Discord, upload the TopN Excel file, then ask me again so I can look smug about it.`;
    }
    return memberStatsReply(member, text);
  } catch {
    return "I tried to check the roster, but the dashboard API is taking a dramatic pause. Try again in a moment.";
  }
}

const recentReplies = new Map<string, number>();
let activeReplies = 0;

export async function handleMessageMention(message: Message) {
  if (message.author.bot || message.webhookId || !message.guildId) return;
  if (!isAiLocationAllowed(message.guildId, message.channelId, "parentId" in message.channel ? message.channel.parentId : null, config.DISCORD_GUILD_ID, config.AI_ALLOWED_CHANNEL_IDS)) return;
  const botUser = message.client.user;
  if (!botUser) return;
  const question = kellaMention(message.content, botUser.id, message.mentions.users.has(botUser.id), message.mentions.roles.values());
  if (question === undefined) return;
  const now = Date.now();
  for (const [key, expires] of recentReplies) if (expires <= now) recentReplies.delete(key);
  const key = message.guildId + ':' + message.author.id;
  if (recentReplies.has(key)) return;
  recentReplies.set(key, now + 15_000);
  if (activeReplies >= 2) {
    await message.reply({ content: "One caravan at a time. Ask again in a moment.", allowedMentions: { parse: [], repliedUser: false } }).catch(() => {});
    return;
  }
  activeReplies++;
  try {
    const memberAnswer = await answerMemberStats(message, question);
    let answer = memberAnswer || "My donkey is more talkative than the oracle today. Try again shortly; I've coins to count.";
    if (config.GROQ_API_KEY && !memberAnswer) {
      try { answer = await kellaReply(question, memberAnswer, config.GROQ_API_KEY, config.PUBLIC_APP_URL); }
      catch { /* Keep factual roster output or an in-character free-quota fallback. */ }
    }
    await message.reply({ content: redactSensitiveText(answer).slice(0,1900), components: await chatImageButton(message), allowedMentions: { parse: [], repliedUser: false } });
  } catch {
    console.warn('Kella could not send a mention reply. Check channel permissions and service availability.');
  } finally { activeReplies--; }
}

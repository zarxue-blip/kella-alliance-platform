import type { Message } from "discord.js";
import { botName } from "@cod-amp/shared";
import { config } from "../config.js";
import { api } from "../services/api.js";

const topics = [
  "roots",
  "shield",
  "attack",
  "dashboard",
  "members",
  "sync",
  "apply",
  "checkin",
  "summit",
  "complain",
  "complaint",
  "suggestion",
  "help"
];

function cleanMentionText(message: Message) {
  const botId = message.client.user?.id;
  if (!botId) return message.content.trim();
  return message.content.replace(new RegExp(`<@!?${botId}>`, "g"), "").trim();
}

function hasAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function pick(lines: string[]) {
  return lines[Math.floor(Math.random() * lines.length)];
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

function helpText() {
  return [
    "You summoned Kella. Good, we are pretending this was planned.",
    "",
    "Ask me about:",
    "- roots: Roots of War registration",
    "- shield: warning a player",
    "- attack: emergency alert",
    "- members: roster and sync",
    "- dashboard: command center link",
    "- wiki: alliance rules and guides",
    "- time: live UTC countdown timer",
    "- complain: private complaint or suggestion for admins",
    "",
    "Useful commands: /roots, /summit, /time, /shield, /attack, /checkin, /absence, /apply, /complain, /wiki-admin, /dashboard"
  ].join("\n");
}

function answerMention(question: string) {
  const text = question.toLowerCase();

  if (!text) {
    return pick([
      "You rang? Ask me about Roots, shields, attacks, members, events, complaints, or the dashboard. Use words. They remain undefeated.",
      "Yes commander? I know Roots, alerts, members, events, complaints, server time, and who forgot to click buttons again.",
      "Kella is listening. Ask about alliance tools, event times, member stats, or why people still ignore announcements."
    ]);
  }

  if (hasAny(text, ["hi", "hello", "hey", "morning", "evening", "yo", "sup"])) {
    return pick([
      "Hello commander. I am awake, caffeinated, and judging the attendance list with professional restraint.",
      "Hi. I have arrived with answers, sarcasm, and only minor disappointment.",
      "Hey hey. Say the problem and I will pretend the alliance is calm."
    ]);
  }

  if (hasAny(text, ["how are you", "how r u", "how you doing", "are you ok", "you good"])) {
    return pick([
      "I am doing great. My coins are counted, my patience is charging, and the roster is still suspicious.",
      "Operational, shiny, and emotionally prepared to watch someone miss registration again.",
      "I am fine. The dashboard is breathing, the server time is UTC, and my standards remain dangerously high."
    ]);
  }

  if (hasAny(text, ["thanks", "thank you", "ty"])) {
    return pick([
      "You are welcome. I will add this rare moment of manners to the alliance archive.",
      "Anytime. I live to serve, complain, and count coins.",
      "Accepted. Your politeness has been logged as suspicious but appreciated."
    ]);
  }

  if (hasAny(text, ["help", "command", "what can you do", "how do i use", "commands", "guide"])) return helpText();

  if (hasAny(text, ["root", "row", "roots of war", "war registration"])) {
    return "/roots creates Roots of War registration with 14 UTC and 20 UTC buttons. Members pick Available, Absent, or Not Sure. Beautifully simple, which means someone will still ignore it.";
  }

  if (hasAny(text, ["14 utc", "20 utc", "which slot", "time slot", "row time"])) {
    return "Roots has two Kella slots: 14:00 UTC and 20:00 UTC. Pick the one you can actually attend, not the one your optimism hallucinated.";
  }

  if (hasAny(text, ["shield", "bubble"])) {
    return "/shield @player sends a shield warning DM and logs it in the dashboard. Perfect for people who treat shielding like a decorative suggestion.";
  }

  if (hasAny(text, ["attack", "rally", "fight", "enemy"])) {
    return "/attack posts an emergency alert with response buttons: Joining, Defending, On The Way, and Unavailable. Click fast. Panic later.";
  }

  if (hasAny(text, ["dashboard", "site", "website", "link"])) {
    return `Dashboard: ${config.PUBLIC_APP_URL}\nGo there for members, alerts, embeds, Roots reports, and other things officers keep pretending spreadsheets are good at.`;
  }

  if (hasAny(text, ["member", "roster", "sync", "topn", "excel", "upload"])) {
    return "Use Dashboard > Members. Sync Discord for names and avatars, then upload the TopN Excel file for UID and power. Manual, yes. Chaos-free, allegedly.";
  }

  if (hasAny(text, ["apply", "recruit", "application"])) {
    return "/apply opens a simple recruitment form. IGN, power, timezone, main legion. No essay. Nobody has time for that.";
  }

  if (hasAny(text, ["checkin", "activity", "inactive"])) {
    return "/checkin creates a daily check-in button. The dashboard tracks activity so officers can see who vanished into the fog.";
  }

  if (hasAny(text, ["absence", "vacation", "away", "leave"])) {
    return '/absence lets members submit time away with dates and a reason. Officers see the list, so no, "I vanished spiritually" is not a schedule.';
  }

  if (hasAny(text, ["complain", "complaint", "suggestion", "feedback"])) {
    return "/complain message: your complaint sends it privately to R4 review. /suggest message: your idea works too. Finally, organized drama.";
  }

  if (hasAny(text, ["summit", "fortress", "stronghold", "pass", "behemoth", "event"])) {
    return "/summit creates a Summit registration panel. Members pick Attending, Absent, or Not Sure. Revolutionary technology: clicking one button.";
  }

  if (hasAny(text, ["timer", "countdown"])) {
    return "Use /time with a 24-hour UTC server time, like /time utc:13 UTC. Discord will show a live countdown such as \"in 5 minutes\". Finally, timekeeping with fewer arguments.";
  }

  if (hasAny(text, ["time", "utc", "server time"])) {
    return "Call of Dragons server time is 24-hour UTC. Use /time utc:13 UTC to post a live countdown. If your clock says 7 PM and the event says 19:00 UTC, congratulations, numbers still work.";
  }

  if (hasAny(text, ["wiki", "guide", "guides", "rule", "rules", "nap", "alliance rule"])) {
    return `Kella Wiki is here: ${config.PUBLIC_APP_URL.replace(/\/$/, "")}/wiki\nRead rules, event guides, and officer notes there. Yes, reading is still legal in 2026.`;
  }

  if (hasAny(text, ["translate", "translation", "flag", "language"])) {
    return "React to a text message with a country flag and I will translate it. I only translate readable text, not screenshots, memes, or ancient emotional damage.";
  }

  if (hasAny(text, ["who can login", "login", "access", "member role", "admin role"])) {
    return "Members with the approved Discord member role can log in and edit their own profile. Admin roles can edit roster data, send alerts, and touch the dangerous buttons. Democracy, but with permissions.";
  }

  if (hasAny(text, ["embed", "announcement", "send message"])) {
    return "Use Dashboard > Embed Sender to write a polished Discord embed. Title, description, color, images, role ping. Fancy parchment energy, fewer typos.";
  }

  if (hasAny(text, ["who is best", "best player", "strongest", "carry"])) {
    return "The best player is the one online at event time, shielded, registered, and not explaining why their cat pressed the wrong march button.";
  }

  if (hasAny(text, ["love you", "ily"])) {
    return "Adorable. I will treasure this until the next missed check-in ruins my mood.";
  }

  if (hasAny(text, ["sorry"])) {
    return "Apology received. Please convert remorse into attendance.";
  }

  if (hasAny(text, ["who are you", "what are you", "kella"])) {
    return `I am ${botName}, your alliance command assistant. I organize Roots, alerts, shields, check-ins, members, and officer chaos with slightly less patience than a spreadsheet.`;
  }

  if (hasAny(text, ["roast", "mean", "unhinged"])) {
    return "I can be sharp, not stupid. I roast missed shields, mystery absences, and planning held together by vibes. I do not do hate speech. Standards, tragically.";
  }

  return "im busy counting my coins ask Chat gpt instead";
}

export async function handleMessageMention(message: Message) {
  if (message.author.bot) return;
  const botUser = message.client.user;
  if (!botUser) return;
  if (!message.mentions.users.has(botUser.id)) return;

  const question = cleanMentionText(message);
  const memberAnswer = await answerMemberStats(message, question);
  const answer = (memberAnswer || answerMention(question)).slice(0, 1900);
  await message.reply({ content: answer, allowedMentions: { repliedUser: false } });
}

import type { Message } from "discord.js";
import { botName } from "@cod-amp/shared";
import { config } from "../config.js";

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
    "- complain: private complaint or suggestion for admins",
    "",
    "Useful commands: /roots, /summit, /shield, /attack, /checkin, /absence, /apply, /complain, /dashboard"
  ].join("\n");
}

function answerMention(question: string) {
  const text = question.toLowerCase();

  if (!text) {
    return "You rang? Ask me about roots, shields, attacks, members, or the dashboard. Use words. They are free.";
  }

  if (hasAny(text, ["help", "command", "what can you do", "how do i use"])) return helpText();

  if (hasAny(text, ["root", "row", "war"])) {
    return "/roots creates Roots of War registration with 14 UTC and 20 UTC buttons. Members pick Available, Absent, or Not Sure. Beautifully simple, which means someone will still ignore it.";
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

  if (hasAny(text, ["member", "roster", "sync", "power", "topn", "game tools"])) {
    return "Use Dashboard > Members. Sync Discord for names and avatars, then Sync Game Tools for UID, power, and TopN rank. Yes, two buttons. No, that is not a tragedy.";
  }

  if (hasAny(text, ["apply", "recruit", "application"])) {
    return "/apply opens a simple recruitment form. IGN, power, timezone, main legion. No essay. Nobody has time for that.";
  }

  if (hasAny(text, ["checkin", "activity", "inactive"])) {
    return "/checkin creates a daily check-in button. The dashboard tracks activity so officers can see who vanished into the fog.";
  }

  if (hasAny(text, ["complain", "complaint", "suggestion", "feedback"])) {
    return "/complain opens a private complaint or suggestion form. Admins review it on the Complaints page and mark it Pending or Resolved. Finally, organized drama.";
  }

  if (hasAny(text, ["summit"])) {
    return "/summit creates a Summit registration panel. Members pick Attending, Absent, or Not Sure. Revolutionary technology: clicking one button.";
  }

  if (hasAny(text, ["who are you", "what are you", "kella"])) {
    return `I am ${botName}, your alliance command assistant. I organize Roots, alerts, shields, check-ins, members, and officer chaos with slightly less patience than a spreadsheet.`;
  }

  if (hasAny(text, ["roast", "mean", "unhinged"])) {
    return "I can be sharp, not stupid. I roast bad planning, missed shields, and mystery absences. I do not do hate speech. Aim higher.";
  }

  return "I heard my name, but that question arrived without a map. Ask about roots, shield, attack, members, sync, apply, checkin, summit, or dashboard.";
}

export async function handleMessageMention(message: Message) {
  if (message.author.bot) return;
  const botUser = message.client.user;
  if (!botUser) return;
  if (!message.mentions.users.has(botUser.id)) return;

  const question = cleanMentionText(message);
  const answer = answerMention(question).slice(0, 1900);
  await message.reply({ content: answer, allowedMentions: { repliedUser: false } });
}

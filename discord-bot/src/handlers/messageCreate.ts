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
    return "You rang? Ask me about roots, shields, attacks, members, rules, events, complaints, or the dashboard. Use words. They remain undefeated.";
  }

  if (hasAny(text, ["hi", "hello", "hey", "morning", "evening"])) {
    return "Hello commander. I am awake, caffeinated, and judging the attendance list with professional restraint.";
  }

  if (hasAny(text, ["thanks", "thank you", "ty"])) {
    return "You are welcome. I will add this rare moment of manners to the alliance archive.";
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
    return "Use Dashboard > Members. Sync Discord for names and avatars, then upload the TopN Excel file for UID and power. Manual, yes. Chaos-free, allegedly.";
  }

  if (hasAny(text, ["apply", "recruit", "application"])) {
    return "/apply opens a simple recruitment form. IGN, power, timezone, main legion. No essay. Nobody has time for that.";
  }

  if (hasAny(text, ["checkin", "activity", "inactive"])) {
    return "/checkin creates a daily check-in button. The dashboard tracks activity so officers can see who vanished into the fog.";
  }

  if (hasAny(text, ["complain", "complaint", "suggestion", "feedback"])) {
    return "/complain message: your complaint sends it privately to R4 review. /suggest message: your idea works too. Finally, organized drama.";
  }

  if (hasAny(text, ["summit"])) {
    return "/summit creates a Summit registration panel. Members pick Attending, Absent, or Not Sure. Revolutionary technology: clicking one button.";
  }

  if (hasAny(text, ["time", "utc", "server time"])) {
    return "Call of Dragons server time is 24-hour UTC. If your clock says 7 PM and the event says 19:00 UTC, congratulations, numbers still work.";
  }

  if (hasAny(text, ["rule", "rules", "nap", "alliance rule"])) {
    return "Follow alliance rules, respect NAPs, shield when needed, and read announcements before asking what the announcement says. Ambitious, I know.";
  }

  if (hasAny(text, ["who is best", "best player", "strongest", "carry"])) {
    return "The best player is the one online at event time, shielded, registered, and not explaining why their cat pressed the wrong march button.";
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
  const answer = answerMention(question).slice(0, 1900);
  await message.reply({ content: answer, allowedMentions: { repliedUser: false } });
}

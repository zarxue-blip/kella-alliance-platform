import type { MessageReaction, PartialMessageReaction, PartialUser, User } from "discord.js";
import { getLanguageFromFlag, translateForFlag } from "../services/translation.js";

async function fetchReaction(reaction: MessageReaction | PartialMessageReaction) {
  if (reaction.partial) return (await reaction.fetch()) as MessageReaction;
  return reaction as MessageReaction;
}

async function fetchMessage(reaction: MessageReaction) {
  if (reaction.message.partial) return reaction.message.fetch();
  return reaction.message;
}

function getEmojiName(reaction: MessageReaction) {
  return reaction.emoji.name ?? "";
}

function describeError(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export async function handleMessageReactionAdd(
  reactionInput: MessageReaction | PartialMessageReaction,
  userInput: User | PartialUser
) {
  if (userInput.bot) return;

  try {
    const reaction = await fetchReaction(reactionInput);
    const flag = getEmojiName(reaction);
    if (!getLanguageFromFlag(flag)) return;

    const message = await fetchMessage(reaction);
    const sourceText = message.content?.trim();
    if (!sourceText) return;

    const translation = await translateForFlag(sourceText, flag);
    if (!translation) return;

    const trimNote = translation.wasTrimmed ? "\n\n_Note: I translated the first part because the free service has a short text limit._" : "";
    await message.reply({
      content: `${flag} **${translation.language.label} translation**\n${translation.translatedText}${trimNote}`,
      allowedMentions: { repliedUser: false }
    });
  } catch (error) {
    const reaction = reactionInput.partial ? null : reactionInput;
    const message = reaction?.message.partial ? null : reaction?.message;
    if (!message?.reply) {
      console.warn(`Kella translation failed: ${describeError(error)}`);
      return;
    }

    await message.reply({
      content: `I could not translate that right now: ${describeError(error)}`,
      allowedMentions: { repliedUser: false }
    });
  }
}

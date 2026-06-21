import type { MessageReaction, PartialMessageReaction, PartialUser, User } from "discord.js";
import { translateForFlag } from "../services/translation.js";

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
    const message = await fetchMessage(reaction);
    const sourceText = message.content?.trim();
    if (!sourceText) {
      await message.reply({
        content:
          "I saw the flag, but I cannot read that message yet. Turn on Message Content Intent for Kella in the Discord Developer Portal, then redeploy.",
        allowedMentions: { repliedUser: false }
      });
      return;
    }

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

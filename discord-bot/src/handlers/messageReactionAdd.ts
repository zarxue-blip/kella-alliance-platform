import { EmbedBuilder, type MessageReaction, PartialMessageReaction, PartialUser, User } from "discord.js";
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

const translations = new Map<string, number>();

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
    if (message.author?.bot) return;
    const translationKey = message.id + ':' + getLanguageFromFlag(flag)?.code;
    for (const [key, expires] of translations) if (expires <= Date.now()) translations.delete(key);
    if (translations.has(translationKey)) return;
    translations.set(translationKey, Date.now() + 60_000);
    const sourceText = message.content?.trim();
    if (!sourceText) {
      if (message.attachments.size > 0) return;

      await message.reply({
        embeds: [new EmbedBuilder().setTitle("🌐 Kella Translation").setDescription("I cannot read this message. Ask an officer to check my message access.").setColor(0xd6aa49)],
        allowedMentions: { parse: [], repliedUser: false }
      });
      return;
    }

    const translation = await translateForFlag(sourceText, flag);
    if (!translation) return;

    const pages = translation.translatedText.match(/[\s\S]{1,3900}/g) || [];
    const embeds = pages.slice(0, 2).map((text, index) => new EmbedBuilder()
      .setTitle(index ? "🌐 Kella Translation · continued" : "🌐 Kella Translation")
      .setDescription(text).setColor(0xd6aa49)
      .setFooter({text: 'Kella • Alliance Translator · ' + translation.language.label}));
    if (pages.length > 2) throw new Error('Translation too long');
    // Discord limits aggregate embed text per message, so send each page separately.
    for (const embed of embeds) await message.reply({ embeds: [embed], allowedMentions: { parse: [], repliedUser: false } });
  } catch (error) {
    const reaction = reactionInput.partial ? null : reactionInput;
    const message = reaction?.message.partial ? null : reaction?.message;
    if (!message?.reply) {
      console.warn(`Kella translation failed: ${describeError(error)}`);
      return;
    }

    await message.reply({
      embeds: [new EmbedBuilder().setTitle("🌐 Kella Translation").setDescription("Translation is unavailable right now. Please try again shortly.").setColor(0xd6aa49).setFooter({text:"Kella • Alliance Translator"})],
      allowedMentions: { parse: [], repliedUser: false }
    }).catch(() => console.warn("Kella could not send a translation reply."));
  }
}

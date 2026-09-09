import { isAiLocationAllowed } from '../services/privacy.js';
import { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import type { BotCommand } from './index.js';
import { config } from '../config.js';
import { collectSummaryHistory, summaryChunks, SUMMARY_WINDOW_MS } from '../services/chatSummary.js';
import { summarizeWithGroq } from '../services/groqSummary.js';

let busy = false;
const cooldowns = new Map<string, number>();
export const sumCommand: BotCommand = {
  data: new SlashCommandBuilder().setName('sum').setDescription('Summarize this channel’s past 5 hours in a short embed.').setDMPermission(false),
  async execute(interaction) {
    const channel = interaction.channel;
    if (!interaction.inGuild() || !channel?.isTextBased() || channel.isDMBased()) {
      await interaction.reply({ ephemeral: true, content: 'Use /sum in a server text channel or thread.' }); return;
    }
    if (!isAiLocationAllowed(interaction.guildId, channel.id, "parentId" in channel ? channel.parentId : null, config.DISCORD_GUILD_ID, config.AI_ALLOWED_CHANNEL_IDS)) {
      await interaction.reply({ ephemeral: true, content: "AI features are not enabled here. Ask an admin to check the server and channel settings." }); return;
    }
    const required = [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory];
    if (!interaction.memberPermissions?.has(required) || !interaction.appPermissions?.has([...required, channel.isThread() ? PermissionFlagsBits.SendMessagesInThreads : PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks])) {
      await interaction.reply({ ephemeral: true, content: 'You and Kella need access to this channel’s message history, and Kella needs permission to send embeds.' }); return;
    }
    if (!config.ENABLE_MESSAGE_CONTENT_INTENT || !config.GROQ_API_KEY) {
      await interaction.reply({ ephemeral: true, content: 'An admin needs to configure the free Groq API key and enable Message Content Intent before /sum is available.' }); return;
    }
    const now = interaction.createdTimestamp;
    for (const [key, expires] of cooldowns) if (expires <= Date.now()) cooldowns.delete(key);
    if (busy || cooldowns.has(channel.id)) {
      await interaction.reply({ ephemeral: true, content: 'Kella is summarizing or cooling down. Please try again in a few minutes.' }); return;
    }
    busy = true;
    cooldowns.set(channel.id, Date.now() + 5 * 60_000);
    try {
      await interaction.deferReply();
      const messages = await collectSummaryHistory(async before => [...(await channel.messages.fetch({ limit: 100, before })).values()], now);
      const summary = await summarizeWithGroq(summaryChunks(messages, 10_000), config.GROQ_API_KEY);
      const embed = new EmbedBuilder().setColor(0xd6aa49).setTitle('Kella’s 5-hour recap')
        .setDescription(summary).addFields({ name: 'Time covered', value: `<t:${Math.floor((now-SUMMARY_WINDOW_MS)/1000)}:t> – <t:${Math.floor(now/1000)}:t>` })
        .setFooter({ text: `${messages.length} text messages · Current channel only · AI summary` }).setTimestamp(now);
      await interaction.editReply({ embeds: [embed], allowedMentions: { parse: [] } });
    } catch (error) {
      const content = 'The summary is unavailable right now. Please try again later.';
      if (interaction.deferred) await interaction.editReply({ content, allowedMentions: { parse: [] } });
      else throw error;
    } finally { busy = false; }
  }
};

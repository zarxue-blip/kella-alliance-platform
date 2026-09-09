import { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, AttachmentBuilder, PermissionFlagsBits, type Message, type Interaction } from 'discord.js';
import { api } from './api.js';
import { config } from '../config.js';

async function context(guild: NonNullable<Message['guild']>, userId:string) {
  if (guild.id !== config.DISCORD_GUILD_ID) throw new Error('Wrong server');
  const member = await guild.members.fetch({user:userId,force:true});
  return {guildId:guild.id,discordId:member.id,roleIds:[...member.roles.cache.keys()]};
}
export async function chatImageButton(message:Message) {
  try {
    if (!message.guild) return [];
    const result = await api.chatImages(await context(message.guild,message.author.id));
    if (!result.images?.length) return [];
    return [new ActionRowBuilder<ButtonBuilder>().addComponents(new ButtonBuilder().setCustomId('chat-images:open').setLabel('Images').setStyle(ButtonStyle.Secondary).setEmoji('🖼️'))];
  } catch { return []; }
}
export async function handleChatImages(interaction:Interaction):Promise<boolean> {
  if (!(interaction.isButton() || interaction.isStringSelectMenu()) || !interaction.customId.startsWith('chat-images:')) return false;
  await interaction.deferReply({ephemeral:true});
  try {
    if (!interaction.guild || !interaction.channel || interaction.channel.isDMBased()) throw new Error('Server required');
    const ctx = await context(interaction.guild,interaction.user.id);
    const id = interaction.isStringSelectMenu() ? interaction.values[0] : undefined;
    const data = await api.chatImages({...ctx,id});
    if (!id) {
      if (!data.images?.length) {await interaction.editReply('The image library is empty. Upload images in Admin Tools.');return true;}
      await interaction.editReply({content:'Choose an image to send to this channel. Other members will see the image.',components:[new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(new StringSelectMenuBuilder().setCustomId('chat-images:send').setPlaceholder('Choose an image').addOptions(data.images.map(image=>({label:image.name,value:image._id}))))]});
    } else {
      const required = [PermissionFlagsBits.ViewChannel,interaction.channel.isThread()?PermissionFlagsBits.SendMessagesInThreads:PermissionFlagsBits.SendMessages];
      if (!interaction.memberPermissions?.has(required) || !interaction.appPermissions?.has([...required,PermissionFlagsBits.AttachFiles])) throw new Error('Permission required');
      if (!data.image) throw new Error('Image removed');
      const match = /^data:image\/(png|jpeg|gif|webp);base64,(.+)$/.exec(data.image.dataUrl);
      if (!match) throw new Error('Invalid image');
      await interaction.editReply('Sending image…');
      await interaction.followUp({files:[new AttachmentBuilder(Buffer.from(match[2],'base64'),{name:'kella-image.'+match[1]})],allowedMentions:{parse:[]},ephemeral:false});
      await interaction.editReply('Image sent.');
    }
  } catch { await interaction.editReply('Only admins can use this library. If you are an admin, check channel permissions or whether the image was removed.'); }
  return true;
}

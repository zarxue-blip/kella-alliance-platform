import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  GuildMember,
  ModalBuilder,
  StringSelectMenuBuilder,
  TextInputBuilder,
  TextInputStyle,
  type ChatInputCommandInteraction,
  type Interaction
} from "discord.js";
import { botName } from "@cod-amp/shared";
import { api } from "../services/api.js";
import { commandMap, rootsPollButtons, rootsPollEmbed } from "../commands/index.js";

function displayName(interaction: Interaction) {
  return interaction.member instanceof GuildMember ? interaction.member.displayName : interaction.user.globalName || interaction.user.username;
}

async function showComplaintModal(interaction: ChatInputCommandInteraction) {
  const kind = interaction.options.getString("type") === "Suggestion" ? "Suggestion" : "Complaint";
  const anonymous = interaction.options.getBoolean("anonymous") === true;
  const modal = new ModalBuilder().setCustomId(`complaint-modal:${kind}:${anonymous ? "1" : "0"}`).setTitle(`${kind} for Admins`);
  modal.addComponents(
    new ActionRowBuilder<TextInputBuilder>().addComponents(
      new TextInputBuilder()
        .setCustomId("message")
        .setLabel("What should admins know?")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true)
        .setMaxLength(1800)
    )
  );
  await interaction.showModal(modal);
}

async function submitComplaintFromCommand(interaction: ChatInputCommandInteraction, kind: "Complaint" | "Suggestion") {
  const message = interaction.options.getString("message")?.trim();
  if (!message) {
    await showComplaintModal(interaction);
    return;
  }

  await interaction.deferReply({ ephemeral: true });
  await api.complaint({
    discordId: interaction.user.id,
    displayName: displayName(interaction),
    kind,
    message,
    anonymous: interaction.options.getBoolean("anonymous") === true
  });
  await interaction.editReply({
    content: `${botName} submitted your ${kind.toLowerCase()}. R4s will review it in the dashboard. Try not to refresh the drama every six minutes.`
  });
}

function rootsDayMenus(monthValue: string) {
  const [year, month] = monthValue.split("-").map(Number);
  const totalDays = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const menus: Array<ActionRowBuilder<StringSelectMenuBuilder>> = [];
  for (let day = 1; day <= totalDays; day += 1) {
    const group = day <= 16 ? 0 : 1;
    if (!menus[group]) {
      const range = group === 0 ? "1-16" : `17-${totalDays}`;
      menus[group] = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId(`roots-day:${monthValue}:${group}`)
          .setPlaceholder(`Choose day ${range}`)
      );
    }
    const eventDate = `${monthValue}-${String(day).padStart(2, "0")}`;
    menus[group].components[0].addOptions({
      label: new Date(`${eventDate}T00:00:00.000Z`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        timeZone: "UTC"
      }),
      value: eventDate
    });
  }
  return menus;
}

function rootsConfirmation(eventDate: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId(`roots-confirm:${eventDate}`).setLabel("Confirm and Publish").setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId("roots-cancel").setLabel("Cancel").setStyle(ButtonStyle.Secondary)
  );
}

async function replyError(interaction: Interaction, error: unknown) {
  const message = error instanceof Error ? error.message : "Kella could not complete that action.";
  if (interaction.isRepliable()) {
    if (interaction.deferred || interaction.replied) {
      if (interaction.deferred && !interaction.replied) {
        await interaction.editReply({ content: message });
      } else {
        await interaction.followUp({ ephemeral: true, content: message });
      }
    } else {
      await interaction.reply({ ephemeral: true, content: message });
    }
  }
}

export async function handleInteraction(interaction: Interaction) {
  try {
    if (interaction.isChatInputCommand()) {
      const commandEnabled = await api.isCommandEnabled(interaction.commandName);
      if (!commandEnabled) {
        await interaction.reply({
          ephemeral: true,
          content: `/${interaction.commandName} is currently turned off by a Kella administrator.`
        });
        return;
      }

      if (interaction.commandName === "complain") {
        const kind = interaction.options.getString("type") === "Suggestion" ? "Suggestion" : "Complaint";
        await submitComplaintFromCommand(interaction, kind);
        return;
      }

      if (interaction.commandName === "suggest") {
        await submitComplaintFromCommand(interaction, "Suggestion");
        return;
      }

      const command = commandMap.get(interaction.commandName);
      if (!command) {
        await interaction.reply({ ephemeral: true, content: `${botName} does not recognize /${interaction.commandName} yet. Please try again after Kella refreshes commands.` });
        return;
      }
      await command.execute(interaction);
      return;
    }

    if (interaction.isStringSelectMenu() && interaction.customId === "roots-month") {
      const monthValue = interaction.values[0];
      if (!monthValue) return;
      await interaction.update({
        content: "Choose the Roots of War day.",
        components: rootsDayMenus(monthValue)
      });
      return;
    }

    if (interaction.isStringSelectMenu() && interaction.customId.startsWith("roots-day:")) {
      const eventDate = interaction.values[0];
      if (!eventDate) return;
      const unix = Math.floor(new Date(`${eventDate}T00:00:00.000Z`).getTime() / 1000);
      await interaction.update({
        content: `Publish Roots of War registration for <t:${unix}:D>?`,
        components: [rootsConfirmation(eventDate)]
      });
      return;
    }

    if (interaction.isButton() && interaction.customId === "roots-cancel") {
      await interaction.update({ content: "Roots of War registration cancelled.", components: [] });
      return;
    }

    if (interaction.isButton() && interaction.customId.startsWith("roots-confirm:")) {
      const eventDate = interaction.customId.slice("roots-confirm:".length);
      await interaction.deferUpdate();
      const { session } = await api.rootsSession({
        officerDiscordId: interaction.user.id,
        officerName: displayName(interaction),
        eventDate
      });
      if (!interaction.channel?.isSendable()) throw new Error("Kella cannot publish in this channel.");
      const message = await interaction.channel.send({
        embeds: [rootsPollEmbed(eventDate)],
        components: [rootsPollButtons(session._id)]
      });
      await api.updateRootsSession(session._id, {
        guildId: interaction.guildId ?? undefined,
        channelId: message.channelId,
        messageId: message.id
      });
      await interaction.editReply({ content: `Roots of War registration published for ${eventDate}.`, components: [] });
      return;
    }

    if (interaction.isButton() && interaction.customId.startsWith("attack:")) {
      const [, status] = interaction.customId.split(":");
      if (!status) return;
      await api.attackResponse({ discordId: interaction.user.id, displayName: displayName(interaction), status });
      await interaction.reply({ ephemeral: true, content: `${botName} recorded you as ${status}.` });
      return;
    }

    if (interaction.isButton() && interaction.customId.startsWith("event:")) {
      const [, eventId, statusValue] = interaction.customId.split(":");
      if (!eventId || !statusValue) return;
      const status = statusValue === "Unsure" ? "Not Sure" : statusValue;
      await api.eventResponse({ discordId: interaction.user.id, displayName: displayName(interaction), eventId, status });
      await interaction.reply({ ephemeral: true, content: `${botName} recorded your event attendance as ${status}.` });
      return;
    }

    if (interaction.isButton() && interaction.customId.startsWith("roots:")) {
      const [, reportId, slot, statusValue] = interaction.customId.split(":");
      if (!reportId || !slot || !statusValue) return;
      const status = statusValue === "Unsure" ? "Not Sure" : statusValue;
      await api.rootsResponse({ discordId: interaction.user.id, displayName: displayName(interaction), reportId, slot, status });
      await interaction.reply({ ephemeral: true, content: `${botName} recorded ${status} for Roots of War ${slot}.` });
      return;
    }

    if (interaction.isButton() && interaction.customId.startsWith("summit:")) {
      const [, status] = interaction.customId.split(":");
      if (!status) return;
      await api.summitResponse({ discordId: interaction.user.id, displayName: displayName(interaction), status });
      await interaction.reply({ ephemeral: true, content: `${botName} recorded your Summit status as ${status}.` });
      return;
    }

    if (interaction.isButton() && interaction.customId === "checkin:daily") {
      await api.dailyCheckIn({ discordId: interaction.user.id, displayName: displayName(interaction) });
      await interaction.reply({ ephemeral: true, content: `${botName} checked you in for today.` });
      return;
    }

    if (interaction.isModalSubmit() && interaction.customId === "absence-modal") {
      await api.absence({
        discordId: interaction.user.id,
        displayName: displayName(interaction),
        reason: interaction.fields.getTextInputValue("reason"),
        startDate: interaction.fields.getTextInputValue("startDate"),
        endDate: interaction.fields.getTextInputValue("endDate")
      });
      await interaction.reply({ ephemeral: true, content: `${botName} saved your absence notice.` });
      return;
    }

    if (interaction.isModalSubmit() && interaction.customId === "application-modal") {
      await api.application({
        discordId: interaction.user.id,
        displayName: displayName(interaction),
        ign: interaction.fields.getTextInputValue("ign"),
        power: Number(interaction.fields.getTextInputValue("power").replaceAll(",", "")),
        timezone: interaction.fields.getTextInputValue("timezone"),
        mainLegion: interaction.fields.getTextInputValue("mainLegion")
      });
      await interaction.reply({ ephemeral: true, content: `${botName} submitted your application. Officers can approve or reject it from the dashboard.` });
      return;
    }

    if (interaction.isModalSubmit() && interaction.customId.startsWith("complaint-modal:")) {
      const [, rawKind, anonymousValue] = interaction.customId.split(":");
      const kind = rawKind === "Suggestion" ? "Suggestion" : "Complaint";
      await interaction.deferReply({ ephemeral: true });
      await api.complaint({
        discordId: interaction.user.id,
        displayName: displayName(interaction),
        kind,
        message: interaction.fields.getTextInputValue("message"),
        anonymous: anonymousValue === "1"
      });
      await interaction.editReply({ content: `${botName} submitted your ${kind.toLowerCase()}. R4s will review it in the dashboard.` });
    }
  } catch (error) {
    console.error(`${botName} interaction failed`, error);
    await replyError(interaction, error);
  }
}

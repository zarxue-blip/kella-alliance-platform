import type { Interaction } from "discord.js";
import { botName } from "@cod-amp/shared";
import { api } from "../services/api.js";
import { commandMap } from "../commands/index.js";

function displayName(interaction: Interaction) {
  return interaction.user.username;
}

async function replyError(interaction: Interaction, error: unknown) {
  const message = error instanceof Error ? error.message : "Kella could not complete that action.";
  if (interaction.isRepliable()) {
    if (interaction.deferred || interaction.replied) {
      await interaction.followUp({ ephemeral: true, content: message });
    } else {
      await interaction.reply({ ephemeral: true, content: message });
    }
  }
}

export async function handleInteraction(interaction: Interaction) {
  try {
    if (interaction.isChatInputCommand()) {
      const command = commandMap.get(interaction.commandName);
      if (!command) return;
      await command.execute(interaction);
      return;
    }

    if (interaction.isButton() && interaction.customId.startsWith("attack:")) {
      const [, status] = interaction.customId.split(":");
      if (!status) return;
      await api.attackResponse({ discordId: interaction.user.id, displayName: displayName(interaction), status });
      await interaction.reply({ ephemeral: true, content: `${botName} recorded you as ${status}.` });
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
      const [, rawKind] = interaction.customId.split(":");
      const kind = rawKind === "Suggestion" ? "Suggestion" : "Complaint";
      await api.complaint({
        discordId: interaction.user.id,
        displayName: displayName(interaction),
        kind,
        message: interaction.fields.getTextInputValue("message")
      });
      await interaction.reply({ ephemeral: true, content: `${botName} sent your ${kind.toLowerCase()} to the admins.` });
    }
  } catch (error) {
    await replyError(interaction, error);
  }
}

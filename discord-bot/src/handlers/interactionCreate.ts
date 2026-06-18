import type { Interaction } from "discord.js";
import { botName } from "@cod-amp/shared";
import { api } from "../services/api.js";
import { commandMap } from "../commands/index.js";

export async function handleInteraction(interaction: Interaction) {
  if (interaction.isChatInputCommand()) {
    const command = commandMap.get(interaction.commandName);
    if (!command) return;
    try {
      await command.execute(interaction);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Command failed";
      if (interaction.deferred || interaction.replied) {
        await interaction.followUp({ ephemeral: true, content: message });
      } else {
        await interaction.reply({ ephemeral: true, content: message });
      }
    }
    return;
  }

  if (interaction.isModalSubmit() && interaction.customId === "register-modal") {
    await api.register({
      discordId: interaction.user.id,
      ign: interaction.fields.getTextInputValue("ign"),
      uid: interaction.fields.getTextInputValue("uid"),
      power: Number(interaction.fields.getTextInputValue("power").replaceAll(",", "")),
      alliance: interaction.fields.getTextInputValue("alliance")
    });
    await interaction.reply({ ephemeral: true, content: `${botName} saved your registration. Officers can now manage your profile from the dashboard.` });
    return;
  }

  if (interaction.isButton() && interaction.customId.startsWith("cta:")) {
    const [, alertId, status] = interaction.customId.split(":");
    if (!alertId || !status) return;
    await api.callToArmsResponse(alertId, interaction.user.id, status);
    await interaction.reply({ ephemeral: true, content: `${botName} recorded your CTA response as ${status}.` });
    return;
  }

  if (interaction.isStringSelectMenu() && interaction.customId === "event-type-select") {
    await interaction.reply({ ephemeral: true, content: `Filtered event view selected: ${interaction.values.join(", ")}.` });
  }
}

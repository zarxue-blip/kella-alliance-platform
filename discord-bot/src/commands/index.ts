import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  ModalBuilder,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  TextInputBuilder,
  TextInputStyle
} from "discord.js";
import { botName } from "@cod-amp/shared";
import { config } from "../config.js";
import { api } from "../services/api.js";

interface SlashCommandData {
  name: string;
  toJSON(): unknown;
}

export interface BotCommand {
  data: SlashCommandData;
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
}

export const commands: BotCommand[] = [
  {
    data: new SlashCommandBuilder().setName("register").setDescription("Register your Call of Dragons profile."),
    async execute(interaction) {
      const modal = new ModalBuilder().setCustomId("register-modal").setTitle("Alliance Registration");
      modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(new TextInputBuilder().setCustomId("ign").setLabel("In-game name").setStyle(TextInputStyle.Short).setRequired(true)),
        new ActionRowBuilder<TextInputBuilder>().addComponents(new TextInputBuilder().setCustomId("uid").setLabel("Player UID").setStyle(TextInputStyle.Short).setRequired(true)),
        new ActionRowBuilder<TextInputBuilder>().addComponents(new TextInputBuilder().setCustomId("power").setLabel("Power").setStyle(TextInputStyle.Short).setRequired(true)),
        new ActionRowBuilder<TextInputBuilder>().addComponents(new TextInputBuilder().setCustomId("alliance").setLabel("Alliance tag").setStyle(TextInputStyle.Short).setRequired(true))
      );
      await interaction.showModal(modal);
    }
  },
  {
    data: new SlashCommandBuilder().setName("profile").setDescription("View your alliance profile."),
    async execute(interaction) {
      const { member } = await api.profile(interaction.user.id);
      await interaction.reply({
        ephemeral: true,
        embeds: [
          {
            title: `${member.ign} (${member.uid})`,
            color: 0xf59e0b,
            fields: [
              { name: "Power", value: member.power.toLocaleString(), inline: true },
              { name: "Alliance", value: member.alliance, inline: true },
              { name: "Attendance", value: String(member.attendanceScore), inline: true },
              { name: "War Score", value: String(member.warScore), inline: true }
            ]
          }
        ]
      });
    }
  },
  {
    data: new SlashCommandBuilder()
      .setName("attendance")
      .setDescription("Check in to an attendance event.")
      .addStringOption((option) => option.setName("event_id").setDescription("Attendance event ID from the dashboard.").setRequired(true)),
    async execute(interaction) {
      const eventId = interaction.options.getString("event_id", true);
      await api.attendance(eventId, interaction.user.id);
      await interaction.reply({ ephemeral: true, content: `${botName} checked you in. Your dashboard attendance score is updated.` });
    }
  },
  {
    data: new SlashCommandBuilder()
      .setName("roots-of-war")
      .setDescription("Register or check in for Roots of War.")
      .addSubcommand((subcommand) =>
        subcommand
          .setName("register")
          .setDescription("Register for a Roots of War UTC slot.")
          .addStringOption((option) =>
            option
              .setName("slot")
              .setDescription("Roots of War time slot")
              .setRequired(true)
              .addChoices({ name: "14:00 UTC", value: "14UTC" }, { name: "20:00 UTC", value: "20UTC" })
          )
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName("check-in")
          .setDescription("Check attendance for your Roots of War slot.")
          .addStringOption((option) =>
            option
              .setName("slot")
              .setDescription("Roots of War time slot")
              .setRequired(true)
              .addChoices({ name: "14:00 UTC", value: "14UTC" }, { name: "20:00 UTC", value: "20UTC" })
          )
      ),
    async execute(interaction) {
      const action = interaction.options.getSubcommand();
      const slot = interaction.options.getString("slot", true);
      const slotLabel = slot === "14UTC" ? "14:00 UTC" : "20:00 UTC";

      if (action === "register") {
        const result = await api.rootsOfWarRegister(interaction.user.id, slot);
        await interaction.reply({
          ephemeral: true,
          content: `${botName} registered ${result.member.ign} for Roots of War at ${slotLabel}.`
        });
        return;
      }

      const result = await api.rootsOfWarCheckIn(interaction.user.id, slot);
      await interaction.reply({
        ephemeral: true,
        content: result.checkedIn
          ? `${botName} checked in ${result.member.ign} for Roots of War at ${slotLabel}.`
          : `${botName} already had ${result.member.ign} checked in for Roots of War.`
      });
    }
  },
  {
    data: new SlashCommandBuilder()
      .setName("shield")
      .setDescription("Update your shield timer.")
      .addIntegerOption((option) => option.setName("hours").setDescription("Hours remaining on your shield.").setRequired(true).setMinValue(1).setMaxValue(720)),
    async execute(interaction) {
      const hours = interaction.options.getInteger("hours", true);
      const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
      await api.shield(interaction.user.id, expiresAt);
      await interaction.reply({ ephemeral: true, content: `Shield updated. Expires <t:${Math.floor(new Date(expiresAt).getTime() / 1000)}:R>.` });
    }
  },
  {
    data: new SlashCommandBuilder().setName("operation").setDescription("Show active war operations."),
    async execute(interaction) {
      const summary = await api.summary();
      const description = summary.operations.length
        ? summary.operations.map((op) => `**${op.operationName}** -> ${op.target} (${op.priority}) <t:${Math.floor(new Date(op.date).getTime() / 1000)}:R>`).join("\n")
        : "No active operations.";
      await interaction.reply({ ephemeral: true, embeds: [{ title: "War Operations", description, color: 0xef4444 }] });
    }
  },
  {
    data: new SlashCommandBuilder()
      .setName("alert")
      .setDescription("Create a Call to Arms alert.")
      .addStringOption((option) => option.setName("title").setDescription("Alert title").setRequired(true))
      .addStringOption((option) => option.setName("message").setDescription("Alert message").setRequired(true))
      .addStringOption((option) =>
        option
          .setName("priority")
          .setDescription("Priority")
          .setRequired(true)
          .addChoices({ name: "LOW", value: "LOW" }, { name: "MEDIUM", value: "MEDIUM" }, { name: "HIGH", value: "HIGH" }, { name: "CRITICAL", value: "CRITICAL" })
      )
      .addStringOption((option) => option.setName("target").setDescription("Target or rally location")),
    async execute(interaction) {
      const alert = await api.alert({
        title: interaction.options.getString("title", true),
        message: interaction.options.getString("message", true),
        priority: interaction.options.getString("priority", true),
        target: interaction.options.getString("target") ?? undefined,
        createdByDiscordId: interaction.user.id
      });

      const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder().setCustomId(`cta:${alert.alert._id}:Responding`).setLabel("Responding").setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId(`cta:${alert.alert._id}:Reinforcing`).setLabel("Reinforcing").setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId(`cta:${alert.alert._id}:Unavailable`).setLabel("Unavailable").setStyle(ButtonStyle.Secondary)
      );

      await interaction.reply({ content: `Call to Arms created: **${alert.alert.title}**`, components: [buttons] });
    }
  },
  {
    data: new SlashCommandBuilder().setName("task").setDescription("Show your alliance task queue."),
    async execute(interaction) {
      const summary = await api.summary();
      const description = summary.tasks.length ? summary.tasks.map((task) => `**${task.status}** - ${task.title}`).join("\n") : "No open tasks.";
      await interaction.reply({ ephemeral: true, embeds: [{ title: "Task Board", description, color: 0x22c55e }] });
    }
  },
  {
    data: new SlashCommandBuilder().setName("event").setDescription("Open the alliance event calendar."),
    async execute(interaction) {
      const menu = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("event-type-select")
          .setPlaceholder("Choose an event type")
          .addOptions(
            { label: "Summit", value: "Summit" },
            { label: "Fortress", value: "Fortress" },
            { label: "Stronghold", value: "Stronghold" },
            { label: "Roots of War", value: "Roots of War" },
            { label: "Behemoth", value: "Behemoth" },
            { label: "Meeting", value: "Meeting" }
          )
      );
      await interaction.reply({ ephemeral: true, content: `Event calendar: ${config.PUBLIC_APP_URL}/events`, components: [menu] });
    }
  },
  {
    data: new SlashCommandBuilder().setName("dashboard").setDescription("Open the Alliance Command dashboard."),
    async execute(interaction) {
      await interaction.reply({ ephemeral: true, content: `Dashboard: ${config.PUBLIC_APP_URL}` });
    }
  }
];

export const commandMap = new Map(commands.map((command) => [command.data.name, command]));

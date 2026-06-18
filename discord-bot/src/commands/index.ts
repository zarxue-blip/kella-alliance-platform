import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  ModalBuilder,
  SlashCommandBuilder,
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

function rootsButtons(reportId: string, slot: "14UTC" | "20UTC", label: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId(`roots:${reportId}:${slot}:Available`).setLabel(`${label} Available`).setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId(`roots:${reportId}:${slot}:Absent`).setLabel(`${label} Absent`).setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId(`roots:${reportId}:${slot}:Unsure`).setLabel(`${label} Unsure`).setStyle(ButtonStyle.Secondary)
  );
}

function summitButtons() {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId("summit:Attending").setLabel("Attending").setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId("summit:Absent").setLabel("Absent").setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId("summit:Not Sure").setLabel("Not Sure").setStyle(ButtonStyle.Secondary)
  );
}

async function allianceMention(interaction: ChatInputCommandInteraction) {
  const roles = await interaction.guild?.roles.fetch().catch(() => null);
  const role = roles?.find((candidate) => candidate.name.toLowerCase() === "alliance");
  return role ? { content: `<@&${role.id}>`, roles: [role.id] } : { content: "@Alliance", roles: [] };
}

export const commands: BotCommand[] = [
  {
    data: new SlashCommandBuilder()
      .setName("shield")
      .setDescription("DM a shield warning to a player.")
      .addUserOption((option) => option.setName("player").setDescription("Player to warn").setRequired(true)),
    async execute(interaction) {
      const player = interaction.options.getUser("player", true);
      const dmText = [
        "🛡 SHIELD WARNING",
        "",
        "Your at risk please shiel ASAP!",
        "",
        "Please verify your shield status immediately.",
        "",
        "Failure to shield may result in attacks while offline."
      ].join("\n");

      await player.send(dmText);
      await api.shieldAlert({
        officerDiscordId: interaction.user.id,
        officerName: interaction.user.username,
        playerDiscordId: player.id,
        playerName: player.username
      });
      await interaction.reply({ ephemeral: true, content: `${botName} sent a shield warning to ${player}.` });
    }
  },
  {
    data: new SlashCommandBuilder().setName("attack").setDescription("Post an emergency attack alert."),
    async execute(interaction) {
      const mention = await allianceMention(interaction);
      const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder().setCustomId("attack:Joining Fight").setLabel("Joining Fight").setStyle(ButtonStyle.Danger),
        new ButtonBuilder().setCustomId("attack:Defending").setLabel("Defending").setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId("attack:On The Way").setLabel("On The Way").setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId("attack:Unavailable").setLabel("Unavailable").setStyle(ButtonStyle.Secondary)
      );

      await interaction.reply({
        content: mention.content,
        allowedMentions: { roles: mention.roles },
        embeds: [
          {
            title: "🚨 ATTACK ALERT 🚨",
            description: "Enemy activity detected.\n\nEveryone please come online immediately.\n\nReact below:",
            color: 0xef4444
          }
        ],
        components: [buttons]
      });
      const message = await interaction.fetchReply();

      await api.attackAlert({
        officerDiscordId: interaction.user.id,
        officerName: interaction.user.username,
        channelId: message.channelId,
        messageId: message.id
      });
    }
  },
  {
    data: new SlashCommandBuilder().setName("roots").setDescription("Create Roots of War registration buttons."),
    async execute(interaction) {
      const { session } = await api.rootsSession({
        officerDiscordId: interaction.user.id,
        officerName: interaction.user.username
      });
      await interaction.reply({
        embeds: [
          {
            title: "⚔ ROOTS OF WAR REGISTRATION",
            description: "Select your availability.\n\n🕑 14:00 UTC\n⚔ Available\n❌ Absent\n❔ Not Sure\n\n🕗 20:00 UTC\n⚔ Available\n❌ Absent\n❔ Not Sure",
            color: 0xfacc15
          }
        ],
        components: [rootsButtons(session._id, "14UTC", "14 UTC"), rootsButtons(session._id, "20UTC", "20 UTC")]
      });
      const message = await interaction.fetchReply();
      await api.updateRootsSession(session._id, {
        guildId: interaction.guildId ?? undefined,
        channelId: message.channelId,
        messageId: message.id
      });
    }
  },
  {
    data: new SlashCommandBuilder().setName("summit").setDescription("Create Summit registration buttons."),
    async execute(interaction) {
      await interaction.reply({
        embeds: [
          {
            title: "🏔 SUMMIT REGISTRATION",
            description: "React below.",
            color: 0x22c55e
          }
        ],
        components: [summitButtons()]
      });
    }
  },
  {
    data: new SlashCommandBuilder()
      .setName("remind")
      .setDescription("Queue a simple event reminder.")
      .addStringOption((option) =>
        option
          .setName("event")
          .setDescription("Event to remind")
          .setRequired(true)
          .addChoices(
            { name: "Summit", value: "Summit" },
            { name: "Roots", value: "Roots" },
            { name: "Fortress", value: "Fortress" },
            { name: "Stronghold", value: "Stronghold" },
            { name: "Pass Defense", value: "Pass Defense" },
            { name: "Behemoth", value: "Behemoth" }
          )
      ),
    async execute(interaction) {
      const eventType = interaction.options.getString("event", true);
      await api.eventReminder({
        officerDiscordId: interaction.user.id,
        officerName: interaction.user.username,
        eventType
      });
      await interaction.reply({ ephemeral: true, content: `${botName} queued reminders for ${eventType}.` });
    }
  },
  {
    data: new SlashCommandBuilder().setName("checkin").setDescription("Create a daily check-in button."),
    async execute(interaction) {
      const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder().setCustomId("checkin:daily").setLabel("Daily Check-In").setStyle(ButtonStyle.Success)
      );
      await interaction.reply({
        embeds: [
          {
            title: "✅ DAILY CHECK-IN",
            description: "Members click below so officers can see daily and weekly activity.",
            color: 0x22c55e
          }
        ],
        components: [buttons]
      });
    }
  },
  {
    data: new SlashCommandBuilder().setName("absence").setDescription("Submit an absence notice."),
    async execute(interaction) {
      const modal = new ModalBuilder().setCustomId("absence-modal").setTitle("Absence Notice");
      modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(new TextInputBuilder().setCustomId("reason").setLabel("Reason").setStyle(TextInputStyle.Paragraph).setRequired(true)),
        new ActionRowBuilder<TextInputBuilder>().addComponents(new TextInputBuilder().setCustomId("startDate").setLabel("Start Date").setStyle(TextInputStyle.Short).setRequired(true)),
        new ActionRowBuilder<TextInputBuilder>().addComponents(new TextInputBuilder().setCustomId("endDate").setLabel("End Date").setStyle(TextInputStyle.Short).setRequired(true))
      );
      await interaction.showModal(modal);
    }
  },
  {
    data: new SlashCommandBuilder().setName("apply").setDescription("Apply to the alliance."),
    async execute(interaction) {
      const modal = new ModalBuilder().setCustomId("application-modal").setTitle("Alliance Application");
      modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(new TextInputBuilder().setCustomId("ign").setLabel("IGN").setStyle(TextInputStyle.Short).setRequired(true)),
        new ActionRowBuilder<TextInputBuilder>().addComponents(new TextInputBuilder().setCustomId("power").setLabel("Power").setStyle(TextInputStyle.Short).setRequired(true)),
        new ActionRowBuilder<TextInputBuilder>().addComponents(new TextInputBuilder().setCustomId("timezone").setLabel("Timezone").setStyle(TextInputStyle.Short).setRequired(true)),
        new ActionRowBuilder<TextInputBuilder>().addComponents(new TextInputBuilder().setCustomId("mainLegion").setLabel("Main Legion").setStyle(TextInputStyle.Short).setRequired(true))
      );
      await interaction.showModal(modal);
    }
  },
  {
    data: new SlashCommandBuilder().setName("dashboard").setDescription("Open the Kella dashboard."),
    async execute(interaction) {
      await interaction.reply({ ephemeral: true, content: `Dashboard: ${config.PUBLIC_APP_URL}` });
    }
  }
];

export const commandMap = new Map(commands.map((command) => [command.data.name, command]));

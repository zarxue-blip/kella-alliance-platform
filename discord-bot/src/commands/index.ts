import { sumCommand } from './sum.js';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  ModalBuilder,
  PermissionFlagsBits,
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

function summitButtons() {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId("summit:Attending").setLabel("Attending").setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId("summit:Absent").setLabel("Absent").setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId("summit:Not Sure").setLabel("Not Sure").setStyle(ButtonStyle.Secondary)
  );
}

type PollOption = { key: string; label: string; roleId?: string };

export function pollButtons(pollId: string, options: PollOption[]) {
  const styles = [ButtonStyle.Primary, ButtonStyle.Success, ButtonStyle.Secondary, ButtonStyle.Danger];
  const rows: Array<ActionRowBuilder<ButtonBuilder>> = [];
  options.forEach((option, index) => {
    const rowIndex = Math.floor(index / 5);
    if (!rows[rowIndex]) rows[rowIndex] = new ActionRowBuilder<ButtonBuilder>();
    rows[rowIndex].addComponents(
      new ButtonBuilder()
        .setCustomId(`poll:${pollId}:${option.key}`)
        .setLabel(option.label.slice(0, 80))
        .setStyle(styles[index % styles.length] ?? ButtonStyle.Primary)
    );
  });
  return rows;
}

export function pollEmbed(input: {
  kind: "poll" | "best_online_time";
  question: string;
  description?: string;
  options: PollOption[];
}) {
  const mappedRoles = input.options.filter((option) => option.roleId).length;
  return {
    title: input.kind === "best_online_time" ? "BEST ONLINE TIME" : "ALLIANCE POLL",
    description: [
      `**${input.question}**`,
      input.description,
      input.kind === "best_online_time" ? "Choose the UTC window when you are usually online." : "Choose one option. You can change your vote anytime.",
      mappedRoles ? "Your choice also updates the matching Discord role." : ""
    ].filter(Boolean).join("\n\n"),
    color: 0xfacc15,
    footer: { text: "Kella saves results to the Attendance dashboard" }
  };
}

const pollCommand = new SlashCommandBuilder()
  .setName("poll")
  .setDescription("Create a poll, optionally assigning a role for each answer.")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
  .addStringOption((option) => option.setName("question").setDescription("Question to ask").setRequired(true).setMaxLength(256))
  .addStringOption((option) => option.setName("option1").setDescription("First answer").setRequired(true).setMaxLength(80))
  .addStringOption((option) => option.setName("option2").setDescription("Second answer").setRequired(true).setMaxLength(80))
  .addStringOption((option) => option.setName("option3").setDescription("Optional third answer").setRequired(false).setMaxLength(80))
  .addStringOption((option) => option.setName("option4").setDescription("Optional fourth answer").setRequired(false).setMaxLength(80))
  .addStringOption((option) => option.setName("option5").setDescription("Optional fifth answer").setRequired(false).setMaxLength(80))
  .addRoleOption((option) => option.setName("role1").setDescription("Role assigned for option 1").setRequired(false))
  .addRoleOption((option) => option.setName("role2").setDescription("Role assigned for option 2").setRequired(false))
  .addRoleOption((option) => option.setName("role3").setDescription("Role assigned for option 3").setRequired(false))
  .addRoleOption((option) => option.setName("role4").setDescription("Role assigned for option 4").setRequired(false))
  .addRoleOption((option) => option.setName("role5").setDescription("Role assigned for option 5").setRequired(false));

const bestTimeCommand = new SlashCommandBuilder()
  .setName("besttime")
  .setDescription("Ask members for their usual best online UTC window.")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
  .addStringOption((option) => option.setName("question").setDescription("Optional custom question").setRequired(false).setMaxLength(256));

async function publishPoll(
  interaction: ChatInputCommandInteraction,
  kind: "poll" | "best_online_time",
  question: string,
  options: Array<{ label: string; roleId?: string }>
) {
  await interaction.deferReply();
  const { poll } = await api.createPoll({
    kind,
    question,
    options,
    channelId: interaction.channelId,
    createdByDiscordId: interaction.user.id
  });
  const message = await interaction.editReply({ embeds: [pollEmbed(poll)], components: pollButtons(poll.id, poll.options) });
  await api.updatePollMessage(poll.id, {
    guildId: interaction.guildId ?? undefined,
    channelId: message.channelId,
    messageId: message.id
  });
}

async function allianceMention(interaction: ChatInputCommandInteraction) {
  const roles = await interaction.guild?.roles.fetch().catch(() => null);
  const role = roles?.find((candidate) => candidate.name.toLowerCase() === "alliance");
  return role ? { content: `<@&${role.id}>`, roles: [role.id] } : { content: "@Alliance", roles: [] };
}

function parseUtcTimer(input: string, now = new Date()) {
  const cleaned = input.trim().toLowerCase().replace(/\s+/g, " ");
  const match = cleaned.match(/^(?:(\d{4})-(\d{1,2})-(\d{1,2})\s+)?(\d{1,2})(?::?(\d{2}))?\s*(?:utc)?$/i);
  if (!match) return null;

  const year = match[1] ? Number(match[1]) : undefined;
  const month = match[2] ? Number(match[2]) : undefined;
  const day = match[3] ? Number(match[3]) : undefined;
  const hour = Number(match[4]);
  const minute = match[5] ? Number(match[5]) : 0;
  if (hour > 23 || minute > 59) return null;

  let target: Date;
  if (year && month && day) {
    target = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  } else {
    target = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), hour, minute, 0));
    if (target.getTime() <= now.getTime()) target.setUTCDate(target.getUTCDate() + 1);
  }

  return {
    hour,
    minute,
    unix: Math.floor(target.getTime() / 1000),
    label: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} UTC`
  };
}

export const commands: BotCommand[] = [
  sumCommand,
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
    data: pollCommand,
    async execute(interaction) {
      const options: Array<{ label: string; roleId?: string }> = [];
      for (let index = 0; index < 5; index += 1) {
        const number = index + 1;
        const label = interaction.options.getString(`option${number}`)?.trim();
        const role = interaction.options.getRole(`role${number}`);
        if (label) options.push({ label, ...(role?.id ? { roleId: role.id } : {}) });
      }
      await publishPoll(interaction, "poll", interaction.options.getString("question", true).trim(), options);
    }
  },
  {
    data: bestTimeCommand,
    async execute(interaction) {
      const options = ["00-04 UTC", "04-08 UTC", "08-12 UTC", "12-16 UTC", "16-20 UTC", "20-24 UTC"].map((label) => ({ label }));
      await publishPoll(
        interaction,
        "best_online_time",
        interaction.options.getString("question")?.trim() || "When are you usually online?",
        options
      );
    }
  },
  {
    data: new SlashCommandBuilder()
      .setName("time")
      .setDescription("Post a live Discord countdown for a 24-hour UTC server time.")
      .addStringOption((option) =>
        option
          .setName("utc")
          .setDescription("UTC time, like 13 UTC, 13:30, or 2026-07-16 20:00 UTC")
          .setRequired(true)
          .setMaxLength(32)
      )
      .addStringOption((option) =>
        option
          .setName("note")
          .setDescription("Optional event label, like Summit or alliance event")
          .setRequired(false)
          .setMaxLength(120)
      ),
    async execute(interaction) {
      const timer = parseUtcTimer(interaction.options.getString("utc", true));
      if (!timer) {
        await interaction.reply({
          ephemeral: true,
          content: "Use 24-hour UTC time, like `/time utc:13 UTC`, `/time utc:13:30`, or `/time utc:2026-07-16 20:00 UTC`."
        });
        return;
      }

      const note = interaction.options.getString("note")?.trim();
      const title = note ? `Timer: ${note}` : "Server Time Countdown";
      await interaction.reply({
        embeds: [
          {
            title,
            description: [`**${timer.label}**`, `Starts <t:${timer.unix}:R>`, `Exact time: <t:${timer.unix}:F>`].join("\n"),
            color: 0xfacc15,
            footer: { text: "Call of Dragons server time uses 24-hour UTC" }
          }
        ]
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
    data: new SlashCommandBuilder()
      .setName("complain")
      .setDescription("Send a private complaint or suggestion to admins.")
      .addStringOption((option) =>
        option
          .setName("message")
          .setDescription("What do you want R4s to review?")
          .setRequired(false)
          .setMaxLength(1800)
      )
      .addStringOption((option) =>
        option
          .setName("type")
          .setDescription("What are you sending?")
          .setRequired(false)
          .addChoices({ name: "Complaint", value: "Complaint" }, { name: "Suggestion", value: "Suggestion" })
      )
      .addBooleanOption((option) => option.setName("anonymous").setDescription("Hide your identity from reviewers").setRequired(false)),
    async execute(interaction) {
      const kind = interaction.options.getString("type") || "Complaint";
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
  },
  {
    data: new SlashCommandBuilder()
      .setName("wiki-admin")
      .setDescription("Post the Kella Wiki reader button for members.")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction) {
      const wikiUrl = `${config.PUBLIC_APP_URL.replace(/\/$/, "")}/wiki`;
      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder().setLabel("Read Kella Wiki").setStyle(ButtonStyle.Link).setURL(wikiUrl)
      );

      await interaction.reply({
        embeds: [
          {
            title: "Kella Alliance Wiki",
            description: "Read alliance rules, event guides, and officer notes in one clean place.",
            color: 0xfacc15,
            footer: { text: "Kella keeps the notes. You keep the excuses short." }
          }
        ],
        components: [row]
      });
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

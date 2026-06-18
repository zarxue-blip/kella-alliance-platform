import { ActivityType, Client, Events, GatewayIntentBits, REST, Routes } from "discord.js";
import { botName } from "@cod-amp/shared";
import { config } from "./config.js";
import { commands } from "./commands/index.js";
import { handleInteraction } from "./handlers/interactionCreate.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

client.once(Events.ClientReady, (readyClient) => {
  readyClient.user.setPresence({
    activities: [{ name: "Roots of War registrations", type: ActivityType.Watching }],
    status: "online"
  });
  console.log(`${botName} ready as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, handleInteraction);

const rest = new REST({ version: "10" }).setToken(config.DISCORD_BOT_TOKEN);
const commandBody = commands.map((command) => command.data.toJSON());
if (config.DISCORD_GUILD_ID) {
  await rest.put(Routes.applicationGuildCommands(config.DISCORD_APPLICATION_ID, config.DISCORD_GUILD_ID), { body: commandBody });
} else {
  await rest.put(Routes.applicationCommands(config.DISCORD_APPLICATION_ID), { body: commandBody });
}

await client.login(config.DISCORD_BOT_TOKEN);

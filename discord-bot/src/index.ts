import { ActivityType, Client, Events, GatewayIntentBits, REST, Routes } from "discord.js";
import { botName } from "@cod-amp/shared";
import { config } from "./config.js";
import { commands } from "./commands/index.js";
import { handleInteraction } from "./handlers/interactionCreate.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
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
  console.log(`${botName} deploying ${commandBody.length} guild commands to ${config.DISCORD_GUILD_ID}.`);
  await rest.put(Routes.applicationGuildCommands(config.DISCORD_APPLICATION_ID, config.DISCORD_GUILD_ID), { body: commandBody });
  console.log(`${botName} guild commands deployed.`);
} else {
  console.log(`${botName} deploying ${commandBody.length} global commands.`);
  await rest.put(Routes.applicationCommands(config.DISCORD_APPLICATION_ID), { body: commandBody });
  console.log(`${botName} global commands deployed.`);
}

await client.login(config.DISCORD_BOT_TOKEN);

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

function describeError(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === "object" && error && "message" in error) return String((error as { message: unknown }).message);
  return String(error);
}

await client.login(config.DISCORD_BOT_TOKEN);

const rest = new REST({ version: "10" }).setToken(config.DISCORD_BOT_TOKEN);
const commandScope = config.DISCORD_GUILD_ID ? `guild ${config.DISCORD_GUILD_ID}` : "global";

console.log(`${botName} deploying ${commands.length} commands to ${commandScope}.`);
for (const command of commands) {
  try {
    const body = command.data.toJSON();
    if (config.DISCORD_GUILD_ID) {
      await rest.post(Routes.applicationGuildCommands(config.DISCORD_APPLICATION_ID, config.DISCORD_GUILD_ID), { body });
    } else {
      await rest.post(Routes.applicationCommands(config.DISCORD_APPLICATION_ID), { body });
    }
    console.log(`${botName} command deployed: /${command.data.name}`);
  } catch (error) {
    console.error(`${botName} command failed: /${command.data.name} - ${describeError(error)}`);
  }
}
console.log(`${botName} command deploy step finished.`);

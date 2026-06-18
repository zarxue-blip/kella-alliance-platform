import { REST, Routes } from "discord.js";
import { commands } from "./commands/index.js";
import { config } from "./config.js";

const rest = new REST({ version: "10" }).setToken(config.DISCORD_BOT_TOKEN);
const body = commands.map((command) => command.data.toJSON());

if (config.DISCORD_GUILD_ID) {
  await rest.put(Routes.applicationGuildCommands(config.DISCORD_APPLICATION_ID, config.DISCORD_GUILD_ID), { body });
  console.log(`Deployed ${body.length} guild commands.`);
} else {
  await rest.put(Routes.applicationCommands(config.DISCORD_APPLICATION_ID), { body });
  console.log(`Deployed ${body.length} global commands.`);
}

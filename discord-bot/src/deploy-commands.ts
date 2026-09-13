import { syncCommands } from './services/commandRegistration.js';
import { REST } from "discord.js";
import { commands } from "./commands/index.js";
import { config } from "./config.js";

const rest = new REST({ version: "10" }).setToken(config.DISCORD_BOT_TOKEN);
const body = commands.map((command) => command.data.toJSON());

await syncCommands(rest, config.DISCORD_APPLICATION_ID, config.DISCORD_GUILD_ID, body);

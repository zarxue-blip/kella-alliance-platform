import "dotenv/config";
import { z } from "zod";

const configSchema = z.object({
  DISCORD_BOT_TOKEN: z.string().min(1),
  DISCORD_APPLICATION_ID: z.string().min(1),
  DISCORD_GUILD_ID: z.string().optional(),
  BOT_API_URL: z.string().url().default("http://localhost:4000/api"),
  BOT_API_TOKEN: z.string().min(16),
  BOT_ALLIANCE_ID: z.string().optional(),
  PUBLIC_APP_URL: z.string().url().default("http://localhost:3000")
});

export const config = configSchema.parse(process.env);

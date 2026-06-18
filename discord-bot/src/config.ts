import "dotenv/config";
import { z } from "zod";

const localApiUrl = `http://127.0.0.1:${process.env.PORT ?? 4000}/api`;

function normalizeApiUrl(value: string) {
  const url = value.replace(/\/+$/, "");
  return url.endsWith("/api") ? url : `${url}/api`;
}

const configSchema = z.object({
  DISCORD_BOT_TOKEN: z.string().min(1),
  DISCORD_APPLICATION_ID: z.string().min(1),
  DISCORD_GUILD_ID: z.string().optional(),
  BOT_API_URL: z.string().url().default(localApiUrl).transform(normalizeApiUrl),
  BOT_API_TOKEN: z.string().min(16),
  BOT_ALLIANCE_ID: z.string().optional(),
  PUBLIC_APP_URL: z.string().url().default("http://localhost:3000")
});

export const config = configSchema.parse(process.env);

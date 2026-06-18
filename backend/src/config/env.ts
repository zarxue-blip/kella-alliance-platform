import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  MONGODB_URI: z.string().min(1),
  JWT_SECRET: z.string().min(24),
  SESSION_COOKIE_NAME: z.string().default("cod_amp_session"),
  DISCORD_CLIENT_ID: z.string().min(1),
  DISCORD_CLIENT_SECRET: z.string().min(1),
  DISCORD_REDIRECT_URI: z.string().url(),
  DISCORD_BOT_TOKEN: z.string().optional(),
  DISCORD_GUILD_ID: z.string().optional(),
  DISCORD_ALERT_CHANNEL_ID: z.string().optional(),
  FRONTEND_ORIGIN: z.string().url().default("http://localhost:3000"),
  PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  BOT_API_TOKEN: z.string().min(16),
  PUSH_WEBHOOK_URL: z.string().url().optional()
});

export const env = envSchema.parse(process.env);
export const isProduction = env.NODE_ENV === "production";

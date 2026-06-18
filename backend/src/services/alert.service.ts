import { realtimeEvents } from "@cod-amp/shared";
import { env } from "../config/env.js";
import { CallToArmsModel } from "../models/callToArms.model.js";
import { emitAlliance, emitNotification, moduleNotification } from "./realtime.service.js";

export async function publishCallToArms(alertId: string) {
  const alert = (await CallToArmsModel.findById(alertId).lean()) as any;
  if (!alert) return;

  emitAlliance(alert.allianceId.toString(), realtimeEvents.callToArmsCreated, alert);
  emitNotification(
    alert.allianceId.toString(),
    moduleNotification("war", alert.title, alert.message, alert.priority)
  );

  if (env.DISCORD_BOT_TOKEN && env.DISCORD_ALERT_CHANNEL_ID) {
    await fetch(`https://discord.com/api/v10/channels/${env.DISCORD_ALERT_CHANNEL_ID}/messages`, {
      method: "POST",
      headers: {
        authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        embeds: [
          {
            title: `${alert.priority} Call to Arms`,
            description: alert.message,
            color: alert.priority === "CRITICAL" ? 0xff3344 : 0xf59e0b,
            fields: [
              { name: "Target", value: alert.target || "Alliance-wide", inline: true },
              { name: "Status", value: alert.status, inline: true }
            ]
          }
        ]
      })
    });
  }

  if (env.PUSH_WEBHOOK_URL && (alert.channels ?? []).includes("push")) {
    await fetch(env.PUSH_WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: alert.title,
        message: alert.message,
        priority: alert.priority,
        allianceId: alert.allianceId.toString()
      })
    });
  }
}

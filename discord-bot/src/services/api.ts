import { config } from "../config.js";

type Method = "GET" | "POST" | "PATCH";

function allianceContext(): Record<string, string> {
  return config.BOT_ALLIANCE_ID ? { allianceId: config.BOT_ALLIANCE_ID } : {};
}

async function request<T>(method: Method, path: string, body?: unknown): Promise<T> {
  const response = await fetch(`${config.BOT_API_URL}${path}`, {
    method,
    headers: {
      "content-type": "application/json",
      "x-service-token": config.BOT_API_TOKEN
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(`${payload.message || "API request failed"} (${response.status} ${path})`);
  }

  return (await response.json()) as T;
}

export const api = {
  shieldAlert(input: { officerDiscordId: string; officerName?: string; playerDiscordId: string; playerName?: string }) {
    return request("POST", "/bot/shield-alert", { ...allianceContext(), ...input });
  },
  attackAlert(input: { officerDiscordId: string; officerName?: string; channelId?: string; messageId?: string }) {
    return request("POST", "/bot/attack", { ...allianceContext(), ...input });
  },
  attackResponse(input: { discordId: string; displayName?: string; status: string }) {
    return request("POST", "/bot/attack/response", { ...allianceContext(), ...input });
  },
  rootsResponse(input: { discordId: string; displayName?: string; reportId?: string; slot: string; status: string }) {
    return request("POST", "/bot/roots/response", { ...allianceContext(), ...input });
  },
  rootsSession(input: { officerDiscordId: string; officerName?: string }) {
    return request<{ session: { _id: string } }>("POST", "/bot/roots/session", { ...allianceContext(), ...input });
  },
  updateRootsSession(sessionId: string, input: { guildId?: string; channelId?: string; messageId?: string }) {
    return request("PATCH", `/bot/roots/session/${sessionId}`, input);
  },
  summitResponse(input: { discordId: string; displayName?: string; status: string }) {
    return request("POST", "/bot/summit/response", { ...allianceContext(), ...input });
  },
  dailyCheckIn(input: { discordId: string; displayName?: string }) {
    return request("POST", "/bot/checkin", { ...allianceContext(), ...input });
  },
  absence(input: { discordId: string; displayName?: string; reason: string; startDate: string; endDate: string }) {
    return request("POST", "/bot/absence", { ...allianceContext(), ...input });
  },
  application(input: { discordId: string; displayName?: string; ign: string; power: number; timezone: string; mainLegion: string }) {
    return request("POST", "/bot/application", { ...allianceContext(), ...input });
  },
  complaint(input: { discordId: string; displayName?: string; kind: "Complaint" | "Suggestion"; message: string }) {
    return request("POST", "/bot/complaint", { ...allianceContext(), ...input });
  },
  eventReminder(input: { officerDiscordId: string; officerName?: string; eventType: string }) {
    return request("POST", "/bot/reminder", { ...allianceContext(), ...input });
  }
};

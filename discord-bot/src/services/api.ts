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
  register(input: { discordId: string; ign: string; uid: string; power: number; alliance: string }) {
    return request("POST", "/bot/register", { ...input, ...allianceContext() });
  },
  profile(discordId: string) {
    const params = new URLSearchParams({ discordId, ...allianceContext() });
    return request<{ member: { ign: string; uid: string; power: number; alliance: string; attendanceScore: number; warScore: number } }>(
      "GET",
      `/bot/profile?${params.toString()}`
    );
  },
  attendance(eventId: string, discordId: string) {
    return request("POST", "/bot/attendance", { ...allianceContext(), eventId, discordId });
  },
  rootsOfWarRegister(discordId: string, slot: string) {
    return request<{ member: { ign: string }; registration: { slot: string; status: string } }>("POST", "/bot/roots-of-war/register", {
      ...allianceContext(),
      discordId,
      slot
    });
  },
  rootsOfWarCheckIn(discordId: string, slot: string) {
    return request<{ checkedIn: boolean; member: { ign: string }; registration: { slot: string; status: string } }>("POST", "/bot/roots-of-war/check-in", {
      ...allianceContext(),
      discordId,
      slot
    });
  },
  shield(discordId: string, expiresAt: string) {
    return request("POST", "/bot/shield", { ...allianceContext(), discordId, expiresAt });
  },
  summary() {
    const params = new URLSearchParams(allianceContext());
    return request<{ operations: Array<{ operationName: string; target: string; date: string; priority: string }>; tasks: Array<{ title: string; status: string; dueDate?: string }> }>(
      "GET",
      `/bot/summary?${params.toString()}`
    );
  },
  alert(input: { title: string; message: string; priority: string; target?: string; createdByDiscordId: string }) {
    return request<{ alert: { _id: string; title: string; priority: string } }>("POST", "/bot/alert", {
      ...input,
      ...allianceContext()
    });
  },
  callToArmsResponse(alertId: string, discordId: string, status: string) {
    return request("POST", `/bot/alert/${alertId}/respond`, {
      ...allianceContext(),
      discordId,
      status
    });
  }
};

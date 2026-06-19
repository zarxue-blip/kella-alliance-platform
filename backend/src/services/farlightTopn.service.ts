import { HttpError } from "../utils/httpError.js";

const farlightApiBase = "https://plat-cod-gametools-global-api.farlightgames.com";

export type FarlightTopnMember = {
  rank?: number | string;
  role_id?: number | string;
  role_name?: string;
  power?: number | string;
  power_highest?: number | string;
  dead_num?: number | string;
  pvpmoney_num?: number | string;
  heal_num?: number | string;
  donate_num?: number | string;
};

type FarlightPayload<T> = {
  code?: number;
  message?: string;
  data?: T;
};

function normalizeDate(value?: string) {
  return value?.trim().replace(/\//g, "-");
}

async function farlightJson<T>(path: string, token?: string) {
  const response = await fetch(`${farlightApiBase}${path}`, {
    headers: {
      accept: "application/json",
      "user-agent": "KellaAllianceDashboard/1.0",
      ...(token ? { authorization: `Bearer ${token}` } : {})
    }
  });
  const text = await response.text();
  let payload: FarlightPayload<T> | undefined;
  try {
    payload = JSON.parse(text) as FarlightPayload<T>;
  } catch {
    payload = undefined;
  }

  if (response.status === 401 || payload?.code === 401) {
    throw new HttpError(401, "Farlight Game Tools login expired. Paste a fresh Farlight token, then sync again.");
  }
  if (!response.ok) {
    throw new HttpError(response.status, `Farlight Game Tools request failed: ${payload?.message || response.statusText}`);
  }
  if (payload?.code !== undefined && payload.code !== 0) {
    throw new HttpError(502, `Farlight Game Tools error: ${payload.message || "Unknown error"}`);
  }

  return payload?.data as T;
}

export async function getFarlightDataDate() {
  const data = await farlightJson<{ dt?: string }>("/api/config");
  return normalizeDate(data?.dt) || new Date().toISOString().slice(0, 10);
}

export async function fetchFarlightTopnMembers(input: {
  serverId: string;
  startDate?: string;
  endDate?: string;
  token?: string;
  keyword?: string;
}) {
  if (!input.serverId?.trim()) throw new HttpError(400, "Server ID is required");
  if (!input.token?.trim()) throw new HttpError(400, "Farlight token is required because Game Tools blocks member data unless you are logged in.");

  const date = normalizeDate(input.startDate) || (await getFarlightDataDate());
  const endDate = normalizeDate(input.endDate) || date;
  const params = new URLSearchParams({
    server_id: input.serverId.trim(),
    start_date: date,
    end_date: endDate
  });
  if (input.keyword?.trim()) params.set("keyword", input.keyword.trim());

  const data = await farlightJson<FarlightTopnMember[]>(`/api/topn?${params.toString()}`, input.token.trim());
  return Array.isArray(data) ? data : [];
}

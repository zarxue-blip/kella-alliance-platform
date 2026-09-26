import { createHmac, timingSafeEqual } from "node:crypto";
import { env } from "../config/env.js";

function signature(memberId: string, version: number) {
  return createHmac("sha256", env.JWT_SECRET)
    .update(`private-member-access:${memberId}:${version}`)
    .digest("hex");
}

export function privateMemberAccessPath(memberId: string, version: number) {
  return `/access/${encodeURIComponent(memberId)}/${signature(memberId, version)}`;
}

export function verifyPrivateMemberAccessSignature(memberId: string, version: number, value: string) {
  if (!/^[a-f0-9]{64}$/.test(value)) return false;
  const expected = signature(memberId, version);
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}

import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const saltBytes = 16;
const keyBytes = 64;
const dummySalt = "1b91d0385c6961ec5ba493688505d9b4";

export async function hashLocalPassword(password: string) {
  const salt = randomBytes(saltBytes).toString("hex");
  const key = await scrypt(password, salt, keyBytes) as Buffer;
  return `scrypt:${salt}:${key.toString("hex")}`;
}

export async function verifyLocalPassword(password: string, stored: unknown) {
  if (typeof stored !== "string") {
    await scrypt(password, dummySalt, keyBytes);
    return false;
  }
  const match = /^scrypt:([a-f0-9]{32}):([a-f0-9]{128})$/.exec(stored);
  if (!match) {
    await scrypt(password, dummySalt, keyBytes);
    return false;
  }
  const actual = await scrypt(password, match[1], keyBytes) as Buffer;
  return timingSafeEqual(actual, Buffer.from(match[2], "hex"));
}

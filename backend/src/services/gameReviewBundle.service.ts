import { createDecipheriv, createHmac, timingSafeEqual } from 'node:crypto';
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { gunzipSync } from 'node:zlib';

export const reviewFiles = ['index.html', 'style.css', 'app.js', 'freya.mp4', 'base.mp4', 'base.jpg', 'freya.jpg'];
const backendDir = join(dirname(fileURLToPath(import.meta.url)), '../..');
let ready: Promise<string> | undefined;
const ownerDigest = Buffer.from('15caa9930aedc6bb2da6a1f1bb3fc72b7ea3a7409312f89ea7f2dbe01386685b', 'hex');

async function reviewKey() {
  const path = process.env.NODE_ENV === 'production' ? '/etc/secrets/kella-game-review-key' : join(backendDir, 'private/kella-game-review-key');
  const secret = (await readFile(path, 'utf8')).trim();
  if (!/^[a-f0-9]{64}$/i.test(secret)) throw new Error('Private review is not configured');
  return Buffer.from(secret, 'hex');
}

export async function verifyGameReviewOwner(discordId: string) {
  const testOwner = process.env.NODE_ENV !== 'production' ? process.env.GAME_REVIEW_TEST_OWNER_DISCORD_ID : undefined;
  if (testOwner) return discordId === testOwner;
  const digest = createHmac('sha256', await reviewKey()).update(discordId).digest();
  return timingSafeEqual(digest, ownerDigest);
}

export function decodeReviewBundle(data: Buffer, key: Buffer): Record<string, string> {
  if (key.length !== 32 || data.subarray(0, 4).toString() !== 'KGR1') throw new Error('Invalid private bundle');
  const decipher = createDecipheriv('aes-256-gcm', key, data.subarray(4, 16));
  decipher.setAuthTag(data.subarray(16, 32));
  const compressed = Buffer.concat([decipher.update(data.subarray(32)), decipher.final()]);
  const payload = JSON.parse(gunzipSync(compressed, { maxOutputLength: 100 * 1024 * 1024 }).toString('utf8'));
  if (Object.keys(payload).length !== reviewFiles.length || reviewFiles.some(name => typeof payload[name] !== 'string')) throw new Error('Invalid private bundle files');
  return payload;
}

export function gameReviewDirectory(): Promise<string> {
  // Local source files are never a production fallback.
  if (process.env.NODE_ENV !== 'production') return Promise.resolve(join(backendDir, 'private/game-review'));
  if (!ready) ready = (async () => {
    const files = decodeReviewBundle(await readFile(join(backendDir, 'game-review.enc')), await reviewKey());
    const directory = await mkdtemp(join(tmpdir(), 'kella-review-'));
    try {
      for (const name of reviewFiles) await writeFile(join(directory, name), Buffer.from(files[name], 'base64'), { mode: 0o600 });
      return directory;
    } catch (error) { await rm(directory, { recursive: true, force: true }); throw error; }
  })().catch(error => { ready = undefined; throw error; });
  return ready;
}

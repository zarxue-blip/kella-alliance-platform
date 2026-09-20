import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
Object.assign(process.env, { NODE_ENV: 'test', MONGODB_URI: 'mongodb://127.0.0.1/test', JWT_SECRET: 'game-review-test-secret-only-1234', DISCORD_CLIENT_ID: 'test', DISCORD_CLIENT_SECRET: 'test', DISCORD_REDIRECT_URI: 'http://127.0.0.1/callback', BOT_API_TOKEN: 'game-review-service-test', GAME_REVIEW_TEST_OWNER_DISCORD_ID: '222222222222222222' });
const { UserModel } = await import('../src/models/user.model.js');
const { createApp } = await import('../src/app.js');
const { signSessionToken } = await import('../src/middleware/auth.js');
const { env } = await import('../src/config/env.js');
const { decodeReviewBundle, gameReviewDirectory, reviewFiles } = await import('../src/services/gameReviewBundle.service.js');
const bundle = await readFile(new URL('../game-review.enc', import.meta.url));
const key = Buffer.from((await readFile(new URL('../private/kella-game-review-key', import.meta.url),'utf8')).trim(),'hex');
const decoded = decodeReviewBundle(bundle,key);
for (const name of reviewFiles) assert.deepEqual(Buffer.from(decoded[name],'base64'),await readFile(new URL('../private/game-review/'+name,import.meta.url)));
assert.throws(()=>decodeReviewBundle(bundle,randomBytes(32)));
const tampered=Buffer.from(bundle);tampered[tampered.length-1]^=1;assert.throws(()=>decodeReviewBundle(tampered,key));
process.env.NODE_ENV='production';await assert.rejects(gameReviewDirectory());process.env.NODE_ENV='test';
const records: Record<string, any> = {
  owner: { _id: 'owner', discordId: '222222222222222222', role: 'Member', allianceId: 'alliance' },
  admin: { _id: 'admin', discordId: '111111111111111111', role: 'Owner', discordRoleIds: ['1522274495728062475'], allianceId: 'alliance' },
  disabled: { _id: 'disabled', discordId: '222222222222222222', role: 'Member', disabled: true, allianceId: 'alliance' }
};
(UserModel as any).findById = (id: string) => ({ lean: async () => records[id] });
const server = createApp().listen(0, '127.0.0.1');
await new Promise<void>(r => server.once('listening', r));
const base = 'http://127.0.0.1:' + (server.address() as any).port;
const session = (id: string) => ({ cookie: env.SESSION_COOKIE_NAME + '=' + signSessionToken({ id, ...records[id] }) });
try {
  for (const path of ['', '/', '/style.css', '/app.js', '/research.json', '/freya.mp4', '/base.mp4', '/base.jpg', '/freya.jpg']) {
    const url = base + '/game-review' + path;
    const anonymous = await fetch(url); assert.equal(anonymous.status, 401, path); assert.equal(anonymous.headers.get('cache-control'), 'private, no-store');
    assert.equal((await fetch(url, { headers: session('admin') })).status, 404, path);
    assert.equal((await fetch(url, { headers: session('disabled') })).status, 401, path);
    assert.equal((await fetch(url, { headers: { 'x-service-token': env.BOT_API_TOKEN } })).status, 401, path);
    assert.equal((await fetch(url, { headers: { cookie: env.SESSION_COOKIE_NAME + '=invalid' } })).status, 401, path);
    const allowed = await fetch(url, { headers: session('owner') }); assert.equal(allowed.status, 200, path); assert.equal(allowed.headers.get('cache-control'), 'private, no-store'); assert.match(allowed.headers.get('x-robots-tag') || '', /noindex/); await allowed.arrayBuffer();
  }
  const range = await fetch(base + '/game-review/freya.mp4', { headers: { ...session('owner'), range: 'bytes=0-99' } }); assert.equal(range.status, 206); assert.equal((await range.arrayBuffer()).byteLength, 100); assert.equal(range.headers.get('cache-control'), 'private, no-store');
  const head = await fetch(base + '/game-review/freya.mp4', { method: 'HEAD' }); assert.equal(head.status, 401);
  const tree = await (await fetch(base + '/game-review/research.json', { headers: session('owner') })).json(); assert.ok(tree.economy.length && tree.military.length);
  assert.equal((await fetch(base + '/assets/game-review/freya.mp4')).status, 404);
  assert.equal((await fetch(base + '/game-review/.env', { headers: session('owner') })).status, 404);
  console.log('Game review: owner-only HTML, media, range, HEAD and research access passed; admins, disabled users, shared tokens and invalid sessions denied.');
} finally { server.close(); }

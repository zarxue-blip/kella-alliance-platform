import assert from 'node:assert/strict';
import { personalAttendanceByEvent } from '../src/services/personalAttendance.service.js';

const responses = [
  {reportId:'first',status:'Attending',sentAt:'2026-09-01'},
  {reportId:'first',status:'Absent',sentAt:'2026-09-02'},
  {reportId:'second',status:'Not Sure',sentAt:'2026-09-03'},
  {reportId:'ignored',status:'unexpected',sentAt:'2026-09-03'}
];
const result=personalAttendanceByEvent(responses);
assert.equal(result.first,'Absent');
assert.equal(result.second,'Not Sure');
assert.equal(result.ignored,undefined);
assert.equal(responses[0].status,'Attending');
assert.equal(Object.keys(personalAttendanceByEvent([])).length,0);

// Exercise the real application middleware. No database is connected, no
// sessions are forged, and no Discord service is started by createApp.
Object.assign(process.env,{
  NODE_ENV:'test',MONGODB_URI:'mongodb://127.0.0.1:27017/kella_test_unused',
  JWT_SECRET:'local-test-only-session-secret-123456',
  DISCORD_CLIENT_ID:'test',DISCORD_CLIENT_SECRET:'test',
  DISCORD_REDIRECT_URI:'http://127.0.0.1/callback',
  BOT_API_TOKEN:'local-test-only-service-token',DASHBOARD_ADMIN_TOKEN:'local-test-only-admin-token'
});
async function verify() {
  const {createApp}=await import('../src/app.js');
  const server=createApp().listen(0,'127.0.0.1');
  await new Promise<void>(resolve=>server.once('listening',resolve));
  const address=server.address();
  assert.ok(address && typeof address!=='string');
  try {
    const origin=`http://127.0.0.1:${address.port}`;
    for(const headers of [{},{authorization:'Bearer invalid'},{'x-dashboard-admin-token':'local-test-only-admin-token'}]) {
      const response=await fetch(origin+'/api/dashboard/my-attendance?discordId=another-player',{headers});
      assert.equal(response.status,401,'personal attendance requires a real user session');
    }
    const response=await fetch(origin+'/calendar');
    assert.equal(response.status,200);
    const html=await response.text();
    const asset=html.match(/src="(\/assets\/kella-[a-f0-9]+\.js)"/)?.[1];
    assert.ok(asset);
    const script=await fetch(origin+asset);
    assert.equal(script.status,200);
    assert.match(script.headers.get('cache-control') || '',/immutable/);
  } finally { await new Promise<void>((resolve,reject)=>server.close(error=>error?reject(error):resolve())); }
  console.log('Personal attendance status and real session-gate tests passed.');
}
verify().catch(error=>{console.error(error);process.exitCode=1;});

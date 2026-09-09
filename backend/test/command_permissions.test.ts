import assert from 'node:assert/strict';
Object.assign(process.env,{NODE_ENV:'test',MONGODB_URI:'mongodb://127.0.0.1/test',JWT_SECRET:'local-test-only-session-secret-123456',DISCORD_CLIENT_ID:'test',DISCORD_CLIENT_SECRET:'test',DISCORD_REDIRECT_URI:'http://127.0.0.1/callback',BOT_API_TOKEN:'local-test-only-service-token',DASHBOARD_ADMIN_TOKEN:'local-test-only-admin-token'});
const {UserModel}=await import('../src/models/user.model.js');
const {signSessionToken}=await import('../src/middleware/auth.js');
const {env}=await import('../src/config/env.js');
const {createApp}=await import('../src/app.js');
const users:any={member:{role:'Member'},editor:{role:'Member',discordRoleIds:['1529826271813570650']},officer:{role:'R4 Officer'},owner:{role:'Owner'},disabled:{role:'Owner',disabled:true}};
for(const [id,user] of Object.entries(users) as any) Object.assign(user,{_id:id,discordId:'123456789012345678',allianceId:'123456789012345678901234'});
(UserModel as any).findById=(id:string)=>({lean:async()=>users[id]});
const server=createApp().listen(0,'127.0.0.1');await new Promise<void>(resolve=>server.once('listening',resolve));
const origin='http://127.0.0.1:'+(server.address() as any).port;
try {
for(const id of ['member','editor','officer','owner','disabled']) {
 const user=users[id];const cookie=env.SESSION_COOKIE_NAME+'='+signSessionToken({id,discordId:user.discordId,role:user.role,allianceId:user.allianceId});
 const headers={cookie};const admin=['officer','owner'].includes(id);
 assert.equal((await fetch(origin+'/api/dashboard/access',{headers})).status,admin?200:id==='disabled'?401:403,id+' admin API');
 assert.equal((await fetch(origin+'/officer',{headers})).status,admin?200:403,id+' admin page');
 assert.equal((await fetch(origin+'/wiki?edit=1',{headers})).status,admin||id==='editor'?200:403,id+' wiki page');
 if(!admin) for(const endpoint of ['/api/events','/api/attendance','/api/dashboard/wiki']) {
  if(endpoint.endsWith('/wiki')&&id==='editor') continue;
  assert.equal((await fetch(origin+endpoint,{method:'POST',headers:{...headers,'Content-Type':'application/json'},body:'{}'})).status,id==='disabled'?401:403,id+' mutation '+endpoint);
 }
}
const {MemberModel}=await import('../src/models/member.model.js');
const {AttendanceEventModel}=await import('../src/models/attendanceEvent.model.js');
const foreignMember={_id:'aaaaaaaaaaaaaaaaaaaaaaaa',discordId:'different-player'};
(MemberModel as any).findOne=()=>Object.assign(Promise.resolve(foreignMember),{lean:async()=>foreignMember});
(AttendanceEventModel as any).findOne=async()=>({qrToken:'test',checkIns:[]});
const memberHeaders={cookie:env.SESSION_COOKIE_NAME+'='+signSessionToken({id:'member',...users.member}), 'Content-Type':'application/json'};
assert.equal((await fetch(origin+'/api/events/bbbbbbbbbbbbbbbbbbbbbbbb/rsvp',{method:'POST',headers:memberHeaders,body:JSON.stringify({memberId:foreignMember._id,status:'Going'})})).status,403);
assert.equal((await fetch(origin+'/api/attendance/bbbbbbbbbbbbbbbbbbbbbbbb/check-in',{method:'POST',headers:memberHeaders,body:JSON.stringify({memberId:foreignMember._id})})).status,403);
assert.equal((await fetch(origin+'/api/dashboard/access',{headers:{'x-dashboard-admin-token':'forged'}})).status,401);
for(const path of ['/bot/roots/session','/bot/roots/response','/bot/roots-of-war/register']) assert.equal((await fetch(origin+path,{method:'POST',headers:{'x-service-token':'local-test-only-service-token'}})).status,404);
console.log('Member, wiki editor, officer, owner, disabled account, forged key and retired Discord endpoint checks passed.');
} finally {server.close();}

import assert from 'node:assert/strict';
import { memberForViewer } from '../src/services/memberPrivacy.service.js';
const player={id:'player',discordUsername:'private.handle',discordDisplayName:'Public nickname',discordName:'Public nickname',ign:'Game name',power:12345,statHistory:[{metrics:{merits:600,kills:100}}],uid:'42',rank:'R4',discordAvatarUrl:'portrait'};
for(const role of ['guest','member','wiki-editor']){
 const visible=memberForViewer(player);
 assert.equal('discordUsername' in visible,false,role);
 assert.equal(visible.discordDisplayName,'Public nickname');
 assert.equal(visible.power,12345);assert.deepEqual(visible.statHistory,player.statHistory);
 assert.equal(visible.uid,'42');assert.equal(visible.ign,'Game name');
}
assert.equal(memberForViewer(player,true).discordUsername,'private.handle');
assert.equal(player.discordUsername,'private.handle','stored player must not be modified');
console.log('Only Discord usernames hidden; player stats, display names and admin access preserved.');

Object.assign(process.env,{NODE_ENV:'test',MONGODB_URI:'mongodb://127.0.0.1/test',JWT_SECRET:'local-test-only-session-secret-123456',DISCORD_CLIENT_ID:'test',DISCORD_CLIENT_SECRET:'test',DISCORD_REDIRECT_URI:'http://127.0.0.1/callback',BOT_API_TOKEN:'local-test-only-service-token',DASHBOARD_ADMIN_TOKEN:'local-test-only-admin-token'});
const {MemberModel}=await import('../src/models/member.model.js');
const {AllianceModel}=await import('../src/models/alliance.model.js');
const {createApp}=await import('../src/app.js');
let lastFilter:any;
const chain=(value:any)=>{const query:any={lean:async()=>value};for(const method of ['sort','select','limit','slice'])query[method]=()=>query;return query;};
(AllianceModel as any).findOne=()=>chain({_id:'alliance'});
(MemberModel as any).find=(filter:any)=>{lastFilter=filter;return chain([{...player,_id:'player',alliance:'KoG',attendanceScore:10,powerHistory:[],statHistory:[]}]);};
const server=createApp().listen(0,'127.0.0.1');await new Promise<void>(resolve=>server.once('listening',resolve));
const origin='http://127.0.0.1:'+(server.address() as any).port;
try {
 for(const route of ['/api/dashboard/members?q=private.handle','/api/dashboard/members?view=dashboard&limit=10']){
  const response=await fetch(origin+route);assert.equal(response.status,200);
  const data=await response.json();assert.equal(data.members[0].power,12345);assert.equal(data.members[0].discordDisplayName,'Public nickname');
  assert.equal('discordUsername' in data.members[0],false);assert.equal(JSON.stringify(lastFilter).includes('discordUsername'),false);
 }
 assert.equal((await fetch(origin+'/api/dashboard/members/manage')).status,401);
 const response=await fetch(origin+'/api/dashboard/members/manage?q=private.handle',{headers:{'x-dashboard-admin-token':'local-test-only-admin-token'}});
 assert.equal(response.status,200);assert.equal((await response.json()).members[0].discordUsername,'private.handle');assert.equal(JSON.stringify(lastFilter).includes('discordUsername'),true);
 console.log('Public roster, ranking, username search and verified admin HTTP checks passed.');
} finally {server.close();}

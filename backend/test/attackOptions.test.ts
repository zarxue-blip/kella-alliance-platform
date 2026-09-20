import assert from 'node:assert/strict';
Object.assign(process.env,{MONGODB_URI:'mongodb://127.0.0.1/test',JWT_SECRET:'local-test-only-session-secret-123456',DISCORD_CLIENT_ID:'test',DISCORD_CLIENT_SECRET:'test',DISCORD_REDIRECT_URI:'http://127.0.0.1/callback',BOT_API_TOKEN:'local-test-only-service-token',DISCORD_BOT_TOKEN:'fake-test-token'});
const {sendAttackAlert,sendEventAttendanceEmbed}=await import('../src/services/discord.service.js');
const original=globalThis.fetch;let sent:any;
globalThis.fetch=async(_url:any,init:any)=>{sent=JSON.parse(init.body);return Response.json({id:'message'});};
try{await sendAttackAlert({channelId:'test',roleMentionId:'wrong-role',message:'Test'});assert.equal(sent.content,'<@&1485933229168005282>');assert.deepEqual(sent.allowed_mentions,{roles:['1485933229168005282']});assert.deepEqual(sent.components[0].components.map((b:any)=>b.label),['Fighting','Unavailable']);
await sendEventAttendanceEmbed({channelId:'test',eventId:'test',startsAt:new Date(),description:'Test'});assert.deepEqual(sent.components[0].components.map((b:any)=>b.label),['Attending','Absent']);console.log('Attack role mention and exact attack/attendance options passed. No Discord messages sent.');}finally{globalThis.fetch=original;}

import assert from 'node:assert/strict';
Object.assign(process.env,{NODE_ENV:'test',MONGODB_URI:'mongodb://127.0.0.1/test',JWT_SECRET:'local-test-only-session-secret-123456',DISCORD_CLIENT_ID:'test',DISCORD_CLIENT_SECRET:'test',DISCORD_REDIRECT_URI:'http://127.0.0.1/callback',BOT_API_TOKEN:'local-test-only-service-token',DASHBOARD_ADMIN_TOKEN:'local-test-only-admin-token',DISCORD_BOT_TOKEN:'fake-test-token',DISCORD_GUILD_ID:'guild'});
const {AllianceModel}=await import('../src/models/alliance.model.js');
const {KellaActionModel}=await import('../src/models/kellaAction.model.js');
(AllianceModel as any).findOne=()=>({lean:async()=>({_id:'aaaaaaaaaaaaaaaaaaaaaaaa'})});
(KellaActionModel as any).create=async(value:any)=>value;
const {createApp}=await import('../src/app.js');
const original=globalThis.fetch;const sent:any[]=[];
globalThis.fetch=async(url:any,init:any)=>{
 if(String(url).startsWith('https://discord.com/api/')){
  const form=init.body instanceof FormData;
  sent.push({payload:JSON.parse(form?String(init.body.get('payload_json')):init.body),file:form?init.body.get('files[0]'):undefined});
  return Response.json({id:'test-message',channel_id:'channel'});
 }
 return original(url,init);
};
const server=createApp().listen(0,'127.0.0.1');await new Promise<void>(r=>server.once('listening',r));
const base='http://127.0.0.1:'+(server.address() as any).port;
const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aZQAAAABJRU5ErkJggg==';
const send=(body:any,admin=true)=>fetch(base+'/api/dashboard/tools/chat',{method:'POST',headers:{'content-type':'application/json',...(admin?{'x-dashboard-admin-token':'local-test-only-admin-token'}:{})},body:JSON.stringify({channelId:'channel',...body})});
try {
 assert.equal((await send({message:'Text only'})).status,201);assert.equal(sent[0].file,undefined);assert.equal(sent[0].payload.content,'Text only');
 assert.equal((await send({message:'With image',imageDataUrl:png,roleMentionId:'123',buttonEnabled:true,buttonLabel:'Join',buttonUrl:'https://example.com'})).status,201);
 assert.equal(sent[1].file.type,'image/png');assert.equal(sent[1].payload.content,'<@&123>\nWith image');assert.equal(sent[1].payload.components[0].components[0].label,'Join');assert.deepEqual(sent[1].payload.allowed_mentions,{roles:['123']});
 assert.equal((await send({imageDataUrl:png})).status,201);assert.deepEqual(sent[2].payload.allowed_mentions,{parse:[]});
 assert.equal((await send({message:'  '})).status,400);
 assert.equal((await send({imageDataUrl:'data:image/svg+xml;base64,PHN2Zz4='})).status,400);
 assert.equal((await send({imageDataUrl:png},false)).status,401);assert.equal(sent.length,3);
 console.log('Chat attachments: text-only, image-only, text + image + link + role mention, validation and admin protection passed. No Discord messages sent.');
} finally {globalThis.fetch=original;server.close();}

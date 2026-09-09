import assert from 'node:assert/strict';
Object.assign(process.env,{NODE_ENV:'test',MONGODB_URI:'mongodb://127.0.0.1/test',JWT_SECRET:'local-test-only-session-secret-123456',DISCORD_CLIENT_ID:'test',DISCORD_CLIENT_SECRET:'test',DISCORD_REDIRECT_URI:'http://127.0.0.1/callback',BOT_API_TOKEN:'local-test-only-service-token',DASHBOARD_ADMIN_TOKEN:'local-test-only-admin-token',DISCORD_GUILD_ID:'guild'});
const {validateChatImage}=await import('../src/services/chatImageValidation.js');
const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aZQAAAABJRU5ErkJggg==';
assert.equal(validateChatImage(png),png);
for(const bad of ['data:image/svg+xml;base64,PHN2Zz4=',png.replace('image/png','image/jpeg'),'data:image/png;base64,'+Buffer.alloc(500001).toString('base64')]) assert.throws(()=>validateChatImage(bad));
const {ChatImageLibrary}=await import('../src/models/chatImageLibrary.model.js');
const {UserModel}=await import('../src/models/user.model.js');
const {createApp}=await import('../src/app.js');
const item={_id:'aaaaaaaaaaaaaaaaaaaaaaaa',name:'Coins',dataUrl:png};
let images:any[]=[];
(ChatImageLibrary as any).findOne=()=>({lean:async()=>({images}),select:()=>({lean:async()=>({images})})});
(ChatImageLibrary as any).updateOne=async (filter:any,update:any)=>{
 if(update.$push){assert.equal(filter['images.19'].$exists,false);if(images.length===20)return {modifiedCount:0};images.push(item);}
 if(update.$pull)images=images.filter(image=>image._id!==String(update.$pull.images._id));
 return {modifiedCount:1};
};
(UserModel as any).findOne=({discordId}:any)=>({lean:async()=>discordId==='admin'?{role:'Owner'}:discordId==='disabled'?{role:'Owner',disabled:true}:{role:'Member'}});
const server=createApp().listen(0,'127.0.0.1');await new Promise<void>(r=>server.once('listening',r));
const base='http://127.0.0.1:'+(server.address() as any).port;
const admin={'content-type':'application/json','x-dashboard-admin-token':'local-test-only-admin-token'};
const service={'content-type':'application/json','x-service-token':'local-test-only-service-token'};
try {
 assert.equal((await fetch(base+'/api/dashboard/chat-images')).status,401);
 assert.equal((await fetch(base+'/api/dashboard/chat-images',{method:'POST',headers:admin,body:JSON.stringify({name:'Coins',dataUrl:png})})).status,201);
 assert.equal((await (await fetch(base+'/api/dashboard/chat-images',{headers:admin})).json()).images.length,1);
 const lookup=async (discordId:string,id?:string,guildId='guild')=>fetch(base+'/bot/chat-images',{method:'POST',headers:service,body:JSON.stringify({guildId,discordId,roleIds:[],id})});
 for(const id of ['member','disabled'])assert.equal((await lookup(id)).status,403);
 assert.equal((await lookup('admin',undefined,'other')).status,403);
 const list=await (await lookup('admin')).json();assert.equal(list.images[0].dataUrl,undefined);
 assert.equal((await (await lookup('admin',item._id)).json()).image.dataUrl,png);
 assert.equal((await fetch(base+'/api/dashboard/chat-images/'+item._id,{method:'DELETE',headers:admin})).status,200);
 assert.equal((await lookup('admin',item._id)).status,404);
 images=Array(20).fill(item);
 assert.equal((await fetch(base+'/api/dashboard/chat-images',{method:'POST',headers:admin,body:JSON.stringify({name:'Full',dataUrl:png})})).status,409);
 console.log('Image library: upload/list/delete, admin/server boundaries, payload validation, metadata-only bot list and capacity checks passed.');
} finally {server.close();}

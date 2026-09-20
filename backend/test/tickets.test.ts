import assert from 'node:assert/strict';
Object.assign(process.env,{NODE_ENV:'test',MONGODB_URI:'mongodb://127.0.0.1/test',JWT_SECRET:'local-test-only-session-secret-123456',DISCORD_CLIENT_ID:'123456789012345678',DISCORD_CLIENT_SECRET:'test',DISCORD_REDIRECT_URI:'http://127.0.0.1/callback',BOT_API_TOKEN:'local-test-only-service-token',DISCORD_BOT_TOKEN:'fake-test-token',DISCORD_GUILD_ID:'111111111111111111'});
const {TicketModel,TicketMessageModel}=await import('../src/models/ticket.model.js');
const {UserModel}=await import('../src/models/user.model.js');
const {createTicket,closeTicket,ticketCategories}=await import('../src/services/ticket.service.js');
const guild='111111111111111111',actor='222222222222222222';let doc:any,deleted=false,archived=false,failArchive=false,channelBody:any;
(TicketModel as any).create=async(body:any)=>{if(doc?.active)throw Object.assign(new Error('duplicate'),{code:11000});doc={_id:'aaaaaaaaaaaaaaaaaaaaaaaa',openedAt:new Date(),...body,active:true,save:async()=>{}};return doc;};
(TicketModel as any).findOne=async()=>doc;
(TicketModel as any).findOneAndUpdate=async()=>doc;
(TicketModel as any).updateOne=async(_filter:any,update:any)=>{Object.assign(doc,update.$set);};
(TicketModel as any).findByIdAndUpdate=async(_id:any,update:any)=>{Object.assign(doc,update.$set);return doc;};
(TicketMessageModel as any).bulkWrite=async(ops:any)=>{if(failArchive)throw new Error('storage failed');assert.equal(ops[0].updateOne.update.$set.content,'private support text');archived=true;};
(UserModel as any).findOne=()=>({lean:async()=>null});
const original=globalThis.fetch;
globalThis.fetch=async(input:any,init:any)=>{
 const url=String(input);let body:any={};
 if(url.includes('/members/'))body={roles:[],user:{username:'Player'}};
 else if(url.endsWith('/channels')&&init.method==='POST'){channelBody=JSON.parse(init.body);body={id:'333333333333333333'};}
 else if(url.includes('/messages?'))body=[{id:'444444444444444444',content:'private support text',timestamp:new Date().toISOString(),author:{id:actor,username:'Player'},attachments:[]}];
 else if(init.method==='DELETE'){assert.equal(archived,true,'save history before channel deletion');deleted=true;return new Response(null,{status:204});}
 return Response.json(body);
};
try{
 assert.deepEqual(ticketCategories,['Migration','Report Player','Technical Help','Other']);
 await createTicket(guild,actor,'Migration');
 assert.equal(channelBody.permission_overwrites.length,4);
 assert.equal(channelBody.permission_overwrites[0].deny,'1024');
 assert.deepEqual(channelBody.permission_overwrites.map((p:any)=>p.id),[guild,actor,'1522274495728062475','123456789012345678']);
 await assert.rejects(createTicket(guild,actor,'Other'),/already have/);
 await assert.rejects(closeTicket(doc._id,guild,'999999999999999999','close'),/Admin access/);
 failArchive=true;await assert.rejects(closeTicket(doc._id,guild,actor,'close'),/storage failed/);assert.equal(deleted,false);assert.equal(doc.active,true);
 failArchive=false;await closeTicket(doc._id,guild,actor,'close');assert.equal(deleted,true);assert.equal(doc.active,false);assert.equal(doc.status,'closed');
 await createTicket(guild,actor,'Technical Help');assert.equal(doc.active,true);
 await assert.rejects(createTicket('999999999999999999',actor,'Other'),/Invalid/);
 console.log('Tickets: category, private overwrites, duplicate prevention, ownership, archive-before-delete, failure preservation and reopen passed.');
}finally{globalThis.fetch=original;}

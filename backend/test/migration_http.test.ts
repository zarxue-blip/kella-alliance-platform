import assert from 'node:assert/strict';
import express from 'express';
import cookieParser from 'cookie-parser';
import { Types } from 'mongoose';
Object.assign(process.env,{MONGODB_URI:'mongodb://localhost/test',JWT_SECRET:'test-secret-only-123456789012345',DISCORD_CLIENT_ID:'test',DISCORD_CLIENT_SECRET:'test',DISCORD_REDIRECT_URI:'http://localhost/callback',BOT_API_TOKEN:'test-only-123456789',DISCORD_BOT_TOKEN:'fake-test-token'});
const {migrationRouter}=await import('../src/routes/migration.routes.js');
const {MigrationModel}=await import('../src/models/migration.model.js');
const {AllianceModel}=await import('../src/models/alliance.model.js');
(AllianceModel as any).findOne=()=>({sort(){return this;},lean:async()=>({_id:new Types.ObjectId()})});
const {UserModel}=await import('../src/models/user.model.js');
const {signSessionToken}=await import('../src/middleware/auth.js');
const {migrationFields}=await import('../src/services/migrationFields.js');
const {errorHandler}=await import('../src/middleware/errorHandler.js');
const user:any={_id:new Types.ObjectId(),allianceId:new Types.ObjectId(),discordId:'123456789012345678',role:'Member'};
(UserModel as any).findById=()=>({lean:async()=>user});
const docs:any[]=[];const messages:any[]=[];let failDiscord=false;
const originalFetch=globalThis.fetch;
globalThis.fetch=async(input:any,init:any)=>{
 if(String(input).startsWith('https://discord.com/')) {assert.ok(docs.length,'save precedes Discord send');if(failDiscord)return new Response('unavailable',{status:503});messages.push(JSON.parse(init.body));return new Response(JSON.stringify({id:String(messages.length)}),{status:200});}
 return originalFetch(input,init);
};
(MigrationModel as any).findOneAndUpdate=async(filter:any,update:any,options:any)=>{
 if(filter.requestKey){let d=docs.find(d=>d.requestKey===filter.requestKey);if(!d){d={_id:new Types.ObjectId(),...update.$setOnInsert,status:'Pending',deliveryStatus:'Pending',messageIds:[],save:async()=>{}};docs.push(d);}return d;}
 const d=docs.find(d=>String(d._id)===String(filter._id));if(!d)return null;
 if(filter.deliveryStatus&&!filter.deliveryStatus.$in.includes(d.deliveryStatus))return null;
 Object.assign(d,update.$set);return d;
};
(MigrationModel as any).findById=(id:any)=>({lean:async()=>docs.find(d=>String(d._id)===String(id))});
(MigrationModel as any).findOne=async(filter:any)=>docs.find(d=>String(d._id)===String(filter._id)&&String(d.allianceId)===String(filter.allianceId));
const app=express();app.use(express.json());app.use(cookieParser());app.use('/migration',migrationRouter);app.use(errorHandler);const server=app.listen(0,'127.0.0.1');await new Promise<void>(r=>server.once('listening',r));const base='http://127.0.0.1:'+(server.address() as any).port;
const token=signSessionToken({id:String(user._id),allianceId:String(user.allianceId),discordId:user.discordId,role:'Member'});const headers={'content-type':'application/json',cookie:'cod_amp_session='+token};
const answers:any={};for(const f of migrationFields)answers[f.key]=f.type==='multi'?f.options.slice(0,1):f.type==='single'?f.options.at(-1):f.type==='number'?100:'Example';answers.playerId='24055137';answers.groupMigration='No';
try{
 let r=await fetch(base+'/migration',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({})});assert.equal(r.status,400);
 const body={requestKey:crypto.randomUUID(),answers};
 r=await fetch(base+'/migration',{method:'POST',headers,body:JSON.stringify(body)});assert.equal(r.status,201);assert.equal((await r.json()).deliveryStatus,'Sent');assert.equal(docs.length,1);const sent=messages.length;
 r=await fetch(base+'/migration',{method:'POST',headers,body:JSON.stringify(body)});assert.equal(r.status,201);assert.equal(docs.length,1);assert.equal(messages.length,sent,'duplicate submit must not repost');
 assert.deepEqual(messages[0].allowed_mentions,{parse:[]});assert.equal(messages[0].enforce_nonce,true);
 failDiscord=true;r=await fetch(base+'/migration',{method:'POST',headers,body:JSON.stringify({...body,requestKey:crypto.randomUUID()})});assert.equal(r.status,201);assert.equal((await r.json()).deliveryStatus,'Failed');assert.equal(docs.length,2);assert.deepEqual(docs[1].answers.ign,'Example');
 r=await fetch(base+'/migration/'+docs[1]._id+'/retry',{method:'POST',headers,body:'{}'});assert.equal(r.status,403,'member cannot retry administrative delivery');
 user.role='Leader';failDiscord=false;r=await fetch(base+'/migration/'+docs[1]._id+'/retry',{method:'POST',headers,body:'{}'});assert.equal(r.status,200);assert.equal((await r.json()).submission.deliveryStatus,'Sent');
 const visitor=await fetch(base+'/migration',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({...body,requestKey:crypto.randomUUID()})});assert.equal(visitor.status,201);assert.equal(docs.at(-1).discordId,'');
 console.log('Migration HTTP integration passed: auth, save-before-post, idempotency, failure persistence, admin retry. Database and Discord mocked.');
}finally{server.close();globalThis.fetch=originalFetch;}

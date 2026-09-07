import assert from 'node:assert/strict';
import express from 'express';
import cookieParser from 'cookie-parser';
import { Types } from 'mongoose';
Object.assign(process.env,{MONGODB_URI:'mongodb://localhost/test',JWT_SECRET:'test-secret-only-123456789012345',DISCORD_CLIENT_ID:'test',DISCORD_CLIENT_SECRET:'test',DISCORD_REDIRECT_URI:'http://localhost/callback',BOT_API_TOKEN:'test-only-123456789',DISCORD_BOT_TOKEN:'fake-test-token',DISCORD_GUILD_ID:'1434498754014089262'});
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
const docs:any[]=[];const messages:any[]=[];const roles:string[]=[];let failDiscord=false;
const originalFetch=globalThis.fetch;
globalThis.fetch=async(input:any,init:any)=>{
 if(String(input).startsWith('https://discord.com/')) {assert.ok(docs.length,'save precedes Discord send');if(failDiscord)return new Response('unavailable',{status:503});if(init.method==='PUT'){roles.push(String(input));return new Response(null,{status:204});}messages.push(JSON.parse(init.body));return new Response(JSON.stringify({id:String(messages.length)}),{status:200});}
 return originalFetch(input,init);
};
(MigrationModel as any).findOneAndUpdate=async(filter:any,update:any,options:any)=>{
 if(filter.requestKey){let d=docs.find(d=>d.requestKey===filter.requestKey);if(filter.$or){if(!d||!filter.$or.some((x:any)=>x.discordId===d.discordId))return null;Object.assign(d,update.$set);return d;}if(!d){d={_id:new Types.ObjectId(),...update.$setOnInsert,status:'Pending',deliveryStatus:'Pending',messageIds:[],save:async()=>{}};docs.push(d);}return d;}
 const d=docs.find(d=>String(d._id)===String(filter._id));if(!d)return null;
 if(filter.deliveryStatus&&!filter.deliveryStatus.$in.includes(d.deliveryStatus))return null;
 Object.assign(d,update.$set);return d;
};
(MigrationModel as any).findById=(id:any)=>{const value=docs.find(d=>String(d._id)===String(id));return {lean:async()=>value,then:(resolve:any)=>Promise.resolve(value).then(resolve)};};
(MigrationModel as any).findOne=async(filter:any)=>docs.find(d=>String(d._id)===String(filter._id)&&String(d.allianceId)===String(filter.allianceId));
(MigrationModel as any).findOneAndDelete=async(filter:any)=>{
 const index=docs.findIndex(d=>String(d._id)===String(filter._id)&&String(d.allianceId)===String(filter.allianceId));
 return index<0?null:docs.splice(index,1)[0];
};
(MigrationModel as any).find=(filter:any)=>({sort(){return this;},lean:async()=>docs.filter(d=>String(d.allianceId)===String(filter.allianceId))});
const app=express();app.use(express.json());app.use(cookieParser());app.use('/migration',migrationRouter);app.use(errorHandler);const server=app.listen(0,'127.0.0.1');await new Promise<void>(r=>server.once('listening',r));const base='http://127.0.0.1:'+(server.address() as any).port;
const token=signSessionToken({id:String(user._id),allianceId:String(user.allianceId),discordId:user.discordId,role:'Member'});const headers={'content-type':'application/json',cookie:'cod_amp_session='+token};
const answers:any={};for(const f of migrationFields)answers[f.key]=f.type==='multi'?f.options.slice(0,1):f.type==='single'?f.options.at(-1):f.type==='number'?100:'Example';answers.playerId='24055137';answers.groupMigration='No';
try{
 let r=await fetch(base+'/migration',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({})});assert.equal(r.status,400);
 const body={requestKey:crypto.randomUUID(),answers};
 r=await fetch(base+'/migration',{method:'POST',headers,body:JSON.stringify(body)});assert.equal(r.status,201);assert.equal((await r.json()).deliveryStatus,'Sent');assert.equal(docs.length,1);const sent=messages.length;assert.equal(roles.length,2);assert.ok(roles[0].endsWith('/1546170085704605839'));assert.ok(roles[1].endsWith('/1546179090300534785'));
 r=await fetch(base+'/migration',{method:'POST',headers,body:JSON.stringify(body)});assert.equal(r.status,201);assert.equal(docs.length,1);assert.equal(messages.length,sent,'duplicate submit must not repost');assert.equal(roles.length,2,'duplicate submit must not reassign completed roles');
 assert.deepEqual(messages[0].allowed_mentions,{parse:[]});assert.equal(messages[0].enforce_nonce,true);
 failDiscord=true;r=await fetch(base+'/migration',{method:'POST',headers,body:JSON.stringify({...body,requestKey:crypto.randomUUID()})});assert.equal(r.status,201);assert.equal((await r.json()).deliveryStatus,'Failed');assert.equal(docs.length,2);assert.deepEqual(docs[1].answers.ign,'Example');
 r=await fetch(base+'/migration/'+docs[1]._id+'/retry',{method:'POST',headers,body:'{}'});assert.equal(r.status,403,'member cannot retry administrative delivery');
 user.role='Leader';failDiscord=false;r=await fetch(base+'/migration/'+docs[1]._id+'/retry',{method:'POST',headers,body:'{}'});assert.equal(r.status,200);assert.equal((await r.json()).submission.deliveryStatus,'Sent');
 const visitor=await fetch(base+'/migration',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({...body,requestKey:crypto.randomUUID()})});assert.equal(visitor.status,201);assert.equal(docs.at(-1).discordId,'');assert.equal(docs.at(-1).roleStatus,'NeedsDiscord');
 const {signMigrationIdentity,migrationIdentityCookie}=await import('../src/services/migrationIdentity.service.js');
 const receipt=JSON.stringify({requestKey:docs.at(-1).requestKey});
 r=await fetch(base+'/migration/connect-discord',{method:'POST',headers:{'content-type':'application/json'},body:receipt});assert.equal(r.status,401);
 const linkedHeaders={'content-type':'application/json',cookie:migrationIdentityCookie+'='+signMigrationIdentity(user.discordId)};
 r=await fetch(base+'/migration/connect-discord',{method:'POST',headers:linkedHeaders,body:receipt});assert.equal(r.status,200);assert.equal((await r.json()).roleStatus,'Assigned');assert.equal(docs.at(-1).discordId,user.discordId);
 r=await fetch(base+'/migration/connect-discord',{method:'POST',headers:{...linkedHeaders,cookie:migrationIdentityCookie+'='+signMigrationIdentity('987654321098765432')},body:receipt});assert.equal(r.status,404,'cannot replace a verified applicant identity');assert.equal(docs.at(-1).discordId,user.discordId);
 r=await fetch(base+'/migration/export.csv');assert.equal(r.status,401);
 user.role='Member';r=await fetch(base+'/migration/export.csv',{headers});assert.equal(r.status,403);
 user.role='Leader';const originalCount=docs.length;
 for(let i=0;i<35;i++)docs.push({_id:new Types.ObjectId(),allianceId:user.allianceId,answers:{ign:'Export Player '+i,legacy:'Older answer'},fields:[{key:'legacy',label:'Previous question'}],status:'Pending'});
 docs.push({_id:new Types.ObjectId(),allianceId:new Types.ObjectId(),answers:{ign:'Other alliance private'}});
 r=await fetch(base+'/migration/export.csv',{headers});assert.equal(r.status,200);assert.match(r.headers.get('content-disposition')||'',/attachment/);assert.match(r.headers.get('cache-control')||'',/no-store/);
 const csv=await r.text();assert.ok(csv.includes('Export Player 34'));assert.ok(csv.includes('Previous question'));assert.ok(csv.includes('Older answer'));assert.ok(!csv.includes('Other alliance private'));assert.equal(docs.length,originalCount+36,'export must not delete records');docs.splice(originalCount);
 const {migrationCsv}=await import('../src/services/migrationExport.service.js');
 const escaped=migrationCsv([{answers:{ign:'=1+1',discord:'123456789012345678',extra:'Comma, quote" and newline\nnext'},fields:[]}]);
 assert.ok(escaped.includes("'=1+1"));assert.ok(escaped.includes("'123456789012345678"));assert.ok(escaped.includes('quote""'));assert.ok(escaped.startsWith('\uFEFF'));
 console.log('Migration CSV: authorization, alliance scope, all pages, archived answers, escaping and record preservation passed.');
 const deleteId=String(docs[0]._id);const count=docs.length;
 r=await fetch(base+'/migration/'+deleteId,{method:'DELETE'});assert.equal(r.status,401);
 user.role='Member';r=await fetch(base+'/migration/'+deleteId,{method:'DELETE',headers});assert.equal(r.status,403);assert.equal(docs.length,count);
 user.role='Leader';const ownAlliance=user.allianceId;user.allianceId=new Types.ObjectId();
 r=await fetch(base+'/migration/'+deleteId,{method:'DELETE',headers});assert.equal(r.status,404);assert.equal(docs.length,count);user.allianceId=ownAlliance;
 r=await fetch(base+'/migration/not-an-id',{method:'DELETE',headers});assert.equal(r.status,400);
 r=await fetch(base+'/migration/'+deleteId,{method:'DELETE',headers});assert.equal(r.status,200);assert.equal(docs.length,count-1);
 r=await fetch(base+'/migration/'+deleteId,{method:'DELETE',headers});assert.equal(r.status,404);
 console.log('Migration deletion: guest/member denied, alliance scope, invalid ID, deletion and missing application passed.');
 console.log('Migration HTTP integration passed: auth, save-before-post, idempotency, failure persistence, admin retry. Database and Discord mocked.');
}finally{server.close();globalThis.fetch=originalFetch;}

import assert from 'node:assert/strict';
Object.assign(process.env,{NODE_ENV:'production',MONGODB_URI:'mongodb://localhost/test',JWT_SECRET:'test-secret-only-123456789012345',DISCORD_CLIENT_ID:'test',DISCORD_CLIENT_SECRET:'test',DISCORD_REDIRECT_URI:'https://kella.online/api/auth/discord/callback',BOT_API_TOKEN:'test-only-123456789'});
const {startDiscordLogin}=await import('../src/controllers/auth.controller.js');
for(const hostname of ['kella.online','www.kella.online']) {
 await new Promise<void>((resolve,reject)=>{
  const req:any={hostname,query:{},get:()=>hostname};
  const res:any={set:()=>res,cookie:(name:string,_value:string,options:any)=>{assert.equal(name,'kella_oauth_session');assert.equal(options.domain,'kella.online');assert.equal(options.secure,true);assert.equal(options.httpOnly,true);assert.equal(options.sameSite,'lax');return res;},redirect:(url:string)=>{assert.equal(new URL(url).hostname,'discord.com');resolve();}};
  startDiscordLogin(req,res,reject);
 });
}
console.log('Apex and www login both go directly to Discord with a shared secure cookie.');

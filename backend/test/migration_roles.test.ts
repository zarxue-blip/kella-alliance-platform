import assert from 'node:assert/strict';
Object.assign(process.env,{MONGODB_URI:'mongodb://localhost/test',JWT_SECRET:'test-secret-only-123456789012345',DISCORD_CLIENT_ID:'test',DISCORD_CLIENT_SECRET:'test',DISCORD_REDIRECT_URI:'http://localhost/callback',BOT_API_TOKEN:'test-only-123456789',DISCORD_BOT_TOKEN:'test-token',DISCORD_GUILD_ID:'1434498754014089262'});
const {MigrationModel}=await import('../src/models/migration.model.js');
const {assignMigrationRoles,migrationApplicantRoles}=await import('../src/services/migrationRoles.service.js');
const {readMigrationIdentity,signMigrationIdentity,migrationIdentityCookie}=await import('../src/services/migrationIdentity.service.js');
const member='123456789012345678';
const token=signMigrationIdentity(member);
assert.equal(readMigrationIdentity({cookies:{[migrationIdentityCookie]:token}} as any),member);
assert.equal(readMigrationIdentity({cookies:{[migrationIdentityCookie]:'forged'}} as any),'');
const doc:any={discordId:member,assignedRoleIds:[],roleStatus:'Pending',save:async()=>{}};
(MigrationModel as any).findById=async()=>doc;
let failSecond=true;const requested:string[]=[];const originalFetch=globalThis.fetch;
globalThis.fetch=async(input:any,init:any)=>{assert.equal(init.method,'PUT');const url=String(input);requested.push(url);return new Response(null,{status:failSecond&&url.endsWith(migrationApplicantRoles[1])?403:204});};
try {
 await assignMigrationRoles('test');assert.equal(doc.roleStatus,'Failed');assert.deepEqual(doc.assignedRoleIds,[migrationApplicantRoles[0]]);
 failSecond=false;await assignMigrationRoles('test');assert.equal(doc.roleStatus,'Assigned');assert.equal(requested.length,3,'retry only missing role');
 await assignMigrationRoles('test');assert.equal(requested.length,3);
 doc.discordId='';doc.roleStatus='Pending';await assignMigrationRoles('test');assert.equal(doc.roleStatus,'NeedsDiscord');assert.equal(requested.length,3,'never assign based on typed username');
 console.log('Migration roles: verified identity, exact roles, partial-failure retry, idempotency and guest handling passed.');
} finally {globalThis.fetch=originalFetch;}

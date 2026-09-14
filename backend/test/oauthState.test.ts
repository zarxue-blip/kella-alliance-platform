import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';
Object.assign(process.env,{MONGODB_URI:'mongodb://localhost/test',JWT_SECRET:'test-secret-only-123456789012345',DISCORD_CLIENT_ID:'test',DISCORD_CLIENT_SECRET:'test',DISCORD_REDIRECT_URI:'http://localhost/callback',BOT_API_TOKEN:'test-only-123456789'});
const {createOAuthState,verifyOAuthState}=await import('../src/services/oauthState.service.js');
for(const migration of [false,true]) {
 const login=createOAuthState(migration);
 assert.deepEqual(verifyOAuthState(login.state,login.cookie),{migration});
 assert.equal(verifyOAuthState(login.state,undefined),null);
 assert.equal(verifyOAuthState('0'.repeat(48),login.cookie),null);
 assert.equal(verifyOAuthState(login.state,login.cookie+'bad'),null);
 const expired=jwt.sign({purpose:'discord-oauth',state:login.state,migration},process.env.JWT_SECRET!,{expiresIn:-1,audience:'kella-discord-login'});
 assert.equal(verifyOAuthState(login.state,expired),null);
 const wrongPurpose=jwt.sign({purpose:'user',state:login.state,migration},process.env.JWT_SECRET!,{expiresIn:600,audience:'kella-discord-login'});
 assert.equal(verifyOAuthState(login.state,wrongPurpose),null);
 // A fresh process has no in-memory state, only the stable signing key.
 const {spawnSync}=await import('node:child_process');
 const child=spawnSync(process.execPath,['--import','tsx','--input-type=module','-e',`import {verifyOAuthState} from './backend/src/services/oauthState.service.ts'; if(verifyOAuthState(process.env.TEST_STATE,process.env.TEST_COOKIE)?.migration !== ${migration}) process.exit(1);`],{env:{...process.env,TEST_STATE:login.state,TEST_COOKIE:login.cookie},encoding:'utf8'});
 assert.equal(child.status,0,child.stderr);
}
console.log('OAuth state survives a fresh process; missing cookies, mismatches, tampering, expiry and wrong-purpose tokens rejected.');

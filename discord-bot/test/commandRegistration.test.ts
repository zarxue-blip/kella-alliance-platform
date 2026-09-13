import assert from 'node:assert/strict';
import { syncCommands } from '../src/services/commandRegistration.js';
const desired = [{name:'dashboard'},{name:'sum'}];
for (const guild of ['guild-id', undefined]) {
 const state = new Map<string, unknown[]>();
 const global = '/applications/app-id/commands';
 const target = guild ? '/applications/app-id/guilds/guild-id/commands' : global;
 state.set(global,[{name:'agents'},{name:'apply'},{name:'dashboard'}]);
 if(guild)state.set(target,[{name:'besttime'},{name:'sum'}]);
 const calls:string[]=[];
 const rest = {
  get:async(route:string)=>state.get(route)||[],
  put:async(route:string,options:{body:unknown[]})=>{calls.push(route);state.set(route,options.body);return options.body;}
 };
 const result=await syncCommands(rest as never,'app-id',guild,desired);
 assert.deepEqual(result.kept,['dashboard','sum']);
 assert.deepEqual(result.removed,guild?['agents','apply','besttime']:['agents','apply']);
 assert.equal(calls[0],target);
 if(guild)assert.deepEqual(state.get(global),[]);
 assert.deepEqual((await syncCommands(rest as never,'app-id',guild,desired)).removed,[]);
}
let writes=0;
await assert.rejects(()=>syncCommands({get:async()=>{throw Error('unauthorized')},put:async()=>{writes++;}} as never,'app-id','guild-id',desired));
assert.equal(writes,0);
console.log('Guild/global cleanup, retained commands, idempotency and fail-before-write checks passed.');

import assert from 'node:assert/strict';
import { MemberModel } from '../src/models/member.model.js';
import { validatedRosterUids,syncActiveMembership } from '../src/services/rosterMembership.service.js';
const valid={uid:'100',ign:'Player',power:1000000};
for(const rows of [[],[{...valid,power:NaN}],[{...valid,uid:''}],[{...valid,ign:''}],[valid,valid]])assert.throws(()=>validatedRosterUids(rows));
let writes:any[]=[];(MemberModel as any).updateMany=async(filter:any,update:any)=>{writes.push({filter,update});return {modifiedCount:1};};
await assert.rejects(syncActiveMembership('alliance',[],new Date()));assert.equal(writes.length,0);
const ids = validatedRosterUids([valid]);
await syncActiveMembership('alliance', ids, new Date());

assert.equal(writes.length, 1);
assert.deepEqual(writes[0].filter.uid, { $in: ['100'] });
assert.equal(writes[0].update.$set.membershipStatus, 'active');
assert.equal(writes[0].update.$unset.leftAt, '');
assert.equal(writes.some((w) => w.filter.uid?.$nin), false);
for(const w of writes){assert.equal(w.filter.allianceId,'alliance');assert.equal(w.update.$set.powerHistory,undefined);assert.equal(w.update.$set.statHistory,undefined);}
console.log('Roster membership: invalid/empty/duplicate protection, activation, inactivity and history preservation passed.');

const {AllianceModel}=await import('../src/models/alliance.model.js');const {withRosterImport}=await import('../src/services/rosterMembership.service.js');
let locked=true,released=false;(AllianceModel as any).findOneAndUpdate=async()=>locked?null:{};
(AllianceModel as any).updateOne=async(_filter:any,update:any)=>{if(update.$unset)released=true;return {modifiedCount:1};};
await assert.rejects(withRosterImport('alliance',async()=>{throw new Error('must not run');}),/Another roster/);
locked=false;await assert.rejects(withRosterImport('alliance',async()=>{throw new Error('parser failure');}),/parser failure/);assert.equal(released,true);

import assert from 'node:assert/strict';
import { migrationFields } from '../src/services/migrationFields.js';
import { validateMigration,migrationDescriptions } from '../src/services/migrationData.service.js';
const answers:any={};for(const f of migrationFields) answers[f.key]=f.type==='multi'?f.options.slice(0,1):f.type==='single'?f.options.at(-1):f.type==='number'?100:'Example';
answers.playerId='24055137';answers.groupMigration='No';answers.extra='@everyone <script> **test** '+ 'Long answer '.repeat(160);answers.heroes=migrationFields.find(f=>f.key==='heroes')!.options;answers.artifacts=migrationFields.find(f=>f.key==='artifacts')!.options;
const valid=validateMigration(answers);const pages=migrationDescriptions(valid,'123456789012345678');assert.ok(pages.every(p=>p.length<=4096));assert.ok(pages.join('').includes('Long answer '.repeat(100)));assert.ok(!pages.join('').includes('@everyone'));assert.equal((valid.heroes as string[]).length,47);
assert.throws(()=>validateMigration({...answers,power:-1}));assert.throws(()=>validateMigration({...answers,troops:['Invalid']}));assert.throws(()=>validateMigration({...answers,groupMigration:'Yes',groupName:''}));assert.throws(()=>validateMigration({...answers,ign:''}));assert.throws(()=>validateMigration({...answers,playerId:'bad'}));
console.log('Migration validation and Discord length/preservation tests passed.');

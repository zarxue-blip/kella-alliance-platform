import { Types } from 'mongoose';
import { AllianceModel } from '../models/alliance.model.js';
import { MemberModel } from '../models/member.model.js';
import { HttpError } from '../utils/httpError.js';
export function validatedRosterUids(rows:Array<{uid?:unknown;ign?:unknown;power?:unknown}>) {
 if(!rows.length || rows.some(row=>!String(row.uid||'').trim() || !String(row.ign||'').trim() || !Number.isFinite(Number(row.power)) || Number(row.power)<=0))throw new HttpError(400,'The current roster contains invalid rows. No membership changes were applied.');
 const ids=rows.map(row=>String(row.uid).trim());
 if(new Set(ids).size!==ids.length)throw new HttpError(400,'Duplicate player IDs in the current roster. No membership changes were applied.');
 return ids;
}
export async function syncActiveMembership(allianceId:string,ids:string[],at:Date) {
 if(!ids.length)throw new HttpError(400,'A valid current roster is required.');
 await MemberModel.updateMany({allianceId,uid:{$in:ids}},{$set:{membershipStatus:'active',lastRosterAt:at},$unset:{leftAt:''}});
 const result=await MemberModel.updateMany({allianceId,uid:{$nin:ids},membershipStatus:{$ne:'inactive'}},{$set:{membershipStatus:'inactive',leftAt:at}});
 return result.modifiedCount;
}

export async function withRosterImport<T>(allianceId:string,work:()=>Promise<T>):Promise<T> {
 const token=new Types.ObjectId().toString();
 const lock=await AllianceModel.findOneAndUpdate({_id:allianceId,$or:[{rosterImportUntil:{$exists:false}},{rosterImportUntil:{$lt:new Date()}}]},{$set:{rosterImportToken:token,rosterImportUntil:new Date(Date.now()+3600000)}},{new:true});
 if(!lock)throw new HttpError(409,'Another roster upload is being processed. Try again after it finishes.');
 try{const result=await work();await AllianceModel.updateOne({_id:allianceId,rosterImportToken:token},{$set:{latestRosterAt:new Date()}});return result;}
 finally{await AllianceModel.updateOne({_id:allianceId,rosterImportToken:token},{$unset:{rosterImportToken:'',rosterImportUntil:''}});}
}

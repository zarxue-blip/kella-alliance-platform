import { MemberModel } from '../models/member.model.js';
import { KellaActionModel } from '../models/kellaAction.model.js';
import { toxicRecoveryRow as row } from '../data/toxicRecovery.data.js';
// Targeted, insert-only recovery authorized for the missing server 881 Toxic main.
// The known live farm anchors the alliance; never infer ownership from a name.
export async function recoverMissingToxicMain() {
  const anchor:any=await MemberModel.findOne({_id:'6a34ff4162ea4115fda31a55',uid:'24603190'}).lean();
  if(!anchor) return;
  const marker={allianceId:anchor.allianceId,type:'member_identity_recovery',reportId:'toxic-24055137-20260906'};
  if(await KellaActionModel.exists(marker)) return;
  const snapshotDate=new Date('2026-08-14T00:00:00Z');
  const result=await MemberModel.updateOne({allianceId:anchor.allianceId,uid:row.uid},{$setOnInsert:{
    allianceId:anchor.allianceId,uid:row.uid,ign:row.ign,discordId:`topn:${row.uid}`,alliance:row.alliance,power:row.power,
    rank:'TopN CSV #'+row.rank,role:'Member',
    powerHistory:[{date:snapshotDate,power:row.power,source:'TopN CSV',filename:'dragonstats_server_881_2026-08-14.csv'}],
    statHistory:[{date:snapshotDate,metrics:row.stats,source:'TopN CSV',filename:'dragonstats_server_881_2026-08-14.csv'}],
    notes:'Recovered missing main from verified server 881 rank export dated 2026-08-14. Import a current rank file to refresh stats.'
  }},{upsert:true});
  await KellaActionModel.create({...marker,actorName:'Kella recovery',status:'Completed',payload:{uid:row.uid,created:result.upsertedCount===1,sourceDate:snapshotDate}});
}

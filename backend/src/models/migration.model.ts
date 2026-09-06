import { Schema, model } from 'mongoose';
const migrationSchema = new Schema({
  allianceId: {type:Schema.Types.ObjectId,ref:'Alliance',required:true,index:true},
  requesterId: {type:Schema.Types.ObjectId,ref:'User'},
  discordId: {type:String,default:''},
  requestKey: {type:String,required:true},
  answers: {type:Schema.Types.Mixed,required:true},
  fields: {type:Schema.Types.Mixed,required:true},
  status: {type:String,enum:['Pending','Reviewing','Accepted','Declined'],default:'Pending',index:true},
  channelId: {type:String,required:true},
  deliveryStatus: {type:String,enum:['Pending','Sending','Sent','Failed'],default:'Pending'},
  roleStatus: {type:String,enum:['Pending','Assigned','Failed','NeedsDiscord'],default:'Pending'},
  assignedRoleIds: {type:[String],default:[]},
  roleError: {type:String,default:''},
  messageIds: {type:[String],default:[]},
  deliveryError: {type:String,default:''}
},{timestamps:true});
migrationSchema.index({requestKey:1},{unique:true});
export const MigrationModel = model<any>('Migration',migrationSchema);

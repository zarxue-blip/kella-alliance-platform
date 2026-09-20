import { Schema,model } from 'mongoose';
const schema=new Schema({guildId:{type:String,required:true},creatorDiscordId:{type:String,required:true},creatorName:String,category:{type:String,enum:['Migration','Report Player','Technical Help','Other'],required:true},channelId:String,status:{type:String,default:'creating'},active:{type:Boolean,default:true},openedAt:{type:Date,default:Date.now},closedAt:Date,closedBy:String,closingStartedAt:Date},{timestamps:true});
schema.index({guildId:1,creatorDiscordId:1},{unique:true,partialFilterExpression:{active:true}});
export const TicketModel=model('Ticket',schema);
const messageSchema=new Schema({ticketId:{type:Schema.Types.ObjectId,required:true,index:true},messageId:String,authorId:String,authorName:String,content:String,at:Date,attachments:[{name:String,url:String}]});
messageSchema.index({ticketId:1,messageId:1},{unique:true});
export const TicketMessageModel=model('TicketMessage',messageSchema);

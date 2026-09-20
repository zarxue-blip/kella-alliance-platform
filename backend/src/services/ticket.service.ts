import { kellaDiscordRoles } from '@cod-amp/shared';
import { env } from '../config/env.js';
import { discordRequest } from './discord.service.js';
import { requireBotAdmin } from './botAdmin.service.js';
import { TicketModel,TicketMessageModel } from '../models/ticket.model.js';
import { HttpError } from '../utils/httpError.js';
export const ticketCategories=['Migration','Report Player','Technical Help','Other'];
export async function createTicket(guildId:string,creatorDiscordId:string,category:string) {
 if(guildId!==env.DISCORD_GUILD_ID || !ticketCategories.includes(category))throw new HttpError(400,'Invalid ticket category or server.');
 const member=await discordRequest<any>(`/guilds/${guildId}/members/${creatorDiscordId}`);
 let ticket;
 try{ticket=await TicketModel.create({guildId,creatorDiscordId,creatorName:member.nick||member.user?.global_name||member.user?.username,category});}
 catch(error:any){if(error.code===11000)throw new HttpError(409,'You already have an open ticket. Close it before creating another.');throw error;}
 try{
  const channel=await discordRequest<{id:string}>(`/guilds/${guildId}/channels`,{method:'POST',body:JSON.stringify({name:'ticket-'+category.toLowerCase().replaceAll(' ','-')+'-'+String(ticket._id).slice(-6),type:0,topic:`Ticket ${ticket._id} | ${category}`,permission_overwrites:[{id:guildId,type:0,deny:'1024'},{id:creatorDiscordId,type:1,allow:'101376'},{id:kellaDiscordRoles.admin,type:0,allow:'101376'},{id:env.DISCORD_CLIENT_ID,type:1,allow:'109584'}]})});
  ticket.channelId=channel.id;ticket.status='open';await ticket.save();
  await discordRequest(`/channels/${channel.id}/messages`,{method:'POST',body:JSON.stringify({content:`<@${creatorDiscordId}>`,allowed_mentions:{users:[creatorDiscordId],parse:[]},embeds:[{title:category+' ticket',color:0xb99b58,fields:[{name:'Ticket ID',value:String(ticket._id)},{name:'Creator',value:`<@${creatorDiscordId}>`},{name:'Category',value:category},{name:'Opened',value:ticket.openedAt.toISOString()},{name:'Status',value:'Open'}]}],components:[{type:1,components:[{type:2,style:2,label:'Close Ticket',custom_id:'ticket-close:'+ticket._id},{type:2,style:4,label:'Delete Ticket',custom_id:'ticket-delete:'+ticket._id}]}]})});
  return ticket;
 }catch(error){if(!ticket.channelId){ticket.active=false;ticket.status='failed';await ticket.save();}throw error;}
}
export async function closeTicket(id:string,guildId:string,actor:string,action:string) {
 const ticket=await TicketModel.findOne({_id:id,guildId});
 if(!ticket||guildId!==env.DISCORD_GUILD_ID)throw new HttpError(404,'Ticket not found.');
 if(actor!==ticket.creatorDiscordId || action==='delete')await requireBotAdmin(guildId,actor);
 if(!ticket.active)return ticket;
 const locked=await TicketModel.findOneAndUpdate({_id:id,$or:[{status:{$in:['open','close-failed']}},{status:'closing',closingStartedAt:{$lt:new Date(Date.now()-900000)}}]},{$set:{status:'closing',closingStartedAt:new Date()}},{new:true});
 if(!locked)throw new HttpError(409,'This ticket is already being closed.');
 try{
  let before='';
  while(ticket.channelId){
   const messages=await discordRequest<any[]>(`/channels/${ticket.channelId}/messages?limit=100${before?'&before='+before:''}`).catch(error=>{if(error instanceof HttpError && error.statusCode===404)return [];throw error;});
   if(!messages.length)break;
   await TicketMessageModel.bulkWrite(messages.map(m=>({updateOne:{filter:{ticketId:ticket._id,messageId:m.id},update:{$set:{authorId:m.author?.id,authorName:m.author?.global_name||m.author?.username,content:m.content||'',at:new Date(m.timestamp),attachments:(m.attachments||[]).map((a:any)=>({name:a.filename,url:a.url}))}},upsert:true}})));
   before=messages[messages.length-1].id;if(messages.length<100)break;
  }
  // History is durable before the temporary channel is removed.
  await TicketModel.updateOne({_id:id},{$set:{closedAt:new Date(),closedBy:actor}});
  if(ticket.channelId)await discordRequest(`/channels/${ticket.channelId}`,{method:'DELETE'}).catch(error=>{if(!(error instanceof HttpError && error.statusCode===404))throw error;});
  return await TicketModel.findByIdAndUpdate(id,{$set:{status:action==='delete'?'deleted':'closed',active:false}},{new:true});
 }catch(error){await TicketModel.updateOne({_id:id},{$set:{status:'close-failed'}});throw error;}
}

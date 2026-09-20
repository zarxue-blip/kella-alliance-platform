import { env } from '../config/env.js';
import { discordRequest } from './discord.service.js';
import { isDashboardAdminUser } from '../middleware/auth.js';
import { UserModel } from '../models/user.model.js';
import { HttpError } from '../utils/httpError.js';
export async function requireBotAdmin(guildId:string,discordId:string) {
 if(guildId!==env.DISCORD_GUILD_ID || !/^\d{15,22}$/.test(discordId)) throw new HttpError(403,'Admin access required.');
 const [member,user]=await Promise.all([discordRequest<{roles:string[]}>(`/guilds/${guildId}/members/${discordId}`),UserModel.findOne({discordId}).lean<any>()]);
 if(user?.disabled || !isDashboardAdminUser({discordId,discordRoleIds:member.roles,role:user?.role})) throw new HttpError(403,'Admin access required.');
}

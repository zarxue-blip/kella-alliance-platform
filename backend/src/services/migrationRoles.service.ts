import { MigrationModel } from '../models/migration.model.js';
import { assignDiscordRole } from './discord.service.js';
export const migrationApplicantRoles = ['1546170085704605839','1546179090300534785'];
export async function assignMigrationRoles(id:string) {
  const submission=await MigrationModel.findById(id);
  if(!submission || submission.roleStatus==='Assigned') return;
  if(!/^\d{17,20}$/.test(submission.discordId || '')) {
    submission.roleStatus='NeedsDiscord';submission.roleError='Connect Discord to receive your applicant roles.';await submission.save();return;
  }
  try {
    for(const roleId of migrationApplicantRoles) {
      if((submission.assignedRoleIds || []).includes(roleId)) continue;
      // Discord PUT is idempotent; repeated requests cannot duplicate a role.
      await assignDiscordRole(submission.discordId,roleId);
      submission.assignedRoleIds = [...(submission.assignedRoleIds || []),roleId];
      await submission.save();
    }
    submission.roleStatus='Assigned';submission.roleError='';
  } catch {
    submission.roleStatus='Failed';submission.roleError='Roles could not be assigned. Join the Kella Discord server and ask an admin to retry.';
  }
  await submission.save();
}

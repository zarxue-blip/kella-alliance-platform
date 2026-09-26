// Discord account names belong only in verified admin responses.
export function memberForViewer<T extends Record<string, any>>(member: T, admin = false): T {
  if (admin) return member;
  const result = { ...member };
  delete result.discordUsername;
  delete result.privateSiteAccess;
  delete result.privateAccessPath;
  return result;
}

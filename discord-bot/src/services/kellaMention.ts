export function kellaMention(content: string, botId: string, userMentioned: boolean, roles: Iterable<{ id: string; tags?: { botId?: string } | null }>): string | undefined {
  const botRoles = [...roles].filter(role => role.tags?.botId === botId);
  if (!userMentioned && !botRoles.length) return undefined;
  let question = content.replace(new RegExp(`<@!?${botId}>`, 'g'), '');
  for (const role of botRoles) question = question.replaceAll(`<@&${role.id}>`, '');
  return question.trim();
}

import { REST, Routes } from 'discord.js';
type Command = { name: string; type?: number };
type RegistrationRest = Pick<REST, 'get' | 'put'>;
export async function syncCommands(rest: RegistrationRest, applicationId: string, guildId: string | undefined, body: unknown[]) {
  const globalRoute = Routes.applicationCommands(applicationId);
  const targetRoute = guildId ? Routes.applicationGuildCommands(applicationId, guildId) : globalRoute;
  const globalBefore = await rest.get(globalRoute) as Command[];
  const guildBefore = guildId ? await rest.get(targetRoute) as Command[] : [];
  const wanted = new Set((body as Command[]).map(c => c.name));
  const removed = [...new Set([...globalBefore, ...guildBefore].filter(c => !wanted.has(c.name) || (c.type && c.type !== 1)).map(c => c.name))].sort();
  // Install working server commands before clearing stale global registrations.
  await rest.put(targetRoute, { body });
  if (guildId && globalBefore.length) await rest.put(globalRoute, { body: [] });
  const after = await rest.get(targetRoute) as Command[];
  const remainingGlobal = guildId ? await rest.get(globalRoute) as Command[] : [];
  if (remainingGlobal.length || after.length !== body.length || after.some(c => !wanted.has(c.name))) throw new Error('Discord command verification failed');
  const kept = after.map(c => c.name).sort();
  console.log('Kella commands removed: ' + (removed.join(', ') || '(none)'));
  console.log('Kella commands kept: ' + kept.join(', '));
  return { removed, kept };
}

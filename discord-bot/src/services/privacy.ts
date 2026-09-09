/** Best-effort filtering, not a guarantee that arbitrary private prose is detected. */
export function redactSensitiveText(text: string, extraSecrets: string[] = []): string {
  const secrets = [...extraSecrets, ...Object.entries(process.env)
    .filter(([name]) => /TOKEN|SECRET|PASSWORD|API_KEY|DATABASE_URL|MONGO.*URI/i.test(name))
    .map(([, value]) => value || '')].filter(value => value.length >= 8);
  let result = text;
  for (const secret of secrets.sort((a, b) => b.length - a.length)) result = result.split(secret).join('[REDACTED]');
  return result
    .replace(/-----BEGIN [^-]*PRIVATE KEY-----[\s\S]*?-----END [^-]*PRIVATE KEY-----/g, '[REDACTED]')
    .replace(/\b(?:gsk_|sk-|ghp_|github_pat_)[A-Za-z0-9_-]{16,}/g, '[REDACTED]')
    .replace(/\b(?:mongodb(?:\+srv)?|postgres(?:ql)?):\/\/[^\s<>]+/gi, '[REDACTED]')
    .replace(/\bBearer\s+[A-Za-z0-9._~+\/-]+=*/gi, 'Bearer [REDACTED]')
    .replace(/\b(password|passwd|api[_ -]?key|access[_ -]?token|secret)\s*[:=]\s*(?:"[^"\n]*"|'[^'\n]*'|[^\s,;]+)/gi, '$1: [REDACTED]')
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[EMAIL REDACTED]');
}

export function isAiLocationAllowed(guildId: string | null | undefined, channelId: string,
  parentId: string | null | undefined, configuredGuild: string | undefined, allowedChannels = '') {
  if (!configuredGuild || guildId !== configuredGuild) return false;
  const allowed = allowedChannels.split(',').map(id => id.trim()).filter(Boolean);
  return !allowed.length || allowed.includes(channelId) || (!!parentId && allowed.includes(parentId));
}

type RankedMember = {
  power?: number;
  ign?: string;
  powerHistory?: Array<{ date?: Date | string; power?: number }>;
  statHistory?: Array<{ date?: Date | string; metrics?: Record<string, unknown> }>;
};

export function rankingValue(member: RankedMember, metric: string): number {
  if (metric === 'power' && Number(member.power) > 0) return Number(member.power);
  const points = (member.statHistory || []).map(point => ({ date: point.date, value: Number(point.metrics?.[metric]) }));
  if (metric === 'power') points.push(...(member.powerHistory || []).map(point => ({ date: point.date, value: Number(point.power) })));
  const latest = points.filter(point => Number.isFinite(point.value) && Number.isFinite(new Date(point.date || 0).getTime()))
    .sort((a,b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())[0];
  return latest?.value || 0;
}

export function rankMembers<T extends RankedMember>(members: T[], metric: string, limit: number): T[] {
  return members.slice().sort((a,b) => rankingValue(b,metric) - rankingValue(a,metric) || rankingValue(b,'power') - rankingValue(a,'power') || String(a.ign || '').localeCompare(String(b.ign || ''))).slice(0,limit);
}



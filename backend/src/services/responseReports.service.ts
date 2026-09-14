type Row = Record<string, any>;
export function responseGroups(rows: Row[], labels: string[] = []) {
  const latest = new Map<string, Row>();
  for (const row of rows.slice().sort((a,b)=>new Date(b.sentAt || 0).getTime()-new Date(a.sentAt || 0).getTime())) {
    const key=String(row.actorDiscordId || row._id);
    if(!latest.has(key)) latest.set(key,row);
  }
  const groups:Record<string, {name:string;at:unknown}[]> = Object.fromEntries(labels.map(label=>[label,[]]));
  for(const row of latest.values()) (groups[row.status || 'Recorded'] ||= []).push({name:row.actorName || row.actorDiscordId || 'Unknown player',at:row.sentAt});
  return Object.entries(groups).map(([label,players])=>({label,players:players.sort((a,b)=>a.name.localeCompare(b.name))}));
}
export function attackReports(alerts:Row[],responses:Row[]) {
  const reports=alerts.map(alert=>({id:String(alert._id),kind:'war',title:alert.payload?.message || 'Attack alert',at:alert.sentAt,
    groups:responseGroups(responses.filter(r=>r.reportId===String(alert._id) || (alert.payload?.messageId && (r.reportId===alert.payload.messageId || r.payload?.messageId===alert.payload.messageId))),['Joining Fight','Defending','On The Way','Unavailable'])}));
  const unlinked=responses.filter(r=>!r.reportId && !r.payload?.messageId);
  if(unlinked.length) reports.push({id:'legacy',kind:'war',title:'Older unlinked responses',at:unlinked[0].sentAt,groups:responseGroups(unlinked)});
  return reports;
}

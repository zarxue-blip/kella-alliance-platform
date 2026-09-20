type AttendanceResponse = { reportId?: string; status?: string; sentAt?: Date | string };

export function personalAttendanceByEvent(responses: AttendanceResponse[]) {
  const byEvent: Record<string, string> = Object.create(null);
  const latest = responses.slice().sort((a,b) => new Date(b.sentAt || 0).getTime() - new Date(a.sentAt || 0).getTime());
  const seen=new Set<string>();
  for (const response of latest) {
    if (!response.reportId || seen.has(response.reportId)) continue;
    seen.add(response.reportId);
    if (!['Attending','Absent'].includes(response.status || '')) continue;
    byEvent[response.reportId] = response.status!;
  }
  return byEvent;
}

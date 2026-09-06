type AttendanceResponse = { reportId?: string; status?: string; sentAt?: Date | string };

export function personalAttendanceByEvent(responses: AttendanceResponse[]) {
  const byEvent: Record<string, string> = Object.create(null);
  const latest = responses.slice().sort((a,b) => new Date(b.sentAt || 0).getTime() - new Date(a.sentAt || 0).getTime());
  for (const response of latest) {
    if (!response.reportId || Object.hasOwn(byEvent,response.reportId)) continue;
    if (!['Attending','Absent','Not Sure'].includes(response.status || '')) continue;
    byEvent[response.reportId] = response.status!;
  }
  return byEvent;
}

import { compactNumber } from "@/lib/utils";
import { members } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function MemberTable() {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-zinc-950 text-xs uppercase text-zinc-500">
            <tr>
              <th className="px-4 py-3 text-left">IGN</th>
              <th className="px-4 py-3 text-left">UID</th>
              <th className="px-4 py-3 text-left">Power</th>
              <th className="px-4 py-3 text-left">Alliance</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Attendance</th>
              <th className="px-4 py-3 text-left">War</th>
              <th className="px-4 py-3 text-left">Country</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.uid} className="border-t border-border">
                <td className="px-4 py-3 font-semibold text-zinc-100">{member.ign}</td>
                <td className="px-4 py-3 text-zinc-400">{member.uid}</td>
                <td className="px-4 py-3 text-zinc-300">{compactNumber(member.power)}</td>
                <td className="px-4 py-3">
                  <Badge>{member.alliance}</Badge>
                </td>
                <td className="px-4 py-3 text-zinc-300">{member.role}</td>
                <td className="px-4 py-3 text-success">{member.attendance}%</td>
                <td className="px-4 py-3 text-command2">{member.war}%</td>
                <td className="px-4 py-3 text-zinc-400">{member.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

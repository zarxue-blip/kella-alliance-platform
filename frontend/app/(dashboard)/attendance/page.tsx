import { QrCode } from "lucide-react";
import Link from "next/link";
import { AttendanceChart } from "@/components/charts";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { members } from "@/lib/mock-data";

const events = ["Roots of War 14 UTC", "Roots of War 20 UTC", "Summit Rotation", "Behemoth Rally", "Pass Defense", "Officer Meeting"];

export default function AttendancePage() {
  return (
    <div>
      <PageHeader
        title="Attendance System"
        description="Create events, support Discord, web, QR, and manual officer check-ins, then generate weekly, monthly, and all-time reports."
        action={<Link href="/roots-of-war" className="inline-flex h-10 items-center justify-center rounded-md bg-command px-4 text-sm font-semibold text-white transition hover:bg-red-600">Roots of War Check-in</Link>}
      />
      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Open Check-ins</CardTitle>
            <Button variant="secondary"><QrCode className="mr-2 h-4 w-4" /> QR Mode</Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {events.map((event, index) => (
              <div key={event} className="flex items-center justify-between rounded-md border border-border bg-zinc-950 p-4">
                <div>
                  <p className="font-semibold">{event}</p>
                  <p className="text-sm text-zinc-500">{event.startsWith("Roots") ? "Roots of War attendance" : index % 2 === 0 ? "War" : "Alliance"} event</p>
                </div>
                <Badge>{220 + index * 48} checked in</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <AttendanceChart />
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
          <Badge>All time</Badge>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {members.map((member, index) => (
            <div key={member.uid} className="rounded-md bg-zinc-950 p-4">
              <p className="text-xs text-zinc-500">#{index + 1}</p>
              <p className="mt-1 font-bold">{member.ign}</p>
              <p className="text-sm text-command2">{member.attendance}% attendance</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

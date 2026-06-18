import { AttendanceChart, GrowthChart } from "@/components/charts";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { operations, rootsOfWarSlotStats, shieldWarnings, stats } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function HomePage() {
  return (
    <div>
      <PageHeader
        title="Home Dashboard"
        description="Live command overview for member readiness, war posture, alerts, shield exposure, and officer workload."
        action={<Button>Create Call to Arms</Button>}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <AttendanceChart />
        <GrowthChart />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <CardHeader>
            <CardTitle>War Operations</CardTitle>
            <Badge>3 active</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {operations.map((operation) => (
              <div key={operation.name} className="rounded-lg border border-border bg-zinc-950 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-zinc-100">{operation.name}</h3>
                    <p className="mt-1 text-sm text-zinc-500">{operation.target}</p>
                  </div>
                  <Badge className="border-command/40 text-command2">{operation.priority}</Badge>
                </div>
                <p className="mt-3 text-xs uppercase text-zinc-500">{formatDate(operation.date)} - {operation.status}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shield Risk</CardTitle>
            <Badge className="border-command/40 text-command2">Officer watch</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {shieldWarnings.map((shield) => (
              <div key={shield.ign} className="flex items-center justify-between rounded-md bg-zinc-950 px-4 py-3">
                <span className="font-semibold text-zinc-100">{shield.ign}</span>
                <span className="text-sm text-zinc-400">{shield.expires}</span>
                <Badge>{shield.risk}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 overflow-hidden">
        <div
          className="grid gap-4 bg-cover bg-center p-5 md:grid-cols-[1fr_auto]"
          style={{ backgroundImage: "linear-gradient(90deg, rgba(9,9,11,0.94), rgba(9,9,11,0.64)), url('/assets/roots-of-war-bg.png')" }}
        >
          <div>
            <Badge className="border-command/50 text-command2">Roots of War</Badge>
            <h3 className="mt-4 text-2xl font-black">Registration windows are open</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {rootsOfWarSlotStats.map((slot) => (
                <div key={slot.slot} className="rounded-lg border border-border bg-zinc-950/80 p-4">
                  <p className="text-sm text-zinc-500">{slot.label}</p>
                  <p className="mt-2 text-xl font-black">{slot.registered} registered</p>
                  <p className="text-sm text-success">{slot.checkedIn} checked in</p>
                </div>
              ))}
            </div>
          </div>
          <img src="/assets/kella.png" alt="Kella" className="hidden max-h-44 object-contain md:block" />
        </div>
      </Card>
    </div>
  );
}

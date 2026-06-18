import { AlertTriangle, Crosshair } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { operations } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function WarPage() {
  return (
    <div>
      <PageHeader
        title="War Operations"
        description="Plan military operations with priority, targets, assignments, war notes, timeline entries, and attendance tracking."
        action={<Button><AlertTriangle className="mr-2 h-4 w-4" /> Call to Arms</Button>}
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Planning Board</CardTitle>
            <Badge>Fortress - Stronghold - Pass - Defense</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {operations.map((operation) => (
              <div key={operation.name} className="rounded-lg border border-border bg-zinc-950 p-4">
                <div className="flex flex-wrap justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black">{operation.name}</h3>
                    <p className="text-sm text-zinc-500">{operation.target}</p>
                  </div>
                  <Badge className="text-command2">{operation.priority}</Badge>
                </div>
                <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
                  <span>Status: {operation.status}</span>
                  <span>Starts: {formatDate(operation.date)}</span>
                  <span>Assignments: 12 squads</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
            <Crosshair className="h-4 w-4 text-command2" />
          </CardHeader>
          <CardContent className="space-y-4">
            {["Scout target confirmed", "Rally captains assigned", "Shield check complete", "CTA ready"].map((item, index) => (
              <div key={item} className="border-l-2 border-command pl-4">
                <p className="font-semibold">{item}</p>
                <p className="text-sm text-zinc-500">{index + 1}h ago</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

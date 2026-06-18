import { ShieldAlert } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { shieldWarnings } from "@/lib/mock-data";

export default function ShieldsPage() {
  return (
    <div>
      <PageHeader
        title="Shield Tracking"
        description="Track shield expirations with 24h, 12h, 6h, 1h, and 15m warnings plus officer notifications."
        action={<Button>Update Shield</Button>}
      />
      <Card>
        <CardHeader>
          <CardTitle>Warning System</CardTitle>
          <ShieldAlert className="h-4 w-4 text-command2" />
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {shieldWarnings.map((warning) => (
            <div key={warning.ign} className="rounded-lg border border-border bg-zinc-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">{warning.ign}</h3>
                <Badge>{warning.risk}</Badge>
              </div>
              <p className="mt-6 text-2xl font-black text-command2">{warning.expires}</p>
              <p className="mt-1 text-sm text-zinc-500">until shield expires</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

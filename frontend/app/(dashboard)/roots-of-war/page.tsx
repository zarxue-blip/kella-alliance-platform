import { Swords } from "lucide-react";
import { botName } from "@/lib/shared";
import { PageHeader } from "@/components/page-header";
import { RootsOfWarPanel } from "@/components/roots-of-war-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { rootsOfWarRegistrants, rootsOfWarSlotStats } from "@/lib/mock-data";
import { compactNumber } from "@/lib/utils";

export default function RootsOfWarPage() {
  return (
    <div>
      <PageHeader
        title="Roots of War Registration"
        description="Register members for the 14:00 UTC or 20:00 UTC Roots of War slot, then run attendance checks from the dashboard or Kella in Discord."
        action={<Button><Swords className="mr-2 h-4 w-4" /> Open Registration</Button>}
      />

      <section
        className="mb-6 overflow-hidden rounded-lg border border-border bg-cover bg-center"
        style={{ backgroundImage: "linear-gradient(90deg, rgba(9,9,11,0.92), rgba(9,9,11,0.55)), url('/assets/roots-of-war-bg.png')" }}
      >
        <div className="grid gap-6 p-5 md:grid-cols-[1fr_220px] md:p-8">
          <div>
            <Badge className="border-command/50 text-command2">Kella Event Control</Badge>
            <h3 className="mt-5 max-w-2xl text-3xl font-black text-zinc-50 md:text-5xl">Roots of War slots are ready for command.</h3>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300">
              Members choose one UTC slot. Officers can check attendance manually, while Discord users can run
              <span className="font-semibold text-command2"> /roots-of-war check-in</span> with Kella.
            </p>
          </div>
          <div className="flex items-end justify-center">
            <img src="/assets/kella.png" alt={botName} className="max-h-56 object-contain drop-shadow-2xl" />
          </div>
        </div>
      </section>

      <RootsOfWarPanel slots={rootsOfWarSlotStats} />

      <Card className="mt-4 overflow-hidden">
        <CardHeader>
          <CardTitle>Roots of War Roster</CardTitle>
          <Badge>Live from MongoDB API</Badge>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead className="bg-zinc-950 text-xs uppercase text-zinc-500">
              <tr>
                <th className="px-4 py-3 text-left">IGN</th>
                <th className="px-4 py-3 text-left">Slot</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Power</th>
              </tr>
            </thead>
            <tbody>
              {rootsOfWarRegistrants.map((member) => (
                <tr key={`${member.ign}-${member.slot}`} className="border-t border-border">
                  <td className="px-4 py-3 font-semibold text-zinc-100">{member.ign}</td>
                  <td className="px-4 py-3 text-zinc-300">{member.slot}</td>
                  <td className="px-4 py-3"><Badge>{member.status}</Badge></td>
                  <td className="px-4 py-3 text-zinc-400">{compactNumber(member.power)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

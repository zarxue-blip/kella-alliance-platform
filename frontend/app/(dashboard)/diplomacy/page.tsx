import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const agreements = [
  { type: "Allies", tag: "DKL", note: "Shared pass defense and behemoth coordination." },
  { type: "NAP Agreements", tag: "RFX", note: "No rallies inside valley border until kingdom reset." },
  { type: "Enemies", tag: "VNM", note: "Open conflict after fortress breach." },
  { type: "Friendly Alliances", tag: "LYR", note: "Recruitment referrals and scout intel exchange." }
];

export default function DiplomacyPage() {
  return (
    <div>
      <PageHeader
        title="Diplomacy Center"
        description="Track allies, NAP agreements, enemies, friendly alliances, agreement terms, notes, and history."
        action={<Button>Add Agreement</Button>}
      />
      <Card>
        <CardHeader>
          <CardTitle>Alliance Relations</CardTitle>
          <Badge>History enabled</Badge>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {agreements.map((agreement) => (
            <div key={agreement.tag} className="rounded-lg border border-border bg-zinc-950 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black">{agreement.tag}</h3>
                <Badge>{agreement.type}</Badge>
              </div>
              <p className="mt-4 text-sm text-zinc-400">{agreement.note}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

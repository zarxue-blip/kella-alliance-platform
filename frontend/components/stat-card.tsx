import { Card, CardContent } from "@/components/ui/card";

export function StatCard({ label, value, change }: { label: string; value: string; change: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs uppercase text-zinc-500">{label}</p>
        <div className="mt-3 flex items-end justify-between gap-3">
          <span className="text-2xl font-black text-zinc-50">{value}</span>
          <span className="rounded-md bg-zinc-900 px-2 py-1 text-xs font-semibold text-command2">{change}</span>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { CheckCircle2, Clock3 } from "lucide-react";
import { apiBaseUrl } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RootsOfWarSlotCard {
  slot: string;
  label: string;
  registered: number;
  checkedIn: number;
  marshal: string;
}

export function RootsOfWarPanel({ slots }: { slots: RootsOfWarSlotCard[] }) {
  const [message, setMessage] = useState("Choose a Roots of War slot to register or check attendance.");
  const [busy, setBusy] = useState<string | null>(null);

  async function submit(action: "register" | "check-in", slot: string, label: string) {
    setBusy(`${action}:${slot}`);
    setMessage("Kella is syncing with the command center...");
    try {
      const response = await fetch(`${apiBaseUrl}/roots-of-war/${action}`, {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slot })
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Request failed" }));
        throw new Error(error.message);
      }
      setMessage(action === "register" ? `Registered for Roots of War at ${label}.` : `Attendance checked for Roots of War at ${label}.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Kella could not sync this action.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      <div className="mb-4 rounded-lg border border-border bg-zinc-950 px-4 py-3 text-sm text-zinc-300">{message}</div>
      <div className="grid gap-4 lg:grid-cols-2">
        {slots.map((slot) => (
          <Card key={slot.slot}>
            <CardHeader>
              <div>
                <CardTitle>{slot.label} Slot</CardTitle>
                <p className="mt-1 text-sm text-zinc-500">Marshal: {slot.marshal}</p>
              </div>
              <Badge>{slot.slot}</Badge>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-zinc-950 p-4">
                  <Clock3 className="h-5 w-5 text-command2" />
                  <p className="mt-3 text-2xl font-black">{slot.registered}</p>
                  <p className="text-sm text-zinc-500">registered</p>
                </div>
                <div className="rounded-lg bg-zinc-950 p-4">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <p className="mt-3 text-2xl font-black">{slot.checkedIn}</p>
                  <p className="text-sm text-zinc-500">attendance checked</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button disabled={busy !== null} onClick={() => submit("register", slot.slot, slot.label)}>
                  {busy === `register:${slot.slot}` ? "Registering..." : `Register ${slot.label}`}
                </Button>
                <Button disabled={busy !== null} variant="secondary" onClick={() => submit("check-in", slot.slot, slot.label)}>
                  {busy === `check-in:${slot.slot}` ? "Checking..." : "Attendance Check"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

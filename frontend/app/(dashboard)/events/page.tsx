import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const calendar = [
  { day: "18", title: "Roots of War 14 UTC", rsvp: 438 },
  { day: "18", title: "Roots of War 20 UTC", rsvp: 521 },
  { day: "19", title: "Training Rotation", rsvp: 512 },
  { day: "20", title: "Behemoth Window", rsvp: 930 },
  { day: "21", title: "Officer Meeting", rsvp: 64 }
];

export default function EventsPage() {
  return (
    <div>
      <PageHeader
        title="Event Management"
        description="Manage RSVP, Roots of War slot registration, attendance links, automatic reminders, and calendar-ready alliance schedules."
        action={<Link href="/roots-of-war" className="inline-flex h-10 items-center justify-center rounded-md bg-command px-4 text-sm font-semibold text-white transition hover:bg-red-600">Roots of War Registration</Link>}
      />
      <Card>
        <CardHeader>
          <CardTitle>Calendar View</CardTitle>
          <CalendarDays className="h-4 w-4 text-command2" />
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {calendar.map((event) => (
            <div key={event.title} className="rounded-lg border border-border bg-zinc-950 p-5">
              <p className="text-3xl font-black text-command2">Jun {event.day}</p>
              <h3 className="mt-4 font-bold">{event.title}</h3>
              <Badge className="mt-4">{event.rsvp} RSVP</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

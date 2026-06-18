import { Megaphone } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const templates = ["War Alert", "Summit Reminder", "Recruitment", "Emergency Defense", "Maintenance"];

export default function AnnouncementsPage() {
  return (
    <div>
      <PageHeader
        title="Announcements"
        description="Build rich Discord embeds, dashboard notices, templates, and scheduled announcements from one place."
        action={<Button><Megaphone className="mr-2 h-4 w-4" /> Schedule</Button>}
      />
      <div className="grid gap-4 xl:grid-cols-[380px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Embed Builder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Title" />
            <Input placeholder="Message" />
            <Input placeholder="Schedule date and time" />
            <Button className="w-full">Preview Announcement</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Templates</CardTitle>
            <Badge>5 ready</Badge>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {templates.map((template) => (
              <div key={template} className="rounded-lg border border-border bg-zinc-950 p-5">
                <h3 className="font-bold">{template}</h3>
                <p className="mt-2 text-sm text-zinc-500">Discord embed, dashboard notification, and reminder schedule.</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

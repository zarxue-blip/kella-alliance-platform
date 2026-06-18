import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const roles = ["Owner", "Leader", "R4 Officer", "War Marshal", "Recruiter", "Event Manager", "Member"];

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage alliance identity, Discord OAuth2, command permissions, notification channels, and module-level access."
        action={<Button>Save Settings</Button>}
      />
      <Card>
        <CardHeader>
          <CardTitle>Permission System</CardTitle>
          <Badge>Role based</Badge>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {roles.map((role) => (
            <div key={role} className="rounded-lg border border-border bg-zinc-950 p-4">
              <h3 className="font-bold">{role}</h3>
              <p className="mt-2 text-sm text-zinc-500">Module permissions synced across dashboard, API, and Discord bot actions.</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

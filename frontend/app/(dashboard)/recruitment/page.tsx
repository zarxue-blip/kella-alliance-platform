import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { recruitmentPipeline } from "@/lib/mock-data";

export default function RecruitmentPage() {
  return (
    <div>
      <PageHeader
        title="Recruitment Center"
        description="Collect applications, triage candidates, run interviews, and move recruits through a controlled pipeline."
        action={<Button>Share Application Form</Button>}
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_380px]">
        <Card>
          <CardHeader>
            <CardTitle>Recruiter Dashboard</CardTitle>
            <Badge>Pipeline</Badge>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-5">
            {recruitmentPipeline.map((stage) => (
              <div key={stage.status} className="rounded-lg border border-border bg-zinc-950 p-4">
                <p className="text-sm text-zinc-500">{stage.status}</p>
                <p className="mt-3 text-3xl font-black">{stage.count}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Application Form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="IGN" />
            <Input placeholder="Power" />
            <Input placeholder="Timezone" />
            <Input placeholder="Previous Alliance" />
            <Button className="w-full">Submit Application</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

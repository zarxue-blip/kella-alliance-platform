import { AttendanceChart, GrowthChart } from "@/components/charts";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Exportable charts for attendance, member growth, recruitment funnel, war participation, and activity trends."
        action={<Button>Export PDF</Button>}
      />
      <div className="grid gap-4 xl:grid-cols-2">
        <AttendanceChart />
        <GrowthChart />
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Export Center</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {["Attendance CSV", "War Participation CSV", "Executive PDF"].map((item) => (
            <Button key={item} variant="secondary">{item}</Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

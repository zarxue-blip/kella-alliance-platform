import { Download, Upload, Users } from "lucide-react";
import { MemberTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function MembersPage() {
  return (
    <div>
      <PageHeader
        title="Member Database"
        description="Search, filter, sort, bulk edit, import, and export Call of Dragons member records with officer-grade auditability."
        action={
          <div className="flex gap-2">
            <Button variant="secondary"><Upload className="mr-2 h-4 w-4" /> Import CSV</Button>
            <Button><Download className="mr-2 h-4 w-4" /> Export CSV</Button>
          </div>
        }
      />
      <Card className="mb-4">
        <CardContent className="grid gap-3 p-4 md:grid-cols-[1fr_180px_180px_auto]">
          <Input placeholder="Search IGN, UID, or Discord ID" />
          <Input placeholder="Role" />
          <Input placeholder="Alliance" />
          <Button variant="secondary"><Users className="mr-2 h-4 w-4" /> Bulk Edit</Button>
        </CardContent>
      </Card>
      <MemberTable />
    </div>
  );
}

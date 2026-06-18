import { KanbanBoard } from "@/components/kanban-board";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

export default function TasksPage() {
  return (
    <div>
      <PageHeader
        title="Task Board"
        description="Officer Kanban with assignments, due dates, comments, and attachments for alliance operations."
        action={<Button>New Task</Button>}
      />
      <KanbanBoard />
    </div>
  );
}

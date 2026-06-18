import { taskColumns } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function KanbanBoard() {
  return (
    <div className="grid gap-4 xl:grid-cols-5">
      {taskColumns.map((column) => (
        <div key={column.status} className="min-w-0">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-100">{column.status}</h3>
            <Badge>{column.tasks.length}</Badge>
          </div>
          <div className="space-y-3">
            {column.tasks.map((task) => (
              <Card key={task.title} className="p-4">
                <p className="font-semibold text-zinc-100">{task.title}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                  <span>{task.assignee}</span>
                  <span>{task.due}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

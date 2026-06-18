import type { ReactNode } from "react";

export function PageHeader({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <p className="text-xs font-semibold uppercase text-command2">Alliance Command</p>
        <h2 className="mt-2 text-2xl font-black text-zinc-50 md:text-3xl">{title}</h2>
        <p className="mt-2 max-w-3xl text-sm text-zinc-400">{description}</p>
      </div>
      {action}
    </div>
  );
}

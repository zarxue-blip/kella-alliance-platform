"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  CalendarDays,
  ClipboardList,
  Handshake,
  Home,
  Megaphone,
  Settings,
  Shield,
  Swords,
  UserPlus,
  Users
} from "lucide-react";
import { appName, botName } from "@/lib/shared";
import { discordLoginUrl } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRealtime } from "@/components/realtime-provider";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/members", label: "Members", icon: Users },
  { href: "/attendance", label: "Attendance", icon: ClipboardList },
  { href: "/roots-of-war", label: "Roots of War", icon: Swords },
  { href: "/war", label: "War Ops", icon: Swords },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/shields", label: "Shields", icon: Shield },
  { href: "/recruitment", label: "Recruitment", icon: UserPlus },
  { href: "/tasks", label: "Tasks", icon: ClipboardList },
  { href: "/diplomacy", label: "Diplomacy", icon: Handshake },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/announcements", label: "Announcements", icon: Megaphone },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { connected, notifications } = useRealtime();

  return (
    <div className="min-h-screen bg-background text-foreground grid-radial">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-border bg-zinc-950/86 px-4 py-5 lg:block">
          <Link href="/" className="mb-7 flex items-center gap-3 px-2">
            <span className="flex h-12 w-12 items-end justify-center overflow-hidden rounded-lg bg-zinc-900 shadow-glow ring-1 ring-border">
              <img src="/assets/kella.png" alt={botName} className="h-12 w-auto object-contain" />
            </span>
            <span>
              <span className="block text-lg font-black">{appName}</span>
              <span className="text-xs uppercase text-zinc-500">{botName} Alliance Command</span>
            </span>
          </Link>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100",
                    active && "bg-zinc-900 text-zinc-100 ring-1 ring-border"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/86 px-4 backdrop-blur md:px-6">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-xs uppercase text-zinc-500">Live Alliance State</p>
                <h1 className="text-base font-bold text-zinc-100 md:text-lg">{botName} is tracking registrations, alerts, and attendance</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={connected ? "border-success/40 text-success" : "border-warning/40 text-warning"}>{connected ? "Realtime Online" : "Realtime Standby"}</Badge>
              <div className="relative">
                <Bell className="h-5 w-5 text-zinc-300" />
                {notifications.length > 0 && <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-command" />}
              </div>
              <a href={discordLoginUrl()}>
                <Button className="hidden md:inline-flex">Discord Login</Button>
              </a>
            </div>
          </header>

          <nav className="flex gap-2 overflow-x-auto border-b border-border bg-zinc-950/72 px-4 py-2 lg:hidden">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-md border border-transparent px-3 py-2 text-xs font-semibold text-zinc-400",
                    active && "border-border bg-zinc-900 text-zinc-100"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <main className="battle-grid flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

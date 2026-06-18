import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-command text-white hover:bg-red-600",
  secondary: "border border-border bg-panel2 text-zinc-100 hover:border-zinc-500",
  ghost: "text-zinc-300 hover:bg-zinc-800 hover:text-white",
  danger: "bg-red-700 text-white hover:bg-red-600"
};

export function Button({ className, variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      className={cn("inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50", variants[variant], className)}
      {...props}
    />
  );
}

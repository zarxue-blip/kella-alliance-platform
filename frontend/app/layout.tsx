import type { Metadata } from "next";
import "./globals.css";
import { RealtimeProvider } from "@/components/realtime-provider";

export const metadata: Metadata = {
  title: "Dragon Command",
  description: "Alliance Management Platform for Call of Dragons"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <RealtimeProvider>{children}</RealtimeProvider>
      </body>
    </html>
  );
}

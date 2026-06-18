"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { io } from "socket.io-client";
import { realtimeEvents, type NotificationDto } from "@cod-amp/shared";
import { apiBaseUrl } from "@/lib/api";

interface RealtimeContextValue {
  notifications: NotificationDto[];
  connected: boolean;
}

const RealtimeContext = createContext<RealtimeContextValue>({ notifications: [], connected: false });

export function RealtimeProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const token = typeof window !== "undefined" ? window.localStorage.getItem("cod_amp_token") : undefined;
    const socket = io(apiBaseUrl.replace(/\/api$/, ""), {
      withCredentials: true,
      auth: token ? { token } : undefined,
      autoConnect: true
    });

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    socket.on(realtimeEvents.notification, (notification: NotificationDto) => {
      setNotifications((current) => [notification, ...current].slice(0, 10));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const value = useMemo(() => ({ notifications, connected }), [notifications, connected]);
  return <RealtimeContext.Provider value={value}>{children}</RealtimeContext.Provider>;
}

export function useRealtime() {
  return useContext(RealtimeContext);
}

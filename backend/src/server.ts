import { createServer } from "node:http";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import { createApp } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { registerRealtimeServer } from "./services/realtime.service.js";
import { startSchedulers } from "./services/scheduler.service.js";
import type { TokenPayload } from "./middleware/auth.js";

function readCookie(header: string | undefined, name: string) {
  if (!header) return undefined;
  return header
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

async function bootstrap() {
  await connectDatabase();

  const app = createApp();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: env.FRONTEND_ORIGIN,
      credentials: true
    }
  });

  io.use((socket, next) => {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers.authorization?.replace(/^Bearer\s+/i, "") ||
      readCookie(socket.handshake.headers.cookie, env.SESSION_COOKIE_NAME);
    if (!token) {
      next(new Error("Authentication required"));
      return;
    }
    try {
      const payload = jwt.verify(String(token), env.JWT_SECRET) as TokenPayload;
      socket.data.user = payload;
      socket.join(`alliance:${payload.allianceId}`);
      next();
    } catch {
      next(new Error("Invalid realtime session"));
    }
  });

  io.on("connection", (socket) => {
    socket.emit("connected", { socketId: socket.id });
  });

  registerRealtimeServer(io);
  startSchedulers();

  httpServer.listen(env.PORT, () => {
    console.log(`Alliance API listening on port ${env.PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});

import { recoverMissingToxicMain } from './services/memberRecovery.service.js';
import { createServer } from "node:http";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import { createApp } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { registerRealtimeServer, updateRealtimeAccess } from "./services/realtime.service.js";
import { startSchedulers } from "./services/scheduler.service.js";
import { hasVipAccess, isValidMemberSession, type TokenPayload } from "./middleware/auth.js";
import { UserModel } from "./models/user.model.js";

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
  // Preserve payment tracking for local and Google signups. Approval now grants
  // regular access; verified membership separately grants VIP tools.
  await UserModel.updateMany({ $or: [
    { localApprovalStatus: { $exists: true } }, { googleApprovalStatus: { $exists: true } }
  ] }, { $set: { kofiPaymentRequired: true } });
  await recoverMissingToxicMain().catch((error) => console.error("Toxic recovery failed; server will continue", error));

  const app = createApp();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: env.FRONTEND_ORIGIN,
      credentials: true
    }
  });

  io.use(async (socket, next) => {
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
      const user = await UserModel.findById(payload.id).lean() as any;
      if (!isValidMemberSession(user)) {
        next(new Error("Session is no longer valid"));
        return;
      }
      if (!hasVipAccess(user)) {
        next(new Error("Guardian membership is required for realtime tools"));
        return;
      }
      await updateRealtimeAccess(socket, user);
      next();
    } catch {
      next(new Error("Invalid realtime session"));
    }
  });

  io.on("connection", (socket) => {
    socket.emit("connected", { socketId: socket.id });
    let accessTimer: ReturnType<typeof setTimeout>;
    const checkAccess = async () => {
      if (!socket.connected) return;
      try {
        const user = await UserModel.findById(socket.data.user.id).lean() as any;
        if (!hasVipAccess(user)) return void socket.disconnect(true);
        await updateRealtimeAccess(socket, user);
        const paidThrough = new Date(user.kofiPaidThrough).getTime();
        const nextCheck = paidThrough > Date.now() ? Math.min(paidThrough - Date.now(), 60_000) : 60_000;
        accessTimer = setTimeout(checkAccess, Math.max(1, nextCheck));
      } catch { socket.disconnect(true); }
    };
    void checkAccess();
    socket.on("disconnect", () => clearTimeout(accessTimer));
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

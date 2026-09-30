import { recoverMissingToxicMain } from './services/memberRecovery.service.js';
import { createServer } from "node:http";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import { createApp } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { registerRealtimeServer } from "./services/realtime.service.js";
import { startSchedulers } from "./services/scheduler.service.js";
import { isValidMemberSession, type TokenPayload } from "./middleware/auth.js";
import { UserModel } from "./models/user.model.js";
import { requiresKofiPayment } from "./services/kofiPayment.service.js";

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
  // Every local and Google signup follows the same payment policy, including earlier approvals.
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
      socket.data.user = { ...payload, id: user._id.toString(), role: user.role, allianceId: user.allianceId.toString() };
      if (requiresKofiPayment(user)) {
        socket.data.kofiPaidThrough = new Date(user.kofiPaidThrough).getTime();
      }
      socket.join(`alliance:${user.allianceId.toString()}`);
      next();
    } catch {
      next(new Error("Invalid realtime session"));
    }
  });

  io.on("connection", (socket) => {
    socket.emit("connected", { socketId: socket.id });
    if (Number.isFinite(socket.data.kofiPaidThrough)) {
      let expiryTimer: ReturnType<typeof setTimeout>;
      const checkExpiry = async () => {
        if (!socket.connected) return;
        const remaining = socket.data.kofiPaidThrough - Date.now();
        if (remaining <= 0) {
          try {
            const user = await UserModel.findById(socket.data.user.id).lean() as any;
            if (!isValidMemberSession(user)) {
              socket.disconnect(true);
              return;
            }
            if (!requiresKofiPayment(user)) return;
            socket.data.kofiPaidThrough = new Date(user.kofiPaidThrough).getTime();
          } catch {
            socket.disconnect(true);
            return;
          }
        }
        expiryTimer = setTimeout(checkExpiry, Math.min(Math.max(socket.data.kofiPaidThrough - Date.now(), 1), 86_400_000));
      };
      void checkExpiry();
      socket.on("disconnect", () => clearTimeout(expiryTimer));
    }
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

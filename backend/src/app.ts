import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { apiRouter } from "./routes/index.js";
import { kellaDashboardHtml } from "./views/kellaDashboard.js";

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          "script-src": ["'self'", "'unsafe-inline'"],
          "style-src": ["'self'", "'unsafe-inline'"],
          "img-src": ["'self'", "data:", "https:"]
        }
      }
    })
  );
  app.use(
    cors({
      origin: env.FRONTEND_ORIGIN,
      credentials: true
    })
  );
  app.use(compression());
  app.use(cookieParser());
  app.use(express.json({ limit: "12mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
  app.use(rateLimit({ windowMs: 60_000, limit: 240 }));
  app.use("/assets", express.static("backend/public", { maxAge: "7d", immutable: true }));

  app.get(
    [
      "/",
      "/members",
      "/roots-registration",
      "/roots-reports",
      "/roots-reports/:id",
      "/events",
      "/alerts",
      "/shield-alerts",
      "/embed-sender",
      "/complaints",
      "/settings"
    ],
    (_req, res) => {
      res.type("html").send(kellaDashboardHtml());
    }
  );

  app.use("/api", apiRouter);
  app.use(errorHandler);

  return app;
}

import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { env } from "./config/env.js";
import {
  authenticate,
  authenticateDashboardAdmin,
  authenticateDashboardWikiEditor,
  hasPrivateSiteSession,
  hasEvoMemberAccess,
  type AuthenticatedRequest
} from "./middleware/auth.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { botRouter } from "./routes/bot.routes.js";
import { apiRouter } from "./routes/index.js";
import { gameReviewRouter } from "./routes/gameReview.routes.js";
import { kellaPageHtml, kellaPageAssets } from "./views/kellaPage.js";
import { baseGameDeniedHtml, baseGameHtml } from "./views/baseGamePage.js";
import { HttpError } from "./utils/httpError.js";

const appDir = dirname(fileURLToPath(import.meta.url));
const publicDir = join(appDir, "..", "public");

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);

  app.use(cookieParser());

  app.get("/health", (_req, res) => {
    res.status(200).send("OK");
  });

  app.use(async (req, res, next) => {
    if (process.env.KELLA_LOCKDOWN !== "true") {
      return next();
    }

    if (
      req.path === "/health" ||
      req.path === "/favicon.ico" ||
      req.path === "/apple-touch-icon.png" ||
      req.path.startsWith("/assets/") ||
      req.path.startsWith("/api/auth/")
    ) {
      return next();
    }

    const ownerKey = process.env.KELLA_OWNER_KEY;

    if (
      ownerKey &&
      typeof req.query.owner === "string" &&
      req.query.owner === ownerKey
    ) {
      res.cookie("kella_owner", ownerKey, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
      });

      return res.redirect("/");
    }

    if (ownerKey && req.cookies.kella_owner === ownerKey) {
      return next();
    }

    if (await hasPrivateSiteSession(req.cookies?.[env.SESSION_COOKIE_NAME])) {
      return next();
    }

    return res
      .status(404)
      .type("text/plain")
      .send("404 Not Found");
  });

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          "script-src": ["'self'", "'unsafe-inline'"],
          "style-src": ["'self'", "'unsafe-inline'"],
          "img-src": ["'self'", "data:", "blob:", "https:"]
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
  app.use(express.json({ limit: "12mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
  app.use(rateLimit({ windowMs: 60_000, limit: 240 }));

  app.get("/assets/:file", (req, res, next) => {
    const asset = kellaPageAssets.get(req.path);

    if (!asset) {
      return next();
    }

    res
      .set("Cache-Control", "public, max-age=31536000, immutable")
      .type(asset.type)
      .send(asset.body);
  });

  app.use(
    "/assets",
    express.static(publicDir, {
      maxAge: "7d",
      immutable: true
    })
  );

  app.get("/favicon.ico", (_req, res) =>
    res.sendFile(join(publicDir, "kella-favicon.png"))
  );

  app.get("/apple-touch-icon.png", (_req, res) =>
    res.sendFile(join(publicDir, "kella-logo.png"))
  );

  app.use("/bot", botRouter);
  app.use("/game-review", gameReviewRouter);

  app.get("/base", (req, res) => {
    authenticate(req, res, (error?: unknown) => {
      if (error) {
        const status =
          error instanceof HttpError
            ? error.statusCode
            : 401;

        res
          .set("Cache-Control", "private, no-store")
          .status(status)
          .type("html")
          .send(baseGameDeniedHtml(false));

        return;
      }

      const user = (req as AuthenticatedRequest).user;
      const has881Role = hasEvoMemberAccess(user);

      if (!has881Role) {
        res
          .set("Cache-Control", "private, no-store")
          .status(403)
          .type("html")
          .send(baseGameDeniedHtml(true));

        return;
      }

      res
        .set("Cache-Control", "private, no-store")
        .type("html")
        .send(baseGameHtml);
    });
  });

  app.get(
    [
      "/",
      "/calendar",
      "/rankings",
      "/officer",
      "/profile",
      "/migration",
      "/migration/admin",
      "/wiki",
      "/wiki/:slug",
      "/members",
      "/lord-tools",
      "/research",
      "/training-tools",
      "/attendance",
      "/attendance/:id",
      "/tools",
      "/events",
      "/alerts",
      "/shield-alerts",
      "/embed-sender",
      "/complains",
      "/complaints",
      "/settings"
    ],
    (req, res) => {
      const adminPaths = [
        "/officer",
        "/migration/admin",
        "/tools",
        "/events",
        "/alerts",
        "/shield-alerts",
        "/embed-sender",
        "/complaints",
        "/settings"
      ];

      const guard =
        adminPaths.includes(req.path) ||
        (req.path === "/members" && req.query.manage === "1")
          ? authenticateDashboardAdmin
          : req.path === "/wiki" && req.query.edit === "1"
            ? authenticateDashboardWikiEditor
            : null;

      const sendPage = (error?: unknown) => {
        res
          .set("Cache-Control", "private, no-store")
          .status(error ? 403 : 200)
          .type("html")
          .send(kellaPageHtml);
      };

      if (guard) {
        guard(req, res, sendPage);
      } else {
        sendPage();
      }
    }
  );

  app.use("/api", apiRouter);
  app.use(errorHandler);

  return app;
}

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

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(
    cors({
      origin: env.FRONTEND_ORIGIN,
      credentials: true
    })
  );
  app.use(compression());
  app.use(cookieParser());
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
  app.use(rateLimit({ windowMs: 60_000, limit: 240 }));

  app.get("/", (_req, res) => {
    res.type("html").send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Kella Alliance Assistant</title>
    <style>
      body { margin: 0; background: #09090b; color: #f4f4f5; font-family: Inter, system-ui, sans-serif; }
      main { min-height: 100vh; display: grid; place-items: center; padding: 32px; background: radial-gradient(circle at top, #7f1d1d66, transparent 42%), #09090b; }
      section { width: min(920px, 100%); border: 1px solid #27272a; border-radius: 12px; background: #18181bcc; padding: 32px; box-shadow: 0 20px 80px #0008; }
      h1 { margin: 0; font-size: clamp(32px, 7vw, 72px); line-height: 0.95; }
      p { color: #d4d4d8; font-size: 18px; line-height: 1.7; }
      .grid { display: grid; gap: 12px; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 28px; }
      .card { border: 1px solid #3f3f46; border-radius: 10px; padding: 18px; background: #09090b; }
      a { color: #facc15; font-weight: 700; }
    </style>
  </head>
  <body>
    <main>
      <section>
        <h1>Kella is online.</h1>
        <p>Kella enhances Discord for Call of Dragons alliances with fast shield alerts, attack alerts, Roots of War registration, summit attendance, check-ins, absences, and applications.</p>
        <div class="grid">
          <div class="card">API status: <a href="/api/health">healthy</a></div>
          <div class="card">Bot commands: /shield /attack /roots /summit /checkin /apply</div>
          <div class="card">Dashboard: deploy the frontend static site next</div>
        </div>
      </section>
    </main>
  </body>
</html>`);
  });

  app.use("/api", apiRouter);
  app.use(errorHandler);

  return app;
}

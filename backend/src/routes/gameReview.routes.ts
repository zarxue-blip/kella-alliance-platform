import { Router } from "express";
import { join } from "node:path";
import { authenticate, type AuthenticatedRequest } from "../middleware/auth.js";
import { lordResearchTreeData } from "../data/researchTree.data.js";
import { gameReviewDirectory, verifyGameReviewOwner } from "../services/gameReviewBundle.service.js";

// One individual account; dashboard roles and shared service tokens do not grant access.
export const gameReviewRouter = Router();
gameReviewRouter.use((_req, res, next) => {
  res.set({ "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow, noarchive", "Referrer-Policy": "no-referrer" });
  next();
});
gameReviewRouter.use(authenticate);
gameReviewRouter.use((req, res, next) => {
  verifyGameReviewOwner((req as AuthenticatedRequest).user.discordId)
    .then(allowed => allowed ? next() : res.status(404).send("Not found"))
    .catch(() => res.status(404).send("Not found"));
});
gameReviewRouter.get("/research.json", (_req, res) => res.json(lordResearchTreeData));
const files: Record<string, string> = {
  "/": "index.html", "/style.css": "style.css", "/app.js": "app.js",
  "/freya.mp4": "freya.mp4", "/base.mp4": "base.mp4", "/base.jpg": "base.jpg", "/freya.jpg": "freya.jpg"
};
gameReviewRouter.get(Object.keys(files), (req, res, next) => {
  gameReviewDirectory().then(privateDir => {
    res.sendFile(join(privateDir, files[req.path]), { cacheControl: false }, (error) => {
      if (error) next(error);
    });
  }).catch(() => res.status(503).send("Private review is temporarily unavailable."));
});

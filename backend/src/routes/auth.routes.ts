import { Router } from "express";
import { discordCallback, getMe, logout, startDiscordLogin } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.js";
import { completeGoogleSignup, googleCallback, startGoogleLogin } from "../controllers/googleAuth.controller.js";
import rateLimit from "express-rate-limit";
import { localLogin, localSignup } from "../controllers/localAuth.controller.js";

export const authRouter = Router();

authRouter.get("/discord", startDiscordLogin);
authRouter.get("/discord/callback", discordCallback);
authRouter.get("/google", startGoogleLogin);
authRouter.post("/google/signup", startGoogleLogin);
authRouter.get("/google/callback", googleCallback);
authRouter.post("/google/complete", completeGoogleSignup);
const localSignupLimit = rateLimit({ windowMs: 60 * 60 * 1000, limit: 5, standardHeaders: "draft-7", legacyHeaders: false,
  handler: (req, res) => req.is("application/x-www-form-urlencoded")
    ? res.redirect(303, "/kingdom/access?status=rate-limited")
    : res.status(429).json({ status: "rate-limited" }) });
const localLoginLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: "draft-7", legacyHeaders: false,
  handler: (req, res) => req.is("application/x-www-form-urlencoded")
    ? res.redirect(303, "/kingdom/access?status=rate-limited")
    : res.status(429).json({ status: "rate-limited" }) });
authRouter.post("/local/signup", localSignupLimit, localSignup);
authRouter.post("/local/login", localLoginLimit, localLogin);
authRouter.get("/me", authenticate, getMe);
authRouter.post("/logout", logout);

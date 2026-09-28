import { Router } from "express";
import { discordCallback, getMe, logout, startDiscordLogin } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.js";
import { completeGoogleSignup, googleCallback, startGoogleLogin } from "../controllers/googleAuth.controller.js";

export const authRouter = Router();

authRouter.get("/discord", startDiscordLogin);
authRouter.get("/discord/callback", discordCallback);
authRouter.get("/google", startGoogleLogin);
authRouter.post("/google/signup", startGoogleLogin);
authRouter.get("/google/callback", googleCallback);
authRouter.post("/google/complete", completeGoogleSignup);
authRouter.get("/me", authenticate, getMe);
authRouter.post("/logout", logout);

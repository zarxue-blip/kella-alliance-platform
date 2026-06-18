import { Router } from "express";
import { discordCallback, getMe, logout, startDiscordLogin } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.js";

export const authRouter = Router();

authRouter.get("/discord", startDiscordLogin);
authRouter.get("/discord/callback", discordCallback);
authRouter.get("/me", authenticate, getMe);
authRouter.post("/logout", logout);

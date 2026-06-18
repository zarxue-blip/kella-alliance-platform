import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { UserRole } from "@cod-amp/shared";
import { env } from "../config/env.js";
import { HttpError } from "../utils/httpError.js";
import { UserModel } from "../models/user.model.js";

export interface AuthUser {
  id: string;
  discordId: string;
  role: UserRole;
  allianceId: string;
}

export interface AuthenticatedRequest extends Request {
  user: AuthUser;
}

export interface TokenPayload extends AuthUser {
  type: "user";
}

export function signSessionToken(user: AuthUser) {
  return jwt.sign({ ...user, type: "user" satisfies TokenPayload["type"] }, env.JWT_SECRET, { expiresIn: "7d" });
}

export async function authenticate(req: Request, _res: Response, next: NextFunction) {
  const bearer = req.header("authorization")?.replace(/^Bearer\s+/i, "");
  const cookieToken = req.cookies?.[env.SESSION_COOKIE_NAME];
  const token = bearer || cookieToken;

  if (!token) {
    next(new HttpError(401, "Authentication required"));
    return;
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    const user = await UserModel.findById(payload.id).lean();
    if (!user || user.disabled) {
      next(new HttpError(401, "Session is no longer valid"));
      return;
    }

    (req as AuthenticatedRequest).user = {
      id: user._id.toString(),
      discordId: user.discordId,
      role: user.role,
      allianceId: user.allianceId.toString()
    };
    next();
  } catch {
    next(new HttpError(401, "Invalid session"));
  }
}

export function authenticateService(req: Request, _res: Response, next: NextFunction) {
  const token = req.header("x-service-token");
  if (token !== env.BOT_API_TOKEN) {
    next(new HttpError(401, "Invalid service token"));
    return;
  }
  next();
}

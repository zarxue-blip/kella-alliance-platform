import { hasPermission, type Permission } from "@cod-amp/shared";
import type { RequestHandler } from "express";
import { isDashboardAdminUser, type AuthenticatedRequest } from "./auth.js";
import { HttpError } from "../utils/httpError.js";

export function requirePermission(permission: Permission): RequestHandler {
  return (req, _res, next) => {
    const authReq = req as AuthenticatedRequest;
    if (!isDashboardAdminUser(authReq.user) && !hasPermission(authReq.user.role, permission)) {
      next(new HttpError(403, `Missing permission: ${permission}`));
      return;
    }
    next();
  };
}

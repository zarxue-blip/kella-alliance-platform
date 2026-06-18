import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { HttpError } from "../utils/httpError.js";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    res.status(400).json({ message: "Validation failed", issues: error.issues });
    return;
  }

  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ message: error.message, details: error.details });
    return;
  }

  const status = error?.statusCode ?? 500;
  res.status(status).json({
    message: status === 500 ? "Internal server error" : error.message,
    details: process.env.NODE_ENV === "production" ? undefined : error.stack
  });
};

import type { Request, Response, NextFunction } from "express";

export const corsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // For development: allow all origins (no credentials)
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Vary", "Origin");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-api-key, projectid, X-Request-Id, X-Request-Timestamp, X-Admin-Token",
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
};

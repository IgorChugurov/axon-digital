import type { Request, Response, NextFunction } from "express";
import type { ServiceConfig } from "../config.js";

export const adminAuthMiddleware = (config: ServiceConfig) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const provided =
      req.header("x-admin-token") || req.header("X-Admin-Token") || "";
    if (!config.adminToken || provided !== config.adminToken) {
      return res.status(401).json({ error: "unauthorized" });
    }
    next();
  };
};

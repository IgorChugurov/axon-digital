import type { Request, Response, NextFunction } from "express";
import type { ServiceConfig } from "../config.js";
import { KeyService } from "../keys/keyService.js";

let keyService: KeyService | null = null;

export const authMiddleware = (config: ServiceConfig) => {
  if (!keyService) {
    keyService = new KeyService({
      redisUrl: config.redisUrl,
      jsonPath: config.keysJsonPath,
    });
    // fire and forget
    keyService.init(config.redisUrl).catch(() => {});
  }
  return async (req: Request, res: Response, next: NextFunction) => {
    if (config.authDisabled) {
      (req as any).apiKey = req.header("x-api-key") || "test-bypass";
      return next();
    }
    const apiKey = req.header("x-api-key") || "";
    const ok = await keyService!.validate(apiKey);
    if (!ok) {
      return res.status(401).json({ error: "unauthorized" });
    }
    (req as any).apiKey = apiKey;
    next();
  };
};

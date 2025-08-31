import type { ServiceConfig } from "../config.js";
import type { Router } from "express";

export declare function adminRouter(config: ServiceConfig): Router;

declare module "./admin/routes.js" {
  import type { ServiceConfig } from "../config.js";
  import type { Router } from "express";
  export function adminRouter(config: ServiceConfig): Router;
}

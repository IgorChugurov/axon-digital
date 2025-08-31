import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";

export interface ErrorLogRecord {
  at: string; // ISO minutes
  message: string;
  route?: string;
  method?: string;
  status?: number;
  apiKeyMasked?: string;
  clientIp?: string;
  stack?: string;
}

export class ErrorLogger {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = path.resolve(filePath);
  }

  async init(): Promise<void> {
    await fsp.mkdir(path.dirname(this.filePath), { recursive: true });
    if (!fs.existsSync(this.filePath)) {
      await fsp.writeFile(this.filePath, "");
    }
  }

  async write(rec: ErrorLogRecord): Promise<void> {
    const line = JSON.stringify(rec) + "\n";
    await fsp.appendFile(this.filePath, line);
  }
}

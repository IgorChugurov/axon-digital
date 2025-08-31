import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";

export interface AccessLogRecord {
  at: string; // ISO string with minutes precision
  apiKeyMasked: string;
  clientIp?: string;
  jobId: string;
  fileName?: string;
  status: string;
  durationMs?: number;
  htmlBytes?: number;
  pdfBytes?: number;
}

export class AccessLogger {
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

  maskKey(key?: string): string {
    if (!key) return "-";
    if (key.length <= 4) return "****";
    const tail = key.slice(-4);
    return `****${tail}`;
  }

  async write(rec: AccessLogRecord): Promise<void> {
    const line = JSON.stringify(rec) + "\n";
    await fsp.appendFile(this.filePath, line);
  }
}

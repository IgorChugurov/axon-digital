import fsp from "node:fs/promises";
import path from "node:path";

export class LogsService {
  private logPath: string;

  constructor(logPath: string) {
    this.logPath = logPath;
  }

  async tail(bytes: number = 50_000): Promise<string> {
    try {
      const stat = await fsp.stat(this.logPath);
      const size = stat.size;
      const start = Math.max(0, size - bytes);
      const fh = await fsp.open(this.logPath, "r");
      try {
        const buf = Buffer.alloc(size - start);
        await fh.read(buf, 0, buf.length, start);
        return buf.toString("utf8");
      } finally {
        await fh.close();
      }
    } catch {
      return "";
    }
  }

  async tailJson(limit: number = 200, bytes: number = 200_000): Promise<any[]> {
    const text = await this.tail(bytes);
    if (!text) return [];
    const lines = text.split(/\n+/).filter((l) => l.trim().length > 0);
    // keep only last `limit` lines and parse
    const sliced = lines.slice(-limit);
    const parsed = sliced
      .map((l) => {
        try {
          return JSON.parse(l);
        } catch {
          return null;
        }
      })
      .filter(Boolean) as any[];
    // newest first
    return parsed.reverse();
  }
}

import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export interface LocalDiskStorageConfig {
  baseDir: string;
}

export class LocalDiskStorage {
  private baseDir: string;
  constructor(config: LocalDiskStorageConfig) {
    this.baseDir = config.baseDir;
  }

  async init(): Promise<void> {
    await fsp.mkdir(this.baseDir, { recursive: true });
  }

  async put(buffer: Buffer): Promise<string> {
    const id = crypto.randomUUID();
    const filePath = path.join(this.baseDir, `${id}.pdf`);
    await fsp.writeFile(filePath, buffer);
    return id;
  }

  getPath(fileId: string): string {
    return path.join(this.baseDir, `${fileId}.pdf`);
  }

  createReadStream(fileId: string) {
    return fs.createReadStream(this.getPath(fileId));
  }

  async delete(fileId: string): Promise<void> {
    const p = this.getPath(fileId);
    try {
      await fsp.unlink(p);
    } catch {
      // ignore
    }
  }

  async cleanupOlderThan(ms: number): Promise<void> {
    const entries = await fsp.readdir(this.baseDir);
    const threshold = Date.now() - ms;
    await Promise.all(
      entries.map(async (name) => {
        if (!name.endsWith(".pdf")) return;
        const full = path.join(this.baseDir, name);
        try {
          const st = await fsp.stat(full);
          if (st.mtimeMs < threshold) await fsp.unlink(full);
        } catch {}
      }),
    );
  }
}

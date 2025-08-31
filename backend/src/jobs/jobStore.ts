import crypto from "node:crypto";
import type { JobRecord, CreatePdfJobInput } from "./jobTypes.js";

export interface JobStoreConfig {
  ttlMs: number;
}

export class JobStore {
  private jobs = new Map<string, JobRecord>();
  private ttlMs: number;

  constructor(config: JobStoreConfig) {
    this.ttlMs = config.ttlMs;
    setInterval(() => this.cleanup(), 60_000).unref();
  }

  public create(input: CreatePdfJobInput): JobRecord {
    const id = crypto.randomUUID();
    const now = Date.now();
    const record: JobRecord = {
      id,
      status: "queued",
      fileName: input.fileName || `document-${now}.pdf`,
      apiKey: input.apiKey,
      clientIp: input.clientIp,
      htmlBytes: input.html?.length,
      createdAt: now,
      updatedAt: now,
    };
    this.jobs.set(id, record);
    return record;
  }

  public update(id: string, patch: Partial<JobRecord>): JobRecord | null {
    const rec = this.jobs.get(id);
    if (!rec) return null;
    const updated = { ...rec, ...patch, updatedAt: Date.now() };
    this.jobs.set(id, updated);
    return updated;
  }

  public get(id: string): JobRecord | null {
    return this.jobs.get(id) || null;
  }

  private cleanup() {
    const now = Date.now();
    for (const [id, rec] of this.jobs) {
      if (now - rec.updatedAt > this.ttlMs) this.jobs.delete(id);
    }
  }
}

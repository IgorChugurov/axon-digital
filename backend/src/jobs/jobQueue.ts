import PQueue from "p-queue";
import type { JobStore } from "./jobStore.js";
import type { CreatePdfJobInput } from "./jobTypes.js";
import type { ServiceConfig } from "../config.js";
import { PdfService } from "../pdfService.js";
import { LocalDiskStorage } from "../storage/localDiskStorage.js";

export class JobQueue {
  private queue: PQueue;
  private pdfService: PdfService;
  private storage: LocalDiskStorage;
  private config: ServiceConfig;
  private jobStore: JobStore;

  constructor(cfg: {
    config: ServiceConfig;
    jobStore: JobStore;
    pdfService: PdfService;
    storage: LocalDiskStorage;
  }) {
    this.config = cfg.config;
    this.jobStore = cfg.jobStore;
    this.pdfService = cfg.pdfService;
    this.storage = cfg.storage;
    this.queue = new PQueue({ concurrency: this.config.concurrency });
  }

  canAccept(): boolean {
    const maxQueue = this.config.maxQueue ?? 100;
    return this.queue.size + this.queue.pending < maxQueue;
  }

  enqueue(jobId: string, input: CreatePdfJobInput): void {
    void this.queue
      .add(async () => {
        this.jobStore.update(jobId, { status: "processing" });
        try {
          const startedAt = Date.now();
          const pdfBuffer = await this.pdfService.renderPdf({
            html: input.html,
            css: input.css,
          });
          if (
            this.config.maxPdfBytes &&
            pdfBuffer.byteLength > this.config.maxPdfBytes
          ) {
            throw new Error("pdf_too_large");
          }
          const fileId = await this.storage.put(pdfBuffer);
          this.jobStore.update(jobId, {
            status: "done",
            fileId,
            pdfBytes: pdfBuffer.byteLength,
            durationMs: Date.now() - startedAt,
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : "render_error";
          this.jobStore.update(jobId, { status: "error", error: message });
        }
      })
      .catch(() => {
        // no-op: errors are handled inside the task; avoid unhandled rejection
      });
  }
}

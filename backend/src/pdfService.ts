import { chromium, type Browser, type Page } from "playwright";
import PQueue from "p-queue";
import type { ServiceConfig } from "./config.js";

export interface PdfRequest {
  html: string;
  css?: string;
}

export class PdfService {
  private browserPromise: Promise<Browser>;
  private queue: PQueue;
  private renderTimeoutMs: number;

  constructor(config: ServiceConfig) {
    this.browserPromise = chromium.launch({ headless: true });
    this.queue = new PQueue({ concurrency: config.concurrency });
    this.renderTimeoutMs = config.renderTimeoutMs;
  }

  public renderPdf(input: PdfRequest): Promise<Buffer> {
    return this.queue.add(() => this.renderOnce(input)) as Promise<Buffer>;
  }

  private async renderOnce(input: PdfRequest): Promise<Buffer> {
    const browser = await this.browserPromise;
    const page: Page = await browser.newPage();
    try {
      // artificial delay for testing if configured
      const artificialDelayMs = (globalThis as any)
        .__PDF_SERVICE_TEST_DELAY_MS as number | undefined;
      if (artificialDelayMs && artificialDelayMs > 0) {
        await new Promise((r) => setTimeout(r, artificialDelayMs));
      }
      await page.emulateMedia({ media: "print" });

      const doc = `<!doctype html><html><head><meta charset="utf-8"/><style>${
        input.css || ""
      }</style></head><body>${input.html}</body></html>`;

      await page.setContent(doc, { waitUntil: "networkidle" });

      const timeoutPromise = new Promise<never>((_, reject) => {
        const id = setTimeout(() => {
          clearTimeout(id);
          reject(new Error("render_timeout"));
        }, this.renderTimeoutMs);
      });

      const pdfPromise = page.pdf({
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: "5mm", right: "5mm", bottom: "5mm", left: "5mm" },
      });

      const pdf = (await Promise.race([pdfPromise, timeoutPromise])) as Buffer;
      return pdf;
    } finally {
      await page.close();
    }
  }
}

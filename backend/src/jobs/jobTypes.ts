export type JobStatus = "queued" | "processing" | "done" | "error";

export interface CreatePdfJobInput {
  html: string;
  css?: string;
  fileName?: string;
  apiKey: string;
  clientIp?: string;
}

export interface JobRecord {
  id: string;
  status: JobStatus;
  error?: string;
  fileId?: string;
  fileName?: string;
  apiKey?: string;
  clientIp?: string;
  htmlBytes?: number;
  pdfBytes?: number;
  durationMs?: number;
  createdAt: number;
  updatedAt: number;
}

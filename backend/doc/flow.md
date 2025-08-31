# Async PDF generation flow

This document describes the asynchronous PDF flow with queue, workers, local-disk storage, and one-time/TTL download tokens, plus scaling options.

## API
- POST /v1/jobs/pdf → 202 { jobId, status: "queued" }
- GET /v1/jobs/:id → queued | processing | done | error
  - done → { downloadUrl: "/v1/download/:token", expiresAt, fileName }
- GET /v1/download/:token → streams PDF, single-use, TTL

## Components
- Job store (in-memory): jobId → { status, fileId?, fileName?, error?, updatedAt }
- Job queue (in-memory): bounded queue with concurrency (2–4), returns 503 when saturated
- PdfService (Playwright): singleton browser, new page per job, JS off/network blocked by default
- Storage (local disk): put/get/delete under ./storage/pdf
- Token service (in-memory): issue/consume tokens with TTL and single-use semantics

## Flow
1) Client POST /v1/jobs/pdf → enqueue → 202 { jobId }
2) Worker renders PDF → store on disk → mark job done with fileId
3) Client GET /v1/jobs/:id → when done, server issues token and returns downloadUrl
4) Client GET /v1/download/:token → server consumes token and streams file

## Limits & security
- Body limit, render timeout, max PDF bytes
- Rate limit/quota per API key
- CORS open in dev; allowlist in prod
- No direct FS paths; only tokenized download

## Scaling
- Single process: in-memory state, concurrency via CONCURRENCY
- pm2 cluster: multiple Node processes → need shared state
  - Replace in-memory queue with Redis + BullMQ
  - Replace in-memory token store with Redis
  - Local disk OK on one host; for multiple hosts use S3/MinIO or shared FS
- Horizontal scaling: Redis queue + Redis tokens + S3/MinIO → stateless API

## Client (browser)
- Submit job → get jobId
- Poll status → get downloadUrl
- Open downloadUrl (single-use, TTL)

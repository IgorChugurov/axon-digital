export const runtime = "nodejs"; // нужен Node (не Edge) для стабильного проксирования
export const dynamic = "force-dynamic";
export const revalidate = 0;

const BACKEND = process.env.PDF_BACKEND_BASE ?? "http://31.220.80.11:3001";
const ALLOW_ORIGINS = (process.env.PDF_CORS_ORIGINS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// CORS заголовки для ответов
function withCors(res: Response, origin: string | null) {
  const h = new Headers(res.headers);
  if (
    origin &&
    (ALLOW_ORIGINS.length === 0 || ALLOW_ORIGINS.includes(origin))
  ) {
    h.set("Access-Control-Allow-Origin", origin);
    h.set("Vary", "Origin");
    h.set("Access-Control-Allow-Credentials", "true");
    h.set("Access-Control-Expose-Headers", "Content-Disposition, Content-Type");
  }
  return new Response(res.body, { status: res.status, headers: h });
}

function getPathFromRequest(req: Request): string[] {
  const pathname = new URL(req.url).pathname;
  const basePrefix = "/api/pdf/";
  const idx = pathname.indexOf(basePrefix);
  const rest = idx >= 0 ? pathname.slice(idx + basePrefix.length) : "";
  return rest.split("/").filter(Boolean);
}

async function proxy(req: Request, path: string[]) {
  const base = BACKEND.endsWith("/") ? BACKEND.slice(0, -1) : BACKEND;
  const target = `${base}/v1/${path.join("/")}`;
  const origin = req.headers.get("origin");
  const headers = new Headers(req.headers);

  // Чистим потенциально проблемные заголовки
  headers.delete("host");
  headers.delete("content-length");

  const init: RequestInit = { method: req.method, headers };

  if (
    req.method !== "GET" &&
    req.method !== "HEAD" &&
    req.method !== "OPTIONS"
  ) {
    // Надёжно прокидываем тело (включая большие HTML)
    init.body = await req.arrayBuffer();
  }

  const resp = await fetch(target, init);
  return withCors(resp, origin);
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  const requestedMethod = req.headers.get("access-control-request-method");
  const requestedHeaders = req.headers.get("access-control-request-headers");
  const h = new Headers();
  if (
    origin &&
    (ALLOW_ORIGINS.length === 0 || ALLOW_ORIGINS.includes(origin))
  ) {
    h.set("Access-Control-Allow-Origin", origin);
    h.set(
      "Vary",
      "Origin, Access-Control-Request-Headers, Access-Control-Request-Method"
    );
  }
  h.set(
    "Access-Control-Allow-Methods",
    requestedMethod ? requestedMethod : "GET,POST,DELETE,HEAD,OPTIONS"
  );
  h.set(
    "Access-Control-Allow-Headers",
    requestedHeaders
      ? requestedHeaders
      : "Content-Type, Authorization, x-api-key, projectid, X-Request-Id, X-Request-Timestamp, X-Admin-Token"
  );
  h.set("Access-Control-Allow-Credentials", "true");
  h.set("Access-Control-Max-Age", "86400");
  return new Response(null, { status: 204, headers: h });
}

export async function GET(req: Request) {
  const path = getPathFromRequest(req);
  return proxy(req, path);
}
export async function POST(req: Request) {
  const path = getPathFromRequest(req);
  return proxy(req, path);
}
export async function HEAD(req: Request) {
  const path = getPathFromRequest(req);
  return proxy(req, path);
}

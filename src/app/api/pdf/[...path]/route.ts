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

export async function OPTIONS(
  req: Request,
  { params }: { params: { path: string[] } }
) {
  const origin = req.headers.get("origin");
  const h = new Headers();
  if (
    origin &&
    (ALLOW_ORIGINS.length === 0 || ALLOW_ORIGINS.includes(origin))
  ) {
    h.set("Access-Control-Allow-Origin", origin);
    h.set("Vary", "Origin");
  }
  h.set("Access-Control-Allow-Methods", "GET,POST,HEAD,OPTIONS");
  h.set("Access-Control-Allow-Headers", "Content-Type, x-api-key");
  h.set("Access-Control-Max-Age", "86400");
  return new Response(null, { status: 204, headers: h });
}

export async function GET(req: Request, ctx: { params: { path: string[] } }) {
  return proxy(req, ctx.params.path);
}
export async function POST(req: Request, ctx: { params: { path: string[] } }) {
  return proxy(req, ctx.params.path);
}
export async function HEAD(req: Request, ctx: { params: { path: string[] } }) {
  return proxy(req, ctx.params.path);
}

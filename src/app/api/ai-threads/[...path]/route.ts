export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Catch-all OPTIONS handler for any /api/ai-threads/* preflight requests
export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  const requestedMethod = req.headers.get("access-control-request-method");
  const requestedHeaders = req.headers.get("access-control-request-headers");

  console.log("🔥 AI-THREADS CATCH-ALL OPTIONS:", {
    url: req.url,
    origin,
    requestedMethod,
    requestedHeaders,
  });

  const headers = new Headers();

  if (origin) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set(
      "Vary",
      "Origin, Access-Control-Request-Headers, Access-Control-Request-Method"
    );
  }

  headers.set(
    "Access-Control-Allow-Methods",
    requestedMethod ? requestedMethod : "GET,POST,PATCH,OPTIONS"
  );
  headers.set(
    "Access-Control-Allow-Headers",
    requestedHeaders
      ? requestedHeaders
      : "Content-Type, Authorization, x-api-key, projectid, X-Request-Id, X-Request-Timestamp, X-Admin-Token"
  );
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set("Access-Control-Max-Age", "86400");

  return new Response(null, { status: 204, headers });
}



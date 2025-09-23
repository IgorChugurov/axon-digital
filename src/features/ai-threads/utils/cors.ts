import { NextResponse } from "next/server";

const ALLOW_ORIGINS = (process.env.BEDROCK_CORS_ORIGINS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// Временное логирование для диагностики
console.log("🔍 CORS Debug:", {
  BEDROCK_CORS_ORIGINS: process.env.BEDROCK_CORS_ORIGINS,
  ALLOW_ORIGINS,
  allowOriginsLength: ALLOW_ORIGINS.length,
});

export function withCors(
  response: NextResponse,
  origin: string | null
): NextResponse {
  const shouldAllowOrigin =
    origin && (ALLOW_ORIGINS.length === 0 || ALLOW_ORIGINS.includes(origin));

  console.log("🔍 CORS Check:", {
    origin,
    allowOriginsLength: ALLOW_ORIGINS.length,
    allowOrigins: ALLOW_ORIGINS,
    shouldAllowOrigin,
  });

  if (shouldAllowOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Vary", "Origin");
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Expose-Headers", "Content-Type");
  }
  return response;
}

export function jsonResponse(
  data: unknown,
  status = 200,
  origin: string | null = null
): NextResponse {
  const response = NextResponse.json(data, { status });
  return withCors(response, origin);
}

export function corsOptionsResponse(
  origin: string | null,
  requestedMethod?: string | null,
  requestedHeaders?: string | null
): NextResponse {
  const headers = new Headers();

  const shouldAllowOrigin =
    origin && (ALLOW_ORIGINS.length === 0 || ALLOW_ORIGINS.includes(origin));

  console.log("🔍 CORS OPTIONS Check:", {
    origin,
    requestedMethod,
    requestedHeaders,
    allowOriginsLength: ALLOW_ORIGINS.length,
    allowOrigins: ALLOW_ORIGINS,
    shouldAllowOrigin,
  });

  if (shouldAllowOrigin) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set(
      "Vary",
      "Origin, Access-Control-Request-Headers, Access-Control-Request-Method"
    );
    console.log("✅ CORS Headers set for OPTIONS:", origin);
  } else {
    console.log("❌ CORS Headers NOT set for OPTIONS:", origin);
  }

  headers.set(
    "Access-Control-Allow-Methods",
    requestedMethod ? requestedMethod : "GET,POST,PATCH,OPTIONS"
  );

  headers.set(
    "Access-Control-Allow-Headers",
    requestedHeaders
      ? requestedHeaders
      : "Content-Type, Authorization, x-api-key"
  );

  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set("Access-Control-Max-Age", "86400");

  return new NextResponse(null, { status: 204, headers });
}

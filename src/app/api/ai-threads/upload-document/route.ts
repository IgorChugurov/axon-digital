import { NextRequest, NextResponse } from "next/server";
import { authenticateUser, jsonResponse } from "@/features/ai-threads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// OPTIONS handler for CORS preflight - используем точно такую же логику как PDF API
export async function OPTIONS(req: NextRequest) {
  console.log("🔥 UPLOAD-DOCUMENT OPTIONS CALLED! URL:", req.url);
  
  const origin = req.headers.get("origin");
  const requestedMethod = req.headers.get("access-control-request-method");
  const requestedHeaders = req.headers.get("access-control-request-headers");
  
  console.log("🔥 UPLOAD OPTIONS Details:", { origin, requestedMethod, requestedHeaders });

  const h = new Headers();

  if (origin) {
    h.set("Access-Control-Allow-Origin", origin);
    h.set(
      "Vary",
      "Origin, Access-Control-Request-Headers, Access-Control-Request-Method"
    );
  }

  h.set(
    "Access-Control-Allow-Methods",
    requestedMethod ? requestedMethod : "GET,POST,PATCH,OPTIONS"
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

// POST /api/ai-threads/upload-document — первичная загрузка документа (если веток нет)
// Это пустой роут только для проверки токена и затем ответ 200
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  try {
    // Проверяем авторизацию
    const user = await authenticateUser(req);

    console.log("📄 Document upload endpoint accessed:", {
      userId: user.opieUserId,
      facilityId: user.facilityId,
    });

    // Этот эндпоинт служит только для проверки токена
    // В будущем здесь может быть логика загрузки документов

    return jsonResponse(
      {
        message: "Token validated successfully",
        user: {
          opieUserId: user.opieUserId,
          facilityId: user.facilityId,
          role: user.role,
        },
      },
      200,
      origin
    );
  } catch (error) {
    console.error("❌ Error in upload-document endpoint:", error);

    const message =
      error instanceof Error ? error.message : "Internal server error";
    const isAuthError =
      message.includes("Authentication") || message.includes("Authorization");

    return jsonResponse(
      {
        ok: false,
        error: {
          code: isAuthError ? "AuthenticationError" : "InternalError",
          message,
        },
      },
      isAuthError ? 401 : 500,
      origin
    );
  }
}

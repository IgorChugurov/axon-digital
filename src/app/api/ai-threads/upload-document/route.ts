import { NextRequest, NextResponse } from "next/server";
import {
  authenticateUser,
  jsonResponse,
  corsOptionsResponse,
} from "@/features/ai-threads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// OPTIONS handler for CORS preflight
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  const requestedMethod = req.headers.get("access-control-request-method");
  const requestedHeaders = req.headers.get("access-control-request-headers");

  return corsOptionsResponse(origin, requestedMethod, requestedHeaders);
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

import { NextRequest, NextResponse } from "next/server";
import {
  authenticateUser,
  aiThreadService,
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

// GET /api/ai-threads/:outputId — загрузка веток (threads) для outputId
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ outputId: string }> }
) {
  const origin = req.headers.get("origin");

  try {
    // Проверяем авторизацию
    const user = await authenticateUser(req);

    const { outputId } = await params;

    if (!outputId) {
      return jsonResponse(
        {
          ok: false,
          error: {
            code: "BadRequest",
            message: "outputId parameter is required",
          },
        },
        400,
        origin
      );
    }

    console.log("📥 Loading threads for outputId:", {
      outputId,
      userId: user.opieUserId,
    });

    const threads = await aiThreadService.findByOutputId(outputId, user);

    console.log("✅ Threads loaded:", {
      outputId,
      count: threads.length,
      userId: user.opieUserId,
    });

    return jsonResponse(threads, 200, origin);
  } catch (error) {
    console.error("❌ Error loading threads:", error);

    const message =
      error instanceof Error ? error.message : "Failed to load threads";
    const isAuthError =
      message.includes("Authentication") || message.includes("Authorization");
    const isAccessError = message.includes("Access denied");

    let statusCode = 500;
    let errorCode = "InternalError";

    if (isAuthError) {
      statusCode = 401;
      errorCode = "AuthenticationError";
    } else if (isAccessError) {
      statusCode = 403;
      errorCode = "AccessDenied";
    }

    return jsonResponse(
      {
        ok: false,
        error: {
          code: errorCode,
          message,
        },
      },
      statusCode,
      origin
    );
  }
}

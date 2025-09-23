import { NextRequest, NextResponse } from "next/server";
import {
  authenticateUser,
  aiThreadService,
  RegenerateAiThreadDto,
  AIProvider,
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

// POST /api/ai-threads/regenerate/:outputId/:promptId — регенерация существующей ветки
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ outputId: string; promptId: string }> }
) {
  const origin = req.headers.get("origin");
  try {
    // Проверяем авторизацию
    const user = await authenticateUser(req);

    const { outputId, promptId } = await params;

    if (!outputId || !promptId) {
      return jsonResponse(
        {
          ok: false,
          error: {
            code: "BadRequest",
            message: "outputId and promptId parameters are required",
          },
        },
        400,
        origin
      );
    }

    // Парсим тело запроса
    let requestBody: any;
    try {
      requestBody = await req.json();
    } catch (error) {
      return jsonResponse(
        {
          ok: false,
          error: {
            code: "BadRequest",
            message: "Invalid JSON body",
          },
        },
        400,
        origin
      );
    }

    const {
      outputBody,
      promptBody,
      promptTitle,
      regenerateFromScratch = false,
    } = requestBody;

    if (!outputBody || !promptBody) {
      return jsonResponse(
        {
          ok: false,
          error: {
            code: "BadRequest",
            message: "outputBody and promptBody are required",
          },
        },
        400,
        origin
      );
    }

    console.log("🔄 Regenerating AI thread:", {
      outputId,
      promptId,
      promptTitle,
      regenerateFromScratch,
      userId: user.opieUserId,
      outputBodyLength: outputBody.length,
      promptBodyLength: promptBody.length,
    });

    const regenerateDto: RegenerateAiThreadDto = {
      outputId,
      promptId,
      outputBody,
      promptBody,
      promptTitle,
      regenerateFromScratch,
    };

    const thread = await aiThreadService.regenerate(
      regenerateDto,
      user,
      AIProvider.BEDROCK
    );

    console.log("✅ AI thread regenerated:", {
      threadId: thread.id,
      outputId,
      promptId,
      regenerateFromScratch,
      answersCount: thread.aiAnswers?.length || 0,
      userId: user.opieUserId,
    });

    return jsonResponse(thread, 200, origin);
  } catch (error) {
    console.error("❌ Error regenerating AI thread:", error);

    const message =
      error instanceof Error ? error.message : "Failed to regenerate AI thread";
    const isAuthError =
      message.includes("Authentication") || message.includes("Authorization");
    const isNotFoundError = message.includes("not found");
    const isAccessError = message.includes("Access denied");

    let statusCode = 500;
    let errorCode = "InternalError";

    if (isAuthError) {
      statusCode = 401;
      errorCode = "AuthenticationError";
    } else if (isNotFoundError) {
      statusCode = 404;
      errorCode = "NotFound";
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

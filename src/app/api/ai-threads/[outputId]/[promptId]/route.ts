import { NextRequest, NextResponse } from "next/server";
import {
  authenticateUser,
  aiThreadService,
  CreateAiThreadDto,
  AIProvider,
  jsonResponse,
  corsOptionsResponse,
} from "@/features/ai-threads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// OPTIONS handler for CORS preflight - используем точно такую же логику как PDF API
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  const requestedMethod = req.headers.get("access-control-request-method");
  const requestedHeaders = req.headers.get("access-control-request-headers");

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

// POST /api/ai-threads/:outputId/:promptId — генерация новой ветки (create)
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

    const { outputBody, promptBody, promptTitle } = requestBody;

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

    console.log("🆕 Creating new AI thread:", {
      outputId,
      promptId,
      promptTitle,
      userId: user.opieUserId,
      outputBodyLength: outputBody.length,
      promptBodyLength: promptBody.length,
    });

    const createDto: CreateAiThreadDto = {
      outputId,
      promptId,
      outputBody,
      promptBody,
      promptTitle,
    };

    const thread = await aiThreadService.generate(
      createDto,
      user,
      AIProvider.BEDROCK
    );

    console.log("✅ AI thread created:", {
      threadId: thread.id,
      outputId,
      promptId,
      answersCount: thread.aiAnswers?.length || 0,
      userId: user.opieUserId,
    });

    return jsonResponse(thread, 200, origin);
  } catch (error) {
    console.error("❌ Error creating AI thread:", error);

    const message =
      error instanceof Error ? error.message : "Failed to create AI thread";
    const isAuthError =
      message.includes("Authentication") || message.includes("Authorization");
    const isConflictError = message.includes("already exists");
    const isAccessError = message.includes("Access denied");

    let statusCode = 500;
    let errorCode = "InternalError";

    if (isAuthError) {
      statusCode = 401;
      errorCode = "AuthenticationError";
    } else if (isConflictError) {
      statusCode = 409;
      errorCode = "Conflict";
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

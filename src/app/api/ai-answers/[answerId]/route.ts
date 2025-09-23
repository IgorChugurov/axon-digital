import { NextRequest, NextResponse } from "next/server";
import {
  authenticateUser,
  aiAnswerService,
  UpdateAiAnswerDto,
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
    h.set("Vary", "Origin, Access-Control-Request-Headers, Access-Control-Request-Method");
  }
  
  h.set("Access-Control-Allow-Methods", requestedMethod ? requestedMethod : "GET,POST,PATCH,OPTIONS");
  h.set("Access-Control-Allow-Headers", requestedHeaders ? requestedHeaders : "Content-Type, Authorization, x-api-key, projectid, X-Request-Id, X-Request-Timestamp, X-Admin-Token");
  h.set("Access-Control-Allow-Credentials", "true");
  h.set("Access-Control-Max-Age", "86400");
  
  return new Response(null, { status: 204, headers: h });
}

// PATCH /api/ai-answers/:answerId — обновление комментария/оценок последнего ответа
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ answerId: string }> }
) {
  const origin = req.headers.get("origin");
  try {
    // Проверяем авторизацию
    const user = await authenticateUser(req);

    const { answerId } = await params;

    if (!answerId) {
      return jsonResponse(
        {
          ok: false,
          error: {
            code: "BadRequest",
            message: "answerId parameter is required",
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

    const { comment, isGood, isBad } = requestBody;

    // Валидация: хотя бы одно поле должно быть передано
    if (comment === undefined && isGood === undefined && isBad === undefined) {
      return jsonResponse(
        {
          ok: false,
          error: {
            code: "BadRequest",
            message:
              "At least one field (comment, isGood, isBad) must be provided",
          },
        },
        400,
        origin
      );
    }

    // Валидация типов
    if (comment !== undefined && typeof comment !== "string") {
      return jsonResponse(
        {
          ok: false,
          error: {
            code: "BadRequest",
            message: "comment must be a string",
          },
        },
        400,
        origin
      );
    }

    if (isGood !== undefined && typeof isGood !== "boolean") {
      return jsonResponse(
        {
          ok: false,
          error: {
            code: "BadRequest",
            message: "isGood must be a boolean",
          },
        },
        400,
        origin
      );
    }

    if (isBad !== undefined && typeof isBad !== "boolean") {
      return jsonResponse(
        {
          ok: false,
          error: {
            code: "BadRequest",
            message: "isBad must be a boolean",
          },
        },
        400,
        origin
      );
    }

    console.log("📝 Updating AI answer:", {
      answerId,
      comment: comment ? `${comment.length} chars` : undefined,
      isGood,
      isBad,
      userId: user.opieUserId,
    });

    const updateDto: UpdateAiAnswerDto = {
      comment,
      isGood,
      isBad,
    };

    const updatedAnswer = await aiAnswerService.update(
      answerId,
      updateDto,
      user
    );

    if (!updatedAnswer) {
      return jsonResponse(
        {
          ok: false,
          error: {
            code: "NotFound",
            message: "Answer not found",
          },
        },
        404,
        origin
      );
    }

    console.log("✅ AI answer updated:", {
      answerId: updatedAnswer.id,
      hasComment: Boolean(updatedAnswer.comment),
      isGood: updatedAnswer.isGood,
      isBad: updatedAnswer.isBad,
      userId: user.opieUserId,
    });

    return jsonResponse(updatedAnswer, 200, origin);
  } catch (error) {
    console.error("❌ Error updating AI answer:", error);

    const message =
      error instanceof Error ? error.message : "Failed to update AI answer";
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

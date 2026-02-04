import { NextRequest, NextResponse } from "next/server";
import {
  BedrockRuntimeClient,
  ConverseCommand,
} from "@aws-sdk/client-bedrock-runtime";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * ПРОСТОЙ ПРЯМОЙ API ДЛЯ BEDROCK
 *
 * POST /api/bedrock/generate
 *
 * Без БД, без тредов, без аутентификации - просто прямой вызов Bedrock.
 *
 * Body:
 * {
 *   "prompt": "You are a helpful assistant.",
 *   "text": "What is 2+2?"
 * }
 *
 * Response:
 * {
 *   "answer": "4",
 *   "usage": {
 *     "inputTokens": 10,
 *     "outputTokens": 5,
 *     "totalTokens": 15
 *   }
 * }
 */

export async function POST(req: NextRequest) {
  try {
    // Проверяем API ключ
    const apiKeyExternal = req.headers.get("x-api-key");
    const validApiKey =
      process.env.BEDROCK_SIMPLE_API_KEY || "sk_test_9a8b7c6d5e4f3g2h1i0j";

    if (!apiKeyExternal || apiKeyExternal !== validApiKey) {
      return NextResponse.json(
        { error: "Invalid or missing API key" },
        { status: 401 }
      );
    }

    // Парсим тело запроса
    const { prompt, text } = await req.json();

    if (!prompt || !text) {
      return NextResponse.json(
        { error: "Missing required fields: prompt, text" },
        { status: 400 }
      );
    }

    // Проверяем конфигурацию
    const region = process.env.BEDROCK_REGION;
    const modelId = process.env.BEDROCK_MODELID;
    const apiKey = process.env.BEDROCK_API_KEY;

    if (!region || !modelId || !apiKey) {
      return NextResponse.json(
        { error: "Bedrock is not configured" },
        { status: 500 }
      );
    }

    // Устанавливаем API ключ
    process.env.AWS_BEARER_TOKEN_BEDROCK = apiKey;

    // Создаем клиент Bedrock
    const client = new BedrockRuntimeClient({ region });

    // Формируем и отправляем запрос
    const command = new ConverseCommand({
      modelId: modelId,
      messages: [
        {
          role: "user",
          content: [{ text: text }],
        },
      ],
      system: [{ text: prompt }],
      inferenceConfig: {
        maxTokens: 4000,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    console.log("🤖 Calling Bedrock directly:", {
      promptLength: prompt.length,
      textLength: text.length,
    });

    const response = await client.send(command);

    // Извлекаем ответ
    const content = response.output?.message?.content;
    if (!content || !Array.isArray(content) || content.length === 0) {
      return NextResponse.json(
        { error: "Empty response from Bedrock" },
        { status: 500 }
      );
    }

    const textContent = content[0];
    if (!textContent || !("text" in textContent)) {
      return NextResponse.json(
        { error: "Invalid response format from Bedrock" },
        { status: 500 }
      );
    }

    const answer = String(textContent.text);

    // Извлекаем информацию о токенах
    const usage = response.usage;
    const tokenUsage = usage
      ? {
          inputTokens: usage.inputTokens || 0,
          outputTokens: usage.outputTokens || 0,
          totalTokens: (usage.inputTokens || 0) + (usage.outputTokens || 0),
        }
      : undefined;

    console.log("✅ Bedrock response received:", {
      answerLength: answer.length,
      usage: tokenUsage,
    });

    return NextResponse.json({
      answer,
      usage: tokenUsage,
    });
  } catch (error) {
    console.error("❌ Bedrock API error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

import {
  BedrockRuntimeClient,
  ConverseCommand,
  type ConverseCommandInput,
  type Message,
  type SystemContentBlock,
} from "@aws-sdk/client-bedrock-runtime";
import { LLMGenerationRequest, LLMGenerationResponse } from "../types";

export class LLMService {
  private client: BedrockRuntimeClient;
  private modelId: string;
  private lastRequestTime: number = 0;
  private minRequestInterval: number;
  private maxRetries: number;
  private baseRetryDelay: number;

  constructor() {
    const region = process.env.BEDROCK_REGION;
    if (!region) {
      throw new Error("BEDROCK_REGION is not configured");
    }

    this.modelId = process.env.BEDROCK_MODELID || "";
    if (!this.modelId) {
      throw new Error("BEDROCK_MODELID is not configured");
    }

    // Map your BEDROCK_API_KEY to the SDK's bearer token env for Bedrock
    if (!process.env.AWS_BEARER_TOKEN_BEDROCK && process.env.BEDROCK_API_KEY) {
      process.env.AWS_BEARER_TOKEN_BEDROCK = process.env.BEDROCK_API_KEY;
    }

    // Use default provider chain; with AWS_BEARER_TOKEN_BEDROCK set, SDK will send bearer token
    this.client = new BedrockRuntimeClient({ region });

    // Конфигурация rate limiting и retry
    this.minRequestInterval = parseInt(
      process.env.BEDROCK_MIN_INTERVAL || "1500"
    ); // 1.5 секунды по умолчанию
    this.maxRetries = parseInt(process.env.BEDROCK_MAX_RETRIES || "3");
    this.baseRetryDelay = parseInt(
      process.env.BEDROCK_BASE_RETRY_DELAY || "2000"
    ); // 2 секунды
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async enforceRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    if (timeSinceLastRequest < this.minRequestInterval) {
      const waitTime = this.minRequestInterval - timeSinceLastRequest;
      console.log(
        `⏱️ Rate limiting: waiting ${waitTime}ms before next request`
      );
      await this.sleep(waitTime);
    }

    this.lastRequestTime = Date.now();
  }

  private async retryWithBackoff<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;

        // Проверяем, что это именно ThrottlingException
        if (
          error instanceof Error &&
          error.message.includes("Too many requests")
        ) {
          if (attempt < maxRetries) {
            const delay = baseDelay * Math.pow(2, attempt); // Экспоненциальная задержка
            console.log(
              `🔄 Retry attempt ${attempt + 1}/${maxRetries + 1} after ${delay}ms delay...`
            );
            await this.sleep(delay);
            continue;
          }
        }

        // Если это не throttling ошибка, сразу выбрасываем
        throw error;
      }
    }

    throw lastError!;
  }

  async generateResponse(
    request: LLMGenerationRequest
  ): Promise<LLMGenerationResponse> {
    return this.retryWithBackoff(
      async () => {
        try {
          // Применяем rate limiting
          await this.enforceRateLimit();

          const { prompt, body, projectId, documentName } = request;

          // Формируем системные блоки
          const systemBlocks: SystemContentBlock[] = [];
          let promptText = prompt;

          // Добавляем информацию о документе если есть
          // if (documentName) {
          //   promptText += `\n\nDocument: ${documentName}`;
          // }

          systemBlocks.push({ text: promptText });

          // Формируем сообщения
          const messages: Message[] = [
            {
              role: "user",
              content: [{ text: body }],
            },
          ];

          console.log("🤖 Calling Bedrock directly:", {
            modelId: this.modelId,
            projectId,
            documentName,
            promptLength: prompt.length,
            bodyLength: body.length,
          });

          const input: ConverseCommandInput = {
            modelId: this.modelId,
            messages,
            system: systemBlocks,
            inferenceConfig: {
              maxTokens: 4000,
              temperature: 0.7,
              topP: 0.9,
            },
          };

          const command = new ConverseCommand(input);
          const response = await this.client.send(command);

          // Извлекаем текст ответа
          const messageContent = response.output?.message?.content;
          let messageText = "";

          if (Array.isArray(messageContent) && messageContent.length > 0) {
            const firstContent = messageContent[0];
            if (
              firstContent &&
              typeof firstContent === "object" &&
              "text" in firstContent
            ) {
              messageText = String(firstContent.text);
            }
          }

          if (!messageText) {
            throw new Error(
              "Invalid response from Bedrock - missing message content"
            );
          }

          // Извлекаем информацию о токенах
          const usage = response.usage;
          const tokenUsage = usage
            ? {
                inputTokens: usage.inputTokens || 0,
                outputTokens: usage.outputTokens || 0,
                totalTokens:
                  (usage.inputTokens || 0) + (usage.outputTokens || 0),
              }
            : undefined;

          console.log("✅ LLM response generated directly:", {
            responseLength: messageText.length,
            projectId,
            tokenUsage,
          });

          return {
            response: messageText,
            usage: tokenUsage,
          };
        } catch (error) {
          console.error("❌ Direct LLM Service error:", error);
          throw new Error(
            error instanceof Error
              ? `Direct LLM generation failed: ${error.message}`
              : "Unknown direct LLM generation error"
          );
        }
      },
      this.maxRetries,
      this.baseRetryDelay
    );
  }

  async generateByProvider(
    projectId: string,
    request: LLMGenerationRequest
  ): Promise<LLMGenerationResponse> {
    // В будущем здесь можно добавить логику выбора провайдера (BEDROCK, HATHR и т.д.)
    return this.generateResponse({
      ...request,
      projectId,
    });
  }
}

// Экспортируем singleton instance
export const llmService = new LLMService();

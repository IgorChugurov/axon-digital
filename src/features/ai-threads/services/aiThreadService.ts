import {
  AiThread,
  CreateAiThreadDto,
  RegenerateAiThreadDto,
  AIProvider,
  AuthUser,
} from "../types";
import { aiThreadsDb } from "../db/aiThreadsDb";
import { aiAnswerService } from "./aiAnswerService";
import { llmService } from "./llmService";
import { AuthService } from "../auth/authUtils";

export class AiThreadService {
  async generate(
    dto: CreateAiThreadDto,
    user: AuthUser,
    aiProvider: AIProvider = AIProvider.BEDROCK
  ): Promise<AiThread> {
    const projectUserId = AuthService.extractProjectUserId(user);
    const facilityId = AuthService.extractFacilityId(user);
    const projectId = AuthService.extractProjectId(user);

    // Проверяем, что тред еще не существует
    const existing = await aiThreadsDb.findThreadByOutputAndPrompt(
      dto.outputId,
      dto.promptId,
      projectUserId
    );

    if (existing) {
      throw new Error("AI thread already exists for this output and prompt");
    }

    // Создаем новый тред
    const thread = await aiThreadsDb.createThread({
      outputId: dto.outputId,
      promptId: dto.promptId,
      outputBody: dto.outputBody,
      promptBody: dto.promptBody,
      promptTitle: dto.promptTitle,
      projectUserId,
      facilityId,
    });

    // Генерируем первый ответ
    await this.generateAiAnswer(
      projectId,
      thread.id,
      dto.promptBody,
      dto.outputBody,
      user
    );

    // Возвращаем тред с ответами
    const threadWithAnswers = await aiThreadsDb.findThreadWithAnswers(
      thread.id,
      projectUserId
    );

    return threadWithAnswers!;
  }

  async regenerate(
    dto: RegenerateAiThreadDto,
    user: AuthUser,
    aiProvider: AIProvider = AIProvider.BEDROCK
  ): Promise<AiThread> {
    const projectUserId = AuthService.extractProjectUserId(user);
    const facilityId = AuthService.extractFacilityId(user);
    const projectId = AuthService.extractProjectId(user);

    // Находим существующий тред
    const thread = await aiThreadsDb.findThreadByOutputAndPrompt(
      dto.outputId,
      dto.promptId,
      projectUserId
    );

    if (!thread) {
      throw new Error("AI Thread not found for this output and prompt");
    }

    // Проверяем права доступа
    if (!AuthService.canModifyThread(user, thread.projectUserId)) {
      throw new Error("Access denied: cannot modify this thread");
    }

    // Если запрошена полная регенерация
    if (dto.regenerateFromScratch) {
      // Удаляем все ответы
      await aiThreadsDb.deleteAnswersByThreadId(thread.id, projectUserId);

      // Обновляем тред новыми данными
      await aiThreadsDb.updateThread(
        thread.id,
        {
          outputBody: dto.outputBody,
          promptBody: dto.promptBody,
          promptTitle: dto.promptTitle,
        },
        projectUserId
      );

      // Генерируем новый ответ
      await this.generateAiAnswer(
        projectId,
        thread.id,
        dto.promptBody,
        dto.outputBody,
        user
      );

      // Возвращаем обновленный тред
      const updatedThread = await aiThreadsDb.findThreadWithAnswers(
        thread.id,
        projectUserId
      );
      return updatedThread!;
    }

    // Загружаем тред с ответами для анализа
    const threadWithAnswers = await aiThreadsDb.findThreadWithAnswers(
      thread.id,
      projectUserId
    );

    if (!threadWithAnswers || !threadWithAnswers.aiAnswers) {
      // Тред без ответов - обновляем и генерируем
      await aiThreadsDb.updateThread(
        thread.id,
        {
          outputBody: dto.outputBody,
          promptBody: dto.promptBody,
          promptTitle: dto.promptTitle,
        },
        projectUserId
      );

      await this.generateAiAnswer(
        projectId,
        thread.id,
        dto.promptBody,
        dto.outputBody,
        user
      );

      const updatedThread = await aiThreadsDb.findThreadWithAnswers(
        thread.id,
        projectUserId
      );
      return updatedThread!;
    }

    // Анализируем последние ответы
    const answers = threadWithAnswers.aiAnswers;
    const answersSortedDesc = [...answers].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    if (answersSortedDesc.length === 0) {
      // Нет ответов - генерируем новый
      await this.generateAiAnswer(
        projectId,
        thread.id,
        dto.promptBody || thread.promptBody,
        dto.outputBody || thread.outputBody,
        user
      );

      const updatedThread = await aiThreadsDb.findThreadWithAnswers(
        thread.id,
        projectUserId
      );
      return updatedThread!;
    }

    const latest = answersSortedDesc[0];
    const latestHasComment = Boolean((latest?.comment || "").trim());
    const latestIsGood = Boolean(latest?.isGood);

    if (!latestHasComment) {
      // Последний ответ без комментария - ничего не делаем
      return threadWithAnswers;
    }

    if (latestIsGood) {
      // Последний ответ уже помечен как хороший - ничего не делаем
      return threadWithAnswers;
    }

    // Последний ответ имеет комментарий - генерируем с контекстом
    const latestWithCommentsDesc = answersSortedDesc.filter((a) =>
      Boolean((a.comment || "").trim())
    );

    const limitedWithCommentsAsc = latestWithCommentsDesc.slice(0, 5).reverse();

    let context = "";
    if (limitedWithCommentsAsc.length > 0) {
      const prefix =
        "Use the review context below ONLY to refine the next answer. Preserve all correct factual statements from the patient's text; do not remove correct content unless the comment explicitly marks it as incorrect. If unclear, keep the original correct content. Review context:";
      const items = limitedWithCommentsAsc
        .map(
          (a) =>
            `answer: ${a.body}\ncomment for this answer: ${a.comment ?? ""}`
        )
        .join("\n\n");
      context = `\n\n${prefix}\n\n${items}\n\n`;
    }

    const outputBodyBase = dto.outputBody || thread.outputBody || "";
    const promptBodyBase = dto.promptBody || thread.promptBody || "";
    const promptForCall = `${promptBodyBase}\n\nReview context:\n${context}`;

    await this.generateAiAnswer(
      projectId,
      thread.id,
      promptForCall,
      outputBodyBase,
      user
    );

    const updatedThread = await aiThreadsDb.findThreadWithAnswers(
      thread.id,
      projectUserId
    );
    return updatedThread!;
  }

  async findByOutputId(outputId: string, user: AuthUser): Promise<AiThread[]> {
    const projectUserId = AuthService.extractProjectUserId(user);

    if (!AuthService.canAccessOutput(user, outputId)) {
      throw new Error("Access denied: cannot access this output");
    }

    return aiThreadsDb.findThreadsWithAnswersByOutputId(
      outputId,
      projectUserId
    );
  }

  async findById(id: string, user: AuthUser): Promise<AiThread | null> {
    const projectUserId = AuthService.extractProjectUserId(user);
    return aiThreadsDb.findThreadWithAnswers(id, projectUserId);
  }

  private async generateAiAnswer(
    projectId: string,
    threadId: string,
    prompt: string,
    body: string,
    user: AuthUser,
    documentName?: string
  ): Promise<void> {
    try {
      console.log("🔄 Generating AI answer:", {
        threadId,
        projectId,
        promptLength: prompt.length,
        bodyLength: body.length,
        documentName,
      });

      const response = await llmService.generateByProvider(projectId, {
        prompt,
        body,
        projectId,
        documentName,
      });

      const projectUserId = AuthService.extractProjectUserId(user);
      const facilityId = AuthService.extractFacilityId(user);

      await aiAnswerService.create({
        aiThreadId: threadId,
        body: response.response,
        projectUserId,
        facilityId,
        // Добавляем информацию о токенах
        inputTokens: response.usage?.inputTokens,
        outputTokens: response.usage?.outputTokens,
        totalTokens: response.usage?.totalTokens,
      });

      console.log("✅ AI answer generated and saved:", {
        threadId,
        responseLength: response.response.length,
        tokenUsage: response.usage,
      });
    } catch (error) {
      console.error("❌ Failed to generate AI answer:", error);
      throw error;
    }
  }
}

// Экспортируем singleton instance
export const aiThreadService = new AiThreadService();

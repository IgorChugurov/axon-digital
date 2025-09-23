import { AiAnswer, UpdateAiAnswerDto, AuthUser } from "../types";
import { aiThreadsDb } from "../db/aiThreadsDb";
import { AuthService } from "../auth/authUtils";

export class AiAnswerService {
  async create(answerData: Partial<AiAnswer>): Promise<AiAnswer> {
    return aiThreadsDb.createAnswer(answerData);
  }

  async findById(id: string, user: AuthUser): Promise<AiAnswer | null> {
    const projectUserId = AuthService.extractProjectUserId(user);
    return aiThreadsDb.findAnswerById(id, projectUserId);
  }

  async findByThreadId(
    aiThreadId: string,
    user: AuthUser
  ): Promise<AiAnswer[]> {
    const projectUserId = AuthService.extractProjectUserId(user);

    // Проверяем, что пользователь имеет доступ к треду
    const thread = await aiThreadsDb.findThreadById(aiThreadId, projectUserId);
    if (!thread) {
      throw new Error("Thread not found or access denied");
    }

    return aiThreadsDb.findAnswersByThreadId(aiThreadId);
  }

  async update(
    id: string,
    updateData: UpdateAiAnswerDto,
    user: AuthUser
  ): Promise<AiAnswer | null> {
    const projectUserId = AuthService.extractProjectUserId(user);

    // Находим существующий ответ
    const existingAnswer = await aiThreadsDb.findAnswerById(id, projectUserId);
    if (!existingAnswer) {
      throw new Error("Answer not found");
    }

    // Проверяем права доступа
    if (!AuthService.canModifyAnswer(user, existingAnswer.projectUserId)) {
      throw new Error("Access denied: cannot modify this answer");
    }

    // Обновляем только разрешенные поля
    const allowedUpdates: Partial<AiAnswer> = {};

    if (updateData.comment !== undefined) {
      allowedUpdates.comment = updateData.comment;
    }

    if (updateData.isGood !== undefined) {
      allowedUpdates.isGood = updateData.isGood;
      // Если ответ помечен как хороший, снимаем отметку "плохой"
      if (updateData.isGood) {
        allowedUpdates.isBad = false;
      }
    }

    if (updateData.isBad !== undefined) {
      allowedUpdates.isBad = updateData.isBad;
      // Если ответ помечен как плохой, снимаем отметку "хороший"
      if (updateData.isBad) {
        allowedUpdates.isGood = false;
      }
    }

    console.log("📝 Updating AI answer:", {
      answerId: id,
      updates: allowedUpdates,
      userId: projectUserId,
    });

    return aiThreadsDb.updateAnswer(id, allowedUpdates, projectUserId);
  }

  async deleteAllByThreadId(
    aiThreadId: string,
    user: AuthUser
  ): Promise<number> {
    const projectUserId = AuthService.extractProjectUserId(user);

    // Проверяем, что пользователь имеет доступ к треду
    const thread = await aiThreadsDb.findThreadById(aiThreadId, projectUserId);
    if (!thread) {
      throw new Error("Thread not found or access denied");
    }

    // Проверяем права на модификацию треда
    if (!AuthService.canModifyThread(user, thread.projectUserId)) {
      throw new Error("Access denied: cannot modify this thread");
    }

    console.log("🗑️ Deleting all answers for thread:", {
      threadId: aiThreadId,
      userId: projectUserId,
    });

    return aiThreadsDb.deleteAnswersByThreadId(aiThreadId, projectUserId);
  }

  // Получить последний ответ для треда
  async getLatestByThreadId(
    aiThreadId: string,
    user: AuthUser
  ): Promise<AiAnswer | null> {
    const answers = await this.findByThreadId(aiThreadId, user);

    if (answers.length === 0) {
      return null;
    }

    // Сортируем по дате создания (новые первые)
    const sortedAnswers = answers.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    return sortedAnswers[0];
  }

  // Получить ответы с комментариями для треда
  async getAnswersWithComments(
    aiThreadId: string,
    user: AuthUser,
    limit: number = 5
  ): Promise<AiAnswer[]> {
    const answers = await this.findByThreadId(aiThreadId, user);

    // Фильтруем ответы с комментариями
    const answersWithComments = answers.filter((answer) =>
      Boolean((answer.comment || "").trim())
    );

    // Сортируем по дате создания (новые первые) и ограничиваем количество
    return answersWithComments
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}

// Экспортируем singleton instance
export const aiAnswerService = new AiAnswerService();

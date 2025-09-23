import { ObjectId, Collection } from "mongodb";
import { getMongoClient, getDatabase } from "@/lib/db/client";
import {
  AiThread,
  AiAnswer,
  AiThreadDocument,
  AiAnswerDocument,
} from "../types";

const AI_THREADS_COLLECTION = "ai_threads";
const AI_ANSWERS_COLLECTION = "ai_answers";

// Утилитарные функции для работы с _id и id
function documentToAiThread(doc: AiThreadDocument): AiThread {
  const { _id, ...rest } = doc;
  return {
    ...rest,
    id: rest.id || _id.toString(),
  };
}

function documentToAiAnswer(doc: AiAnswerDocument): AiAnswer {
  const { _id, ...rest } = doc;
  return {
    ...rest,
    id: rest.id || _id.toString(),
  };
}

function prepareThreadForInsert(thread: Partial<AiThread>): AiThreadDocument {
  const now = new Date();
  const _id = new ObjectId();

  return {
    _id,
    id: _id.toString(),
    outputId: thread.outputId!,
    promptId: thread.promptId!,
    outputBody: thread.outputBody!,
    promptBody: thread.promptBody!,
    promptTitle: thread.promptTitle,
    projectUserId: thread.projectUserId,
    facilityId: thread.facilityId,
    createdAt: thread.createdAt || now,
    updatedAt: now,
  };
}

function prepareAnswerForInsert(answer: Partial<AiAnswer>): AiAnswerDocument {
  const now = new Date();
  const _id = new ObjectId();

  return {
    _id,
    id: _id.toString(),
    aiThreadId: answer.aiThreadId!,
    body: answer.body!,
    comment: answer.comment,
    isGood: answer.isGood || false,
    isBad: answer.isBad || false,
    projectUserId: answer.projectUserId,
    facilityId: answer.facilityId,
    createdAt: answer.createdAt || now,
    updatedAt: now,
    // Информация о токенах
    inputTokens: answer.inputTokens,
    outputTokens: answer.outputTokens,
    totalTokens: answer.totalTokens,
  };
}

// AI Threads операции
export class AiThreadsDb {
  private async getThreadsCollection(): Promise<Collection<AiThreadDocument>> {
    const client = await getMongoClient();
    const db = getDatabase(client);
    return db.collection<AiThreadDocument>(AI_THREADS_COLLECTION);
  }

  private async getAnswersCollection(): Promise<Collection<AiAnswerDocument>> {
    const client = await getMongoClient();
    const db = getDatabase(client);
    return db.collection<AiAnswerDocument>(AI_ANSWERS_COLLECTION);
  }

  // Создать новый тред
  async createThread(threadData: Partial<AiThread>): Promise<AiThread> {
    const collection = await this.getThreadsCollection();
    const document = prepareThreadForInsert(threadData);

    await collection.insertOne(document);
    return documentToAiThread(document);
  }

  // Найти тред по outputId и promptId
  async findThreadByOutputAndPrompt(
    outputId: string,
    promptId: string,
    projectUserId?: string
  ): Promise<AiThread | null> {
    const collection = await this.getThreadsCollection();

    const filter: any = { outputId, promptId };
    if (projectUserId) {
      filter.projectUserId = projectUserId;
    }

    const document = await collection.findOne(filter);
    return document ? documentToAiThread(document) : null;
  }

  // Найти тред по ID
  async findThreadById(
    id: string,
    projectUserId?: string
  ): Promise<AiThread | null> {
    const collection = await this.getThreadsCollection();

    const filter: any = {
      $or: [
        { id },
        { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
      ].filter(Boolean),
    };

    if (projectUserId) {
      filter.projectUserId = projectUserId;
    }

    const document = await collection.findOne(filter);
    return document ? documentToAiThread(document) : null;
  }

  // Найти все треды для outputId
  async findThreadsByOutputId(
    outputId: string,
    projectUserId?: string
  ): Promise<AiThread[]> {
    const collection = await this.getThreadsCollection();

    const filter: any = { outputId };
    if (projectUserId) {
      filter.projectUserId = projectUserId;
    }

    const documents = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();
    return documents.map(documentToAiThread);
  }

  // Обновить тред
  async updateThread(
    id: string,
    updateData: Partial<AiThread>,
    projectUserId?: string
  ): Promise<AiThread | null> {
    const collection = await this.getThreadsCollection();

    const filter: any = {
      $or: [
        { id },
        { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
      ].filter(Boolean),
    };

    if (projectUserId) {
      filter.projectUserId = projectUserId;
    }

    const { id: _, createdAt, ...updateFields } = updateData;
    const result = await collection.findOneAndUpdate(
      filter,
      {
        $set: {
          ...updateFields,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    return result ? documentToAiThread(result) : null;
  }

  // Создать новый ответ
  async createAnswer(answerData: Partial<AiAnswer>): Promise<AiAnswer> {
    const collection = await this.getAnswersCollection();
    const document = prepareAnswerForInsert(answerData);

    await collection.insertOne(document);
    return documentToAiAnswer(document);
  }

  // Найти ответы для треда
  async findAnswersByThreadId(aiThreadId: string): Promise<AiAnswer[]> {
    const collection = await this.getAnswersCollection();

    const documents = await collection
      .find({ aiThreadId })
      .sort({ createdAt: -1 })
      .toArray();

    return documents.map(documentToAiAnswer);
  }

  // Найти ответ по ID
  async findAnswerById(
    id: string,
    projectUserId?: string
  ): Promise<AiAnswer | null> {
    const collection = await this.getAnswersCollection();

    const filter: any = {
      $or: [
        { id },
        { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
      ].filter(Boolean),
    };

    if (projectUserId) {
      filter.projectUserId = projectUserId;
    }

    const document = await collection.findOne(filter);
    return document ? documentToAiAnswer(document) : null;
  }

  // Обновить ответ
  async updateAnswer(
    id: string,
    updateData: Partial<AiAnswer>,
    projectUserId?: string
  ): Promise<AiAnswer | null> {
    const collection = await this.getAnswersCollection();

    const filter: any = {
      $or: [
        { id },
        { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
      ].filter(Boolean),
    };

    if (projectUserId) {
      filter.projectUserId = projectUserId;
    }

    const { id: _, createdAt, aiThreadId, ...updateFields } = updateData;
    const result = await collection.findOneAndUpdate(
      filter,
      {
        $set: {
          ...updateFields,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    return result ? documentToAiAnswer(result) : null;
  }

  // Удалить все ответы для треда
  async deleteAnswersByThreadId(
    aiThreadId: string,
    projectUserId?: string
  ): Promise<number> {
    const collection = await this.getAnswersCollection();

    const filter: any = { aiThreadId };
    if (projectUserId) {
      filter.projectUserId = projectUserId;
    }

    const result = await collection.deleteMany(filter);
    return result.deletedCount;
  }

  // Найти тред с ответами
  async findThreadWithAnswers(
    id: string,
    projectUserId?: string
  ): Promise<AiThread | null> {
    const thread = await this.findThreadById(id, projectUserId);
    if (!thread) return null;

    const answers = await this.findAnswersByThreadId(thread.id);
    return { ...thread, aiAnswers: answers };
  }

  // Найти треды с ответами для outputId
  async findThreadsWithAnswersByOutputId(
    outputId: string,
    projectUserId?: string
  ): Promise<AiThread[]> {
    const threads = await this.findThreadsByOutputId(outputId, projectUserId);

    const threadsWithAnswers = await Promise.all(
      threads.map(async (thread) => {
        const answers = await this.findAnswersByThreadId(thread.id);
        return { ...thread, aiAnswers: answers };
      })
    );

    return threadsWithAnswers;
  }
}

// Экспортируем singleton instance
export const aiThreadsDb = new AiThreadsDb();

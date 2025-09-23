export interface AiThread {
  id: string;
  outputId: string;
  promptId: string;
  outputBody: string;
  promptBody: string;
  promptTitle?: string;
  projectUserId?: string;
  facilityId?: string;
  createdAt: Date;
  updatedAt: Date;
  aiAnswers?: AiAnswer[];
}

export interface AiAnswer {
  id: string;
  aiThreadId: string;
  body: string;
  comment?: string;
  isGood: boolean;
  isBad: boolean;
  projectUserId?: string;
  facilityId?: string;
  createdAt: Date;
  updatedAt: Date;
  // Информация о токенах
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
}

export interface CreateAiThreadDto {
  outputId: string;
  promptId: string;
  outputBody: string;
  promptBody: string;
  promptTitle?: string;
}

export interface RegenerateAiThreadDto extends CreateAiThreadDto {
  regenerateFromScratch?: boolean;
}

export interface UpdateAiAnswerDto {
  comment?: string;
  isGood?: boolean;
  isBad?: boolean;
}

export interface LLMGenerationRequest {
  prompt: string;
  body: string;
  projectId?: string;
  documentName?: string;
}

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}

export interface LLMGenerationResponse {
  response: string;
  usage?: TokenUsage;
}

export enum AIProvider {
  BEDROCK = "BEDROCK",
  HATHR = "HATHR",
}

// MongoDB документы (внутренние типы для работы с БД)
export interface AiThreadDocument {
  _id?: any;
  id: string;
  outputId: string;
  promptId: string;
  outputBody: string;
  promptBody: string;
  promptTitle?: string;
  projectUserId?: string;
  facilityId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AiAnswerDocument {
  _id?: any;
  id: string;
  aiThreadId: string;
  body: string;
  comment?: string;
  isGood: boolean;
  isBad: boolean;
  projectUserId?: string;
  facilityId?: string;
  createdAt: Date;
  updatedAt: Date;
  // Информация о токенах
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
}

// Auth types
export interface AuthUser {
  opieUserId: string;
  facilityId: string;
  facilityUserId: string;
  biUsername: string;
  role: string;
  sub: string;
  opieJsVersion?: string;
  releaseChannel?: string;
}

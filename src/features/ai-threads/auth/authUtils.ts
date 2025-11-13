import { NextRequest } from "next/server";
import { AuthUser } from "../types";

let PROXY_AUTH_URL = "https://idp.opiesoftware.com/connect/userinfo";
//process.env.PROXY_AUTH_URL || "https://idp.opiesoftware.com/connect/userinfo";
//"https://dev-idp.opiesoftware.com/connect/userinfo";

export async function authenticateUser(req: NextRequest): Promise<AuthUser> {
  const authHeader = req.headers.get("authorization");
  const devHeader = req.headers.get("x-dev-header");

  if (devHeader) {
    PROXY_AUTH_URL = "https://dev-idp.opiesoftware.com/connect/userinfo";
  }

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Missing or invalid Authorization header");
  }

  const token = authHeader.substring(7);
  try {
    const response = await fetch(PROXY_AUTH_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Authentication failed: ${response.status} ${response.statusText}`
      );
    }

    const userData = await response.json();

    // Валидируем обязательные поля
    if (
      !userData.OpieUserId ||
      !userData.FacilityID ||
      !userData.FacilityUserID
    ) {
      throw new Error("Invalid user data received from auth service");
    }

    return {
      opieUserId: userData.OpieUserId,
      facilityId: userData.FacilityID,
      facilityUserId: userData.FacilityUserID,
      biUsername: userData.BIUsername || "",
      role: userData.role || "",
      sub: userData.sub || "",
      opieJsVersion: userData.OpieJsVersion,
      releaseChannel: userData.ReleaseChannel,
    };
  } catch (error) {
    console.error("Authentication error:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to authenticate user");
  }
}

export class AuthService {
  static extractProjectUserId(user: AuthUser): string {
    return user.opieUserId;
  }

  static extractFacilityId(user: AuthUser): string {
    return user.facilityId;
  }

  static extractProjectId(user: AuthUser): string {
    // Используем facilityId как projectId, или можно добавить отдельную логику
    return user.facilityId;
  }

  static hasRole(user: AuthUser, requiredRole: string): boolean {
    return user.role === requiredRole;
  }

  static canAccessOutput(user: AuthUser, outputId: string): boolean {
    // Базовая проверка - пользователь может работать с любыми outputId в своем facility
    // Можно добавить более сложную логику авторизации
    return Boolean(user.facilityId && user.opieUserId);
  }

  static canModifyAnswer(user: AuthUser, answerUserId?: string): boolean {
    // Пользователь может модифицировать только свои ответы
    if (!answerUserId) return true; // Новые ответы
    return user.opieUserId === answerUserId;
  }

  static canModifyThread(user: AuthUser, threadUserId?: string): boolean {
    // Пользователь может модифицировать только свои треды
    if (!threadUserId) return true; // Новые треды
    return user.opieUserId === threadUserId;
  }
}

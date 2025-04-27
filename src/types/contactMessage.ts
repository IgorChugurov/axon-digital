// src/types/contactMessage.ts
export interface ContactMessage {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
  ip?: string; // IP может быть необязательным
}

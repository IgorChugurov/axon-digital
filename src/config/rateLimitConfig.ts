// src/config/rateLimitConfig.ts

export const RATE_LIMIT = {
  SHORT_TERM: {
    points: 3,
    duration: 30, // 1 минута
  },
  DAILY_LIMIT: {
    points: 100,
    duration: 60 * 60 * 24, // 1 день
  },
  API_KEY_LIMIT: {
    points: 60,
    duration: 60 * 60, // 1 час
  },
  CONTACT_FORM: { points: 3, duration: 600 },
};
export const MAX_CHAR_LENGTH = 5000;
export const MIN_CHAR_LENGTH = 2;

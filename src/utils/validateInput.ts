// utils/validateInput.ts
export const MAX_INPUT_TOKENS = 1000;

export function validateInputLength(text: string): boolean {
  return countTokens(text) <= MAX_INPUT_TOKENS;
}

function countTokens(text: string): number {
  return text.split(" ").length * 1.5; // Примерная оценка, можно заменить на tiktoken
}

export function isEmptyLike(input: string) {
  const EMPTY_LIKE = ["", "ну", "ок", "угу", "не знаю", "ничего"];
  const cleaned = input.trim().toLowerCase();
  return EMPTY_LIKE.includes(cleaned);
}

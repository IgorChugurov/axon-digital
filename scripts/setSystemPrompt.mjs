import fs from "fs/promises";
import path from "path";
import { config } from "dotenv";
import { fileURLToPath } from "url";

import OpenAI from "openai";

// ──────────────────────────────────────────────────────────────
// Расчёт директории в ESM (аналог __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ──────────────────────────────────────────────────────────────

config(); // Загрузит .env

const PROMPT_DIR = path.resolve(__dirname, "../prompts/sections");
const ASSISTANT_ID = process.env.ASSISTANT_ID;
const API_KEY = process.env.OPENAI_API_KEY;
//console.log(ASSISTANT_ID, API_KEY);

if (!ASSISTANT_ID || !API_KEY) {
  console.error("❌ Missing ASSISTANT_ID or OPENAI_API_KEY in environment.");
  process.exit(1);
}

const openai = new OpenAI({ apiKey: API_KEY });

async function readPromptFiles() {
  const files = await fs.readdir(PROMPT_DIR);
  const sorted = files
    .filter((f) => f.endsWith(".txt") || f.endsWith(".md"))
    .sort();
  console.log(sorted);

  const contents = await Promise.all(
    sorted.map((file) => fs.readFile(path.join(PROMPT_DIR, file), "utf-8"))
  );

  return contents.join("\n\n---\n\n"); // Разделяем секции
}

async function updateSystemPrompt() {
  const prompt = await readPromptFiles();
  console.log("📦 Prompt length:", prompt.length, "characters");
  console.log(prompt);

  const updated = await openai.beta.assistants.update(ASSISTANT_ID, {
    instructions: prompt,
  });

  console.log("✅ Updated assistant:", updated.id, "-", updated.name);
}

updateSystemPrompt().catch((err) => {
  console.error("❌ Failed to update system prompt", err);
  process.exit(1);
});

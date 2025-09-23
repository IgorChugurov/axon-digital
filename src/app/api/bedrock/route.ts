export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import {
  BedrockRuntimeClient,
  ConverseCommand,
  type ConverseCommandInput,
  type Message,
  type ContentBlock,
  type InferenceConfiguration,
  type SystemContentBlock,
} from "@aws-sdk/client-bedrock-runtime";

type JsonRecord = Record<string, unknown>;

interface BedrockConverseRequest {
  messages: Message[];
  system?: SystemContentBlock[];
  inferenceConfig?: InferenceConfiguration;
  additionalModelRequestFields?: Record<string, any>;
}

type BedrockRequest = BedrockConverseRequest;

const ALLOW_ORIGINS = (process.env.BEDROCK_CORS_ORIGINS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

function withCors(res: Response, origin: string | null) {
  const h = new Headers(res.headers);
  if (
    origin &&
    (ALLOW_ORIGINS.length === 0 || ALLOW_ORIGINS.includes(origin))
  ) {
    h.set("Access-Control-Allow-Origin", origin);
    h.set("Vary", "Origin");
    h.set("Access-Control-Allow-Credentials", "true");
    h.set("Access-Control-Expose-Headers", "Content-Type");
  }
  return new Response(res.body, { status: res.status, headers: h });
}

function jsonResponse(data: unknown, status = 200, origin: string | null) {
  const res = new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return withCors(res, origin);
}

let sharedClient: BedrockRuntimeClient | null = null;

function getClient(): BedrockRuntimeClient {
  if (sharedClient) return sharedClient;
  const region = process.env.BEDROCK_REGION;
  if (!region) {
    throw new Error("BEDROCK_REGION is not configured");
  }
  // Map your BEDROCK_API_KEY to the SDK's bearer token env for Bedrock
  if (!process.env.AWS_BEARER_TOKEN_BEDROCK && process.env.BEDROCK_API_KEY) {
    process.env.AWS_BEARER_TOKEN_BEDROCK = process.env.BEDROCK_API_KEY;
  }
  // Use default provider chain; with AWS_BEARER_TOKEN_BEDROCK set, SDK will send bearer token
  sharedClient = new BedrockRuntimeClient({ region });
  return sharedClient;
}

async function parseBody(req: Request): Promise<BedrockRequest> {
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("Unsupported Content-Type. Expected application/json");
  }
  const json = (await req.json()) as JsonRecord;
  if (typeof json !== "object" || json === null) {
    throw new Error("Invalid JSON body");
  }
  const systemBlocks: SystemContentBlock[] = [];
  let messages: Message[] = [];
  if (Array.isArray((json as JsonRecord).messages)) {
    const rawMessages = (json as { messages: unknown[] }).messages;
    const mapped = rawMessages
      .map((m): Message | null => {
        const mm = m as JsonRecord;
        const roleRaw = String(mm.role ?? "user");
        const rawContent = (mm.content as unknown[]) ?? [];
        const content: ContentBlock[] = rawContent.map((c) => {
          const cc = c as JsonRecord;
          const text = typeof cc.text === "string" ? cc.text : "";
          return { text } as ContentBlock;
        });
        if (roleRaw === "system") {
          for (const c of content) {
            if (
              "text" in c &&
              typeof (c as { text?: unknown }).text === "string"
            ) {
              systemBlocks.push({ text: (c as { text: string }).text });
            }
          }
          return null; // system content lifted to top-level
        }
        const role = (
          roleRaw === "assistant" ? "assistant" : "user"
        ) as Message["role"];
        return { role, content } as Message;
      })
      .filter(
        (m): m is Message =>
          !!m && Array.isArray(m.content) && m.content.length > 0
      );
    messages = mapped;
  } else if (typeof (json as JsonRecord).prompt === "string") {
    const prompt = String((json as JsonRecord).prompt);
    messages = [{ role: "user", content: [{ text: prompt }] }] as Message[];
  } else {
    throw new Error("Missing 'messages' or 'prompt' in request");
  }

  const inferenceRaw = (json as JsonRecord).inferenceConfig as
    | JsonRecord
    | undefined;
  const inferenceConfig: InferenceConfiguration | undefined = inferenceRaw
    ? {
        maxTokens:
          typeof inferenceRaw.maxTokens === "number"
            ? inferenceRaw.maxTokens
            : undefined,
        temperature:
          typeof inferenceRaw.temperature === "number"
            ? inferenceRaw.temperature
            : undefined,
        topP:
          typeof inferenceRaw.topP === "number" ? inferenceRaw.topP : undefined,
        stopSequences: Array.isArray(inferenceRaw.stopSequences)
          ? (inferenceRaw.stopSequences as string[])
          : undefined,
      }
    : undefined;
  const additionalModelRequestFields = (json as JsonRecord)
    .additionalModelRequestFields as unknown as Record<string, any> | undefined;
  const result: BedrockConverseRequest = { messages };
  if (systemBlocks.length > 0) result.system = systemBlocks;
  if (inferenceConfig) result.inferenceConfig = inferenceConfig;
  if (additionalModelRequestFields)
    result.additionalModelRequestFields = additionalModelRequestFields;
  return result;
}

// No streaming helper needed for Converse; SDK returns structured JSON

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  const requestedMethod = req.headers.get("access-control-request-method");
  const requestedHeaders = req.headers.get("access-control-request-headers");
  const h = new Headers();
  if (
    origin &&
    (ALLOW_ORIGINS.length === 0 || ALLOW_ORIGINS.includes(origin))
  ) {
    h.set("Access-Control-Allow-Origin", origin);
    h.set(
      "Vary",
      "Origin, Access-Control-Request-Headers, Access-Control-Request-Method"
    );
  }
  h.set(
    "Access-Control-Allow-Methods",
    requestedMethod ? requestedMethod : "POST,OPTIONS"
  );
  h.set(
    "Access-Control-Allow-Headers",
    requestedHeaders
      ? requestedHeaders
      : "Content-Type, Authorization, x-api-key"
  );
  h.set("Access-Control-Allow-Credentials", "true");
  h.set("Access-Control-Max-Age", "86400");
  return new Response(null, { status: 204, headers: h });
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");

  const providedKey = req.headers.get("x-api-key");
  const expectedKey = process.env.PROXY_API_KEY;
  if (!expectedKey) {
    return jsonResponse(
      {
        ok: false,
        error: {
          code: "ConfigError",
          message: "PROXY_API_KEY is not configured",
        },
      },
      500,
      origin
    );
  }
  if (!providedKey || providedKey !== expectedKey) {
    return jsonResponse(
      {
        ok: false,
        error: { code: "Unauthorized", message: "Invalid x-api-key" },
      },
      401,
      origin
    );
  }

  let payload: BedrockRequest;
  try {
    payload = await parseBody(req);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Bad Request";
    return jsonResponse(
      { ok: false, error: { code: "BadRequest", message } },
      400,
      origin
    );
  }

  const modelId = process.env.BEDROCK_MODELID;
  if (!modelId) {
    return jsonResponse(
      {
        ok: false,
        error: {
          code: "ConfigError",
          message: "BEDROCK_MODELID is not configured",
        },
      },
      500,
      origin
    );
  }

  let client: BedrockRuntimeClient;
  try {
    client = getClient();
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Client initialization error";
    return jsonResponse(
      { ok: false, error: { code: "ConfigError", message } },
      500,
      origin
    );
  }

  try {
    const conv = payload as BedrockConverseRequest;
    // Pass either plain modelId or ARN (inference profile) as modelId, per CLI behavior
    const input: ConverseCommandInput = {
      modelId,
      messages: conv.messages,
      system: conv.system,
      inferenceConfig: conv.inferenceConfig,
      additionalModelRequestFields: conv.additionalModelRequestFields,
    };

    const cmd = new ConverseCommand(input);
    const resp = await client.send(cmd);
    console.log(resp);

    // Extract the message text from the response
    const messageContent = resp.output?.message?.content;
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

    return jsonResponse({ message: messageText }, 200, origin);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Converse failed";
    return jsonResponse(
      { ok: false, error: { code: "UpstreamError", message } },
      502,
      origin
    );
  }
}

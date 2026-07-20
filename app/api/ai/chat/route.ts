import { createHash } from "node:crypto";

import { ZodError } from "zod";

import { AssistantChatError, cacheCompanyAssistantAnswer, maximumAssistantAnswerLength, prepareCompanyAssistantAnswer } from "@/lib/ai/chat-service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const maximumPayloadBytes = 2_048;
const encoder = new TextEncoder();

function createErrorResponse(message: string, status: number, code: string, retryAfterSeconds?: number) {
  const headers = new Headers({ "Content-Type": "application/json" });

  if (retryAfterSeconds) {
    headers.set("Retry-After", String(retryAfterSeconds));
  }

  return Response.json({ error: { code, message } }, { headers, status });
}

function getRequestRateLimitKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const address = (forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "anonymous").slice(0, 256);

  return `assistant:${createHash("sha256").update(address).digest("hex")}`;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length"));

  if (Number.isFinite(contentLength) && contentLength > maximumPayloadBytes) {
    return createErrorResponse("The question is too large.", 413, "payload_too_large");
  }

  try {
    const prepared = await prepareCompanyAssistantAnswer(await request.json(), getRequestRateLimitKey(request));

    if (prepared.cached) {
      return new Response(prepared.answer, {
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "text/plain; charset=utf-8",
          "X-AI-Cache": "HIT",
        },
      });
    }

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        let answer = "";

        try {
          for await (const chunk of prepared.stream) {
            const remaining = maximumAssistantAnswerLength - answer.length;

            if (remaining <= 0) {
              break;
            }

            const text = chunk.slice(0, remaining);
            answer += text;
            controller.enqueue(encoder.encode(text));
          }

          await cacheCompanyAssistantAnswer(prepared.cacheKey, answer);
          controller.close();
        } catch {
          controller.error(new Error("The assistant response could not be completed."));
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
        "X-AI-Cache": "MISS",
      },
    });
  } catch (error) {
    if (error instanceof AssistantChatError) {
      return createErrorResponse(error.message, error.status, error.code, error.retryAfterSeconds);
    }

    if (error instanceof ZodError) {
      return createErrorResponse("Enter a valid company ticker and question.", 400, "invalid_request");
    }

    if (error instanceof SyntaxError) {
      return createErrorResponse("Send a valid request.", 400, "invalid_request");
    }

    return createErrorResponse("The research assistant is temporarily unavailable. Please try again.", 503, "assistant_unavailable");
  }
}

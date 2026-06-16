import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, generateText, streamText, type UIMessage } from "ai";

import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import {
  FOLLOWUPS_PROMPT,
  INTENT_CLASSIFIER_PROMPT,
  systemPromptFor,
  type Intent,
} from "@/lib/ai-prompts";

const VALID_INTENTS: Intent[] = [
  "general",
  "startup_analysis",
  "business_strategy",
  "marketing",
  "sales",
  "finance",
  "proposal",
  "domain_intelligence",
  "competitor_analysis",
  "operations",
  "productivity",
];

function lastUserText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.role !== "user") continue;
    const text = m.parts
      .map((p) => (p.type === "text" ? p.text : ""))
      .join(" ")
      .trim();
    if (text) return text;
  }
  return "";
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => null)) as {
          messages?: UIMessage[];
          intent?: Intent;
        } | null;

        if (!body || !Array.isArray(body.messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response("AI is not configured. Missing LOVABLE_API_KEY.", { status: 500 });
        }

        const gateway = createLovableAiGatewayProvider(key);
        const fastModel = gateway("google/gemini-3-flash-preview");

        // ---- Phase 4 + 5: Intent detection + planner (hidden from user) ----
        let intent: Intent = body.intent && VALID_INTENTS.includes(body.intent) ? body.intent : "general";
        let plan = "";
        const userText = lastUserText(body.messages);

        if (!body.intent && userText.length > 4) {
          try {
            const { text } = await generateText({
              model: fastModel,
              system: INTENT_CLASSIFIER_PROMPT,
              prompt: `User message: """${userText.slice(0, 1200)}"""`,
            });
            const parsed = JSON.parse(text.replace(/```json|```/g, "").trim()) as {
              intent?: string;
              plan?: string;
            };
            if (parsed.intent && VALID_INTENTS.includes(parsed.intent as Intent)) {
              intent = parsed.intent as Intent;
            }
            if (typeof parsed.plan === "string") plan = parsed.plan;
          } catch {
            // fall back to general
          }
        }

        // ---- Phase 1 + 2: structured response via specialized system prompt ----
        const system =
          systemPromptFor(intent) +
          (plan ? `\n\nInternal planning note (do not reveal): ${plan}` : "");

        const result = streamText({
          model: fastModel,
          system,
          messages: await convertToModelMessages(body.messages),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: body.messages,
          headers: { "X-Austech-Intent": intent },
        });
      },
    },
  },
});

// Followups endpoint reuses this file via separate route? Keep separate file.

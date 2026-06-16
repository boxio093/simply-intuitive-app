import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";

import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { FOLLOWUPS_PROMPT } from "@/lib/ai-prompts";

const Input = z.object({
  userMessage: z.string().min(1).max(4000),
  assistantMessage: z.string().min(1).max(8000),
});

export const generateFollowups = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) return { followups: [] as string[] };

    const gateway = createLovableAiGatewayProvider(key);
    try {
      const { text } = await generateText({
        model: gateway("google/gemini-3-flash-preview"),
        system: FOLLOWUPS_PROMPT,
        prompt: `User asked: """${data.userMessage.slice(0, 1500)}"""\n\nAssistant answered: """${data.assistantMessage.slice(0, 3000)}"""`,
      });
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim()) as {
        followups?: string[];
      };
      const followups = Array.isArray(parsed.followups)
        ? parsed.followups.filter((f) => typeof f === "string" && f.length > 0).slice(0, 3)
        : [];
      return { followups };
    } catch {
      return { followups: [] as string[] };
    }
  });

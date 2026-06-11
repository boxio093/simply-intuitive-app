import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
});

const ChatInput = z.object({
  messages: z.array(MessageSchema).min(1),
  system: z.string().optional(),
});

async function callGateway(messages: Array<{ role: string; content: string }>) {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("AI is not configured yet. Please try again later.");

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": key,
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages,
    }),
  });

  if (res.status === 429) throw new Error("AI is busy right now. Please try again in a moment.");
  if (res.status === 402) throw new Error("AI credits exhausted. Add credits in workspace billing.");
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("AI gateway error", res.status, text);
    throw new Error("AI request failed. Please try again.");
  }
  const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  return data.choices?.[0]?.message?.content ?? "";
}

const CONSULTANT_SYSTEM = `You are Austech, an expert AI business consultant for African SMEs, freelancers, startups, and agencies.
Give pragmatic, locally-aware advice tailored to Nigeria and broader Africa where relevant.
Be concise, structured (use short bullets), and action-oriented. Cite numbers in NGN when discussing money.
Never invent regulations or names. If unsure, ask one clarifying question.`;

export const chatWithConsultant = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => {
    const reply = await callGateway([
      { role: "system", content: data.system ?? CONSULTANT_SYSTEM },
      ...data.messages,
    ]);
    return { reply };
  });

const ProposalInput = z.object({
  clientName: z.string().min(1),
  projectTitle: z.string().min(1),
  scope: z.string().min(1),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

export const generateProposal = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ProposalInput.parse(input))
  .handler(async ({ data }) => {
    const prompt = `Draft a concise, professional business proposal in Markdown.
Client: ${data.clientName}
Project: ${data.projectTitle}
Scope: ${data.scope}
Budget: ${data.budget || "to be discussed"}
Timeline: ${data.timeline || "to be agreed"}

Structure:
# Proposal: <Project>
## Overview
## Objectives
## Scope of Work
## Deliverables
## Timeline
## Investment
## Why Us
## Next Steps

Keep it crisp, max ~450 words, suited for a Nigerian SME context. Use NGN if amounts are mentioned.`;

    const proposal = await callGateway([
      { role: "system", content: "You are a senior business writer producing client-ready proposals." },
      { role: "user", content: prompt },
    ]);
    return { proposal };
  });

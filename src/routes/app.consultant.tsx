import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { chatWithConsultant } from "@/lib/ai.functions";

export const Route = createFileRoute("/app/consultant")({
  component: ConsultantPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const PROMPTS = [
  "How should I price a monthly retainer for a Lagos fintech?",
  "Draft a cold outreach message to a procurement lead at a bank.",
  "What KPIs should I track for a 5-person creative agency?",
  "How do I structure equity for a co-founder joining 6 months in?",
];

function ConsultantPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const sendFn = useServerFn(chatWithConsultant);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const { reply } = await sendFn({ data: { messages: next } });
      setMessages([...next, { role: "assistant", content: reply || "(no response)" }]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "AI request failed");
      setMessages(next);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex h-[calc(100dvh-9rem)] max-w-3xl flex-col sm:h-[calc(100dvh-6rem)]">
      <header className="flex items-center gap-2 pb-4">
        <div className="grid h-9 w-9 place-items-center rounded-md bg-accent text-accent-foreground">
          <Bot className="h-4.5 w-4.5" />
        </div>
        <div>
          <h1 className="font-display text-lg font-semibold tracking-tight">AI Consultant</h1>
          <p className="text-xs text-muted-foreground">Pragmatic, Africa-aware business advice on demand.</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto rounded-xl border border-border bg-surface">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="mt-4 font-display text-lg font-semibold">Ask me anything about your business</h2>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Pricing, hiring, proposals, fundraising — try one of these or type your own.
            </p>
            <div className="mt-5 grid w-full max-w-lg gap-2 sm:grid-cols-2">
              {PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="rounded-lg border border-border bg-background p-3 text-left text-xs text-foreground transition hover:border-border-strong hover:bg-muted"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 p-4 sm:p-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "assistant" && (
                  <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground border border-border"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-muted-foreground">
                  <Loader2 className="inline h-3.5 w-3.5 animate-spin" /> Thinking…
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="mt-3 flex items-end gap-2"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          rows={1}
          placeholder="Ask the consultant…"
          className="min-h-[44px] flex-1 resize-none rounded-lg border border-border bg-surface px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          aria-label="Send"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </form>
    </div>
  );
}

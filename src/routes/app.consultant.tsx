import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  Copy,
  Loader2,
  RotateCcw,
  Send,
  Sparkles,
  Square,
  User,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

import { INTENT_LABELS, type Intent } from "@/lib/ai-prompts";
import { generateFollowups } from "@/lib/followups.functions";

export const Route = createFileRoute("/app/consultant")({
  component: ConsultantPage,
});

const STARTERS: { label: string; prompt: string; intent: Intent }[] = [
  {
    label: "Analyze my startup idea",
    prompt:
      "I want to launch a B2B logistics SaaS for last-mile delivery companies in Lagos. Give me a full startup analysis.",
    intent: "startup_analysis",
  },
  {
    label: "Build a marketing plan",
    prompt:
      "Build me a 90-day marketing plan for a Lagos-based creative agency targeting fintech and FMCG clients.",
    intent: "marketing",
  },
  {
    label: "Price a monthly retainer",
    prompt:
      "How should I price a monthly retainer for a Lagos fintech as a freelance product designer? Walk me through it.",
    intent: "finance",
  },
  {
    label: "Score a domain name",
    prompt: "Score the domain name `paystackly.africa` and suggest 3 stronger alternatives.",
    intent: "domain_intelligence",
  },
];

function getMessageText(message: UIMessage): string {
  return message.parts
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("");
}

function ConsultantPage() {
  const [input, setInput] = useState("");
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, regenerate, stop, error } = useChat({
    transport,
    onError: (err) => {
      toast.error(err.message || "AI request failed");
    },
  });

  const isStreaming = status === "submitted" || status === "streaming";
  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [followups, setFollowups] = useState<string[]>([]);
  const followupsFn = useServerFn(generateFollowups);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);
  useEffect(() => {
    if (!isStreaming) textareaRef.current?.focus();
  }, [isStreaming]);

  // Generate follow-up suggestions after each assistant turn completes
  useEffect(() => {
    if (isStreaming || messages.length < 2) return;
    const last = messages[messages.length - 1];
    if (last.role !== "assistant") return;
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    const userText = getMessageText(lastUser);
    const assistantText = getMessageText(last);
    if (!userText || !assistantText) return;
    let cancelled = false;
    setFollowups([]);
    followupsFn({ data: { userMessage: userText, assistantMessage: assistantText } })
      .then((res) => {
        if (!cancelled) setFollowups(res.followups);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [messages, isStreaming, followupsFn]);

  async function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;
    setInput("");
    setFollowups([]);
    await sendMessage({ text: trimmed });
  }

  function copyMessage(text: string) {
    navigator.clipboard.writeText(text).then(
      () => toast.success("Copied to clipboard"),
      () => toast.error("Could not copy"),
    );
  }

  const empty = messages.length === 0;

  return (
    <div className="mx-auto flex h-[calc(100dvh-9rem)] max-w-3xl flex-col sm:h-[calc(100dvh-6rem)]">
      <header className="flex items-center justify-between gap-2 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-foreground text-background">
            <Bot className="h-4.5 w-4.5" />
          </div>
          <div>
            <h1 className="font-display text-lg font-semibold tracking-tight">AI Consultant</h1>
            <p className="text-xs text-muted-foreground">
              Executive-grade business intelligence, tuned for African markets.
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground sm:flex">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Streaming · Intent-aware
        </div>
      </header>

      <div className="flex-1 overflow-y-auto rounded-xl border border-border bg-surface">
        {empty ? (
          <EmptyState onPick={(p) => submit(p)} />
        ) : (
          <div className="space-y-6 p-4 sm:p-6">
            {messages.map((m, i) => (
              <MessageBubble
                key={m.id ?? i}
                message={m}
                isLast={i === messages.length - 1}
                isStreaming={isStreaming && i === messages.length - 1}
                onCopy={() => copyMessage(getMessageText(m))}
                onRegenerate={
                  m.role === "assistant" && i === messages.length - 1 && !isStreaming
                    ? () => regenerate()
                    : undefined
                }
              />
            ))}

            {status === "submitted" && (
              <div className="flex gap-3">
                <Avatar role="assistant" />
                <div className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <span className="thinking-dot" />
                    <span className="thinking-dot" style={{ animationDelay: "120ms" }} />
                    <span className="thinking-dot" style={{ animationDelay: "240ms" }} />
                    <span className="ml-1">Thinking through your question…</span>
                  </span>
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {error.message}
              </div>
            )}

            {followups.length > 0 && !isStreaming && (
              <div className="pt-2">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Suggested follow-ups
                </p>
                <div className="flex flex-wrap gap-2">
                  {followups.map((f) => (
                    <button
                      key={f}
                      onClick={() => submit(f)}
                      className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground transition hover:border-foreground/40 hover:bg-muted"
                    >
                      {f}
                      <ArrowRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                    </button>
                  ))}
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
          submit(input);
        }}
        className="mt-3 flex items-end gap-2"
      >
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit(input);
              }
            }}
            rows={1}
            placeholder="Ask anything about your business — pricing, hiring, strategy, proposals…"
            className="min-h-[48px] w-full resize-none rounded-lg border border-border bg-surface px-3.5 py-3 pr-12 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
          <div className="pointer-events-none absolute bottom-1.5 right-3 text-[10px] text-muted-foreground/70">
            <kbd className="rounded border border-border bg-background px-1 py-0.5">↵</kbd> to send
          </div>
        </div>
        {isStreaming ? (
          <button
            type="button"
            onClick={() => stop()}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-border bg-background text-foreground transition hover:bg-muted"
            aria-label="Stop"
          >
            <Square className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-foreground text-background transition hover:opacity-90 disabled:opacity-40"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        )}
      </form>
    </div>
  );
}

function Avatar({ role }: { role: "user" | "assistant" }) {
  if (role === "user") {
    return (
      <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-muted text-foreground">
        <User className="h-3.5 w-3.5" />
      </div>
    );
  }
  return (
    <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-foreground text-background">
      <Bot className="h-3.5 w-3.5" />
    </div>
  );
}

function MessageBubble({
  message,
  isStreaming,
  onCopy,
  onRegenerate,
}: {
  message: UIMessage;
  isLast: boolean;
  isStreaming: boolean;
  onCopy: () => void;
  onRegenerate?: () => void;
}) {
  const text = getMessageText(message);
  const intent = (message.metadata as { intent?: Intent } | undefined)?.intent;

  if (message.role === "user") {
    return (
      <div className="flex justify-end gap-3">
        <div className="max-w-[85%] whitespace-pre-wrap rounded-lg bg-foreground px-3.5 py-2.5 text-sm leading-relaxed text-background">
          {text}
        </div>
        <Avatar role="user" />
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <Avatar role="assistant" />
      <div className="min-w-0 max-w-[92%] flex-1">
        {intent && intent !== "general" && (
          <div className="mb-1.5 inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            <Sparkles className="h-2.5 w-2.5" />
            {INTENT_LABELS[intent]}
          </div>
        )}
        <div className="prose prose-sm prose-neutral max-w-none text-foreground prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mb-2 prose-h2:mt-4 prose-h2:text-base prose-h3:text-sm prose-p:my-2 prose-p:leading-relaxed prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-strong:text-foreground prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-[0.85em] prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-lg prose-pre:border prose-pre:border-border prose-pre:bg-muted prose-pre:text-foreground prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 prose-table:text-sm">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {text || (isStreaming ? "…" : "")}
          </ReactMarkdown>
        </div>
        {!isStreaming && text && (
          <div className="mt-2 flex items-center gap-1">
            <CopyButton onCopy={onCopy} />
            {onRegenerate && (
              <button
                onClick={onRegenerate}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <RotateCcw className="h-3 w-3" /> Regenerate
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function CopyButton({ onCopy }: { onCopy: () => void }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        onCopy();
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-muted-foreground transition hover:bg-muted hover:text-foreground"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function EmptyState({ onPick }: { onPick: (prompt: string) => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-foreground text-background">
        <Sparkles className="h-5 w-5" />
      </div>
      <h2 className="mt-4 font-display text-xl font-semibold tracking-tight">
        What should we work on?
      </h2>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        I detect what you need — startup analysis, marketing strategy, pricing, proposals — and
        respond with an executive-grade briefing.
      </p>
      <div className="mt-6 grid w-full max-w-xl gap-2 sm:grid-cols-2">
        {STARTERS.map((s) => (
          <button
            key={s.label}
            onClick={() => onPick(s.prompt)}
            className="group rounded-lg border border-border bg-background p-3.5 text-left transition hover:border-foreground/40 hover:bg-muted"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-foreground">{s.label}</span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
            </div>
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{s.prompt}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

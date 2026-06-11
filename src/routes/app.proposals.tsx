import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { FileText, Loader2, Sparkles, Copy, Check } from "lucide-react";
import { toast } from "sonner";

import { generateProposal } from "@/lib/ai.functions";

export const Route = createFileRoute("/app/proposals")({
  component: ProposalsPage,
});

function ProposalsPage() {
  const [form, setForm] = useState({
    clientName: "",
    projectTitle: "",
    scope: "",
    budget: "",
    timeline: "",
  });
  const [proposal, setProposal] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const run = useServerFn(generateProposal);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setProposal(null);
    try {
      const { proposal } = await run({ data: form });
      setProposal(proposal);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  function copy() {
    if (!proposal) return;
    navigator.clipboard.writeText(proposal);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    toast.success("Copied to clipboard");
  }

  return (
    <div className="mx-auto max-w-5xl">
      <header className="flex items-center gap-3 pb-6">
        <div className="grid h-9 w-9 place-items-center rounded-md bg-accent text-accent-foreground">
          <FileText className="h-4.5 w-4.5" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Proposal Generator</h1>
          <p className="text-xs text-muted-foreground">Turn a brief into a polished client proposal in seconds.</p>
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-5">
        <form onSubmit={submit} className="surface-card space-y-4 p-5 lg:col-span-2">
          <Field label="Client name">
            <input
              required
              value={form.clientName}
              onChange={(e) => setForm({ ...form, clientName: e.target.value })}
              placeholder="Bloom Agro Ltd"
              className="field"
            />
          </Field>
          <Field label="Project title">
            <input
              required
              value={form.projectTitle}
              onChange={(e) => setForm({ ...form, projectTitle: e.target.value })}
              placeholder="Brand & website refresh"
              className="field"
            />
          </Field>
          <Field label="Scope">
            <textarea
              required
              rows={4}
              value={form.scope}
              onChange={(e) => setForm({ ...form, scope: e.target.value })}
              placeholder="Describe what the project covers — pages, deliverables, timeline expectations…"
              className="field resize-none"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Budget (optional)">
              <input
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                placeholder="₦1.5M"
                className="field"
              />
            </Field>
            <Field label="Timeline (optional)">
              <input
                value={form.timeline}
                onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                placeholder="6 weeks"
                className="field"
              />
            </Field>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? "Drafting…" : "Generate proposal"}
          </button>
        </form>

        <div className="surface-card lg:col-span-3">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <h2 className="text-sm font-semibold">Preview</h2>
            {proposal && (
              <button
                onClick={copy}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 text-xs hover:bg-muted"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            )}
          </div>
          <div className="min-h-[420px] p-5">
            {loading ? (
              <div className="flex h-80 items-center justify-center text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Drafting your proposal…
              </div>
            ) : proposal ? (
              <article className="prose-content whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {proposal}
              </article>
            ) : (
              <div className="flex h-80 flex-col items-center justify-center text-center text-sm text-muted-foreground">
                <FileText className="mb-3 h-8 w-8 opacity-40" />
                Fill in the brief on the left to generate a client-ready proposal.
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .field {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          padding: 0.55rem 0.75rem;
          font-size: 0.875rem;
          color: var(--color-foreground);
        }
        .field::placeholder { color: var(--color-muted-foreground); }
        .field:focus { outline: none; border-color: var(--color-ring); box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-ring) 25%, transparent); }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

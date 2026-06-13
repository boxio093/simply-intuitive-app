import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Bot, FileText, Receipt, Users, TrendingUp, Plus, Sparkles } from "lucide-react";

import { useAuth } from "@/lib/auth";
import { mockLeads, mockInvoices, NGN, stageMeta, invoiceStatusMeta } from "@/lib/mock-data";

export const Route = createFileRoute("/app/")({
  component: DashboardHome,
});

function DashboardHome() {
  const { user } = useAuth();
  const greeting = (() => {
    const h = new Date().getHours();
    return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  })();

  const revenueMtd = mockInvoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const openInvoices = mockInvoices.filter((i) => i.status === "sent" || i.status === "overdue");
  const openAmount = openInvoices.reduce((s, i) => s + i.amount, 0);
  const activeLeads = mockLeads.filter((l) => l.stage !== "won" && l.stage !== "lost");
  const pipelineValue = activeLeads.reduce((s, l) => s + l.value, 0);

  const stats = [
    { label: "Revenue (MTD)", value: NGN(revenueMtd), trend: "+18% vs. last month", icon: TrendingUp, accent: true },
    { label: "Open invoices", value: `${openInvoices.length} · ${NGN(openAmount)}`, trend: "2 overdue · nudge today", icon: Receipt },
    { label: "Active leads", value: String(activeLeads.length), trend: `${NGN(pipelineValue)} pipeline`, icon: Users },
  ];

  const quick = [
    { to: "/app/proposals", label: "Draft proposal", icon: FileText },
    { to: "/app/invoices", label: "Send invoice", icon: Receipt },
    { to: "/app/crm", label: "Add lead", icon: Plus },
  ] as const;

  return (
    <div className="mx-auto max-w-6xl space-y-8 animate-fade-up">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{greeting}</p>
          <h1 className="mt-1.5 truncate font-display text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
            {user?.name?.split(" ")[0]}, here's your business today.
          </h1>
        </div>
        <Link
          to="/app/consultant"
          className="group hidden shrink-0 items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground shadow-[0_8px_24px_-12px_oklch(0.55_0.24_270/0.5)] transition hover:translate-y-[-1px] sm:inline-flex"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Ask AI
        </Link>
      </header>

      {/* Hero AI prompt — clear first action */}
      <Link
        to="/app/consultant"
        className="group relative block overflow-hidden rounded-2xl border border-border bg-foreground p-6 text-background transition hover:border-foreground/30 sm:p-8"
      >
        <div
          aria-hidden
          className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-primary/40 blur-3xl transition group-hover:bg-primary/55"
        />
        <div className="relative">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-background/60">
            <Bot className="h-3.5 w-3.5" />
            Start with AI
          </div>
          <h2 className="mt-3 max-w-xl font-display text-xl font-semibold tracking-tight sm:text-2xl">
            What should we work on first today?
          </h2>
          <p className="mt-2 max-w-md text-sm text-background/70">
            Ask anything — pricing, hiring, follow-up scripts, next quarter. Get answers built for your market.
          </p>
          <div className="mt-5 inline-flex items-center gap-1.5 rounded-md bg-background px-3.5 py-2 text-sm font-medium text-foreground transition group-hover:bg-background/90">
            Open AI Consultant <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {quick.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="group surface-card flex items-center justify-between p-3 transition hover:border-border-strong hover:shadow-[0_10px_30px_-20px_oklch(0_0_0/0.25)] sm:p-4"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
                <Icon className="h-4 w-4" />
              </div>
              <span className="truncate text-sm font-medium">{label}</span>
            </div>
            <ArrowUpRight className="hidden h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground sm:block" />
          </Link>
        ))}
      </div>

      {/* KPIs */}
      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map(({ label, value, trend, icon: Icon, accent }) => (
          <div
            key={label}
            className="surface-card relative overflow-hidden p-5 transition hover:border-border-strong"
          >
            {accent && (
              <span
                aria-hidden
                className="absolute right-0 top-0 h-16 w-16 -translate-y-6 translate-x-6 rounded-full bg-primary/15 blur-2xl"
              />
            )}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{label}</span>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-3 font-display text-[26px] font-semibold tracking-[-0.02em]">{value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{trend}</div>
          </div>
        ))}
      </div>

      {/* Lists */}
      <div className="grid gap-4 lg:grid-cols-3">
        <section className="surface-card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <h2 className="text-sm font-semibold">Recent leads</h2>
            <Link to="/app/crm" className="group inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              View all <ArrowUpRight className="h-3 w-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {mockLeads.slice(0, 5).map((l) => (
              <div key={l.id} className="flex items-center gap-3 px-5 py-3 transition hover:bg-surface-muted">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{l.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{l.company}</div>
                </div>
                <span className={`hidden rounded-full px-2 py-0.5 text-[11px] font-medium sm:inline ${stageMeta[l.stage].tone}`}>
                  {stageMeta[l.stage].label}
                </span>
                <div className="shrink-0 text-right text-sm font-medium tabular-nums">{NGN(l.value)}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="surface-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <h2 className="text-sm font-semibold">Recent invoices</h2>
            <Link to="/app/invoices" className="group inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              View all <ArrowUpRight className="h-3 w-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {mockInvoices.slice(0, 4).map((i) => (
              <div key={i.id} className="flex items-center gap-3 px-5 py-3 transition hover:bg-surface-muted">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium tabular-nums">{i.number}</div>
                  <div className="truncate text-xs text-muted-foreground">{i.client}</div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${invoiceStatusMeta[i.status].tone}`}>
                  {invoiceStatusMeta[i.status].label}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

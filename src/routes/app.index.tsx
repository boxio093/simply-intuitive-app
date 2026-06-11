import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Bot, FileText, Receipt, Users, TrendingUp, Plus } from "lucide-react";

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
    { label: "Revenue (MTD)", value: NGN(revenueMtd), trend: "+18%", icon: TrendingUp },
    { label: "Open invoices", value: `${openInvoices.length} · ${NGN(openAmount)}`, trend: "2 overdue", icon: Receipt },
    { label: "Active leads", value: String(activeLeads.length), trend: NGN(pipelineValue) + " pipeline", icon: Users },
  ];

  const actions = [
    { to: "/app/consultant", label: "Ask AI Consultant", icon: Bot, tone: "primary" as const },
    { to: "/app/proposals", label: "New proposal", icon: FileText, tone: "ghost" as const },
    { to: "/app/invoices", label: "New invoice", icon: Receipt, tone: "ghost" as const },
    { to: "/app/crm", label: "Add lead", icon: Plus, tone: "ghost" as const },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{greeting}</p>
        <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {user?.name}, here's your business today.
        </h1>
      </header>

      <div className="flex flex-wrap gap-2">
        {actions.map(({ to, label, icon: Icon, tone }) => (
          <Link
            key={to}
            to={to}
            className={
              tone === "primary"
                ? "inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90"
                : "inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-foreground hover:bg-muted"
            }
          >
            <Icon className="h-4 w-4" /> {label}
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(({ label, value, trend, icon: Icon }) => (
          <div key={label} className="surface-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{label}</span>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-3 font-display text-2xl font-semibold tracking-tight">{value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{trend}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="surface-card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <h2 className="text-sm font-semibold">Recent leads</h2>
            <Link to="/app/crm" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {mockLeads.slice(0, 5).map((l) => (
              <div key={l.id} className="flex items-center gap-3 px-5 py-3">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{l.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{l.company}</div>
                </div>
                <span className={`hidden rounded-full px-2 py-0.5 text-[11px] font-medium sm:inline ${stageMeta[l.stage].tone}`}>
                  {stageMeta[l.stage].label}
                </span>
                <div className="shrink-0 text-right text-sm font-medium">{NGN(l.value)}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="surface-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <h2 className="text-sm font-semibold">Recent invoices</h2>
            <Link to="/app/invoices" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {mockInvoices.slice(0, 4).map((i) => (
              <div key={i.id} className="flex items-center gap-3 px-5 py-3">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{i.number}</div>
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

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Search, Users } from "lucide-react";

import { mockLeads, NGN, stageMeta, type Lead } from "@/lib/mock-data";

export const Route = createFileRoute("/app/crm")({
  component: CrmPage,
});

const STAGES: Array<Lead["stage"]> = ["new", "qualified", "proposal", "won", "lost"];

function CrmPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Lead["stage"] | "all">("all");

  const leads = useMemo(() => {
    return mockLeads.filter((l) => {
      if (filter !== "all" && l.stage !== filter) return false;
      if (!q.trim()) return true;
      const t = q.toLowerCase();
      return l.name.toLowerCase().includes(t) || l.company.toLowerCase().includes(t) || l.email.toLowerCase().includes(t);
    });
  }, [q, filter]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: mockLeads.length };
    STAGES.forEach((s) => (map[s] = mockLeads.filter((l) => l.stage === s).length));
    return map;
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-6">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-accent text-accent-foreground">
            <Users className="h-4.5 w-4.5" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight">CRM</h1>
            <p className="text-xs text-muted-foreground">{mockLeads.length} contacts in your pipeline.</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90">
          <Plus className="h-4 w-4" /> Add lead
        </button>
      </header>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search leads…"
            className="w-full rounded-md border border-border bg-surface py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
        <div className="-mx-3 flex gap-1.5 overflow-x-auto px-3 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          <Chip active={filter === "all"} onClick={() => setFilter("all")}>
            All ({counts.all})
          </Chip>
          {STAGES.map((s) => (
            <Chip key={s} active={filter === s} onClick={() => setFilter(s)}>
              {stageMeta[s].label} ({counts[s] ?? 0})
            </Chip>
          ))}
        </div>
      </div>

      <div className="surface-card overflow-hidden">
        {/* Desktop table */}
        <table className="hidden w-full text-sm sm:table">
          <thead className="border-b border-border bg-surface-muted text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-2.5 font-medium">Lead</th>
              <th className="px-5 py-2.5 font-medium">Company</th>
              <th className="px-5 py-2.5 font-medium">Stage</th>
              <th className="px-5 py-2.5 text-right font-medium">Value</th>
              <th className="px-5 py-2.5 font-medium">Updated</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                <td className="px-5 py-3">
                  <div className="font-medium">{l.name}</div>
                  <div className="text-xs text-muted-foreground">{l.email}</div>
                </td>
                <td className="px-5 py-3">{l.company}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${stageMeta[l.stage].tone}`}>
                    {stageMeta[l.stage].label}
                  </span>
                </td>
                <td className="px-5 py-3 text-right font-medium">{NGN(l.value)}</td>
                <td className="px-5 py-3 text-xs text-muted-foreground">{l.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile cards */}
        <div className="divide-y divide-border sm:hidden">
          {leads.map((l) => (
            <div key={l.id} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 px-4 py-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{l.name}</div>
                <div className="truncate text-xs text-muted-foreground">{l.company}</div>
                <span className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${stageMeta[l.stage].tone}`}>
                  {stageMeta[l.stage].label}
                </span>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-sm font-medium">{NGN(l.value)}</div>
                <div className="text-[11px] text-muted-foreground">{l.updatedAt}</div>
              </div>
            </div>
          ))}
        </div>

        {leads.length === 0 && (
          <div className="p-10 text-center text-sm text-muted-foreground">
            No leads match your search.
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3 py-1 text-xs transition ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-surface text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Printer, Trash2, Receipt } from "lucide-react";

import { useAuth } from "@/lib/auth";
import { NGN, mockInvoices, invoiceStatusMeta } from "@/lib/mock-data";

export const Route = createFileRoute("/app/invoices")({
  component: InvoicesPage,
});

type LineItem = { id: string; description: string; qty: number; unit: number };

function InvoicesPage() {
  const { user } = useAuth();
  const [client, setClient] = useState("");
  const [issued, setIssued] = useState(new Date().toISOString().slice(0, 10));
  const [due, setDue] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().slice(0, 10);
  });
  const [items, setItems] = useState<LineItem[]>([
    { id: crypto.randomUUID(), description: "", qty: 1, unit: 0 },
  ]);
  const [tax, setTax] = useState(7.5);

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.qty * i.unit, 0), [items]);
  const taxAmt = subtotal * (tax / 100);
  const total = subtotal + taxAmt;

  return (
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-6">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-accent text-accent-foreground">
            <Receipt className="h-4.5 w-4.5" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight">Invoices</h1>
            <p className="text-xs text-muted-foreground">Build a branded invoice in seconds.</p>
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-sm hover:bg-muted"
        >
          <Printer className="h-4 w-4" /> Print / PDF
        </button>
      </header>

      <div className="grid gap-5 lg:grid-cols-5">
        {/* Editor */}
        <section className="surface-card space-y-4 p-5 lg:col-span-2 print:hidden">
          <h2 className="text-sm font-semibold">Invoice details</h2>
          <Field label="Bill to">
            <input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Client name" className="field" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Issued">
              <input type="date" value={issued} onChange={(e) => setIssued(e.target.value)} className="field" />
            </Field>
            <Field label="Due">
              <input type="date" value={due} onChange={(e) => setDue(e.target.value)} className="field" />
            </Field>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-medium">Line items</span>
              <button
                onClick={() => setItems([...items, { id: crypto.randomUUID(), description: "", qty: 1, unit: 0 }])}
                className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-0.5 text-xs hover:bg-muted"
              >
                <Plus className="h-3 w-3" /> Add
              </button>
            </div>
            <div className="space-y-2">
              {items.map((it, idx) => (
                <div key={it.id} className="grid grid-cols-[1fr_56px_88px_28px] items-center gap-2">
                  <input
                    placeholder="Description"
                    value={it.description}
                    onChange={(e) =>
                      setItems(items.map((x) => (x.id === it.id ? { ...x, description: e.target.value } : x)))
                    }
                    className="field"
                  />
                  <input
                    type="number"
                    min={1}
                    value={it.qty}
                    onChange={(e) =>
                      setItems(items.map((x) => (x.id === it.id ? { ...x, qty: Number(e.target.value) || 0 } : x)))
                    }
                    className="field"
                  />
                  <input
                    type="number"
                    min={0}
                    value={it.unit}
                    onChange={(e) =>
                      setItems(items.map((x) => (x.id === it.id ? { ...x, unit: Number(e.target.value) || 0 } : x)))
                    }
                    className="field"
                  />
                  <button
                    onClick={() => setItems(items.filter((x) => x.id !== it.id))}
                    disabled={items.length === 1}
                    className="grid h-9 w-7 place-items-center rounded-md text-muted-foreground hover:bg-muted disabled:opacity-30"
                    aria-label={`Remove line ${idx + 1}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Field label="Tax %">
            <input
              type="number"
              min={0}
              value={tax}
              onChange={(e) => setTax(Number(e.target.value) || 0)}
              className="field"
            />
          </Field>
        </section>

        {/* Preview */}
        <section className="surface-card p-6 lg:col-span-3 print:border-0 print:p-0 print:shadow-none">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Invoice</div>
              <div className="mt-1 font-display text-xl font-semibold">INV-{Math.floor(Math.random() * 1000) + 1047}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold">{user?.business}</div>
              <div className="text-xs text-muted-foreground">{user?.email}</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Bill to</div>
              <div className="mt-1 font-medium">{client || "Client name"}</div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Issued · Due</div>
              <div className="mt-1">
                {issued} · {due}
              </div>
            </div>
          </div>

          <table className="mt-6 w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-2 font-medium">Description</th>
                <th className="py-2 text-right font-medium">Qty</th>
                <th className="py-2 text-right font-medium">Unit</th>
                <th className="py-2 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-b border-border">
                  <td className="py-2.5">{it.description || <span className="text-muted-foreground">—</span>}</td>
                  <td className="py-2.5 text-right">{it.qty}</td>
                  <td className="py-2.5 text-right">{NGN(it.unit)}</td>
                  <td className="py-2.5 text-right font-medium">{NGN(it.qty * it.unit)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 ml-auto w-full max-w-[260px] space-y-1.5 text-sm">
            <Row k="Subtotal" v={NGN(subtotal)} />
            <Row k={`Tax (${tax}%)`} v={NGN(taxAmt)} />
            <div className="my-2 border-t border-border" />
            <Row k="Total" v={NGN(total)} bold />
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            Thank you for your business. Payment due by {due}. Bank transfer details available on request.
          </p>
        </section>
      </div>

      {/* Recent invoices */}
      <section className="mt-6 surface-card print:hidden">
        <div className="border-b border-border px-5 py-3">
          <h2 className="text-sm font-semibold">Recent invoices</h2>
        </div>
        <div className="divide-y divide-border">
          {mockInvoices.map((i) => (
            <div key={i.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-5 py-3 text-sm sm:grid-cols-[120px_1fr_auto_auto]">
              <div className="hidden font-mono text-xs sm:block">{i.number}</div>
              <div className="min-w-0">
                <div className="truncate font-medium">{i.client}</div>
                <div className="text-xs text-muted-foreground sm:hidden">{i.number}</div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${invoiceStatusMeta[i.status].tone}`}>
                {invoiceStatusMeta[i.status].label}
              </span>
              <div className="text-right font-medium">{NGN(i.amount)}</div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .field {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          padding: 0.5rem 0.65rem;
          font-size: 0.875rem;
          color: var(--color-foreground);
        }
        .field:focus { outline: none; border-color: var(--color-ring); box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-ring) 25%, transparent); }
        @media print { body { background: white; } }
      `}</style>
    </div>
  );
}

function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${bold ? "text-base font-semibold" : "text-muted-foreground"}`}>
      <span>{k}</span>
      <span className={bold ? "text-foreground" : ""}>{v}</span>
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

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  FileText,
  Receipt,
  Users,
  LineChart,
  ShieldCheck,
  Check,
  Zap,
  Bot,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Austech Business OS — Run your business with AI" },
      {
        name: "description",
        content:
          "The AI business operating system for African SMEs. Proposals, invoices, CRM, analytics and an AI consultant — in one calm workspace.",
      },
      { property: "og:title", content: "Austech Business OS" },
      {
        property: "og:description",
        content: "Proposals, invoices, CRM, analytics and an AI consultant — built for African businesses.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Bot, title: "AI Business Consultant", body: "Ask anything — pricing, hiring, expansion. Get pragmatic, Africa-aware answers in seconds." },
  { icon: FileText, title: "Proposal Generator", body: "Turn a brief into a polished, client-ready proposal — written in your voice." },
  { icon: Receipt, title: "Invoice Generator", body: "Send branded invoices in NGN with reminders and payment tracking." },
  { icon: Users, title: "CRM & Lead Management", body: "Track every contact, stage and follow-up in one tidy pipeline." },
  { icon: LineChart, title: "Analytics Dashboard", body: "Revenue, conversion and pipeline health — at a glance, in real time." },
  { icon: ShieldCheck, title: "Built for Africa", body: "NGN by default, WhatsApp-friendly, designed for low-bandwidth realities." },
];

const tiers = [
  {
    name: "Starter",
    price: "₦5,000",
    cadence: "/month",
    blurb: "For solo founders & freelancers.",
    features: ["AI Consultant (50 chats/mo)", "10 proposals", "20 invoices", "Up to 100 contacts", "Email support"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Growth",
    price: "₦15,000",
    cadence: "/month",
    blurb: "For growing teams and agencies.",
    features: ["Unlimited AI Consultant", "Unlimited proposals", "Unlimited invoices", "Unlimited contacts", "Analytics & exports", "Priority support"],
    cta: "Start free",
    highlight: true,
  },
  {
    name: "Scale",
    price: "₦50,000",
    cadence: "/month",
    blurb: "For established SMEs.",
    features: ["Everything in Growth", "Team seats (up to 10)", "Custom templates", "API access", "Dedicated onboarding"],
    cta: "Talk to sales",
    highlight: false,
  },
];

function Landing() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Austech</span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <a href="#why" className="hover:text-foreground">Why Austech</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/auth"
              className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline"
            >
              Sign in
            </Link>
            <Link
              to="/auth"
              search={{ mode: "signup" }}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Get started <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="border-b border-border/70">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" /> Built for African SMEs
              </div>
              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
                Run your business with{" "}
                <span className="bg-gradient-to-br from-primary to-chart-4 bg-clip-text text-transparent">AI</span>.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
                Austech is one calm workspace for proposals, invoices, CRM, analytics — and an AI consultant that knows
                how business works here.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
                <Link
                  to="/auth"
                  search={{ mode: "signup" }}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:w-auto"
                >
                  Start free <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex w-full items-center justify-center rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted sm:w-auto"
                >
                  See features
                </a>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">No credit card required · Free during beta</p>
            </div>

            {/* Faux product preview */}
            <div className="mx-auto mt-16 max-w-5xl">
              <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-[0_30px_80px_-40px_oklch(0.46_0.18_268/0.35)]">
                <div className="flex items-center gap-1.5 border-b border-border bg-surface-muted px-3 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                  <span className="ml-3 text-[11px] text-muted-foreground">app.austech.os / dashboard</span>
                </div>
                <div className="grid grid-cols-12">
                  <aside className="col-span-3 hidden border-r border-border p-3 text-xs sm:block">
                    {["Home", "AI Consultant", "Proposals", "Invoices", "CRM", "Analytics"].map((t, i) => (
                      <div
                        key={t}
                        className={`flex items-center gap-2 rounded px-2 py-1.5 ${
                          i === 1 ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                        {t}
                      </div>
                    ))}
                  </aside>
                  <div className="col-span-12 p-6 sm:col-span-9">
                    <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">AI Consultant</div>
                    <h3 className="mt-1 text-lg font-semibold">How do I price a retainer for a Lagos fintech client?</h3>
                    <div className="mt-4 rounded-lg border border-border bg-background p-4 text-sm leading-relaxed text-foreground">
                      For a Lagos fintech retainer, anchor on value, not hours. Start at <strong>₦1.2M–₦2.5M/month</strong>{" "}
                      depending on scope and seniority. Tier the offer (Essential / Growth / Strategic) and bake in a 90-day
                      review clause…
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {[
                        ["Revenue MTD", "₦4.95M"],
                        ["Open invoices", "3"],
                        ["Active leads", "12"],
                      ].map(([k, v]) => (
                        <div key={k} className="rounded-md border border-border bg-surface-muted p-3">
                          <div className="text-[11px] text-muted-foreground">{k}</div>
                          <div className="mt-0.5 font-display text-lg font-semibold">{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section id="why" className="border-b border-border/70 bg-surface-muted">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">The problem</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Most African SMEs run their business in WhatsApp and notebooks.
              </h2>
              <p className="mt-4 text-muted-foreground">
                No proposals. No contracts. No invoicing system. No CRM. Leads slip. Cash flow guesses. Growth stalls.
                Austech replaces 6 tools with one calm workspace.
              </p>
            </div>
            <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
              {[
                ["No proposals", "Drafted in 30 seconds, not 3 days."],
                ["No invoices", "Send branded, in NGN, with reminders."],
                ["No CRM", "Every lead, stage and follow-up in one view."],
              ].map(([h, b]) => (
                <div key={h} className="bg-surface p-6">
                  <div className="text-sm font-semibold">{h}</div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-b border-border/70">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Features</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Everything you need. Nothing you don't.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon: Icon, title, body }) => (
                <div key={title} className="surface-card p-6 transition hover:border-border-strong">
                  <div className="grid h-9 w-9 place-items-center rounded-md bg-accent text-accent-foreground">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-b border-border/70 bg-surface-muted">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Pricing</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Honest pricing. In Naira.
              </h2>
              <p className="mt-3 text-muted-foreground">Pay monthly. Cancel anytime. No hidden fees.</p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {tiers.map((t) => (
                <div
                  key={t.name}
                  className={`relative flex flex-col rounded-xl border p-6 ${
                    t.highlight
                      ? "border-primary bg-surface shadow-[0_20px_60px_-30px_oklch(0.46_0.18_268/0.45)]"
                      : "border-border bg-surface"
                  }`}
                >
                  {t.highlight && (
                    <span className="absolute -top-2.5 right-6 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary-foreground">
                      Most popular
                    </span>
                  )}
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="font-display text-3xl font-semibold tracking-tight">{t.price}</span>
                    <span className="text-sm text-muted-foreground">{t.cadence}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{t.blurb}</p>
                  <ul className="mt-5 space-y-2.5 text-sm">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/auth"
                    search={{ mode: "signup" }}
                    className={`mt-7 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition ${
                      t.highlight
                        ? "bg-primary text-primary-foreground hover:opacity-90"
                        : "border border-border bg-surface hover:bg-muted"
                    }`}
                  >
                    {t.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-b border-border/70">
          <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
            <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-foreground">
              <Zap className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              Start running your business properly today.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Free during beta. Set up in under 5 minutes.
            </p>
            <Link
              to="/auth"
              search={{ mode: "signup" }}
              className="mt-7 inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Create your workspace <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <div className="grid h-5 w-5 place-items-center rounded bg-primary text-primary-foreground">
              <Sparkles className="h-3 w-3" />
            </div>
            <span>© {new Date().getFullYear()} Austech Business OS</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <Link to="/auth" className="hover:text-foreground">Sign in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

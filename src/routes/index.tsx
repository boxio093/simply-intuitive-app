import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  Receipt,
  Users,
  LineChart,
  ShieldCheck,
  Check,
  Bot,
  Sparkles,
  Quote,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Austech — The AI operating system for African business" },
      {
        name: "description",
        content:
          "Replace 6 tools with one calm workspace. Proposals, invoices, CRM, analytics and an AI consultant — built for African SMEs, freelancers and agencies.",
      },
      { property: "og:title", content: "Austech — The AI operating system for African business" },
      {
        property: "og:description",
        content: "Proposals, invoices, CRM, analytics and an AI consultant — built for African SMEs.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Bot, title: "AI Consultant", body: "Pricing, hiring, market entry — pragmatic, Africa-aware answers in seconds." },
  { icon: FileText, title: "Proposals", body: "Turn a brief into a polished, client-ready proposal in your voice." },
  { icon: Receipt, title: "Invoices", body: "Branded NGN invoices, reminders and clean payment tracking." },
  { icon: Users, title: "CRM", body: "Every lead, stage and follow-up in one tidy pipeline." },
  { icon: LineChart, title: "Analytics", body: "Revenue, conversion and pipeline health at a glance." },
  { icon: ShieldCheck, title: "Built for Africa", body: "NGN-native, WhatsApp-friendly, designed for the realities here." },
];

const tiers = [
  {
    name: "Starter",
    price: "₦5,000",
    cadence: "/month",
    blurb: "Solo founders & freelancers.",
    features: ["AI Consultant (50/mo)", "10 proposals", "20 invoices", "100 contacts"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Growth",
    price: "₦15,000",
    cadence: "/month",
    blurb: "Growing teams and agencies.",
    features: ["Unlimited AI Consultant", "Unlimited proposals & invoices", "Unlimited contacts", "Analytics & exports", "Priority support"],
    cta: "Start free",
    highlight: true,
  },
  {
    name: "Scale",
    price: "₦50,000",
    cadence: "/month",
    blurb: "Established SMEs.",
    features: ["Everything in Growth", "Team seats (10)", "Custom templates", "API access", "Dedicated onboarding"],
    cta: "Talk to sales",
    highlight: false,
  },
];

function Landing() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <main>
        <Hero />
        <Marquee />
        <FeaturedStory />
        <FeatureGrid />
        <Workflow />
        <Pricing />
        <FinalCta />
      </main>

      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 transition hover:opacity-80">
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition hover:text-foreground">Features</a>
          <a href="#workflow" className="transition hover:text-foreground">How it works</a>
          <a href="#pricing" className="transition hover:text-foreground">Pricing</a>
        </nav>
        <div className="flex items-center gap-1.5">
          <Link
            to="/auth"
            search={{ mode: "signin" }}
            className="hidden rounded-md px-3 py-1.5 text-sm text-muted-foreground transition hover:text-foreground sm:inline-block"
          >
            Sign in
          </Link>
          <Link
            to="/auth"
            search={{ mode: "signup" }}
            className="group inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background transition hover:bg-foreground/85"
          >
            Get started
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Wordmark() {
  return (
    <div className="flex items-center gap-2">
      <div className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-background">
        <Sparkles className="h-3.5 w-3.5" />
      </div>
      <span className="font-display text-[15px] font-semibold tracking-tight">Austech</span>
    </div>
  );
}

function Hero() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-20">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7 animate-fade-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              Issue 01 · The AI Business OS
            </div>
            <h1 className="text-balance font-display text-[40px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[64px] lg:text-[78px]">
              Run your business
              <br />
              like a <em className="not-italic text-primary">serious</em> company.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
              Austech replaces six scattered tools with one calm workspace — proposals, invoices,
              CRM, analytics and an AI consultant that understands how business actually works in Africa.
            </p>
            <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center">
              <Link
                to="/auth"
                search={{ mode: "signup" }}
                className="group inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_8px_24px_-12px_oklch(0.55_0.24_270/0.6)] transition hover:translate-y-[-1px] hover:shadow-[0_12px_30px_-12px_oklch(0.55_0.24_270/0.7)]"
              >
                Start free — 5 minutes setup
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#workflow"
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                See how it works
              </a>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              No credit card · Free during beta · NGN-native
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-3xl bg-[radial-gradient(circle_at_30%_20%,oklch(0.55_0.24_270/0.18),transparent_60%)]"
              />
              <ProductCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-[0_30px_80px_-40px_oklch(0_0_0/0.25)] animate-fade-up">
      <div className="flex items-center gap-1.5 border-b border-border bg-surface-muted px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-border-strong" />
        <span className="h-2 w-2 rounded-full bg-border-strong" />
        <span className="h-2 w-2 rounded-full bg-border-strong" />
        <span className="ml-2 truncate text-[11px] text-muted-foreground">austech.app / consultant</span>
      </div>
      <div className="space-y-3 p-5">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">AI Consultant</div>
        <h3 className="font-display text-[15px] font-semibold leading-snug">
          How do I price a 6-month retainer for a Lagos fintech?
        </h3>
        <div className="rounded-lg border border-border bg-background p-3.5 text-[13px] leading-relaxed text-foreground">
          Anchor on value, not hours. Tier <strong>₦1.2M–₦2.5M/mo</strong> across
          Essential / Growth / Strategic with a 90-day review clause and milestone-based payouts…
        </div>
        <div className="grid grid-cols-3 gap-2 pt-1">
          {[
            ["MRR", "₦4.95M"],
            ["Open", "3"],
            ["Leads", "12"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-md border border-border bg-surface-muted px-3 py-2">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
              <div className="font-display text-base font-semibold tracking-tight">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Marquee() {
  const items = ["Lagos", "Nairobi", "Accra", "Kigali", "Cape Town", "Abuja", "Dakar", "Kampala"];
  return (
    <section className="border-b border-border/60 bg-surface-muted/60">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="text-foreground/70">In use across</span>
          {items.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedStory() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">The story</p>
            <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              Most African SMEs run on WhatsApp and notebooks.
            </h2>
            <p className="mt-5 text-muted-foreground">
              No proposals. No contracts. No invoicing system. No CRM. Leads slip,
              cash flow becomes a guess, growth quietly stalls. Austech is the
              calm operating system underneath the hustle.
            </p>
            <div className="mt-8 flex items-center gap-3 rounded-xl border border-border bg-surface p-5">
              <Quote className="h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm leading-relaxed">
                "I drafted my first investor proposal in 4 minutes. Austech feels like
                a CFO and a chief of staff in one tab."
                <span className="mt-2 block text-xs text-muted-foreground">— Ada Obi, Bloom Agro Ltd</span>
              </p>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border lg:col-span-7 lg:grid-cols-2">
            {[
              ["−6 tools", "Replaces Excel, Word, Gmail templates, WhatsApp, Notion and notebooks."],
              ["+90% faster", "Proposals in 30 seconds, invoices in 10, follow-ups in one click."],
              ["NGN-native", "Naira-first amounts, local tax fields, WhatsApp-share by default."],
              ["AI-first", "An always-on consultant who knows your numbers and your market."],
            ].map(([h, b]) => (
              <div key={h} className="group relative bg-surface p-6 transition hover:bg-surface-muted">
                <div className="font-display text-2xl font-semibold tracking-tight">{h}</div>
                <p className="mt-2 text-sm text-muted-foreground">{b}</p>
                <ArrowUpRight className="absolute right-5 top-5 h-4 w-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section id="features" className="border-b border-border/60 bg-surface-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">Inside</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Six tools. One calm workspace.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Each module is sharp on its own — and quietly powerful when they work together.
          </p>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title} className="group bg-surface p-6 transition hover:bg-background">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-accent text-accent-foreground transition group-hover:scale-105">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Workflow() {
  const steps = [
    ["01", "Create your workspace", "Sign up, add your business name and currency. 30 seconds."],
    ["02", "Bring in a deal", "Ask the AI to draft a proposal or paste a brief from WhatsApp."],
    ["03", "Send · track · get paid", "Branded invoices, smart follow-ups, dashboards that close loops."],
  ];
  return (
    <section id="workflow" className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">How it works</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            From "we should do this" to "it's done" — in one afternoon.
          </h2>
        </div>
        <ol className="mt-12 grid gap-5 sm:grid-cols-3">
          {steps.map(([n, t, b]) => (
            <li
              key={n}
              className="surface-card relative p-6 transition hover:border-border-strong hover:shadow-[0_20px_50px_-30px_oklch(0_0_0/0.2)]"
            >
              <span className="font-display text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
                Step {n}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="border-b border-border/60 bg-surface-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">Pricing</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Honest pricing. In Naira.
          </h2>
          <p className="mt-3 text-muted-foreground">Pay monthly. Cancel anytime. No hidden fees.</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-2xl border p-7 transition ${
                t.highlight
                  ? "border-foreground/15 bg-surface shadow-[0_30px_80px_-40px_oklch(0_0_0/0.3)]"
                  : "border-border bg-surface hover:border-border-strong"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-7 rounded-full bg-foreground px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-background">
                  Most popular
                </span>
              )}
              <div className="font-display text-sm font-semibold tracking-tight">{t.name}</div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold tracking-[-0.03em]">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.cadence}</span>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">{t.blurb}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/auth"
                search={{ mode: "signup" }}
                className={`mt-8 inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition ${
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
  );
}

function FinalCta() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-foreground p-10 text-background sm:p-16">
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/40 blur-3xl"
          />
          <div className="relative">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-background/60">
              Ready when you are
            </p>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              Start running your business properly today.
            </h2>
            <p className="mt-4 max-w-md text-sm text-background/70">
              Free during beta. Setup in under 5 minutes. No credit card required.
            </p>
            <Link
              to="/auth"
              search={{ mode: "signup" }}
              className="group mt-8 inline-flex items-center justify-center gap-1.5 rounded-md bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:bg-background/90"
            >
              Create your workspace
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <Wordmark />
        <div className="flex flex-wrap items-center justify-center gap-5">
          <a href="#features" className="transition hover:text-foreground">Features</a>
          <a href="#workflow" className="transition hover:text-foreground">How it works</a>
          <a href="#pricing" className="transition hover:text-foreground">Pricing</a>
          <Link to="/auth" className="transition hover:text-foreground">Sign in</Link>
        </div>
        <span>© {new Date().getFullYear()} Austech</span>
      </div>
    </footer>
  );
}

import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/lib/auth";

const search = z.object({
  mode: z.enum(["signin", "signup"]).default("signin").catch("signin"),
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Sign in — Austech" },
      { name: "description", content: "Sign in or create your Austech workspace." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { mode, redirect } = Route.useSearch();
  const isSignup = mode === "signup";
  const navigate = useNavigate();
  const { user, signIn, signUp, loading: authLoading } = useAuth();

  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && user) navigate({ to: redirect ?? "/app" });
  }, [authLoading, user, redirect, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isSignup) await signUp(name || "Founder", email, password, business || "My Business");
      else await signIn(email, password);
      toast.success(isSignup ? "Workspace created" : "Welcome back");
      navigate({ to: redirect ?? "/app" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-2">
      {/* Left: form */}
      <div className="flex flex-col px-6 py-8 sm:px-12">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Austech</span>
        </Link>

        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-sm">
            <h1 className="font-display text-3xl font-semibold tracking-tight">
              {isSignup ? "Create your workspace" : "Welcome back"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {isSignup
                ? "Free during beta. No credit card required."
                : "Sign in to continue to your workspace."}
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              {isSignup && (
                <>
                  <Field label="Your name">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      required
                      placeholder="Ada Obi"
                      className="input"
                    />
                  </Field>
                  <Field label="Business name">
                    <input
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                      autoComplete="organization"
                      required
                      placeholder="Obi & Co."
                      className="input"
                    />
                  </Field>
                </>
              )}
              <Field label="Email">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  placeholder="you@business.com"
                  className="input"
                />
              </Field>
              <Field label="Password">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="input"
                />
              </Field>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <>
                  {isSignup ? "Create workspace" : "Sign in"} <ArrowRight className="h-4 w-4" />
                </>}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {isSignup ? "Already have an account? " : "New to Austech? "}
              <Link
                to="/auth"
                search={{ mode: isSignup ? "signin" : "signup" }}
                className="font-medium text-primary hover:underline"
              >
                {isSignup ? "Sign in" : "Create one"}
              </Link>
            </p>

            <p className="mt-10 text-center text-xs text-muted-foreground">
              Demo mode: any email and password unlocks the workspace.
            </p>
          </div>
        </div>
      </div>

      {/* Right: visual */}
      <div className="relative hidden overflow-hidden border-l border-border bg-surface-muted lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.46_0.18_268/0.18),transparent_60%)]" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <div />
          <div className="max-w-md">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Built for Africa</p>
            <p className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight">
              "I drafted my first investor proposal in 4 minutes. Austech feels like having a CFO and a chief of staff in
              one tab."
            </p>
            <p className="mt-4 text-sm text-muted-foreground">— Ada Obi, founder · Bloom Agro Ltd</p>
          </div>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          padding: 0.55rem 0.75rem;
          font-size: 0.875rem;
          color: var(--color-foreground);
          transition: border-color 120ms, box-shadow 120ms;
        }
        .input::placeholder { color: var(--color-muted-foreground); }
        .input:focus { outline: none; border-color: var(--color-ring); box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-ring) 25%, transparent); }
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

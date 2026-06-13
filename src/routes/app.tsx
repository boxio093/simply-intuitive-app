import { createFileRoute, Outlet, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Home,
  Bot,
  FileText,
  Receipt,
  Users,
  LineChart,
  Settings,
  Sparkles,
  LogOut,
  Menu,
  X,
  Search,
} from "lucide-react";

import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/app")({
  component: AppShell,
});

type NavItem = {
  to: "/app" | "/app/consultant" | "/app/proposals" | "/app/invoices" | "/app/crm" | "/app/analytics" | "/app/settings";
  label: string;
  icon: typeof Home;
  exact?: boolean;
};

const nav: NavItem[] = [
  { to: "/app", label: "Home", icon: Home, exact: true },
  { to: "/app/consultant", label: "AI Consultant", icon: Bot },
  { to: "/app/proposals", label: "Proposals", icon: FileText },
  { to: "/app/invoices", label: "Invoices", icon: Receipt },
  { to: "/app/crm", label: "CRM", icon: Users },
  { to: "/app/analytics", label: "Analytics", icon: LineChart },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

const mobileNav = nav.filter((n) => n.label !== "Settings").slice(0, 5);

function AppShell() {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth", search: { mode: "signin", redirect: pathname } });
  }, [loading, user, navigate, pathname]);

  useEffect(() => setMobileOpen(false), [pathname]);

  if (loading || !user) {
    return (
      <div className="grid min-h-dvh place-items-center bg-background text-sm text-muted-foreground">
        Loading workspace…
      </div>
    );
  }

  const initials = user.name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <div className="flex min-h-dvh bg-background text-foreground">
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-sidebar md:flex">
        <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-background">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0">
            <div className="truncate font-display text-[14px] font-semibold tracking-tight">Austech</div>
            <div className="truncate text-[11px] text-muted-foreground">{user.business}</div>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 p-2">
          {nav.map(({ to, label, icon: Icon, exact }) => {
            const active = isActive(to, exact);
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition ${
                  active
                    ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-2">
          <div className="flex items-center gap-2 rounded-md px-2 py-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{user.name}</div>
              <div className="truncate text-[11px] text-muted-foreground">{user.email}</div>
            </div>
            <button
              onClick={() => {
                signOut();
                navigate({ to: "/" });
              }}
              aria-label="Sign out"
              className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-foreground/30" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col border-r border-border bg-sidebar">
            <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4">
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="text-sm font-semibold tracking-tight">Austech</div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-muted"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex-1 space-y-0.5 p-2">
              {nav.map(({ to, label, icon: Icon, exact }) => {
                const active = isActive(to, exact);
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition ${
                      active
                        ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                        : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
                    {label}
                  </Link>
                );
              })}
            </nav>
            <button
              onClick={() => {
                signOut();
                navigate({ to: "/" });
              }}
              className="m-2 inline-flex items-center justify-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground hover:bg-muted"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-border bg-background/85 px-3 backdrop-blur sm:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-muted md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative hidden flex-1 max-w-md sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search leads, invoices, proposals…"
              className="w-full rounded-md border border-border bg-surface py-1.5 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/app/consultant"
              className="hidden items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 sm:inline-flex"
            >
              <Bot className="h-3.5 w-3.5" /> Ask AI
            </Link>
            <div className="grid h-8 w-8 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
              {initials}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="min-w-0 flex-1 px-3 pb-24 pt-4 sm:px-6 sm:pb-10 sm:pt-6">
          <Outlet />
        </main>

        {/* Mobile bottom nav */}
        <nav className="fixed inset-x-0 bottom-0 z-20 flex border-t border-border bg-background/95 backdrop-blur md:hidden">
          {mobileNav.map(({ to, label, icon: Icon, exact }) => {
            const active = isActive(to, exact);
            return (
              <Link
                key={to}
                to={to}
                className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                <span className="truncate">{label.replace("AI ", "")}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

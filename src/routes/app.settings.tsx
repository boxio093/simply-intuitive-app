import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Settings, LogOut } from "lucide-react";

import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-md bg-accent text-accent-foreground">
          <Settings className="h-4.5 w-4.5" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-xs text-muted-foreground">Workspace and profile preferences.</p>
        </div>
      </header>

      <section className="surface-card p-6">
        <h2 className="text-sm font-semibold">Profile</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Name" value={user?.name ?? ""} />
          <Field label="Email" value={user?.email ?? ""} />
          <Field label="Business" value={user?.business ?? ""} />
          <Field label="Plan" value="Starter (beta)" />
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Profile editing will be available when we enable the backend.
        </p>
      </section>

      <section className="surface-card p-6">
        <h2 className="text-sm font-semibold">Account</h2>
        <p className="mt-1 text-xs text-muted-foreground">Sign out of your workspace.</p>
        <button
          onClick={() => {
            signOut();
            navigate({ to: "/" });
          }}
          className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/15"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </section>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className="mt-1 rounded-md border border-border bg-surface-muted px-3 py-2 text-sm">{value || "—"}</div>
    </div>
  );
}

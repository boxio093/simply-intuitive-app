# Austech Business OS — Core MVP

An AI-powered business operating system for African SMEs, freelancers, and agencies. This first pass is a clickable, mobile-responsive MVP with mock data so you can validate demand before investing in the full backend.

## What gets built

**Public**
- Landing page (Stripe-inspired): hero, problem/solution, feature grid, pricing tiers (₦5k / ₦15k / ₦50k), footer
- Auth screens (sign in / sign up) — mock auth, stored locally for now

**Dashboard (Linear + Notion hybrid)**
- Collapsible sidebar nav, top command bar, keyboard-friendly
- Home: greeting, KPI cards, recent activity, quick actions
- AI Consultant: chat interface, powered by Lovable AI (Gemini)
- Proposal Generator: form → AI-drafted proposal preview
- Invoice Generator: line items → branded invoice preview, print-ready
- CRM: lead/contact list with mock data, detail drawer, status pipeline
- Analytics: revenue, leads, conversion charts (mock data, Recharts)
- Settings: profile, workspace stub

**System-wide**
- Mobile bottom nav + responsive sidebar (off-canvas on mobile)
- Empty states, loading skeletons, toasts
- Light theme first (Linear-style near-white surfaces, restrained accents)
- WCAG-friendly contrast, keyboard nav, focus states

## Design direction

- **Structure & speed:** Linear — narrow sidebar, dense rows, sharp typography, monochrome surfaces with one accent
- **Workspace feel:** Notion — generous cards, soft dividers, calm canvas in content areas
- **Type:** Inter Tight (display) + Inter (body)
- **Palette:** near-white canvas, deep ink foreground, single indigo-leaning accent, subtle borders
- **Radius:** small (6–8px), tight spacing scale
- **Motion:** restrained — 150ms transitions, no decorative animation

## Out of scope (this pass)
Payments, real auth/database, multi-tenant orgs, AI Academy module, Insurance module, Cybersecurity module, real WhatsApp/email sending. Will add after validation.

## Technical notes

- TanStack Start routes under `src/routes/` — `index.tsx` (landing), `auth.tsx`, `_authenticated/` group for app shell with sidebar layout, child routes for each feature
- Design tokens in `src/styles.css` (`@theme` + `:root`), shadcn components customized via variants — no ad-hoc colors
- AI Consultant uses Lovable AI Gateway (`google/gemini-3-flash-preview`) via `createServerFn` in `src/lib/ai.functions.ts`; Proposal Generator uses the same gateway with a structured prompt
- Mock data lives in `src/lib/mock/` (leads, invoices, analytics) — typed, easy to swap for real backend later
- Recharts for analytics, lucide-react for icons, sonner for toasts
- No backend yet — auth is a local mock; flip to Lovable Cloud in the next pass when you're ready

## Validation checklist before handoff
- No horizontal scroll at 320px, 768px, 1280px, 1920px
- Sidebar collapses to icons on tablet, becomes bottom nav on mobile
- All forms keyboard-navigable with visible focus
- Landing → sign up → dashboard → each tool reachable in <5 clicks

Approve and I'll build it.
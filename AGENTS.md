# AI Cloud Tech — Agents Guide

## Project Snapshot
- **Mission:** Build a Japanese-first learning platform that helps users systematize their AI skill development (`frontend/src/app/layout.tsx:12-35`).
- **Current Scope:** A Next.js 16 front end with Clerk authentication, a placeholder landing page, and a dashboard shell; the backend directory is empty and ready for future APIs.
- **Primary Stack:** React 19 + TypeScript (strict mode), Tailwind CSS v4 tokens, Clerk for auth, and a shadcn-style UI kit (see `frontend/package.json` and `frontend/src/app/globals.css`).
- **Routes Online:** `/` (landing placeholder in `frontend/src/app/(landing)/page.tsx:1-7`) and `/dashboard` (scaffolded page in `frontend/src/app/(dashboard)/dashboard/page.tsx:1-3`) with a stubbed `/dashboard/settings` link.

## Tech & Environment
| Area | Details |
| --- | --- |
| Runtime | Next.js App Router (16.0.1) with React 19 |
| Language | TypeScript, `strict: true` (`frontend/tsconfig.json`) |
| Styling | Tailwind CSS v4 layers + custom OKLCH tokens (`frontend/src/app/globals.css`) |
| Auth | ClerkProvider wrapping the entire app (`frontend/src/app/layout.tsx:1-35`) and an `AuthButton` composed of Clerk primitives (`frontend/src/components/auth/auth-button.tsx:1-35`) |
| UI Toolkit | `src/components/ui/*` exports the shared shadcn-style primitives |
| Dev Commands | Run `npm install` then `npm run dev` / `npm run lint` inside `frontend/` |
| Env Vars | Standard Clerk keys (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, etc.) must be present when booting the front end |

## Directory Landmarks
- `frontend/src/app/(landing)` – Marketing/hero experience (currently a centered placeholder).
- `frontend/src/app/(dashboard)` – Authenticated app frame: `layout.tsx` builds the header/sidebar shell, `dashboard/page.tsx` is the default content surface.
- `frontend/src/components` – Feature-level building blocks (`auth`, `dashboard`, and a full UI kit).
- `frontend/src/config/nav.ts` – Source of truth for sidebar/command palette navigation.
- `frontend/src/hooks/use-mobile.ts` – Responsive helpers that mirror dashboard breakpoints.
- `frontend/src/lib/utils.ts` – Utility helpers (`cn`) for class composition.
- `backend/` – Empty placeholder for upcoming API, worker, or agent runtime code.

## Agent Profiles

### 1. Landing Experience Agent
- **Scope:** Everything under `frontend/src/app/(landing)` and any shared marketing assets.
- **Goals:** Replace the placeholder markup with actual hero/feature sections, ensure it remains fast and localized (Japanese copy, per metadata), and reuse shared UI primitives whenever possible.
- **Key Inputs:** Root layout fonts & metadata (`frontend/src/app/layout.tsx:1-35`), global tokens (`frontend/src/app/globals.css`), and any assets in `frontend/public`.
- **Definition of Done:** Landing renders meaningful content, adapts to dark mode, and links into `/dashboard` onboarding flows.

### 2. Dashboard Shell Agent
- **Scope:** `frontend/src/app/(dashboard)/dashboard/layout.tsx:1-48`, the child page surfaces, and supporting navigation components.
- **Goals:** Keep the sticky header, responsive sidebar, and main content area cohesive. Ensure the grid layout, scroll containers, and spacing remain aligned with Tailwind tokens.
- **Key Components:** `MobileNav` (`frontend/src/components/dashboard/mobile-nav.tsx:1-36`), `DashboardNav` (`frontend/src/components/dashboard/nav.tsx:1-38`), and the `navItems` config (`frontend/src/config/nav.ts:1-15`).
- **Notes:** Update `navItems` whenever pages move/rename; keep accessibility traits from the Radix-based Sheet and Buttons intact.

### 3. Authentication & Session Agent
- **Scope:** `ClerkProvider` wiring plus the reusable `AuthButton`.
- **Goals:** Guarantee protected routes work, the correct redirect URLs are set (`/dashboard`), and authenticated vs. anonymous states render the right controls.
- **Key Files:** `frontend/src/app/layout.tsx:1-35`, `frontend/src/components/auth/auth-button.tsx:1-35`.
- **Risks/Checks:** Validate Clerk env vars before deploys, keep `UserButton` sizing consistent across header/sidebar, and ensure modal auth flows remain accessible on mobile.

### 4. Navigation & Content Agent
- **Scope:** URL map, sidebar/command palette experiences, and upcoming dashboard modules under `frontend/src/app/(dashboard)`.
- **Goals:** Maintain a single source of truth in `navItems`, keep iconography consistent (Lucide), and coordinate route scaffolding (`/dashboard`, `/dashboard/settings`, future lessons or analytics screens).
- **Artifacts:** `frontend/src/config/nav.ts:1-15`, `frontend/src/types/types.ts:1-5`, and any `page.tsx` files under the dashboard segment.
- **Backlog Ideas:** Flesh out `/dashboard/settings`, add breadcrumbs or progress indicators, and connect to future backend data once available.

### 5. UI Foundation Agent
- **Scope:** Shared primitives (`frontend/src/components/ui/*`), responsive hooks (`frontend/src/hooks/use-mobile.ts:1-19`), and utility helpers (`frontend/src/lib/utils.ts:1-6`).
- **Goals:** Keep the design system cohesive, upgrade shadcn generators when needed, and document any bespoke variants or tokens added to `globals.css`.
- **Guidelines:** Prefer extending existing primitives over creating ad-hoc components, keep animations/Sheet interactions accessible, and ensure tree-shaking remains effective by exporting only what is used.

### 6. Backend/API Agent (Future)
- **Scope:** Populate `backend/` with services that power AI-driven features (content recommendations, progress tracking, agent workflows, etc.).
- **Starting Points:** Establish language/runtime (Node, Python, Go), define contracts that the dashboard will consume, and wire authentication to Clerk-issued tokens when necessary.
- **Status:** No source files yet—treat this as a greenfield area that must stay loosely coupled to the front end until APIs stabilize.

## Collaboration & Handoffs
- Keep TypeScript strictness green (`npm run lint`) before merging; the repo is currently lint-clean.
- When touching navigation or layout, update related stories/docs in this file so other agents stay in sync.
- Document new environment variables or API contracts inside `README.md` (global) and reference them here when they affect agent scopes.
- Prefer incremental PRs (landing, dashboard, backend) so agents can review scoped changes quickly.

## Known Gaps & Opportunities
- Landing content and dashboard modules are skeletal—prioritize building real sections next.
- There is no persistence layer yet; coordinate with the Backend/API agent before hard-coding data.
- Settings route lacks a page component; adding it will unblock customization hooks for Clerk or AI preferences.
- Add analytics/telemetry only after documenting the data flow and gaining consensus from all agents.

Use this document as the canonical map of responsibilities. Update it whenever a new surface or agent-level responsibility appears so future contributors can align quickly.

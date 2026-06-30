---
slice: 1
flow: 5 of 5 (part 1)
---

# Feature Spec: View Mode Projects (Dashboard)

## Goal
Show the user their current mode and its projects on the dashboard so they can immediately orient to their active context.

## Linear reference
Linear's "My Issues" filtered view — a header showing the active team/project name, followed by a clean flat list of items scoped to that context. Non-active contexts are not shown. Empty state is explicit and non-alarming.

## User story
As a user, I want to see my current mode and its projects on the dashboard so I know what I am supposed to be working on right now.

## Entities involved
- Mode (isCurrent)
- Project

## Core flow
1. User opens the dashboard (root route `/`).
2. App queries for the mode where `isCurrent = true`.
3. If found: current mode name is displayed prominently.
4. Projects belonging to that mode are listed below it.
5. If no current mode is set: empty state is shown with a prompt to set one.
6. If current mode has no projects: mode name is shown with a prompt to add a project.

## Rules / invariants
- Only projects belonging to the current mode are shown.
- Projects are scoped to the current mode — no cross-mode bleed.
- Dashboard is read-only in this spec (no create/edit actions here).
- Projects are ordered by `createdAt` descending by default.

## Agent delegation
- **Ana** → dashboard layout, current mode header, project list, empty states
- **data layer** → `src/app/page.tsx` server component → `prisma.mode.findFirst({ where: { isCurrent: true }, include: { projects: true } })`
- **tests** → Playwright → see E2E scenarios below

## E2E scenarios
- `shows the current mode name on the dashboard`
- `shows projects belonging to the current mode`
- `shows an empty state when no mode is set as current`
- `shows a no-projects state when the current mode has no projects`
- `does not show projects from non-current modes`

## Out of scope
- Editing projects from the dashboard
- Creating projects from the dashboard
- Switching modes from the dashboard
- Showing parked or archived projects
- Project status indicators

## Open questions
- Should the dashboard live at `/` or `/dashboard`?
- Should non-current modes be visible but visually receded, or completely hidden?

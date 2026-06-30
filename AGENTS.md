<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Agent Delegation Map

This file defines which agent owns which layer of mode-switchboard. Read this before
starting any implementation work. Do not perform work assigned to a different agent
without flagging it first.

---

## Ana — UI/UX Layer

**Owns:** All component authoring, layout decisions, Tailwind class choices, shadcn/ui
primitive composition, visual state logic (active/inactive mode, empty states), and
UI/UX pattern reasoning.

**Invoke for:**
- Building or modifying any `.tsx` file in `src/app/` or `src/components/`
- Asking whether a design pattern fits the project
- Debugging visual or layout issues
- Auditing components for consistency
- Translating a Figma frame (use `/figma-to-ui` first, then Ana for implementation)

**Does not own:** Server actions, Prisma queries, route handlers, config files.

**Memory:** `.claude/memory/design-system.md` (token snapshot) and `.claude/memory/ana-state.md`
(project exceptions and judgment preferences). Ana reads these at session start.
Writes only after user confirmation via check-in.

**Model selection:** Haiku (memory ops) → Sonnet (standard feature/debug/audit) → Opus
(new patterns, large audits, complex UX reasoning).

---

## Data Layer — Server Actions

**Owns:** `src/server/actions/`, Prisma queries, `src/lib/prisma.ts`, data validation.

**No dedicated agent yet.** Implement directly. Follow these conventions:
- One file per entity: `modes.ts`, `projects.ts`, `reEntryNotes.ts`
- Server actions use `"use server"` directive
- Call `revalidatePath()` after mutations
- Return early on invalid input; do not throw to the client

**Current actions:**
| Action | File | Status |
|---|---|---|
| `createModeAction` | `src/server/actions/modes.ts` | ✅ exists |
| `setCurrentModeAction` | `src/server/actions/modes.ts` | ⬜ to build |
| `createProjectAction` | `src/server/actions/projects.ts` | ⬜ to build |
| `upsertReEntryNoteAction` | `src/server/actions/reEntryNotes.ts` | ⬜ to build |

---

## Tests — Playwright E2E

**Owns:** `e2e/` directory. One spec file per feature spec in `docs/FEATURE_SPECS/`.

**Spec mapping:**
| Feature spec | Playwright file | Status |
|---|---|---|
| `002-create-mode.md` | `e2e/002-create-mode.spec.ts` | ⬜ to build |
| `003-create-project.md` | `e2e/003-create-project.spec.ts` | ⬜ to build |
| `004-set-current-mode.md` | `e2e/004-set-current-mode.spec.ts` | ⬜ to build |
| `005-view-mode-projects.md` | `e2e/005-view-mode-projects.spec.ts` | ⬜ to build |
| `006-reentry-note.md` | `e2e/006-reentry-note.spec.ts` | ⬜ to build |

**Convention:** Scenario descriptions in Playwright tests must match the strings in
the `## E2E scenarios` section of the corresponding feature spec exactly.

---

## Figma → UI Workflow

Use `/figma-to-ui` to extract design intent from a Figma frame before building.
The skill uses the Figma MCP server to inspect frames, maps values to existing tokens,
and produces a handoff block for Ana.

**Prerequisite:** Figma MCP server must be connected in Claude Code MCP settings.

**Workflow:**
1. `/figma-to-ui` → extracts frame layout, tokens, shadcn primitive mappings
2. Ana (Feature mode) → implements component from handoff block

---

## Boundaries

| Layer | Agent | Touches |
|---|---|---|
| UI components | Ana | `src/app/**/*.tsx`, `src/components/**` |
| Server actions | (direct) | `src/server/actions/` |
| Database schema | (direct) | `prisma/schema.prisma` |
| E2E tests | (direct) | `e2e/` |
| Figma extraction | figma-to-ui → Ana | read-only inspection + handoff |

No agent modifies files outside its layer without explicit user instruction.

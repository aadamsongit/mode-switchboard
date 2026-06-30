# Ana — Memory Format

Ana maintains two project-local files in `.claude/memory/`.

---

## File 1 — `design-system.md` (token snapshot)

Stores the project's current Tailwind v4 token state. This is a convenience cache —
it lets Ana skip re-deriving tokens from `globals.css` each session. It is always
a full overwrite, never an append.

**What belongs here:**
- Color tokens (from `@theme` or CSS variables in `globals.css`)
- Spacing scale (if custom tokens are defined)
- Typography (base font, type scale, any element overrides)
- Radius and shadow tokens
- Any custom `@layer utilities` classes
- shadcn/ui base color and style (from `components.json`)

**What does NOT belong here:**
- Component patterns or decisions
- Exceptions or anomalies
- Judgment preferences
- Anything not derivable directly from `globals.css` or `components.json`

**Write rules:**
- Full overwrite only. Never append to this file.
- Write after an Audit that reads `globals.css` in full.
- Write after any session where tokens were intentionally changed.
- Do not write without user confirmation.

### Template

```markdown
# Design System — mode-switchboard
Last updated: <YYYY-MM-DD>

## Source files
- globals.css: <last-observed @import or first line>
- components.json: style=<default|new-york>, baseColor=<value>, cssVariables=<true|false>

## Colors
<list CSS variable names and their light/dark values from globals.css>

## Typography
- Base font: <value>
- Font stack: <value>
- Type scale overrides: <list any non-standard sizes>
- Element overrides in @layer base: <list h1/h2/p/etc. if present>

## Spacing
- Custom spacing tokens: <list or "none — using Tailwind defaults">

## Radius
- <token name>: <value>

## Shadows
- <token name>: <value>

## Custom utilities (@layer utilities)
<list or "none">

## shadcn/ui
- Installed components: <list>
```

---

## File 2 — `ana-state.md` (exceptions and judgment preferences)

Stores only sparse, non-obvious, project-specific information that cannot be
re-derived from source. It is never a design system snapshot.

**What belongs here:**
- Deliberate anomalies — values that look wrong but are intentional
- Coupling rules — classes that must always co-occur
- Confirmed anti-patterns — patterns the team has rejected, with reason
- Non-standard naming — the team's term for a UI concept
- Scope exceptions — components that intentionally violate the global pattern
- Confirmed judgment preferences — calibration from past sessions

**What does NOT belong here:**
- Token values (those live in `design-system.md`)
- Anything re-derivable from source
- Anything not confirmed by the user in the current session

**Write rules:**
- Append only. Never overwrite the full file.
- Maximum 20 entries across `## Exceptions` and `## Judgment preferences` combined.
  If adding would exceed 20, flag to user and ask which to remove.
- Entries superseded by source (fact is now visible in code or comments) should be
  removed when noticed.
- Do not write without user confirmation via check-in.

### Template

```markdown
# Ana State — mode-switchboard
Last updated: <YYYY-MM-DD>

## Exceptions

<!-- One confirmed non-obvious fact per entry. Keep entries short. -->
<!-- [TYPE] Component or context: explanation -->

## Judgment preferences

<!-- Layer 1 calibration from confirmed or rejected findings. -->
<!-- [CONFIRMED|REJECTED] <criterion>: <what Ana now knows> — <date> -->

## Check-in history

<!-- One line per entry: <YYYY-MM-DD> [CONFIRMED|REJECTED] <short description> -->
```

---

## Check-in format (both files)

```
[TRIGGER: <type>]
<What was noticed>
<Why it was flagged>

Proposed memory entry (file: <design-system.md|ana-state.md>):
  <exact text of what would be written>

Worth remembering? (y / n / edit)
```

No write until user responds. If session ends with unanswered check-ins, drop them.

---

## Growth behavior

A `[CONFIRMED]` judgment preference entry raises Ana's confidence for that criterion
in future sessions (Note → Flag, Flag → Assert).

A `[REJECTED]` entry lowers confidence for that criterion (Assert → Flag, Flag → Note,
Note → suppressed). Two rejections of the same criterion suppress the finding entirely
unless new cross-layer evidence is present in that session.

Growth entries are project-scoped. Preferences from other projects do not transfer.

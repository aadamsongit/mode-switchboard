---
name: figma-to-ui
description: Translates a Figma frame into a mode-switchboard component using the Figma MCP server. Extracts design tokens and layout decisions, cross-references against Ana's memory, then hands off to Ana (Feature mode) for implementation.
---

# figma-to-ui (Orchestrator)

This skill bridges Figma inspection and Ana's Feature mode. It does not implement UI
itself — it extracts design intent from a Figma frame and produces a structured context
block that Ana can reason from.

---

## When to use

Invoke when you have a Figma frame URL and want to implement it as a component.
The output of this skill is the input to Ana's Feature mode.

---

## Step 1 — Get the Figma URL

If the user has not provided a Figma file URL and node ID, ask:
> "Paste the Figma frame link (right-click the frame in Figma → Copy link)."

A Figma frame link looks like:
`https://www.figma.com/design/<file-key>/...?node-id=<node-id>`

Extract the `file-key` and `node-id` from the URL.

---

## Step 2 — Inspect the frame via Figma MCP

Use the Figma MCP server tools to read the frame. Run these in parallel where the
MCP supports concurrent calls:

```
get_file(file_key)         → top-level file metadata, styles, components
get_node(file_key, node_id) → frame structure, layout, children
```

If the MCP exposes an image export tool, also fetch:
```
get_image(file_key, node_id, format="png", scale=2)
```

This gives a visual reference to hold alongside the structural data.

---

## Step 3 — Extract design decisions

From the MCP response, extract:

**Layout**
- Frame dimensions and constraints
- Layout mode (auto-layout vs. fixed, direction, gap, padding)
- Alignment and distribution

**Typography**
- Font family, size, weight, line height per text node
- Map to Tailwind classes where possible

**Color**
- Fill colors (hex or rgba) for backgrounds, text, borders
- Map to CSS variables in `globals.css` or note as new token

**Spacing**
- Padding, gap, margin values
- Map to Tailwind spacing scale where possible

**Radius and shadows**
- Border radius per layer
- Drop shadow values

**Component references**
- Any Figma components used in the frame (buttons, inputs, cards)
- Note which ones map to existing shadcn/ui primitives

---

## Step 4 — Cross-reference against Ana's memory

Read `.claude/memory/design-system.md`.

For each extracted value, note:
- **Match** — value aligns with a memory token (use the token)
- **Gap** — value is new; not in memory (flag for Ana to reason about)
- **Conflict** — value contradicts an existing token (flag; do not resolve automatically)

---

## Step 5 — Produce handoff block

Output a structured context block for Ana:

```
---
## Figma Handoff

Frame: <node name from MCP>
File: <file key>
Node: <node id>

### Layout
<extracted layout decisions>

### Typography
<text nodes with font properties → Tailwind mapping or "new token">

### Color
<fills → CSS variable match or "new: #value">

### Spacing
<padding/gap values → Tailwind scale match or "new: Npx">

### Radius / Shadows
<values → Tailwind match or "new">

### shadcn primitives
<which existing shadcn components map to Figma components in this frame>

### Gaps (new patterns not in design-system.md)
<list of values that have no current token match — Ana should flag before using>

### Conflicts
<list of values that contradict existing tokens — Ana must resolve before proceeding>
---
```

---

## Step 6 — Hand off to Ana

After producing the handoff block, invoke Ana in Feature mode by calling the Agent
tool with Ana's SKILL.md orchestrator, appending the handoff block to the user request:

> "Build [component name] from this Figma frame. Use the handoff block below as your
> Layer 1 and Layer 2 source. Flag any gaps or conflicts before implementing."

Pass the full handoff block as additional context.

---

## Notes

- This skill does not make design decisions. It extracts and maps. All decisions
  about gaps and conflicts belong to Ana.
- If the Figma MCP is not connected, tell the user:
  > "The Figma MCP server is not connected. Add it via Claude Code MCP settings,
  > then paste your Figma frame URL to proceed."
- Token conflicts are never silently resolved. Ana must surface them to the user.

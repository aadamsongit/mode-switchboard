---
slice: 1
flow: 4 of 5
---

# Feature Spec: Set Current Mode

## Goal

Let the user designate one mode as active so the dashboard can foreground it and its projects.

## Linear reference

Linear's team/workspace selector in the sidebar — clicking a team makes it the active context, which is visually prominent throughout the UI while other teams recede. The selection is immediate with no confirmation step.

## User story

As a user, I want to set one mode as current so the app foregrounds the projects I am allowed to care about right now.

## Entities involved

- Mode

## Core flow

1. User sees a list of modes, each with a "Set as current" control.
2. User clicks "Set as current" on a mode.
3. That mode's `isCurrent` is set to `true`.
4. Any previously current mode's `isCurrent` is set to `false`.
5. The newly current mode is visually distinguished from the others.

## Rules / invariants

- Only one mode can be current at a time.
- Setting a mode as current must unset all others atomically.
- A mode that is already current does not need to expose a "Set as current" control (or it is disabled).
- There is no "unset current mode" action in v0 — current is always some mode once one has been set.

## Agent delegation

- **Ana** → current mode indicator, "Set as current" button, active vs inactive visual states
- **data layer** → `src/server/actions/modes.ts` → `setCurrentModeAction` (to be created)
- **tests** → Playwright → see E2E scenarios below

## E2E scenarios

- `sets a mode as current and shows it as active`
- `setting a new mode as current deactivates the previous one`
- `only one mode is current at a time across multiple modes`

## Out of scope

- Unsetting current mode (leaving no mode active)
- Auto-setting current mode on creation
- Scheduled mode switching

## Open questions

- Should "current" be stored as `Mode.isCurrent` (schema already has this) or as a separate user preference record?
- Should switching modes require confirmation if there are unsaved re-entry notes?

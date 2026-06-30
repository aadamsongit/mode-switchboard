---
slice: 1
flow: 2 of 5
---

# Feature Spec: Create Mode

## Goal

Let the user create a named cognitive mode so they can begin organizing projects by context.

## Linear reference

Linear's "Create project" inline form — a minimal single-field input that appears in context (not a full modal), submits on Enter or button click, and immediately appends the new item to the list without a page reload feel.

## User story

As a user, I want to create a mode by giving it a name so that I can assign projects to it.

## Entities involved

- Mode

## Core flow

1. User sees a form with a name input and a submit button.
2. User types a mode name (e.g. "Developer / Code").
3. User submits the form.
4. New mode appears in the mode list, ordered most-recent-first.
5. Form resets to empty.

## Rules / invariants

- Name is required; empty submissions are ignored.
- Name is not unique-enforced in v0 (duplicate names allowed).
- `isCurrent` defaults to false on creation.
- Newly created mode is not automatically set as current.

## Agent delegation

- **Ana** → name input, submit button, mode list item UI
- **data layer** → `src/server/actions/modes.ts` → `createModeAction` (exists)
- **tests** → Playwright → see E2E scenarios below

## E2E scenarios

- `creates a mode with a valid name and shows it in the list`
- `does not create a mode when the name field is empty`
- `resets the form after a successful submission`

## Out of scope

- Mode description field
- Mode color or icon
- Duplicate name validation
- Reordering modes

## Open questions

- Should the form appear inline in the list, or above it?
- Should there be a character limit on mode names?

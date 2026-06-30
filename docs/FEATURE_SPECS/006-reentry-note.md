---
slice: 1
flow: 5 of 5 (part 2)
---

# Feature Spec: Add / Update Re-Entry Note

## Goal

Let the user record where they left off on a project so they can re-orient quickly when they return to it.

## Linear reference

Linear's issue description field — an inline editable area that saves on explicit action (not auto-save in v0), with multiple optional fields. No confirmation modal. The form feels like part of the item, not a separate page.

## User story

As a user, I want to add or update a re-entry note for a project so I can remember where I left off and what to do next.

## Entities involved

- Project
- ReEntryNote

## Core flow

1. User sees a project with a re-entry note section (empty or pre-filled).
2. User fills in one or more fields: where I left off, next step, blockers, links.
3. User saves the note.
4. Note persists and is shown when the user returns to the project.
5. If a note already exists, saving overwrites it (upsert).

## Rules / invariants

- A project has zero or one ReEntryNote.
- All note fields are optional; saving with all fields empty is a no-op.
- Saving creates the note if none exists, updates it if one does (upsert on `projectId`).
- Notes are editable at any time.
- Re-entry notes are not versioned in v0 — only the current note is stored.

## Agent delegation

- **Ana** → note form layout, field inputs, save button, empty vs filled display states
- **data layer** → `src/server/actions/reEntryNotes.ts` → `upsertReEntryNoteAction` (to be created)
- **tests** → Playwright → see E2E scenarios below

## E2E scenarios

- `adds a re-entry note to a project that has none`
- `updates an existing re-entry note`
- `all fields are optional — saving with only one field populated works`
- `re-entry note persists after page reload`

## Out of scope

- Note versioning or history
- Rich text / markdown
- Auto-save
- Linking notes to specific tasks

## Open questions

- Where does the re-entry note form live — inline on the project card, or on a project detail page?
- Should saving with all fields empty delete the note, or leave an empty record?
- Should links be free-text or structured (URL + label)?

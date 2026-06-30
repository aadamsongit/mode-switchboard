---
slice: 1
flow: 3 of 5
---

# Feature Spec: Create Project

## Goal
Let the user create a project and assign it to a mode at creation time.

## Linear reference
Linear's "Create issue" form — title is the primary field, team/project assignment is a selector that appears at creation (not after). The form is compact, not a full page. Assignment is required before submission.

## User story
As a user, I want to create a project and assign it to a mode so that the project appears under the right cognitive context.

## Entities involved
- Project
- Mode

## Core flow
1. User sees a form with a title input and a mode selector.
2. User types a project title.
3. User selects a mode from a dropdown of existing modes.
4. User submits the form.
5. New project appears in the list of projects for the selected mode.
6. Form resets.

## Rules / invariants
- Title is required; empty submissions are ignored.
- Mode assignment is required at creation.
- A project belongs to exactly one mode in v0.
- `status` defaults to `ACTIVE` on creation.
- A project is created with no ReEntryNote.

## Agent delegation
- **Ana** → title input, mode selector, submit button, project list item UI
- **data layer** → `src/server/actions/projects.ts` → `createProjectAction` (to be created)
- **tests** → Playwright → see E2E scenarios below

## E2E scenarios
- `creates a project with a title and an assigned mode`
- `does not create a project when title is empty`
- `does not create a project when no mode is selected`
- `new project appears under the correct mode after creation`

## Out of scope
- Project description
- Project status selection at creation
- Multiple mode assignment
- Project reordering

## Open questions
- Should a project be allowed to exist without a mode (unassigned)?
- Should the mode selector be pre-populated if only one mode exists?
- Where does the create-project form live — on the modes page, the dashboard, or its own route?

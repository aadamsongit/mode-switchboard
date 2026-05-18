# Feature Spec: Current Mode Dashboard

## Goal
Help the user choose a current cognitive mode and see the projects/re-entry context relevant to that mode.

## User story
As a user, I want to set my current mode so the app foregrounds the projects I am allowed to care about right now.

## Entities involved
- Mode
- Project
- ReEntryNote

## Core flow
1. User creates a mode.
2. User creates a project assigned to a mode.
3. User sets one mode as current.
4. Dashboard displays the current mode.
5. Dashboard displays projects assigned to the current mode.
6. User can add or update a re-entry note for a project.

## Rules / invariants
- Only one mode can be current at a time.
- A project may belong to one mode for v0.
- A project may have zero or one current re-entry note for v0.
- Re-entry notes are editable.

## Out of scope
- Tasks
- Parking lot
- Auth
- Multiple users
- Public sharing
- Mobile app
- AI suggestions
- Notifications
- Polished UI

## Open questions
- Should a project be allowed to exist without a mode?
- Should re-entry notes be versioned, or only current?
- Should “current mode” be represented as `Mode.isCurrent` or stored separately as user preference?
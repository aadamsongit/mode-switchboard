## Mode Switchboard

This application is built with neurospicy developers in mind. 

Many AuDHD management applications focus on time management. This application focuses on associating Projects with certain Modes. You can use this application to keep track of project state in an AuDHD-friendly way. 

```mermaid
erDiagram
  User ||--o{ Project : owns
  User ||--o{ Mode : defines
  Project ||--o{ ProjectMode : associated_with
  Mode ||--o{ ProjectMode : groups
  Project ||--o{ ProjectStateLog : has
  Mode ||--o{ ProjectStateLog : used_during
  Project ||--o| ReEntryNote : has

  User {
    string id
    string email
    string name
    datetime createdAt
    datetime updatedAt
  }

  Project {
    string id
    string userId
    string name
    string description
    string status
    datetime lastTouchedAt
    datetime createdAt
    datetime updatedAt
  }

  Mode {
    string id
    string userId
    string name
    string description
    string energyLevel
    string cognitiveDemand
    datetime createdAt
    datetime updatedAt
  }

  ProjectMode {
    string id
    string projectId
    string modeId
    int priority
    string notes
  }

  ProjectStateLog {
    string id
    string projectId
    string modeId
    string state
    string note
    datetime createdAt
  }

  ReEntryNote {
    string id
    string projectId
    string summary
    string nextStep
    string blockers
    datetime updatedAt
  }
```

This mermaids diagram represents data models. Do not modify the structure of the data models for now.

The first vertical slice has been tested with the UI. E2E Playwright tests are now available and shadcn is installed. 

# Rules of this Open Source

You push it, you own it, wherever it came from. Be prepared to explain any PRs in a code review or in comments.


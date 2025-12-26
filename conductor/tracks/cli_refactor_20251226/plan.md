# Implementation Plan - CLI Refactor & Date Filtering

## Phase 1: CLI Structure Refactor [checkpoint: ]
Refactor the CLI command structure to run at the root and remove aliases.

- [x] Task: Create new test file `test/commands/index.test.ts`
    - [x] Sub-task: Write test to verify `track-changes` root command execution.
    - [x] Sub-task: Write test to ensure `track-changes track:changes` and `track-changes track changes` fail/are unrecognized.
- [x] Task: Refactor Command Structure
    - [x] Sub-task: Rename `src/commands/track.ts` to `src/commands/index.ts`.
    - [x] Sub-task: Update `oclif.manifest.json` or `package.json` if necessary (usually auto-handled by oclif dev, but verification needed).
    - [x] Sub-task: Remove `aliases` static property from the command class.
    - [x] Sub-task: Ensure the class name and description are appropriate for the root command.
- [x] Task: Verify Refactor
    - [x] Sub-task: Run `npm test` to ensure new tests pass and no regressions.
- [ ] Task: Conductor - User Manual Verification 'CLI Structure Refactor' (Protocol in workflow.md)

## Phase 2: Date Filtering Implementation [checkpoint: ]
Implement date filtering logic and flags.

- [ ] Task: Update `test/commands/index.test.ts` for Date Flags
    - [ ] Sub-task: Write tests for `--start-date` filtering (valid/invalid dates).
    - [ ] Sub-task: Write tests for `--end-date` filtering.
    - [ ] Sub-task: Write tests for `--since` alias.
    - [ ] Sub-task: Write tests for combined flags.
    - [ ] Sub-task: Write tests for default behavior (no flags).
- [ ] Task: Implement Date Flags in Command
    - [ ] Sub-task: Add `start-date`, `end-date`, and `since` to `static flags` in `src/commands/index.ts`.
    - [ ] Sub-task: Add validation logic for date formats (ISO 8601).
- [ ] Task: Update Service Layer (`QueryService` or similar)
    - [ ] Sub-task: Pass date parameters to the service method responsible for fetching changes.
    - [ ] Sub-task: Implement filtering logic in the service (or update SOQL query if applicable).
- [ ] Task: Verify Date Filtering
    - [ ] Sub-task: Run `npm test`.
- [ ] Task: Conductor - User Manual Verification 'Date Filtering Implementation' (Protocol in workflow.md)

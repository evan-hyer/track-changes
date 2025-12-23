# Plan: Core `track-changes` CLI

## Phase 1: Project Initialization [checkpoint: 4b5b610]

- [x] Task: Initialize `oclif` project 05e6fa5
    -   **Description:** Generate a new single-command `oclif` project using `npx oclif generate`. Configure it for TypeScript.
    -   **Validation:** Run `./bin/run --version` to verify the CLI executes.

- [x] Task: Configure TypeScript and Linting 5947dde
    -   **Description:** Update `tsconfig.json` and `.eslintrc` (or `eslint.config.js`) to match the project's selected style guides (`conductor/code_styleguides/`).
    -   **Validation:** Run `npm run lint` and ensure no errors.

- [x] Task: Configure Testing Framework 9f09be9
    -   **Description:** Ensure Jest or Mocha is set up correctly with TypeScript support. Configure coverage reporting to enforce the 80% threshold.
    -   **Validation:** Run `npm test` and verify a sample test passes with coverage report.

## Phase 2: Salesforce Integration Foundation [checkpoint: 465693a]

- [x] Task: Install Salesforce Dependencies 8f79858
    -   **Description:** Install `@salesforce/core` and `@salesforce/sf-plugins-core`. These are essential for auth and plugin behavior.
    -   **Validation:** Dependencies listed in `package.json`.

- [x] Task: Implement Org Connection Service - Write Tests 4bcb4b2
    -   **Description:** Write a test that mocks `@salesforce/core`'s `Org.create` and `Connection` to verify that the service can resolve a target org.
    -   **Validation:** Test fails (TDD).

- [x] Task: Implement Org Connection Service - Implementation cda11c6
    -   **Description:** Create a service/class that utilizes `@salesforce/core` to initialize an Org connection. It should default to the workspace default org if no flag is provided.
    -   **Validation:** Tests pass.

## Phase 3: Metadata Query Implementation [checkpoint: fb48eab]

- [x] Task: Define Data Model - Write Tests 0d27979
    -   **Description:** Define interfaces for `MetadataChange` (name, type, user, date). Write a test for a transformation function that maps raw SOQL results (mocked) to this interface.
    -   **Validation:** Test fails.

- [x] Task: Define Data Model - Implementation 1aa41be
    -   **Description:** Implement the interfaces and transformation logic.
    -   **Validation:** Tests pass.

- [x] Task: Implement SourceMember Query - Write Tests b3c9299
    -   **Description:** Write tests mocking the `Connection.tooling.query` method. The query should target `SourceMember` and select `MemberName`, `MemberType`, `RevisionNum`, `ChangedBy` (User.Name), and `SystemModstamp`.
    -   **Validation:** Test fails.

- [x] Task: Implement SourceMember Query - Implementation f221cf3
    -   **Description:** Implement the query logic. Handle cases where `SourceMember` might be empty. *Note: SourceMember is typically only populated in source-tracked orgs (scratch orgs/sandboxes).*
    -   **Validation:** Tests pass.

## Phase 4: CLI Command & Output

- [x] Task: Implement Command Flags - Write Tests e708b16
    -   **Description:** Write tests for the command class verifying that flags `--user` and `--json` are parsed correctly.
    -   **Validation:** Test fails.

- [~] Task: Implement Command Flags - Implementation
    -   **Description:** Define the `flags` in the `oclif` command class.
    -   **Validation:** Tests pass.

- [ ] Task: Implement Display Logic - Write Tests
    -   **Description:** Write tests for a `DisplayService` that takes `MetadataChange[]` and formats it into a table string or JSON string.
    -   **Validation:** Test fails.

- [ ] Task: Implement Display Logic - Implementation
    -   **Description:** Use `oclif/table` (or similar) to render the CLI table. Implement JSON serialization for `--json`.
    -   **Validation:** Tests pass.

- [ ] Task: Wire Up Command - Write Tests
    -   **Description:** Write an integration test (mocked) for the `run()` method of the command. It should call the Org Service, Query Service, and Display Service in order.
    -   **Validation:** Test fails.

- [ ] Task: Wire Up Command - Implementation
    -   **Description:** Orchestrate the services within the `run()` method. Apply filtering logic if the `--user` flag is present.
    -   **Validation:** Tests pass.

## Phase 5: Verification & Packaging

- [ ] Task: Manual Verification in Scratch Org
    -   **Description:** Create a dummy scratch org. Make a change (e.g., create a class). Run `bin/run` (locally) against that org and verify the change appears in the table.
    -   **Validation:** Screenshot or log output confirming functionality.

- [ ] Task: Conductor - User Manual Verification 'Verification & Packaging' (Protocol in workflow.md)

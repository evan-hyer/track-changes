# Plan: Core `track-changes` CLI

## Phase 1: Project Initialization

- [~] Task: Initialize `oclif` project
    -   **Description:** Generate a new single-command `oclif` project using `npx oclif generate`. Configure it for TypeScript.
    -   **Validation:** Run `./bin/run --version` to verify the CLI executes.

- [ ] Task: Configure TypeScript and Linting
    -   **Description:** Update `tsconfig.json` and `.eslintrc` (or `eslint.config.js`) to match the project's selected style guides (`conductor/code_styleguides/`).
    -   **Validation:** Run `npm run lint` and ensure no errors.

- [ ] Task: Configure Testing Framework
    -   **Description:** Ensure Jest or Mocha is set up correctly with TypeScript support. Configure coverage reporting to enforce the 80% threshold.
    -   **Validation:** Run `npm test` and verify a sample test passes with coverage report.

## Phase 2: Salesforce Integration Foundation

- [ ] Task: Install Salesforce Dependencies
    -   **Description:** Install `@salesforce/core` and `@salesforce/sf-plugins-core`. These are essential for auth and plugin behavior.
    -   **Validation:** Dependencies listed in `package.json`.

- [ ] Task: Implement Org Connection Service - Write Tests
    -   **Description:** Write a test that mocks `@salesforce/core`'s `Org.create` and `Connection` to verify that the service can resolve a target org.
    -   **Validation:** Test fails (TDD).

- [ ] Task: Implement Org Connection Service - Implementation
    -   **Description:** Create a service/class that utilizes `@salesforce/core` to initialize an Org connection. It should default to the workspace default org if no flag is provided.
    -   **Validation:** Tests pass.

## Phase 3: Metadata Query Implementation

- [ ] Task: Define Data Model - Write Tests
    -   **Description:** Define interfaces for `MetadataChange` (name, type, user, date). Write a test for a transformation function that maps raw SOQL results (mocked) to this interface.
    -   **Validation:** Test fails.

- [ ] Task: Define Data Model - Implementation
    -   **Description:** Implement the interfaces and transformation logic.
    -   **Validation:** Tests pass.

- [ ] Task: Implement SourceMember Query - Write Tests
    -   **Description:** Write tests mocking the `Connection.tooling.query` method. The query should target `SourceMember` and select `MemberName`, `MemberType`, `RevisionNum`, `ChangedBy` (User.Name), and `SystemModstamp`.
    -   **Validation:** Test fails.

- [ ] Task: Implement SourceMember Query - Implementation
    -   **Description:** Implement the query logic. Handle cases where `SourceMember` might be empty. *Note: SourceMember is typically only populated in source-tracked orgs (scratch orgs/sandboxes).*
    -   **Validation:** Tests pass.

## Phase 4: CLI Command & Output

- [ ] Task: Implement Command Flags - Write Tests
    -   **Description:** Write tests for the command class verifying that flags `--user` and `--json` are parsed correctly.
    -   **Validation:** Test fails.

- [ ] Task: Implement Command Flags - Implementation
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

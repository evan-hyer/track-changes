# Specification: Core `track-changes` CLI

## 1. Overview
This track focuses on building the Minimum Viable Product (MVP) of the `track-changes` CLI. The goal is to create a functional CLI tool using the `oclif` framework that can authenticate with a Salesforce org (leveraging existing Salesforce CLI authentication) and display a list of recent metadata changes.

## 2. User Stories
-   **US-1:** As a developer, I want to run a single command (e.g., `track-changes` or `sf track changes`) to see a list of recent metadata changes in my default Salesforce org.
-   **US-2:** As a developer, I want to see the following columns in the output: Component Name, Metadata Type, Modified By, and Last Modified Date.
-   **US-3:** As a developer, I want to filter the output to show only changes made by a specific user.
-   **US-4:** As a developer, I want to output the results in JSON format for integration with other tools.
-   **US-5:** As a developer, I want the tool to automatically use the authentication of my default Salesforce CLI org without a separate login flow.

## 3. Technical Requirements

### 3.1. Architecture & Framework
-   **Framework:** `oclif` (Open CLI Framework).
-   **Language:** TypeScript.
-   **Integration:** Must work as a standalone CLI and be capable of operating as a Salesforce CLI plugin.

### 3.2. Salesforce Integration
-   **Authentication:** utilize `@salesforce/core` to resolve the default org and reuse existing authentication tokens.
-   **Data Retrieval:** Query the `SourceMember` object (for source-tracked orgs) or `SetupAuditTrail` (as a fallback or complimentary source) to retrieve change history.
    -   *Constraint:* Preference for `SourceMember` for developer-centric "what to pull" workflows.
    -   *Fields:* `MemberName`, `MemberType`, `RevisionNum`, `ChangedBy` (mapped to User Name), `ModificationDate`.

### 3.3. CLI Interface
-   **Command:** `track-changes` (standalone) / `sf track changes` (plugin).
-   **Flags:**
    -   `--user <username>`: Filter by the user who made the change.
    -   `--json`: Output result in JSON format.
    -   `--target-org <org>`: (Optional for MVP, good practice) specific org alias/username.

### 3.4. Output Format
-   **Standard (Table):**
    ```text
    Component Name    Type          Modified By     Date
    ────────────────  ────────────  ──────────────  ────────────────────
    MyApexClass       ApexClass     John Doe        2025-12-23 10:00 AM
    CustomObj__c      CustomObject  Jane Smith      2025-12-23 09:30 AM
    ```
-   **JSON:**
    ```json
    [
      {
        "componentName": "MyApexClass",
        "type": "ApexClass",
        "modifiedBy": "John Doe",
        "date": "2025-12-23T10:00:00Z"
      }
    ]
    ```

## 4. Testing Strategy
-   **Unit Tests:** Jest or Mocha (standard with oclif) to test command parsing, formatting logic, and service isolation.
-   **Mocking:** Mock `@salesforce/core` connections to simulate org responses.
-   **Coverage:** Minimum 80% code coverage.

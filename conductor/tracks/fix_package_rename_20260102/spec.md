# Track Specification: Rename Package to Scoped Name

## Overview
The original package name `track-changes` is already taken on the npm registry. To allow for successful publication, the package needs to be renamed to a scoped name: `@evan-hyer/track-changes`.

## Functional Requirements
1.  **Update Package Name:**
    *   Modify the `name` field in `package.json` from `track-changes` to `@evan-hyer/track-changes`.
2.  **Configure Public Publishing:**
    *   Add a `publishConfig` section to `package.json` with `"access": "public"`. This ensures that the scoped package is published publicly rather than defaulting to private.

## Non-Functional Requirements
*   **Command Consistency:** The CLI command invoked by the user must remain `track-changes`. The `bin` configuration in `package.json` must be preserved or adjusted to ensure this behavior doesn't change despite the package rename.

## Acceptance Criteria
*   [ ] `package.json` has `name` set to `@evan-hyer/track-changes`.
*   [ ] `package.json` includes `"publishConfig": { "access": "public" }`.
*   [ ] Running the local CLI (e.g., via `npm link` or `bin/run.js`) still responds to the `track-changes` command name.

## Out of Scope
*   Updating repository URLs, homepage, or bug report links.
*   Changing the underlying command logic or features.
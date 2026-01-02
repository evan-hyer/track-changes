# Track Specification: CI/CD Simplification & README Enforcement

## Overview
The current CI/CD pipeline contains brittle "commit-back" logic where the CI server modifies files (specifically `README.md` via `oclif readme`) and commits them back to the repository. This pattern is problematic for security and reliability.

This track aims to simplify the CI pipeline by removing this logic, ensuring the GitHub Action runs in a **read-only** context regarding the source code. Documentation consistency will be enforced by verifying that the `README.md` is up-to-date, failing the build if it is not.

## Functional Requirements
1.  **Remove Commit-Back Logic:**
    *   Modify `.github/workflows/onPushToMain.yml` to remove the step that runs `oclif readme`, `git commit`, and `git push`.
    *   Remove any logic that requires write access to the repository contents.

2.  **Enforce README Consistency (Read-Only Check):**
    *   Add a step to the CI pipeline (e.g., in `onPushToMain.yml` or `test.yml`) that runs `oclif readme`.
    *   **Crucial:** This step must checks for changes (e.g., using `git status --porcelain`) and fail the build if any are found. It must **not** attempt to fix or commit them.
    *   The failure message should instruct the user to run the command locally.

3.  **Preserve Release Automation:**
    *   Ensure the `version-check` and `Create Github Release` logic in `onPushToMain.yml` functions correctly without the commit-back step.
    *   The release creation itself (which creates a tag/release object) is the only "write" action allowed, but it does not modify the source code content of the branch.

## Non-Functional Requirements
*   **Security:** The CI workflow should operate with read-only permissions for the `contents` scope where possible, or strictly limit write usage to the release creation.
*   **Developer Experience:** Clear error messages in CI when the README check fails.

## Acceptance Criteria
*   [ ] The `onPushToMain.yml` workflow does not contain any `git commit` or `git push` commands.
*   [ ] Submitting a PR or pushing code with a stale `README.md` causes the CI build to fail.
*   [ ] Pushing code with an updated `README.md` passes the CI build.
*   [ ] A version bump in `package.json` still triggers a GitHub Release creation.

## Out of Scope
*   Implementation of client-side pre-commit hooks (husky).

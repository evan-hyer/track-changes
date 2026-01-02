# Specification: Remove README Validation from Workflows

## 1. Overview
The goal of this track is to remove the automated README validation step from the project's CI/CD workflows and the corresponding script from `package.json`. This validation (checking if `README.md` is up-to-date with `oclif` generation) is being removed to simplify the workflow or reduce CI failures, as requested by the user.

## 2. Functional Requirements
-   **Remove from `onPushToMain.yml`:** Remove the "Validate README" step from the `.github/workflows/onPushToMain.yml` workflow file.
-   **Remove from `test.yml`:** Remove the `npm run check:readme` command from the `.github/workflows/test.yml` workflow file.
-   **Remove Script:** Remove the `check:readme` script definition from `package.json`.

## 3. Non-Functional Requirements
-   **CI Stability:** Ensure the workflows continue to function correctly (install, build, test, release) without this step.
-   **Cleanliness:** No orphaned references to `check:readme` should remain in the CI configurations.

## 4. Acceptance Criteria
-   [ ] `.github/workflows/onPushToMain.yml` no longer contains the "Validate README" step.
-   [ ] `.github/workflows/test.yml` no longer runs `npm run check:readme`.
-   [ ] `package.json` no longer contains the `"check:readme"` script.
-   [ ] `npm run check:readme` fails locally (confirming removal).

## 5. Out of Scope
-   Modifying other validation steps (linting, testing).
-   Updating the README content itself.
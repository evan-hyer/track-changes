# Specification: Rename Release Workflow to Publish

## 1. Overview
The goal of this track is to rename the existing GitHub Actions workflow file `.github/workflows/onRelease.yml` to `.github/workflows/publish.yml`. This change reflects a more standard naming convention for publishing workflows. Additionally, the internal workflow name and any project-wide references to this file will be updated to ensure consistency.

## 2. Functional Requirements
-   **Rename File:** Rename `.github/workflows/onRelease.yml` to `.github/workflows/publish.yml`.
-   **Update Internal Name:** Update the `name:` field within the workflow YAML content to "Publish" (or a similar appropriate name) to match the new filename.
-   **Update References:** Scan the entire repository (including `README.md`, `package.json`, and other documentation) for references to `onRelease.yml` or the old workflow name and update them to point to `publish.yml` or the new workflow name.

## 3. Non-Functional Requirements
-   **CI Integrity:** Ensure that the renamed workflow continues to trigger correctly based on its configured events (likely release creation or tag push, as implied by the original name).
-   **No Broken Links:** Ensure no documentation links point to the old file location.

## 4. Acceptance Criteria
-   [ ] The file `.github/workflows/onRelease.yml` no longer exists.
-   [ ] The file `.github/workflows/publish.yml` exists and contains the content of the old file.
-   [ ] The `name:` field in `.github/workflows/publish.yml` is updated to "Publish".
-   [ ] A repository-wide search for "onRelease" returns no relevant results (excluding historical changelogs if any).
-   [ ] The `README.md` (and other docs) accurately reflect the new workflow name/file if previously referenced.

## 5. Out of Scope
-   Modifying the actual steps or logic within the workflow (other than the `name` field).
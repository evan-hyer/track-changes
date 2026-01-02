# Implementation Plan - Rename Release Workflow to Publish

## Phase 1: Rename and Refactor Workflow
- [x] Task: Rename `.github/workflows/onRelease.yml` to `.github/workflows/publish.yml`. [e700e3d]
- [ ] Task: Update the `name:` field in `.github/workflows/publish.yml` to "Publish".
- [ ] Task: Conductor - User Manual Verification 'Rename and Refactor Workflow' (Protocol in workflow.md)

## Phase 2: Update Repository References
- [ ] Task: Search the entire repository for string references to "onRelease" or the old workflow name.
- [ ] Task: Update any found references (e.g., in `README.md`, `package.json`, scripts) to point to "publish.yml" or the new workflow name "Publish".
- [ ] Task: Conductor - User Manual Verification 'Update Repository References' (Protocol in workflow.md)
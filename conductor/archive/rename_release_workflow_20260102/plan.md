# Implementation Plan - Rename Release Workflow to Publish

## Phase 1: Rename and Refactor Workflow [checkpoint: b722cb0]
- [x] Task: Rename `.github/workflows/onRelease.yml` to `.github/workflows/publish.yml`. [e700e3d]
- [x] Task: Update the `name:` field in `.github/workflows/publish.yml` to "Publish". [ee45b47]
- [x] Task: Conductor - User Manual Verification 'Rename and Refactor Workflow' (Protocol in workflow.md)

## Phase 2: Update Repository References [checkpoint: bac1e05]
- [x] Task: Search the entire repository for string references to "onRelease" or the old workflow name.
- [x] Task: Update any found references (e.g., in `README.md`, `package.json`, scripts) to point to "publish.yml" or the new workflow name "Publish".
- [x] Task: Conductor - User Manual Verification 'Update Repository References' (Protocol in workflow.md)
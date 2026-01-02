# Implementation Plan - CI/CD Simplification & README Enforcement

This plan outlines the steps to remove "commit-back" logic from the CI/CD pipeline and enforce documentation consistency through read-only verification.

## Phase 1: CI Pipeline Refactoring [checkpoint: 81804b7]
Focus on removing the automated commit/push logic and tightening security.

- [x] **Task: Remove commit-back logic from `onPushToMain.yml`** 297a5c1
- [x] **Task: Configure strict Read-Only permissions** 9e8e6d3
- [x] **Task: Conductor - User Manual Verification 'Phase 1: CI Pipeline Refactoring' (Protocol in workflow.md)** 81804b7

## Phase 2: Documentation Enforcement [checkpoint: 642d97c]
Implement the check that fails the build if the README is out of sync with the code.

- [x] **Task: Create a README validation script** fed0e5e
- [x] **Task: Integrate README validation into `test.yml`** ba76680
- [x] **Task: Integrate README validation into `onPushToMain.yml`** eb12538
- [x] **Task: Conductor - User Manual Verification 'Phase 2: Documentation Enforcement' (Protocol in workflow.md)** 642d97c

## Phase 3: Final Verification & Cleanup
Ensure the entire flow works without write access.

- [ ] **Task: Verify "Stale README" failure**
  - Intentionally modify a command's help text locally without running `oclif readme`.
  - Push to a feature branch and verify that the `tests` workflow fails.
- [ ] **Task: Verify "Up-to-date README" success**
  - Run `npm run prepack` (or the new validation script) locally, commit, and push.
  - Verify that the CI passes.
- [ ] **Task: Conductor - User Manual Verification 'Phase 3: Final Verification & Cleanup' (Protocol in workflow.md)**

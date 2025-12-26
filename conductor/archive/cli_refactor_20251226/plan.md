# Plan: CLI Simplification and Multi-Format Output

## Phase 1: CLI Simplification and Flag Refactor
- [x] Task: Update the `Changes` command to be the root command or add a root-level alias.
    - *Detail:* Modify `src/commands/track/changes.ts` to include an alias or move it to `src/commands/track-changes.ts` if needed to support root execution.
- [x] Task: Refactor Flags in `src/commands/track/changes.ts`.
    - Replace `json` boolean flag with `output` option flag (values: `table`, `json`, `html`, default: `table`).
- [~] Task: Update `DisplayService` and `QueryService` tests to reflect flag changes.
- [~] Task: Implement `json` and `table` logic using the new flag in the command's `run()` method.
- [ ] Task: Conductor - User Manual Verification 'CLI Simplification and Flag Refactor' (Protocol in workflow.md)

## Phase 2: HTML Report Generation
- [x] Task: Extend `DisplayService` to support HTML formatting.
    - Create a basic HTML template with CSS for a clean, modern table.
    - Implement `formatHtml(changes: MetadataChange[]): string`.
- [x] Task: Write tests for `formatHtml` in `test/services/display-service.test.ts`.
- [x] Task: Implement file writing logic in the command.
    - When `--output html` is selected, write the string from `displayService.formatHtml()` to `metadata-changes-report.html`.
- [x] Task: Conductor - User Manual Verification 'HTML Report Generation' (Protocol in workflow.md)

## Phase 3: Browser Integration and Cleanup
- [x] Task: Implement "Auto-Open" logic.
    - Use a cross-platform method (e.g., the `open` npm package or platform-specific shell commands) to open `metadata-changes-report.html` in the default browser.
- [x] Task: Update Integration tests in `test/commands/track/changes.test.ts`.
    - Verify root command execution.
    - Verify `--output` flag behavior for all three types.
- [x] Task: Final Quality Gate Check (Coverage > 80%, Linting, etc.).
- [x] Task: Conductor - User Manual Verification 'Browser Integration and Cleanup' (Protocol in workflow.md)

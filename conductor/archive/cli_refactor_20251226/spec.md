# Specification: CLI Simplification and Multi-Format Output

## Overview
This track focuses on improving the CLI's usability by simplifying the command structure and introducing a flexible output system. We will eliminate the redundant `track changes` subcommand requirement and replace the single-purpose `--json` flag with a unified `--output` parameter supporting Table, JSON, and HTML formats.

## Functional Requirements
- **Command Alias/Simplification:** 
    - Enable the root command `track-changes` to execute the tracking logic directly without requiring the `track changes` subcommands.
- **Unified Output Flag:**
    - Remove the `--json` flag.
    - Introduce an `--output` (or `-f` for format) flag that accepts:
        - `table`: (Default) Displays the scannable table in the terminal.
        - `json`: Displays machine-readable JSON in the terminal.
        - `html`: Generates a static HTML report.
- **HTML Report Generation:**
    - When `--output html` is used:
        - Generate a static HTML file named `metadata-changes-report.html` in the current working directory.
        - The file should contain a styled HTML table with the metadata change details.
        - Automatically open the generated file in the user's default web browser upon completion.

## Acceptance Criteria
- [ ] Running `track-changes` (standalone) correctly fetches and displays metadata changes in the default table format.
- [ ] Running `track-changes --output json` outputs valid JSON to the terminal.
- [ ] Running `track-changes --output html` creates `metadata-changes-report.html` and opens it in the browser.
- [ ] The `--json` flag is no longer present or active.
- [ ] Unit and integration tests are updated to reflect these changes.

## Out of Scope
- Advanced HTML report features (filtering/sorting within the HTML).
- Customizing the output filename via CLI flag (will default to `metadata-changes-report.html`).

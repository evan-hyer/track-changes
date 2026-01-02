# Track Specification: CLI Refactor & Date Filtering

## 1. Overview
This track aims to simplify the `track-changes` CLI structure by making the command run at the root level and removing legacy aliases. Additionally, it introduces robust date filtering capabilities to allow users to query metadata changes within specific time ranges, enhancing the tool's utility for auditing and history tracking.

## 2. Functional Requirements

### 2.1 CLI Structure Refactor
*   **Root Command:** The primary command logic must be accessible directly via `track-changes` (or the root command in the `bin` configuration).
*   **File Restructuring:** Move the logic from `src/commands/track.ts` to `src/commands/index.ts` to establish it as the root command.
*   **Alias Removal:** Remove the `track:changes` and `track changes` aliases. The command should no longer respond to these sub-commands.

### 2.2 Date Range Filtering
*   **New Flags:**
    *   `--start-date`: Specifies the beginning of the date range (inclusive).
    *   `--end-date`: Specifies the end of the date range (inclusive).
    *   `--since`: An alias for `--start-date` to maintain intuitive usage.
*   **Input Formats:** The flags must support:
    *   ISO 8601 dates (e.g., `2023-12-25`)
    *   ISO 8601 datetimes (e.g., `2023-12-25T14:00:00Z`)
*   **Default Behavior:**
    *   If no date flags are provided, the CLI MUST retain its current behavior (showing recent changes, typically the last 7 days or system default).
    *   If only one flag is provided (e.g., just `--start-date`), the other end of the range remains open (up to "now" or from "the beginning of time" effectively, though likely constrained by API limits).

## 3. Non-Functional Requirements
*   **Backward Compatibility:** Ensure the existing JSON/HTML/Table output formats work correctly with the filtered results.
*   **Error Handling:** Provide clear error messages for invalid date formats.

## 4. Acceptance Criteria
*   [ ] `track-changes` runs the main logic.
*   [ ] `track-changes track:changes` and `track-changes track changes` do NOT work.
*   [ ] `src/commands/track.ts` is deleted or renamed to `index.ts`.
*   [ ] Passing `--start-date "2023-01-01"` filters results to changes on or after that date.
*   [ ] Passing `--since` behaves exactly like `--start-date`.
*   [ ] Passing `--end-date` filters results to changes on or before that date.
*   [ ] Passing both flags correctly filters the range.
*   [ ] Running without flags shows the default "recent changes" view.
*   [ ] Unit tests verify date filtering logic and argument parsing.

## 5. Out of Scope
*   Relative date parsing (e.g., "2 days ago") is NOT required for this iteration, though ISO strings are standard.
*   Visual Studio Code plugin updates (this track focuses on the CLI).

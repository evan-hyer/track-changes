# Specification: Fix SourceMember SOQL "Invalid Relationship" Error

## Overview
The `track-changes` CLI fails with a SOQL error: `Invalid relationship 'ChangedBy' on SourceMember object` when attempting to retrieve metadata changes. This indicates the current SOQL query used to fetch `SourceMember` data improperly references the `ChangedBy` relationship (likely attempting `ChangedBy.Name` or similar). The goal is to correct this query to successfully retrieve the user information who modified the component.

## Functional Requirements
- **Correct SOQL Query:** The application must execute a valid Tooling API SOQL query against the `SourceMember` object without throwing an "Invalid relationship" error.
- **Retrieve User Information:** The query (or subsequent logic) must correctly retrieve the name or identifier of the user who modified the metadata (`ChangedBy` or `ChangedById`).
- **Maintain Output Format:** The fix must ensure the final table output still displays the user who made the change, preserving the existing CLI output structure.

## Acceptance Criteria
- [ ] Running the `track changes` command (e.g., `sf track changes`) executes without the SOQL error.
- [ ] The command output correctly displays the "Changed By" (User Name) column.
- [ ] Unit tests for the query service are updated to reflect the valid query structure and pass.

## Out of Scope
- Changes to the UI or table formatting (other than ensuring data populates).
- New features or filtering capabilities.

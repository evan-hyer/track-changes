# Plan: Fix SourceMember SOQL "Invalid Relationship" Error

## Phase 1: Reproduction and Test Setup
- [x] Task: Create a reproduction test case in `test/services/query-service-class.test.ts`
    - Create a test that instantiates `QueryService`.
    - Assert that the `queryString` property (or the query built) currently contains `ChangedBy.Name`.
    - *Goal:* This confirms the current state and will fail once we fix it (or we invert the assertion to ensure it *doesn't* contain it).
    - *Better approach:* Write a test that expects the query to use `ChangedById` and NOT `ChangedBy.Name`. This test will fail initially.
- [ ] Task: Conductor - User Manual Verification 'Reproduction and Test Setup' (Protocol in workflow.md)

## Phase 2: Implementation
- [x] Task: Fix SOQL Query in `src/services/query-service-class.ts`
    - Locate the `query` string definition (approx. line 9).
    - Replace `ChangedBy.Name` with `ChangedById`.
- [x] Task: Update `QueryService` to fetch User Names (Optional but recommended to preserve feature)
    - *Note:* Since we can't query `ChangedBy.Name` directly, we get an ID.
    - Modify the return type/logic to accept `ChangedById`.
    - (If the service handles data formatting) ensure the output handles the ID gracefully or fetches the name in a separate step.
    - *Decision:* For this immediate bug fix, we will prioritize stopping the crash. We will fetch `ChangedById`. If the display service expects a name, we might pass the ID for now to ensure stability.
- [x] Task: Verify and correct SourceMember field names
    - Research confirms `RevisionNum` should be `RevisionCounter`.
    - `ChangedBy` returns an ID, not a relationship object.
    - Update code and interfaces to use `RevisionCounter` and handle `ChangedBy` as an ID.
- [x] Task: Debug "Unknown" User Name issue
    - Add debug logs to inspect `SourceMember` records.
    - *Findings:* `ChangedBy` ID appears to be 15-char, while User query likely returns 18-char, causing Map lookup failure.
- [x] Task: Fix User ID Mismatch (15 vs 18 char)
    - Normalize all IDs to 15 characters before storing in and retrieving from the `userMap`.
    - Update `src/services/query-service-class.ts`.
- [ ] Task: Conductor - User Manual Verification 'Implementation' (Protocol in workflow.md)

## Phase 3: Verification
- [x] Task: Verify the fix with tests
    - Run `npm test` to ensure the new test case passes (query string is correct).
    - Ensure no regressions in other tests.
- [ ] Task: Conductor - User Manual Verification 'Verification' (Protocol in workflow.md)

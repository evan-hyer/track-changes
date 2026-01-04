# Track Specification: Pagination Implementation

## Overview
The current QueryService uses a single `tooling.query()` call which returns a maximum of 2,000 records. Large orgs with extensive metadata history silently lose data. This track implements proper pagination using Salesforce's `queryMore` pattern.

## Problem Statement

```typescript
// Current: Only fetches first 2,000 records
const result = await this.connection.tooling.query<SourceMember>(query);
const records = result.records || []; // Truncated!
```

**Impact:**
- Silent data loss in orgs with >2,000 changed components
- Users unaware they're seeing incomplete results
- No indication that pagination is needed

---

## Solution

### QueryMore Pattern
Salesforce API returns `done: false` and `nextRecordsUrl` when more records exist:

```typescript
async queryAll<T>(query: string): Promise<T[]> {
  let result = await this.connection.tooling.query<T>(query);
  let allRecords = [...result.records];
  
  while (!result.done && result.nextRecordsUrl) {
    result = await this.connection.tooling.queryMore<T>(result.nextRecordsUrl);
    allRecords.push(...result.records);
  }
  
  return allRecords;
}
```

### New CLI Flag
```bash
track-changes --limit 500  # Cap results for performance
```

---

## Acceptance Criteria

- [ ] `queryAll()` method fetches all pages when >2,000 records exist
- [ ] Works correctly with single-page results (<2,000)
- [ ] `--limit` flag caps total results
- [ ] User sees total count in output
- [ ] All tests written BEFORE implementation (TDD)
- [ ] 90%+ coverage on pagination code

## Out of Scope
- Streaming large results to file
- Progress indicator during pagination
- Parallel page fetching

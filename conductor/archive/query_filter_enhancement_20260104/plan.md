# Implementation Plan - Query Filter Enhancement

This plan outlines the TDD approach to implement dynamic query filtering with the Builder pattern.

---

## Phase 0: Test Infrastructure [checkpoint: pending]
**Critical:** Write failing tests BEFORE implementation.

### Sanitization Tests
- [ ] **Task: Write tests for `sanitizeSoqlString()` utility**
  - Escape single quotes: `O'Brien` → `O\'Brien`
  - Escape backslashes
  - Handle null/undefined
  - Handle injection attempts: `'; DELETE FROM Account; --`
- [ ] **Task: Write tests for `escapeHtml()` utility**
  - Escape `<`, `>`, `&`, `"`, `'`
  - Handle null/undefined
- [ ] **Task: Conductor - User Manual Verification 'Phase 0: Test Infrastructure'**

---

## Phase 1: Query Builder Core [checkpoint: pending]
Implement the SoqlQueryBuilder with TDD.

### Builder Tests (Write First)
- [ ] **Task: Write tests for empty builder** → Returns base SELECT without WHERE
- [ ] **Task: Write tests for single filter** → Correct WHERE clause
- [ ] **Task: Write tests for multiple filters** → AND logic
- [ ] **Task: Write tests for IN operator** → Comma-separated values
- [ ] **Task: Write tests for date filters** → ISO format conversion
- [ ] **Task: Write tests for LIKE operator** → Wildcard handling

### Builder Implementation
- [ ] **Task: Create `src/services/query-builder.ts`**
- [ ] **Task: Create `src/services/types.ts`** with QueryFilter interface
- [ ] **Task: Implement `filterByUser()` method**
- [ ] **Task: Implement `filterByTypes()` method**
- [ ] **Task: Implement `filterByDateRange()` method**
- [ ] **Task: Implement `filterByName()` method**
- [ ] **Task: Implement `build()` method** with sanitization
- [ ] **Task: Conductor - User Manual Verification 'Phase 1: Query Builder Core'**

---

## Phase 2: CLI Integration [checkpoint: pending]
Add new flags to the track command.

- [ ] **Task: Add `--type` flag** (comma-separated string)
- [ ] **Task: Add `--since` flag** (date string)
- [ ] **Task: Add `--until` flag** (date string)
- [ ] **Task: Add `--name` flag** (string with wildcard support)
- [ ] **Task: Add input validation for date format**
- [ ] **Task: Add integration tests for flag combinations**
- [ ] **Task: Conductor - User Manual Verification 'Phase 2: CLI Integration'**

---

## Phase 3: Refactor QueryService [checkpoint: pending]
Replace inline concatenation with Builder.

- [ ] **Task: Inject builder into QueryService**
- [ ] **Task: Remove inline SOQL string building**
- [ ] **Task: Update QueryService tests to use builder**
- [ ] **Task: Verify no regressions in existing functionality**
- [ ] **Task: Conductor - User Manual Verification 'Phase 3: Refactor QueryService'**

---

## Phase 4: Documentation [checkpoint: pending]
Update documentation with new features.

- [ ] **Task: Update README with new flags**
- [ ] **Task: Add examples for filter combinations**
- [ ] **Task: Regenerate oclif readme**
- [ ] **Task: Conductor - User Manual Verification 'Phase 4: Documentation'**

---

## Summary

| Phase | Focus Area | Tasks | Status |
|-------|------------|-------|--------|
| 0 | Test Infrastructure | 3 | ⏳ Pending |
| 1 | Query Builder Core | 13 | ⏳ Pending |
| 2 | CLI Integration | 7 | ⏳ Pending |
| 3 | Refactor QueryService | 5 | ⏳ Pending |
| 4 | Documentation | 4 | ⏳ Pending |

**Total Tasks:** 32
**Target Completion:** TBD

### Key Outcomes
- ⏳ Builder pattern replaces inline concatenation
- ⏳ All SOQL inputs sanitized centrally
- ⏳ New filters: `--type`, `--since`, `--until`, `--name`
- ⏳ 90%+ test coverage on query building
- ⏳ TDD approach ensures safe refactoring

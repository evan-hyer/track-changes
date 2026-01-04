# Implementation Plan - Pagination Implementation

TDD approach: All tests written BEFORE implementation code.

---

## Phase 0: Write Failing Tests [checkpoint: pending]

### QueryAll Method Tests
- [ ] **Task: Write test for single page (done: true)**
  ```typescript
  it('should return records when result.done is true', async () => {
    queryStub.resolves({ done: true, records: mockRecords, totalSize: 5 });
    const result = await queryService.queryAll('SELECT Id FROM SourceMember');
    expect(result).to.have.lengthOf(5);
    expect(queryStub.calledOnce).to.be.true;
  });
  ```

- [ ] **Task: Write test for multi-page (done: false)**
  ```typescript
  it('should fetch all pages when done is false', async () => {
    queryStub.onFirstCall().resolves({
      done: false, records: [r1], nextRecordsUrl: '/next'
    });
    queryStub.onSecondCall().resolves({
      done: true, records: [r2]
    });
    const result = await queryService.queryAll(query);
    expect(result).to.have.lengthOf(2);
  });
  ```

- [ ] **Task: Write test for empty results**
- [ ] **Task: Write test for 3+ pages**
- [ ] **Task: Run tests → All FAIL (queryAll doesn't exist)**
- [ ] **Task: Conductor - User Manual Verification 'Phase 0'**

---

## Phase 1: Implement QueryAll [checkpoint: pending]

- [ ] **Task: Implement queryAll() method**
- [ ] **Task: Run tests → All PASS**
- [ ] **Task: Refactor if needed (keep tests green)**
- [ ] **Task: Conductor - User Manual Verification 'Phase 1'**

---

## Phase 2: Write Limit Flag Tests [checkpoint: pending]

- [ ] **Task: Write test for --limit flag passed to QueryService**
  ```typescript
  it('should pass limit option to queryChanges', async () => {
    await TrackChanges.run(['--limit', '100']);
    expect(queryStub.firstCall.args[0]).to.have.property('limit', 100);
  });
  ```

- [ ] **Task: Write test for limit applied to results**
- [ ] **Task: Write test for limit validation (positive integer)**
- [ ] **Task: Run tests → All FAIL**
- [ ] **Task: Conductor - User Manual Verification 'Phase 2'**

---

## Phase 3: Implement Limit Flag [checkpoint: pending]

- [ ] **Task: Add --limit flag to track.ts**
- [ ] **Task: Update QueryOptions interface**
- [ ] **Task: Apply limit in queryChanges()**
- [ ] **Task: Run tests → All PASS**
- [ ] **Task: Conductor - User Manual Verification 'Phase 3'**

---

## Phase 4: Integration & Documentation [checkpoint: pending]

- [ ] **Task: Update queryChanges to use queryAll internally**
- [ ] **Task: Add integration test for large result set**
- [ ] **Task: Update README with --limit flag**
- [ ] **Task: Verify coverage ≥90%**
- [ ] **Task: Conductor - User Manual Verification 'Phase 4'**

---

## Summary

| Phase | Focus | Tasks | Status |
|-------|-------|-------|--------|
| 0 | Write Failing Tests | 6 | ⏳ Pending |
| 1 | Implement QueryAll | 4 | ⏳ Pending |
| 2 | Write Limit Tests | 5 | ⏳ Pending |
| 3 | Implement Limit | 5 | ⏳ Pending |
| 4 | Integration | 5 | ⏳ Pending |

**Total Tasks:** 25
**Approach:** Strict TDD (tests first)

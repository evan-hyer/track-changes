# Agent Context: track-changes

## Project Overview

**track-changes** is a Salesforce CLI plugin built with [oclif](https://oclif.io/) that tracks metadata changes in a Salesforce org. It queries the `SourceMember` tooling API object and displays changes by user, with output options for table, JSON, and HTML formats.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js ≥18 (ESM) |
| Framework | oclif v4 |
| Language | TypeScript 5 |
| Testing | Mocha + Chai + Sinon |
| Coverage | c8 |
| Linting | ESLint 9 |
| Salesforce SDK | @salesforce/core v8 |

## Project Structure

```
track-changes/
├── src/
│   ├── commands/
│   │   └── track.ts          # Main CLI command
│   └── services/
│       ├── display-service.ts    # Output formatting (table/JSON/HTML)
│       ├── org-service.ts        # Salesforce org connection
│       ├── query-service-class.ts # SOQL queries (main implementation)
│       └── query-service.ts      # Types + mapper function (to be consolidated)
├── test/
│   ├── commands/
│   │   └── index.test.ts
│   └── services/
│       ├── display-service.test.ts
│       ├── org-service.test.ts
│       ├── query-service-class.test.ts
│       └── query-service.test.ts
├── .github/workflows/
│   ├── publish.yml           # NPM publish on release
│   └── test.yml              # CI tests
└── conductor/                # Project management artifacts
```

## Commands

```bash
# Build
npm run build

# Test with coverage
npm run test

# Lint
npm run lint

# Run locally
./bin/dev.js track --user "Username" --output json
```

## Key Flags

| Flag | Description |
|------|-------------|
| `--user`, `-u` | Filter changes by user display name |
| `--output`, `-o` | Output format: `table` (default), `json`, `html` |
| `--target-org` | Salesforce org alias or username |

## Current Technical Debt

> ⚠️ **Active remediation in progress** - See `conductor/archive/technical_debt_remediation_20260104/`

### 🔴 Critical (Security)
1. **SQL Injection** in `query-service-class.ts` - User inputs directly concatenated into SOQL
2. **XSS Vulnerability** in `display-service.ts` - HTML output lacks escaping

### 🟠 Medium Priority
3. **Publish workflow** missing npm registry auth
4. **Unsafe type assertions** (`as unknown as X` patterns)
5. **README duplication** - 1500+ lines, should be ~200

### 🟡 Low Priority
6. **Duplicate service files** - `query-service.ts` vs `query-service-class.ts`
7. **File side effects in tests** - HTML test writes real files
8. **Version 0.0.0** - Invalid for npm publish

## Testing Guidelines

- **Framework**: Mocha + Chai assertions + Sinon stubs
- **Pattern**: Stub Salesforce Connection, OrgService, QueryService
- **Run**: `npm run test` (includes lint via `posttest`)
- **Coverage threshold**: Target 80%+

### Example Test Pattern

```typescript
import { createSandbox, SinonSandbox, SinonStub } from 'sinon';
import { expect } from 'chai';

describe('ServiceName', () => {
  let sandbox: SinonSandbox;
  
  beforeEach(() => {
    sandbox = createSandbox();
  });
  
  afterEach(() => {
    sandbox.restore();
  });
  
  it('should do something', async () => {
    const stub = sandbox.stub(Dependency.prototype, 'method').resolves(mockData);
    // ...assertions
  });
});
```

## CI/CD

| Workflow | Trigger | Notes |
|----------|---------|-------|
| `test.yml` | Push (non-main) | Matrix: ubuntu/windows × 3 node versions |
| `publish.yml` | GitHub Release | Publishes to npm with provenance |

## Coding Standards

- **Formatting**: Prettier (see `.prettierrc.json`)
- **Imports**: Use `.js` extension for ESM compatibility
- **Types**: Prefer explicit types over `any`; avoid `as unknown as X`
- **Security**: Always sanitize user inputs in SOQL/HTML contexts

## When Making Changes

1. **TDD Approach**: Write failing tests first for security-critical changes
2. **Run full suite**: `npm run test` before committing
3. **Build check**: `npm run build` to verify TypeScript compiles
4. **No side effects**: Tests should not create files or make network calls

---

## TDD Workflow (Required for This Project)

All changes to query logic, sanitization, or output formatting **MUST** follow strict TDD:

### Red-Green-Refactor Cycle

```
1. RED    → Write a failing test that defines expected behavior
2. GREEN  → Write minimal code to make the test pass
3. REFACTOR → Clean up while keeping tests green
```

### TDD Example: Adding SOQL Sanitization

```typescript
// STEP 1: Write failing test FIRST
describe('sanitizeSoqlString', () => {
  it('should escape single quotes', () => {
    expect(sanitizeSoqlString("O'Brien")).to.equal("O\\'Brien");
  });
  
  it('should handle injection attempts', () => {
    const malicious = "'; DELETE FROM Account; --";
    expect(sanitizeSoqlString(malicious)).to.contain("\\'");
  });
});

// STEP 2: Run test → FAILS (function doesn't exist)
// STEP 3: Implement sanitizeSoqlString()
// STEP 4: Run test → PASSES
// STEP 5: Refactor if needed
```

### Security-Critical Changes Require:
- [ ] Unit tests for happy path
- [ ] Unit tests for malicious/edge case inputs
- [ ] Integration test verifying sanitized output reaches query

---

## Query Builder Pattern (Recommended)

For composing SOQL queries with multiple filters, use the **Builder pattern** instead of string concatenation:

### Why Builder Pattern?
- Centralizes sanitization in one place
- Type-safe filter composition
- Easy to add new filter types
- Testable output

### Pattern Template

```typescript
class SoqlQueryBuilder {
  private filters: QueryFilter[] = [];
  
  filterByUser(userId: string): this {
    this.filters.push({ field: 'ChangedBy', operator: 'eq', value: userId });
    return this;
  }
  
  filterByTypes(types: string[]): this {
    this.filters.push({ field: 'MemberType', operator: 'in', value: types });
    return this;
  }
  
  filterByDateRange(start: Date, end?: Date): this {
    this.filters.push({ field: 'SystemModstamp', operator: 'gte', value: start });
    if (end) this.filters.push({ field: 'SystemModstamp', operator: 'lte', value: end });
    return this;
  }
  
  build(): string {
    // All sanitization happens here
    const whereClause = this.filters.map(f => this.toCondition(f)).join(' AND ');
    return `SELECT ... FROM SourceMember${whereClause ? ' WHERE ' + whereClause : ''}`;
  }
}

// Usage
const query = new SoqlQueryBuilder()
  .filterByUser(userId)
  .filterByTypes(['ApexClass', 'LightningComponentBundle'])
  .filterByDateRange(startDate)
  .build();
```

---

## Planned Filter Enhancements

These filters are planned for future implementation:

| Flag | SOQL Field | Operator | Example |
|------|------------|----------|---------|
| `--user, -u` | ChangedBy | = | `--user "John Doe"` |
| `--type, -t` | MemberType | IN | `--type ApexClass,LWC` |
| `--since` | SystemModstamp | >= | `--since 2024-01-01` |
| `--until` | SystemModstamp | <= | `--until 2024-12-31` |
| `--name` | MemberName | LIKE | `--name "Controller%"` |

### SourceMember Filterable Fields

| Field | Type | Notes |
|-------|------|-------|
| `MemberType` | string | ApexClass, LightningComponentBundle, CustomObject, etc. |
| `MemberName` | string | Component API name |
| `ChangedBy` | ID | User ID (requires lookup for display name) |
| `SystemModstamp` | datetime | Last modification timestamp |
| `RevisionCounter` | int | Revision number |

---

## Useful References

- [oclif Documentation](https://oclif.io/docs/introduction)
- [Salesforce CLI Plugin Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_plugins.meta/sfdx_cli_plugins/)
- [SourceMember Tooling API](https://developer.salesforce.com/docs/atlas.en-us.api_tooling.meta/api_tooling/tooling_api_objects_sourcemember.htm)

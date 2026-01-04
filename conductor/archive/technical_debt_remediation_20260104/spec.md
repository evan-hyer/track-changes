# Track Specification: Technical Debt Remediation

## Overview
A comprehensive code quality review identified 16 technical issues across security, architecture, CI/CD, and testing domains. This track documents the analysis and remediation plan to address these issues systematically.

## Critical Security Issues

### 1. SQL/SOQL Injection Vulnerability
**Location:** `src/services/query-service-class.ts` (lines 13, 25, 43-44)
**Severity:** 🔴 Critical

User-provided values are directly concatenated into SOQL queries without sanitization:
```typescript
const userQuery = `SELECT Id FROM User WHERE Name = '${username}'`;
query += ` WHERE ChangedBy = '${userIdFilter}'`;
```

**Remediation:**
- Implement SOQL string escaping for all user inputs
- Create a `sanitizeSoqlString()` utility function
- Escape single quotes: `'` → `\'`

### 2. XSS Vulnerability in HTML Output
**Location:** `src/services/display-service.ts` (lines 39-42)
**Severity:** 🔴 Critical

HTML output directly interpolates user data without escaping:
```typescript
<td>${change.componentName}</td>
```

**Remediation:**
- Create an `escapeHtml()` utility function
- Escape `<`, `>`, `&`, `"`, `'` characters
- Apply to all user-provided values in HTML output

---

## Architecture & Code Quality Issues

### 3. Duplicate Service Files
**Location:** `src/services/query-service.ts` vs `src/services/query-service-class.ts`
**Severity:** 🟠 Medium

Two files with overlapping responsibilities. `query-service.ts` only exports types and a mapper function.

**Remediation:**
- Create `src/services/types.ts` for interfaces
- Consolidate mapper into `query-service-class.ts`
- Remove `query-service.ts` after migration

### 4. Unsafe Type Assertions
**Location:** `src/services/query-service-class.ts` (lines 39, 53, 66)
**Severity:** 🟠 Medium

Multiple `as unknown as X` patterns bypass TypeScript safety:
```typescript
r.ChangedBy as unknown as string
```

**Remediation:**
- Create proper type guards
- Refactor `SourceMember` interface to reflect actual API response
- Use runtime type checking where necessary

### 5. Unused Code
**Locations:**
- `formatTableData()` in `display-service.ts` - never called
- `exec` import used but errors swallowed silently

**Remediation:**
- Remove `formatTableData()` or implement proper table formatting
- Implement proper debug logging for `openFile` errors

### 6. Missing Error Context
**Location:** `src/services/query-service-class.ts` (lines 14-18)
**Severity:** 🟡 Low

Silent return when username not found:
```typescript
if (userResult.totalSize === 0) {
  return [];  // User might want to know the username doesn't exist
}
```

**Remediation:**
- Throw a descriptive error or log a warning
- Consider adding a `--strict` flag for error behavior

### 7. Hardcoded Output Filename
**Location:** `src/commands/track.ts` (line 47)
**Severity:** 🟡 Low

HTML output always writes to `metadata-changes-report.html`.

**Remediation:**
- Add `--out-file` flag to command
- Default to timestamp-based filename

---

## Package & Configuration Issues

### 8. Version is `0.0.0`
**Location:** `package.json` (line 4)
**Severity:** 🟠 Medium

Invalid semantic version for publishing.

**Remediation:**
- Update to `0.1.0` before next release
- Consider implementing semantic-release

### 9. README.md Massive Duplication
**Location:** `README.md`
**Severity:** 🟠 Medium

Usage and commands sections are repeated 4+ times (1500+ lines when ~200 expected).

**Remediation:**
- Run `oclif readme` fresh
- Clean up duplicate sections
- Add README to `.gitignore` and generate during build, or enforce pre-commit hook

### 10. Commented-Out Code
**Location:** `src/commands/track.ts` (line 81)
**Severity:** 🟡 Low

```typescript
// console.debug('Failed to open file:', error);
```

**Remediation:**
- Implement proper debug logging with a `--debug` flag
- Or remove entirely

---

## CI/CD Issues

### 11. Publish Workflow Missing npm Configuration
**Location:** `.github/workflows/publish.yml`
**Severity:** 🟠 Medium

Missing `registry-url` and `NODE_AUTH_TOKEN`:
```yaml
- run: npm publish --provenance --access public
```

**Remediation:**
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: latest
    registry-url: 'https://registry.npmjs.org'
- run: npm publish --provenance --access public
  env:
    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 12. Tests Don't Run on Main Branch
**Location:** `.github/workflows/test.yml` (line 4)
**Severity:** 🟠 Medium

```yaml
branches-ignore: [main]
```

Tests only run on feature branches, allowing broken code to be released.

**Remediation:**
- Remove `branches-ignore` or add main to included branches
- Or make release job depend on test workflow

---

## Testing Issues

### 13. File Side Effects in Tests
**Location:** `test/commands/index.test.ts` (line 132)
**Severity:** 🟡 Low

HTML output test actually creates files on disk.

**Remediation:**
- Stub `fs.writeFile` using sinon
- Or clean up files in `afterEach`

### 14. Flaky Error Handling Test
**Location:** `test/commands/index.test.ts` (lines 84-95)
**Severity:** 🟡 Low

Uncertain test behavior with try/catch pattern.

**Remediation:**
- Use chai-as-promised or proper assertions
- Stub `Command.prototype.error` to prevent process exit

### 15. Any Types in Tests
**Location:** `test/commands/index.test.ts` (lines 12, 43, 68)
**Severity:** 🟡 Low

```typescript
let logStub: any;
```

**Remediation:**
- Type as `SinonStub`
- Use proper generic types

### 16. No Input Validation on Flags
**Location:** `src/commands/track.ts`
**Severity:** 🟡 Low

The `--user` flag accepts any string including empty strings.

**Remediation:**
- Add validation in command or QueryService
- Reject empty/whitespace-only values

---

## Acceptance Criteria
- [ ] No SOQL injection vulnerabilities
- [ ] No XSS vulnerabilities in HTML output
- [ ] All type assertions replaced with proper guards
- [ ] Publish workflow properly configured
- [ ] Tests run on main branch before release
- [ ] README cleaned up to ~200 lines
- [ ] All tests pass with 80%+ coverage
- [ ] No file side effects in unit tests

## Out of Scope
- Implementing semantic-release automation
- Adding pre-commit hooks (husky)
- Major architectural refactoring beyond consolidating service files

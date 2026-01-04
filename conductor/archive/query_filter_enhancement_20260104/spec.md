# Track Specification: Query Filter Enhancement

## Overview
Enhance the `track` command with additional filtering capabilities using a Builder pattern for dynamic SOQL query composition. This replaces the current inline string concatenation approach which is error-prone and has security vulnerabilities.

## Problem Statement

Current implementation in `query-service-class.ts`:
```typescript
// Inline concatenation - hard to extend, security risk
const userQuery = `SELECT Id FROM User WHERE Name = '${username}'`;
query += ` WHERE ChangedBy = '${userIdFilter}'`;
```

**Issues:**
- SQL injection vulnerability
- Adding new filters requires modifying existing code
- No type safety on filter values
- Difficult to test filter combinations

---

## Proposed Solution

### Builder Pattern with Filter Objects

```typescript
const query = new SoqlQueryBuilder()
  .filterByUser(userId)
  .filterByTypes(['ApexClass', 'LightningComponentBundle'])
  .filterByDateRange(startDate, endDate)
  .filterByName('Controller%')
  .build();
```

**Benefits:**
- Fluent API maps naturally to CLI flags
- Centralized sanitization in `build()` method
- Type-safe filter composition
- Easy to add new filters without modifying existing code
- Very testable

---

## New CLI Flags

| Flag | Field | Operator | Example |
|------|-------|----------|---------|
| `--user, -u` | ChangedBy | = | `--user "John Doe"` |
| `--type, -t` | MemberType | IN | `--type ApexClass,LWC` |
| `--since` | SystemModstamp | >= | `--since 2024-01-01` |
| `--until` | SystemModstamp | <= | `--until 2024-12-31` |
| `--name` | MemberName | LIKE | `--name "Controller%"` |

---

## SourceMember API Fields

| Field | Type | Filterable | Notes |
|-------|------|------------|-------|
| `MemberType` | string | ✅ | ApexClass, LightningComponentBundle, CustomObject, etc. |
| `MemberName` | string | ✅ | Component API name |
| `ChangedBy` | ID | ✅ | User ID (requires lookup for display name) |
| `SystemModstamp` | datetime | ✅ | Last modification timestamp |
| `RevisionCounter` | int | ✅ | Revision number |

---

## Acceptance Criteria

- [ ] `SoqlQueryBuilder` class implemented with TDD
- [ ] All user inputs sanitized before query generation
- [ ] `--type` flag accepts comma-separated metadata types
- [ ] `--since` and `--until` flags accept ISO date format
- [ ] `--name` flag supports SOQL LIKE patterns (% wildcard)
- [ ] All filters can be combined (AND logic)
- [ ] 90%+ test coverage on builder and sanitization
- [ ] Integration tests for flag combinations

## Out of Scope
- OR logic for filters (all filters use AND)
- Custom field filtering
- Pagination / cursor support
- Saved filter presets

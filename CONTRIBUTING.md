# Contributing to track-changes

## Commit Message Format

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for automatic versioning and changelog generation.

### Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Quick Reference

| Type | When to Use | Version Bump |
|------|-------------|--------------|
| `feat` | New feature | Minor (0.1.0 → 0.2.0) |
| `fix` | Bug fix | Patch (0.1.0 → 0.1.1) |
| `docs` | Documentation only | None |
| `style` | Formatting (no code change) | None |
| `refactor` | Code restructuring | None |
| `perf` | Performance improvement | Patch |
| `test` | Adding/updating tests | None |
| `chore` | Build, config, deps | None |

### Scopes

| Scope | Description |
|-------|-------------|
| `cli` | Command flags and options |
| `query` | QueryService, SOQL operations |
| `display` | Output formatting (table/JSON/HTML) |
| `ci` | GitHub Actions, pipelines |
| `deps` | Dependency updates |

### Examples

```bash
# Feature (minor version bump)
feat(cli): add --limit flag for pagination

# Bug fix (patch version bump)
fix(query): escape single quotes in SOQL strings

# Breaking change (major version bump)
feat!: rename --user flag to --author

# Or with footer
feat(cli): change default output format

BREAKING CHANGE: Default output is now JSON instead of table

# Documentation (no release)
docs: add contributing guidelines

# Chore (no release)
chore(deps): update oclif to v4.2.0
```

### Breaking Changes

Use `!` after the type or add `BREAKING CHANGE:` in the footer:

```bash
# Option 1: Exclamation mark
feat!: remove deprecated --target flag

# Option 2: Footer
feat: redesign filter API

BREAKING CHANGE: filterByUser() now requires object parameter
```

## Development Workflow

1. **Write tests first** (TDD)
2. **Run tests:** `npm run test`
3. **Build:** `npm run build`
4. **Commit** with conventional format
5. **Push to main** → Auto-release triggered

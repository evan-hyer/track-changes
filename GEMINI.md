# Gemini Configuration

## Commit Message Format

**Always use Conventional Commits format for this project.**

This project uses semantic-release for automatic versioning. Commit messages MUST follow this format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types (required)
| Type | Description | Version Bump |
|------|-------------|--------------|
| `feat` | New feature | Minor (0.1.0 → 0.2.0) |
| `fix` | Bug fix | Patch (0.1.0 → 0.1.1) |
| `docs` | Documentation only | No release |
| `style` | Formatting, no code change | No release |
| `refactor` | Code change, no new feature | No release |
| `perf` | Performance improvement | Patch |
| `test` | Adding tests | No release |
| `chore` | Maintenance | No release |

### Breaking Changes
Add `!` after type or `BREAKING CHANGE:` in footer for major version bump:
```
feat!: rename --user flag to --author
```
or
```
feat: rename flag

BREAKING CHANGE: --user is now --author
```

### Scopes (optional)
- `cli` - Command flags/options
- `query` - QueryService, SOQL
- `display` - Output formatting
- `ci` - GitHub Actions, pipelines
- `deps` - Dependencies

### Examples
```
feat(cli): add --limit flag for pagination
fix(query): escape single quotes in SOQL
docs: update README with new flags
refactor(display): extract HTML escaping to utility
test(query): add edge case for empty results
chore(deps): update oclif to v4.1
feat!: remove deprecated --target flag
```

## Code Style
- Use TypeScript strict mode
- Prefer explicit types over `any`
- ESM imports with `.js` extension
- TDD: Write tests before implementation

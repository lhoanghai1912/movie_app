## Summary

<!-- What changed and why -->

## Type of change

- [ ] feat
- [ ] fix
- [ ] refactor
- [ ] docs
- [ ] test
- [ ] chore
- [ ] perf
- [ ] ci

## Scope touched

- [ ] Types (`src/types/`)
- [ ] Services (`src/services/`)
- [ ] Store/Thunk (`src/store/`)
- [ ] UI Components (`src/component/`)
- [ ] Screens/Containers (`src/container/`)
- [ ] Navigation (`src/navigators/`)
- [ ] Other

## Architecture & standards checklist

- [ ] Follows flow: **Types -> Service -> Thunk/Store -> UI -> Navigation**
- [ ] Thunk result contract preserved: `{ status: true, data }` / `{ status: false, error }`
- [ ] No direct object/array mutation
- [ ] No `any` introduced (or clearly justified)
- [ ] Uses `StyleSheet.create` (inline style only for dynamic values)
- [ ] Uses theme/scale tokens (no hardcoded color/size/magic numbers)
- [ ] Uses FlatList + `keyExtractor` for long lists (no FlatList-in-ScrollView)
- [ ] User-facing text is i18n-based (`t(...)`)
- [ ] No hardcoded secrets/tokens/credentials
- [ ] No debug/sensitive logs in production path

## Behavior states

- [ ] Loading state handled
- [ ] Error state handled
- [ ] Empty state handled (if applicable)

## Validation

- [ ] Type check
- [ ] Lint
- [ ] Tests
- [ ] Manual verification

### Commands run

```bash
# paste commands here
```

## UI evidence (if applicable)

<!-- Add screenshots / recordings -->

## Risks and rollback

- **Risk level**: Low / Medium / High
- **Rollback plan**:

## Related links

- Issue(s):
- API/spec/design links:

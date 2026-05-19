# GitHub Copilot Instructions — HaiAu CRM

## Project context

- **Domain**: HaiAu CRM mobile app (customers, sales, opportunities, service requests, stock, reports)
- **Stack**: React Native 0.84, TypeScript (strict), Redux Toolkit, Axios
- **Backend**: REST API from `API_URL + VERSION_API` (`.env`)
- **Node**: `>= 22.11.0`
- **Localization**: i18n (`vi` default/fallback, `en`, `lo`)

## Required architecture

### Layering and feature flow

Follow this implementation order:

1. `src/types/` (contracts)
2. `src/services/` (transport)
3. `src/store/<feature>/` (thunk/slice)
4. `src/container/<Feature>/` + `src/component/` (UI)
5. `src/navigators/` (screen wiring)

Prefer existing feature triad:

- `src/types/<feature>.ts`
- `src/services/<feature>.ts`
- `src/store/<feature>/`
- `src/container/<Feature>/`

### App boot and navigation

- Keep root flow driven by auth state (`Splash -> MainStack/AuthStack`).
- Use **Native Stack only**: `@react-navigation/native-stack`.
- Keep `animation: 'slide_from_right'` in screen options.
- Register all screen keys in `src/navigators/screennames.ts`.
- Use `useFocusEffect` for refresh-on-focus flows.
- Do not introduce `createStackNavigator` (JS stack).

### Module resolution

- Keep existing import style with `src` root aliases/bare imports used by project config.
- Follow existing alias conventions in `babel.config.js` and `tsconfig.json`.

## State, API, and storage patterns

### Thunk contract (critical)

All async flows should preserve:

- Success: `{ status: true, data }`
- Failure: `{ status: false, error }`

In UI/components, handle thunk results by checking `response.status` instead of broad try/catch flow.

### API layer

- Public endpoints: `src/utils/api.tsx` (`api`)
- Auth endpoints: `src/utils/apiBearer.tsx` (`apiBearer`)
- Preserve current bearer refresh/replay behavior and normalized error shape.
- Service layer should focus on HTTP I/O; keep UI concerns out of services.

### Storage

- Use helpers in `src/helpers/storagehelper.ts`.
- Do not introduce direct AsyncStorage usage in screens when helper wrappers exist.

## Coding standards

### TypeScript

- No `any` in new/edited code; use `unknown` + type narrowing.
- Use `interface` for object contracts, `type` for unions/intersections.
- Add explicit return types for exported functions.
- Use optional chaining `?.` and nullish coalescing `??` on external data paths.

### React Native UI

- Functional components + hooks only.
- Typed/destructured props.
- Handle loading, empty, success, and error states intentionally.
- Long lists must use `FlatList` with `keyExtractor`.
- Never nest `FlatList` inside `ScrollView`.

### Styling

- Use `StyleSheet.create`.
- Inline style only for truly dynamic values.
- Colors from `src/theme/index.ts`.
- Spacing/sizing from `src/constant/scale.ts` (`ms`, `vs`, `mvs`, etc.).
- Avoid magic numbers; prefer named constants/tokens.

### i18n

- User-facing text should use `t(...)` translation keys.
- Keep Vietnamese-first UX through existing locale config.

## Security and reliability

- Never hardcode secrets, API keys, credentials, or tokens.
- Validate inputs at boundaries.
- Do not silently swallow errors.
- Do not log sensitive data in production paths.

## Git and review rules

- Commit message format: `<type>: <description>`
- Types: `feat | fix | refactor | docs | test | chore | perf | ci`
- Keep changes surgical; avoid unrelated refactors.

## Tooling and reference files

- `.github/ARCHITECTURE.md`
- `.github/PROJECT_STRUCTURE.md`
- `.github/NEW_PROJECT_TEMPLATE.md`

File-scoped rules:

- `.github/instructions/typescript.instructions.md`
- `.github/instructions/component.instructions.md`
- `.github/instructions/styles.instructions.md`
- `.github/instructions/services.instructions.md`
- `.github/instructions/redux.instructions.md`

## Workflow guidance for Copilot/Cursor

- Start by reading nearby patterns before adding new structure.
- Reuse existing components/helpers/flows first.
- Prefer minimal, behavior-safe changes over speculative abstractions.
- Preserve current API envelope and navigation conventions across all feature work.

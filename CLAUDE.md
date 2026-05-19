@AGENTS.md

# movie_app

Mobile/web movie viewing app. Expo + React Native (TypeScript). File-based routing via expo-router. Currently scaffolded from the Expo starter template — feature code (catalogue, search, detail, favorites, player) is not implemented yet.

> **Product brief:** Vietnamese movie streaming app (Netflix-style). Data source: **Nguồn C API** (`https://phim.nguonc.com/api`). Screens: Home, Search, Detail, Watch, Favorites, History, Profile. Auth optional (Phase 2). Full roadmap: [ROADMAP.md](ROADMAP.md).

## Stack

| Layer | Choice |
|-------|--------|
| Runtime | Expo SDK **54** (`expo ^54.0.34`) — note: `AGENTS.md` references v55 docs but `package.json` is v54. Confirm with user when API surface differs. |
| RN / React | `react-native 0.81.5`, `react 19.1.0` |
| Routing | `expo-router` v6, file-based, `experiments.typedRoutes: true` |
| Tabs | `NativeTabs` from `expo-router/unstable-native-tabs` (unstable API) |
| Navigation | `@react-navigation/*` v7 (ThemeProvider only) |
| Styling | `StyleSheet` + `Colors`/`Spacing` constants for existing components. **NativeWind** for new feature screens (Phase 1 setup). |
| State | **Zustand** — stores: favorites, history, player, theme (to install) |
| Data fetching | **TanStack Query** — cache, infinite scroll, pagination (to install) |
| HTTP | **Axios** — `src/services/api.ts`, base: `https://phim.nguonc.com/api` (to install) |
| Animation | `react-native-reanimated` v4 + `react-native-worklets` (New Architecture) ✅ |
| Video | **expo-video** (new API, not expo-av) — to install |
| Images | `expo-image` ✅ (use this, never `Image` from `react-native`) |
| Icons | `expo-symbols` — per-platform name `{{ ios, android, web }}` |
| Storage | AsyncStorage or MMKV — favorites, history, token (to install) |
| Platforms | iOS, Android, Web |
| TS | strict, alias `@/*` → `src/*`, `@/assets/*` → `assets/*` |

## Layout

```
src/
  app/                  expo-router screens (file-based routing)
    _layout.tsx         root: ThemeProvider + AnimatedSplashOverlay + AppTabs
    index.tsx           Home tab
    explore.tsx         Explore tab
  components/
    app-tabs.tsx        NativeTabs config (+ .web.tsx variant)
    animated-icon.tsx   splash overlay (+ .web.tsx + .module.css)
    themed-text.tsx     text variants: default/title/small/subtitle/link/code
    themed-view.tsx     view bg keyed off theme
    external-link.tsx
    hint-row.tsx
    web-badge.tsx
    ui/collapsible.tsx  reanimated collapsible primitive
  constants/
    theme.ts            Colors (light/dark), Fonts (per-platform), Spacing scale, BottomTabInset, MaxContentWidth
  hooks/
    use-color-scheme.ts native re-export
    use-color-scheme.web.ts web variant
    use-theme.ts        returns Colors[scheme]
  global.css            imported by theme.ts (web)
assets/
  images/               icons, splash, tab icons, tutorial pngs
  fonts/                custom fonts (if any)
scripts/
  reset-project.js      moves starter to app-example/ — DESTRUCTIVE
```

## Conventions

- **Path imports:** always `@/components/...`, never relative `../../`. `@/assets/*` works too.
- **Themed primitives:** use `<ThemedText>` / `<ThemedView>` for anything color-aware. Don't read `Colors` directly in screens — use `useTheme()`.
- **Spacing:** prefer named scale (`Spacing.three` = 16). Don't hard-code pixel paddings.
- **Platform splits:** `*.web.tsx` / `*.web.ts` for web overrides, `Platform.select(...)` or `Platform.OS === 'web'` for inline branches.
- **Safe areas:** `useSafeAreaInsets()` + `BottomTabInset` constant for screens that scroll under the tab bar.
- **Images:** `expo-image` `<Image>` for everything. Static `require('@/assets/...')` is fine.
- **Icons:** `<SymbolView>` with per-platform `name={{ ios, android, web }}`.
- **Lists:** when adding feeds, use FlashList or RN `FlatList` with `expo-image` thumbnails — not `ScrollView` for long lists.
- **No comments unless WHY is non-obvious.** Code documents itself; identifier names carry intent.

## Commands

```bash
npm start            # expo start
npm run android
npm run ios
npm run web
npm run lint         # expo lint (ESLint config not yet set up — see README)
npm run reset-project   # DESTRUCTIVE: wipes app/, moves starter to app-example/
```

No test runner installed. No prettier config. No `.env` handling yet.

## Watch-outs

- `AGENTS.md` says read `https://docs.expo.dev/versions/v55.0.0/` exact docs before writing code. Treat that as the rule even though `package.json` says v54 — confirm with user which SDK is canonical when API surface differs.
- `NativeTabs` is from `expo-router/unstable-native-tabs` — API may shift between SDK minor versions.
- `react-native-reanimated` v4 requires the New Architecture; don't fall back to v3 patterns (e.g. `useSharedValue` initialisers behave differently).
- `experiments.reactCompiler: true` — manual memoisation is usually wrong here. Trust the compiler; profile before adding `useMemo`/`useCallback`.
- `expo-env.d.ts` is gitignored but currently shows as modified — regenerated on build. Don't commit it.
- `scripts/reset-project.js` is a one-shot. Don't run unless user explicitly asks.
- Generated `ios/` and `android/` folders are gitignored — this is a managed workflow project; prebuild is on-demand.

## Docs

- [ROADMAP.md](ROADMAP.md) — phases, install commands, performance rules
- [docs/PLAN.md](docs/PLAN.md) — index (links to all 4 role docs)
- [docs/ba.md](docs/ba.md) — actors, use cases, user stories, AC, API contract
- [docs/po.md](docs/po.md) — vision, RICE backlog, release plan, trade-offs
- [docs/pm.md](docs/pm.md) — sprint tasks, timeline, routing map, risks, DoD
- [docs/des.md](docs/des.md) — design system, wireframes, component specs, animations

## Phase Status

See [ROADMAP.md](ROADMAP.md) for full breakdown. Current phase: **Phase 1 — Foundation**.

Packages not yet installed (Phase 1 task):
```bash
npm install zustand @tanstack/react-query axios nativewind
npm install --save-dev tailwindcss
npx expo install expo-video @react-native-async-storage/async-storage
```

Do NOT add `expo-router/babel` to babel config — handled automatically by `babel-preset-expo` in SDK 54.

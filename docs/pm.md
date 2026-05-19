# Project Manager — Movie App
> Agent: PM · Model: Opus | Cập nhật: 2026-05-19

---

## Timeline Overview

```
Tuần 1 — Phase 1: Foundation
  Day 1-2  Install packages + NativeWind config + verify build
  Day 3    Axios client + API service layer
  Day 4    QueryProvider + first API call works
  Day 5    Folder structure + TypeScript types

Tuần 2 — Phase 2: Core UI
  Day 1-2  MovieCard + HorizontalList + LoadingSkeleton
  Day 3    Home screen: HeroBanner + 5 lists
  Day 4-5  Movie Detail screen

Tuần 3 — Phase 3: Player + Search
  Day 1-2  expo-video player + Watch screen
  Day 3    Episode list + next-episode flow
  Day 4-5  Search screen (debounce + infinite scroll)

Tuần 4 — Phase 4: Persistence + Polish
  Day 1    Zustand stores (favorites / history / theme)
  Day 2    Favorites screen
  Day 3    History + Continue watching
  Day 4    Animations (Reanimated transitions)
  Day 5    FlatList optimize + image cache + QA pass
```

---

## Phase 1 — Foundation Tasks

| ID | Task | Estimate | Depends | Status |
|----|------|----------|---------|--------|
| T1-01 | Install zustand + @tanstack/react-query + axios | 0.5d | — | ⬜ |
| T1-02 | Install nativewind + tailwindcss + @types/nativewind | 0.5d | T1-01 | ⬜ |
| T1-03 | Config tailwind.config.js (content paths) | 0.3d | T1-02 | ⬜ |
| T1-04 | Config babel.config.js for NativeWind | 0.2d | T1-03 | ⬜ |
| T1-05 | Verify NativeWind works (className test on index.tsx) | 0.2d | T1-04 | ⬜ |
| T1-06 | Create `src/services/api.ts` (Axios instance) | 0.3d | T1-01 | ⬜ |
| T1-07 | Create `src/services/movie.service.ts` | 0.5d | T1-06 | ⬜ |
| T1-08 | Create `src/providers/query-provider.tsx` | 0.3d | T1-01 | ⬜ |
| T1-09 | Wrap `_layout.tsx` with QueryProvider | 0.2d | T1-08 | ⬜ |
| T1-10 | Create all empty folders + index barrel exports | 0.3d | — | ⬜ |
| T1-11 | Define TypeScript types: Movie, Episode, ApiResponse | 0.5d | T1-07 | ⬜ |
| T1-12 | Home screen console.log API data (verify connection) | 0.2d | T1-07, T1-09 | ⬜ |

**Phase 1 total estimate: ~4 days**

---

## Phase 2 — Core UI Tasks

| ID | Task | Estimate | Depends | Status |
|----|------|----------|---------|--------|
| T2-01 | `MovieCard` component (poster + title + badge) | 1d | T1-05 | ⬜ |
| T2-02 | `LoadingSkeleton` component (shimmer) | 0.5d | T1-05 | ⬜ |
| T2-03 | `HorizontalList` component (title + FlatList) | 0.5d | T2-01 | ⬜ |
| T2-04 | `HeroBanner` component (gradient overlay + CTA) | 1d | T1-05 | ⬜ |
| T2-05 | `useLatestMovies` hook (React Query) | 0.3d | T1-07 | ⬜ |
| T2-06 | `useCategoryMovies` hook (phim lẻ/bộ/anime/tv) | 0.3d | T1-07 | ⬜ |
| T2-07 | Home screen full UI (HeroBanner + 5 HorizontalLists) | 1d | T2-03, T2-04, T2-05, T2-06 | ⬜ |
| T2-08 | Movie Detail screen — layout + poster + info | 1d | T1-05 | ⬜ |
| T2-09 | Movie Detail — `useMovieDetail` hook | 0.3d | T1-07 | ⬜ |
| T2-10 | Movie Detail — episode list (phim bộ) | 0.5d | T2-08 | ⬜ |
| T2-11 | Movie Detail — favorite toggle button (UI only) | 0.3d | T2-08 | ⬜ |
| T2-12 | Movie Detail — recommended movies row | 0.5d | T2-08, T2-03 | ⬜ |

**Phase 2 total estimate: ~7 days**

---

## Phase 3 — Player + Search Tasks

| ID | Task | Estimate | Depends | Status |
|----|------|----------|---------|--------|
| T3-01 | Install expo-video | 0.2d | — | ⬜ |
| T3-02 | `VideoPlayer` component (expo-video, basic controls) | 1d | T3-01 | ⬜ |
| T3-03 | Watch screen layout (player + episode list) | 1d | T3-02 | ⬜ |
| T3-04 | Fullscreen + landscape handling | 0.5d | T3-03 | ⬜ |
| T3-05 | Next episode button + auto-play logic | 0.5d | T3-03 | ⬜ |
| T3-06 | Search screen layout + input | 0.5d | T1-05 | ⬜ |
| T3-07 | `useMovieSearch` hook (debounce 300ms + useInfiniteQuery) | 0.5d | T1-07 | ⬜ |
| T3-08 | Search results infinite scroll + empty state | 0.5d | T3-06, T3-07 | ⬜ |
| T3-09 | Recent searches (AsyncStorage) | 0.5d | T3-06 | ⬜ |

**Phase 3 total estimate: ~5 days**

---

## Phase 4 — Persistence + Polish Tasks

| ID | Task | Estimate | Depends | Status |
|----|------|----------|---------|--------|
| T4-01 | Install AsyncStorage | 0.2d | — | ⬜ |
| T4-02 | `favorites.store.ts` (Zustand + AsyncStorage persist) | 0.5d | T4-01 | ⬜ |
| T4-03 | `history.store.ts` (Zustand + AsyncStorage persist) | 0.5d | T4-01 | ⬜ |
| T4-04 | `theme.store.ts` (Zustand, no persist) | 0.3d | — | ⬜ |
| T4-05 | Wire favorites to Detail screen (T2-11 → T4-02) | 0.3d | T4-02, T2-11 | ⬜ |
| T4-06 | Wire history to Watch screen (T3-03 → T4-03) | 0.3d | T4-03, T3-03 | ⬜ |
| T4-07 | Favorites screen (grid of saved movies) | 0.5d | T4-02 | ⬜ |
| T4-08 | History screen (continue watching list) | 0.5d | T4-03 | ⬜ |
| T4-09 | "Continue watching" progress bar on MovieCard | 0.3d | T4-03, T2-01 | ⬜ |
| T4-10 | Theme selector (4 palettes via theme.store) | 0.5d | T4-04 | ⬜ |
| T4-11 | Screen transitions (Reanimated) | 1d | — | ⬜ |
| T4-12 | FlatList optimization pass (all list screens) | 0.5d | T2-07 | ⬜ |
| T4-13 | Error boundaries + empty states | 0.5d | — | ⬜ |
| T4-14 | QA pass: iOS + Android + manual test all flows | 1d | All | ⬜ |

**Phase 4 total estimate: ~7 days**

---

## Tab Bar Structure

| Tab | Icon | Route | Phase |
|-----|------|-------|-------|
| Home | 🏠 | `/` | 2 |
| Search | 🔍 | `/search` | 3 |
| Favorites | ♥ | `/favorites` | 4 |
| Profile | 👤 | `/profile` | 4 |

Update `src/components/app-tabs.tsx` to add Search + Favorites + Profile tabs.

---

## Routing Map

```
src/app/
├── _layout.tsx          (root layout + providers)
├── index.tsx            (Home — Phase 2)
├── search.tsx           (Search — Phase 3)
├── favorites.tsx        (Favorites — Phase 4)
├── profile.tsx          (Profile — Phase 4)
├── movie/
│   └── [slug].tsx       (Movie Detail — Phase 2)
└── watch/
    └── [id].tsx         (Watch screen — Phase 3)
```

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Nguồn C API rate limit | Medium | High | `staleTime: 5min` + `cacheTime: 30min` trong React Query |
| API response structure changes | Low | High | Service layer wraps all responses — change in 1 file |
| expo-video API unclear | Medium | Medium | Read exact SDK 54 docs before implementing; test on device early |
| NativeWind v4 + New Arch conflict | Low | High | Test Day 1 of Phase 1; rollback plan = StyleSheet only |
| FlatList perf on low-end Android | Medium | High | `removeClippedSubviews`, `windowSize=5`, `getItemLayout` |
| Reanimated v4 breaking API | Low | Medium | Reanimated v4 already installed — use v4 API from start |

---

## Definition of Done

Each task is done when:
- [ ] Feature works on both iOS and Android simulators
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No lint errors (`npm run lint`)
- [ ] Edge cases handled (empty, loading, error)
- [ ] No console.error in terminal during normal flow

Sprint done when:
- [ ] All tasks in phase complete
- [ ] Manual test of full user flow
- [ ] No regression in previous phases

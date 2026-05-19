# Movie App — Project Roadmap

> Vietnamese movie streaming app. Source: **Nguồn C API** (`https://phim.nguonc.com/api`).
> Netflix-style UI. Built with Expo + TypeScript.

---

## Stack

| Layer | Choice | Note |
|-------|--------|------|
| Framework | Expo SDK 54 | Already initialized |
| Routing | Expo Router v6 | File-based, `src/app/` |
| State | Zustand | Nhẹ hơn Redux, stores: favorites/history/player/theme |
| Data fetching | TanStack Query | Cache, infinite scroll, retry, pagination |
| HTTP | Axios | `src/services/api.ts` with base URL |
| Styling | NativeWind (Tailwind) | Replaces raw StyleSheet for new screens |
| Animation | Reanimated v4 + Gesture Handler | Already installed |
| Video | expo-video | Native, new API (replaces expo-av) |
| Images | expo-image | Already installed |
| Storage | AsyncStorage hoặc MMKV | Favorites, history, token |
| Auth | Optional — Firebase (Google/Apple/Facebook/Email) | Phase 2+ |

---

## API — Nguồn C

Base URL: `https://phim.nguonc.com/api`

| Endpoint | Mô tả |
|----------|-------|
| `GET /films/phim-moi-cap-nhat?page=N` | Phim mới cập nhật |
| `GET /films/phim-le?page=N` | Phim lẻ |
| `GET /films/phim-bo?page=N` | Phim bộ |
| `GET /films/hoat-hinh?page=N` | Anime / hoạt hình |
| `GET /films/tv-shows?page=N` | TV Shows |
| `GET /film/{slug}` | Chi tiết phim |
| `GET /films/search?keyword=X&page=N` | Tìm kiếm |

Full docs: https://phim.nguonc.com/api-document

---

## Target Screens

| Screen | Route | Mô tả |
|--------|-------|-------|
| Home | `/` | Banner + horizontal lists (mới/phim lẻ/anime/TV) |
| Categories | `/categories` | Filter theo thể loại |
| Search | `/search` | Debounce, infinite scroll |
| Movie Detail | `/movie/[slug]` | Poster, mô tả, tập phim, gợi ý |
| Watch | `/watch/[id]` | Video player, next episode, fullscreen |
| Favorites | `/favorites` | Local storage |
| History | `/history` | Continue watching |
| Profile | `/profile` | Settings, theme, auth (Phase 2) |

---

## Folder Structure (Target)

```
src/
├── app/                        # expo-router screens
│   ├── _layout.tsx             # Root: providers + tabs
│   ├── index.tsx               # Home
│   ├── search.tsx
│   ├── favorites.tsx
│   ├── history.tsx
│   ├── profile.tsx
│   ├── movie/
│   │   └── [slug].tsx          # Movie detail
│   └── watch/
│       └── [id].tsx            # Player
│
├── components/                 # Shared UI primitives
│   ├── MovieCard/
│   ├── HeroBanner/
│   ├── HorizontalList/
│   ├── EpisodeCard/
│   ├── LoadingSkeleton/
│   └── VideoPlayer/
│
├── features/                   # Feature-scoped code
│   ├── home/
│   │   ├── components/
│   │   └── hooks/
│   ├── movie/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types.ts
│   ├── search/
│   ├── player/
│   └── profile/
│
├── services/                   # API layer
│   ├── api.ts                  # Axios instance
│   ├── movie.service.ts
│   └── search.service.ts
│
├── store/                      # Zustand stores
│   ├── favorites.store.ts
│   ├── history.store.ts
│   ├── player.store.ts
│   └── theme.store.ts
│
├── providers/
│   └── query-provider.tsx
│
├── hooks/                      # Shared hooks
├── types/                      # Global TS types
├── constants/                  # theme.ts, spacing, colors
└── utils/
```

---

## Development Phases

### Phase 1 — Foundation (Tuần 1)
**Mục tiêu:** Project chạy được, routing, API, styling.

- [ ] Install: `zustand`, `@tanstack/react-query`, `axios`, `nativewind`, `tailwindcss`
- [ ] Install: `expo-video`, `@react-native-async-storage/async-storage`
- [ ] Config NativeWind (tailwind.config.js + babel + global.css)
- [ ] Setup Axios client (`src/services/api.ts`)
- [ ] Setup QueryProvider (`src/providers/query-provider.tsx`)
- [ ] Wrap root `_layout.tsx` with QueryProvider
- [ ] Tạo folder structure đầy đủ
- [ ] Verify: Home screen fetch phim mới, render list tên phim

### Phase 2 — Core Screens (Tuần 2)
**Mục tiêu:** Các màn hình chính hoạt động.

- [ ] Home screen: HeroBanner + HorizontalList (mới/lẻ/bộ/anime/TV)
- [ ] MovieCard component (poster, tên, rating)
- [ ] Movie Detail screen (`/movie/[slug]`)
- [ ] Episode list trong Detail
- [ ] Search screen (debounce + `useInfiniteQuery`)
- [ ] LoadingSkeleton component

### Phase 3 — Player (Tuần 2–3)
**Mục tiêu:** Xem phim được.

- [ ] Watch screen (`/watch/[id]`)
- [ ] Video player với `expo-video`
- [ ] Fullscreen + controls
- [ ] Next episode / auto-play
- [ ] Lưu progress vào history store

### Phase 4 — Persistence & UX (Tuần 3)
**Mục tiêu:** Favorites, history, dark mode.

- [ ] Favorites screen (AsyncStorage/MMKV)
- [ ] History / Continue watching
- [ ] Dark mode (NativeWind `dark:` classes + theme store)
- [ ] Pull to refresh
- [ ] Error boundary + empty states

### Phase 5 — Polish (Tuần 4)
**Mục tiêu:** Production-ready feel.

- [ ] Reanimated transitions (screen enter/exit)
- [ ] FlatList optimization (`windowSize`, `removeClippedSubviews`, `getItemLayout`)
- [ ] Image caching strategy (expo-image built-in)
- [ ] Bottom sheet player mini
- [ ] Splash screen animation

### Phase 6+ — Scale (Sau MVP)
Auth (Firebase), backend proxy, AI recommendations, subtitles, offline download, Chromecast, push notifications.

---

## State Management

```ts
// favorites.store.ts
interface FavoritesStore {
  favorites: Movie[]
  addFavorite: (movie: Movie) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

// history.store.ts
interface HistoryStore {
  history: WatchProgress[]
  updateProgress: (movieId: string, episodeId: string, progress: number) => void
  getProgress: (episodeId: string) => number | undefined
}

// theme.store.ts
interface ThemeStore {
  isDark: boolean
  toggle: () => void
}
```

---

## Performance Rules

- `FlatList` (not `ScrollView`) for all lists with `initialNumToRender=6`, `windowSize=5`, `removeClippedSubviews`
- `expo-image` everywhere — never `<Image>` from react-native
- `useInfiniteQuery` for paginated lists (home sections, search)
- `memo()` on MovieCard — list renders only changed items
- `reactCompiler` is ON → do NOT add manual `useMemo`/`useCallback` without profiling first

---

## Watch-outs

- **NativeWind + existing theme system:** Current `ThemedText`/`ThemedView` use StyleSheet. New screens can use NativeWind. Don't mix on same component.
- **expo-video vs expo-av:** Use `expo-video` (new API, SDK 54+). `expo-av` deprecated for video.
- **Nguồn C API stability:** Public API, may rate-limit or change. Don't deep-link directly to stream URLs — proxy if going production.
- **Expo Router v6 babel:** Do NOT add `expo-router/babel` to babel config — not needed in Expo SDK 54 (auto-handled by `babel-preset-expo`).
- **NativeTabs:** Current tabs use `expo-router/unstable-native-tabs`. Keep for native feel — don't replace with `@react-navigation/bottom-tabs` unless needed.

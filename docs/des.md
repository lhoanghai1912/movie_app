# Design System & UI Specs — Movie App
> Agent: DES · Model: Opus | Cập nhật: 2026-05-19

---

## Design Principles

1. **Dark-first** — All themes are dark. No bright white backgrounds.
2. **Content-forward** — Poster art chiếm tối đa diện tích màn hình.
3. **One-thumb navigation** — Bottom tab bar, tap targets ≥ 44×44px.
4. **Instant feedback** — Skeleton trước khi data về, không bao giờ blank screen.
5. **Cinematic feel** — Gradient overlays, subtle shadows, smooth transitions.

---

## Color Themes

4 palettes định nghĩa trong `src/constants/theme.ts` → `MovieThemes`.

| Theme Key | Name | Accent | Vibe |
|-----------|------|--------|------|
| `cinema` | Cinema Dark | `#E63946` Red | Netflix, default |
| `ocean` | Ocean Night | `#4ECDC4` Teal | Prime Video |
| `purple` | Purple Haze | `#9B5DE5` Purple | HBO Max |
| `amber` | Amber Noir | `#F4A261` Orange | Editorial warm |

### Token Reference (Cinema Dark — default)

| Token | Value | Usage |
|-------|-------|-------|
| `background` | `#0A0A0F` | Screen background |
| `surface` | `#141418` | Cards, inputs |
| `card` | `#1E1E28` | Movie cards, list items |
| `overlay` | `rgba(10,10,15,0.85)` | Image overlays, modals |
| `text` | `#FFFFFF` | Primary text |
| `textSecondary` | `#A0A0B4` | Subtitles, metadata |
| `textMuted` | `#5C5C72` | Placeholders, disabled |
| `accent` | `#E63946` | Buttons, active states, badges |
| `accentDim` | `#8B1E25` | Pressed accent |
| `border` | `#2A2A38` | Dividers, card borders |
| `tabBar` | `#0E0E14` | Bottom tab background |
| `skeleton` | `#1E1E28` | Skeleton base |
| `skeletonHighlight` | `#2E2E40` | Skeleton shimmer |
| `star` | `#F5C518` | Rating stars (IMDb yellow) |

---

## Typography Scale

Defined in `src/constants/theme.ts` → `FontSize`, `FontWeight`.

| Role | Size | Weight | Usage |
|------|------|--------|-------|
| Hero title | 32–40px | 700 | HeroBanner phim title |
| Screen title | 24px | 700 | Header screen titles |
| Section heading | 18px | 600 | "Phim Mới", "Anime" |
| Card title | 12px | 600 | MovieCard name |
| Body | 14px | 500 | Descriptions |
| Meta | 12px | 400 | Year, duration, genre |
| Badge | 10px | 700 | Category tag, episode number |
| Caption | 10px | 400 | Timestamps, credits |

---

## Spacing

4pt base grid → `Spacing` tokens.

| Token | Value | Common use |
|-------|-------|-----------|
| `Spacing.half` | 2px | Micro gaps |
| `Spacing.one` | 4px | Icon gap, tight padding |
| `Spacing.two` | 8px | Between list items |
| `Spacing.three` | 16px | Screen horizontal padding |
| `Spacing.four` | 24px | Section gaps |
| `Spacing.five` | 32px | Between major sections |
| `Spacing.six` | 64px | Hero spacing |

`HorizontalPad = 16px` — screen edge padding universal.

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `Radius.xs` | 4px | Tags, badges |
| `Radius.sm` | 6px | Buttons |
| `Radius.md` | 8px | Movie cards, inputs |
| `Radius.lg` | 12px | Bottom sheets, modals |
| `Radius.xl` | 16px | Hero cards |
| `Radius.full` | 9999px | Pills, avatars |

---

## Component Specs

### MovieCard (Portrait)

```
┌──────────┐
│          │  Width:  120px
│  POSTER  │  Height: 180px
│  IMAGE   │  Radius: Radius.md (8px)
│          │  Image:  expo-image, cover
│ [Badge]  │  Badge:  top-right, 8px pad, Radius.xs
└──────────┘
│ Title    │  12px / 600 / text, 2 lines max
│ Meta     │  10px / 400 / textSecondary
└──────────┘
Total h: ~220px

States:
  Default:  normal
  Pressed:  scale(0.96), opacity 0.8 (Reanimated)
  Loading:  Skeleton box same dimensions
```

### MovieCard (Wide — for History, recommended)

```
┌──────────────────────┐
│                      │  Width:  200px
│    POSTER 16:9       │  Height: 112px
│                      │  Radius: Radius.md
│  ████░░░░░░░░░░      │  Progress bar: 4px, accent color
└──────────────────────┘
│ Title                │  13px / 600 / text
│ Tập 3 · 22:10 left   │  11px / 400 / textSecondary
└──────────────────────┘
```

### HeroBanner

```
Width:   100vw
Height:  56vw (min 200px, max 320px)
Image:   expo-image, cover
Overlay: LinearGradient
         transparent 0% → background 100%
         from top: 30% transparent
         bottom 70%: background fade

Content (positioned absolute, bottom):
  Genre tag:  Radius.xs, accent bg, 10px/700
  Title:      28px / 700 / text
  Meta:       13px / 400 / textSecondary
  Buttons:    Row, gap 12px
    [▶ Xem ngay]  accent bg, 44px h, Radius.sm
    [+ Lưu]       border accent, 44px h, Radius.sm
```

### EpisodeCard

```
Width:  72px
Height: 72px
Radius: Radius.md (8px)

States:
  Unwatched:  background = surface
  Watching:   border 2px accent + progress underline
  Watched:    background = accentDim, checkmark overlay
  
Content:
  Episode number: 18px / 700 / text, centered
  Watched check:  16px icon, textSecondary
```

### LoadingSkeleton

```
Base color:      skeleton (#1E1E28)
Shimmer color:   skeletonHighlight (#2E2E40)
Animation:       translateX -100% → 100%, 1.2s loop, Reanimated
Radius:          same as target component
```

### SearchInput

```
Height:          48px
Background:      surface
Border:          1px border, Radius.md
Left icon:       🔍 16px, textMuted
Placeholder:     textMuted
Text:            text, 14px / 400
Clear button:    ✕ right, visible when text.length > 0
Focus border:    accent color
```

### Genre/Category Badge

```
Height:          24px
Padding:         4px 10px
Background:      card
Border:          1px border
Radius:          Radius.full (pill)
Text:            11px / 600 / textSecondary

Active state:
Background:      accent
Text:            white
Border:          none
```

---

## Screen Wireframes

### Home Screen

```
┌─────────────────────────────┐  StatusBar
├─────────────────────────────┤
│                             │
│   ┌─────────────────────┐   │
│   │                     │   │
│   │    HERO BANNER      │   │  56vw
│   │    [Genre] [Year]   │   │
│   │    Title ██████     │   │
│   │    [▶ Xem]  [+Lưu] │   │
│   └─────────────────────┘   │
│                             │
│ Phim Mới               ›   │  Section header
│ ┌────┐ ┌────┐ ┌────┐       │
│ │    │ │    │ │    │  ...  │  MovieCard row
│ └────┘ └────┘ └────┘       │
│                             │
│ Phim Lẻ                ›   │
│ ┌────┐ ┌────┐ ┌────┐       │
│ │    │ │    │ │    │  ...  │
│ └────┘ └────┘ └────┘       │
│                             │
│ Phim Bộ                ›   │  ...repeat for Anime, TV
│                             │
├─────────────────────────────┤
│  🏠      🔍      ♥      👤 │  Tab bar 60px
└─────────────────────────────┘
```

### Movie Detail Screen

```
┌─────────────────────────────┐
│ ← Back              ♥ Save  │  Header, transparent over image
├─────────────────────────────┤
│                             │
│ ┌─────────────────────────┐ │
│ │                         │ │
│ │      POSTER 16:9        │ │  Full width, gradient bottom
│ │                         │ │
│ │ [Action][2024][HD]      │ │  badges
│ │ Title ████████████      │ │
│ │ ★ 8.2 · 120 phút        │ │
│ └─────────────────────────┘ │
│                             │
│   [▶ Xem Phim]  [↓ Tải]   │  CTAs, accent button
│                             │
│ ──── Nội dung ──────────── │
│ Lorem ipsum dolor sit amet  │
│ ... [Xem thêm]             │
│                             │
│ ──── Thể loại ──────────── │
│ [Action] [Drama] [Thriller] │  pill badges
│                             │
│ ──── Danh sách tập ──────── │  (phim bộ only)
│ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐  │  EpisodeCard grid
│ │1 │ │2 │ │●3│ │4 │ │5 │  │  ● = active/watching
│ └──┘ └──┘ └──┘ └──┘ └──┘  │
│                             │
│ ──── Có thể bạn thích ───── │
│ ┌────┐ ┌────┐ ┌────┐       │
│ └────┘ └────┘ └────┘       │
└─────────────────────────────┘
```

### Watch Screen

```
┌─────────────────────────────┐  [Landscape preferred]
│                             │
│                             │
│         VIDEO PLAYER        │  expo-video, black bg
│         (16:9 ratio)        │
│                             │
│                             │
│─────────────────────────────│
│ ← Tên Phim — Tập 3     [⛶] │  Back + fullscreen
│ ─────────────████░░░░  24:15│  Seek bar + time
│ ⏮  ⏪  ▶/⏸  ⏩  ⏭   🔊 ⚙  │  Controls
└─────────────────────────────┘

[Portrait only — below player]
│ Tập tiếp theo: Tập 4    →   │  Next episode card
│─────────────────────────────│
│ Danh sách tập               │
│ ○ Tập 1  ✓ Tập 2  ● Tập 3  │
│   Tập 4    Tập 5    Tập 6   │
└─────────────────────────────┘
```

### Search Screen

```
┌─────────────────────────────┐
│ ← [🔍  Tìm kiếm phim...  ] │  Fixed search bar
├─────────────────────────────┤
│                             │
│ Tìm kiếm gần đây           │  [before typing]
│  ⏱ Avengers           ✕    │
│  ⏱ One Piece          ✕    │
│  ⏱ Doraemon           ✕    │
│  [Xóa tất cả]              │
│                             │
│─────────────────────────────│
│ Thể loại                   │
│ [Action][Comedy][Anime]     │
│ [Romance][Horror][Sci-Fi]   │
│                             │
│─────────────────────────────│
│                             │  [after typing]
│ Kết quả cho "dragon"        │
│ ┌──────────────────────┐    │
│ │ POSTER │ Dragon Ball │    │  Horizontal MovieCard
│ │        │ ★7.8 · 2023 │    │
│ └──────────────────────┘    │
│ ┌──────────────────────┐    │
│ │ POSTER │ Dragonheart │    │
│ └──────────────────────┘    │
│ [loading more...]           │  Infinite scroll
└─────────────────────────────┘
```

### Favorites Screen

```
┌─────────────────────────────┐
│  Yêu thích (24)             │  Count
├─────────────────────────────┤
│                             │
│ ┌────┐ ┌────┐ ┌────┐       │
│ │    │ │    │ │    │       │  2-col or 3-col grid
│ └────┘ └────┘ └────┘       │  MovieCard portrait
│ ┌────┐ ┌────┐ ┌────┐       │
│ │    │ │    │ │    │       │
│ └────┘ └────┘ └────┘       │
│                             │
│ [empty state]               │
│   🎬 Chưa có phim yêu thích │
│   [Khám phá phim]           │
└─────────────────────────────┘
```

---

## Animation Specs

| Animation | Library | Duration | Easing |
|-----------|---------|----------|--------|
| Screen enter | Reanimated | 250ms | easeOut |
| Screen exit | Reanimated | 200ms | easeIn |
| MovieCard press | Reanimated | 100ms | easeOut → 150ms easeIn |
| Skeleton shimmer | Reanimated | 1200ms | linear, loop |
| Hero banner auto-scroll | Reanimated | 400ms | easeInOut |
| Episode card select | Reanimated | 150ms | spring |
| Favorites heart | Reanimated | 200ms | spring (bounce) |

---

## Accessibility

- [ ] All interactive elements: min 44×44px touch target
- [ ] Text/bg contrast: ≥ 4.5:1 (AA) — `text` on `background` = 20:1 ✓
- [ ] `textSecondary` on `background` — verify per theme
- [ ] Video controls: accessible labels (play, pause, seek)
- [ ] Images: `accessibilityLabel` = movie title
- [ ] Genre badges: `accessibilityRole="button"` when tappable
- [ ] Loading skeletons: `accessibilityLabel="Đang tải"`, `accessible={false}` for children

---

## Developer Handoff Checklist

- [x] Color tokens defined in `src/constants/theme.ts`
- [x] Typography scale defined in `src/constants/theme.ts`
- [x] Spacing tokens defined in `src/constants/theme.ts`
- [x] Border radius tokens defined in `src/constants/theme.ts`
- [x] Card dimensions defined in `src/constants/theme.ts`
- [x] `useMovieTheme()` hook ready in `src/hooks/use-movie-theme.ts`
- [ ] NativeWind tailwind.config.js maps tokens → CSS variables
- [ ] All component sizes in 4pt grid
- [ ] All states documented (default / pressed / loading / error / empty)

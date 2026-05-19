# Business Analysis — Movie App
> Agent: BA · Model: Opus | Cập nhật: 2026-05-19

---

## Actors

| Actor | Mô tả | Quyền |
|-------|-------|-------|
| **Viewer** | Người dùng cuối | Full app access |
| **Guest** | Chưa login | Browse + Watch (no sync) |
| **Authenticated User** | Đã login | Browse + Watch + Favorites + History sync |
| *(Admin)* | Quản lý — Phase 3+ | CMS, analytics |

---

## Core Use Cases

```
UC-01: Browse phim mới
  Actor: Viewer
  Flow:  Mở app → Home → Cuộn danh sách → Xem poster + tên
  Alt:   Pull-to-refresh khi stale

UC-02: Xem chi tiết phim
  Actor: Viewer
  Flow:  Tap MovieCard → Detail screen → Poster, mô tả, danh sách tập
  Alt:   Skeleton loading nếu slow network

UC-03: Xem phim
  Actor: Viewer
  Flow:  Chọn tập → Watch screen → Video autoplay → Controls
  Alt:   Resume từ lần xem trước (History)

UC-04: Tìm kiếm
  Actor: Viewer
  Flow:  Tap Search tab → Gõ keyword (debounce 300ms) → Infinite scroll kết quả
  Alt:   Empty state nếu không có kết quả

UC-05: Lưu yêu thích
  Actor: Viewer
  Flow:  Detail screen → Tap ♥ → Lưu local (AsyncStorage/MMKV)
  Auth:  Sync lên server nếu logged in (Phase 2)

UC-06: Lịch sử xem
  Actor: Viewer
  Flow:  Xem phim → Lưu progress → History tab → Continue watching
```

---

## User Stories

### S-001: Home Screen

```
AS A viewer
I WANT TO see curated movie lists on the home screen
SO THAT I can discover new content without searching

ACCEPTANCE CRITERIA:
- [ ] Given app loads, When home renders, Then hero banner shows 1 featured movie
- [ ] When screen loads, Then 5 horizontal lists show: Mới | Lẻ | Bộ | Anime | TV
- [ ] Each list has ≥ 10 items, horizontally scrollable
- [ ] Each MovieCard shows: poster, name, category badge
- [ ] Pull-to-refresh triggers re-fetch
- [ ] Loading state shows skeleton, not blank screen
- [ ] Error state shows retry button

PERFORMANCE:
- First paint < 1.5s on fast 3G
- FlatList initialNumToRender = 6
```

### S-002: Movie Detail

```
AS A viewer
I WANT TO see full movie information
SO THAT I can decide whether to watch

ACCEPTANCE CRITERIA:
- [ ] Poster (full width, aspect 16:9), gradient overlay to bottom
- [ ] Title, year, duration, genre tags, rating
- [ ] Description truncated to 3 lines, "Xem thêm" expand
- [ ] Episode list (phim bộ) or single Watch button (phim lẻ)
- [ ] "Đã xem X/Y tập" badge if history exists
- [ ] Favorite button (filled if in favorites)
- [ ] Recommended movies row at bottom
```

### S-003: Watch Screen

```
AS A viewer
I WANT TO watch movie/episode seamlessly
SO THAT I have a good viewing experience

ACCEPTANCE CRITERIA:
- [ ] Video plays automatically on load
- [ ] Controls: play/pause, seek bar, fullscreen, back
- [ ] Progress saved every 10s to history store
- [ ] Resume from saved position if re-entering
- [ ] "Tập tiếp theo" button visible when episode ends
- [ ] Landscape auto-fullscreen on device rotation
```

### S-004: Search

```
AS A viewer
I WANT TO search movies by keyword
SO THAT I can find specific content quickly

ACCEPTANCE CRITERIA:
- [ ] Search input with debounce 300ms
- [ ] Results as infinite scroll list (MovieCard)
- [ ] Recent searches saved locally (max 10)
- [ ] Empty state: "Không tìm thấy kết quả cho '[keyword]'"
- [ ] Loading skeleton during fetch
```

### S-005: Favorites

```
AS A viewer
I WANT TO save movies to favorites
SO THAT I can quickly find movies I like later

ACCEPTANCE CRITERIA:
- [ ] Tap ♥ on Detail screen toggles favorite
- [ ] Favorites tab shows saved movies as grid
- [ ] Remove from favorites via long-press or swipe
- [ ] Count badge on tab icon
- [ ] Persists across app restarts (AsyncStorage/MMKV)
```

### S-006: History / Continue Watching

```
AS A viewer
I WANT TO resume watching where I left off
SO THAT I don't lose my progress

ACCEPTANCE CRITERIA:
- [ ] Progress auto-saved every 10s while watching
- [ ] History tab shows last 20 movies/episodes
- [ ] "Tiếp tục xem" chip on Detail screen if progress > 5%
- [ ] Progress bar on MovieCard thumbnail in History
- [ ] Clear individual item or clear all
```

---

## API Contract — Nguồn C

Base URL: `https://phim.nguonc.com/api`
Docs: https://phim.nguonc.com/api-document

| Endpoint | Method | Mô tả |
|----------|--------|-------|
| `/films/phim-moi-cap-nhat?page=N` | GET | Phim mới cập nhật |
| `/films/phim-le?page=N` | GET | Phim lẻ |
| `/films/phim-bo?page=N` | GET | Phim bộ |
| `/films/hoat-hinh?page=N` | GET | Anime / hoạt hình |
| `/films/tv-shows?page=N` | GET | TV Shows |
| `/film/{slug}` | GET | Chi tiết phim + episodes |
| `/films/search?keyword=X&page=N` | GET | Tìm kiếm |

### Constraints

- Public API — không cần auth header
- Rate limit: chưa rõ → cache aggressively
- Cấu trúc response có thể thay đổi → wrap trong service layer
- Downtime risk → nên có error boundary + retry

---

## Dependencies Map

```
S-001 (Home)     → cần T1-04 (Axios), T1-05 (movie.service), T1-06 (QueryProvider)
S-002 (Detail)   → cần S-001 done (routing từ MovieCard)
S-003 (Watch)    → cần S-002 done (episode ID từ Detail)
S-004 (Search)   → độc lập, parallel với S-002
S-005 (Favorites)→ cần S-002 done (favorite button trên Detail)
S-006 (History)  → cần S-003 done (progress từ Watch)
```

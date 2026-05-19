# Product Owner — Movie App
> Agent: PO · Model: Opus | Cập nhật: 2026-05-19

---

## Product Vision

> Ứng dụng xem phim Việt Nam đơn giản, nhanh, đẹp.
> Không cần login để xem. Trải nghiệm tốt nhất trên mobile.

**Mission:** Cho người dùng Việt Nam trải nghiệm xem phim online mượt mà nhất — đúng phim muốn xem, đúng tập đang xem, không cần tài khoản.

**Core Values:**
1. **Speed first** — mở app là thấy phim ngay
2. **No-friction** — không ép login, không ép đăng ký
3. **Beautiful dark UI** — cinema feel trên điện thoại
4. **Content-forward** — poster + tên chiếm hết màn hình

---

## Success Metrics (MVP)

| Metric | Target | Measure |
|--------|--------|---------|
| App startup time | < 2s | Expo startup profiler |
| Home first paint | < 1.5s trên 4G | React DevTools |
| Video start time | < 3s sau tap | Manual test |
| Crash-free sessions | ≥ 99% | Sentry |
| ANR rate (Android) | < 0.1% | Play Console |
| FlatList scroll FPS | ≥ 55fps | Flipper |

---

## Feature Prioritization — RICE

| Feature | Reach | Impact | Confidence | Effort | Score | Priority |
|---------|-------|--------|------------|--------|-------|----------|
| Home screen + API | 100% | 3 | 95% | 1w | **285** | P0 |
| Movie Detail | 100% | 3 | 90% | 0.5w | **540** | P0 |
| Search | 80% | 2 | 90% | 0.5w | **288** | P0 |
| Video Player | 100% | 3 | 80% | 1w | **240** | P0 |
| Favorites (local) | 70% | 2 | 95% | 0.5w | **266** | P1 |
| History / Continue | 60% | 2 | 85% | 0.5w | **204** | P1 |
| Dark/Light toggle | 50% | 1 | 99% | 0.2w | **247** | P1 |
| Auth — Firebase | 30% | 2 | 70% | 2w | **21** | P2 |
| Push notifications | 25% | 1 | 70% | 1w | **17** | P2 |
| AI Recommend | 10% | 2 | 50% | 4w | **2.5** | P3 |
| Offline download | 15% | 2 | 60% | 3w | **6** | P3 |
| Chromecast | 5% | 1 | 50% | 2w | **1.25** | P3 |

---

## Backlog

### P0 — Must Have (v1.0 MVP)

| ID | Feature | Story | Status |
|----|---------|-------|--------|
| F-001 | Foundation setup | Install + config all packages | ⬜ Not started |
| F-002 | Home screen | S-001 | ⬜ Not started |
| F-003 | Movie Detail | S-002 | ⬜ Not started |
| F-004 | Video Player (Watch) | S-003 | ⬜ Not started |
| F-005 | Search | S-004 | ⬜ Not started |

### P1 — Should Have (v1.0)

| ID | Feature | Story | Status |
|----|---------|-------|--------|
| F-006 | Favorites | S-005 | ⬜ Not started |
| F-007 | History | S-006 | ⬜ Not started |
| F-008 | Theme toggle (dark/light) | — | ⬜ Not started |
| F-009 | Animations + polish | — | ⬜ Not started |

### P2 — Nice to Have (v1.1)

| ID | Feature | Notes |
|----|---------|-------|
| F-010 | Firebase Auth | Google + Apple + Email |
| F-011 | Favorites sync | Cloud via Firebase |
| F-012 | History sync | Cloud via Firebase |
| F-013 | Push notifications | New movies, continue watching |

### P3 — Future (v2.0+)

| ID | Feature | Notes |
|----|---------|-------|
| F-014 | Subtitles multi-language | SRT/VTT support |
| F-015 | AI recommendations | Based on watch history |
| F-016 | Offline download | expo-file-system + DRM check |
| F-017 | Chromecast | expo-av cast support |
| F-018 | Watch together | WebSocket realtime sync |
| F-019 | Android TV | Expo TV target |

---

## Release Plan

### v1.0 — MVP (~4 tuần)

**In scope:**
- Home (trending, phim lẻ, phim bộ, anime, TV)
- Movie Detail + Episode list
- Video Player (Watch screen)
- Search (debounce + infinite scroll)
- Favorites (local storage)
- History / Continue watching
- Dark mode (4 theme palettes)
- Animations (Reanimated transitions)

**Out of scope:**
- Auth / login
- Cloud sync
- Push notifications
- Download offline

**Definition of Done — v1.0:**
- [ ] All P0 + P1 features working on iOS + Android
- [ ] No crash on startup
- [ ] Video plays on both platforms
- [ ] Search returns correct results
- [ ] Favorites persist after app kill
- [ ] History tracks progress correctly
- [ ] FPS ≥ 55 on scroll (FlatList)
- [ ] Video start < 3s

### v1.1 — Auth + Sync (~3 tuần sau v1.0)

- Firebase login (Google + Apple)
- Favorites + History cloud sync
- Push notifications (new content)

### v2.0 — Scale (TBD)

- AI recommendations
- Subtitles
- Offline download
- Chromecast

---

## Trade-off Decisions

| Decision | Option A | Option B | Choice | Reason |
|----------|----------|----------|--------|--------|
| Auth | Required | Optional | **Optional** | Giảm friction, users có thể xem ngay |
| Styling | StyleSheet only | NativeWind | **NativeWind** | Dev speed cao hơn, Tailwind familiar |
| State | Redux | Zustand | **Zustand** | Nhẹ hơn, less boilerplate |
| Video | expo-av | expo-video | **expo-video** | Mới hơn, SDK 54+ recommended |
| Storage | AsyncStorage | MMKV | **AsyncStorage** | Đơn giản, đủ cho MVP |
| Data source | TMDB | Nguồn C | **Nguồn C** | Free, Vietnamese content focus |

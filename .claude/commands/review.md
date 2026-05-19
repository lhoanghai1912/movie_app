---
description: "Review code React Native: quality, security, pattern compliance, performance. Dùng sau khi implement xong."
allowed-tools: ["Read", "Glob", "Grep", "Bash"]
---

Bạn là Senior React Native Developer. Review code đã thay đổi theo checklist bên dưới.

**Target:** $ARGUMENTS
(Nếu không có argument → review tất cả thay đổi chưa commit: `git diff HEAD`)

---

## BƯỚC 1 — Thu thập code cần review

```bash
git diff --name-only HEAD
```

Đọc từng file thay đổi với Read tool. Với file > 100 dòng, đọc đủ để hiểu context.

---

## BƯỚC 2 — Áp dụng checklist

### 🔴 TypeScript & Types (CRITICAL)
- [ ] Không dùng `any` — dùng `unknown` rồi narrow type
- [ ] Props có `interface`/`type` rõ ràng, destructured trong function signature
- [ ] Optional chaining `?.` và nullish coalescing `??` đúng chỗ (API data, route.params)
- [ ] Return type explicit cho exported functions

### 🔴 Redux & Thunks (CRITICAL)
- [ ] Thunk trả về `{ status: true, data }` hoặc `{ status: false, error }` — không throw
- [ ] Component KHÔNG dùng try-catch — chỉ check `response.status`
- [ ] Không mutate state/array/object — dùng spread/map/filter
- [ ] Loading state reset ở cả success lẫn error path

### 🟠 React Native Patterns
- [ ] Functional component + hooks — không Class Component
- [ ] `StyleSheet.create` — không inline styles trừ giá trị động
- [ ] Màu từ `theme/index.ts` — không hardcode hex
- [ ] `ms()` cho horizontal/font, `vs()` cho vertical (từ `constant/scale`)
- [ ] FlatList cho list dài — không lồng FlatList trong ScrollView
- [ ] `keyExtractor` có mặt trong mọi FlatList
- [ ] Handler functions: `useCallback` để tránh re-render

### 🟠 Error Handling
- [ ] API error: Toast hiển thị message từ server response
- [ ] Loading indicator (`ActivityIndicator`) cho mọi async operation
- [ ] Không silent swallow errors (empty catch block)

### 🟡 Navigation
- [ ] `createNativeStackNavigator` — không `createStackNavigator`
- [ ] List screens có `useFocusEffect` auto-refresh khi navigate back
- [ ] `animation: 'slide_from_right'` trong screenOptions

### 🟡 Security
- [ ] Không hardcode secrets, API keys, passwords
- [ ] Không `console.log` sensitive data (token, credentials)
- [ ] Input validate trước khi gửi API

### 🟢 Code Quality
- [ ] File < 800 dòng — đề xuất tách nếu lớn hơn
- [ ] Function < 50 dòng — đề xuất tách nếu lớn hơn
- [ ] Không deep nesting (> 4 levels) — dùng early return
- [ ] Không magic numbers — dùng named constants

---

## BƯỚC 3 — Báo cáo

Format mỗi vấn đề:
```
[CRITICAL/HIGH/MEDIUM/LOW] File: src/xxx.tsx:42
Vấn đề: [mô tả ngắn gọn]
Fix: [code snippet hoặc hướng dẫn cụ thể]
```

Kết thúc bằng tổng kết: `X vấn đề (Y critical, Z high, ...)`. Nếu 0 vấn đề: confirm "Code đạt chuẩn."

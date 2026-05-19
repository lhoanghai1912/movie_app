---
description: "Refactor code: xóa dead code, chuẩn hóa patterns, giảm duplication. KHÔNG thay đổi logic/behavior."
allowed-tools: ["Read", "Glob", "Grep", "Bash", "Edit"]
---

Bạn là Senior React Native Developer. Refactor file/code được chỉ định. **KHÔNG thay đổi logic hay behavior — chỉ restructure.**

**Target:** $ARGUMENTS
(Nếu không có argument → refactor tất cả files đã thay đổi: `git diff --name-only HEAD`)

---

## NGUYÊN TẮC TRƯỚC KHI BẮT ĐẦU

- **Surgical changes**: Chỉ touch những gì được yêu cầu. Không "cải thiện" code liền kề.
- **Không speculative**: Không thêm abstraction chưa cần thiết.
- **Verify**: 0 TypeScript errors sau refactor.

---

## CHECKLIST REFACTOR

### 1. Dead Code (xóa ngay)
- [ ] `console.log` và debug statements
- [ ] Import không được dùng (IDE thường highlight)
- [ ] Variables/functions không được reference ở đâu
- [ ] Commented-out code cũ (> 1 tuần)

### 2. Duplication (DRY)
- [ ] Logic lặp lại ≥ 3 lần → extract thành helper/hook
- [ ] Styles giống nhau ở nhiều nơi → shared constant
- [ ] Component quá lớn (> 200 dòng render) → tách sub-component

### 3. Pattern Compliance (chuẩn hóa)
- [ ] Thunk: `{ status, data/error }` — không try-catch trong component
- [ ] `StyleSheet.create` — không inline styles (trừ giá trị động)
- [ ] Màu từ `colors` (theme) — không hardcode `'#...'`
- [ ] Dimension: `ms()` / `vs()` — không hardcode pixel số
- [ ] Không `any` — narrow type đúng cách

### 4. Readability
- [ ] Function > 50 dòng → tách logic thành sub-function hoặc hook
- [ ] Naming: `handleXxx` cho event handlers, `isXxx`/`hasXxx` cho boolean
- [ ] Deep nesting (> 4 levels) → early return hoặc extract

### 5. Performance (chỉ khi rõ ràng cần)
- [ ] Inline arrow function trong render → `useCallback`
- [ ] Expensive calculation → `useMemo`
- [ ] FlatList: có `keyExtractor` + không tạo new object trong `renderItem`

---

## OUTPUT FORMAT

Với mỗi thay đổi:
```
📁 File: src/xxx.tsx
✂️  Xóa: [mô tả những gì bị xóa]
♻️  Chuẩn hóa: [mô tả thay đổi pattern]
🔀 Tách: [component/function mới được tách ra]
```

Kết thúc: chạy `npx tsc --noEmit` và báo cáo kết quả.

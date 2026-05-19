---
description: 'Refactor code: loại bỏ dead code, chuẩn hóa patterns, giảm duplication trong HaiAu CRM. Dùng khi cần cleanup sau khi implement xong.'
---

Bạn là Senior React Native Developer. Refactor code/file được chỉ định theo tiêu chuẩn HaiAu CRM:

**Target:** $input

## CHECKLIST REFACTOR

### 1. Dead Code

- [ ] Xóa `console.log` và debug statements
- [ ] Xóa import không dùng
- [ ] Xóa variables/functions không được reference
- [ ] Xóa commented-out code cũ

### 2. Duplication (DRY)

- [ ] Extract logic lặp lại thành helper/hook
- [ ] Merge styles tương tự vào shared constant
- [ ] Tách component quá lớn (> 200 lines) thành sub-components

### 3. Pattern Compliance

- [ ] Thunk: `{ status, data/error }` — không try-catch trong component
- [ ] StyleSheet.create — không inline styles (trừ dynamic values)
- [ ] Màu từ `colors` (theme) — không hardcode
- [ ] Dimension: `ms()` / `vs()` — không hardcode px
- [ ] Không `any` — narrow type đúng cách

### 4. Readability

- [ ] Function < 50 dòng — tách nếu lớn hơn
- [ ] Naming rõ nghĩa: `handleXxx` cho handlers, `isXxx`/`hasXxx` cho boolean
- [ ] Early return để giảm nesting

### 5. Performance

- [ ] Handler functions: wrap `useCallback` để tránh re-render
- [ ] Expensive calculations: wrap `useMemo`
- [ ] FlatList: đảm bảo `keyExtractor` và không tạo inline functions

## OUTPUT

- Liệt kê thay đổi thực hiện
- Giải thích ngắn lý do từng thay đổi
- KHÔNG thay đổi logic/behavior — chỉ restructure
- Verify 0 TypeScript errors sau refactor

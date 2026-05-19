---
description: "Workflow đầy đủ để implement một feature mới: explore → plan → implement → review. Dùng khi bắt đầu task mới."
allowed-tools: ["Read", "Glob", "Grep", "Bash", "Edit", "Write"]
---

Bạn là Senior React Native Engineer. Thực hiện feature development theo 6 phases. Sau mỗi phase quan trọng: **DỪNG LẠI và hỏi user trước khi tiếp tục.**

**Feature request:** $ARGUMENTS

---

## PHASE 1 — Discovery (Explore)

Đọc yêu cầu cẩn thận. Nếu yêu cầu mơ hồ → hỏi clarification trước.

Khám phá codebase:
- Tìm feature tương tự đã có (pattern reference)
- Kiểm tra types, services, store, container liên quan
- Trace execution path của feature gần nhất

Dùng Glob/Grep để tìm. Không đoán mò.

---

## PHASE 2 — Architecture Design

Thiết kế blueprint theo layered architecture của dự án:

```
Types (src/types/) → Service (src/services/) → Thunk (src/store/) → UI (src/container/)
```

Xuất file matrix:
| Layer | File | Thay đổi |
|-------|------|----------|
| Types | src/types/xxx.ts | Interface mới |
| Service | src/services/xxx.ts | API methods |
| Store | src/store/xxx/thunk.ts | Async actions |
| UI | src/container/Xxx/ | Screens |
| Nav | src/navigators/ | Đăng ký screen |

**DỪNG** — Hỏi: *"Architecture này có phù hợp không? Bắt đầu implement không?"*

---

## PHASE 3 — Implementation (chỉ sau khi user confirm)

Implement theo thứ tự: **Types → Service → Thunk → UI**

### 3a. Types (`src/types/`)
```typescript
// SAP B1 fields dùng PascalCase
export interface XxxItem {
  DocEntry?: number | null;
  DocNum?: string | null;
  // ...
}
export interface XxxListParams { page?: number; pageSize?: number; search?: string; }
```

### 3b. Service (`src/services/xxx.ts`)
```typescript
// Không try-catch — để thunk xử lý
import { apiBearer } from 'utils/apiBearer';
const XxxServices = {
  getList: (params: XxxListParams) => apiBearer.get('Xxx/GetList', { params }),
  getDetail: (id: number) => apiBearer.get(`Xxx/GetDetail/${id}`),
  create: (body: CreateXxxBody) => apiBearer.post('Xxx/Create', body),
  update: (id: number, body: CreateXxxBody) => apiBearer.put(`Xxx/Update/${id}`, body),
};
export default XxxServices;
```

### 3c. Thunk (`src/store/xxx/thunk.ts`)
```typescript
// Luôn return { status, data/error } — không throw
export const getXxxList = async (params: XxxListParams) => {
  try {
    const data = await XxxServices.getList(params);
    return { status: true, data };
  } catch (error) {
    return { status: false, error };
  }
};
```

### 3d. UI (`src/container/Xxx/`)
- `StyleSheet.create` — không inline styles
- Màu từ `theme/index.ts`, kích thước `ms()`/`vs()`
- FlatList cho danh sách, `keyExtractor` bắt buộc
- `useFocusEffect` để auto-refresh khi navigate back
- Loading: `ActivityIndicator` + Toast cho errors

### 3e. Navigation (nếu screen mới)
Thêm vào `screennames.ts` + `mainstack.tsx` (hoặc tab stack tương ứng trong `mytabs.tsx`)

---

## PHASE 4 — Quality Review

Tự review theo checklist rút gọn:
- [ ] 0 TypeScript errors (`npx tsc --noEmit`)
- [ ] Không `any`, không inline styles, không hardcode màu/size
- [ ] Thunk pattern `{ status, data/error }` đúng
- [ ] Loading + error states được handle
- [ ] File < 800 dòng, function < 50 dòng

---

## PHASE 5 — Summary

Báo cáo ngắn gọn:
- Files đã tạo/sửa (với đường dẫn)
- Cách test feature
- Những điểm cần chú ý hoặc follow-up

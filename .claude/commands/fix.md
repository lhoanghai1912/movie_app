---
description: "Fix TypeScript errors, Metro crash, import errors, type mismatches. Paste error message để fix nhanh."
allowed-tools: ["Read", "Glob", "Grep", "Bash", "Edit"]
---

Bạn là TypeScript expert. Fix toàn bộ build errors được cung cấp. **Fix root cause — không fix symptom.**

**Errors:** $ARGUMENTS

(Nếu không có argument → chạy `npx tsc --noEmit` để lấy danh sách lỗi hiện tại)

---

## BƯỚC 1 — Chẩn đoán

Với mỗi error, đọc: **file + line + error code + message**.

Priority fix:
1. 🔴 Import errors (TS2307) — module không tồn tại
2. 🔴 Type mismatch trên required fields (TS2322, TS2345)
3. 🟠 Possibly null/undefined (TS2532, TS18047)
4. 🟡 Missing interface properties (TS2339)
5. 🟢 Implicit `any` (TS7006)

---

## BƯỚC 2 — Fix theo loại lỗi

### TS2307 — Import không tồn tại
```typescript
// ❌ Sai path — kiểm tra tsconfig.json paths và babel alias
import { Foo } from 'components/Foo';   // 'components' không tồn tại
// ✅ Đúng — src/ là root
import { Foo } from 'component/Foo';
```

### TS2322 / TS2345 — Type mismatch
```typescript
// ❌ string vào number field
const id: number = route.params?.id;
// ✅ Parse đúng type
const id: number = parseInt(route.params?.id ?? '0', 10);
```

### TS2532 / TS18047 — Possibly null/undefined
```typescript
// ❌ Không check
const name = data.user.name;
// ✅ Optional chain + fallback
const name = data?.user?.name ?? '';
```

### TS2339 — Property không tồn tại
```typescript
// ❌ Access property chưa có trong type
(response.data as any).nonExistent;
// ✅ Kiểm tra interface, thêm property hoặc cast đúng
const typed = response.data as ExpectedType;
```

### TS7006 — Implicit any
```typescript
// ❌ Không type parameter
function handler(e) { ... }
// ✅ Type đầy đủ
function handler(e: GestureResponderEvent) { ... }
```

---

## BƯỚC 3 — Project-specific quirks

| Tình huống | Cách xử lý |
|-----------|-----------|
| Parse API response | `JSON.parse(response?.data?.data)` — luôn optional chain |
| Thunk result | `{ status: boolean, data?: any, error?: any }` |
| Navigation props | `navigation: any` là acceptable |
| Route params optional | `route.params?.paramName` trừ khi type declared |
| Import màu/size | Từ `theme` và `constant/scale` — không hardcode |

---

## BƯỚC 4 — Verify

Sau khi fix tất cả:
```bash
npx tsc --noEmit
```

Nếu còn lỗi → tiếp tục fix. Nếu 0 lỗi → báo cáo "Build clean ✓".

---

## Output format

Với mỗi fix:
- **File:** `src/xxx.tsx:42`
- **Lỗi:** [error code + mô tả]
- **Fix:** [code trước → sau]
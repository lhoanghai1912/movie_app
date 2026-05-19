---
description: 'Fix TypeScript errors, Metro bundler crash, import errors, type mismatches trong HaiAu CRM. Paste error message để fix.'
---

Bạn là TypeScript expert. Fix toàn bộ build errors được cung cấp:

**Errors:** $input

## QUY TRÌNH

### 1. Chẩn đoán mỗi error

- Đọc: file path + line number + error code (TS2322, TS2345...) + message
- Tìm root cause (không fix symptom)

### 2. Fix theo priority

1. 🔴 Import errors (module không tồn tại)
2. 🔴 Type mismatch trên required fields
3. 🟠 Possibly null/undefined access
4. 🟡 Missing interface properties
5. 🟢 Implicit `any`

### 3. Project-specific rules

- API response parse: `JSON.parse(response?.data?.data)` — luôn optional chain
- Thunk result: `{ status: boolean, data?: any, error?: any }`
- Màu/spacing: import từ `theme` và `constant/scale` — không hardcode
- `navigation: any` là acceptable cho screen props
- Styles: `ms()` horizontal, `vs()` vertical

### 4. Verify

Sau khi fix: check lại bằng `get_errors` để đảm bảo 0 errors còn lại.

### 5. Output format

Với mỗi fix, giải thích ngắn gọn: **Vấn đề** → **Giải pháp** → **Code đã sửa**.

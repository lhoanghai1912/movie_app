---
description: "Lên kế hoạch implementation cho feature/task mới. Explore codebase → tạo checklist → xác định files bị ảnh hưởng. KHÔNG sinh code."
allowed-tools: ["Read", "Glob", "Grep", "Bash"]
---

Bạn là Senior React Native Architect. Nhiệm vụ: phân tích yêu cầu và tạo implementation plan. **KHÔNG sinh code trong bước này.**

**Yêu cầu:** $ARGUMENTS

---

## BƯỚC 1 — Explore codebase

Trước khi lên kế hoạch, khám phá patterns hiện tại:

1. Tìm feature tương tự đã có (container, store, services, types)
2. Kiểm tra naming conventions đang dùng
3. Xác định các dependencies và integration points

Dùng Glob/Grep để tìm code liên quan trước khi đưa ra kế hoạch.

---

## BƯỚC 2 — Xuất kế hoạch theo format sau

```
## Phân tích yêu cầu
[Tóm tắt ngắn: cần làm gì, tại sao, phạm vi thay đổi]

## Files bị ảnh hưởng
| File | Loại thay đổi | Lý do |
|------|--------------|-------|
| src/types/xxx.ts | Tạo mới | Interface cho API response |
| src/services/xxx.ts | Tạo mới | API calls |
| src/store/xxx/thunk.ts | Tạo mới | Async thunk actions |
| src/store/xxx/index.tsx | Tạo mới | Redux slice |
| src/container/Xxx/ | Tạo mới | UI screens |
| src/navigators/mainstack.tsx | Cập nhật | Register screen mới |
| src/navigators/screennames.ts | Cập nhật | Thêm SCREEN_NAME constant |

## Checklist thực thi (theo thứ tự)
- [ ] 1. Định nghĩa types/interfaces (src/types/)
- [ ] 2. Service layer — API calls (src/services/)
- [ ] 3. Thunk actions (src/store/xxx/thunk.ts)
- [ ] 4. Redux slice nếu cần state (src/store/xxx/index.tsx)
- [ ] 5. UI/Container screens (src/container/)
- [ ] 6. Navigation nếu là screen mới (screennames.ts + mainstack.tsx)
- [ ] 7. Kiểm tra 0 TypeScript errors (npx tsc --noEmit)

## Patterns cần tuân theo
[Các patterns liên quan tìm thấy trong codebase — link đến file cụ thể]

## Rủi ro & lưu ý
- [Breaking changes?]
- [Dependencies cần update?]
- [Edge cases quan trọng?]
- [Files nào KHÔNG nên đụng vào?]
```

---

## BƯỚC 3 — Confirm

Sau khi xuất kế hoạch: **DỪNG LẠI**.

Hỏi: *"Kế hoạch trên có đúng yêu cầu không? Bạn muốn bắt đầu Bước 1 (types) không?"*

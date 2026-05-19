---
description: 'Lên kế hoạch implementation cho feature/task mới trong HaiAu CRM. Phân tích yêu cầu → checklist → files bị ảnh hưởng. KHÔNG sinh code.'
---

Bạn là Senior React Native Architect. Phân tích yêu cầu sau và tạo implementation plan:

**Yêu cầu:** $input

## QUY TRÌNH

### 1. Explore codebase

- Tìm patterns tương tự đã có trong project
- Xác định files cần sửa/tạo mới

### 2. Xuất kế hoạch

```
## Phân tích
[Tóm tắt ngắn gọn]

## Files bị ảnh hưởng
| File | Thay đổi |
|------|----------|
| src/types/... | Thêm interface mới |
| src/services/... | Thêm API calls |
| src/store/.../thunk.ts | Thêm thunk actions |
| src/container/... | UI implementation |
| src/navigators/... | Register screen (nếu cần) |

## Checklist (thứ tự thực thi)
- [ ] 1. Types & interfaces (src/types/)
- [ ] 2. Service layer (src/services/)
- [ ] 3. Thunk actions (src/store/)
- [ ] 4. Redux slice (nếu cần state)
- [ ] 5. UI / Container
- [ ] 6. Navigation (nếu screen mới)
- [ ] 7. Verify TypeScript 0 errors

## Rủi ro
- [Breaking changes?]
- [Dependencies?]
- [Edge cases?]
```

### 3. Confirm

Sau khi xuất kế hoạch: **DỪNG LẠI**, hỏi user "Bạn muốn bắt đầu Bước 1 không?"

**KHÔNG sinh code trong bước này.**

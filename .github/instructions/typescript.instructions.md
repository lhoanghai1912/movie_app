# Hướng dẫn dành cho GitHub Copilot — Dự án HaiAu CRM

## Nguyên tắc cốt lõi

1. **Plan Before Execute** — Luôn lập kế hoạch trước khi sinh code
2. **Immutability** — KHÔNG BAO GIỜ mutate object/array. Luôn trả về bản copy mới
3. **Security-First** — Không hardcode secrets, validate mọi input
4. **Test-Aware** — Viết code dễ test, tách logic khỏi UI

---

## Workflow bắt buộc

> Copilot PHẢI đóng vai Senior Engineer có tư duy lập kế hoạch, KHÔNG sinh code ngay.

**BƯỚC 1: LẬP KẾ HOẠCH (PLAN)**

1. Phân tích yêu cầu.
2. Xuất kế hoạch dạng Checklist (`[ ]`).
3. Liệt kê rõ file bị ảnh hưởng.
4. **DỪNG LẠI.** Hỏi user: _"Đây là kế hoạch. Bạn muốn bắt đầu thực thi Bước 1 không?"_
5. **KHÔNG sinh code trong bước này.**

**BƯỚC 2: THỰC THI (EXECUTE)**

1. Chỉ sinh code khi user đồng ý.
2. Code tuân thủ các tiêu chuẩn bên dưới.
3. Xong mỗi bước → đánh dấu `[x]`, hỏi tiếp.

---

## Bối cảnh dự án

- **Loại:** Mobile App — React Native
- **Mục đích:** CRM / Quản lý dịch vụ (Service & Appointment Management)
- **Ngôn ngữ chính:** TypeScript (Strict mode)
- **UI Language:** Tiếng Việt bắt buộc cho mọi text hiển thị
- **State Management:** Redux + Async Thunks
- **Navigation:** `@react-navigation/native-stack` (`createNativeStackNavigator`)
- **API Layer:** Axios với Bearer token + auto-refresh interceptor (`utils/apiBearer.tsx`)

---

## Tiêu chuẩn Coding

### 1. Component (React Native)

- Bắt buộc Functional Components + Hooks. KHÔNG dùng Class Components.
- Component nhỏ, tái sử dụng cao. Composition over inheritance.
- Luôn định nghĩa `interface` hoặc `type` cho Props. Destructure props.

### 2. Immutability (CRITICAL)

- KHÔNG BAO GIỜ mutate trực tiếp object/array.
- Luôn dùng spread `...`, `.map()`, `.filter()` để tạo bản copy mới.
- Dùng `Readonly<T>` cho tham số hàm khi cần thiết.

### 3. Types & Interfaces

- Dùng `interface` cho object shapes. Dùng `type` cho unions/intersections.
- Ưu tiên string literal unions thay vì `enum`.
- KHÔNG dùng `any`. Dùng `unknown` cho dữ liệu external rồi narrow type.
- Luôn có explicit return type cho exported functions.

### 4. Styling

- Bắt buộc `StyleSheet.create`. KHÔNG inline styles trừ khi có tham số động.
- Tái sử dụng biến màu từ theme (`src/theme/index.ts`). Không hardcode mã màu.

### 5. Error Handling (Base Pattern)

Thunks trả về `{ status: true, data }` hoặc `{ status: false, error }`:

```typescript
// Trong component — KHÔNG dùng try-catch:
const response = await dispatch(someThunk(params)).unwrap();
if (response.status) {
  const data = JSON.parse(response?.data?.data);
  // Xử lý thành công
} else {
  const errorData = JSON.parse((response?.error as any).data);
  Toast.show(errorData?.error?.message?.value || 'Có lỗi xảy ra', {
    duration: 3000,
  });
}
```

### 6. Navigation

- Dùng `createNativeStackNavigator` với `animation: 'slide_from_right'`.
- Auto-refresh danh sách khi quay lại: `useFocusEffect` + `isMountedRef` pattern.
- KHÔNG dùng `createStackNavigator` (JS stack) — chỉ dùng Native Stack.

### 7. API & Data

- Xử lý `loading` và `error` (hiển thị `ActivityIndicator` và `Toast`).
- Luôn dùng Optional Chaining `?.` và Nullish Coalescing `??`.
- Danh sách dài phải dùng `<FlatList>` với `keyExtractor`. KHÔNG lồng `FlatList` vào `ScrollView`.

### 8. File Organization

- Mỗi file < 800 dòng. Mỗi function < 50 dòng.
- Tổ chức theo feature/domain, không theo type.
- Tránh nesting > 4 levels. Ưu tiên early return.

### 9. Git Commits

Format: `<type>: <description>`

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`

---

## Anti-patterns (Bị cấm)

1. **Không dùng `any`** — Dùng `unknown` rồi narrow type.
2. **Không `console.log` lên production** — Xóa hoặc comment trước khi commit.
3. **Không tự ý thay đổi file ngoài phạm vi yêu cầu.**
4. **Không hardcode secrets** (API keys, tokens, passwords) — Dùng environment variables.
5. **Không dùng magic numbers** — Dùng named constants.
6. **Không silently swallow errors** — Mọi error phải được xử lý hoặc log.

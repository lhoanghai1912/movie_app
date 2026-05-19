---
name: error-handling
description: 'Error handling base pattern cho dự án HaiAu. Use when: xử lý response từ API, thunk error handling, hiển thị Toast lỗi, tạo mới thunk async, refactor try-catch sang base pattern.'
---

# Error Handling Base Pattern

## When to Use

- Tạo mới hoặc sửa thunk async
- Xử lý response API trong component
- Hiển thị thông báo lỗi/thành công cho user
- Refactor try-catch sang base pattern chuẩn

## Kiến trúc

```
Component → dispatch(thunk) → Service (Axios) → API
                ↓
        { status: true, data } hoặc { status: false, error }
                ↓
        Component xử lý UI (Toast, navigation, setState)
```

## 1. Service Layer

Service gọi API và **return response trực tiếp**, không try-catch:

```typescript
// src/services/example.ts
static async getList(params: ListParams): Promise<AxiosResponse> {
  return apiBearer.get('/endpoint', { params });
}

static async create(body: CreateBody): Promise<AxiosResponse> {
  return apiBearer.post('/endpoint', body);
}
```

## 2. Thunk Layer

Thunk bọc try-catch và trả về object chuẩn:

```typescript
// src/store/module/thunk.ts
export const createItem = createAsyncThunk(
  'module/createItem',
  async (body: CreateBody, { rejectWithValue }) => {
    try {
      const response = await ModuleService.create(body);
      return { status: true, data: response.data };
    } catch (error) {
      return { status: false, error };
    }
  },
);
```

## 3. Component Layer

Component **KHÔNG dùng try-catch**. Kiểm tra `response.status`:

```typescript
// ĐÚNG — Base Pattern
const handleSubmit = async () => {
  setLoading(true);
  const response = await dispatch(createItem(body)).unwrap();
  if (response.status) {
    const data = JSON.parse(response?.data?.data);
    Toast.show('Thành công', { duration: 2000 });
    navigation.goBack();
  } else {
    const errorData = JSON.parse((response?.error as any).data);
    Toast.show(errorData?.error?.message?.value || 'Có lỗi xảy ra', {
      duration: 3000,
    });
  }
  setLoading(false);
};
```

```typescript
// SAI — Không dùng pattern này
const handleSubmit = async () => {
  try {
    const response = await SomeService.create(body);
    // ...
  } catch (error) {
    // ...
  }
};
```

## 4. Loading State

Luôn quản lý loading để disable nút submit:

```typescript
const [loading, setLoading] = useState(false);

const handleSave = async () => {
  setLoading(true);
  // ... gọi thunk
  setLoading(false); // Luôn clear loading, cả success lẫn error
};

// Trong JSX:
<TouchableOpacity onPress={handleSave} disabled={loading}>
  {loading ? <ActivityIndicator /> : <Text>Lưu</Text>}
</TouchableOpacity>;
```

## Quy tắc quan trọng

- **Service**: Return response, không try-catch
- **Thunk**: try-catch, return `{ status, data/error }`
- **Component**: Check `response.status`, không try-catch
- **Loading**: Luôn set `false` sau khi hoàn tất (cả success và error)
- **Toast**: Hiển thị message từ server nếu có, fallback "Có lỗi xảy ra"

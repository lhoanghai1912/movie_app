---
applyTo: 'src/store/**'
---

# Redux Store Patterns — HaiAu CRM

## Thunk Standard

Mọi thunk PHẢI trả về `{ status: boolean, data?, error? }`:

```typescript
export const fetchItems = createAsyncThunk(
  'module/fetchItems',
  async (params: Params, { rejectWithValue }) => {
    try {
      const response = await ModuleService.getList(params);
      return { status: true, data: response.data };
    } catch (error) {
      return { status: false, error };
    }
  },
);
```

## KHÔNG dùng rejectWithValue

Thunk trong project này KHÔNG throw — luôn return object. `rejectWithValue` chỉ giữ cho type signature.

## Slice Structure

```typescript
// store/module/index.tsx
interface ModuleState {
  list: ModuleItem[];
  detail: ModuleItem | null;
  loading: boolean;
  totalRecord: number;
}

const initialState: ModuleState = {
  list: [],
  detail: null,
  loading: false,
  totalRecord: 0,
};
```

## Component Usage

```typescript
// KHÔNG try-catch trong component
const response = await dispatch(fetchItems(params)).unwrap();
if (response.status) {
  const parsed = JSON.parse(response?.data?.data);
  // handle success
} else {
  const errorData = JSON.parse((response?.error as any).data);
  Toast.show(errorData?.error?.message?.value || 'Có lỗi xảy ra', {
    duration: 3000,
  });
}
```

## Naming Convention

- Thunk functions: `getXxx`, `createXxx`, `updateXxx`, `deleteXxx`
- Action types: `'module/actionName'` (snake_case module, camelCase action)
- File: `thunk.ts` cho async thunks, `index.tsx` cho slice

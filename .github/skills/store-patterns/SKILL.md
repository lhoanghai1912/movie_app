---
name: store-patterns
description: >
  Redux store patterns cho HaiAu CRM. Use when: tạo mới Redux slice, viết thunk actions,
  thiết kế state structure, tích hợp API, xử lý pagination trong store.
---

# Store Patterns — HaiAu CRM

## When to Use

- Tạo mới Redux module (folder `store/moduleName/`)
- Thêm thunk actions cho API call mới
- Thiết kế state structure cho feature mới
- Xử lý pagination, filtering trong store

## Full Module Template

### Folder structure

```
src/store/moduleName/
  index.tsx    ← slice + reducer
  thunk.ts     ← async actions
```

### 1. Types trước (src/types/moduleName.ts)

```typescript
export interface ModuleItem {
  docEntry?: number | null;
  docNum?: string | null;
  cardName?: string | null;
  status?: string | null;
  // ... SAP B1 fields
}

export interface ModuleListParams {
  page?: number;
  pageSize?: number;
  search?: string;
}
```

### 2. Thunk (src/store/moduleName/thunk.ts)

```typescript
import { createAsyncThunk } from '@reduxjs/toolkit';
import ModuleService from 'services/module';
import { ModuleListParams } from 'types/module';

export const getModuleList = createAsyncThunk(
  'module/getList',
  async (params: ModuleListParams) => {
    try {
      const response = await ModuleService.getList(params);
      return { status: true, data: response.data };
    } catch (error) {
      return { status: false, error };
    }
  },
);
```

### 3. Slice (src/store/moduleName/index.tsx)

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModuleItem } from 'types/module';
import { getModuleList } from './thunk';

interface ModuleState {
  list: ModuleItem[];
  loading: boolean;
  totalRecord: number;
  currentPage: number;
}

const initialState: ModuleState = {
  list: [],
  loading: false,
  totalRecord: 0,
  currentPage: 1,
};

const moduleSlice = createSlice({
  name: 'module',
  initialState,
  reducers: {
    resetModule: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getModuleList.pending, state => {
        state.loading = true;
      })
      .addCase(getModuleList.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.status) {
          const raw = action.payload.data?.data;
          const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
          state.list = parsed?.data ?? [];
          state.totalRecord = parsed?.totalRecord ?? 0;
        }
      })
      .addCase(getModuleList.rejected, state => {
        state.loading = false;
      });
  },
});

export const { resetModule } = moduleSlice.actions;
export default moduleSlice.reducer;
```

### 4. Register trong root store (src/store/index.tsx)

```typescript
import moduleReducer from './moduleName';
// Thêm vào reducer object
```

## Pagination Pattern trong Component

```typescript
const PAGE_SIZE = 20;
const [data, setData] = useState<ModuleItem[]>([]);
const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);
const [isLoadingMore, setIsLoadingMore] = useState(false);

const loadMore = async () => {
  if (!hasMore || isLoadingMore) return;
  setIsLoadingMore(true);
  const nextPage = page + 1;
  const response = await dispatch(
    getModuleList({ page: nextPage, pageSize: PAGE_SIZE }),
  ).unwrap();
  if (response.status) {
    const parsed = JSON.parse(response?.data?.data);
    setData(prev => [...prev, ...(parsed?.data ?? [])]);
    setHasMore(nextPage < (parsed?.totalPage ?? 1));
    setPage(nextPage);
  }
  setIsLoadingMore(false);
};
```

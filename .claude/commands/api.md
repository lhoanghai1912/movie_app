---
description: "Thiết kế types + service + thunk cho API endpoint mới. Nhập tên module hoặc mô tả API cần integrate."
allowed-tools: ["Read", "Glob", "Grep", "Bash", "Write"]
---

Bạn là API integration specialist. Thiết kế type-safe service + thunk layer cho SAP B1 API.

**Module/API cần thiết kế:** $ARGUMENTS

---

## BƯỚC 1 — Khám phá context

1. Tìm service tương tự đã có để dùng làm pattern reference:
   ```
   Glob: src/services/*.ts
   ```
2. Đọc 1-2 service hiện có để hiểu conventions
3. Kiểm tra types đã có trong `src/types/`

---

## BƯỚC 2 — Tạo theo template

### `src/types/xxx.ts`

```typescript
// SAP B1 fields: PascalCase (DocEntry, CardCode...)
export interface XxxItem {
  DocEntry?: number | null;
  DocNum?: string | null;
  CardName?: string | null;
  Status?: string | null;
  // Thêm fields từ API response
}

export interface CreateXxxBody {
  field1: string;
  field2: number;
}

export interface XxxListParams {
  Page?: number;
  PageSize?: number;
  search?: string;
  Filter?: string;
  fromDate?: string;
  toDate?: string;
}

// Paginated response (nếu API trả về list)
export interface XxxListResponse {
  data: XxxItem[];
  totalRecord: number;
  totalPage: number;
}
```

### `src/services/xxx.ts`

```typescript
import { apiBearer } from 'utils/apiBearer';

// Không try-catch — để thunk xử lý errors
const XxxServices = {
  getList: (params: XxxListParams) =>
    apiBearer.get('Xxx/GetList', { params }),

  getDetail: (id: number) =>
    apiBearer.get(`Xxx/GetDetail/${id}`),

  create: (body: CreateXxxBody) =>
    apiBearer.post('Xxx/Create', body),

  update: (id: number, body: Partial<CreateXxxBody>) =>
    apiBearer.put(`Xxx/Update/${id}`, body),

  delete: (id: number) =>
    apiBearer.delete(`Xxx/Delete/${id}`),
};

export default XxxServices;
```

### `src/store/xxx/thunk.ts`

```typescript
import XxxServices from 'services/xxx';
import { XxxListParams, CreateXxxBody } from 'types/xxx';

// Luôn return { status, data/error } — không throw
export const getXxxList = async (params: XxxListParams) => {
  try {
    const data = await XxxServices.getList(params);
    return { status: true, data };
  } catch (error) {
    return { status: false, error };
  }
};

export const getXxxDetail = async (id: number) => {
  try {
    const data = await XxxServices.getDetail(id);
    return { status: true, data };
  } catch (error) {
    return { status: false, error };
  }
};

export const createXxx = async (body: CreateXxxBody) => {
  try {
    const data = await XxxServices.create(body);
    return { status: true, data };
  } catch (error) {
    return { status: false, error };
  }
};

export const updateXxx = async (id: number, body: Partial<CreateXxxBody>) => {
  try {
    const data = await XxxServices.update(id, body);
    return { status: true, data };
  } catch (error) {
    return { status: false, error };
  }
};
```

---

## BƯỚC 3 — Response parsing reference

```typescript
// Trong component sau dispatch:
const response = await getXxxList(params);
if (response.status) {
  const raw = response?.data?.data;
  const parsed: XxxListResponse =
    typeof raw === 'string' ? JSON.parse(raw) : raw;
  setData(parsed.data);
  setTotal(parsed.totalRecord);
} else {
  const errData = JSON.parse((response?.error as any).data);
  Toast.show(errData?.error?.message?.value || 'Có lỗi xảy ra', { duration: 3000 });
}
```

---

## Output

1. File `src/types/xxx.ts` hoàn chỉnh
2. File `src/services/xxx.ts` hoàn chỉnh
3. File `src/store/xxx/thunk.ts` hoàn chỉnh
4. Ghi chú về API endpoint URL nếu cần điền vào

---
applyTo: 'src/services/**'
---

# Service Layer Patterns — HaiAu CRM

## Service Class Template

```typescript
import apiBearer from 'utils/apiBearer';
import { AxiosResponse } from 'axios';

export default class XxxService {
  static async getList(params: XxxListParams): Promise<AxiosResponse> {
    return apiBearer.get('/api/Xxx/GetList', { params });
  }
  static async getDetail(id: number): Promise<AxiosResponse> {
    return apiBearer.get(`/api/Xxx/GetDetail/${id}`);
  }
  static async create(body: CreateXxxBody): Promise<AxiosResponse> {
    return apiBearer.post('/api/Xxx/Create', body);
  }
  static async update(id: number, body: CreateXxxBody): Promise<AxiosResponse> {
    return apiBearer.put(`/api/Xxx/Update/${id}`, body);
  }
  static async delete(id: number): Promise<AxiosResponse> {
    return apiBearer.delete(`/api/Xxx/Delete/${id}`);
  }
}
```

## Rules

- Services KHÔNG có try-catch — để thunk xử lý
- Tham số query: truyền qua `{ params }` (GET) hoặc request body (POST/PUT)
- KHÔNG transform data trong service — return raw AxiosResponse
- Import `apiBearer` (có auto-refresh token), KHÔNG `api` (không có token)

## Response Structure từ SAP B1

```typescript
// response.data có dạng:
{
  data: string  // JSON string — cần JSON.parse()
}
// Sau khi parse:
{
  data: T | T[]
  totalRecord?: number
  totalPage?: number
}
```

## File naming

- `src/services/module.ts` — 1 file per domain (customer, activity, saleOrder...)
- Export default class: `CustomerService`, `ActivityService`...

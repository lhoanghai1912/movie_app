---
name: tdd-workflow
description: >
  TDD workflow đầy đủ cho HaiAu CRM (Jest + React Native Testing Library).
  Use when: viết test cho component mới, test hook, test thunk logic, TDD cho feature,
  kiểm tra coverage. SAY "viết test" hoặc "TDD" để kích hoạt.
---

# TDD Workflow — HaiAu CRM

## When to Use

- Tạo component/hook mới → viết test trước
- Fix bug → reproduce bằng test trước, rồi fix
- Verify logic trước khi integrate UI

## Workflow

```
RED   → viết test fail
GREEN → implement tối thiểu để pass
REFACTOR → cleanup, tests vẫn pass
```

## 1. Component Tests

```typescript
// __tests__/components/MyComponent.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import MyComponent from 'component/MyComponent';

describe('MyComponent', () => {
  it('renders title correctly', () => {
    render(<MyComponent title="Xin chào" />);
    expect(screen.getByText('Xin chào')).toBeTruthy();
  });

  it('calls onPress when button tapped', () => {
    const mockPress = jest.fn();
    render(<MyComponent title="Test" onPress={mockPress} />);
    fireEvent.press(screen.getByText('Xác nhận'));
    expect(mockPress).toHaveBeenCalledTimes(1);
  });

  it('shows loading indicator when isLoading=true', () => {
    render(<MyComponent title="Test" isLoading />);
    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('returns null when title is empty', () => {
    const { toJSON } = render(<MyComponent title="" />);
    expect(toJSON()).toBeNull();
  });
});
```

## 2. Custom Hook Tests

```typescript
// __tests__/hooks/useToggle.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useToggle } from 'hooks/useToggle';

describe('useToggle', () => {
  it('initializes with false', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it('toggles on call', () => {
    const { result } = renderHook(() => useToggle());
    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);
  });
});
```

## 3. Thunk Tests (Unit)

```typescript
// __tests__/store/customerThunk.test.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import CustomerService from 'services/customer';

jest.mock('services/customer');

describe('getCustomerList thunk', () => {
  it('returns status true on success', async () => {
    const mockData = { data: JSON.stringify({ data: [] }) };
    (CustomerService.getList as jest.Mock).mockResolvedValue({
      data: mockData,
    });

    const dispatch = jest.fn();
    const thunk = getCustomerList({ page: 1, pageSize: 20 });
    const result = await thunk(dispatch, () => ({}), undefined);

    expect(result.payload.status).toBe(true);
  });

  it('returns status false on error', async () => {
    (CustomerService.getList as jest.Mock).mockRejectedValue(
      new Error('Network'),
    );

    const dispatch = jest.fn();
    const thunk = getCustomerList({ page: 1, pageSize: 20 });
    const result = await thunk(dispatch, () => ({}), undefined);

    expect(result.payload.status).toBe(false);
  });
});
```

## 4. useValidate Hook (đã có sẵn)

```typescript
import { useValidate } from 'hooks/useValidate';

// Trong test cho form validation
const { result } = renderHook(() => useValidate());
act(() => result.current.validate({ field: '' }));
expect(result.current.errors.field).toBeDefined();
```

## Run Tests

```bash
# Chạy tất cả
npx jest

# Chạy file cụ thể
npx jest __tests__/components/MyComponent

# Watch mode
npx jest --watch

# Coverage report
npx jest --coverage
```

## Coverage Target

- Components: 70%+ coverage cho happy path + error states
- Hooks: 90%+ coverage
- Thunks: 80%+ (success + error paths)

## Anti-patterns

- ❌ Test implementation details (internal state) → test behavior/output
- ❌ Mock quá nhiều → test sẽ pass nhưng production fail
- ❌ Snapshot test cho complex UI → quá fragile
- ✅ Test user interactions: fireEvent.press, fireEvent.changeText
- ✅ Test từ user perspective: getByText, getByTestId

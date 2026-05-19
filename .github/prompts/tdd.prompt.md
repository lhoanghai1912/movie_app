---
description: 'Viết test theo TDD workflow cho React Native (Jest)'
agent: 'agent'
---

Thực hiện TDD workflow cho yêu cầu được cung cấp:

## Quy trình

### 1. RED — Viết test trước

- Viết test cases cho feature/bug
- Cover: happy path, edge cases, error scenarios
- Chạy test → phải FAIL

### 2. GREEN — Implementation tối thiểu

- Viết code vừa đủ để tests pass
- Không viết thêm logic chưa có test

### 3. REFACTOR — Cải thiện

- Loại bỏ duplication
- Cải thiện naming, readability
- Tests vẫn phải pass

## Test Patterns

### Component Test

```typescript
import { render, screen, fireEvent } from '@testing-library/react-native';

describe('MyComponent', () => {
  it('hiển thị đúng text', () => {
    render(<MyComponent title="Hello" />);
    expect(screen.getByText('Hello')).toBeTruthy();
  });

  it('gọi onPress khi nhấn button', () => {
    const onPress = jest.fn();
    render(<MyComponent onPress={onPress} />);
    fireEvent.press(screen.getByText('Submit'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
```

### Hook Test

```typescript
import { renderHook, act } from '@testing-library/react-hooks';

describe('useToggle', () => {
  it('toggles value', () => {
    const { result } = renderHook(() => useToggle(false));
    expect(result.current[0]).toBe(false);
    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);
  });
});
```

## Quy tắc

- Test user-visible behavior, không test implementation details
- Mỗi test độc lập — không phụ thuộc test khác
- Mock external dependencies (API, storage)
- Descriptive test names bằng tiếng Việt hoặc tiếng Anh

---
name: rn-frontend-patterns
description: 'React Native frontend patterns cho dự án HaiAu. Use when: tạo component mới, custom hooks, form handling, performance optimization, FlatList, modal, state management trong React Native.'
---

# React Native Frontend Patterns

## When to Use

- Tạo React Native components mới (composition, props, rendering)
- Viết custom hooks (state, async, debounce)
- Xử lý form (validation, controlled inputs)
- Tối ưu performance (memoization, FlatList)
- Quản lý state (useState, useReducer, Redux)

## Component Patterns

### Composition Over Inheritance

```typescript
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined';
}

export function Card({ children, variant = 'default' }: CardProps) {
  return <View style={[styles.card, styles[variant]]}>{children}</View>;
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <View style={styles.cardHeader}>{children}</View>;
}

// Usage
<Card>
  <CardHeader>
    <Text>Title</Text>
  </CardHeader>
</Card>;
```

### Props Pattern

```typescript
// Luôn định nghĩa interface cho Props
interface UserCardProps {
  user: User;
  onSelect: (id: string) => void;
  isActive?: boolean;
}

// Destructure props, default values
function UserCard({ user, onSelect, isActive = false }: UserCardProps) {
  return (
    <TouchableOpacity onPress={() => onSelect(user.id)}>
      <Text>{user.name}</Text>
    </TouchableOpacity>
  );
}
```

## Custom Hooks

### useToggle

```typescript
export function useToggle(initialValue = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle];
}
```

### useDebounce

```typescript
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Usage: search
const [query, setQuery] = useState('');
const debouncedQuery = useDebounce(query, 500);
useEffect(() => {
  if (debouncedQuery) performSearch(debouncedQuery);
}, [debouncedQuery]);
```

### useFocusRefresh (Pattern dự án)

```typescript
// Auto-refresh danh sách khi quay lại màn hình
const isMountedRef = useRef(false);

useFocusEffect(
  useCallback(() => {
    if (isMountedRef.current) {
      // Re-fetch data khi quay lại (không phải lần mount đầu)
      dispatch(fetchList({ page: 1 }));
    } else {
      isMountedRef.current = true;
    }
  }, []),
);
```

## Performance Optimization

### Memoization

```typescript
// useMemo cho expensive computations
const sortedList = useMemo(() => {
  return data.sort((a, b) => b.value - a.value);
}, [data]);

// useCallback cho functions truyền vào children
const handlePress = useCallback((id: string) => {
  setSelectedId(id);
}, []);

// React.memo cho pure components
export const ListItem = React.memo<ListItemProps>(({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item.id)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
});
```

### FlatList Best Practices

```typescript
<FlatList
  data={items}
  keyExtractor={item => item.id.toString()}
  renderItem={({ item }) => <ListItem item={item} onPress={handlePress} />}
  // Performance props
  removeClippedSubviews
  maxToRenderPerBatch={10}
  windowSize={5}
  // KHÔNG lồng FlatList vào ScrollView
/>
```

## Form Handling

```typescript
interface FormData {
  name: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
}

const [formData, setFormData] = useState<FormData>({ name: '', phone: '' });
const [errors, setErrors] = useState<FormErrors>({});

const validate = (): boolean => {
  const newErrors: FormErrors = {};
  if (!formData.name.trim()) newErrors.name = 'Tên là bắt buộc';
  if (!formData.phone.trim()) newErrors.phone = 'Số điện thoại là bắt buộc';
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  if (!validate()) return;
  setLoading(true);
  const response = await dispatch(createItem(formData)).unwrap();
  if (response.status) {
    Toast.show('Tạo thành công', { duration: 2000 });
    navigation.goBack();
  } else {
    const err = JSON.parse((response?.error as any).data);
    Toast.show(err?.error?.message?.value || 'Có lỗi xảy ra', {
      duration: 3000,
    });
  }
  setLoading(false);
};
```

## State Management (Redux Pattern)

```typescript
// Thunk trả về { status, data/error }
export const fetchItems = createAsyncThunk(
  'items/fetch',
  async (params, { rejectWithValue }) => {
    try {
      const response = await ItemService.getList(params);
      return { status: true, data: response.data };
    } catch (error) {
      return { status: false, error };
    }
  },
);
```

---
name: navigation-patterns
description: 'React Navigation patterns cho dự án HaiAu. Use when: tạo screen mới, cấu hình stack navigator, thêm tab, auto-refresh danh sách khi quay lại, navigate giữa các màn hình.'
---

# Navigation Patterns — HaiAu

## When to Use

- Tạo screen/stack navigator mới
- Cấu hình animation transition
- Auto-refresh danh sách khi quay lại từ detail/edit
- Navigate và truyền params giữa các screens

## Stack Navigator (Chuẩn dự án)

Luôn dùng `createNativeStackNavigator` (native), KHÔNG dùng `createStackNavigator` (JS):

```typescript
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right', // BẮT BUỘC
      }}
    >
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Create" component={CreateScreen} />
    </Stack.Navigator>
  );
}
```

## Auto-Refresh Pattern (useFocusEffect)

Khi user quay lại từ Detail/Edit, danh sách phải tự refresh:

```typescript
import { useFocusEffect } from '@react-navigation/native';

const isMountedRef = useRef(false);

useFocusEffect(
  useCallback(() => {
    if (isMountedRef.current) {
      // Chỉ refresh khi quay lại, không phải lần mount đầu
      setPage(1);
      dispatch(fetchList({ page: 1, ...filters }));
    } else {
      isMountedRef.current = true;
    }
  }, []),
);
```

**Quy tắc:**

- `isMountedRef` ngăn fetch trùng lần mount đầu tiên
- Luôn reset về page 1 khi refresh
- Áp dụng cho TẤT CẢ list screens (SaleOrder, Customers, Service, Manage/\*)

## Navigate & Params

```typescript
// Navigate tới detail
navigation.navigate('Detail', { docEntry: item.docEntry });

// Nhận params trong Detail screen
const { docEntry } = route.params as { docEntry: number };

// Quay lại
navigation.goBack();
```

## Screen Names (Convention)

Đặt tên screen theo `src/navigators/screennames.ts`:

```typescript
export const ScreenNames = {
  SaleOrderList: 'SaleOrderList',
  SaleOrderDetail: 'SaleOrderDetail',
  SaleOrderEdit: 'SaleOrderEdit',
  // ...
};
```

## Tab Navigator

```typescript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

// Mỗi tab chứa một NativeStack bên trong
<Tab.Screen name="Home" component={HomeStack} />
<Tab.Screen name="Customers" component={CustomersStack} />
```

## Checklist khi tạo screen mới

- [ ] Dùng `createNativeStackNavigator`, không dùng `createStackNavigator`
- [ ] Có `animation: 'slide_from_right'` trong `screenOptions`
- [ ] List screen có `useFocusEffect` + `isMountedRef` để auto-refresh
- [ ] Screen name được khai báo trong `screennames.ts`
- [ ] Params được type-safe (định nghĩa interface)

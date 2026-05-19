---
applyTo: 'src/component/**,src/container/**'
---

# Component Patterns — HaiAu CRM

## Structure chuẩn

```typescript
// 1. Imports — external libs trước, internal sau
import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ms, vs } from 'constant/scale';
import { colors } from 'theme';

// 2. Interface Props — luôn explicit
interface MyComponentProps {
  title: string;
  onPress?: () => void;
  isLoading?: boolean;
}

// 3. Component — functional, destructure props
const MyComponent = ({
  title,
  onPress,
  isLoading = false,
}: MyComponentProps) => {
  // Hooks ở đầu
  const [state, setState] = useState(false);

  // Handlers — useCallback để tránh re-render
  const handlePress = useCallback(() => {
    onPress?.();
  }, [onPress]);

  // Conditional render — early return
  if (!title) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

// 4. Styles — StyleSheet.create, dưới cùng
const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: ms(14),
    fontWeight: '600',
    color: colors.navy,
  },
});

export default MyComponent;
```

## Rules

- File < 800 dòng — tách component nếu lớn hơn
- Function < 50 dòng — tách handler hoặc sub-component
- Không lồng `FlatList` trong `ScrollView`
- `keyExtractor` bắt buộc cho FlatList: `keyExtractor={(item) => item.id.toString()}`
- Text hiển thị: Tiếng Việt
- Loading: `ActivityIndicator` với `colors.blue`
- Error: `Toast.show(message, { duration: 3000 })`

## Reusable components (đã có)

| Component            | Path                                               | Dùng cho                            |
| -------------------- | -------------------------------------------------- | ----------------------------------- |
| `HeaderChild`        | `component/HeaderChild`                            | Header screen con với back button   |
| `DetailHeaderCard`   | `component/DetailHeaderCard`                       | Header info card cho detail screens |
| `CollapsibleSection` | `container/Customers/Component/CollapsibleSection` | Accordion section                   |
| `ModalFilterCustom`  | `component/ModalFilterCustom`                      | Filter modal                        |
| `ModalMultiSelect`   | `component/ModalMultiSelect`                       | Multi-select modal                  |
| `SelectModal`        | `component/SelectModal`                            | Single select modal                 |
| `RemoveModal`        | `component/RemoveModal`                            | Confirm delete modal                |

## Không tái tạo component đã có — import và tái sử dụng

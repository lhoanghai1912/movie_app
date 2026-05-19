---
description: 'Review code React Native cho quality, security, và maintainability'
agent: 'agent'
---

Review code đã thay đổi theo checklist sau:

## Code Quality

- [ ] Functions < 50 dòng, files < 800 dòng
- [ ] Không deep nesting (> 4 levels)
- [ ] Naming rõ ràng, descriptive
- [ ] Không duplicate code — DRY
- [ ] Không magic numbers — dùng constants
- [ ] Không `any` — dùng proper types

## React Native Patterns

- [ ] Functional components + hooks (không class)
- [ ] Props có interface/type definition
- [ ] Immutability: không mutate state/props trực tiếp
- [ ] FlatList cho danh sách (không lồng trong ScrollView)
- [ ] StyleSheet.create (không inline styles)

## Error Handling

- [ ] Base pattern: thunk `{ status, data/error }`, không try-catch trong component
- [ ] Loading state được quản lý (set false cả success lẫn error)
- [ ] Toast hiển thị error message từ server

## Security

- [ ] Không hardcode secrets/API keys
- [ ] Input được validate trước khi gửi API
- [ ] Không console.log sensitive data
- [ ] Error messages không leak internal details

## Navigation

- [ ] Dùng `createNativeStackNavigator` (không `createStackNavigator`)
- [ ] List screens có `useFocusEffect` auto-refresh
- [ ] `animation: 'slide_from_right'`

Liệt kê các vấn đề tìm thấy, phân loại theo mức độ: **CRITICAL**, **HIGH**, **MEDIUM**, **LOW**.

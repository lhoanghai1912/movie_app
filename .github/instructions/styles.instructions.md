---
applyTo: '**/styles.ts,**/styles.tsx'
---

# Style Conventions — HaiAu CRM

## Import chuẩn

```typescript
import { ms, vs, SPACING, RADIUS } from 'constant/scale';
import { StyleSheet } from 'react-native';
import { colors } from 'theme';
```

## Layout Standards

### Scroll content container

```typescript
scrollContent: {
  paddingTop: vs(16),
  paddingHorizontal: ms(16),
  paddingBottom: vs(120),  // đủ space cho bottom bar
},
```

### Card / vContent

```typescript
vContent: {
  backgroundColor: colors.white,
  paddingHorizontal: ms(16),
  borderRadius: ms(12),        // KHÔNG dùng RADIUS * 3
  marginBottom: vs(12),
  // KHÔNG thêm marginHorizontal nếu parent đã có paddingHorizontal
},
```

### Section label / title

```typescript
sectionLabel: {
  fontSize: ms(13),
  fontWeight: '700',
  color: colors.blue1,         // KHÔNG dùng colors.gray
  letterSpacing: 0.8,
  marginTop: vs(4),
  marginBottom: vs(8),
  // KHÔNG paddingLeft/paddingHorizontal
},
```

### FieldRow pattern

```typescript
label: {
  width: ms(140),
  fontSize: ms(12),
  fontWeight: '600',
  color: colors.textSecondary,
},
value: {
  flex: 1,
  fontSize: ms(14),
  fontWeight: '600',
  color: colors.navy,
  textAlign: 'right',
},
```

## Anti-patterns (bị cấm)

- ❌ Hardcode màu: `color: '#1B3A6B'` → ✅ `color: colors.navy`
- ❌ Hardcode px: `padding: 16` → ✅ `paddingHorizontal: ms(16)`
- ❌ `RADIUS * 3` → ✅ `ms(12)`
- ❌ `marginHorizontal` trên card khi parent đã có `paddingHorizontal`
- ❌ `paddingLeft` trên section label
- ❌ `colors.gray` cho section title → ✅ `colors.blue1`

## Color reference

| Token                  | Value   | Dùng cho                          |
| ---------------------- | ------- | --------------------------------- |
| `colors.navy`          | #1B3A6B | Giá trị chính, văn bản quan trọng |
| `colors.blue1`         | #00568C | Section headers, labels           |
| `colors.blue`          | #007BFF | Links, active states              |
| `colors.textSecondary` | #64748B | Labels, secondary text            |
| `colors.border`        | #E2E8F0 | Dividers, borders                 |
| `colors.background`    | #F0F4F9 | Screen background                 |
| `colors.white`         | #FFFFFF | Card background                   |

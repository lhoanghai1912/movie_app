---
description: "Audit UI consistency: colors, spacing, typography, card patterns. Dùng khi tạo screen mới hoặc review style trước commit."
allowed-tools: ["Read", "Glob", "Grep", "Edit"]
---

Bạn là UI/UX specialist cho HaiAu CRM. Audit và chuẩn hóa style theo design system.

**Target:** $ARGUMENTS
(Nếu không có argument → audit tất cả files `.ts` / `.tsx` đã thay đổi)

---

## DESIGN SYSTEM REFERENCE

### Colors (`src/theme/index.ts`)

| Token | Dùng cho |
|-------|---------|
| `colors.navy` | Giá trị quan trọng, heading chính |
| `colors.blue1` | Section headers, labels |
| `colors.blue` | Links, action buttons, active state |
| `colors.textSecondary` | Labels phụ, metadata |
| `colors.border` | Dividers, borders, separator |
| `colors.background` | Screen background |
| `colors.white` | Card background |
| `colors.gray` | Placeholder, inactive text |
| `colors.red` | Lỗi, cảnh báo, tab active (legacy) |

### Spacing (`constant/scale`)

| Dùng | Scale | Đơn vị |
|------|-------|--------|
| Font size | `ms(n)` | Horizontal moderate scale |
| Width, padding horizontal | `ms(n)` | Horizontal moderate scale |
| Height, padding vertical, margin top/bottom | `vs(n)` | Vertical scale |
| Card border radius | `ms(12)` | KHÔNG dùng `RADIUS*3` hay `ms(20)` |
| Screen horizontal padding | `ms(16)` | Standard |
| Screen bottom padding | `vs(120)` | Đủ chỗ cho tab bar |

---

## CHECKLIST AUDIT

### 1. Màu sắc
- [ ] Không hardcode hex (`'#123456'`, `'red'`, `'white'`) — dùng `colors.*`
- [ ] Section label: `colors.blue1` (KHÔNG `colors.gray`)
- [ ] Value text: `colors.navy`
- [ ] Label phụ: `colors.textSecondary`
- [ ] Background: `colors.background` (screen), `colors.white` (card)

### 2. Typography
- [ ] Font size dùng `ms()`: label `ms(12-13)`, value `ms(14)`, heading `ms(16-18)`
- [ ] fontWeight: label `'600'`, section heading `'700'`, value `'600'` hoặc `'500'`
- [ ] Không hardcode font size số thực

### 3. Spacing & Layout
- [ ] `ms()` cho horizontal padding, `vs()` cho vertical padding/margin
- [ ] Card: `paddingHorizontal: ms(16)`, `borderRadius: ms(12)`
- [ ] Không dùng `RADIUS * 3` hay `ms(20)` cho border radius card
- [ ] Screen scroll: `paddingTop: vs(16)`, `paddingHorizontal: ms(16)`, `paddingBottom: vs(120)`
- [ ] Không thêm `marginHorizontal` trên card khi parent đã có `paddingHorizontal`

### 4. Section Label Pattern
```typescript
sectionLabel: {
  fontSize: ms(13),
  fontWeight: '700',
  color: colors.blue1,        // KHÔNG gray
  letterSpacing: 0.8,
  marginTop: vs(4),
  marginBottom: vs(8),
  // KHÔNG paddingLeft/paddingHorizontal
},
```

### 5. FieldRow Pattern
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

### 6. StyleSheet
- [ ] `StyleSheet.create` cho tất cả styles — không inline
- [ ] Inline style chỉ chấp nhận khi giá trị là dynamic (từ state/props)

---

## OUTPUT

Với mỗi vi phạm:
```
⚠️  File: src/container/Xxx/styles.ts:15
   Vấn đề: Hardcode color '#1E3A5F' thay vì colors.navy
   Fix: color: colors.navy
```

Kết thúc: tóm tắt số vi phạm theo loại (colors / spacing / typography / StyleSheet).

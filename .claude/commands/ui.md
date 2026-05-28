---
description: "Audit UI consistency: colors, spacing, typography, card patterns theo movie app design system. Dùng khi tạo screen mới hoặc review style trước commit."
allowed-tools: ["Read", "Glob", "Grep", "Edit"]
---

Bạn là UI specialist cho movie streaming app. Audit và chuẩn hóa style theo design system trong `src/constants/theme.ts`.

**Target:** $ARGUMENTS
(Không có argument → audit files `.ts` / `.tsx` đã thay đổi gần nhất)

---

## DESIGN SYSTEM REFERENCE (`src/constants/theme.ts`)

### Colors — luôn qua `useTheme()`, KHÔNG import `MovieThemes` trực tiếp trong component

| Token | Dùng cho |
|-------|----------|
| `theme.background` | Screen background |
| `theme.surface` | Section / row background |
| `theme.card` | Card background |
| `theme.overlay` | Modal overlay, gradient |
| `theme.text` | Primary text |
| `theme.textSecondary` | Labels, metadata, subtitles |
| `theme.textMuted` | Placeholder, disabled, timestamps |
| `theme.accent` | CTA buttons, active tab, highlights |
| `theme.accentDim` | Pressed state, badge bg |
| `theme.border` | Dividers, card borders |
| `theme.star` | Rating stars (#F5C518) |
| `theme.success / warning / error` | Status indicators |

### Spacing (4pt scale)

| Constant | Value | Dùng cho |
|----------|-------|----------|
| `Spacing.half` | 2 | Micro gaps |
| `Spacing.one` | 4 | Icon gap, badge padding |
| `Spacing.two` | 8 | Item gap, inner padding |
| `Spacing.three` | 16 | Screen horizontal padding, section gap |
| `Spacing.four` | 24 | Section margin |
| `Spacing.five` | 32 | Hero padding |
| `HorizontalPad` | 16 | Screen edge padding (alias Spacing.three) |

### Typography

| Constant | Size | Dùng cho |
|----------|------|----------|
| `FontSize.xs` | 10 | Captions, badges |
| `FontSize.sm` | 12 | Secondary labels, metadata |
| `FontSize.base` | 14 | Body text, card title |
| `FontSize.md` | 16 | Subheading, tab label |
| `FontSize.lg` | 18 | Screen heading |
| `FontSize.xl` | 20 | Section title |
| `FontSize['2xl']` | 24 | Hero title |

FontWeight: `regular: '400'` / `medium: '500'` / `semibold: '600'` / `bold: '700'`

### Border Radius

| Constant | Value | Dùng cho |
|----------|-------|----------|
| `Radius.xs` | 4 | Badge, tag |
| `Radius.sm` | 6 | Button small |
| `Radius.md` | 8 | Input, card inner |
| `Radius.lg` | 12 | Card, modal |
| `Radius.xl` | 16 | Bottom sheet |
| `Radius.full` | 9999 | Avatar, pill |

### Card Dimensions

```typescript
CardSize.poster  = { width: 120, height: 180 }   // 2:3 portrait
CardSize.wide    = { width: 200, height: 112 }   // 16:9 wide
CardSize.episode = { width: 72, height: 72 }     // square
BottomTabInset = 50 (iOS) / 80 (Android)
```

---

## CHECKLIST AUDIT

### 1. Colors
- [ ] Không hardcode hex (`'#E63946'`, `'#fff'`) — luôn dùng `theme.*`
- [ ] `useTheme()` ở đầu component, destructure tokens cần thiết
- [ ] Accent = `theme.accent`, KHÔNG hardcode red/blue/purple
- [ ] Text chính: `theme.text`, phụ: `theme.textSecondary`, mờ: `theme.textMuted`

### 2. Spacing & Layout
- [ ] Horizontal screen padding = `HorizontalPad` (16) hoặc `Spacing.three`
- [ ] Không hardcode pixel `paddingHorizontal: 15` hay `marginTop: 20`
- [ ] Card gap trong list = `Spacing.two` (8)
- [ ] Section margin = `Spacing.four` (24)
- [ ] Bottom scroll clearance = `insets.bottom + BottomTabInset`

### 3. Typography
- [ ] Font size dùng `FontSize.*` constant
- [ ] Không hard-code `fontSize: 13` hay `fontSize: 17`
- [ ] Title: `FontSize.lg` + `FontWeight.bold`
- [ ] Body: `FontSize.base` + `FontWeight.regular`
- [ ] Label: `FontSize.sm` + `FontWeight.medium`

### 4. Cards
- [ ] Border radius: `Radius.lg` (12) cho movie card
- [ ] Background: `theme.card`
- [ ] Border: `1px theme.border` hoặc không border (chọn 1 pattern nhất quán)
- [ ] Image dùng `expo-image` `<Image>` với `contentFit="cover"`
- [ ] `recyclingKey` = `movie.slug` khi trong FlashList/FlatList

### 5. StyleSheet
- [ ] `StyleSheet.create({})` cho static styles
- [ ] Inline style chỉ cho dynamic value (`{ color: theme.text }`)
- [ ] Không mix: dynamic color trong StyleSheet.create

### 6. Themed Primitives
- [ ] Dùng `<ThemedText>` / `<ThemedView>` cho color-aware elements
- [ ] KHÔNG đọc `Colors` trực tiếp trong screen — dùng `useTheme()`
- [ ] New screens: NativeWind `className` + design tokens

---

## PATTERNS CHUẨN

### Screen layout
```typescript
export default function SomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={{ flex: 1, backgroundColor: theme.background }}>
      <FlashList
        data={items}
        contentContainerStyle={{
          paddingHorizontal: HorizontalPad,
          paddingTop: Spacing.three,
          paddingBottom: insets.bottom + BottomTabInset,
        }}
        ...
      />
    </ThemedView>
  );
}
```

### Movie card
```typescript
const styles = StyleSheet.create({
  card: {
    width: CardSize.poster.width,
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  poster: {
    width: CardSize.poster.width,
    height: CardSize.poster.height,
  },
  title: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    marginTop: Spacing.one,
    paddingHorizontal: Spacing.one,
  },
});
```

### Section header
```typescript
const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.two,
  },
});
```

---

## OUTPUT FORMAT

Với mỗi vi phạm:
```
⚠️  src/app/index.tsx:42
   Vấn đề: Hardcode color '#E63946' thay vì theme.accent
   Fix: color: theme.accent

⚠️  src/components/movie-card.tsx:18
   Vấn đề: fontSize: 13 hardcode
   Fix: fontSize: FontSize.sm
```

Kết thúc: tóm tắt số vi phạm theo loại (colors / spacing / typography / structure).

---
name: ui-consistency
description: >
  UI consistency audit và style chuẩn hóa cho HaiAu CRM. Use when: rà soát style nhiều màn hình,
  đồng bộ padding/spacing/color, tạo màn hình mới cần đúng design system, kiểm tra
  style inconsistencies trước khi commit.
---

# UI Consistency — HaiAu CRM Design System

## When to Use

- Tạo màn hình mới — cần đúng design system ngay từ đầu
- Rà soát style sau khi implement
- Full audit nhiều module — đồng bộ padding/spacing/color
- Kiểm tra trước khi commit

## Design System Standards

### Colors (từ `src/theme/index.ts`)

| Token                  | Dùng cho                            |
| ---------------------- | ----------------------------------- |
| `colors.navy`          | Giá trị quan trọng, big title       |
| `colors.blue1`         | Section headers, labels             |
| `colors.blue`          | Links, action buttons, active state |
| `colors.textSecondary` | Labels phụ, metadata                |
| `colors.border`        | Dividers, borders                   |
| `colors.background`    | Screen background                   |
| `colors.white`         | Card background                     |
| `colors.gray`          | Placeholder, inactive text          |

### Spacing (từ `constant/scale`)

- `ms(n)` — horizontal dimensions, font sizes
- `vs(n)` — vertical dimensions
- Card padding: `ms(16)` horizontal, không vertical padding riêng trên card nếu dùng FieldRow
- Screen scroll: `paddingHorizontal: ms(16)`, `paddingTop: vs(16)`, `paddingBottom: vs(120)`

### Card radius

Luôn dùng `borderRadius: ms(12)` — KHÔNG `RADIUS * 3` hoặc `ms(20)`.

### Section labels

```typescript
sectionLabel: {
  fontSize: ms(13),
  fontWeight: '700',
  color: colors.blue1,   // KHÔNG gray
  letterSpacing: 0.8,
  marginTop: vs(4),
  marginBottom: vs(8),
  // NO paddingLeft/paddingHorizontal
}
```

### FieldRow

```typescript
label: { width: ms(140), fontSize: ms(12), fontWeight: '600', color: colors.textSecondary }
value: { flex: 1, fontSize: ms(14), fontWeight: '600', color: colors.navy, textAlign: 'right' }
```

## Audit Checklist (chạy trên mỗi styles.ts)

```
scrollContent/contentContainer:
  [ ] paddingHorizontal: ms(16)
  [ ] paddingTop: vs(16)
  [ ] paddingBottom: vs(120)

card/vContent:
  [ ] borderRadius: ms(12)  ← không RADIUS*3
  [ ] NO marginHorizontal  ← parent đã có paddingHorizontal

sectionLabel/sectionTitle:
  [ ] color: colors.blue1  ← không colors.gray
  [ ] NO paddingLeft/paddingHorizontal
  [ ] marginTop: vs(4), marginBottom: vs(8)

list card (trong tab với listContent):
  [ ] NO marginHorizontal  ← listContent đã có paddingHorizontal
```

## Common Mistakes và Fix

| Mistake                                         | Fix                      |
| ----------------------------------------------- | ------------------------ |
| `color: colors.gray` trên section label         | → `color: colors.blue1`  |
| `borderRadius: RADIUS * 3`                      | → `borderRadius: ms(12)` |
| `marginHorizontal` + parent `paddingHorizontal` | → xóa `marginHorizontal` |
| `paddingLeft` trên section label                | → xóa                    |
| `paddingBottom: vs(16)` trên scrollContent      | → `vs(120)`              |
| `summaryTitle: paddingHorizontal: ms(16*2)`     | → `ms(16)`               |

## DetailHeaderCard (đã có sẵn)

Dùng `component/DetailHeaderCard` cho tất cả detail screens. Props:

```typescript
<DetailHeaderCard
  owner={data?.ownerName}
  createdDate={data?.createdDate}
  statusLabel={statusText}
  statusBgColor={bgColor}
  statusTextColor={textColor}
  docNum={data?.docNum}
  titleLabel="TÊN MÀN HÌNH"
  titleValue={data?.title}
/>
```

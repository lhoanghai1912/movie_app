---
name: vercel-react-native-skills
description: >
  React Native and Expo best practices for building performant mobile apps. Use
  when building React Native components, optimizing list performance,
  implementing animations, or working with native modules. Triggers on tasks
  involving React Native, Expo, mobile performance, or native platform APIs.
license: MIT
metadata:
  source: https://skills.sh/vercel-labs/agent-skills/vercel-react-native-skills
  version: '1.0.0'
---

# React Native Skills

Comprehensive best practices for React Native and Expo applications. Contains
rules across multiple categories covering performance, animations, UI patterns,
and platform-specific optimizations.

## When to Apply

Reference these guidelines when:

- Building React Native or Expo apps
- Optimizing list and scroll performance
- Implementing animations with Reanimated
- Working with images and media
- Configuring native modules or fonts
- Structuring monorepo projects with native dependencies

## Rule Categories by Priority

| Priority | Category         | Impact   | Prefix               |
| -------- | ---------------- | -------- | -------------------- |
| 1        | List Performance | CRITICAL | `list-performance-`  |
| 2        | Animation        | HIGH     | `animation-`         |
| 3        | Navigation       | HIGH     | `navigation-`        |
| 4        | UI Patterns      | HIGH     | `ui-`                |
| 5        | State Management | MEDIUM   | `react-state-`       |
| 6        | Rendering        | MEDIUM   | `rendering-`         |
| 7        | Monorepo         | MEDIUM   | `monorepo-`          |
| 8        | Configuration    | LOW      | `fonts-`, `imports-` |

## Quick Reference

### 1. List Performance (CRITICAL)

- `list-performance-virtualize` — Use FlashList for large lists (>100 items)
- `list-performance-item-memo` — Memoize list item components with `React.memo`
- `list-performance-callbacks` — Stabilize callback references with `useCallback`
- `list-performance-inline-objects` — Avoid inline style objects in render
- `list-performance-function-references` — Extract render functions outside component
- `list-performance-images` — Optimize images in lists (fixed size, cache)
- `list-performance-item-expensive` — Move expensive work outside list items
- `list-performance-item-types` — Use `getItemType` for heterogeneous lists

#### ✅ Correct — FlashList with memoized item

```tsx
import { FlashList } from '@shopify/flash-list';

const Item = React.memo(({ item }: { item: MyItem }) => (
  <View style={styles.item}>
    <Text>{item.title}</Text>
  </View>
));

export function MyList({ data }: { data: MyItem[] }) {
  const renderItem = useCallback(
    ({ item }: { item: MyItem }) => <Item item={item} />,
    [],
  );

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      estimatedItemSize={80}
      keyExtractor={item => item.id}
    />
  );
}
```

#### ❌ Incorrect — FlatList with inline objects

```tsx
<FlatList
  data={data}
  renderItem={({ item }) => (
    <View style={{ padding: 16 }}>
      {' '}
      {/* inline object recreated each render */}
      <Text>{item.title}</Text>
    </View>
  )}
/>
```

---

### 2. Animation (HIGH)

- `animation-gpu-properties` — Animate **only** `transform` and `opacity` (GPU-accelerated)
- `animation-derived-value` — Use `useDerivedValue` for computed animation values
- `animation-gesture-detector-press` — Use `Gesture.Tap()` instead of `Pressable` inside gesture handlers

#### ✅ Correct — Reanimated with GPU properties

```tsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const opacity = useSharedValue(1);

const animatedStyle = useAnimatedStyle(() => ({
  opacity: opacity.value, // ✅ GPU property
  transform: [{ scale: opacity.value }], // ✅ GPU property
}));
```

#### ❌ Incorrect — Animating layout properties

```tsx
// ❌ Never animate width/height/top/left — causes layout recalculation
const animatedStyle = useAnimatedStyle(() => ({
  width: width.value,
  height: height.value,
}));
```

---

### 3. Navigation (HIGH)

- `navigation-native-navigators` — Use `createNativeStackNavigator` and `createNativeBottomTabNavigator` over JS alternatives

```tsx
// ✅ Native Stack (hardware-accelerated)
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ❌ Avoid JS Stack
import { createStackNavigator } from '@react-navigation/stack';
```

---

### 4. UI Patterns (HIGH)

- `ui-expo-image` — Use `expo-image` for all images (better caching, performance)
- `ui-pressable` — Use `Pressable` over `TouchableOpacity`
- `ui-safe-area-scroll` — Handle safe areas in `ScrollView` with `contentInsetAdjustmentBehavior`
- `ui-native-modals` — Use native modals (`Modal` with `presentationStyle`) when possible
- `ui-measure-views` — Use `onLayout` instead of `measure()` for view dimensions
- `ui-styling` — Use `StyleSheet.create` (no inline styles except dynamic values)

#### ✅ Correct — Pressable with feedback

```tsx
<Pressable
  style={({ pressed }) => [styles.button, pressed && styles.pressed]}
  onPress={onPress}
>
  <Text>Button</Text>
</Pressable>
```

---

### 5. State Management (MEDIUM)

- `react-state-minimize` — Subscribe only to needed state slices (avoid full store re-renders)
- `react-state-dispatcher` — Use dispatcher pattern for callbacks passed to children
- `react-state-fallback` — Show skeleton/fallback on first render before data loads
- `react-compiler-destructure-functions` — Destructure props/state for React Compiler compatibility

```tsx
// ✅ Minimize subscriptions
const userName = useSelector((s: RootState) => s.user.name); // specific slice

// ❌ Avoid
const user = useSelector((s: RootState) => s.user); // entire object → re-renders on any change
```

---

### 6. Rendering (MEDIUM)

- `rendering-text-in-text-component` — Always wrap text in `<Text>` components
- `rendering-no-falsy-and` — Avoid `{count && <Component />}` (renders "0") → use ternary

```tsx
// ✅ Correct
{
  count > 0 && <Badge count={count} />;
}
{
  count > 0 ? <Badge count={count} /> : null;
}

// ❌ Incorrect — renders "0" when count === 0
{
  count && <Badge count={count} />;
}
```

---

### 7. Monorepo (MEDIUM)

- `monorepo-native-deps-in-app` — Native dependencies must live in the app package, not shared packages
- `monorepo-single-dependency-versions` — Use a single version of each dependency across all packages

---

### 8. Configuration (LOW)

- `fonts-config-plugin` — Use Expo config plugins for custom fonts (not manual linking)
- `imports-design-system-folder` — Organize design system imports from a single barrel export
- `js-hoist-intl` — Hoist `Intl` object creation outside render functions

---

## HaiAu Project Specifics

These Vercel guidelines apply to HaiAu with the following adaptations:

| Vercel Guideline                | HaiAu Status                                   |
| ------------------------------- | ---------------------------------------------- |
| FlashList for large lists       | Apply to customer/order lists                  |
| Pressable over TouchableOpacity | Migrate gradually                              |
| expo-image                      | Not using Expo — use FastImage or native Image |
| Native Stack Navigator          | ✅ Already enforced                            |
| StyleSheet.create               | ✅ Already enforced                            |
| Minimize Redux subscriptions    | Apply to all `useSelector` calls               |
| useFocusEffect for auto-refresh | ✅ Already enforced                            |

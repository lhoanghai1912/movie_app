---
description: "Pattern reference cho React Native / Expo movie app: component composition, hooks, state, performance, animation, accessibility. Dùng khi implement mới hoặc review pattern."
allowed-tools: ["Read", "Glob", "Grep", "Edit", "Write"]
---

Bạn là Senior React Native Engineer. Áp dụng các patterns dưới đây khi implement hoặc review code cho movie app.

**Target:** $ARGUMENTS
(Không có argument → review files đang mở hoặc files vừa thay đổi)

---

## STACK CONSTRAINTS

| Concern | Tool | Không dùng |
|---------|------|-----------|
| Images | `expo-image` `<Image>` | `react-native` `<Image>` |
| Icons | `<SymbolView>` từ `expo-symbols` | icon fonts |
| Animation | `react-native-reanimated` v4 | framer-motion, Animated API |
| Lists | `FlashList` hoặc `FlatList` | `ScrollView` cho dài list |
| Data fetching | TanStack Query (`useQuery`, `useMutation`) | manual fetch, custom useQuery |
| Global state | Zustand store | Context+Reducer cho global state |
| Styling (existing) | `StyleSheet.create` + design tokens | inline styles (trừ dynamic) |
| Styling (new screens) | NativeWind `className` | hardcode px values |
| Colors | `useTheme()` → `MovieTheme` tokens | hardcode hex |
| Spacing | `Spacing.*`, `Radius.*`, `FontSize.*` | hardcode numbers |
| Safe area | `useSafeAreaInsets()` + `BottomTabInset` | padding magic numbers |

---

## DESIGN TOKENS (`src/constants/theme.ts`)

### Colors — qua `useTheme()` hook
```typescript
const theme = useTheme(); // returns MovieTheme

// Surfaces
theme.background        // screen bg
theme.surface           // section bg
theme.card              // card bg
theme.overlay           // modal overlay

// Text
theme.text              // primary text
theme.textSecondary     // labels, metadata
theme.textMuted         // placeholder, disabled

// Accent
theme.accent            // CTA buttons, active state
theme.accentDim         // pressed state

// Semantic
theme.success / theme.warning / theme.error
theme.border            // dividers, card borders
theme.star              // rating stars (#F5C518)
```

### Spacing (4pt scale)
```typescript
Spacing.half  = 2
Spacing.one   = 4
Spacing.two   = 8
Spacing.three = 16   // standard screen padding
Spacing.four  = 24
Spacing.five  = 32
Spacing.six   = 64
```

### Typography
```typescript
FontSize.xs   = 10   // captions
FontSize.sm   = 12   // labels
FontSize.base = 14   // body
FontSize.md   = 16   // subheading
FontSize.lg   = 18   // heading
FontSize.xl   = 20
FontSize['2xl'] = 24
```

### Card dimensions
```typescript
CardSize.poster  = { width: 120, height: 180 }   // portrait poster
CardSize.wide    = { width: 200, height: 112 }   // 16:9 thumbnail
CardSize.episode = { width: 72, height: 72 }
HorizontalPad = 16   // screen edge padding
```

---

## COMPONENT PATTERNS

### 1. Composition (Compound Component)
```typescript
// MovieCard với slot children — không prop drilling nặng
interface MovieCardProps {
  children: React.ReactNode;
  onPress?: () => void;
}

export function MovieCard({ children, onPress }: MovieCardProps) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.card, opacity: pressed ? 0.8 : 1 },
      ]}
    >
      {children}
    </Pressable>
  );
}

export function MovieCardPoster({ uri }: { uri: string }) {
  return (
    <Image
      source={uri}
      style={styles.poster}
      contentFit="cover"
      transition={200}
    />
  );
}

export function MovieCardTitle({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <ThemedText
      type="default"
      numberOfLines={2}
      style={{ color: theme.text, fontSize: FontSize.sm }}
    >
      {children}
    </ThemedText>
  );
}

// Usage
<MovieCard onPress={() => router.push(`/movie/${id}`)}>
  <MovieCardPoster uri={thumbUrl} />
  <MovieCardTitle>{title}</MovieCardTitle>
</MovieCard>
```

### 2. Pressable với ripple (cross-platform)
```typescript
<Pressable
  android_ripple={{ color: theme.accentDim, borderless: false }}
  style={({ pressed }) => ({
    opacity: Platform.OS === 'ios' && pressed ? 0.7 : 1,
  })}
  onPress={onPress}
>
  {children}
</Pressable>
```

---

## CUSTOM HOOKS

### useToggle
```typescript
export function useToggle(init = false): [boolean, () => void] {
  const [value, setValue] = useState(init);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle];
}
```

### useDebounce (cho Search)
```typescript
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// Usage trong Search screen
const [query, setQuery] = useState('');
const debouncedQuery = useDebounce(query, 400);
const { data } = useQuery({
  queryKey: ['search', debouncedQuery],
  queryFn: () => MovieApi.search(debouncedQuery),
  enabled: debouncedQuery.length > 1,
});
```

### useSafeScroll (scroll under tab bar)
```typescript
export function useSafeScroll() {
  const insets = useSafeAreaInsets();
  return {
    contentContainerStyle: {
      paddingBottom: insets.bottom + BottomTabInset,
      paddingHorizontal: HorizontalPad,
    },
  };
}
```

---

## STATE MANAGEMENT (Zustand)

### Store pattern
```typescript
// src/store/favorites.ts
interface FavoritesStore {
  ids: Set<string>;
  add: (id: string) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      ids: new Set(),
      add: (id) => set(s => ({ ids: new Set([...s.ids, id]) })),
      remove: (id) => set(s => {
        const next = new Set(s.ids);
        next.delete(id);
        return { ids: next };
      }),
      has: (id) => get().ids.has(id),
    }),
    { name: 'favorites', storage: createJSONStorage(() => AsyncStorage) }
  )
);
```

### Selector pattern (tránh re-render thừa)
```typescript
// Chỉ subscribe 1 field
const isFav = useFavoritesStore(s => s.has(movieId));
const addFav = useFavoritesStore(s => s.add);
```

---

## DATA FETCHING (TanStack Query)

### Query cơ bản
```typescript
// src/services/movies.ts
export const MovieApi = {
  getList: (page: number) =>
    axios.get<MovieListResponse>('/films/list', { params: { page } }).then(r => r.data),
  getDetail: (slug: string) =>
    axios.get<MovieDetailResponse>(`/film/${slug}`).then(r => r.data),
};

// Trong component
const { data, isLoading, error } = useQuery({
  queryKey: ['movies', 'list', page],
  queryFn: () => MovieApi.getList(page),
  staleTime: 5 * 60 * 1000,  // 5 min cache
});
```

### Infinite scroll
```typescript
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
  queryKey: ['movies', category],
  queryFn: ({ pageParam = 1 }) => MovieApi.getList(pageParam),
  getNextPageParam: (last) => last.pagination.currentPage < last.pagination.totalPages
    ? last.pagination.currentPage + 1
    : undefined,
});

const movies = data?.pages.flatMap(p => p.items) ?? [];
```

---

## PERFORMANCE

### FlashList cho danh sách phim
```typescript
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={movies}
  renderItem={({ item }) => <MovieCard movie={item} />}
  keyExtractor={item => item.slug}
  estimatedItemSize={CardSize.poster.height + Spacing.two}
  numColumns={2}
  onEndReached={fetchNextPage}
  onEndReachedThreshold={0.5}
  ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
/>
```

### Memoization — chỉ khi đo được re-render vấn đề
```typescript
// Dự án dùng reactCompiler: true — KHÔNG thêm useMemo/useCallback tùy tiện
// React Compiler tự optimize. Profile trước khi add memo.

// OK: memo trên item component nếu list lớn
const MovieCard = React.memo<{ movie: Movie }>(({ movie }) => { ... });
```

### expo-image (lazy load, placeholder)
```typescript
<Image
  source={movie.thumbUrl}
  style={styles.poster}
  contentFit="cover"
  placeholder={{ blurhash: movie.blurhash }}
  transition={300}
  recyclingKey={movie.slug}   // quan trọng cho FlashList
/>
```

---

## ANIMATION (reanimated v4)

### Fade in khi mount
```typescript
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

<Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(200)}>
  <MovieCard />
</Animated.View>
```

### Slide sheet / modal
```typescript
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const translateY = useSharedValue(SCREEN_HEIGHT);
const animStyle = useAnimatedStyle(() => ({
  transform: [{ translateY: translateY.value }],
}));

const open = () => { translateY.value = withSpring(0, { damping: 20 }); };
const close = () => { translateY.value = withSpring(SCREEN_HEIGHT); };
```

### Hero image scale on scroll
```typescript
const scrollY = useSharedValue(0);
const heroStyle = useAnimatedStyle(() => ({
  transform: [{ scale: interpolate(scrollY.value, [-100, 0], [1.3, 1], 'clamp') }],
}));

<Animated.ScrollView
  onScroll={useAnimatedScrollHandler(e => { scrollY.value = e.contentOffset.y; })}
  scrollEventThrottle={16}
>
  <Animated.Image source={heroUri} style={[styles.hero, heroStyle]} />
</Animated.ScrollView>
```

---

## ERROR BOUNDARY
```typescript
export class ScreenErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return this.props.fallback ?? (
        <ThemedView style={styles.center}>
          <ThemedText>Có lỗi xảy ra. Thử lại sau.</ThemedText>
          <Pressable onPress={() => this.setState({ error: null })}>
            <ThemedText style={{ color: theme.accent }}>Thử lại</ThemedText>
          </Pressable>
        </ThemedView>
      );
    }
    return this.props.children;
  }
}
```

---

## ACCESSIBILITY

```typescript
// Pressable với role
<Pressable
  accessibilityRole="button"
  accessibilityLabel={`Xem phim ${movie.name}`}
  accessibilityHint="Nhấn để xem chi tiết"
  onPress={onPress}
>

// Image alt text
<Image
  source={uri}
  accessibilityLabel={`Poster phim ${movie.name}`}
/>

// Thứ tự focus với accessible groups
<View accessible accessibilityLabel={`${movie.name}, ${movie.year}, rating ${movie.rating}`}>
  <MovieCardPoster uri={movie.thumbUrl} importantForAccessibility="no" />
  <MovieCardTitle>{movie.name}</MovieCardTitle>
</View>
```

---

## CHECKLIST KHI REVIEW

- [ ] Không hardcode hex color — dùng `useTheme()` tokens
- [ ] Không hardcode spacing — dùng `Spacing.*`, `Radius.*`, `FontSize.*`
- [ ] Image dùng `expo-image` với `recyclingKey` trong list
- [ ] List dài dùng `FlashList`, không `ScrollView`
- [ ] Zustand selector granular — không subscribe cả store
- [ ] TanStack Query có `staleTime` phù hợp
- [ ] Animation dùng reanimated v4 (không `Animated` API cũ)
- [ ] `StyleSheet.create` cho static styles, inline chỉ cho dynamic
- [ ] Safe area: `useSafeAreaInsets()` + `BottomTabInset`
- [ ] `accessibilityRole` + `accessibilityLabel` trên interactive elements
- [ ] Không `useMemo`/`useCallback` tùy tiện (React Compiler lo)

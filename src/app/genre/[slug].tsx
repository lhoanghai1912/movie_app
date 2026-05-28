import type { Movie } from "@/types";
import { MovieCard } from "@components/movie";
import { Loading } from "@components/ui";
import { GENRES, hslToHex } from "@constants/genres";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFilteredMovies } from "@hooks/useFilteredMovies";
import { useTheme } from "@hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function GenrePage() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFilteredMovies(slug);

  const genre = useMemo(() => GENRES.find((g) => g.id === slug), [slug]);
  const movies = useMemo(
    () => data?.pages.flatMap((p) => p.items) ?? [],
    [data],
  );
  const totalItems = data?.pages[0]?.paginate.total_items;

  const headerBg = genre ? hslToHex(genre.hue, 35, 20) : theme.surface;
  const headerDark = genre ? hslToHex(genre.hue, 22, 10) : theme.bg;

  // 2 columns: 16px padding each side + 12px gap
  const cardWidth = Math.floor((width - 44) / 2);

  const hero = (
    <LinearGradient
      colors={[headerBg, headerDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[s.hero, { paddingTop: insets.top + 8 }]}
    >
      <Pressable onPress={() => router.back()} style={s.backBtn}>
        <MaterialCommunityIcons name="arrow-left" size={22} color="#FFFFFF" />
      </Pressable>
      <Text style={s.heroTitle}>{genre?.name ?? slug}</Text>
      <Text style={s.heroSub}>{genre?.english ?? ""}</Text>
      {totalItems !== undefined && (
        <Text style={s.heroCount}>{totalItems.toLocaleString()} phim</Text>
      )}
    </LinearGradient>
  );

  if (isLoading) {
    return (
      <View style={[s.fill, { backgroundColor: theme.bg }]}>
        {hero}
        <Loading />
      </View>
    );
  }

  return (
    <FlatList<Movie>
      data={movies}
      keyExtractor={(m) => m.slug}
      numColumns={2}
      columnWrapperStyle={s.row}
      ListHeaderComponent={hero}
      renderItem={({ item }) => (
        <View style={s.col}>
          <MovieCard movie={item} width={cardWidth} />
        </View>
      )}
      onEndReached={() => {
        console.log("[Genre] onEndReached", {
          hasNextPage,
          isFetchingNextPage,
          total: movies.length,
        });
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.8}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator color={theme.accent} style={s.footer} />
        ) : null
      }
      ListEmptyComponent={
        <View style={s.empty}>
          <Text style={[s.emptyText, { color: theme.text2 }]}>
            Chưa có phim nào
          </Text>
        </View>
      }
      contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      style={[s.fill, { backgroundColor: theme.bg }]}
      showsVerticalScrollIndicator={false}
    />
  );
}

const s = StyleSheet.create({
  fill: { flex: 1 },
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  heroSub: {
    fontSize: 13,
    color: "rgba(255,255,255,0.55)",
    marginTop: 2,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  heroCount: {
    fontSize: 12,
    color: "rgba(255,255,255,0.45)",
    marginTop: 10,
  },
  row: {
    gap: 12,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  col: { flex: 1 },
  footer: { marginVertical: 20 },
  empty: { paddingTop: 64, alignItems: "center" },
  emptyText: { fontSize: 15 },
});

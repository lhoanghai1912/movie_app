import {
  FeaturedCard,
  GenreTile,
  MovieCard,
  PopularRow,
} from "@components/movie";
import { CategoryPill, Loading, SectionHeader } from "@components/ui";
import { GENRES } from "@constants/genres";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useHomeMovies } from "@hooks/useHomeMovies";
import { useTheme } from "@hooks/useTheme";
import { useWatchlist } from "@hooks/useWatchlist";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const CATEGORIES = ["Tất cả", "Phim lẻ", "Phim bộ", "Anime", "TV Show"];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [cat, setCat] = useState("Tất cả");
  const { newMovies, singleMovies, isLoading, refetch, isRefetching } =
    useHomeMovies();
  const { items: watchlistItems } = useWatchlist();
  const theme = useTheme();

  const contentStyle = useMemo(
    () => ({ paddingTop: 16, paddingBottom: 96 }),
    [insets.top],
  );

  if (isLoading) return <Loading />;

  const featured = newMovies[0];
  const trending = newMovies.slice(0, 8);
  const recommended = singleMovies.slice(0, 6);
  const popular = newMovies.slice(0, 4);
  const continueWatching = watchlistItems.slice(0, 3);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={[s.scroll, { backgroundColor: theme.bg }]}
        contentContainerStyle={contentStyle}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={theme.accent}
          />
        }
      >
        {/* Header */}
        <View style={s.header}>
          <View style={[s.avatar, { backgroundColor: theme.accent }]}>
            <Text style={s.avatarText}>T</Text>
          </View>
          <View style={s.flex1}>
            <Text style={[s.greeting, { color: theme.text }]}>Xin chào!</Text>
            <Text style={[s.subGreeting, { color: theme.text2 }]}>
              Chúc xem phim vui vẻ
            </Text>
          </View>
          <Pressable
            onPress={() => router.push("/(tabs)/search")}
            style={[s.iconBtn, { backgroundColor: theme.surface }]}
          >
            <MaterialCommunityIcons
              name="magnify"
              size={18}
              color={theme.text2}
            />
          </Pressable>
          <Pressable
            onPress={() => router.push("/(tabs)/library")}
            style={[s.iconBtn, { backgroundColor: theme.surface }]}
          >
            <MaterialCommunityIcons
              name="bookmark-outline"
              size={18}
              color={theme.text2}
            />
          </Pressable>
        </View>

        {/* Featured */}
        {featured && (
          <View style={s.padH}>
            <FeaturedCard movie={featured} />
          </View>
        )}

        {/* Category pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.pillRow}
          style={s.pillScroll}
        >
          {CATEGORIES.map((c) => (
            <CategoryPill
              key={c}
              label={c}
              active={cat === c}
              onPress={() => setCat(c)}
            />
          ))}
        </ScrollView>

        {/* Continue Watching */}
        {continueWatching.length > 0 && (
          <View style={[s.section, s.padH]}>
            <SectionHeader title="Đang xem dở" />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={s.continueRow}
            >
              {continueWatching.map((m, i) => {
                const progress = [0.34, 0.71, 0.18][i] ?? 0.5;
                return (
                  <Pressable
                    key={m.slug}
                    style={s.continueCard}
                    onPress={() =>
                      router.push({
                        pathname: "/movie/[slug]",
                        params: { slug: m.slug },
                      })
                    }
                  >
                    <View
                      style={[
                        s.continuePoster,
                        { backgroundColor: theme.surface },
                      ]}
                    >
                      <Image
                        source={{ uri: m.thumb_url }}
                        style={StyleSheet.absoluteFill}
                        contentFit="cover"
                        transition={200}
                      />
                      <View style={s.progressBg}>
                        <View
                          style={[
                            s.progressFill,
                            {
                              width: `${progress * 100}%` as any,
                              backgroundColor: theme.accent,
                            },
                          ]}
                        />
                      </View>
                      <View
                        style={[
                          s.progressBadge,
                          { backgroundColor: "rgba(0,0,0,0.6)" },
                        ]}
                      >
                        <Text style={s.progressText}>
                          {Math.round(progress * 100)}%
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={[s.continueTitle, { color: theme.text }]}
                      numberOfLines={1}
                    >
                      {m.name}
                    </Text>
                    <Text style={[s.continueMeta, { color: theme.text2 }]}>
                      {m.language}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* Trending */}
        {trending.length > 0 && (
          <View style={s.section}>
            <View style={s.padH}>
              <SectionHeader title="Đang thịnh hành" />
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={s.movieRow}
            >
              {trending.map((m) => (
                <MovieCard key={m.slug} movie={m} />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Genre teaser */}
        <View style={[s.section, s.padH]}>
          <SectionHeader
            title="Khám phá thể loại"
            onSeeAll={() => router.push("/(tabs)/search")}
          />
          <View style={s.genreRow}>
            {[GENRES.slice(0, 2), GENRES.slice(2, 4)].map((row, ri) => (
              <View key={`genre-row-${ri}`} style={s.genreRowInner}>
                {row.map((g) => (
                  <View key={g.id} style={s.flex1}>
                    <GenreTile
                      genre={g}
                      onPress={() =>
                        router.push({
                          pathname: "/genre/[slug]",
                          params: { slug: g.id },
                        })
                      }
                    />
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* Recommendations */}
        {recommended.length > 0 && (
          <View style={s.section}>
            <View style={s.padH}>
              <SectionHeader title="Đề xuất cho bạn" />
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={s.movieRow}
            >
              {recommended.map((m) => (
                <MovieCard key={m.slug} movie={m} />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Popular list */}
        {popular.length > 0 && (
          <View style={[s.section, s.padH]}>
            <SectionHeader title="Phổ biến nhất" />
            {popular.map((m, i) => (
              <PopularRow key={m.slug} movie={m} index={i + 1} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  scroll: { flex: 1 },
  flex1: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 4,
    gap: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 16, fontWeight: "700", color: "#FFFFFF" },
  greeting: { fontSize: 16, fontWeight: "700" },
  subGreeting: { fontSize: 12 },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  padH: { paddingHorizontal: 20 },
  section: { marginBottom: 24 },
  pillScroll: { marginVertical: 20 },
  pillRow: { paddingHorizontal: 20, gap: 8, flexDirection: "row" },
  movieRow: { paddingHorizontal: 20, flexDirection: "row" },
  continueRow: { flexDirection: "row", gap: 14 },
  continueCard: { width: 200, flexShrink: 0 },
  continuePoster: {
    width: 200,
    height: 112,
    borderRadius: 12,
    overflow: "hidden",
  },
  progressBg: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  progressFill: { height: "100%", borderRadius: 9999 },
  progressBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  progressText: { color: "#FFFFFF", fontSize: 10, fontWeight: "600" },
  continueTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 8,
  },
  continueMeta: { fontSize: 11, marginTop: 2 },
  genreRow: { gap: 10 },
  genreRowInner: { flexDirection: "row", gap: 10 },
});

import type { Movie } from "@/types";
import { useTheme } from "@hooks/useTheme";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
interface Props {
  movie: Movie;
  width?: number;
}

export function MovieCard({ movie, width = 148 }: Props) {
  const height = Math.round(width * 1.48);
  const theme = useTheme();

  return (
    <Pressable
      style={[s.card, { width }]}
      // onPress={() => router.push({ pathname: '/movie/[slug]', params: { slug: movie.slug } })}
      onPress={() => {
        Toast.show({
          type: "info",
          text1: "chức năng đang phát triển",
          position: "bottom",
        });
      }}
    >
      <View
        style={[s.poster, { width, height, backgroundColor: theme.surface }]}
      >
        <Image
          source={{ uri: movie.thumb_url }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={200}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.6)"]}
          style={[StyleSheet.absoluteFill, { top: "50%" as any }]}
        />
        <View style={s.ratingBadge}>
          <Text style={[s.star, { color: theme.star }]}>★</Text>
          <Text style={s.ratingText}>{movie.quality ?? "HD"}</Text>
        </View>
      </View>
      <Text style={[s.title, { color: theme.text }]} numberOfLines={2}>
        {movie.name}
      </Text>
      <Text style={[s.meta, { color: theme.text2 }]}>{movie.language}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: { flexShrink: 0, marginRight: 12 },
  poster: {
    borderRadius: 12,
    overflow: "hidden",
  },
  ratingBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  star: { fontSize: 10 },
  ratingText: { color: "#FFFFFF", fontSize: 10, fontWeight: "600" },
  title: {
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
    marginTop: 8,
  },
  meta: {
    fontSize: 11,
    marginTop: 3,
  },
});

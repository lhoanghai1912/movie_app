import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import type { Movie } from '@/types'
import { useTheme } from '@hooks/useTheme'

interface Props {
  movie: Movie
  index: number
}

export function PopularRow({ movie, index }: Props) {
  const theme = useTheme()

  return (
    <Pressable
      style={[s.row, { borderBottomColor: theme.line }]}
      onPress={() => router.push({ pathname: '/movie/[slug]', params: { slug: movie.slug } })}
    >
      <View style={[s.thumb, { backgroundColor: theme.surface }]}>
        <Image
          source={{ uri: movie.thumb_url }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={200}
        />
      </View>
      <View style={s.info}>
        <Text style={[s.title, { color: theme.text }]} numberOfLines={1}>{movie.name}</Text>
        <Text style={[s.meta, { color: theme.text2 }]} numberOfLines={1}>
          {movie.category?.[0]} · {movie.language}
        </Text>
        <View style={s.ratingRow}>
          <Text style={[s.star, { color: theme.star }]}>★</Text>
          <Text style={[s.quality, { color: theme.text2 }]}>{movie.quality}</Text>
        </View>
      </View>
      <Text style={[s.dots, { color: theme.text3 }]}>···</Text>
    </Pressable>
  )
}

const s = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  thumb: {
    width: 56,
    height: 72,
    borderRadius: 8,
    overflow: 'hidden',
    flexShrink: 0,
  },
  info: { flex: 1, minWidth: 0 },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  meta: {
    fontSize: 12,
    marginTop: 3,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  star: { fontSize: 11 },
  quality: { fontSize: 11 },
  dots: { fontSize: 16, paddingHorizontal: 8 },
})

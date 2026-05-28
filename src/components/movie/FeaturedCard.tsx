import { Pressable, View, Text, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import type { Movie } from '@/types'
import { useTheme } from '@hooks/useTheme'

interface Props {
  movie: Movie
}

export function FeaturedCard({ movie }: Props) {
  const theme = useTheme()

  return (
    <Pressable
      style={[s.container, { backgroundColor: theme.surface }]}
      onPress={() => router.push({ pathname: '/movie/[slug]', params: { slug: movie.slug } })}
    >
      <Image
        source={{ uri: movie.poster_url || movie.thumb_url }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        transition={200}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.85)']}
        style={[StyleSheet.absoluteFill, { top: '40%' as any }]}
      />
      <View style={s.center}>
        <View style={s.playPill}>
          <View style={s.triangle} />
          <Text style={s.playText}>Xem ngay</Text>
        </View>
      </View>
      <View style={s.bottom}>
        <Text style={s.title} numberOfLines={1}>{movie.name}</Text>
        <Text style={s.sub}>TRAILER CHÍNH THỨC</Text>
      </View>
    </Pressable>
  )
}

const s = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    aspectRatio: 16 / 9,
  },
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 9999,
    paddingHorizontal: 22,
    paddingVertical: 10,
    gap: 8,
  },
  triangle: {
    width: 0,
    height: 0,
    borderTopWidth: 7,
    borderBottomWidth: 7,
    borderLeftWidth: 12,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#0D0D0D',
  },
  playText: {
    color: '#0D0D0D',
    fontWeight: '700',
    fontSize: 14,
  },
  bottom: {
    position: 'absolute',
    bottom: 14,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.2,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  sub: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginTop: 2,
  },
})

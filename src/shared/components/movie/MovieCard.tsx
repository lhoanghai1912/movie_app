import { Pressable, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import type { Movie } from '@shared/types'

interface Props {
  movie: Movie
  width?: number
}

export function MovieCard({ movie, width = 120 }: Props) {
  const height = Math.round(width * 1.5)

  return (
    <Pressable
      style={{ width }}
      onPress={() => router.push({ pathname: '/detail/[slug]', params: { slug: movie.slug } })}
      className="mr-3"
    >
      <View style={{ width, height }} className="rounded-lg overflow-hidden bg-surface-dark">
        <Image
          source={{ uri: movie.thumb_url }}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
          transition={200}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.85)']}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60 }}
        />
        {movie.quality ? (
          <View className="absolute top-1 right-1 bg-primary px-1 rounded">
            <Text className="text-white text-[10px] font-semibold">{movie.quality}</Text>
          </View>
        ) : null}
      </View>
      <Text className="text-white text-xs mt-1" numberOfLines={2}>
        {movie.name}
      </Text>
    </Pressable>
  )
}

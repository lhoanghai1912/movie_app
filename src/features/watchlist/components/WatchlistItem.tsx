import { View, Text, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import type { Movie } from '@shared/types'

interface Props {
  movie: Movie
  onRemove: (id: string) => void
}

export function WatchlistItem({ movie, onRemove }: Props) {
  return (
    <Pressable
      onPress={() => router.push({ pathname: '/detail/[slug]', params: { slug: movie.slug } })}
      className="flex-row items-center bg-surface-dark rounded-xl p-3 mb-3 mx-4"
    >
      <Image
        source={{ uri: movie.thumb_url }}
        style={{ width: 72, height: 108 }}
        className="rounded-lg"
        contentFit="cover"
      />
      <View className="flex-1 ml-3">
        <Text className="text-white font-semibold mb-1" numberOfLines={2}>{movie.name}</Text>
        <Text className="text-[#B3B3B3] text-xs">{movie.quality} • {movie.time}</Text>
      </View>
      <Pressable
        onPress={() => onRemove(movie._id)}
        className="p-2"
        hitSlop={8}
      >
        <MaterialCommunityIcons name="heart-remove" size={22} color="#E50914" />
      </Pressable>
    </Pressable>
  )
}

import { FlatList, Text, View } from 'react-native'
import { MovieCard } from './MovieCard'
import type { Movie } from '@/types'

interface Props {
  title: string
  movies: Movie[]
}

export function MovieRow({ title, movies }: Props) {
  return (
    <View className="mb-6">
      <Text className="text-white font-semibold text-base mb-3 px-4">{title}</Text>
      <FlatList
        data={movies}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => <MovieCard movie={item} />}
      />
    </View>
  )
}

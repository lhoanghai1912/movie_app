import { FlatList } from 'react-native'
import { MovieCard } from '@components/movie'
import type { Movie } from '@/types'

interface Props {
  movies: Movie[]
}

export function SearchResultGrid({ movies }: Props) {
  return (
    <FlatList
      data={movies}
      numColumns={2}
      keyExtractor={(item) => item.slug}
      contentContainerStyle={{ padding: 8 }}
      columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 8 }}
      renderItem={({ item }) => <MovieCard movie={item} width={160} />}
    />
  )
}

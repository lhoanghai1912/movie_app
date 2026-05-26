import { FlatList } from 'react-native'
import { MovieCard } from '@shared/components/movie'
import type { Movie } from '@shared/types'

interface Props {
  movies: Movie[]
}

export function SearchResultGrid({ movies }: Props) {
  return (
    <FlatList
      data={movies}
      numColumns={2}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{ padding: 8 }}
      columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 8 }}
      renderItem={({ item }) => <MovieCard movie={item} width={160} />}
    />
  )
}

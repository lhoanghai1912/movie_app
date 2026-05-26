import { View, Text } from 'react-native'
import { MovieRow } from '@shared/components/movie'
import type { Movie } from '@shared/types'

interface Props {
  movies: Movie[]
}

export function RelatedMovies({ movies }: Props) {
  if (movies.length === 0) return null
  return (
    <View className="mt-4">
      <MovieRow title="Phim liên quan" movies={movies} />
    </View>
  )
}

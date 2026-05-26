import { MovieRow } from '@shared/components/movie'
import type { Movie } from '@shared/types'

interface Props {
  title: string
  movies: Movie[]
}

export function MovieSection({ title, movies }: Props) {
  return <MovieRow title={title} movies={movies} />
}

import { MovieBanner } from '@shared/components/movie'
import type { Movie } from '@shared/types'

interface Props {
  movie: Movie
}

export function Banner({ movie }: Props) {
  return <MovieBanner movie={movie} />
}

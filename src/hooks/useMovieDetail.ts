import { useQuery } from '@tanstack/react-query'
import { movieKeys } from '@configs/react-query'
import { getMovieDetail } from '@api/movie.api'

export function useMovieDetail(slug: string) {
  return useQuery({
    queryKey: movieKeys.detail(slug),
    queryFn: () => getMovieDetail(slug),
    enabled: !!slug,
  })
}

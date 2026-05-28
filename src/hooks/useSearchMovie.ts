import { useQuery } from '@tanstack/react-query'
import { movieKeys } from '@configs/react-query'
import { searchMovies } from '@api/movie.api'

export function useSearchMovie(keyword: string) {
  return useQuery({
    queryKey: movieKeys.search(keyword, 1),
    queryFn: () => searchMovies(keyword, 1),
    enabled: keyword.trim().length > 1,
  })
}

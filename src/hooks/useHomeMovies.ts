import { useQueries } from '@tanstack/react-query'
import { movieKeys } from '@configs/react-query'
import { getNewMovies, getSingleMovies, getSeriesMovies } from '@api/movie.api'

export function useHomeMovies() {
  const results = useQueries({
    queries: [
      { queryKey: movieKeys.newMovies(1), queryFn: () => getNewMovies(1) },
      { queryKey: movieKeys.category('phim-le', 1), queryFn: () => getSingleMovies(1) },
      { queryKey: movieKeys.category('phim-bo', 1), queryFn: () => getSeriesMovies(1) },
    ],
  })

  return {
    newMovies: results[0].data ?? [],
    singleMovies: results[1].data ?? [],
    seriesMovies: results[2].data ?? [],
    isLoading: results.some((r) => r.isLoading),
    isRefetching: results.some((r) => r.isRefetching),
    refetch: () => results.forEach((r) => r.refetch()),
  }
}

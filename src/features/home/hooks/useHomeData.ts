import { useQueries } from '@tanstack/react-query'
import { movieKeys } from '@configs/react-query'
import { homeApi } from '../api'

export function useHomeData() {
  const results = useQueries({
    queries: [
      {
        queryKey: movieKeys.newMovies(1),
        queryFn: () => homeApi.getNewMovies(1),
      },
      {
        queryKey: movieKeys.category('phim-le', 1),
        queryFn: () => homeApi.getSingleMovies(1),
      },
      {
        queryKey: movieKeys.category('phim-bo', 1),
        queryFn: () => homeApi.getSeriesMovies(1),
      },
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

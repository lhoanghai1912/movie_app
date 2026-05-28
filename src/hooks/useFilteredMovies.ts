import { useInfiniteQuery } from '@tanstack/react-query'
import { getByGenre } from '@api/movie.api'

export function useFilteredMovies(slug: string) {
  return useInfiniteQuery({
    queryKey: ['movies', 'genre', slug],
    queryFn: ({ pageParam }) => getByGenre(slug, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { current_page, total_page } = lastPage.paginate
      return current_page < total_page ? current_page + 1 : undefined
    },
    enabled: !!slug,
  })
}

import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  },
})

export const movieKeys = {
  all: ['movies'] as const,
  newMovies: (page: number) => [...movieKeys.all, 'new', page] as const,
  category: (slug: string, page: number) => [...movieKeys.all, 'category', slug, page] as const,
  detail: (slug: string) => [...movieKeys.all, 'detail', slug] as const,
  search: (q: string, page: number) => [...movieKeys.all, 'search', q, page] as const,
}

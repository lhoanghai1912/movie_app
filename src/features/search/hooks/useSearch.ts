import { useQuery } from '@tanstack/react-query'
import { movieKeys } from '@configs/react-query'
import { searchApi } from '../api'

export function useSearch(keyword: string) {
  return useQuery({
    queryKey: movieKeys.search(keyword, 1),
    queryFn: () => searchApi.search(keyword, 1),
    enabled: keyword.trim().length > 1,
  })
}

import { useQuery } from '@tanstack/react-query'
import { movieKeys } from '@configs/react-query'
import { detailApi } from '../api'

export function useDetailData(slug: string) {
  return useQuery({
    queryKey: movieKeys.detail(slug),
    queryFn: () => detailApi.getDetail(slug),
    enabled: !!slug,
  })
}

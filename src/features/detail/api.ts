import { movieService } from '@shared/services'

export const detailApi = {
  getDetail: (slug: string) =>
    movieService.getDetail(slug).then((r) => r.data),
}

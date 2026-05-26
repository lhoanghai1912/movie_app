import { movieService } from '@shared/services'

export const searchApi = {
  search: (keyword: string, page = 1) =>
    movieService.search(keyword, page).then((r) => r.data.items),
}

import { movieService } from '@shared/services'

export const homeApi = {
  getNewMovies: (page = 1) => movieService.getNewMovies(page).then((r) => r.data.items),
  getSingleMovies: (page = 1) => movieService.getByCategory('phim-le', page).then((r) => r.data.items),
  getSeriesMovies: (page = 1) => movieService.getByCategory('phim-bo', page).then((r) => r.data.items),
}

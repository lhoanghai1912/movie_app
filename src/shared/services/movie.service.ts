import { http } from './axios'
import type { ApiListResponse, ApiDetailResponse } from '@shared/types'

export const movieService = {
  getNewMovies: (page = 1) =>
    http.get<ApiListResponse>(`/films/phim-moi-cap-nhat?page=${page}`),

  getByCategory: (slug: string, page = 1) =>
    http.get<ApiListResponse>(`/films/the-loai/${slug}?page=${page}`),

  getDetail: (slug: string) =>
    http.get<ApiDetailResponse>(`/film/${slug}`),

  search: (keyword: string, page = 1) =>
    http.get<ApiListResponse>(`/films/tim-kiem?keyword=${encodeURIComponent(keyword)}&page=${page}`),
}

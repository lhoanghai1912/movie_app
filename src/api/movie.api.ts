import { http } from './axios'
import type { ApiListResponse, ApiDetailResponse } from '@/types'
import { ENDPOINTS } from './endpoints'

export const getNewMovies = (page = 1) =>
  http.get<ApiListResponse>(ENDPOINTS.newMovies(page)).then((r) => r.data.items)

export const getSingleMovies = (page = 1) =>
  http.get<ApiListResponse>(ENDPOINTS.byCategory('phim-le', page)).then((r) => r.data.items)

export const getSeriesMovies = (page = 1) =>
  http.get<ApiListResponse>(ENDPOINTS.byCategory('phim-bo', page)).then((r) => r.data.items)

export const getByGenre = (slug: string, page = 1) =>
  http.get<ApiListResponse>(ENDPOINTS.byCategory(slug, page)).then((r) => r.data)

export const getMovieDetail = (slug: string) =>
  http.get<ApiDetailResponse>(ENDPOINTS.detail(slug)).then((r) => r.data)

export const searchMovies = (keyword: string, page = 1) =>
  http.get<ApiListResponse>(ENDPOINTS.search(keyword, page)).then((r) => r.data.items)

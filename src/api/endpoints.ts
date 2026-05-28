export const ENDPOINTS = {
  newMovies: (page = 1) => `/films/phim-moi-cap-nhat?page=${page}`,
  byCategory: (slug: string, page = 1) => `/films/the-loai/${slug}?page=${page}`,
  detail: (slug: string) => `/film/${slug}`,
  search: (keyword: string, page = 1) => `/films/tim-kiem?keyword=${encodeURIComponent(keyword)}&page=${page}`,
} as const

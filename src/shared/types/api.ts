import type { Movie, EpisodeServer } from './movie'

export interface ApiListResponse {
  status: string
  paginate: {
    total_items: number
    current_page: number
    total_pages: number
  }
  items: Movie[]
}

export interface ApiDetailResponse {
  status: string
  film: Movie
  episodes: EpisodeServer[]
}

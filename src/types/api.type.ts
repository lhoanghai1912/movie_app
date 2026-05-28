import type { Movie, EpisodeServer } from './movie.type'

export interface ApiListResponse {
  status: string
  paginate: {
    total_items: number
    current_page: number
    total_page: number
    items_per_page: number
  }
  items: Movie[]
}

export interface ApiDetailResponse {
  status: string
  film: Movie
  episodes: EpisodeServer[]
}

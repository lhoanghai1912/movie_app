export interface Movie {
  _id: string
  name: string
  slug: string
  original_name: string
  thumb_url: string
  poster_url: string
  description: string
  total_episodes: number
  current_episode: string
  time: string
  quality: 'HD' | 'FHD' | 'CAM' | string
  language: string
  category: string[]
  casts: string
}

export interface Episode {
  name: string
  slug: string
  embed: string
  m3u8: string
}

export interface EpisodeServer {
  server_name: string
  items: Episode[]
}

export interface MovieDetail {
  film: Movie
  episodes: EpisodeServer[]
}

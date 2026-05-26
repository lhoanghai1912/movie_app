export const ROUTES = {
  HOME: '/',
  SEARCH: '/search',
  WATCHLIST: '/watchlist',
  PROFILE: '/profile',
  DETAIL: (slug: string) => `/detail/${slug}` as const,
  PLAYER: (slug: string) => `/player/${slug}` as const,
} as const

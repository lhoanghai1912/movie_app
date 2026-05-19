import { DefaultMovieTheme, MovieTheme, MovieThemes, MovieThemeKey } from '@/constants/theme';

// Replace with Zustand theme store when store is set up (Phase 4)
// For now: returns default theme
export function useMovieTheme(): MovieTheme {
  const key: MovieThemeKey = DefaultMovieTheme;
  return MovieThemes[key];
}

export function getTheme(key: MovieThemeKey): MovieTheme {
  return MovieThemes[key];
}

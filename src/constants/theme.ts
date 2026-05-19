import '@/global.css';

import { Platform } from 'react-native';

// ---------------------------------------------------------------------------
// Base color palette (legacy — kept for existing ThemedText/ThemedView)
// ---------------------------------------------------------------------------

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

// ---------------------------------------------------------------------------
// Movie App Design System
// ---------------------------------------------------------------------------

export type MovieThemeKey = 'cinema' | 'ocean' | 'purple' | 'amber';

export interface MovieTheme {
  name: string;
  // Surfaces
  background: string;
  surface: string;
  card: string;
  overlay: string;
  // Text
  text: string;
  textSecondary: string;
  textMuted: string;
  // Accent
  accent: string;
  accentDim: string;
  // Semantic
  success: string;
  warning: string;
  error: string;
  // Borders
  border: string;
  // Tab bar / header
  tabBar: string;
  header: string;
  // Skeleton shimmer base
  skeleton: string;
  skeletonHighlight: string;
  // Rating
  star: string;
}

// ---------------------------------------------------------------------------
// Theme: Cinema Dark  (Netflix-style — default)
// ---------------------------------------------------------------------------
export const CinemaDark: MovieTheme = {
  name: 'Cinema Dark',
  background:        '#0A0A0F',
  surface:           '#141418',
  card:              '#1E1E28',
  overlay:           'rgba(10,10,15,0.85)',
  text:              '#FFFFFF',
  textSecondary:     '#A0A0B4',
  textMuted:         '#5C5C72',
  accent:            '#E63946',
  accentDim:         '#8B1E25',
  success:           '#2ECC71',
  warning:           '#F39C12',
  error:             '#E74C3C',
  border:            '#2A2A38',
  tabBar:            '#0E0E14',
  header:            '#0E0E14',
  skeleton:          '#1E1E28',
  skeletonHighlight: '#2E2E40',
  star:              '#F5C518',
};

// ---------------------------------------------------------------------------
// Theme: Ocean Night  (Prime Video-style, blue tones)
// ---------------------------------------------------------------------------
export const OceanNight: MovieTheme = {
  name: 'Ocean Night',
  background:        '#070D1A',
  surface:           '#0E1828',
  card:              '#162438',
  overlay:           'rgba(7,13,26,0.85)',
  text:              '#EEF6FF',
  textSecondary:     '#7AA3C0',
  textMuted:         '#3E607A',
  accent:            '#4ECDC4',
  accentDim:         '#235E5A',
  success:           '#27AE60',
  warning:           '#F0A500',
  error:             '#E74C3C',
  border:            '#1A3050',
  tabBar:            '#090F1E',
  header:            '#090F1E',
  skeleton:          '#162438',
  skeletonHighlight: '#1E3252',
  star:              '#F5C518',
};

// ---------------------------------------------------------------------------
// Theme: Purple Haze  (HBO Max-style, premium feel)
// ---------------------------------------------------------------------------
export const PurpleHaze: MovieTheme = {
  name: 'Purple Haze',
  background:        '#08080F',
  surface:           '#10101C',
  card:              '#18182C',
  overlay:           'rgba(8,8,15,0.85)',
  text:              '#F0EEFF',
  textSecondary:     '#9080BF',
  textMuted:         '#4A4068',
  accent:            '#9B5DE5',
  accentDim:         '#4A2080',
  success:           '#2ECC71',
  warning:           '#F39C12',
  error:             '#E74C3C',
  border:            '#201E38',
  tabBar:            '#0C0C18',
  header:            '#0C0C18',
  skeleton:          '#18182C',
  skeletonHighlight: '#24224A',
  star:              '#F5C518',
};

// ---------------------------------------------------------------------------
// Theme: Amber Noir  (warm dark, cinematic editorial feel)
// ---------------------------------------------------------------------------
export const AmberNoir: MovieTheme = {
  name: 'Amber Noir',
  background:        '#0D0A06',
  surface:           '#1A1409',
  card:              '#251E10',
  overlay:           'rgba(13,10,6,0.85)',
  text:              '#FFF8F0',
  textSecondary:     '#B09070',
  textMuted:         '#604830',
  accent:            '#F4A261',
  accentDim:         '#7A4820',
  success:           '#2ECC71',
  warning:           '#F0A500',
  error:             '#E74C3C',
  border:            '#302418',
  tabBar:            '#100C06',
  header:            '#100C06',
  skeleton:          '#251E10',
  skeletonHighlight: '#352C18',
  star:              '#F5C518',
};

export const MovieThemes: Record<MovieThemeKey, MovieTheme> = {
  cinema: CinemaDark,
  ocean:  OceanNight,
  purple: PurpleHaze,
  amber:  AmberNoir,
};

export const DefaultMovieTheme: MovieThemeKey = 'cinema';

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

export const FontSize = {
  xs:   10,
  sm:   12,
  base: 14,
  md:   16,
  lg:   18,
  xl:   20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 40,
} as const;

export const FontWeight = {
  regular:   '400',
  medium:    '500',
  semibold:  '600',
  bold:      '700',
  extrabold: '800',
} as const;

export const LineHeight = {
  tight:   1.2,
  normal:  1.4,
  relaxed: 1.6,
} as const;

// ---------------------------------------------------------------------------
// Spacing (4pt scale)
// ---------------------------------------------------------------------------

export const Spacing = {
  half:  2,
  one:   4,
  two:   8,
  three: 16,
  four:  24,
  five:  32,
  six:   64,
} as const;

// ---------------------------------------------------------------------------
// Border radius
// ---------------------------------------------------------------------------

export const Radius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

// ---------------------------------------------------------------------------
// Movie card dimensions
// ---------------------------------------------------------------------------

export const CardSize = {
  poster: {
    width:  120,
    height: 180,
  },
  wide: {
    width:  200,
    height: 112,  // 16:9
  },
  episode: {
    width:  72,
    height: 72,
  },
} as const;

export const HeroBannerRatio = 9 / 16;  // 56.25vw

// ---------------------------------------------------------------------------
// Platform-specific fonts
// ---------------------------------------------------------------------------

export const Fonts = Platform.select({
  ios: {
    sans:    'system-ui',
    serif:   'ui-serif',
    rounded: 'ui-rounded',
    mono:    'ui-monospace',
  },
  default: {
    sans:    'normal',
    serif:   'serif',
    rounded: 'normal',
    mono:    'monospace',
  },
  web: {
    sans:    'var(--font-display)',
    serif:   'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono:    'var(--font-mono)',
  },
});

// ---------------------------------------------------------------------------
// Layout constants
// ---------------------------------------------------------------------------

export const BottomTabInset  = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
export const HorizontalPad   = Spacing.three;  // 16px screen edge padding

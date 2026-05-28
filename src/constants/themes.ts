export type ThemeKey = 'purple' | 'amber' | 'mono' | 'silk'

export interface AppTheme {
  key: ThemeKey
  label: string
  swatch: string
  bg: string
  surface: string
  surface2: string
  text: string
  text2: string
  text3: string
  accent: string
  accentAlt: string
  accentGradient: readonly [string, string]
  line: string
  star: string
}

export const THEMES: Record<ThemeKey, AppTheme> = {
  purple: {
    key: 'purple', label: 'Tím', swatch: '#7B61FF',
    bg: '#0D0D0D', surface: '#1A1A1A', surface2: '#242424',
    text: '#FFFFFF', text2: '#9CA3AF', text3: '#6B7280',
    accent: '#7B61FF', accentAlt: '#9747FF',
    accentGradient: ['#7B61FF', '#9747FF'],
    line: '#2A2A2A', star: '#F5C518',
  },
  amber: {
    key: 'amber', label: 'Hổ Phách', swatch: '#D4A04D',
    bg: '#0B0907', surface: '#16120D', surface2: '#1F1A12',
    text: '#EDE5D6', text2: '#998877', text3: '#5C534A',
    accent: '#D4A04D', accentAlt: '#C08C38',
    accentGradient: ['#D4A04D', '#C08C38'],
    line: '#2A2218', star: '#D4A04D',
  },
  mono: {
    key: 'mono', label: 'Nguyệt', swatch: '#888888',
    bg: '#0A0A0A', surface: '#141414', surface2: '#1C1C1C',
    text: '#F2F2F0', text2: '#888888', text3: '#555555',
    accent: '#888888', accentAlt: '#666666',
    accentGradient: ['#888888', '#555555'],
    line: '#2A2A2A', star: '#CCCCCC',
  },
  silk: {
    key: 'silk', label: 'Lụa', swatch: '#8E2C2C',
    bg: '#F4EFE6', surface: '#EAE3D5', surface2: '#DCD3BF',
    text: '#1A1612', text2: '#6B5F50', text3: '#998C7A',
    accent: '#8E2C2C', accentAlt: '#7A2020',
    accentGradient: ['#8E2C2C', '#7A2020'],
    line: '#C9BFAD', star: '#8E2C2C',
  },
}

export const THEME_LIST: AppTheme[] = Object.values(THEMES)

import { THEMES } from '@constants/themes'
import { useThemeStore } from '@store/theme.store'

export function useTheme() {
  const { themeKey } = useThemeStore()
  return THEMES[themeKey]
}

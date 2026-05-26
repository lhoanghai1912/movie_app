import { useThemeStore } from '@shared/stores'
import { colors } from '@configs/theme'

export function useTheme() {
  const { isDark } = useThemeStore()
  return {
    isDark,
    colors: {
      ...colors,
      bg: isDark ? colors.background.dark : colors.background.light,
      surface: isDark ? colors.surface.dark : colors.surface.light,
    },
  }
}

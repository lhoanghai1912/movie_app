import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { ThemeKey } from '@constants/themes'

interface ThemeStore {
  themeKey: ThemeKey
  setTheme: (key: ThemeKey) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      themeKey: 'purple',
      setTheme: (themeKey) => set({ themeKey }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

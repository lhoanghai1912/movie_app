import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Movie } from '@shared/types'

interface WatchlistStore {
  items: Movie[]
  add: (movie: Movie) => void
  remove: (id: string) => void
  isInWatchlist: (id: string) => boolean
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (movie) =>
        set((s) => ({
          items: s.items.find((m) => m._id === movie._id)
            ? s.items
            : [movie, ...s.items],
        })),
      remove: (id) =>
        set((s) => ({ items: s.items.filter((m) => m._id !== id) })),
      isInWatchlist: (id) => get().items.some((m) => m._id === id),
    }),
    {
      name: 'watchlist-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

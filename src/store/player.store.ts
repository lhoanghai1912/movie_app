import { create } from 'zustand'

interface PlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  isFullscreen: boolean
}

interface PlayerStore extends PlayerState {
  setPlaying: (playing: boolean) => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  setFullscreen: (fullscreen: boolean) => void
  reset: () => void
}

const initial: PlayerState = {
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  isFullscreen: false,
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  ...initial,
  setPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  setFullscreen: (isFullscreen) => set({ isFullscreen }),
  reset: () => set(initial),
}))

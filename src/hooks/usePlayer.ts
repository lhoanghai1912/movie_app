import { useEffect, useCallback } from 'react'
import { useVideoPlayer } from 'expo-video'
import * as ScreenOrientation from 'expo-screen-orientation'
import { usePlayerStore } from '@store/player.store'

export function usePlayer(uri: string) {
  const { setPlaying, setFullscreen, isFullscreen } = usePlayerStore()

  const player = useVideoPlayer(uri ? { uri } : null, (p) => {
    p.loop = false
  })

  // Replace source when uri changes (next episode)
  useEffect(() => {
    if (!uri) return
    player.replace({ uri })
    player.play()
    setPlaying(true)
  }, [uri]) // eslint-disable-line react-hooks/exhaustive-deps

  const togglePlay = useCallback(() => {
    if (player.playing) {
      player.pause()
      setPlaying(false)
    } else {
      player.play()
      setPlaying(true)
    }
  }, [player, setPlaying])

  const seek = useCallback((seconds: number) => {
    player.seekBy(seconds)
  }, [player])

  const toggleFullscreen = useCallback(async () => {
    if (isFullscreen) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
    }
    setFullscreen(!isFullscreen)
  }, [isFullscreen, setFullscreen])

  return { player, togglePlay, seek, toggleFullscreen }
}

import { useRef, useCallback } from 'react'
import { type AVPlaybackStatus, type Video } from 'expo-av'
import * as ScreenOrientation from 'expo-screen-orientation'
import { usePlayerStore } from '../store'

export function usePlayer() {
  const videoRef = useRef<Video>(null)
  const { setPlaying, setCurrentTime, setDuration, setFullscreen, isPlaying } = usePlayerStore()

  const onPlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (!status.isLoaded) return
    setPlaying(status.isPlaying)
    setCurrentTime(status.positionMillis / 1000)
    if (status.durationMillis) setDuration(status.durationMillis / 1000)
  }, [setPlaying, setCurrentTime, setDuration])

  const togglePlay = useCallback(async () => {
    if (!videoRef.current) return
    if (isPlaying) {
      await videoRef.current.pauseAsync()
    } else {
      await videoRef.current.playAsync()
    }
  }, [isPlaying])

  const seek = useCallback(async (seconds: number) => {
    const status = await videoRef.current?.getStatusAsync()
    if (!status?.isLoaded) return
    const newPos = Math.max(0, status.positionMillis + seconds * 1000)
    await videoRef.current?.setPositionAsync(newPos)
  }, [])

  const toggleFullscreen = useCallback(async (isFullscreen: boolean) => {
    if (isFullscreen) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    }
    setFullscreen(!isFullscreen)
  }, [setFullscreen])

  return { videoRef, onPlaybackStatusUpdate, togglePlay, seek, toggleFullscreen }
}

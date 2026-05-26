import { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Video, ResizeMode } from 'expo-av'
import * as ScreenOrientation from 'expo-screen-orientation'
import { Loading } from '@shared/components/ui'
import { useDetailData } from '@features/detail'
import { usePlayer } from './hooks/usePlayer'
import { usePlayerStore } from './store'
import { PlayerControls } from './components/PlayerControls'

interface Props {
  slug: string
  serverIndex?: number
  episodeIndex?: number
}

export function PlayerScreen({ slug, serverIndex = 0, episodeIndex = 0 }: Props) {
  const [activeEpisode, setActiveEpisode] = useState(episodeIndex)
  const { data, isLoading } = useDetailData(slug)
  const { videoRef, onPlaybackStatusUpdate, togglePlay, seek, toggleFullscreen } = usePlayer()
  const { isFullscreen, reset } = usePlayerStore()

  useEffect(() => {
    return () => {
      reset()
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    }
  }, [reset])

  if (isLoading) return <Loading />
  if (!data) return null

  const episodes = data.episodes[serverIndex]?.items ?? []
  const current = episodes[activeEpisode]

  const handleNextEpisode = () => {
    setActiveEpisode((i) => Math.min(i + 1, episodes.length - 1))
  }

  return (
    <View className="flex-1 bg-black">
      <Video
        ref={videoRef}
        source={{ uri: current?.m3u8 ?? '' }}
        style={{ width: '100%', aspectRatio: 16 / 9 }}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
      />
      <PlayerControls
        movieName={data.film.name}
        currentEpisodeName={current?.name ?? ''}
        onTogglePlay={togglePlay}
        onSeek={seek}
        onToggleFullscreen={() => toggleFullscreen(isFullscreen)}
        onNextEpisode={handleNextEpisode}
        hasNext={activeEpisode < episodes.length - 1}
      />
    </View>
  )
}

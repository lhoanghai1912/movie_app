import { useState, useEffect } from 'react'
import { View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { VideoView } from 'expo-video'
import * as ScreenOrientation from 'expo-screen-orientation'
import { Loading } from '@components/ui'
import { PlayerControls } from '@components/player'
import { useMovieDetail } from '@hooks/useMovieDetail'
import { usePlayer } from '@hooks/usePlayer'
import { usePlayerStore } from '@store/player.store'

export default function WatchPage() {
  const { slug, server, episode } = useLocalSearchParams<{
    slug: string
    server?: string
    episode?: string
  }>()
  const serverIndex = server ? parseInt(server, 10) : 0
  const episodeIndex = episode ? parseInt(episode, 10) : 0

  const [activeEpisode, setActiveEpisode] = useState(episodeIndex)
  const { data, isLoading } = useMovieDetail(slug)
  const episodes = data?.episodes[serverIndex]?.items ?? []
  const current = episodes[activeEpisode]

  const { player, togglePlay, seek, toggleFullscreen } = usePlayer(current?.m3u8 ?? '')
  const { isFullscreen, reset } = usePlayerStore()

  useEffect(() => {
    return () => {
      reset()
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    }
  }, [reset])

  const handleNextEpisode = () => {
    setActiveEpisode((i) => Math.min(i + 1, episodes.length - 1))
  }

  if (isLoading) return <Loading />
  if (!data) return null

  return (
    <View className="flex-1 bg-black">
      <VideoView
        player={player}
        style={{ width: '100%', aspectRatio: 16 / 9 }}
        contentFit="contain"
        nativeControls={false}
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

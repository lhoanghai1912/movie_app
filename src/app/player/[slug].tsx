import { useLocalSearchParams } from 'expo-router'
import { PlayerScreen } from '@features/player'

export default function PlayerPage() {
  const { slug, server, episode } = useLocalSearchParams<{
    slug: string
    server?: string
    episode?: string
  }>()
  return (
    <PlayerScreen
      slug={slug}
      serverIndex={server ? parseInt(server, 10) : 0}
      episodeIndex={episode ? parseInt(episode, 10) : 0}
    />
  )
}

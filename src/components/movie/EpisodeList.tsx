import { View, Text, Pressable, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import type { EpisodeServer } from '@/types'

interface Props {
  servers: EpisodeServer[]
  activeServer: number
  activeEpisode: number
  onSelect: (serverIndex: number, episodeIndex: number) => void
}

export function EpisodeList({ servers, activeServer, activeEpisode, onSelect }: Props) {
  const { t } = useTranslation()
  const server = servers[activeServer]

  return (
    <View className="px-4 pb-6">
      <Text className="text-white font-semibold text-base mb-3">{t('detail.episodes')}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
        <View className="flex-row gap-2">
          {servers.map((s, i) => (
            <Pressable
              key={s.server_name}
              onPress={() => onSelect(i, 0)}
              className={`px-3 py-1.5 rounded-lg ${activeServer === i ? 'bg-primary' : 'bg-surface-dark'}`}
            >
              <Text className="text-white text-xs">{s.server_name}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View className="flex-row flex-wrap gap-2">
        {server?.items.map((ep, i) => (
          <Pressable
            key={ep.slug}
            onPress={() => onSelect(activeServer, i)}
            className={`w-14 h-10 items-center justify-center rounded-lg ${
              activeEpisode === i ? 'bg-primary' : 'bg-surface-dark'
            }`}
          >
            <Text className="text-white text-xs">{ep.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

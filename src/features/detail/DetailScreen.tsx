import { useState } from 'react'
import { ScrollView, View, Pressable, Text } from 'react-native'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { Loading } from '@shared/components/ui'
import { useWatchlistStore } from '@shared/stores'
import { SIZES } from '@constants/sizes'
import { useDetailData } from './hooks/useDetailData'
import { MovieInfo } from './components/MovieInfo'
import { EpisodeList } from './components/EpisodeList'

interface Props {
  slug: string
}

export function DetailScreen({ slug }: Props) {
  const [activeServer, setActiveServer] = useState(0)
  const [activeEpisode, setActiveEpisode] = useState(0)
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()
  const { data, isLoading } = useDetailData(slug)
  const { add, remove, isInWatchlist } = useWatchlistStore()

  if (isLoading) return <Loading />
  if (!data) return null

  const { film, episodes } = data
  const saved = isInWatchlist(film._id)

  const handleWatchNow = () => {
    router.push({
      pathname: '/player/[slug]',
      params: { slug, server: String(activeServer), episode: String(activeEpisode) },
    })
  }

  const handleToggleWatchlist = () => {
    saved ? remove(film._id) : add(film)
  }

  return (
    <ScrollView
      style={{ backgroundColor: '#141414' }}
      contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
    >
      <View style={{ height: SIZES.BANNER_HEIGHT * 0.7 }}>
        <Image
          source={{ uri: film.poster_url || film.thumb_url }}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
        />
        <View
          className="absolute"
          style={{ top: insets.top + 8, left: 16 }}
        >
          <Pressable
            onPress={() => router.back()}
            className="bg-black/50 p-2 rounded-full"
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </Pressable>
        </View>
      </View>

      <MovieInfo movie={film} />

      <View className="flex-row gap-3 px-4 mb-6">
        <Pressable
          onPress={handleWatchNow}
          className="flex-1 bg-primary rounded-lg py-3 items-center"
        >
          <Text className="text-white font-semibold">{t('detail.watchNow')}</Text>
        </Pressable>
        <Pressable
          onPress={handleToggleWatchlist}
          className="bg-surface-dark rounded-lg py-3 px-4 items-center"
        >
          <MaterialCommunityIcons
            name={saved ? 'heart' : 'heart-outline'}
            size={24}
            color={saved ? '#E50914' : '#fff'}
          />
        </Pressable>
      </View>

      {episodes.length > 0 && (
        <EpisodeList
          servers={episodes}
          activeServer={activeServer}
          activeEpisode={activeEpisode}
          onSelect={(s, e) => { setActiveServer(s); setActiveEpisode(e) }}
        />
      )}
    </ScrollView>
  )
}

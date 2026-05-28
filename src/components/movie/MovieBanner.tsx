import { Pressable, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { SIZES } from '@constants/sizes'
import type { Movie } from '@/types'

interface Props {
  movie: Movie
}

export function MovieBanner({ movie }: Props) {
  const { t } = useTranslation()

  return (
    <View style={{ height: SIZES.BANNER_HEIGHT }} className="relative">
      <Image
        source={{ uri: movie.poster_url || movie.thumb_url }}
        style={{ width: '100%', height: '100%' }}
        contentFit="cover"
      />
      <LinearGradient
        colors={['transparent', '#141414']}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200 }}
      />
      <View className="absolute bottom-6 left-4 right-4">
        <Text className="text-white text-2xl font-bold mb-1" numberOfLines={2}>
          {movie.name}
        </Text>
        <Text className="text-[#B3B3B3] text-sm mb-4" numberOfLines={1}>
          {movie.original_name}
        </Text>
        <Pressable
          onPress={() => router.push({ pathname: '/movie/[slug]', params: { slug: movie.slug } })}
          className="bg-primary rounded-lg py-2 px-6 self-start"
        >
          <Text className="text-white font-semibold">{t('home.watchNow')}</Text>
        </Pressable>
      </View>
    </View>
  )
}

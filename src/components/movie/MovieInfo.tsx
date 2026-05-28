import { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { useTranslation } from 'react-i18next'
import type { Movie } from '@/types'

interface Props {
  movie: Movie
}

export function MovieInfo({ movie }: Props) {
  const [expanded, setExpanded] = useState(false)
  const { t } = useTranslation()

  return (
    <View className="px-4 py-4">
      <Text className="text-white text-2xl font-bold mb-1">{movie.name}</Text>
      <Text className="text-[#B3B3B3] text-sm mb-2">{movie.original_name}</Text>

      <View className="flex-row flex-wrap gap-2 mb-3">
        {movie.quality ? (
          <View className="bg-primary px-2 py-0.5 rounded">
            <Text className="text-white text-xs font-semibold">{movie.quality}</Text>
          </View>
        ) : null}
        <Text className="text-[#B3B3B3] text-xs self-center">{movie.time}</Text>
        <Text className="text-[#B3B3B3] text-xs self-center">{movie.language}</Text>
      </View>

      <Pressable onPress={() => setExpanded((v) => !v)}>
        <Text className="text-white text-sm leading-5" numberOfLines={expanded ? undefined : 3}>
          {movie.description}
        </Text>
        <Text className="text-primary text-xs mt-1">
          {expanded ? 'Thu gọn' : 'Xem thêm'}
        </Text>
      </Pressable>

      {movie.casts ? (
        <Text className="text-[#B3B3B3] text-xs mt-3">
          {t('detail.cast')}: {movie.casts}
        </Text>
      ) : null}
    </View>
  )
}

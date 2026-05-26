import { View, Pressable, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { usePlayerStore } from '../store'
import { ProgressBar } from './ProgressBar'

interface Props {
  movieName: string
  currentEpisodeName: string
  onTogglePlay: () => void
  onSeek: (seconds: number) => void
  onToggleFullscreen: () => void
  onNextEpisode: () => void
  hasNext: boolean
}

export function PlayerControls({
  movieName,
  currentEpisodeName,
  onTogglePlay,
  onSeek,
  onToggleFullscreen,
  onNextEpisode,
  hasNext,
}: Props) {
  const { isPlaying, currentTime, duration, isFullscreen } = usePlayerStore()
  const { t } = useTranslation()

  return (
    <View className="absolute inset-0 bg-black/40 justify-between">
      <View className="flex-row items-center p-4 gap-3">
        <Pressable onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </Pressable>
        <View className="flex-1">
          <Text className="text-white font-semibold text-sm" numberOfLines={1}>{movieName}</Text>
          <Text className="text-white/70 text-xs">{currentEpisodeName}</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-center gap-8">
        <Pressable onPress={() => onSeek(-10)}>
          <MaterialCommunityIcons name="rewind-10" size={36} color="#fff" />
        </Pressable>
        <Pressable onPress={onTogglePlay}>
          <MaterialCommunityIcons
            name={isPlaying ? 'pause-circle' : 'play-circle'}
            size={56}
            color="#fff"
          />
        </Pressable>
        <Pressable onPress={() => onSeek(10)}>
          <MaterialCommunityIcons name="fast-forward-10" size={36} color="#fff" />
        </Pressable>
      </View>

      <View>
        <ProgressBar currentTime={currentTime} duration={duration} />
        <View className="flex-row justify-between items-center px-4 pb-4">
          {hasNext ? (
            <Pressable onPress={onNextEpisode} className="flex-row items-center gap-1">
              <MaterialCommunityIcons name="skip-next" size={20} color="#fff" />
              <Text className="text-white text-xs">{t('player.nextEpisode')}</Text>
            </Pressable>
          ) : <View />}
          <Pressable onPress={onToggleFullscreen}>
            <MaterialCommunityIcons
              name={isFullscreen ? 'fullscreen-exit' : 'fullscreen'}
              size={24}
              color="#fff"
            />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

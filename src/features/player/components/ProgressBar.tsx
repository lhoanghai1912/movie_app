import { View, Text } from 'react-native'
import { formatTime } from '@shared/utils/formatTime'

interface Props {
  currentTime: number
  duration: number
}

export function ProgressBar({ currentTime, duration }: Props) {
  const progress = duration > 0 ? currentTime / duration : 0

  return (
    <View className="px-4 mb-2">
      <View className="h-1 bg-white/20 rounded-full overflow-hidden">
        <View className="h-full bg-primary rounded-full" style={{ width: `${progress * 100}%` }} />
      </View>
      <View className="flex-row justify-between mt-1">
        <Text className="text-white/70 text-xs">{formatTime(currentTime)}</Text>
        <Text className="text-white/70 text-xs">{formatTime(duration)}</Text>
      </View>
    </View>
  )
}

import { ActivityIndicator, View } from 'react-native'

interface Props {
  size?: 'small' | 'large'
  color?: string
}

export function Loading({ size = 'large', color = '#E50914' }: Props) {
  return (
    <View className="flex-1 items-center justify-center bg-background-dark">
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

import { View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'

interface Props {
  message?: string
}

export function Empty({ message }: Props) {
  const { t } = useTranslation()
  return (
    <View className="flex-1 items-center justify-center py-16">
      <Text className="text-4xl mb-4">🎬</Text>
      <Text className="text-[#B3B3B3] text-base text-center">
        {message ?? t('common.empty')}
      </Text>
    </View>
  )
}

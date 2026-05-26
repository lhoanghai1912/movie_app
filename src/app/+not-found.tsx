import { View, Text } from 'react-native'
import { Link } from 'expo-router'

export default function NotFound() {
  return (
    <View className="flex-1 bg-background-dark items-center justify-center">
      <Text className="text-white text-xl mb-4">Trang không tồn tại</Text>
      <Link href={'/' as never} className="text-primary">
        Về trang chủ
      </Link>
    </View>
  )
}

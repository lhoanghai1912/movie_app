import { View, Text, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface Props {
  icon: string
  label: string
  value?: string
  onPress?: () => void
  rightElement?: React.ReactNode
}

export function SettingsItem({ icon, label, value, onPress, rightElement }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center bg-surface-dark rounded-xl px-4 py-4 mb-3"
    >
      <MaterialCommunityIcons name={icon as never} size={22} color="#B3B3B3" />
      <Text className="text-white flex-1 ml-3">{label}</Text>
      {value ? <Text className="text-[#B3B3B3] text-sm mr-2">{value}</Text> : null}
      {rightElement ?? (
        <MaterialCommunityIcons name="chevron-right" size={20} color="#666" />
      )}
    </Pressable>
  )
}

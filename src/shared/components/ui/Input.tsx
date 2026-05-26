import { TextInput, View, type TextInputProps } from 'react-native'

interface Props extends TextInputProps {
  leftIcon?: React.ReactNode
}

export function Input({ leftIcon, style, ...props }: Props) {
  return (
    <View className="flex-row items-center bg-surface-dark rounded-xl px-3">
      {leftIcon}
      <TextInput
        className="flex-1 text-white py-3 px-2 text-base"
        placeholderTextColor="#666"
        {...props}
      />
    </View>
  )
}

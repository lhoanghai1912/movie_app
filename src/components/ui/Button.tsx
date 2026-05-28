import { Pressable, Text, ActivityIndicator } from 'react-native'

interface Props {
  label: string
  onPress: () => void
  variant?: 'primary' | 'outline' | 'ghost'
  loading?: boolean
  disabled?: boolean
}

export function Button({ label, onPress, variant = 'primary', loading, disabled }: Props) {
  const base = 'flex-row items-center justify-center rounded-lg px-4 py-3'
  const variants = {
    primary: 'bg-primary',
    outline: 'border border-primary',
    ghost: 'bg-transparent',
  }
  const textVariants = {
    primary: 'text-white font-semibold',
    outline: 'text-primary font-semibold',
    ghost: 'text-white',
  }

  return (
    <Pressable
      className={`${base} ${variants[variant]} ${disabled ? 'opacity-50' : ''}`}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#E50914'} size="small" />
      ) : (
        <Text className={textVariants[variant]}>{label}</Text>
      )}
    </Pressable>
  )
}

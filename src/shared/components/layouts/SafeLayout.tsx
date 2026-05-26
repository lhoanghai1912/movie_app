import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props {
  children: React.ReactNode
  className?: string
}

export function SafeLayout({ children, className }: Props) {
  const insets = useSafeAreaInsets()
  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className={`flex-1 bg-background-dark ${className ?? ''}`}
    >
      {children}
    </View>
  )
}

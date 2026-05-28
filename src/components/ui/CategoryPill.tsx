import { Pressable, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useTheme } from '@hooks/useTheme'

interface Props {
  label: string
  active: boolean
  onPress: () => void
}

export function CategoryPill({ label, active, onPress }: Props) {
  const theme = useTheme()

  if (active) {
    return (
      <LinearGradient
        colors={theme.accentGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={s.activePill}
      >
        <Pressable onPress={onPress}>
          <Text style={[s.activeLabel, { color: '#FFFFFF' }]}>{label}</Text>
        </Pressable>
      </LinearGradient>
    )
  }

  return (
    <Pressable onPress={onPress} style={[s.inactivePill, { borderColor: theme.line }]}>
      <Text style={[s.inactiveLabel, { color: theme.text2 }]}>{label}</Text>
    </Pressable>
  )
}

const s = StyleSheet.create({
  activePill: {
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 9999,
  },
  inactivePill: {
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 9999,
    borderWidth: 1,
  },
  activeLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  inactiveLabel: {
    fontSize: 13,
  },
})

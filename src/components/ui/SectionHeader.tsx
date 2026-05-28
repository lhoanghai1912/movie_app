import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useTheme } from '@hooks/useTheme'

interface Props {
  title: string
  onSeeAll?: () => void
}

export function SectionHeader({ title, onSeeAll }: Props) {
  const theme = useTheme()

  return (
    <View style={s.row}>
      <Text style={[s.title, { color: theme.text }]}>{title}</Text>
      {onSeeAll && (
        <Pressable onPress={onSeeAll}>
          <Text style={[s.link, { color: theme.accent }]}>Tất cả</Text>
        </Pressable>
      )}
    </View>
  )
}

const s = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  link: {
    fontSize: 13,
    fontWeight: '500',
  },
})

import { Pressable, View, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { hslToHex, type Genre } from '@constants/genres'

interface Props {
  genre: Genre
  onPress?: () => void
}

export function GenreTile({ genre, onPress }: Props) {
  const dark = hslToHex(genre.hue, 35, 20)
  const darker = hslToHex(genre.hue, 22, 10)
  const accent = hslToHex(genre.hue, 60, 45)

  return (
    <Pressable onPress={onPress} style={s.container}>
      <LinearGradient
        colors={[dark, darker]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={[s.circle, { backgroundColor: accent }]} />
      <Text style={s.name}>{genre.name}</Text>
      <Text style={s.count}>{genre.count} phim</Text>
    </Pressable>
  )
}

const s = StyleSheet.create({
  container: {
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 14,
    overflow: 'hidden',
    minHeight: 72,
  },
  circle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    top: -15,
    right: -15,
    opacity: 0.35,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  count: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 4,
  },
})

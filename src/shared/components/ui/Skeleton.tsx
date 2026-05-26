import { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'

interface Props {
  width: number | string
  height: number
  borderRadius?: number
}

export function Skeleton({ width, height, borderRadius = 8 }: Props) {
  const opacity = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    )
    anim.start()
    return () => anim.stop()
  }, [opacity])

  return (
    <Animated.View
      style={[{ height, borderRadius, backgroundColor: '#2a2a2a', opacity }, { width: width as number }]}
    />
  )
}

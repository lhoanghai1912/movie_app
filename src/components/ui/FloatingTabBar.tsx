import { View, Text, Pressable, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useTheme } from '@hooks/useTheme'

const TABS: Record<string, { icon: keyof typeof MaterialCommunityIcons.glyphMap; label: string }> = {
  index:   { icon: 'home',     label: 'Home' },
  search:  { icon: 'magnify',  label: 'Khám phá' },
  library: { icon: 'bookmark', label: 'Thư viện' },
  profile: { icon: 'account',  label: 'Tôi' },
}

export function FloatingTabBar({ state, navigation, insets }: BottomTabBarProps) {
  const pb = insets?.bottom ?? 0
  const theme = useTheme()
  const isLight = theme.key === 'silk'
  const inactiveColor = isLight ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.45)'

  return (
    <View style={[s.wrapper, { paddingBottom: Math.max(pb, 8), backgroundColor: theme.bg }]}>
      <View style={s.pill}>
        {state.routes.map((route, i) => {
          const focused = state.index === i
          const tab = TABS[route.name] ?? {
            icon: 'circle-outline' as keyof typeof MaterialCommunityIcons.glyphMap,
            label: route.name,
          }

          return (
            <Pressable
              key={route.key}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                })
                if (!focused && !event.defaultPrevented) {
                  navigation.navigate(route.name)
                }
              }}
              style={[s.tab, focused && s.tabActive]}
            >
              <MaterialCommunityIcons
                name={tab.icon}
                size={20}
                color={focused ? '#0D0D0D' : inactiveColor}
              />
              {focused && <Text style={s.label}>{tab.label}</Text>}
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingTop: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(22,22,22,0.98)',
    borderRadius: 9999,
    paddingVertical: 8,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
    gap: 2,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 9999,
    paddingVertical: 9,
    paddingHorizontal: 14,
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    gap: 6,
  },
  label: {
    color: '#0D0D0D',
    fontSize: 13,
    fontWeight: '700',
  },
})

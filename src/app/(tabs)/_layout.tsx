import { Tabs } from 'expo-router'
import { FloatingTabBar } from '@components/ui'

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="search" options={{ title: 'Khám phá' }} />
      <Tabs.Screen name="library" options={{ title: 'Thư viện' }} />
      <Tabs.Screen name="profile" options={{ title: 'Tôi' }} />
    </Tabs>
  )
}

import '../../global.css'
import '@i18n'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@configs/react-query'

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#141414' } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="detail/[slug]" />
        <Stack.Screen name="player/[slug]" options={{ presentation: 'fullScreenModal' }} />
      </Stack>
    </QueryClientProvider>
  )
}

import { queryClient } from "@configs/react-query";
import { useTheme } from "@hooks/useTheme";
import "@i18n";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../../global.css";
if (__DEV__) {
  require("@configs/reactotron");
}

function RootStack() {
  const theme = useTheme();
  const isLight = theme.key === "silk";

  return (
    <>
      <StatusBar style={isLight ? "dark" : "light"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.bg },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="movie/[slug]" />
        <Stack.Screen name="genre/[slug]" />
        <Stack.Screen
          name="watch/[slug]"
          options={{ presentation: "fullScreenModal" }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootStack />
    </QueryClientProvider>
  );
}

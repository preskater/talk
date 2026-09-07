import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemeProvider, useThemeContext } from '@/hooks/use-theme';
import { StoreProvider } from '@/store/store';

function RootNavigator() {
  const { isDark } = useThemeContext();
  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="chat/[id]" />
        <Stack.Screen name="contact/[id]" />
        <Stack.Screen name="group/[id]" />
        <Stack.Screen name="space/[id]" />
        <Stack.Screen name="new-chat" options={{ presentation: 'modal' }} />
        <Stack.Screen name="new-group" options={{ presentation: 'modal' }} />
        <Stack.Screen name="search" options={{ presentation: 'modal' }} />
        <Stack.Screen name="settings/index" />
        <Stack.Screen name="settings/privacy" />
        <Stack.Screen name="settings/notifications" />
        <Stack.Screen name="settings/appearance" />
        <Stack.Screen name="settings/storage" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StoreProvider>
        <RootNavigator />
      </StoreProvider>
    </ThemeProvider>
  );
}

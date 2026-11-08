import { ThemeProvider, useBrandFonts } from '@wanderly/ui';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BrandStateProvider, useBrandState } from '../brand';

function ThemedStack() {
  const { brand } = useBrandState();
  return (
    <ThemeProvider brand={brand}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="details" />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const fontsLoaded = useBrandFonts();
  if (!fontsLoaded) return null;
  return (
    <SafeAreaProvider>
      <BrandStateProvider>
        <ThemedStack />
      </BrandStateProvider>
    </SafeAreaProvider>
  );
}

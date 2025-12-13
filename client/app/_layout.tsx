import '@/global.css';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://38c38c4f228b40c73d7a2ec59b631c41@o4510486508273664.ingest.us.sentry.io/4510528275742720',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

const queryClient = new QueryClient();

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export default Sentry.wrap(function RootLayout() {
    const { colorScheme } = useColorScheme();

    return (
        <ClerkProvider tokenCache={tokenCache}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider value={NAV_THEME['light']}>
                    <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
                    <Stack screenOptions={{ headerShown: false }} />
                    <PortalHost />
                </ThemeProvider>
            </QueryClientProvider>
        </ClerkProvider>
    );
});
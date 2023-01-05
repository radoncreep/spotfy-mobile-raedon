import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { OnboardStackNavigator } from './navigation/Onboard';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { onlineManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { appTheme } from './theme';


SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function App() {
  const [ ready, setReady ] = useState<boolean>(false);
  const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
        console.log(error);
      } finally {
        setReady(true);
      }
    }

    load();
  }, []);

  const onLayoutRootView = useCallback(async() => {
    if (ready) await SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NativeBaseProvider theme={appTheme}>
          <View style={styles.container} onLayout={onLayoutRootView}>
            {/* if authenticated then navigate to bottom tab home screen else onboard */}
            <QueryClientProvider client={queryClient}>
              <OnboardStackNavigator />
            </QueryClientProvider>
            <StatusBar style="light" />
          </View>
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

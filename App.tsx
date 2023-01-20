import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { appTheme } from './theme';
import { AuthContextProvider } from './store/Auth.context';
import { Root } from './navigation/Root';
import { queryClient, QueryClientProvider } from './config/queryClient';


if(__DEV__) {
  import('./config/reactotron.config').then(() => console.log('Reactotron Configured'));
}

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [ ready, setReady ] = useState<boolean>(false);


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
            <AuthContextProvider>
              <QueryClientProvider client={queryClient}>
                <Root />
              </QueryClientProvider>
            </AuthContextProvider>
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

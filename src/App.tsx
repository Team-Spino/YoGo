import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { ThemeProvider } from 'styled-components/native';
import { PortalProvider } from '@gorhom/portal';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Main, HandleSchedule, OnBoarding } from 'screens';
import { storage } from 'utils/mmkv';
import { theme } from 'styles/theme';
import { FirstLaunchProvider, PopProvider } from 'context';
import RootStack from './RootState';

function App() {

  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 1000);
  }, []);

  return (
    <FirstLaunchProvider>
      <PortalProvider>
        <PopProvider>
          <ThemeProvider theme={theme}>
            <RootStack />
          </ThemeProvider>
        </PopProvider>
      </PortalProvider>
    </FirstLaunchProvider>
  );
}

export default App;

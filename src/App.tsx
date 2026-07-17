import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { ThemeProvider } from 'styled-components/native';
import { PortalProvider } from '@gorhom/portal';
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

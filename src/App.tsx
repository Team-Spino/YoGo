import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import { ThemeProvider } from 'styled-components/native';
import { PortalProvider } from '@gorhom/portal';
import { theme } from 'styles/theme';
import { FirstLaunchProvider, SelectedDayProvider } from 'context';
import RootStack from './RootState';

function App() {
  useEffect(() => {
    // 네이티브 스플래시(스토리보드)는 리뉴얼 비주얼 단계에서 붙입니다.
    // 그 전까지는 등록된 스플래시가 없어 hide()가 거부될 수 있으니, 조용히
    // 넘어가 처리되지 않은 프라미스 거부가 나지 않도록 합니다.
    BootSplash.hide({ fade: true }).catch(() => {});
  }, []);

  return (
    <FirstLaunchProvider>
      <SelectedDayProvider>
        <PortalProvider>
          <ThemeProvider theme={theme}>
            <RootStack />
          </ThemeProvider>
        </PortalProvider>
      </SelectedDayProvider>
    </FirstLaunchProvider>
  );
}

export default App;

import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { TamaguiProvider } from '@tamagui/core';
import { PortalProvider } from '@gorhom/portal';
import { config } from 'styles/tamagui.config';
import { FirstLaunchProvider, SelectedDayProvider } from 'context';
import RootStack from './RootState';

function App() {
  // 기기 설정(라이트/다크)을 따라갑니다. 색은 컴포넌트가 테마 토큰으로만
  // 참조하므로 여기서 테마만 바꾸면 전체가 자동으로 뒤집힙니다.
  const scheme = useColorScheme();

  useEffect(() => {
    // 네이티브 스플래시(스토리보드)는 리뉴얼 비주얼 단계에서 붙입니다.
    // 그 전까지는 등록된 스플래시가 없어 hide()가 거부될 수 있으니, 조용히
    // 넘어가 처리되지 않은 프라미스 거부가 나지 않도록 합니다.
    BootSplash.hide({ fade: true }).catch(() => {});
  }, []);

  return (
    <TamaguiProvider config={config} defaultTheme={scheme ?? 'light'}>
      <FirstLaunchProvider>
        <SelectedDayProvider>
          <PortalProvider>
            <RootStack />
          </PortalProvider>
        </SelectedDayProvider>
      </FirstLaunchProvider>
    </TamaguiProvider>
  );
}

export default App;

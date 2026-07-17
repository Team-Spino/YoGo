import React, { createContext, useCallback, useMemo, useState } from 'react';
import { storage } from 'utils/mmkv';

interface IisFirstProps {
  children: JSX.Element | Array<JSX.Element>;
}

const FIRST_LAUNCH_KEY = 'FIRST_LAUNCH';

export const FirstLaunchContext = createContext({
  isFirstLaunch: false,
  checkFirstLaunch: () => {
    // Provider 밖에서 쓰면 아무 일도 일어나지 않습니다.
  },
});

export const FirstLaunchProvider = ({ children }: IisFirstProps) => {
  // 저장된 값이 없으면 아직 온보딩을 보지 않은 기기입니다.
  const [isFirstLaunch, setIsFirstLaunch] = useState(
    () => storage.getBoolean(FIRST_LAUNCH_KEY) ?? true,
  );

  const checkFirstLaunch = useCallback(() => {
    setIsFirstLaunch(false);
    storage.set(FIRST_LAUNCH_KEY, false);
  }, []);

  // 값이 매 렌더 새 객체면 소비하는 화면이 전부 따라서 다시 그려집니다.
  const value = useMemo(
    () => ({ isFirstLaunch, checkFirstLaunch }),
    [isFirstLaunch, checkFirstLaunch],
  );

  return (
    <FirstLaunchContext.Provider value={value}>
      {children}
    </FirstLaunchContext.Provider>
  );
};

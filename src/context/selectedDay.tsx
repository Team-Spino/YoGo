import React, { createContext, useCallback, useMemo, useState } from 'react';
import dayjs from 'dayjs';

interface ISelectedDayProps {
  children: JSX.Element | Array<JSX.Element>;
}

/**
 * 달력에서 고른 날짜를 담습니다.
 *
 * 이 값이 홈 화면부터 상세 모달까지 6~7단계를 props로 흘러다녔습니다.
 * 상세 모달은 Portal로 렌더되므로, 이 Provider는 App의 PortalProvider보다
 * 위에 두어야 포털된 화면도 값을 읽습니다.
 */
export const SelectedDayContext = createContext({
  selectedDay: dayjs().format('YYYY-MM-DD'),
  setSelectedDay: (_day: string) => {
    // Provider 밖에서 쓰면 아무 일도 일어나지 않습니다.
  },
});

export const SelectedDayProvider = ({ children }: ISelectedDayProps) => {
  const [selectedDay, setSelectedDayState] = useState(
    dayjs().format('YYYY-MM-DD'),
  );

  const setSelectedDay = useCallback(
    (day: string) => setSelectedDayState(day),
    [],
  );

  const value = useMemo(
    () => ({ selectedDay, setSelectedDay }),
    [selectedDay, setSelectedDay],
  );

  return (
    <SelectedDayContext.Provider value={value}>
      {children}
    </SelectedDayContext.Provider>
  );
};

export const useSelectedDay = () => React.useContext(SelectedDayContext);

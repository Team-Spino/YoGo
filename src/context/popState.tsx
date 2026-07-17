import React, { createContext, useCallback, useMemo, useState } from 'react';

interface IPopProps {
  children: JSX.Element | Array<JSX.Element>;
}

export const PopContext = createContext({
  isPoped: false,
  setPop: (state: boolean) => {},
});

export const PopProvider = ({ children }: IPopProps) => {
  const [isPoped, setIsPoped] = useState(false);

  const setPop = useCallback((state: boolean) => setIsPoped(state), []);

  // 값이 매 렌더 새 객체면 소비하는 화면이 전부 따라서 다시 그려집니다.
  const value = useMemo(() => ({ isPoped, setPop }), [isPoped, setPop]);

  return <PopContext.Provider value={value}>{children}</PopContext.Provider>;
};

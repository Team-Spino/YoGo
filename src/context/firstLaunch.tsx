import React, { createContext, useState } from 'react';
import { storage } from 'utils/mmkv';

interface IisFirstProps {
  children: JSX.Element | Array<JSX.Element>;
}

export const FirstLaunchContext = createContext({
  isFirstLaunch: false,
  checkFirstLaunch: () => {},
});

export const FirstLaunchProvider = ({ children }: IisFirstProps) => {
  const key = "FIRST_LAUNCH"
  const value = storage.getBoolean(key);

  const initialState = (value === true || value === null || value === undefined) ? true : false;

  const [isFirstLaunch, setIsFirstLaunch] = useState(initialState);

  const checkFirstLaunch = () => {
    setIsFirstLaunch(false);
    storage.set(key, false);
  }

  return (
    <FirstLaunchContext.Provider value={{ isFirstLaunch, checkFirstLaunch }}>
      {children}
    </FirstLaunchContext.Provider>
  );
};

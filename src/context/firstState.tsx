import React, { createContext, useState } from 'react';

interface IisFirstProps {
  children: JSX.Element | Array<JSX.Element>;
}

export const IsFirstContext = createContext({
  isFirst: false,
  setFirst: (state: boolean) => {},
});

export const IsFirstProvider = ({ children }: IisFirstProps) => {
  const [isFirst, setIsFirst] = useState(false);

  const setFirst = (state: boolean) => setIsFirst(state);

  return (
    <IsFirstContext.Provider value={{ isFirst, setFirst }}>
      {children}
    </IsFirstContext.Provider>
  );
};

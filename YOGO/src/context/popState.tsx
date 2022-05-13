import React, { createContext, useState } from 'react';

interface IPopProps {
  children: JSX.Element | Array<JSX.Element>;
}

export const PopContext = createContext({
  isPoped: false,
  setPop: (state: boolean) => {},
});

export const PopProvider = ({ children }: IPopProps) => {
  const [isPoped, setIsPoped] = useState(false);

  const setPop = (state: boolean) => setIsPoped(state);

  return (
    <PopContext.Provider value={{ isPoped, setPop }}>
      {children}
    </PopContext.Provider>
  );
};

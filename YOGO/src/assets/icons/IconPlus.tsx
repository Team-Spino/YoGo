import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function IconPlus({ color }: { color: string }) {
  return (
  <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
   <Path d="M21 11.3599C21 11.9121 20.5523 12.3599 20 12.3599H12V20.3599C12 20.9121 11.5523 21.3599 11 21.3599C10.4477 21.3599 10 20.9121 10 20.3599V12.3599H2C1.44772 12.3599 1 11.9121 1 11.3599C1 10.8076 1.44772 10.3599 2 10.3599H10V2.35986C10 1.80758 10.4477 1.35986 11 1.35986C11.5523 1.35986 12 1.80758 12 2.35986V10.3599H20C20.5523 10.3599 21 10.8076 21 11.3599Z" fill={color} stroke={color}/>
    </Svg>
  );
}
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function IconPlus({ color }: { color: string }) {
  return (
    <Svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M22 12.3599C22 12.9121 21.5523 13.3599 21 13.3599H13V21.3599C13 21.9122 12.5523 22.3599 12 22.3599C11.4477 22.3599 11 21.9122 11 21.3599V13.3599H3C2.44772 13.3599 2 12.9121 2 12.3599C2 11.8076 2.44772 11.3599 3 11.3599H11V3.35986C11 2.80758 11.4477 2.35986 12 2.35986C12.5523 2.35986 13 2.80758 13 3.35986V11.3599H21C21.5523 11.3599 22 11.8076 22 12.3599Z"
        fill={color}
      />
    </Svg>
  );
}

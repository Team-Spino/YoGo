import React from 'react';
import * as S from './style';
interface IToggleBtnProps {
  isEnable: boolean;
  onTogglePress: () => void;
}

export function ToggleBtn({ isEnable, onTogglePress }: IToggleBtnProps) {
  return (
    <S.Button
      trackColor={{ false: '#767577', true: '#6564CC' }}
      onValueChange={onTogglePress}
      value={isEnable}
    />
  );
}

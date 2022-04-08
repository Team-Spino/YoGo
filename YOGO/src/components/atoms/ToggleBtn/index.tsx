import React, { useState } from 'react';
import * as S from './style';

export function ToggleBtn({
  isEnable,
  onTogglePress,
}: {
  isEnable: boolean;
  onTogglePress: () => void;
}) {
  return (
    <S.Button
      trackColor={{ false: '#767577', true: '#6564CC' }}
      onValueChange={onTogglePress}
      value={isEnable}
    />
  );
}

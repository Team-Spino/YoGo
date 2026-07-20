import React from 'react';
import { Switch } from 'react-native';

interface IToggleBtnProps {
  isEnable: boolean;
  onTogglePress: () => void;
}

export function ToggleBtn({ isEnable, onTogglePress }: IToggleBtnProps) {
  return (
    <Switch
      trackColor={{ false: '#767577', true: '#6564CC' }}
      onValueChange={onTogglePress}
      value={isEnable}
      style={{ marginLeft: 10, marginBottom: 5 }}
    />
  );
}

import React from 'react';
import { Switch } from 'react-native';
import { useTheme } from '@tamagui/core';

interface IToggleBtnProps {
  isEnable: boolean;
  onTogglePress: () => void;
}

export function ToggleBtn({ isEnable, onTogglePress }: IToggleBtnProps) {
  const theme = useTheme();

  return (
    <Switch
      trackColor={{ false: '#767577', true: theme.accent.val }}
      onValueChange={onTogglePress}
      value={isEnable}
      style={{ marginLeft: 10, marginBottom: 5 }}
    />
  );
}

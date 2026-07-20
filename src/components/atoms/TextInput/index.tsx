import React from 'react';
import {
  TextInput as RNTextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import { useTheme } from '@tamagui/core';

interface ITextInputProps {
  placeholder: string;
  size: string;
  value: string;
  setValue: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  isTitleInputValid?: boolean;
}

export function TextInput({
  placeholder,
  value,
  setValue,
  isTitleInputValid,
}: ITextInputProps) {
  const theme = useTheme();
  const showError = isTitleInputValid === false;

  return (
    <RNTextInput
      value={value}
      onChange={e => setValue(e)}
      placeholder={showError ? 'Please enter a title' : placeholder}
      placeholderTextColor={theme.colorMuted.val}
      style={{
        width: '100%',
        fontSize: 16,
        fontWeight: '500',
        paddingVertical: 15,
        paddingHorizontal: 16,
        borderRadius: 14,
        borderWidth: showError ? 1 : 0.5,
        borderColor: showError ? '#FF4949' : theme.borderColor.val,
        backgroundColor: theme.backgroundStrong.val,
        color: theme.color.val,
      }}
    />
  );
}

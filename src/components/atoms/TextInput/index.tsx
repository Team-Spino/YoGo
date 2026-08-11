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
        fontSize: 17,
        fontWeight: '500',
        paddingVertical: 14,
        paddingHorizontal: 2,
        borderBottomWidth: 1,
        borderBottomColor: showError ? '#FF4949' : theme.borderColor.val,
        backgroundColor: 'transparent',
        color: theme.color.val,
      }}
    />
  );
}

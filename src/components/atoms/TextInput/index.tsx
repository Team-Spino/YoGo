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
  size,
  value,
  setValue,
  isTitleInputValid,
}: ITextInputProps) {
  const theme = useTheme();

  return (
    <RNTextInput
      value={value}
      multiline={true}
      numberOfLines={10}
      onChange={e => setValue(e)}
      placeholder={isTitleInputValid ? placeholder : 'Please Input Title'}
      style={{
        width: '100%',
        fontSize: Number(size),
        fontWeight: '500',
        paddingVertical: 13,
        paddingHorizontal: 15,
        color: theme.color.val,
        borderBottomColor: theme.borderColor.val,
        borderBottomWidth: 1,
        ...(!isTitleInputValid
          ? {
              borderBottomColor: '#FF4949',
              borderWidth: 1,
              borderColor: '#FF4949',
            }
          : {}),
      }}
    />
  );
}

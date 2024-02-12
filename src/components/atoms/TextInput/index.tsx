import React from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import * as S from './style';

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
  return (
    <S.TextInput
      value={value}
      multiline={true}
      numberOfLines={10}
      onChange={e => setValue(e)}
      size={size}
      isTitleInputValid={isTitleInputValid}
      placeholder={isTitleInputValid ? placeholder : 'Please Input Title'}
    />
  );
}

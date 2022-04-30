import React from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import * as S from './style';

interface ITextInputProps {
  placeholder: string;
  size: string;
  value: string;
  setValue: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
};

export function TextInput({placeholder, size, value, setValue}: ITextInputProps) {
    return (
        <S.TextInput
            value={value}
            onChange={(e) => setValue(e)}
            size ={size}
            placeholder={placeholder}
        />
    )
}

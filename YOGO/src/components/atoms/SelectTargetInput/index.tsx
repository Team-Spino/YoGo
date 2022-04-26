import React from 'react';
import { IconSearch } from 'assets';
import { TextInput } from 'react-native-paper';
import * as S from './style';
interface IBSelectTargetInputProps {
  text: string;
  onChangeText: (text:string) => void;
}

export function SelectTargetInput({text, onChangeText} : IBSelectTargetInputProps) {

  return (
    <S.InputText
    mode="outlined"
    label="Search Target City"
    placeholder="Search Target City"
    outlineColor='#6564CC'
    activeOutlineColor='#6564CC'
    value={text}
    onChangeText={(text) => onChangeText(text)}
    right={<TextInput.Icon name={() => <IconSearch color={"#6564CC"}/>} />}
    ></S.InputText>
  );
}

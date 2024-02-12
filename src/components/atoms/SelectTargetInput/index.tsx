import React from 'react';
import { IconSearch } from 'assets';
import { TextInput } from 'react-native-paper';
import * as S from './style';
interface IBSelectTargetInputProps {
  city: string;
  onChangeCity: (city: string) => void;
}

export function SelectTargetInput({
  city,
  onChangeCity,
}: IBSelectTargetInputProps) {
  return (
    <S.InputText
      mode="outlined"
      label="Search Target City"
      placeholder="Search Target City"
      outlineColor="#6564CC"
      activeOutlineColor="#6564CC"
      value={city}
      onChangeText={city => onChangeCity(city)}
      right={<TextInput.Icon name={() => <IconSearch color={'#6564CC'} />} />}
    ></S.InputText>
  );
}

import React from 'react';
import { IconSearch } from 'assets';
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
    <S.Container>
      <S.InputText
        placeholder="Search Target City"
        placeholderTextColor="#B5B5B9"
        value={city}
        onChangeText={onChangeCity}
        autoFocus
      />
      <S.IconBox>
        <IconSearch color="#6564CC" />
      </S.IconBox>
    </S.Container>
  );
}

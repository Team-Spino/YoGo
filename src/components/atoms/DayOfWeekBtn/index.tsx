import React from 'react';
import { IDayOfWeekProps } from 'types';
import * as S from './style';

interface IDayOfWeekBtnProps {
  day: IDayOfWeekProps;
  onDaySelect: (key: string) => void;
}

export function DayOfWeekBtn({ day, onDaySelect }: IDayOfWeekBtnProps) {
  const { key, name, isSelected } = day;
  return (
    <>
      {isSelected ? (
        <S.Container backgroundColor="#6564CC" onPress={() => onDaySelect(key)}>
          <S.Text fontColor="#ffffffff">{name}</S.Text>
        </S.Container>
      ) : (
        <S.Container
          backgroundColor="transparent"
          onPress={() => onDaySelect(key)}
        >
          <S.Text fontColor="#000000">{name}</S.Text>
        </S.Container>
      )}
    </>
  );
}

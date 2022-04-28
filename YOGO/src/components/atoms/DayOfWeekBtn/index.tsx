import React from 'react';
import { IDayOfWeekProps } from 'types';
import * as S from './style';

interface IDayOfWeekBtnProps {
  day: IDayOfWeekProps;
  onDaySelect: (key: string) => void;
}

export function DayOfWeekBtn({ day, onDaySelect }: IDayOfWeekBtnProps) {
    const {key, name, isSelected} = day;
    return (
      <>
        {isSelected ? (
          <S.Container
                backgroundColor="#6564CC"
                fontColor="#ffffffff"
                onPress={() => onDaySelect(key)}
          >{name}</S.Container>
        ) : (
          <S.Container
                backgroundColor="transparent"
                fontColor="#000000"
                onPress={() => onDaySelect(key)}
          >{name}</S.Container>
        )}
      </>
    );
}

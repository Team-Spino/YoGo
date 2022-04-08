import React from 'react';
import uuid from 'react-native-uuid';
import * as S from './style';

interface IDayOfWeekProps {
  selectedDay: Array<string>;
}

export function DayOfWeek({ selectedDay }: IDayOfWeekProps) {
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <S.Container>
      {dayOfWeek.map(day => (
        <S.Text
          key={uuid.v4()}
          color={selectedDay.includes(day) ? ' #6564CC' : 'rgba(0, 0, 0, 0.1)'}
        >
          {day}
        </S.Text>
      ))}
    </S.Container>
  );
}

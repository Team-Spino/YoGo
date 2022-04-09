import React from 'react';
import uuid from 'react-native-uuid';
import * as S from './style';

interface IDayOfWeekProps {
  isEnable: boolean;
  selectedDay: Array<string>;
}

export function DayOfWeek({ isEnable, selectedDay }: IDayOfWeekProps) {
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const handleDateColor = ({ day }: { day: string }): string => {
    if (!isEnable) {
      return 'rgba(0, 0, 0, 0.1)';
    }

    return selectedDay.includes(day) ? ' #6564CC' : 'rgba(0, 0, 0, 0.1)';
  };

  return (
    <S.Container>
      {dayOfWeek.map(day => (
        <S.Text key={uuid.v4()} color={handleDateColor({ day })}>
          {day}
        </S.Text>
      ))}
    </S.Container>
  );
}

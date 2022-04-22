import React from 'react';
import * as S from './style';

interface IBTTargetItemProps {
  id: number
  city: string;
}

interface IBTTargetCityProps {
  item: IBTTargetItemProps;
  onPress: (id: number) => void;
  selectedId : number;
}

export function TargetCity({ item , onPress , selectedId}: IBTTargetCityProps) {

  const backgroundColor = item.id === selectedId ? "#6564CC" : "#ffffff";

  const color = item.id === selectedId ? 'white' : 'black';

  return (
    <S.TouchOpacity onPress={() => onPress(item.id)}>
    <S.ListBox>
        <S.List size={18}  style= {{ backgroundColor, color }}>
      {item.city}</S.List>
        </S.ListBox>
        </S.TouchOpacity>
  );
}

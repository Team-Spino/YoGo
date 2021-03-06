import React from 'react';
import { formatCityName } from 'utils';
import * as S from './style';

interface IBTTargetItemProps {
  id: number;
  city: string;
}

interface IBTTargetCityProps {
  item: IBTTargetItemProps;
  onPress: (item: IBTTargetItemProps) => void;
  selectedId: number;
}

export function TargetCity({ item, onPress, selectedId }: IBTTargetCityProps) {
  const backgroundColor = item.id === selectedId ? '#6564CC' : 'transparent';

  const color = item.id === selectedId ? 'white' : 'black';

  return (
    <S.TouchOpacity onPress={() => onPress(item)}>
      <S.ListBox>
        <S.List size={18} style={{ backgroundColor, color }}>
          {formatCityName(item.city)}
        </S.List>
      </S.ListBox>
    </S.TouchOpacity>
  );
}

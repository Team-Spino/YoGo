import React from 'react';
import { TouchableOpacity} from 'react-native';
import * as S from './style';

interface BTTargetItemProps {
  id: number
  city: string;
}

export function TargetCity({ item , onPress , selectedId}: {item: BTTargetItemProps, onPress: (id: number) => void, selectedId: any}) {

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


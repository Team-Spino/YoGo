import React from 'react';
import * as S from './style';


export const RenderEdit = ({item, onPress} : any) => {
  return (
    <S.RenderRightButton onPress={() => onPress(item.key)}
    >
        <S.RenderRightButtonText>Edit</S.RenderRightButtonText>
        </S.RenderRightButton>
  );
};

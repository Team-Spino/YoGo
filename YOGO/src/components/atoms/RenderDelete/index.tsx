import React from 'react';
import * as S from './style';


export const RenderDelete = ({item, onPress} : any) => {
    console.log(item)
  return (
    <S.RenderRightButton onPress={() => onPress(item.key)}
    >
        <S.RenderRightButtonText>Delete</S.RenderRightButtonText>
        </S.RenderRightButton>
  );
};

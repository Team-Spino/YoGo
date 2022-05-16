import React from 'react';
import { RenderDelete, RenderEdit } from 'components';
import * as S from './style';


export const HiddenDelete = ({item, onPress} : any) => {
  return (
    <S.Container>
    <RenderDelete key={item.key} onPress={onPress}/>
    </S.Container>
  );
};

import React from 'react';
import { RenderDelete, RenderEdit } from 'components';
import * as S from './style';


export const HiddenEditAndDelete = ({item,  onPress} : any) => {

  return (
    <S.Container>
    <RenderDelete item={item} onPress={onPress}/>
    <RenderEdit />
    </S.Container>
  );
};

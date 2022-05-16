import React from 'react';
import { RenderDelete, RenderEdit } from 'components';
import * as S from './style';


export const HiddenEditAndDelete = ({item, onPress} : any) => {
  return (
    <S.Container>
    <RenderDelete />
    <RenderEdit />
    </S.Container>
  );
};
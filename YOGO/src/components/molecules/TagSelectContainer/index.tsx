import React from 'react';
import { TagSelect,Title } from 'components';
import { TAG_COLOR } from 'utils';
import * as S from './style';

export function TagSelectContainer() {
    return (
      <S.Container>
        <Title isEnable={true} text={'컬러 태그 선택'} size={15} />
        <S.Wrapper>
          {TAG_COLOR.map((color, index) => (
            <TagSelect key={index} color={color} />
          ))}
        </S.Wrapper>
      </S.Container>
    );
}

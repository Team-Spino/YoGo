import React from 'react';
import { Tag, Title } from 'components';
import * as S from './style';

export function ModalHeader({
  tagColor,
  title,
}: {
  tagColor: string;
  title: string;
}) {
  console.log(tagColor);
  return (
    <S.Container>
      <Tag color={tagColor} margin={-1} />
      <Title isEnable={true} text={title} size={25} />
    </S.Container>
  );
}

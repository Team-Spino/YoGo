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
  return (
    <S.Container>
      <Tag color={tagColor} />
      <Title isEnable={true} text={title} size={25} />
    </S.Container>
  );
}

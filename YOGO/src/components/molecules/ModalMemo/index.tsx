import React from 'react';
import { Text } from 'react-native';
import * as S from './style';

export function ModalMemo({ description }: { description: string }) {
  return (
    <S.Container>
      <Text>{description}</Text>
    </S.Container>
  );
}

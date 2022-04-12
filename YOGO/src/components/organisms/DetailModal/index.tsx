import React from 'react';
import { View, Text, Button } from 'react-native';
import Modal from 'react-native-modal';
import { DetailHeader } from 'components';
import * as S from './style';

export function DetailModal({
  isVisible,
  onCloseDetailPress,
}: {
  isVisible: boolean;
  onCloseDetailPress: () => void;
}) {
  return (
    <Modal isVisible={isVisible} onBackButtonPress={onCloseDetailPress}>
      <S.Container>
        <S.Content>
          <DetailHeader tagColor="red" title="안녕" />
        </S.Content>
        <S.Wrapper onPress={onCloseDetailPress}>
          <S.Text>Close</S.Text>
        </S.Wrapper>
      </S.Container>
    </Modal>
  );
}
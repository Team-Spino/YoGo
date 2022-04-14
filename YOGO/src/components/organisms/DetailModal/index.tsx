import React from 'react';
import { View, Text, Button } from 'react-native';
import Modal from 'react-native-modal';
import { ModalHeader, ModalTime, ModalMemo } from 'components';
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
          <ModalHeader tagColor="red" title="안녕" />
          <ModalTime />
          <ModalMemo />
        </S.Content>
        <S.Wrapper onPress={onCloseDetailPress}>
          <S.Text>Close</S.Text>
        </S.Wrapper>
      </S.Container>
    </Modal>
  );
}

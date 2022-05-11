import React from 'react';
import Modal from 'react-native-modal';
import { useTimeZone } from 'hooks';
import { ModalHeader, ModalTime, ModalMemo } from 'components';
import { ITimeData } from 'types';
import * as S from './style';

interface IDetailModalProps {
  isVisible: boolean;
  onCloseDetailPress: () => void;
  data: ITimeData;
}

export function DetailModal({
  isVisible,
  onCloseDetailPress,
  data,
}: IDetailModalProps) {
  const { title, tagColor, target, cur, description } = data;
  const { day, time } = cur;
  const timeData = { target, cur };

  const { getLeftTimeFromNow } = useTimeZone();
  const date = `${day} ${time.replace(/(\s*)/g, '')}`;
  const leftTime = getLeftTimeFromNow({ date });

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCloseDetailPress}
      onSwipeComplete={onCloseDetailPress}
      swipeDirection="left"
    >
      <S.Container>
        <S.Content>
          <ModalHeader tagColor={tagColor} title={title} />
          <ModalTime timeData={timeData} leftTime={leftTime} />
          <ModalMemo description={description} />
        </S.Content>
        <S.Wrapper onPress={onCloseDetailPress}>
          <S.Text>Close</S.Text>
        </S.Wrapper>
      </S.Container>
    </Modal>
  );
}

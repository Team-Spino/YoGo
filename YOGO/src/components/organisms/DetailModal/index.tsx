import React from 'react';
import Modal from 'react-native-modal';
import { useTimeZone } from 'hooks';
import { ModalHeader, ModalTime, ModalMemo } from 'components';
import { IScheduleProps } from 'types';
import * as S from './style';

interface IDetailModalProps {
  isVisible: boolean;
  onCloseDetailPress: () => void;
  schedule: IScheduleProps;
}

export function DetailModal({
  isVisible,
  onCloseDetailPress,
  schedule,
}: IDetailModalProps) {
  const {
    ID,
    TITLE,
    DESCRIPTION,
    TAG_COLOR,
    TARGET_TIME,
    TARGET_CITY,
    TARGET_DAY,
    CUR_TIME,
    CUR_CITY,
    CUR_DAY,
    DAY_OF_WEEK,
  } = schedule;

  const { getLeftTimeFromNow } = useTimeZone();

  const date = `${CUR_DAY} ${CUR_TIME.replace(/(\s*)/g, '')}`;

  const leftTime = getLeftTimeFromNow({ date });

  const target = {
    TARGET_TIME,
    TARGET_CITY,
    TARGET_DAY,
  };

  const cur = {
    CUR_TIME,
    CUR_CITY,
    CUR_DAY,
  };

  const timeData = {
    target,
    cur,
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCloseDetailPress}
      onSwipeComplete={onCloseDetailPress}
      swipeDirection="left"
    >
      <S.Container>
        <S.Content>
          <ModalHeader tagColor={TAG_COLOR} title={TITLE} />
          <ModalTime timeData={timeData} leftTime={leftTime} />
          <ModalMemo description={DESCRIPTION} />
        </S.Content>
        <S.Wrapper onPress={onCloseDetailPress}>
          <S.Text>Close</S.Text>
        </S.Wrapper>
      </S.Container>
    </Modal>
  );
}

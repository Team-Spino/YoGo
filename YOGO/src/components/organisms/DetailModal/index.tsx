import React from 'react';
import Modal from 'react-native-modal';
import { useTimeZone } from 'hooks';
import { ModalHeader, ModalTime, ModalMemo } from 'components';
import { IScheduleProps } from 'types';
import * as S from './style';

interface IDetailModalProps {
  isVisible: boolean;
  onCloseDetailPress: () => void;
  selectedDay: string;
  schedule: IScheduleProps;
}

export function DetailModal({
  isVisible,
  onCloseDetailPress,
  selectedDay,
  schedule,
}: IDetailModalProps) {
  const {
    TITLE,
    DESCRIPTION,
    TAG_COLOR,
    TARGET_TIME,
    TARGET_CITY,
    TARGET_DAY,
    CUR_TIME,
    CUR_CITY,
    CUR_DAY,
  } = schedule;

  const { getLeftTimeFromNow } = useTimeZone();

  const date = `${selectedDay} ${CUR_TIME.replace(/(\s*)/g, '')}`;

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
      coverScreen={true}
    >
      <S.Container>
        <S.Content>
          <ModalHeader tagColor={TAG_COLOR} title={TITLE} />
          <ModalTime
            timeData={timeData}
            leftTime={leftTime}
            selectedDay={selectedDay}
          />
          <ModalMemo description={DESCRIPTION} />
        </S.Content>
        <S.Wrapper onPress={onCloseDetailPress}>
          <S.Text>Close</S.Text>
        </S.Wrapper>
      </S.Container>
    </Modal>
  );
}

import React from 'react';
import { TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Text, useTheme } from '@tamagui/core';
import { useTimeZone } from 'hooks';
import { ModalHeader, ModalTime, ModalMemo } from 'components';
import { Card } from 'styles/ui';
import { useSelectedDay } from 'context';
import { IScheduleProps } from 'types';

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
  const { selectedDay } = useSelectedDay();
  // RN TouchableOpacity의 style 객체는 토큰 문자열을 못 받으므로 실제 값을 읽습니다.
  const theme = useTheme();

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
      <Card
        width="100%"
        flex={0.5}
        flexDirection="column"
        overflow="hidden"
        borderRadius={20}
      >
        <ModalHeader tagColor={TAG_COLOR} title={TITLE} />
        <ModalTime timeData={timeData} leftTime={leftTime} />
        <ModalMemo description={DESCRIPTION} />

        <TouchableOpacity
          onPress={onCloseDetailPress}
          activeOpacity={0.8}
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            width: 34,
            height: 34,
            borderRadius: 17,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.backgroundStrong.val,
            borderWidth: 0.5,
            borderColor: theme.borderColor.val,
          }}
        >
          <Text fontSize={15} fontWeight="500" color="$colorSubtle">
            ✕
          </Text>
        </TouchableOpacity>
      </Card>
    </Modal>
  );
}

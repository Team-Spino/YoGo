import React from 'react';
import { TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { View, Text, useTheme } from '@tamagui/core';
import { useTimeZone } from 'hooks';
import { ModalHeader, ModalTime, ModalMemo } from 'components';
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
      <View
        backgroundColor="$background"
        flex={0.5}
        borderRadius={10}
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <View
          flex={1}
          width="100%"
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
        >
          <ModalHeader tagColor={TAG_COLOR} title={TITLE} />
          <ModalTime timeData={timeData} leftTime={leftTime} />
          <ModalMemo description={DESCRIPTION} />
        </View>
        <TouchableOpacity
          onPress={onCloseDetailPress}
          style={{
            width: '100%',
            height: '15%',
            borderWidth: 2,
            borderColor: theme.borderColor.val,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          <Text fontSize={20} color="#e5565e">
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

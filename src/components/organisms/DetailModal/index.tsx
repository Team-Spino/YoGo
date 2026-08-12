import React from 'react';
import { Modal, Pressable, TouchableOpacity } from 'react-native';
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
      visible={isVisible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCloseDetailPress}
    >
      {/* 배경 탭으로 닫기. RN 내장 Modal을 써서 react-native-modal(0.73+에서
          제거된 BackHandler API를 호출해 크래시)을 대체합니다. */}
      <Pressable
        onPress={onCloseDetailPress}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}
      >
        {/* 카드 탭이 배경으로 전파돼 닫히지 않도록 안쪽 Pressable로 흡수합니다. */}
        <Pressable onPress={() => {}}>
          <Card
            width="100%"
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
        </Pressable>
      </Pressable>
    </Modal>
  );
}

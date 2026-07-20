import React, { useEffect, useState } from 'react';
import { Platform, Pressable } from 'react-native';
import { View, useTheme } from '@tamagui/core';
import { Portal } from '@gorhom/portal';
import {
  ScheduleCardHeader,
  ScheduleCardContent,
  DetailModal,
  DayOfWeek,
} from 'components';
import { setScheduleActive } from 'db';
import { useNotification } from 'hooks';
import { IScheduleProps } from 'types';

interface IScheduleCardProps {
  schedule: IScheduleProps;
}

export const ScheduleCard = React.memo(function ScheduleCard({
  schedule,
}: IScheduleCardProps) {
  const {
    key,
    TITLE,
    TAG_COLOR,
    TARGET_TIME,
    TARGET_CITY,
    TARGET_DAY,
    CUR_TIME,
    CUR_CITY,
    CUR_DAY,
    DAY_OF_WEEK,
    IS_ACTIVE,
  } = schedule;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isEnable, setIsEnable] = useState<boolean>(IS_ACTIVE ? true : false);
  const { handleScheduleToggle } = useNotification();
  // RN Pressable의 style 객체는 토큰 문자열을 못 받으므로 실제 값을 읽습니다.
  const theme = useTheme();

  const onTogglePress = async () => {
    await setScheduleActive(key, isEnable ? 0 : 1);


    if (Platform.OS === 'ios') {
      handleScheduleToggle({
        number: Number(key),
        isActive: isEnable ? false : true,
        schedule,
      });
    }
    setIsEnable(!isEnable);
  };

  useEffect(() => {
    setIsEnable(IS_ACTIVE ? true : false);
  }, [IS_ACTIVE]);

  const onShowDetailPress = () => setIsVisible(true);
  const onCloseDetailPress = () => setIsVisible(false);

  const target = { TARGET_TIME, TARGET_CITY, TARGET_DAY };
  const cur = { CUR_TIME, CUR_CITY, CUR_DAY };

  return (
    <>
      <Pressable
        onPress={onShowDetailPress}
        style={{
          flexShrink: 1,
          backgroundColor: theme.background.val,
          borderBottomColor: theme.backgroundStrong.val,
          borderBottomWidth: 1,
          paddingVertical: 5,
          paddingHorizontal: 8.2,
        }}
      >
        <View
          width="100%"
          height="100%"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
        >
          <ScheduleCardHeader
            isEnable={isEnable}
            title={TITLE}
            tagColor={TAG_COLOR}
          />
          <ScheduleCardContent
            isEnable={isEnable}
            onTogglePress={onTogglePress}
            target={target}
            cur={cur}
          />
          <DayOfWeek
            isEnable={isEnable}
            selectedDay={JSON.parse(DAY_OF_WEEK)}
          />
        </View>
      </Pressable>
      <Portal>
        <DetailModal
          isVisible={isVisible}
          onCloseDetailPress={onCloseDetailPress}
          schedule={schedule}
        />
      </Portal>
    </>
  );
});

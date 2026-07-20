import React, { useEffect, useState } from 'react';
import { Platform, Pressable } from 'react-native';
import { Text, View, useTheme } from '@tamagui/core';
import { Portal } from '@gorhom/portal';
import { ToggleBtn, DetailModal } from 'components';
import { Card, CardName, Meta } from 'styles/ui';
import { setScheduleActive } from 'db';
import { useNotification } from 'hooks';
import { formatCityName, parseCity, to12Hour, toFormat12Hour } from 'utils';
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
    CUR_DAY,
    DAY_OF_WEEK,
    IS_ACTIVE,
  } = schedule;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isEnable, setIsEnable] = useState<boolean>(IS_ACTIVE ? true : false);
  const { handleScheduleToggle } = useNotification();
  // 스와이프 뒤 숨은 행(수정/삭제)이 카드 옆 여백으로 비치지 않도록, 앞줄을
  // 페이지 배경색으로 꽉 채웁니다.
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

  const targetLabel = `${formatCityName(
    parseCity({ city: TARGET_CITY }),
  )} · ${toFormat12Hour({ day: TARGET_DAY, time: TARGET_TIME })}`;

  const { time: alarmTime, meridiem: alarmMeridiem } = to12Hour(
    `${CUR_DAY} ${CUR_TIME}`,
  );

  const repeatDays: Array<string> = JSON.parse(DAY_OF_WEEK ?? '[]');

  return (
    <>
      <Pressable
        onPress={onShowDetailPress}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 6,
          backgroundColor: theme.background.val,
        }}
      >
        <Card
          flexDirection="row"
          alignItems="center"
          padding={15}
          opacity={isEnable ? 1 : 0.5}
        >
          <View
            width={4}
            alignSelf="stretch"
            borderRadius={4}
            marginRight={13}
            backgroundColor={TAG_COLOR || '#B5B5B9'}
          />

          <View flex={1}>
            <CardName numberOfLines={1}>{TITLE}</CardName>
            <Meta marginTop={3} numberOfLines={1}>
              {targetLabel}
            </Meta>
            {repeatDays.length > 0 && (
              <Meta marginTop={2} color="$colorMuted" numberOfLines={1}>
                ↻ {repeatDays.join(' · ')}
              </Meta>
            )}
          </View>

          <View alignItems="flex-end" marginLeft={12}>
            <View flexDirection="row" alignItems="baseline">
              <Text
                color="$color"
                fontSize={19}
                fontWeight="500"
                letterSpacing={-0.3}
              >
                {alarmTime}
              </Text>
              <Text color="$colorSubtle" fontSize={12} marginLeft={3}>
                {alarmMeridiem}
              </Text>
            </View>
            <View marginTop={6}>
              <ToggleBtn isEnable={isEnable} onTogglePress={onTogglePress} />
            </View>
          </View>
        </Card>
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

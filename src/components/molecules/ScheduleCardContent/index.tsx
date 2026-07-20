import React from 'react';
import { View } from '@tamagui/core';
import { Title, ToggleBtn, SubTitle } from 'components';
import { ITargetProps, ICurProps } from 'types';
import { parseCity, formatCityName, toFormat12Hour } from 'utils';

interface IScheduleCardContentProps {
  isEnable: boolean;
  onTogglePress: () => void;
  target: ITargetProps;
  cur: ICurProps;
}

export function ScheduleCardContent({
  isEnable,
  onTogglePress,
  target,
  cur,
}: IScheduleCardContentProps) {
  const { TARGET_TIME, TARGET_CITY, TARGET_DAY } = target;
  const { CUR_DAY, CUR_TIME } = cur;

  return (
    <View
      width="93%"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="row"
      marginTop={5}
      marginRight={0}
      marginBottom={5}
      marginLeft={21}
    >
      <SubTitle
        isEnable={isEnable}
        text={`${formatCityName(
          parseCity({
            city: TARGET_CITY,
          }),
        )} ${toFormat12Hour({
          day: TARGET_DAY,
          time: TARGET_TIME,
        })}`}
      />
      <View justifyContent="center" alignItems="center" flexDirection="row">
        <Title
          isEnable={isEnable}
          text={toFormat12Hour({
            day: CUR_DAY,
            time: CUR_TIME,
          })}
          size={20}
        />
        <ToggleBtn isEnable={isEnable} onTogglePress={onTogglePress} />
      </View>
    </View>
  );
}

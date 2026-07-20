import React from 'react';
import { View } from '@tamagui/core';
import { Tag, CardTitle } from 'components';

interface IScheduleCardHeaderProps {
  isEnable: boolean;
  title: string;
  tagColor: string;
}

export function ScheduleCardHeader({
  isEnable,
  title,
  tagColor,
}: IScheduleCardHeaderProps) {
  return (
    <View
      width="90%"
      flex={1}
      justifyContent="flex-start"
      alignItems="center"
      flexDirection="row"
      marginTop={10}
    >
      <Tag color={tagColor} />
      <CardTitle isEnable={isEnable} size={23} text={title} />
    </View>
  );
}

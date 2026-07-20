import React from 'react';
import { View, Text } from '@tamagui/core';
import { ModalTimeInfo } from 'components';
import { ICurProps, ITargetProps } from 'types';

interface IModalTimeProps {
  timeData: {
    target: ITargetProps;
    cur: ICurProps;
  };
  leftTime: string;
}

export function ModalTime({ timeData, leftTime }: IModalTimeProps) {
  return (
    <View
      borderBottomColor="#e6e6e6"
      borderBottomWidth={2}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      paddingVertical={20}
      paddingHorizontal={10}
    >
      <ModalTimeInfo timeData={timeData} />
      <Text marginTop={7} color="#6564cc">
        {leftTime}
      </Text>
    </View>
  );
}

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
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={18}
      paddingVertical={28}
      paddingHorizontal={24}
      borderBottomColor="$borderColor"
      borderBottomWidth={0.5}
    >
      <ModalTimeInfo timeData={timeData} />
      <Text color="$accent" fontSize={13} fontWeight="500" letterSpacing={0.2}>
        {leftTime}
      </Text>
    </View>
  );
}

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
      gap={14}
      paddingVertical={20}
      paddingHorizontal={20}
      borderBottomColor="$borderColor"
      borderBottomWidth={0.5}
    >
      <ModalTimeInfo timeData={timeData} />
      <View
        backgroundColor="$backgroundStrong"
        paddingHorizontal={14}
        paddingVertical={7}
        borderRadius={999}
      >
        <Text color="$accent" fontSize={13} fontWeight="500">
          {leftTime}
        </Text>
      </View>
    </View>
  );
}

import React from 'react';
import { Image } from 'react-native';
import { View, Text } from '@tamagui/core';
import { ImgNoSchedule } from 'assets';

interface IRenderEmptyDataProps {
  text: string;
  hint?: string;
}

export function RenderEmptyData({
  text,
  hint = 'Tap + to add your first one',
}: IRenderEmptyDataProps) {
  return (
    <View flex={1} alignItems="center" justifyContent="center" gap={16}>
      <View
        width={76}
        height={76}
        borderRadius={999}
        backgroundColor="$backgroundStrong"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          source={ImgNoSchedule}
          resizeMode="contain"
          style={{ width: 34, height: 34 }}
        />
      </View>
      <View alignItems="center" gap={5}>
        <Text color="$color" fontSize={17} fontWeight="500">
          {text}
        </Text>
        <Text color="$colorSubtle" fontSize={13}>
          {hint}
        </Text>
      </View>
    </View>
  );
}

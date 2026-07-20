import React from 'react';
import { Image } from 'react-native';
import { View } from '@tamagui/core';
import { ImgNoSchedule } from 'assets';
import { Title } from 'components';

export function RenderEmptyData({ text }: { text: string }) {
  return (
    <View flex={1} top={0} bottom={0} alignItems="center" justifyContent="center">
      <Image
        source={ImgNoSchedule}
        resizeMode="contain"
        style={{ width: '14%', height: '14%' }}
      />
      <Title isEnable={false} text={text} size={22} />
    </View>
  );
}

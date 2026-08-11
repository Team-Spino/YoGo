import React from 'react';
import { View } from '@tamagui/core';
import { ScreenTitle, Eyebrow } from 'styles/ui';

export function ModalHeader({
  tagColor,
  title,
}: {
  tagColor: string;
  title: string;
}) {
  return (
    <View
      width="100%"
      flexDirection="column"
      gap={10}
      paddingTop={24}
      paddingBottom={22}
      paddingLeft={24}
      paddingRight={64}
      borderBottomColor="$borderColor"
      borderBottomWidth={0.5}
    >
      <View flexDirection="row" alignItems="center" gap={8}>
        <View
          width={8}
          height={8}
          borderRadius={999}
          backgroundColor={tagColor || '#B5B5B9'}
        />
        <Eyebrow>Schedule</Eyebrow>
      </View>
      <ScreenTitle numberOfLines={2}>{title}</ScreenTitle>
    </View>
  );
}

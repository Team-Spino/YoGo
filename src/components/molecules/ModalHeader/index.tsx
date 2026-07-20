import React from 'react';
import { View } from '@tamagui/core';
import { Tag, Title } from 'components';

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
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
      paddingVertical={15}
      paddingHorizontal={10}
      borderBottomColor="#e6e6e6"
      borderBottomWidth={2}
    >
      <Tag color={tagColor} />
      <Title isEnable={true} text={title} size={25} />
    </View>
  );
}

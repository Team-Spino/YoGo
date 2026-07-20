import React from 'react';
import { View, Text } from '@tamagui/core';

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
      alignItems="center"
      gap={12}
      paddingTop={22}
      paddingBottom={16}
      paddingLeft={20}
      paddingRight={56}
      borderBottomColor="$borderColor"
      borderBottomWidth={0.5}
    >
      <View
        width={4}
        height={22}
        borderRadius={4}
        backgroundColor={tagColor || '#B5B5B9'}
      />
      <Text
        flex={1}
        color="$color"
        fontSize={20}
        fontWeight="500"
        letterSpacing={-0.3}
        numberOfLines={1}
      >
        {title}
      </Text>
    </View>
  );
}

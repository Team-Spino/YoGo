import React from 'react';
import { ScrollView } from 'react-native';
import { Text } from '@tamagui/core';

export function ModalMemo({ description }: { description: string }) {
  return (
    <ScrollView
      style={{
        width: '100%',
        flex: 1,
        marginTop: 20,
        paddingVertical: 0,
        paddingHorizontal: 10,
      }}
    >
      <Text lineHeight={25}>{description}</Text>
    </ScrollView>
  );
}

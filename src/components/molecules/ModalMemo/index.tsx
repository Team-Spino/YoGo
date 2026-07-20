import React from 'react';
import { ScrollView } from 'react-native';
import { Text } from '@tamagui/core';
import { Eyebrow } from 'styles/ui';

export function ModalMemo({ description }: { description: string }) {
  return (
    <ScrollView
      style={{
        width: '100%',
        flex: 1,
      }}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 24,
      }}
    >
      <Eyebrow marginBottom={8}>Memo</Eyebrow>
      <Text color="$color" fontSize={15} lineHeight={22}>
        {description}
      </Text>
    </ScrollView>
  );
}

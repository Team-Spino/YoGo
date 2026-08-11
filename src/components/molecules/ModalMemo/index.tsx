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
        paddingHorizontal: 24,
        paddingTop: 22,
        paddingBottom: 28,
      }}
    >
      <Eyebrow marginBottom={10} letterSpacing={0.3}>
        Memo
      </Eyebrow>
      <Text color="$color" fontSize={16} lineHeight={24}>
        {description}
      </Text>
    </ScrollView>
  );
}

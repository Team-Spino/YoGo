import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, useTheme } from '@tamagui/core';
import { formatCityName } from 'utils';

interface IBTTargetItemProps {
  id: number;
  city: string;
}

interface IBTTargetCityProps {
  item: IBTTargetItemProps;
  onPress: (item: IBTTargetItemProps) => void;
  selectedId: number;
}

export function TargetCity({ item, onPress, selectedId }: IBTTargetCityProps) {
  const theme = useTheme();

  const backgroundColor =
    item.id === selectedId ? theme.accent.val : 'transparent';

  const color = item.id === selectedId ? theme.onAccent.val : theme.color.val;

  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={{ backgroundColor: 'transparent' }}
    >
      <View justifyContent="center" borderBottomWidth={0.7} borderBottomColor="$accent">
        <Text
          fontSize={18}
          fontWeight="200"
          alignItems="flex-start"
          padding={20}
          style={{ backgroundColor, color }}
        >
          {formatCityName(item.city)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

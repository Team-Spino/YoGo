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

  const isSelected = item.id === selectedId;

  const backgroundColor = isSelected
    ? theme.backgroundHover.val
    : 'transparent';

  const color = isSelected ? theme.accent.val : theme.color.val;

  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      activeOpacity={0.7}
      style={{ backgroundColor: 'transparent' }}
    >
      <View
        justifyContent="center"
        borderBottomWidth={0.5}
        borderBottomColor="$borderColor"
        borderRadius={12}
        style={{ backgroundColor }}
      >
        <Text
          fontSize={16}
          fontWeight={isSelected ? '500' : '400'}
          paddingVertical={16}
          paddingHorizontal={16}
          style={{ color }}
        >
          {formatCityName(item.city)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

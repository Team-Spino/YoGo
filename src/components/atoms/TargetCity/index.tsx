import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from '@tamagui/core';
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
  const backgroundColor = item.id === selectedId ? '#6564CC' : 'transparent';

  const color = item.id === selectedId ? 'white' : 'black';

  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={{ backgroundColor: 'transparent' }}
    >
      <View justifyContent="center" borderBottomWidth={0.7} borderBottomColor="#6564CC">
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

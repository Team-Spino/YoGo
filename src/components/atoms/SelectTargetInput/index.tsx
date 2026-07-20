import React from 'react';
import { TextInput } from 'react-native';
import { View } from '@tamagui/core';
import { IconSearch } from 'assets';

interface IBSelectTargetInputProps {
  city: string;
  onChangeCity: (city: string) => void;
}

export function SelectTargetInput({
  city,
  onChangeCity,
}: IBSelectTargetInputProps) {
  return (
    <View
      flexDirection="row"
      alignItems="center"
      width="90%"
      margin={10}
      paddingHorizontal={12}
      borderRadius={20}
      borderWidth={1}
      borderColor="#E6E6E6"
    >
      <TextInput
        style={{ flex: 1, fontSize: 16, paddingVertical: 12 }}
        placeholder="Search Target City"
        placeholderTextColor="#B5B5B9"
        value={city}
        onChangeText={onChangeCity}
        autoFocus
      />
      <View paddingLeft={8}>
        <IconSearch color="#6564CC" />
      </View>
    </View>
  );
}

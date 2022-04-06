import React from 'react';
import { StyleSheet, View, Pressable, Platform } from 'react-native';
import { IconPlus } from '/assets';

export function HeaderRightButton({ name, color, onPress } : {name : string, color: string, onPress: any}) {
  return (
    <View style={styles.block}>
      <Pressable
        style={({ pressed }) => [
          styles.circle,
          Platform.OS === 'ios' &&
            pressed && {
              opacity: 0.3,
            },
        ]}
        onPress={onPress}
        android_ripple={{ color: '#eee' }}
      >
        <IconPlus></IconPlus>
      </Pressable>
    </View>
  );
}

HeaderRightButton.defaultProps = {
  color: '#6200ee',
};

const styles = StyleSheet.create({
  block: {
    marginRight: -3,
    borderRadius: 24,
    overflow: 'hidden',
  },
  circle: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


import React from 'react';
import { View, Text, Button } from 'react-native';
import Modal from 'react-native-modal';

export function DetailModal({
  isVisible,
  onCloseDetailPress,
}: {
  isVisible: boolean;
  onCloseDetailPress: () => void;
}) {
  return (
    <Modal isVisible={isVisible}>
      <Text>DetailModal</Text>
      <Button title="닫기" onPress={onCloseDetailPress} />
    </Modal>
  );
}

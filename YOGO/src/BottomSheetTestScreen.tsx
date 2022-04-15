import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Button
} from 'react-native';
import BottomSheet from './BottomSheet';

const BottomSheetTestScreen = () => {
    const [ modalVisible, setModalVisible ] = useState(false);
    const pressButton = () => {
        setModalVisible(true);
    }

    return (
        <View style={styles.rootContainer}>
            <Button
                title={"Open BottomSheet!"}
                onPress={pressButton}
            />
            <BottomSheet
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default BottomSheetTestScreen;
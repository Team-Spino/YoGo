import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@tamagui/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { ResultSheet, SearchSheet } from 'components';
import { IMakeProps, RootStackParamList } from 'types';

interface ISearchBSProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HandleSchedule'>;
}

export const BottomSheet = forwardRef<BottomSheetModal, ISearchBSProps>(
  ({ navigation }, ref) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const { dismiss } = useBottomSheetModal();
    const [result, setResult] = useState<boolean>(false);
    const [submitObject, setSubmitObject] = useState<IMakeProps>({
      TARGET_CITY: '',
      TARGET_DAY: '',
    });

    const onPressBottomSheetFindBtn = ({ TARGET_CITY, TARGET_DAY }: IMakeProps) => {
      setSubmitObject({ TARGET_CITY, TARGET_DAY });
      setResult(true);
    };

    const onPressBottomSheetMakeBtn = ({
      TARGET_CITY,
      TARGET_DAY,
    }: IMakeProps) => {
      // 시트를 닫은 뒤 화면 전환(투명 오버레이가 터치를 막는 것 방지).
      dismiss();
      navigation.push('HandleSchedule', {
        title: 'Add',
        item: {
          TARGET_CITY,
          TARGET_DAY: dayjs(TARGET_DAY).format('YYYY-MM-DD HH:mm:ss'),
          isFromBottomSheet: true,
        } as IMakeProps,
      });
    };

    const snapPoints = useMemo(() => ['92%'], []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      ),
      [],
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        topInset={insets.top}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: theme.background.val }}
        handleIndicatorStyle={{ backgroundColor: theme.borderColorStrong.val }}
        onDismiss={() => setResult(false)}
      >
        {!result ? (
          <SearchSheet onPress={onPressBottomSheetFindBtn} />
        ) : (
          <BottomSheetView style={{ flex: 1 }}>
            <ResultSheet
              onPress={onPressBottomSheetMakeBtn}
              submitObject={submitObject}
            />
          </BottomSheetView>
        )}
      </BottomSheetModal>
    );
  },
);

BottomSheet.displayName = 'BottomSheet';

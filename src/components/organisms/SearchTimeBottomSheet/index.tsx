import React, { forwardRef, useCallback, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@tamagui/core';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { SearchTarget } from 'components';
import { useCitySearch } from 'hooks';

interface ISearchBSProps {
  selectTarget: (cardlist: string) => void;
}

export const SearchTimeBottomSheet = forwardRef<
  BottomSheetModal,
  ISearchBSProps
>(({ selectTarget }, ref) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { dismiss } = useBottomSheetModal();
  const { city, setCity, targetList, onChangeCity } = useCitySearch();

  // 고른 도시를 카드로 넘긴 뒤 시트를 닫고 검색어를 비웁니다.
  const onSubmitCity = (selected: string) => {
    selectTarget(selected);
    dismiss();
    setCity('');
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
    >
      <BottomSheetView style={{ flex: 1 }}>
        <SearchTarget
          targetList={targetList}
          city={city}
          onChangeCity={onChangeCity}
          onSubmitCity={onSubmitCity}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

SearchTimeBottomSheet.displayName = 'SearchTimeBottomSheet';

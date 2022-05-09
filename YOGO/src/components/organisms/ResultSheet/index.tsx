import React from 'react';
import {
  ResultCard,
  BottomSheetBtn,
  BottomSheetHeader,
  IconAbsolute,
} from 'components';
import { IconWorld } from 'assets';
import * as S from './style';

interface IResultBSProps {
  onPress: () => void;
}

export const ResultSheet = ({ onPress }: IResultBSProps) => {
  const tempFromTitle = 'Jeju, SouthKorea \n web, 30 Mar 2022';
  const tempToTitle = 'NewYork, USA \n web, 30 Mar 2022';

  return (
    <S.ResultBox>
      <BottomSheetHeader
        text={'We Find your Time Zone'}
        size={18}
        isWhite={true}
      />
      <S.Inner>
        <IconAbsolute>
          <IconWorld />
        </IconAbsolute>
        <ResultCard title={tempFromTitle} time="22:00" meridiem="pm" />
        <ResultCard title={tempToTitle} time="09:00" meridiem="pm" />
      </S.Inner>
      <BottomSheetBtn text={'Make'} onPress={onPress} isRevers={true} />
    </S.ResultBox>
  );
};

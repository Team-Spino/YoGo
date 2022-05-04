import React from 'react';
import {
  ResultCard,
  BottomSheetBtn,
  BottomSheetHeader,
  IconAbsolute
} from 'components';
import { IconWorld } from 'assets';
import * as S from './style';

interface IResultBSProps {
 onPress: () => void;
}

export const ResultSheet = ({ onPress }: IResultBSProps) => {

  return (
          <S.ResultBox>
            <BottomSheetHeader text={'We Find your Time Zone'} size={18} isWhite={true} />
            <S.Inner>
              <IconAbsolute>
                <IconWorld />
              </IconAbsolute>
              <ResultCard />
              <ResultCard />
            </S.Inner>
            <BottomSheetBtn text={'Make'} onPress={onPress} isRevers ={true} />
          </S.ResultBox>
  );
};

import React from 'react';
import { TimeOfTZ, Title } from 'components';
import * as S from './style';

export const ResultCard = () => {
  const text = `Jeju, SouthKorea \n web, 30 Mar 2022`
  return (
    <>
      <S.Container>
        <Title isEnable={true} text={text} size={12} />
        <TimeOfTZ timesize={50} postandAfterSize={50}/>
      </S.Container>
    </>
  );
};

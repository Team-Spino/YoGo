import React from 'react';
import * as S from './style';
import { ImgNoSchedule } from 'assets';
import { Title } from 'components';


export function RenderEmptyData({text} : {text : string}) {
  return (
    <S.Container>
    <S.Image
      source={ImgNoSchedule}
      resizeMode="contain"
    />
    <Title isEnable={false} text={text} size={22} />
  </S.Container>
  );
}

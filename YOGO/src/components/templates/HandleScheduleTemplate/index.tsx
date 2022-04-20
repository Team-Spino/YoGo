import React from 'react';
import { SettingSchedule, ButtonWrapper } from 'components';
import * as S from './style';

export function HandleScheduleTemplate({ navigation }: { navigation: any }) {
  const onGoBack = () => navigation.goBack();
  const onSubmit = () => navigation.goBack();
  return (
    <S.Container>
      <SettingSchedule />
      <ButtonWrapper onGoBack={onGoBack} onSubmit={onSubmit} />
    </S.Container>
  );
}

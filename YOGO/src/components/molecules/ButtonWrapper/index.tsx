import React from 'react';
import { Button } from 'components';
import * as S from './style';

interface IButtonWrapperProps {
  onGoBack: () => void;
  onSubmit: () => void;
}

export function ButtonWrapper({ onGoBack, onSubmit }: IButtonWrapperProps) {
  return (
    <S.Container>
      <Button text="Cancel" color="#e5565e" onPress={onGoBack} />
      <Button text="Submit" color="#0F81FE" onPress={onSubmit} />
    </S.Container>
  );
}

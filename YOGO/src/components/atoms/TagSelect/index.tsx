import React from 'react';
import { IconTick } from 'assets';
import * as S from './style';

export function TagSelect({color}: {color: string}) {
    return (
        <S.Container color={color}>
            <IconTick />
        </S.Container>
    )
}

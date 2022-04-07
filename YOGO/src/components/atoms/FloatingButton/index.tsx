import React from "react";
import {Pressable} from "react-native";
import { IconSearch } from "../../../assets/icons/IconSearch";
import * as S from './style'

export const FloatingButton = () => {
    return (
        <S.Wrapper>
          <Pressable>
            {({pressed}) => (
             <S.Button pressed={pressed}>
                <IconSearch />
             </S.Button>
            )}
          </Pressable>
          </S.Wrapper>
      );
    }

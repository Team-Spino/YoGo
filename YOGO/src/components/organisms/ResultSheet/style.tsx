import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
const screenHeight = Dimensions.get('screen').height;

export const Inner = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;


export const ResultBox = styled.View`
  height: ${screenHeight * 0.90}px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
`;

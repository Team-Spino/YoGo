import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
const screenHeight = Dimensions.get('screen').height;

export const Inner = styled.View`
  width: 100%;
  margin-top: ${screenHeight * 0.05}px;
  height: 80%;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;


export const ResultBox = styled.View`
  height: ${screenHeight * 0.90}px;
  width: 100%;
  align-items: center;
  padding-top: 20px;
`;

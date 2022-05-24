import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
const screenHeight = Dimensions.get('screen').height;

export const ScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

export const Inner = styled.View`
  width: 100%;
  height: ${screenHeight * 0.90}px;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

export const SearchBox = styled.View`
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

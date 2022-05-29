import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
export const Wrapper = styled.View`
  width: 100%;
  height: 100%;
`;

export const Content = styled.View`
  top: -${Dimensions.get('window').height * 0.06}px;
  width: 100%;
  height: ${Dimensions.get('window').height * 0.68};
`;
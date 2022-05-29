import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
export const Wrapper = styled.View`
  width: 100%;
  height: 100%;
`;

export const Content = styled.View`
  margin-top: 30%;
  width: 100%;
  height: ${Dimensions.get('window').height * 0.68};
`;
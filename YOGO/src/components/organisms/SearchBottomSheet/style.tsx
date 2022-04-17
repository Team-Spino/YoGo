
import styled from 'styled-components/native';
import {Animated, View} from 'react-native';

export const Container =styled(Animated.View)`
  height: 600px;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

`;

export const background = styled.View`
  flex: 1
`;

export const overlay = styled.View`
  flex: 1,
  justify-content: flex-end,
  background-color: rgba(0, 0, 0, 0.4)
`;

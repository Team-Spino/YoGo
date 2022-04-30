import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const Container = styled(Animated.View)<{height: number}>`
  height: ${({ height }) => height * 0.8}px;
  justify-content: flex-start;
  align-items: center;
  background-color: ${props => props.theme.colors.blue};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding-top: 10px;
`;

export const Background = styled.View`
  flex: 1;
`;

export const Overlay = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const Inner = styled.View`
  width: 100%;
  height: 60%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export const ResultBox = styled.View`
  height: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0
`;

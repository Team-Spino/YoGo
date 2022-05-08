import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(Animated.View)<{ height: number }>`
  height: ${({ height }) => height * 0.95}px;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
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

export const ScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
  margin-bottom: 50px;
`;

export const SearchBox = styled.View`
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

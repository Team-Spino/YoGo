import styled from 'styled-components/native';

export const Wrapper = styled.View`
  position: absolute;
  bottom: 15px;
  right: 16px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  shadow-color: #000;
  shadow-offset: 2px 3px;
  shadow-opacity: 0.5;
  shadow-radius: 2px;
  elevation: 5;
`;

export const Button = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.blue};
  opacity: ${({ pressed }: { pressed: boolean }) => (pressed ? 0.55 : 1)};
`;

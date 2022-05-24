import styled from 'styled-components/native';

export const Wrapper = styled.View`
  overflow: hidden;
`;

export const Button = styled.View`
  height: 48px;
  width: 48px;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.blue};
  opacity: ${({ pressed }: { pressed: boolean }) => (pressed ? 0.3 : 1)};
`;

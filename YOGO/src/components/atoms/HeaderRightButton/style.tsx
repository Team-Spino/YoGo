import styled from 'styled-components/native';

export const Wrapper = styled.View`
  marginright: -3;
  borderradius: 24;
  overflow: hidden;
`;

export const Button = styled.View`
  height: 48;
  width: 48;
  alignitems: center;
  justifycontent: center;
  opacity: ${({ pressed }: { pressed: boolean }) => (pressed ? 0.3 : 1)};
`;

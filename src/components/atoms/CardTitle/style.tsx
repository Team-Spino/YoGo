import styled from 'styled-components/native';

interface ITitleProps {
  isEnable: boolean;
  size: number;
}

export const Text = styled.Text<ITitleProps>`
  color: ${props => (props.isEnable ? '#000000' : '#999999')};
  font-size: ${props => props.size};
  font-weight: bold;
`;

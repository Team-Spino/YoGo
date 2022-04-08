import styled from 'styled-components/native';

interface ITitleProps {
  size: number;
}

export const Text = styled.Text<ITitleProps>`
  font-size: ${props => props.size};
  font-weight: bold;
  margin-bottom: 5;
`;

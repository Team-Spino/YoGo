import styled from 'styled-components/native';

interface ITextProps {
  color: string;
}

export const Text = styled.Text<ITextProps>`
  font-size: 16px;

  color: ${props => props.color};
`;

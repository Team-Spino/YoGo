import styled from 'styled-components/native';

interface ITextProps {
  color: string;
}

export const Text = styled.Text<ITextProps>`
  font-size: 20;

  color: ${props => props.color};

  margin-bottom: 6;
`;

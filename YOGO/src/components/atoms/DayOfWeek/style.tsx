import styled from 'styled-components/native';

interface ITextProps {
  color: string;
}

export const Container = styled.View`
  display: flex;
  flex-direction: row;
`;

export const Text = styled.Text<ITextProps>`
  color: ${props => props.color};
  margin-right: 5;
`;

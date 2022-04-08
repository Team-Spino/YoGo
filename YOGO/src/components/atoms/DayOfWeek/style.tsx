import styled from 'styled-components/native';

interface ITextProps {
  color: string;
}

export const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const Text = styled.Text`
  color: ${props => props.color};
  margin-right: 5;
`;

import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text<{ color: string }>`
  font-size: 20px;
  color: ${props => props.color};
`;

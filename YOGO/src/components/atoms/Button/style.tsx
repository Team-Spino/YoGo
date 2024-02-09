import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  height: 70px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.blue};
`;

export const Text = styled.Text`
  font-size: 20px;
  color: #fff;
`;

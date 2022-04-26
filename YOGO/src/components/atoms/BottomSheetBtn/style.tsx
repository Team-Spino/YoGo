import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  height: 45px;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.blue};
`;

export const Text = styled.Text`
  font-size: 20px;
  color: #fff;
`;

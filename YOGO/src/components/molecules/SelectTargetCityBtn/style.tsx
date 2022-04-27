import styled from 'styled-components/native';

export const Container = styled.View`
  width: 90%;
`;

export const PressContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const Wrapper = styled.View`
  width: 100%;
  padding: 15px 0;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const Text = styled.Text`
  font-size: 11px;
  color: #e5565e;
`;

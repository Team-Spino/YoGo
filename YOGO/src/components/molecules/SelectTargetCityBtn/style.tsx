import styled from 'styled-components/native';

export const Container = styled.View`
  margin-top: 20px;
  width: 100%;

  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-width: 1px;
  padding: 15px 20px;
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
  font-size: 13px;
  font-weight: bold;
  color: #e5565e;
`;

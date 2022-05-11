import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: rgba(255, 255, 255, 0.9);
  flex: 0.5;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const Wrapper = styled.TouchableOpacity`
  width: 100%;
  height: 15%;

  border: 2px solid #e6e6e6;

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const Text = styled.Text`
  font-size: 20px;
  color: #e5565e;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

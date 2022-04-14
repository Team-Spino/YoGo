import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex-shrink: 1

  background-color: #ffffff;

  border-bottom-color: #eee;
  border-bottom-width: 1;

  padding: 5px 8.2px;
`;

export const Wrapper = styled.View`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const Inner = styled.View`
  height: 100%;

  display: flex;
  align-items: flex-start;
  flex-direction: row;

  margin-top: 10;
`;

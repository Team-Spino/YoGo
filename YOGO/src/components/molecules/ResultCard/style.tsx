import styled from 'styled-components/native';

export const Container = styled.View`
  width: 333px;
  height: 122px;
  fontfamily: ${props => props.theme.font};
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  margin-top: 18px;
  border-radius: 5px;
`;

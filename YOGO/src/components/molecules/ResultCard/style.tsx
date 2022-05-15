import styled from 'styled-components/native';

export const Container = styled.View`
  width: 80%;
  height: 15%;
  fontfamily: ${props => props.theme.font};
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  margin-top: 18px;
  border-radius: 5px;
`;

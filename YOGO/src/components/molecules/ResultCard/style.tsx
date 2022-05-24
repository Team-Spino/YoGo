import styled from 'styled-components/native';

export const Container = styled.View`
  width: 80%;
  height: 15%;
  border: 1px solid ${({ theme }) => theme.colors.blue};
  fontfamily: ${props => props.theme.font};
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  margin-top: 18px;
  border-radius: 5px;
`;

export const CardHeaderBox = styled.View`
  position: absolute;
  background-color: ${props => props.theme.colors.blue};
  border-radius: 5px;
  padding: 2px 10px; 
  border: 1px solid ${props => props.theme.colors.white};
  top:-15%;
  left: 2%
`

export const CardHeaderText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
`
import styled from 'styled-components/native';

interface ILocationOfTZProps {
  size : number;
} 

export const leftDiv = styled.View`
  align-content: space-between;
  justify-content: flex-start;
  flex-direction: column;
`;

export const leftDivHeader = styled.Text<ILocationOfTZProps>`
  font-size: ${props => props.size}px;
  color: ${props => props.theme.colors.blue};
`;
export const leftDivContent = styled.Text<ILocationOfTZProps>`
  font-size: ${props => props.size}px;
`;

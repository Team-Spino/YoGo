import styled from 'styled-components/native';

interface ILocationOfTZProps {
  size : number;
} 

export const leftDiv = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const leftDivHeader = styled.Text<ILocationOfTZProps>`
  flexShrink: 1;
  font-size: ${props => props.size}px;
  color: ${props => props.theme.colors.blue};
`;
export const leftDivContent = styled.Text<ILocationOfTZProps>`
  font-size: ${props => props.size}px;
`;


export const leftDivContainer = styled.View`
  align-content: space-between;
  justify-content: flex-start;
  flex-direction: column;
  padding-left: 10px;
`;

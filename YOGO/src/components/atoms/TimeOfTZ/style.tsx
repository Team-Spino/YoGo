import styled from 'styled-components/native';

interface ITimeOfTZProps {
  size : number;
}

export const rightDiv = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  align-items: baseline;
`;
export const rightDivTime = styled.Text<ITimeOfTZProps>`
  font-size: ${props => props.size}px;
`;
export const rightDivTimeTail = styled.Text<ITimeOfTZProps>`
  margin-left: 5px;
  font-size: ${props => props.size}px;
`;

import styled from 'styled-components/native';

interface IBTargetListProps {
    size: number;
  }
  
export const List = styled.Text<IBTargetListProps>`
  font-size: ${props => props.size}px;
  font-weight: 200;
  align-items: flex-start;
  padding: 20px;
`;

export const ListBox = styled.View`
  justify-content: center;
  border-bottom-width: 0.7px;
  border-bottom-color: ${props => props.theme.colors.blue};
`
export const TouchOpacity = styled.TouchableOpacity`
  background-color: transparent;
`

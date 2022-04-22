import styled from 'styled-components/native';
import {FlatList} from 'react-native';
interface BTargetListProps {
    size: number;
  }
  
export const List = styled.Text<BTargetListProps>`
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

export const Container = (styled.FlatList`
  width: 85%;
` as unknown) as typeof FlatList;

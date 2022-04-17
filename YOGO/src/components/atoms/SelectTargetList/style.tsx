import styled from 'styled-components/native';

interface BTargetListProps {
    size: number;
  }
  

export const List = styled.Text<BTargetListProps>`
  font-size: ${props => props.size};
  font-weight: bold;
  margin-bottom: 5;
`;

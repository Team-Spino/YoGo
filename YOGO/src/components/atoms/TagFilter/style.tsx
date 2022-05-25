import styled from 'styled-components/native';

interface ITagSelectProps {
  color: string;
  isSelected: boolean;
}

export const Container = styled.TouchableOpacity<ITagSelectProps>`
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background: ${props => props.color};
  border: ${props =>
    props.isSelected ? '3px solid #6564CC' : '3px solid transparent'};
`;

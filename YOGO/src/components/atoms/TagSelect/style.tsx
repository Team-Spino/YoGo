import styled from 'styled-components/native';

interface ITagSelectProps {
  color: string;
  size: string;
}

export const Container = styled.TouchableOpacity<ITagSelectProps>`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => props.size};
  background: ${props => props.color};
`;

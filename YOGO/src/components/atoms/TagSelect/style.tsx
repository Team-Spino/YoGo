import styled from 'styled-components/native';

interface ITagSelectProps {
  color: string;
}

export const Container = styled.TouchableOpacity<ITagSelectProps>`
  width: 23px;
  height: 23px;
  border-radius: 23px;
  background: ${props => props.color};
`;

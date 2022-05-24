import styled from 'styled-components/native';

interface ITagSelectProps {
  color: string;
  isSelected: boolean;
}

export const Container = styled.TouchableOpacity<ITagSelectProps>`
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background: ${props => props.color};

  ${props =>
    props.isSelected &&
    `
        width: 20px;
        height: 20px;
        border-radius: 20px;
        border: 4px solid #6564CC;
    `}
`;

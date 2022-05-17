import styled from 'styled-components/native';

interface ITagSelectProps {
  color: string;
  isSelected: boolean;
}

export const Container = styled.TouchableOpacity<ITagSelectProps>`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background: ${props => props.color};

  ${props =>
    props.isSelected &&
    `
        background: #fff;
        border: 5px solid #6564CC;
    `}
`;

import styled from 'styled-components/native';

interface ITagProps {
  color: string;
  margin: number;
}

export const Container = styled.View<ITagProps>`
  height: 25;
  width: 5;
  margin-right: 10;
  background-color: ${props => props.color};
  margin-top: ${props => props.margin};

  border-top-left-radius: 5;
  border-top-right-radius: 5;
  border-bottom-left-radius: 5;
  border-bottom-right-radius: 5;
`;

import styled from 'styled-components/native';

interface IHeaderCenterProps {
  size: number;
}

export const Container = styled.View`
  width: 100%;
`;

export const Text = styled.Text<IHeaderCenterProps>`
  color: black;
  font-size: ${props => props.size};
  font-weight: bold;
  margin-top: 30px;

  align-self: center;
`;

import styled from 'styled-components/native';

interface IBHearderProps {
  size: number;
}
  

export const Header = styled.Text<IBHearderProps>`
  font-size: ${props => props.size};
  font-weight: bold;
  margin-bottom: 5;
  align-items: center;
  justify-content: center;
`;

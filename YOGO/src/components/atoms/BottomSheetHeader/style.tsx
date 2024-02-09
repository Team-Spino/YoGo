import styled from 'styled-components/native';

interface IBHearderProps {
  size: number;
  isWhite?: boolean;
}
  

export const Header = styled.Text<IBHearderProps>`
  font-size: ${props => props.size};
  font-weight: bold;
  margin-bottom: 5;
  align-items: center;
  justify-content: center;
  color: ${props => props.isWhite ? '#fff' : '#000'};
`;

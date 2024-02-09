import styled from 'styled-components/native';

interface ITextBtnProps {
  size: number;
}

export const Text = styled.Text<ITextBtnProps>`
  width: 90%;
  font-size: ${props => props.size}px;}
  color: #000000;
  font-weight: 200;
`;

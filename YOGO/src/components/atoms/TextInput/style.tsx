import styled from 'styled-components/native';

interface IInputProps {
  size: string;
  isTitleInputValid?: boolean;
}

export const TextInput = styled.TextInput<IInputProps>`
  width: 100%;

  font-size: ${props => `${props.size}px`};
  font-weight: 500;
  padding: 13px 15px;

  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-width: 1px;

  ${props =>
    !props.isTitleInputValid &&
    `
    border-bottom-color: #FF4949;
    border: 1px solid #FF4949;
  `}
`;

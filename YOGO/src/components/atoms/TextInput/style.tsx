import styled from 'styled-components/native';

export const TextInput = styled.TextInput<{ size: string }>`
  width: 100%;

  font-size: ${props => `${props.size}px`};
  font-weight: 500;
  padding: 13px 15px;

  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-width: 1px;
`;

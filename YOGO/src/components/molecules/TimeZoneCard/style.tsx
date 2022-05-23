import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: #fff;
  fontfamily: ${props => props.theme.font};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 1;
  border-bottom-color: #eee;
  border-bottom-width: 1;
  padding: 0 15px;

  &:last-child {
    border-bottom-width: 0;
  }
`;

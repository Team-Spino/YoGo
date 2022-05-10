import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 70px;
  fontfamily: ${props => props.theme.font};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  flex-shrink: 1;
  border-bottom-color: #eee;
  border-bottom-width: 1;
  padding: 10px 15px;
`;

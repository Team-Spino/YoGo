import styled from 'styled-components/native';

export const Container = styled.View`
  width: 400px;
  height: 70px;
  fontfamily: ${props => props.theme.font};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  flex-shrink: 1;
  margin: 0 20px;
  border-bottom-color: #eee;
  border-bottom-width: 1;
  padding: 10px 25px;
`;

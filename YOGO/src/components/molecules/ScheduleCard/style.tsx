import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  height: 120;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #ffffff;

  padding: 2.58px 8.2px;
`;

export const Wrapper = styled.View`
  width: 100%;
  height: 100%;

  border-bottom-color: #c0c0c0;
  border-bottom-width: 1;

  border-top-color: #c0c0c0;
  border-top-width: 1;

  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const Inner = styled.View`
  height: 100%;

  display: flex;
  align-items: flex-start;
  flex-direction: row;

  margin-top: 10;
`;

// export const Temp = styled.View`
//   width: 100%;

//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: row;
// `;

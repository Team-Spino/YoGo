import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  padding-bottom: 40px;
  background-color: #fff;
`;

export const RenderHiddenContainer = styled.View`
  align-items: center;
  background-color: #eb5545;
  flex: 1;
  fex-direction: row;
  justify-content: space-between;
  padding-left: 15px;
`;

export const RenderRightButton = styled.TouchableOpacity`
  width: 70px;
  align-items: center;
  background-color: #eb5545;
  justify-content: center;
  position: absolute;
  bottom: 0;
  top: 0;
  right: 0;
`;

export const RenderRightButtonText = styled.Text`
  color: #fff;
`;

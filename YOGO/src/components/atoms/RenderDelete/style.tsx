import styled from 'styled-components/native';
import { WINDOW_WIDTH } from 'styles';


export const RenderRightButton = styled.TouchableOpacity`
  width: ${WINDOW_WIDTH * 0.15}px;}  
  align-items: center;
  background-color: #EB5545;
  justify-content: center;
  position: absolute;
  bottom: 0;
  top: 0;
  right: 0;
`;

export const RenderRightButtonText = styled.Text`
  color: #fff;
`;

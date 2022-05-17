import styled from 'styled-components/native';
import { WINDOW_WIDTH } from 'styles';


export const RenderRightButton = styled.TouchableOpacity`
  width: ${WINDOW_WIDTH * 0.15}px;}  
  align-items: center;
  background-color: #F1A33C;
  justify-content: center;
  position: absolute;
  bottom: 0;
  top: 0;
  right: ${WINDOW_WIDTH * 0.15}px;}
`;

export const RenderRightButtonText = styled.Text`
  color: #fff;
`;

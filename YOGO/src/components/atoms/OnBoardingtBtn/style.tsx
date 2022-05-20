import styled from 'styled-components/native';

interface IBottomSheetBtnProps { 
  isSkip?: boolean;
}

export const Container = styled.TouchableOpacity<IBottomSheetBtnProps>`
  height: 5%;
  width: 20%;
  position: absolute;
  bottom: 5%;
  ${({ isSkip }) => isSkip ? 'left: 5%' : 'right: 5%'};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20;
  background-color: ${props => !props.isSkip ? props.theme.colors.white : props.theme.colors.blue};
`;

export const Text = styled.Text<IBottomSheetBtnProps>`
  font-size: 20px;
  font-weight: bold;
  color: ${props => !props.isSkip ? props.theme.colors.blue : props.theme.colors.white};
`;

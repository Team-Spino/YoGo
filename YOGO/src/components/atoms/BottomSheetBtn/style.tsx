import styled from 'styled-components/native';

interface IBottomSheetBtnProps { 
  isRevers?: boolean;
}

export const Container = styled.TouchableOpacity<IBottomSheetBtnProps>`
  height: 45px;
  width: 90%;
  position: absolute;
  bottom: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${props => props.isRevers ? props.theme.colors.white : props.theme.colors.blue};
`;

export const Text = styled.Text<IBottomSheetBtnProps>`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.isRevers ? props.theme.colors.blue : props.theme.colors.white};
`;

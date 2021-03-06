import styled from 'styled-components/native';

interface ISlideProps{
  isEnd?: boolean;
}

export const Container = styled.View`
  flex:1;
  position:relative;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blue};
`;

export const MainImg = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  top:-10%; 
  bottom:0; 
  justify-content: center; 
  align-items: center;
  z-index: -1;
`;

export const Content = styled.View<ISlideProps>`
  flex:1;
  margin-top: ${({ isEnd }) => isEnd ? '120%' : '100%'};
  justify-content: center;
  align-items: center;
`

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  margin-top: 30px;
  font-size: 18px;
  text-align: center; 
`

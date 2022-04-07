import styled from 'styled-components/native';


export const Wrapper = styled.View`
position: absolute;
bottom: 16px;
right: 16px;
width: 56px;
height: 56px;
borderRadius: 28px;
// iOS 전용 그림자 설정
shadowColor: '#4d4d4d';
shadowOffset: {width: 0; height: 4};
shadowOpacity: 0.3;
shadowRadius: 4;
// 안드로이드 전용 그림자 설정
elevation: 5;

`

export const Button = styled.View`
    width: 56px;
    height: 56px;
    borderRadius: 28px;
    alignItems: center;
    justifyContent: center;
    backgroundColor:  ${props => props.theme.colors.blue};
    opacity: ${({pressed}:{pressed: boolean}) => (pressed ? 0.55 : 1)}; 
`
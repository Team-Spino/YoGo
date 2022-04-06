import styled from 'styled-components/native';

export const Wrapper = styled.View`
position: 'absolute';
bottom: 16;
right: 16;
width: 56;
height: 56;
borderRadius: 28;
// iOS 전용 그림자 설정
shadowColor: '#4d4d4d';
shadowOffset: {width: 0; height: 4};
shadowOpacity: 0.3;
shadowRadius: 4;
// 안드로이드 전용 그림자 설정
elevation: 5;
// 안드로이드에서 물결 효과가 영역 밖으로 나가지 않도록 설정
// iOS에서는 overflow가 hidden일 경우 그림자가 보여지지 않음
overflow: Platform.select({android: 'hidden'});
`

export const Button = styled.Pressable`
    width: 56;
    height: 56;
    borderRadius: 28;
    backgroundColor:  ${props => props.theme.colors.blue};
   flex-end;
    justifyContent: 'center';
    alignItems: 'center';
`
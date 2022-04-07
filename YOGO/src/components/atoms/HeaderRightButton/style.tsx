import styled from 'styled-components/native';


export const Wrapper = styled.View`
marginRight: -3;
borderRadius: 24;
overflow: hidden;
`

export const Button = styled.View`
    height: 48;
    width: 48;
    alignItems: center;
    justifyContent: center; 
    opacity: ${({pressed}:{pressed: boolean}) => (pressed ? 0.3 : 1)}; 
`
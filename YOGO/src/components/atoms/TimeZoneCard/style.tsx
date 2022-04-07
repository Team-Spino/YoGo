import styled from 'styled-components/native';

export const Container = styled.View`
    width: 365px;
    height: 90px;
    fontFamily: ${props => props.theme.font};
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px;
    align-items: center;
    background-color:${props => props.theme.colors.white};
    shadowColor: "#000";
    shadowOffset: {
      width: 0;
      height: 2;
    };
    shadowOpacity: 0.25;
    shadowRadius: 3.84;
    elevation: 5;
    margin-top: 18px;

    border-radius : 5px;
`

export const leftDiv = styled.View`
    align-content: space-between;
    justify-content: flex-start;
    flex-direction: column;
`

export const leftDivHeader = styled.Text`
    font-size: 8px;
    color : ${props => props.theme.colors.blue};
`
export const leftDivContent = styled.Text`
    font-size: 20px;
`
export const rightDiv = styled.View`
    justify-content: flex-end;
    flex-direction: row;
    align-items: baseline;
`
export const rightDivTime = styled.Text`
    font-size: 32px;
`
export const rightDivTimeTail = styled.Text`
    margin-left: 5px;
    font-size: 16px;
`
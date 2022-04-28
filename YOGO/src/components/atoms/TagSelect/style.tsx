import styled from "styled-components/native";

export const Container = styled.TouchableOpacity<{color: string}>`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    color: ${props => props.color};
`

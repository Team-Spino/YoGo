import styled from "styled-components/native";

interface IContainerProps {
    backgroundColor: string;
    fontColor: string;
}

export const Container = styled.TouchableOpacity<{ backgroundColor: string }>`
    width: 38px;
    height: 38px;
    border-radius: 38px;
    background: ${props => props.backgroundColor};

    display: flex;
    justify-content: center;
    align-items: center;
`

export const Text = styled.Text<{ fontColor: string }>`
  font-size: 10px;
  color: ${props => props.fontColor};
`;

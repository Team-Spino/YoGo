import styled from "styled-components/native";

export const Container = styled.TouchableOpacity<{ backgroundColor: string }>`
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background: ${props => props.backgroundColor};

    display: flex;
    justify-content: center;
    align-items: center;
`

export const Text = styled.Text<{ fontColor: string }>`
  font-size: 12px;
  font-weight: bold;
  color: ${props => props.fontColor};
`;

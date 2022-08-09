import styled from "styled-components";
import { invertColorText } from "../../../utils/colorText";

export const DivContainer = styled.div`
    background: ${props => `linear-gradient(318deg,#ffffff,${props.color})`};
    background-size: 400% 400%;
    -webkit-animation: AnimationName 30s ease infinite;
    -moz-animation: AnimationName 30s ease infinite;
    animation: AnimationName 30s ease infinite;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    @-webkit-keyframes AnimationName {
        0%{background-position:20% 0%}
        50%{background-position:81% 100%}
        100%{background-position:20% 0%}
    }
    @-moz-keyframes AnimationName {
        0%{background-position:20% 0%}
        50%{background-position:81% 100%}
        100%{background-position:20% 0%}
    }
    @keyframes AnimationName {
        0%{background-position:20% 0%}
        50%{background-position:81% 100%}
        100%{background-position:20% 0%}
    }
`
export const FormLogin = styled.form`
    background-color: #ffffff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 30px 60px;
    width: 250px;
    margin: 0 15px;
`

export const DivHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Logo = styled.img`
    width: 100%;
`

export const DivBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const Button = styled.input`
    color: ${props => invertColorText(props.color)};
    background-color: ${props => `${props.color}`};
    border-radius: 5px;
    text-align: center;
    padding: 10px 20px;
    font-weight: bold;
    margin-top: 15px;
    cursor: pointer;
    border: none;

    &:hover {
        box-shadow: 20px 20px 50px 10px #52484a47 inset;
    }
`
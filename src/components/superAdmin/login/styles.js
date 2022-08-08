import styled from "styled-components";

export const DivContainer = styled.div`
    background: linear-gradient(318deg,#66bccf,#0e8b9e);
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
    color: white;
    background-color: #a8ad00;
    border-radius: 5px;
    text-align: center;
    padding: 10px 20px;
    font-weight: bold;
    margin-top: 15px;
    cursor: pointer;
    border: none;

    &:hover {
        background-color: #717406;
    }
`
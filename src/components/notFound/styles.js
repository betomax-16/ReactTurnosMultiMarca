import styled from "styled-components";

export const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
    color: white;

    @keyframes animate {
        0%{
            transform: translateY(0) rotate(0deg);
            opacity: 1;
            border-radius: 0;
        }
        100%{
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
            border-radius: 50%;
        }
    }

    &.background {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        margin: 0;
        padding: 0;
        background: #4fabc9;
        overflow: hidden;
    }
    &.background span {
        position: absolute;
        display: block;
        list-style: none;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.2);
        animation: animate 19s linear infinite;
    }




    &.background span:nth-child(0) {
        left: 45%;
        width: 120px;
        height: 120px;
        bottom: -120px;
        animation-delay: 1s;
    }
    &.background span:nth-child(1) {
        left: 71%;
        width: 116px;
        height: 116px;
        bottom: -116px;
        animation-delay: 1s;
    }
    &.background span:nth-child(2) {
        left: 31%;
        width: 146px;
        height: 146px;
        bottom: -146px;
        animation-delay: 3s;
    }
    &.background span:nth-child(3) {
        left: 85%;
        width: 182px;
        height: 182px;
        bottom: -182px;
        animation-delay: 12s;
    }
    &.background span:nth-child(4) {
        left: 11%;
        width: 123px;
        height: 123px;
        bottom: -123px;
        animation-delay: 7s;
    }
    &.background span:nth-child(5) {
        left: 52%;
        width: 169px;
        height: 169px;
        bottom: -169px;
        animation-delay: 7s;
    }
    &.background span:nth-child(6) {
        left: 84%;
        width: 192px;
        height: 192px;
        bottom: -192px;
        animation-delay: 10s;
    }
    &.background span:nth-child(7) {
        left: 38%;
        width: 126px;
        height: 126px;
        bottom: -126px;
        animation-delay: 20s;
    }
    &.background span:nth-child(8) {
        left: 22%;
        width: 187px;
        height: 187px;
        bottom: -187px;
        animation-delay: 28s;
    }
    &.background span:nth-child(9) {
        left: 45%;
        width: 152px;
        height: 152px;
        bottom: -152px;
        animation-delay: 33s;
    }
`

export const Title = styled.h1`
    font-size: 200px;
    margin: 0;
`

export const SubTitle = styled.h6`
    
`

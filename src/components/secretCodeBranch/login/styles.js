import styled from "styled-components";
import Gradient from "javascript-color-gradient";
import { invertColorText } from "../../../utils/colorText";

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

export const DivContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    @keyframes move {
        100% {
            transform: translate3d(0, 0, 1px) rotate(360deg);
        }
    }

    &.background {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background: ${props => props.color};
        overflow: hidden;
    }

    &.background span {
        width: 20vmin;
        height: 20vmin;
        border-radius: 20vmin;
        backface-visibility: hidden;
        position: absolute;
        animation: move;
        animation-duration: 45;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }


    &.background span:nth-child(0) {
        color: ${props => {
            const colorArr = new Gradient()
                .setColorGradient(props.color, "ffffff")
                .setMidpoint(3)
                .getColors();
            return colorArr[getRandomInt(3)];
        }};
        top: 63%;
        left: 22%;
        animation-duration: 31s;
        animation-delay: -2s;
        transform-origin: 15vw -13vh;
        box-shadow: -40vmin 0 5.782233744216344vmin currentColor;
    }
    &.background span:nth-child(1) {
        color: ${props => {
            const colorArr = new Gradient()
                .setColorGradient(props.color, "ffffff")
                .setMidpoint(3)
                .getColors();
            return colorArr[getRandomInt(3)];
        }};
        top: 31%;
        left: 64%;
        animation-duration: 14s;
        animation-delay: -26s;
        transform-origin: 11vw -20vh;
        box-shadow: -40vmin 0 5.97249094538706vmin currentColor;
    }
    &.background span:nth-child(2) {
        color: ${props => {
            const colorArr = new Gradient()
                .setColorGradient(props.color, "ffffff")
                .setMidpoint(3)
                .getColors();
            return colorArr[getRandomInt(3)];
        }};
        top: 81%;
        left: 70%;
        animation-duration: 49s;
        animation-delay: -28s;
        transform-origin: -17vw -12vh;
        box-shadow: -40vmin 0 5.054413725431031vmin currentColor;
    }
    &.background span:nth-child(3) {
        color: ${props => {
            const colorArr = new Gradient()
                .setColorGradient(props.color, "ffffff")
                .setMidpoint(3)
                .getColors();
            return colorArr[getRandomInt(3)];
        }};
        top: 54%;
        left: 67%;
        animation-duration: 25s;
        animation-delay: -35s;
        transform-origin: -24vw 11vh;
        box-shadow: 40vmin 0 5.214678229172454vmin currentColor;
    }
    &.background span:nth-child(4) {
        color: ${props => {
            const colorArr = new Gradient()
                .setColorGradient(props.color, "ffffff")
                .setMidpoint(3)
                .getColors();
            return colorArr[getRandomInt(3)];
        }};
        top: 34%;
        left: 19%;
        animation-duration: 26s;
        animation-delay: -38s;
        transform-origin: 21vw -21vh;
        box-shadow: -40vmin 0 5.697272454757896vmin currentColor;
    }
    &.background span:nth-child(5) {
        color: ${props => {
            const colorArr = new Gradient()
                .setColorGradient(props.color, "ffffff")
                .setMidpoint(3)
                .getColors();
            return colorArr[getRandomInt(3)];
        }};
        top: 34%;
        left: 50%;
        animation-duration: 32s;
        animation-delay: -16s;
        transform-origin: 9vw -22vh;
        box-shadow: -40vmin 0 5.951001327154683vmin currentColor;
    }
    &.background span:nth-child(6) {
        color: ${props => {
            const colorArr = new Gradient()
                .setColorGradient(props.color, "ffffff")
                .setMidpoint(3)
                .getColors();
            return colorArr[getRandomInt(3)];
        }};
        top: 62%;
        left: 16%;
        animation-duration: 18s;
        animation-delay: -32s;
        transform-origin: 4vw -17vh;
        box-shadow: -40vmin 0 5.26670848722971vmin currentColor;
    }
    &.background span:nth-child(7) {
        color: ${props => {
            const colorArr = new Gradient()
                .setColorGradient(props.color, "ffffff")
                .setMidpoint(3)
                .getColors();
            return colorArr[getRandomInt(3)];
        }};
        top: 38%;
        left: 79%;
        animation-duration: 21s;
        animation-delay: -1s;
        transform-origin: 24vw 24vh;
        box-shadow: -40vmin 0 5.877482876235723vmin currentColor;
    }
    &.background span:nth-child(8) {
        color: ${props => {
            const colorArr = new Gradient()
                .setColorGradient(props.color, "ffffff")
                .setMidpoint(3)
                .getColors();
            return colorArr[getRandomInt(3)];
        }};
        top: 87%;
        left: 76%;
        animation-duration: 45s;
        animation-delay: -40s;
        transform-origin: -23vw -14vh;
        box-shadow: 40vmin 0 5.692929209974491vmin currentColor;
    }
    &.background span:nth-child(9) {
        color: ${props => {
            const colorArr = new Gradient()
                .setColorGradient(props.color, "ffffff")
                .setMidpoint(3)
                .getColors();
            return colorArr[getRandomInt(3)];
        }};
        top: 16%;
        left: 88%;
        animation-duration: 27s;
        animation-delay: -1s;
        transform-origin: 19vw 16vh;
        box-shadow: 40vmin 0 5.075065613807865vmin currentColor;
    }
    &.background span:nth-child(10) {
        color: ${props => {
            const colorArr = new Gradient()
                .setColorGradient(props.color, "ffffff")
                .setMidpoint(3)
                .getColors();
            return colorArr[getRandomInt(3)];
        }};
        top: 83%;
        left: 92%;
        animation-duration: 8s;
        animation-delay: -38s;
        transform-origin: 8vw -4vh;
        box-shadow: -40vmin 0 5.943818120905865vmin currentColor;
    }
    &.background span:nth-child(11) {
        color: ${props => {
            const colorArr = new Gradient()
                .setColorGradient(props.color, "ffffff")
                .setMidpoint(3)
                .getColors();
            return colorArr[getRandomInt(3)];
        }};
        top: 75%;
        left: 55%;
        animation-duration: 46s;
        animation-delay: -7s;
        transform-origin: -1vw 24vh;
        box-shadow: 40vmin 0 5.700466660926507vmin currentColor;
    }
    &.background span:nth-child(12) {
        color: ${props => {
            const colorArr = new Gradient()
                .setColorGradient(props.color, "ffffff")
                .setMidpoint(3)
                .getColors();
            return colorArr[getRandomInt(3)];
        }};
        top: 16%;
        left: 50%;
        animation-duration: 14s;
        animation-delay: -18s;
        transform-origin: -20vw 21vh;
        box-shadow: -40vmin 0 5.163638455366193vmin currentColor;
    }
    &.background span:nth-child(13) {
        color: ${props => {
            const colorArr = new Gradient()
                .setColorGradient(props.color, "ffffff")
                .setMidpoint(3)
                .getColors();
            return colorArr[getRandomInt(3)];
        }};
        top: 78%;
        left: 95%;
        animation-duration: 29s;
        animation-delay: -7s;
        transform-origin: -13vw 21vh;
        box-shadow: 40vmin 0 5.057400090811951vmin currentColor;
    }
    &.background span:nth-child(14) {
        color: ${props => {
            const colorArr = new Gradient()
                .setColorGradient(props.color, "ffffff")
                .setMidpoint(3)
                .getColors();
            return colorArr[getRandomInt(3)];
        }};
        top: 26%;
        left: 94%;
        animation-duration: 24s;
        animation-delay: -9s;
        transform-origin: 21vw -18vh;
        box-shadow: 40vmin 0 5.475255095612258vmin currentColor;
    }
    &.background span:nth-child(15) {
        color: ${props => {
            const colorArr = new Gradient()
                .setColorGradient(props.color, "ffffff")
                .setMidpoint(3)
                .getColors();
            return colorArr[getRandomInt(3)];
        }};
        top: 55%;
        left: 28%;
        animation-duration: 11s;
        animation-delay: -44s;
        transform-origin: 11vw -9vh;
        box-shadow: 40vmin 0 5.009620425434983vmin currentColor;
    }
    &.background span:nth-child(16) {
        color: ${props => {
            const colorArr = new Gradient()
                .setColorGradient(props.color, "ffffff")
                .setMidpoint(3)
                .getColors();
            return colorArr[getRandomInt(3)];
        }};
        top: 32%;
        left: 69%;
        animation-duration: 33s;
        animation-delay: -17s;
        transform-origin: -6vw 3vh;
        box-shadow: -40vmin 0 5.44248183340654vmin currentColor;
    }
    &.background span:nth-child(17) {
        color: ${props => {
            const colorArr = new Gradient()
                .setColorGradient(props.color, "ffffff")
                .setMidpoint(3)
                .getColors();
            return colorArr[getRandomInt(3)];
        }};
        top: 77%;
        left: 96%;
        animation-duration: 38s;
        animation-delay: -11s;
        transform-origin: 18vw -8vh;
        box-shadow: -40vmin 0 5.232154811165836vmin currentColor;
    }
    &.background span:nth-child(18) {
        color: ${props => {
            const colorArr = new Gradient()
                .setColorGradient(props.color, "ffffff")
                .setMidpoint(3)
                .getColors();
            return colorArr[getRandomInt(3)];
        }};
        top: 31%;
        left: 15%;
        animation-duration: 50s;
        animation-delay: -33s;
        transform-origin: 19vw 23vh;
        box-shadow: -40vmin 0 5.295774387555279vmin currentColor;
    }
    &.background span:nth-child(19) {
        color: ${props => {
            const colorArr = new Gradient()
                .setColorGradient(props.color, "ffffff")
                .setMidpoint(3)
                .getColors();
            return colorArr[getRandomInt(3)];
        }};
        top: 30%;
        left: 58%;
        animation-duration: 35s;
        animation-delay: -23s;
        transform-origin: 0vw 8vh;
        box-shadow: -40vmin 0 5.169098490842174vmin currentColor;
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
    z-index: 1;
`

export const DivHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
`

export const Logo = styled.img`
    height: 100%;
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
import styled from "styled-components";

export const DivContainer = styled.div`
    display: flex;
    height: 100vh;
`;

export const DivLeft = styled.div`
    width: 65px;
    height: 100%;

    @media only screen and (min-width: 768px) {
        width: 300px;
    }

    @media only screen and (min-width: 992px) {
        width: 300px;
    }

    @media only screen and (min-width: 1200px) {
        width: 300px;
    }

    @media only screen and (min-width: 1700px) {
        width: 300px;
    }
`;

export const DivRight = styled.div`
    box-sizing: border-box;
    width: 100%;
    background-color: white;
    height: 100%;
    padding: 10px 25px;
    position: relative;

    &:before {
        content: '';
        /* background-image: url("../../public/img/fondoVigia.jpg"); */
        background-color: #cccccc;
        background-size: auto;
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.15;
    }
`;
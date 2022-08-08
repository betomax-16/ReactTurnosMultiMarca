import styled, {css} from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #05805e;
    box-shadow: inset -7px 0px 20px #13664f;
    color: white;
    overflow: auto;
`;

export const ImgLogo = styled.img`
    width: 100%;
`

export const DivLogo = styled.div`
    background-color: white;
    box-shadow: inset -7px 0px 20px #e4e5e5;
    padding: 5px;
`

export const DivOptions = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 8px;
    height: 100%;
    position: relative;

    /* &:before {
        content: '';
        background-image: url("../../../public/img/fondoAdmin.png");
        background-color: #cccccc;
        background-size: auto;
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.15;
    } */
`

export const LinkStyle = styled(Link)`
    color: white;
    text-decoration: none;
`
export const Icon = styled.div`
    z-index: 1;
    width: 30px;
    transition: transform .2s;

    &:hover{
        transform: scale(1.1);
    }
`

export const Title = styled.span`
    z-index: 1;
    margin-left: 25px;
`

export const DivOption = styled.div`
    margin-bottom: 5px;
    z-index: 1;
    box-sizing: border-box;
    text-align: center;
    width: 100%;
    padding: 10px 20px;
    display: flex;
    overflow: hidden;
    align-items: center;
    cursor: pointer;
    font-weight: bold;
    font-size: 20px;
    position: relative;
    min-height: 60px;
    max-height: 60px;

    &:before {
        content: '';
        position: absolute;
        width: 96px;
        height: 100%;
        background-color: #ffffff70;
        left: -34px;
        top: 0px;
        border-radius: 14%;
    }

    &:hover {
        background-color: #0774553d;
        box-shadow: inset -2px 0px 20px #13664f;
    }
`

export const DivSubOption = styled.div`
    margin-bottom: 5px;
    z-index: 1;
    box-sizing: border-box;
    text-align: center;
    width: 100%;
    padding: 10px 20px;
    display: flex;
    overflow: hidden;
    align-items: center;
    cursor: pointer;
    font-weight: bold;
    font-size: 20px;
    position: relative;
    min-height: 60px;
    max-height: 60px;

    @media only screen and (min-width: 768px) {
        padding-left: 40px;
    } 

    @media only screen and (min-width: 992px) {
        padding-left: 40px;
    } 

    @media only screen and (min-width: 1200px) {
        padding-left: 40px;
    } 

    @media only screen and (min-width: 1700px) {
        padding-left: 40px;
    } 

    &:before {
        content: '';
        position: absolute;
        width: 96px;
        height: 100%;
        background-color: #7cff8a70;
        left: -34px;
        top: 0px;
        border-radius: 14%;

        @media only screen and (min-width: 768px) {
            left: -15px;
        }

        @media only screen and (min-width: 992px) {
            left: -15px;
        }

        @media only screen and (min-width: 1200px) {
            left: -15px;
        }

        @media only screen and (min-width: 1700px) {
            left: -15px;
        }
    }

    &:hover {
        background-color: #0774553d;
        box-shadow: inset -2px 0px 20px #13664f;
    }
`

export const SubMenu = styled.div`
    max-height: 0;
    transition: max-height 0.15s ease-out;
    overflow: hidden;


    ${props => {
        if (props.show === true) {
            return css`
                max-height: 265px;
                transition: max-height 0.25s ease-in;
            `;
        }
        else {
            return css``;
        }
    }};
`
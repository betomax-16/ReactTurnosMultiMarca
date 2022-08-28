import styled from "styled-components";
import Gradient from "javascript-color-gradient";
import { invertColorText } from "../../../utils/colorText";

export const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
`

export const DivEmptyHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #079970;
    color: white;
    flex-direction: column;
    z-index: 1;
`

export const DivEmptyBody = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    z-index: 1;
`

export const DivTakeTurnHeader = styled.div`
    color: ${props => props.color};
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 auto;
    background-color: #f7f4e7;
`

export const TitleTakeTurnHeader = styled.h1`
    margin: 0;
    margin-top: 25px;
`

export const LogoTakeTurnHeader = styled.img`
    width: 250px;
`

export const BranchTakeTurnHeader = styled.span`
    color: ${props => props.color};
    margin: 0;
    margin-bottom: 25px;
    font-size: 22px;
    text-transform: capitalize;
    font-weight: bold;
`


export const DivTakeTurnBody = styled.div`
    background-color: ${props => props.color};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 25px 0;
    flex: 1 0 auto;
    z-index: 1;
`

export const SubTitleTakeTurnBody = styled.h3`
    margin: 0;
    font-size: 50px;
    color: ${props => invertColorText(props.color)};
`

export const DivTakeTurnButtons = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    flex: 1 0 auto;
`

export const DivTakeTurnButton = styled.div`
    background-color: ${props => {
        const colorArr = new Gradient()
            .setColorGradient(props.color, "ffffff")
            .setMidpoint(10)
            .getColors();
        return colorArr[1];
    }};
    color: ${props => invertColorText(props.color)};
    border-radius: 5px;
    padding: 15px 30px;
    width: 25%;
    min-width: 200px;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background-color: ${props => {
            const colorArr = new Gradient()
                .setColorGradient(props.color, "ffffff")
                .setMidpoint(10)
                .getColors();
            return colorArr[0];
        }};
    }
`

export const DivTakeTurnFooter = styled.div`
    background-color: ${props => {
        const colorArr = new Gradient()
            .setColorGradient(props.color, "ffffff")
            .setMidpoint(10)
            .getColors();
        return colorArr[0];
    }};
    color: ${props => invertColorText(props.color)};
    display: flex;
    justify-content: center;
    flex: 0 0 auto;
    text-align: center;
`

export const SubTitleTakeTurnFooter = styled.h2`
    font-size: 1.2em;

    @media only screen and (min-width: 768px) {
        
    } 

    @media only screen and (min-width: 992px) {
        font-size: 1.5em;
    } 

    @media only screen and (min-width: 1200px) {
        font-size: 1.5em;
    } 

    @media only screen and (min-width: 1700px) {
        font-size: 1.5em;
    } 
`
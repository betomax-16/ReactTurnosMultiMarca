import styled from "styled-components";
import Gradient from "javascript-color-gradient";
import { invertColorText } from "../../../../utils/colorText";

const getColor = (color, index) => {
    const colorArr = new Gradient()
        .setColorGradient(color, "ffffff")
        .setMidpoint(10)
        .getColors();
    return colorArr[index];
}

export const NavContainer = styled.nav`    
    display: flex;
    justify-content: space-between;
    background-color: ${props => props.color};
    box-shadow: inset 0px -4px 20px 0px #a7a7a7;
    height: 63px;
`;

export const LogoContainer = styled.div`    
    background-color: white;
`;

export const Logo = styled.img`
    height: 100%;
    padding: 5px;
    box-sizing: border-box;
`

export const TitleContainer = styled.div`    
    display: flex;
    align-items: center;
`;

export const TitleMenu = styled.span`    
    font-size: 30px;
    font-weight: bold;
    color: ${props => invertColorText(props.color)};
    text-align: center;
`;

export const OptionsContainer = styled.div`    
    display: flex;
    grid-gap: 15px;
    gap: 15px;
    box-sizing: border-box;
    padding: 10px 15px;
`;

export const OptionButton = styled.div`    
    background-color: ${props => {
        return getColor(props.color, 1);
    }};
    padding: 10px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: ${props => {
        return invertColorText(getColor(props.color, 1));
    }};
    border: 1px solid;
    border-radius: 5px;
    text-align: center;

    & .icon {
        margin-right: 5px;
    }

    &:hover {
        background-color: ${props => {
            return getColor(props.color, 0);
        }};
    }

    @media only screen and (min-width: 768px) {
        padding: 10px 20px;
    } 

    @media only screen and (min-width: 992px) {
        padding: 10px 20px;
    } 

    @media only screen and (min-width: 1200px) {
        padding: 10px 20px;
    } 

    @media only screen and (min-width: 1700px) {
        padding: 10px 20px;
    } 
`;

export const ButtonText = styled.span`    
    display: none;

    @media only screen and (min-width: 768px) {
        display: inherit;
    } 

    @media only screen and (min-width: 992px) {
        display: inherit;
    } 

    @media only screen and (min-width: 1200px) {
        display: inherit;
    } 

    @media only screen and (min-width: 1700px) {
        display: inherit;
    } 
`;

export const SubMenuContainer = styled.div`    
    display: flex;
    grid-gap: 15px;
    gap: 15px;
    box-sizing: border-box;
    padding: 10px 15px;
`;

export const ButtonSubMenu = styled.div`    
    cursor: pointer;
    background-color: ${props => {
        return getColor(props.color, 1);
    }};
    padding: 5px 10px;
    color: ${props => {
        return invertColorText(getColor(props.color, 1));
    }};
    font-weight: bold;
    border-radius: 5px;
    text-align: center;
    margin: 5px;

    &:hover {
        background-color: ${props => {
            return getColor(props.color, 0);
        }};
    }
`;
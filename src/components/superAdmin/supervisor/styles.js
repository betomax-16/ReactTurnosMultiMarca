import styled, {css} from "styled-components";
import Gradient from "javascript-color-gradient";
import { invertColorText } from "../../../utils/colorText";

export const DivContainer = styled.div`    
    min-height: 100vh;
    height: 100vh;
`;

export const DivContent = styled.div`    
    display: flex;
    height: calc(100vh - 63px);

    @media only screen and (min-width: 1700px) {
        flex-direction: column;
    } 
`;

export const DivContentBody = styled.div`    
    display: none;
    width: calc(100% - 250px);
    overflow: auto;

    @media only screen and (min-width: 600px) {
        display: flow-root;
    }

    @media only screen and (min-width: 768px) {
        display: flow-root;
    } 

    @media only screen and (min-width: 992px) {
        display: flow-root;
    } 

    @media only screen and (min-width: 1200px) {
        display: flow-root;
    } 

    @media only screen and (min-width: 1700px) {
        display: flow-root;
    } 
`;

export const DivContentGreeting = styled.div`    
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100% - 63px);
`;

export const GreetingTitle = styled.span`    
    font-size: 500%;
    color: ${props => {
        const colorArr = new Gradient()
            .setColorGradient(props.color, "ffffff")
            .setMidpoint(10)
            .getColors();
        return colorArr[3];
    }};
    font-weight: bold;
    text-align: center;
`;



export const DivUp = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: #f7f7f7;
    padding: 0 25px;
    position: relative;
    width: 30%;

    &:before{
        content: "";
        background-image: url("../../public/img/fondoVigia.jpg");
        background-color: #cccccc;
        background-size: auto;
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.15;
    }

    @media only screen and (min-width: 768px) {
        width: 20%;
    } 

    @media only screen and (min-width: 992px) {
        width: 20%;
    } 

    @media only screen and (min-width: 1700px) {
        height: 40%;
        width: 100%;
    } 
`

export const UpTitle = styled.span`
    font-size: 30px;
    font-weight: bold;
    color: ${props => props.color};
    padding-top: 10px;
`

export const UpList = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 100%;
    z-index: 1;

    @media only screen and (min-width: 1700px) {
        flex-direction: row;
    } 
`

export const DivDown = styled.div`
    position: relative;
    box-sizing: border-box;
    background-color: ${props => props.color};
    padding: 5px 25px;
    overflow: auto;
    width: 100%;
    top: 0;

    @media only screen and (min-width: 1700px) {
        height: 60%;
        width: 100%;
    } 
`
export const DownTitle = styled.span`
     font-size: 30px;
    font-weight: bold;
    color: ${props => invertColorText(props.color)};
    padding-top: 10px;
`

export const TabContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100% - 60px);
    margin-top: 15px;
`

export const TabButtons = styled.div`
    display: flex;
`

export const Tab = styled.div`
    ${props => {
        if (props.selected) {
            return css`
                color: ${props => invertColorText(props.color)};
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 15px;
                width: 50%;
                background-color: ${props => {
                    const colorArr = new Gradient()
                        .setColorGradient(props.color, "#ffffff")
                        .setMidpoint(10)
                        .getColors();
                    return colorArr[0];
                }};
                position: relative;
                cursor: pointer;
                font-size: 20px;
                font-weight: bold;

                &:before{
                    content: '';
                    width: 100%;
                    height: 5px;
                    background-color: white;
                    position: absolute;
                    bottom: 0;
                }
            `
        }
        else {
            return css`
                color: ${props => invertColorText(props.color)};
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 15px;
                width: 50%;
                background-color: ${props => {
                    const colorArr = new Gradient()
                        .setColorGradient(props.color, "#ffffff")
                        .setMidpoint(10)
                        .getColors();
                    return colorArr[2];
                }};
                cursor: pointer;
                font-size: 20px;
                font-weight: bold;
            `
        }
    }};

    &:hover{
        background-color: ${props => {
            const colorArr = new Gradient()
                .setColorGradient(props.color, "#ffffff")
                .setMidpoint(10)
                .getColors();
            return colorArr[0];
        }};
    }
`

export const TabBody = styled.div`
    display: flex;
    background-color: #cccccc;
    height: 100%;
`

export const Page = styled.div`
    width: 100%;
    background-color: white;
`

export const setTableStyles = (color) => {
    const colorArr = new Gradient()
    .setColorGradient(color, "ffffff")
    .setMidpoint(5)
    .getColors();

    return {
        '& .MuiDataGrid-columnHeaders': {
            background: colorArr[0],
            color: '#fff',
            borderRadius: "5px 5px 0 0"
        },
        '& .MuiDataGrid-row:nth-of-type(even)': {
            background: colorArr[2]
        },
        '& .Mui-checked': {
            color: colorArr[1]
        },
    }
}
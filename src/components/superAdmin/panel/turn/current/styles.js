import styled, {css} from "styled-components";
import Gradient from "javascript-color-gradient";
import { invertColorText } from "../../../../../utils/colorText";

export const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 1;
`;

export const DivContent = styled.div`    
    display: flex;
    height: calc(100vh - 63px);

    @media only screen and (min-width: 1700px) {
        flex-direction: column;
    } 
`;

export const DivDown = styled.div`
    position: relative;
    box-sizing: border-box;
    overflow: auto;
    width: 100%;
    top: 0;

    @media only screen and (min-width: 1700px) {
        height: 100%;
        width: 100%;
    } 
`

export const TabContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100% - 40px);
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
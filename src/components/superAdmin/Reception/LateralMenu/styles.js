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

export const DivContainer = styled.div`    
    display: flex;
    flex-direction: column;
    background: ${props => props.color};
    color: ${props => invertColorText(props.color)};
    width: 100%;

    @media only screen and (min-width: 600px) {
        width: 250px;
    }

    @media only screen and (min-width: 768px) {
        width: 250px;
    } 

    @media only screen and (min-width: 992px) {
        width: 250px;
    } 

    @media only screen and (min-width: 1200px) {
        width: 250px;
    } 

    @media only screen and (min-width: 1700px) {
        width: 250px;
    } 
`;

export const DivOptions = styled.div`    
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    overflow: auto;
`;

export const DivOptionsTitle = styled.div`    
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => {
        return getColor(props.color, 1);
    }};
`;

export const DivOptionsButtons = styled.div`    
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 75px;

    @media only screen and (min-width: 600px) {
        padding: 0 15px;
    }

    @media only screen and (min-width: 768px) {
        padding: 0 15px;
    } 

    @media only screen and (min-width: 992px) {
        padding: 0 15px;
    } 

    @media only screen and (min-width: 1200px) {
        padding: 0 15px;
    } 

    @media only screen and (min-width: 1700px) {
        padding: 0 15px;
    } 
`;

export const DivOptionButton = styled.div`    
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 10px 20px;
    background-color: ${props => {
        return props.disable ? getColor(props.color, 6) : getColor(props.color, 2);
    }};
    border-radius: 5px;
    color: ${props => {
        return props.disable ? invertColorText(props.color) : invertColorText(props.color, 2);
    }};
    margin: 10px 5px;
    cursor: ${props => {
        return props.disable ? 'auto' : 'pointer';
    }};
    font-weight: bold;

    &:hover {
        background-color: ${props => {
            return props.disable ? getColor(props.color, 6) : getColor(props.color, 1);
        }};
    }
`;

export const DivOptionButtonSubIndex = styled.div`    
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: red;
    color: white;
    font-weight: bold;
    padding: 2px;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const DivCurrentTurn = styled.div`    
    display: flex;
    flex-direction: column;
`;

export const DivButtonAction = styled.div`    
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 15px;
    box-sizing: border-box;
    width: ${props => {
        return props.recall ? '100%' : '50%';
    }};
    cursor: pointer;
    font-weight: bold;
    background-color: ${props => {
        let color = '';
        if (props.recall) {
            color = '#32aecd'
        }

        if (props.finish) {
            color = 'yellowgreen'
        }

        if (props.cancel) {
            color = '#cf0303'
        }

        return color;
    }};

    &:hover {
        background-color: ${props => {
            let color = '';
            if (props.recall) {
                color = '#52d0f0'
            }

            if (props.finish) {
                color = '#b5f13b'
            }

            if (props.cancel) {
                color = 'red'
            }

            return color;
        }};
    }
`;

export const DivCurrentContent = styled.div`    
    display: flex;
    flex-direction: column;
    color: black;
    background-color: white;
`;

export const CurrentContentTitle = styled.h4`    
    text-align: center;
`;

export const CurrentContentTurn = styled.span`    
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    margin-bottom: 25px;
`;

export const DivCurrentButtons = styled.div`    
    display: flex;
    justify-content: center;
`;

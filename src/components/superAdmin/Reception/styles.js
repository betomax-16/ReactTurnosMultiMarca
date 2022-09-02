import styled from "styled-components";
import Gradient from "javascript-color-gradient";

export const DivContainer = styled.div`    
    min-height: 100vh;
    height: 100vh;
`;

export const DivContent = styled.div`    
    display: flex;
    height: calc(100vh - 63px);
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
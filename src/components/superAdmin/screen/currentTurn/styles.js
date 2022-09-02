import styled from "styled-components";

export const DivContainer = styled.div`    
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    background: linear-gradient(318deg, #f7f7f7, #fafcea);
    background-size: 400% 400%;
    -webkit-animation: AnimationName 30s ease infinite;
    -moz-animation: AnimationName 30s ease infinite;
    animation: AnimationName 30s ease infinite;
    width: 100%;

    @-webkit-keyframes AnimationBack {
        0%{background-position:20% 0%}
        50%{background-position:81% 100%}
        100%{background-position:20% 0%}
    }
    @-moz-keyframes AnimationBack {
        0%{background-position:20% 0%}
        50%{background-position:81% 100%}
        100%{background-position:20% 0%}
    }
    @keyframes AnimationBack {
        0%{background-position:20% 0%}
        50%{background-position:81% 100%}
        100%{background-position:20% 0%}
    }
`;

export const DivTurnInfo = styled.div`    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70%;
`;

export const DivFrame = styled.div`    
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 7px;
    box-shadow: 7px 7px 17px 0px black;
    /* min-width: 382px;
    min-height: 277px; */
    width: 50%;
    height: 65%;
    min-width: 420px;
    min-height: 346px;
    max-width: 600px;
    max-height: 400px;
    background-color: rgb(247 251 222);
`;

export const InfoTitle = styled.h2`    
    font-size: 300%;
    margin: 0;
    width: 100%;
    border-radius: 7px 7px 0 0;
    text-align: center;
    background-color: #f4f5c8;
    color: #746300;
`;

export const InfoTurn = styled.span`    
    font-size: 1000%;
    background-color: rgb(247 251 222);
    border-radius: 0 0 7px 7px;
    font-weight: bold;
    color: #746300;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const DivModuleInfo = styled.div`    
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    /* height: 50%; */
    height: 30%;
    /* overflow: hidden; */
`;

export const ModuleUbication = styled.span`    
    font-size: 800%;
    font-weight: bold;
    color: #746300;
    position: absolute;
    top: -30%;
`;

export const Wave = styled.img`    
    position: absolute;
    bottom: ${props => props.type === 'down' ? '-50%' : '0'};
`;
import styled from "styled-components";
import { invertColorText } from "../../../../utils/colorText";

export const DivContainer = styled.div`    
    display: flex;
    height: 100%;
`;

export const DivAds = styled.div`    
    display: none;
    background-color: ${props => props.color};

    @media only screen and (min-width: 992px) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70%;
    } 

    @media only screen and (min-width: 1200px) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70%;
    } 

    @media only screen and (min-width: 1700px) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70%;
    } 
`;

export const Ad = styled.img`    
    /* width: 100%; */
    padding: 25px;
    box-sizing: border-box;
`;

export const List = styled.div`    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background-color: #eeefe6;

    @media only screen and (min-width: 992px) {
        width: 30%;
    } 

    @media only screen and (min-width: 1200px) {
        width: 30%;
    } 

    @media only screen and (min-width: 1700px) {
        width: 30%;
    } 
`;

export const ListSubTitle = styled.div`    
    font-size: 200%;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    background-color: ${props => props.color};
    color: ${props => invertColorText(props.color)};

    @media only screen and (min-width: 1700px) {
        font-size: 300%;
    } 
`;

export const ListTurns = styled.div`    
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0px 0px;
    overflow: auto;
    height: 100%;
`;

export const TurnCard = styled.div`    
    display: flex;
    flex-direction: column;
`;

export const TurnCardTitle = styled.div`    
    background-color: #f4f5c8;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    font-size: 180%;
    font-weight: 500;
    color: #746300;
`;

export const TurnCardBody = styled.div`    
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 600%;
    padding: 20px 0;
    background-color: #f7fbde;
    height: 100%;
    color: #746300;
`;

export const ListDate = styled.div`    
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: #ffc77a; */
    background-color: ${props => props.color};
    color: ${props => invertColorText(props.color)};
`;

export const Date = styled.div`    
    font-size: 100%;
    text-align: center;
    width: 50%;
    padding: 25px 10px;
    border-right: 1px dashed #a5d3c7;

    & span {
        font-size: 150%;
        font-weight: 500;
    }

    @media only screen and (min-width: 992px) {
        display: none;
    } 

    @media only screen and (min-width: 1200px) {
        font-size: 120%;
    }

    @media only screen and (min-width: 1700px) {
        display: initial;
    }
`;

export const Hour = styled.div`    
    font-size: 150%;
    text-align: center;
    width: 50%;
    padding: 25px 10px;
    font-weight: bold;

    & span {
        font-size: 10px;
        font-weight: bold;
    }

    @media only screen and (min-width: 1200px) {
        font-size: 35px;
    } 
`;
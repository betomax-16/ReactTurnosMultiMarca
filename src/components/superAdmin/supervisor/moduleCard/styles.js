import styled from "styled-components";

export const DivContainer = styled.div`    
    display: flex;
    flex-direction: column;
    border: 1px solid #cccccc;
    border-radius: 5px;
    margin: 20px 10px;
    box-sizing: border-box;
    position: relative;
    background-color: white;
    cursor: pointer;
    transition: transform .2s;

    &:hover{
        transform: scale(1.1);
    }

    &:before{
        content: "";
        background-image: url("../../../public/img/fondoCards.jpg");
        background-color: #cccccc;
        background-size: cover;
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.25;
    }
`;

export const DivCardBody = styled.div`    
    display: flex;
    align-items: center;
    font-weight: bold;
    z-index: 1;
    justify-content: flex-start;
    font-size: 75px;
    color: white;
    overflow: hidden;
    position: absolute;
    right: 0;

    @media only screen and (min-width: 1700px) {
        font-size: 450%;
        height: 54%;
        justify-content: center;
        color: inherit;
        overflow: inherit;
        position: relative;
    } 
`;

export const DivContainerColor = styled.div`
    display: flex;
    position: relative;
    overflow: hidden;
    flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: center;
    height: 57px;

    &:before {
        content: "";
        background-color: ${props => {
            let color = '#fff';
            switch (props.status) {
                case 'Libre':
                    color = '#e7e7e7';
                    break;
                case 'Activo':
                    color = '#136646';
                    break;
                case 'Inactivo':
                    color = '#f76161';
                    break;
                default:
                    break;
            }
        }};
        position: absolute;
        top: -20px;
        right: -20px;
        height: 110px;
        width: 110px;
        border-radius: 50%;
    }
`;

export const DivCardFooter = styled.div`    
    display: none;
    flex-direction: column;
    align-items: center;
    z-index: 1;

    @media only screen and (min-width: 768px) {
        display: flex;
    } 

    @media only screen and (min-width: 992px) {
        display: flex;
    } 

    @media only screen and (min-width: 1200px) {
        display: flex;
    } 

    @media only screen and (min-width: 1700px) {
        display: flex;
        z-index: 0;
        height: 55%;
    } 
`;

export const DivCardFooterTitle = styled.span`    
    display: none;
    font-weight: bold;
    text-align: center;
    font-size: 25px;
    color: #136646;
    margin-top: 10px;

    @media only screen and (min-width: 1700px) {
        display: inherit;
    } 
`;

export const DivCardFooterImportant = styled.span`    
    color: rgb(0 0 0 / 87%);
    font-weight: bold;
    font-size: 20px;
    margin-left: 25px;

    @media only screen and (min-width: 1700px) {
        color: #136646;
        font-size: inherit;
        margin-right: 0;
        margin-left: 0;
    } 
`;

export const DivCardFooterTag = styled.span`    
    overflow: hidden;
    font-size: 0;

    &:nth-child(3) {
        display: none;

        @media only screen and (min-width: 1700px) {
            display: inherit;
        }    

        &:DivCardFooterImportant {
            @media only screen and (min-width: 1700px) {
                margin-left: 5px;
            } 
        }
    }

    @media only screen and (min-width: 1700px) {
        font-size: inherit;
    } 
`;
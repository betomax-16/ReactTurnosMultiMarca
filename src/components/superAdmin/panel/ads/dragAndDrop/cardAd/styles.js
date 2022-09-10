import styled from "styled-components";

export const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    border: 1px black solid;
    border-radius: 5px;
    justify-content: end;
`;

export const ButtonClose = styled.span`
    position: absolute;
    top: -9px;
    right: -9px;
    background: red;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;

    &:hover {
        background: #d60606;
    }
`;

export const DivCardImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    overflow: hidden;
    background-color: #ededed;
    border-radius: 5px 5px 0 0;
`;

export const Image = styled.img`
    height: 200px;
    border-radius: 5px;
`;

export const DivCardSwitch = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    background-color: #fffffd;
    border-radius: 0 0 5px 5px;
`;
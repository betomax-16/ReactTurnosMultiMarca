import styled from "styled-components";
import { BsPlusCircleDotted } from "react-icons/bs";

export const DivHeader = styled.div`
    display: flex;
    align-items: center;
    padding-top: 8px;
    box-shadow: #00000014 0px 8px 5px;
`;

export const ButtonPlus = styled(BsPlusCircleDotted)`
    min-height: 30px;
    min-width: 30px;
    padding: 10px 20px;
    cursor: pointer;
    transition: transform .2s;

    &:hover {
        transform: scale(1.2);
    }
`;

export const HeaderTitle = styled.span`
    &:nth-child(2) {
        margin-right: 20px;
    }
    &:nth-child(3) {
        margin-right: 85px;
    }
    &:nth-child(4) {
        margin-right: 35px;
    }
    &:nth-child(5) {
        margin-right: 150px;
    }
`;

export const DivFilters = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
    max-height: 700px;
`;
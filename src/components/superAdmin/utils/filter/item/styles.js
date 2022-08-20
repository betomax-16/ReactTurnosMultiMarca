import styled from "styled-components";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";

export const DivContainer = styled.div`
    display: flex;
    align-items: center;
    padding-top: 8px;
    height: 90px;
    padding: 0 8px 0px 8px;
    box-shadow: #9994947a 1px 1px 1px;
    display: flex;
    align-items: center;
`;

export const ButtonRemove = styled(MdOutlineRemoveCircleOutline)`
    min-height: 30px;
    min-width: 30px;
    cursor: pointer;
    margin-top: 10px;
    margin-left: 10px;
    transition: transform .2s;
    border-radius: 50%;

    &:hover {
        transform: scale(1.2);
    }
`;


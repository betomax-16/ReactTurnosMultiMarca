import styled from "styled-components";
import Gradient from "javascript-color-gradient";
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { invertColorText } from "../../../../utils/colorText";

export const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 1;
`;

export const DivTable = styled.div`
    height: 100%;
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 80px;
`;

export const DivButtons = styled.div`
    display: flex;
    flex-direction: row-reverse;
    position: fixed;
    bottom: 20px;
    right: 20px;
    gap: 15px;
`
export const DivModalBranch = styled.div`
    display: flex;
    gap: 30px;
`

export const IconAdd = styled(BsPlusLg)`
    transition: transform .2s;
`

export const IconEdit = styled(MdModeEdit)`
    transition: transform .2s;
    &:hover {
        transform: scale(1.2);
    }
`

export const IconDelete = styled(AiFillDelete)`
    transition: transform .2s;
    &:hover {
        transform: scale(1.2);
    }
`
export const ButtonTable = styled.button`
    background: ${props => props.color};
    border: none;
    padding: 10px;
    border-radius: 5px;
    color: ${props => invertColorText(props.color)};
    cursor: pointer;

    &:hover {
        box-shadow: 20px 20px 50px 10px #52484a47 inset;
    }
`

export const BalloonButton = styled.div`
    width: 30px;
    height: 30px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
    background-color: ${props => {
        const colorArr = new Gradient()
        .setColorGradient(props.color, "ffffff")
        .setMidpoint(4)
        .getColors();

        return colorArr[1];
    }};
    box-shadow: 2px 3px 5px grey;
    color: white;

    &:hover {
        background-color: ${props => {
            const colorArr = new Gradient()
            .setColorGradient(props.color, "ffffff")
            .setMidpoint(4)
            .getColors();

            return colorArr[0];
        }};
    }

    &:hover ${IconAdd} {
        transform: scale(1.2);
    }
    &:hover ${IconEdit} {
        transform: scale(1.2);
    }
    &:hover ${IconDelete} {
        transform: scale(1.2);
    }
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
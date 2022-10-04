import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Gradient from "javascript-color-gradient";
import { invertColorText } from "../../../../../utils/colorText";

export const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 25px);
`;

export const Form = styled.form`
    display: flex;
    z-index: 1;
    gap: 10px;
    margin-bottom: 25px;
`;

export const TextFieldStyle = styled(TextField)`
    margin-top: 33px;
    margin-bottom: 0;
`
export const ButtonStyle = styled.button`
    background: ${props => props.color};
    border-radius: 5px;
    color: ${props => invertColorText(props.color)};
    border: none;
    padding: 0 25px;

    &:hover {
        box-shadow: 20px 20px 50px 10px #52484a47 inset;
    }
`

export const Table = styled.div`
    flex: 1 1 auto;
    background-color: white;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

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
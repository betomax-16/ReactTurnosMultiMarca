import styled from "styled-components";
import { invertColorText } from "../../../utils/colorText";

export const DivContainer = styled.div`
    background-image: linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("../../public/img/fondoVigia.jpg");
    min-height: 100vh;
    height: 100vh;
`

export const DivContent = styled.div`
    display: flex;
    height: calc(100vh - 63px);
`

export const DivBody = styled.div`
    width: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding: 25px;
    display: flex;
    gap: 5px;
`

export const DivAreaContent = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
`

export const DivAreaTitle = styled.div`
    background-color: ${props => props.color};
    color: ${props => invertColorText(props.color)};
    display: flex;
    font-size: 30px;
    font-weight: bold;
    padding: 5px 25px;
    box-sizing: border-box;
    border-radius: 5px 5px 0 0;
    justify-content: space-between;
    align-items: center;
`

export const DivAreaTextSearch = styled.div`
    background-color: white;
    border-radius: 5px;
    display: flex;
    align-items: center;
`

export const DivAreaBody = styled.div`
    background-color: #f5f5f8;
    height: 100%;
    border-radius: 0 0 5px 5px;
    overflow: auto;
    padding: 15px;
    box-sizing: border-box;
`

export const DivAreaBodyGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: auto;
    grid-column-gap: 15px;
    grid-row-gap: 15px;
`

export const DivMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`

export const MessageTitle = styled.h1`
    font-size: 500%;
    color: #5a8f80;
    text-align: center;
`
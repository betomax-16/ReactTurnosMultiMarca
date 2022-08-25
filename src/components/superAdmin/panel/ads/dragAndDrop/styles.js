import styled from "styled-components";

export const DivContainer = styled.div`
    height: 80%;
    position: relative;
    z-index: 1;
    background: #fffef859;
    border: 2px gray dashed;
    border-radius: 15px;
    overflow: auto;
`;

export const DivGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    grid-template-rows: auto;
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    margin: 15px;
    box-sizing: border-box;
`;
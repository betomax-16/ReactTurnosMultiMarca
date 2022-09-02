import styled from "styled-components";

export const DivContainer = styled.div`    
    height: 100vh;
`;

export const TV = styled.iframe`
    display: ${props => !props.show ? 'inherit' : 'none'};
    border: none;
    width: 100%;
    height: calc(100% - 4px);
`;
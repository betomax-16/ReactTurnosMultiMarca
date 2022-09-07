import styled from "styled-components";

export const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    border-radius: 5px;
    transition: transform .2s;
    cursor: pointer;
    background-color: ${props => {
        let color = '#fff';
        switch (props.status) {
            case 'Libre':
                color = 'green';
                break;
            case 'Activo':
                color = 'orange';
                break;
            case 'Tarde':
                color = 'red';
                break;
            default:
                break;
        }

        return color;
    }};

    &:hover {
        transform: scale(1.1);
        box-shadow: 20px 20px 50px 10px #52484a47 inset;
    }
`

export const DivBody = styled.div`
    flex: 1 1 auto;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    font-size: 250%;
    font-weight: bold;
`

export const DivFooter = styled.div`
    width: 100%;
    height: inherit;
    text-align: center;
    overflow: hidden;
    font-weight: bold;
    padding: 5px 0;
    border-top: white 1px dashed;
`
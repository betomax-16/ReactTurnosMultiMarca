import { useState, useEffect } from "react";
import { Confirm } from "../../utils/confirm";
import { 
    DivContainer, DivOptions, DivOptionsTitle, DivOptionsButtons, 
    DivOptionButton, DivOptionButtonSubIndex, DivCurrentTurn, 
    DivButtonAction, DivCurrentContent, CurrentContentTitle, 
    CurrentContentTurn, DivCurrentButtons } from "./styles";
import { useLateralMenu } from "../../../../hooks/hookLateralMenu";

export function LateralMenu(props) {
    const [count, setCount] = useState(0);
    const [
        areas,
        openConfirm,
        handlerNextTurn,
        handlerRecallTurn,
        handlerFinishTurn,
        handlerOpenConfirm,
        handlerCloseConfirm,
        handlerAcceptConfirm,
        sesion
    ] = useLateralMenu();

    useEffect(() => {
        if (sesion && sesion.module) {
            let auxCount = 0;
            areas.forEach(area => {
                auxCount += area.number;
            }); 
            setCount(auxCount);
        }
    }, [sesion]);// eslint-disable-line react-hooks/exhaustive-deps

    return(<>
        <DivContainer color={props.color}>
            <DivOptions>
                <DivOptionsTitle color={props.color}>
                    <h2>Atender turno</h2>
                </DivOptionsTitle>
                <DivOptionsButtons>
                    {sesion.module && sesion.module.mode === 'auto' &&
                    <DivOptionButton color={'#32aecd'} disable={sesion.module.status} onClick={() => handlerNextTurn('')}>
                        <DivOptionButtonSubIndex>{count}</DivOptionButtonSubIndex>
                        <span className="attend-text">Siguiente</span>
                    </DivOptionButton>}
                    {sesion.module && sesion.module.mode === 'manual' && <>
                    {areas.map((area, index) => <DivOptionButton key={index} onClick={() => handlerNextTurn(area.id)} 
                        color={props.color} disable={sesion.module.status}>
                        <DivOptionButtonSubIndex>{area.number}</DivOptionButtonSubIndex>
                        <span className="attend-text">{area.name}</span>
                    </DivOptionButton>)}
                    </>}
                </DivOptionsButtons>
            </DivOptions>
            {sesion.module && sesion.module.status &&
            <DivCurrentTurn>
                <DivButtonAction recall onClick={handlerRecallTurn}>Re-llamar</DivButtonAction>
                <DivCurrentContent>
                    <CurrentContentTitle>Turno en atención</CurrentContentTitle>
                    <CurrentContentTurn>{sesion.currentTurn?.turn}</CurrentContentTurn>
                </DivCurrentContent>
                <DivCurrentButtons>
                    <DivButtonAction cancel onClick={handlerOpenConfirm}>Cancelar</DivButtonAction>
                    <DivButtonAction finish onClick={handlerFinishTurn}>Atendido</DivButtonAction>
                </DivCurrentButtons>
            </DivCurrentTurn>
            }
        </DivContainer>
        <Confirm 
            open={openConfirm}
            title={'Cacenlar turno'} 
            message={`¿Desea realmente cancelar el turno: ${sesion.currentTurn?.turn}?`} 
            handleClose={handlerCloseConfirm}
            handleAccept={handlerAcceptConfirm}/>
    </>);
}
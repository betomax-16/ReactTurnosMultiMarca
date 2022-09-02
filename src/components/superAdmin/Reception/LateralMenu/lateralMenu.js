import { Confirm } from "../../utils/confirm";
import { 
    DivContainer, DivOptions, DivOptionsTitle, DivOptionsButtons, 
    DivOptionButton, DivOptionButtonSubIndex, DivCurrentTurn, 
    DivButtonAction, DivCurrentContent, CurrentContentTitle, 
    CurrentContentTurn, DivCurrentButtons } from "./styles";
import { useLateralMenu } from "../../../../hooks/hookLateralMenu";

export function LateralMenu(props) {
    const [
        areas,
        currentTurn,
        openConfirm,
        handlerNextTurn,
        handlerRecallTurn,
        handlerFinishTurn,
        handlerOpenConfirm,
        handlerCloseConfirm,
        handlerAcceptConfirm,
        module
    ] = useLateralMenu();

    const getNumbers = () => {
        let count = 0;
        areas.forEach(area => {
            count += area.number;
        });

        return count;
    }

    return(<>
        <DivContainer color={props.color}>
            <DivOptions>
                <DivOptionsTitle color={props.color}>
                    <h2>Atender turno</h2>
                </DivOptionsTitle>
                <DivOptionsButtons>
                    {module && module.mode === 'auto' &&
                    <DivOptionButton color={'#32aecd'} disable={module.status} onClick={() => handlerNextTurn('')}>
                        <DivOptionButtonSubIndex>{getNumbers()}</DivOptionButtonSubIndex>
                        <span className="attend-text">Siguiente</span>
                    </DivOptionButton>}
                    {module && module.mode === 'manual' && <>
                    {areas.map((area, index) => <DivOptionButton key={index} onClick={() => handlerNextTurn(area.id)} 
                        color={props.color} disable={module.status}>
                        <DivOptionButtonSubIndex>{area.number}</DivOptionButtonSubIndex>
                        <span className="attend-text">{area.name}</span>
                    </DivOptionButton>)}
                    </>}
                </DivOptionsButtons>
            </DivOptions>
            {module && module.status &&
            <DivCurrentTurn>
                <DivButtonAction recall onClick={handlerRecallTurn}>Re-llamar</DivButtonAction>
                <DivCurrentContent>
                    <CurrentContentTitle>Turno en atención</CurrentContentTitle>
                    <CurrentContentTurn>{currentTurn?.turn}</CurrentContentTurn>
                </DivCurrentContent>
                <DivCurrentButtons>
                    <DivButtonAction cancel onClick={handlerOpenConfirm}>Cancelar</DivButtonAction>
                    <DivButtonAction accept onClick={handlerFinishTurn}>Atendido</DivButtonAction>
                </DivCurrentButtons>
            </DivCurrentTurn>
            }
        </DivContainer>
        <Confirm 
            open={openConfirm}
            title={'Cacenlar turno'} 
            message={`¿Desea realmente cancelar el turno: ${currentTurn?.turn}?`} 
            handleClose={handlerCloseConfirm}
            handleAccept={handlerAcceptConfirm}/>
    </>);
}
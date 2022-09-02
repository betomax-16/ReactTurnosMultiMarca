import { useEffect } from "react";
import { DivContainer, DivModuleInfo, DivFrame, 
        InfoTitle, InfoTurn, DivTurnInfo, 
        ModuleUbication, Wave } from "./styles";


export function CurrentTurn(props) {
    const wave = process.env.PUBLIC_URL + '/waves.svg';
    const sound = process.env.PUBLIC_URL + '/timbre.mp3';

    useEffect(() => {
        if (props.playSound) {
          const audio = new Audio(sound);
          let promise = audio.play();
    
          if (promise !== undefined) {
            promise.then(_ => {
              audio.autoplay = true;
            }).catch(error => {
              console.log(error);
            });
          }
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return <DivContainer>
        <DivTurnInfo>
            <DivFrame>
                <InfoTitle>Turno</InfoTitle>
                <InfoTurn>{props.turn}</InfoTurn>
            </DivFrame>
        </DivTurnInfo>
        <DivModuleInfo>
            <ModuleUbication>{props.ubication}</ModuleUbication>
            <Wave type={props.wave} src={wave} alt="onda decorativa"/>
        </DivModuleInfo>
    </DivContainer>
}
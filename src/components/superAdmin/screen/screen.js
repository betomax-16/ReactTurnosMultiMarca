import { DivContainer, TV } from "./styles";
import { CurrentTurn } from "./currentTurn/currentTurn";
import { TurnList } from "./turnList/turnList";

export function Screen() {

    return <DivContainer>
        {sucursalExist ? showTV ? <>
            <TV show={recall.state} title="tele" src="https://pluto.tv/es/live-tv/pluto-tv-cine-estelar-1"></TV>
            {recall.state && <CurrentTurn currentTurn={recall.data} wave="wave-down" playSound={true}/>}
        </> :
        !recall.state && 
            <TurnList date={dateState} currentTurn={currentTurn} lastTurns={lastTurns} showAdds={props.showAdds} currentAd={currentAd}/> :
            <CurrentTurn currentTurn={recall.data} wave="wave-down" playSound={true}/>
        }
    </DivContainer>
}
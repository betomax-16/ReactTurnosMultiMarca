import { DivContainer, TV } from "./styles";
import { CurrentTurn } from "./currentTurn/currentTurn";
import { TurnList } from "./turnList/turnList";
import { RequireAuthSecret } from "../../RequireAuthSecret";
import { useScreen } from "../../../hooks/hookScreen";

export function Screen() {
    const [
        showTV,
        brand,
        callTurn
    ] = useScreen();

    return <RequireAuthSecret>
        <DivContainer>
            {showTV ? <>
                <TV show={callTurn.state} title="tele" src="https://pluto.tv/es/live-tv/pluto-tv-cine-estelar-1"></TV>
                {callTurn.state && <CurrentTurn turn={callTurn.data?.turn} ubication={callTurn.data?.ubication} wave='down' playSound/>}
            </> :
            !callTurn.state ?
                <TurnList color={brand && brand.color ? brand.color : '#5a8f80'} turn={callTurn.data?.turn} ubication={callTurn.data?.ubication} showAds/> :
                <CurrentTurn turn={callTurn.data?.turn} ubication={callTurn.data?.ubication} wave='down' playSound/>
            }
        </DivContainer>
    </RequireAuthSecret>
}
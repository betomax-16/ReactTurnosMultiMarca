import { useEffect, useState } from "react";
import { CurrentTurn } from "../currentTurn/currentTurn";
import { useTurnList } from "../../../../hooks/hookTurnList";
import { DivContainer, DivAds, Ad, List, 
        ListSubTitle, ListTurns, TurnCard, 
        TurnCardTitle, TurnCardBody, ListDate, 
        Date, Hour } from "./styles";

export function TurnList(props) {
    const [showAdd, setShowAdd] = useState(false);
    const [intervalShow, setIntervalShow] = useState(null);
    
    const [
        dateState,
        lastTurns,
        currentAd
    ] = useTurnList();

    useEffect(() => {
        if (props.showAds) {
            setIntervalShow(setTimeout(() => { 
                setShowAdd(true);
            }, 1000 * 60));
        }
        return (() => {
            clearInterval(intervalShow);
        });
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return <DivContainer>
        <DivAds color={props.color}>
            {showAdd ? <Ad alt="ad" src={currentAd} /> :
                <CurrentTurn turn={props.turn} ubication={props.ubication}/>
            }
        </DivAds>
        <List>
            <ListSubTitle color={props.color}>
                Últimos llamados
            </ListSubTitle>
            <ListTurns>
                {lastTurns.map((item, index) => <TurnCard key={index}>
                    <TurnCardTitle>{item.ubication}</TurnCardTitle>
                    <TurnCardBody>{item.turn}</TurnCardBody>
                </TurnCard>)}
            </ListTurns>
            <ListDate color={props.color}>
                <Date>{dateState.format('DD') + ' de ' + dateState.format('MMMM ')} <span>{dateState.format('YYYY')}</span></Date>
                <Hour>{dateState.format('hh:mm')} <span>{dateState.format('A')}</span></Hour>
            </ListDate>
        </List>
    </DivContainer>
}
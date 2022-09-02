import { useState, useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setAlertsList } from '../../../redux/splices/alertSlice';
import { DivContainer, TV } from "./styles";
import { CurrentTurn } from "./currentTurn/currentTurn";
import { TurnList } from "./turnList/turnList";
import { RequireAuthSecret } from "../../RequireAuthSecret";
import { BrandService } from "../../../services/brand";

export function Screen() {
    const { search } = useLocation();
    const params = useParams();
    const dispatch = useDispatch();
    const query = useMemo(() => new URLSearchParams(search), [search]);
    const [showTV, setShowTV] = useState(false);
    const [brand, setBrand] = useState(null);
    // const [currentTurn, setCurrentTurn] = useState(null);
    const [callTurn, setCallTurn] = useState({
        state: false, 
        data: null
    });

    useEffect(() => {
        getBrand();
        if (query.get('tv') && query.get('tv').toLowerCase() === 'si') {
            setShowTV(true);
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const getBrand = async () => {
        try {
            const res = await BrandService.get(params.idBrand);
            setBrand(res.data.body);
        } catch (error) {
            if (error.response && error.response.data) {
                const errors = [];
                error.response.data.body.errors.forEach(e => {
                    errors.push({message: e.msg, visible: true, severity: 'error'});
                });
                dispatch(setAlertsList(errors))
            }
            else {
                dispatch(setAlertsList([
                    {message: error.message, visible: true, severity: 'error'}
                ]))
            }
        }
    }

    const emphasis =  (turn) => {
        return new Promise((resolve, reject) => {

            setCallTurn({
                state: true,
                data: turn
            });
    
            setTimeout(() => { 
                setCallTurn({
                    state: false, 
                    data: null
                });

                resolve(true);
            }, 1000 * 30);
        });
    }

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
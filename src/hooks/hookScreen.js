import { useState, useEffect, useMemo, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { setSocketResponse } from "../redux/splices/socketResponseSlice";
import { BrandService } from "../services/brand";
import { w3cwebsocket } from "websocket";
import AppContext from "../context/app-context";

export function useScreen() {
    const { search } = useLocation();
    const params = useParams();
    const dispatch = useDispatch();
    const query = useMemo(() => new URLSearchParams(search), [search]);
    const [showTV, setShowTV] = useState(false);
    const [brand, setBrand] = useState(null);
    const socketResponse = useSelector((state) => state.socketResponse);
    const { setSocket, socket } = useContext(AppContext);
    const [tabHasFocus, setTabHasFocus] = useState(true);
    // const [currentTurn, setCurrentTurn] = useState(null);
    const [callTurn, setCallTurn] = useState({
        state: false, 
        data: null
    });

    useEffect(() => {
        const handleFocus = () => {
            // console.log('Tab has focus');
            setTabHasFocus(true);
        };
    
        const handleBlur = () => {
            // console.log('Tab lost focus');
            setTabHasFocus(false);
        };

        if (showTV) {
            window.addEventListener('focus', handleFocus);
            window.addEventListener('blur', handleBlur);
        }

        getBrand();
        if (query.get('tv') && query.get('tv').toLowerCase() === 'si') {
            setShowTV(true);
        }

        return(() => {
            if (showTV) {
                window.removeEventListener('focus', handleFocus);
                window.removeEventListener('blur', handleBlur);
            }
        })
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (socketResponse && socketResponse.response) {
            if (socketResponse.response.method === 'callTurn') {
                const callTurnAux = socketResponse.response.info;
                emphasis(callTurnAux);
            }
            else if (socketResponse.response.method === 'recallTurn') {
                const recallTurn = socketResponse.response.info;
                emphasis(recallTurn);
            }
            else if (socketResponse.response.method === 'callTurnTest') {
                const callTurnAux = socketResponse.response.info;
                emphasis(callTurnAux);
            }
        }
    }, [socketResponse]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (showTV) {
            if (socket && socket.readyState === socket.OPEN) {
                const data = JSON.stringify({
                    acction: 'suscribe',
                    data: {
                        idBrand: params.idBrand,
                        idBranch: params.idBranch
                    }
                });
                socket.send(data);
            }
        }
    }, [socket]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (showTV && tabHasFocus) {
            if (socket) {
                if (socket.readyState === socket.CLOSED) {
                    connectSocket();
                }
            }
            else {
                connectSocket();
            }
        }
    }, [tabHasFocus])// eslint-disable-line react-hooks/exhaustive-deps
    
    const connectSocket = () => {
        const client = new w3cwebsocket(`ws://${window.location.hostname}:4000/`);
        client.onopen = function() {
            if (client.readyState === client.OPEN) {
                setSocket(client);   
            }
        };
        client.onmessage = function(e) {
            if (typeof e.data === 'string') {
                const response = JSON.parse(e.data);
                response.info = JSON.parse(response.info);
                dispatch(setSocketResponse(response));
            }
        };
    }

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
            }, 1000 * 15);
        });
    }

    return [
        showTV,
        brand,
        callTurn
    ];
}
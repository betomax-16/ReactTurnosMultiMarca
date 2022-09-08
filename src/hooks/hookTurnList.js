import { useEffect, useState, useContext } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { setSocketResponse } from "../redux/splices/socketResponseSlice";
import { TraceService } from "../services/trace";
import { StateService } from "../services/states";
import { AdService } from "../services/ad";
import { useParams } from "react-router-dom";
import { w3cwebsocket } from "websocket";
import AppContext from "../context/app-context";
import moment from "moment";

export const useTurnList = () => {
    const logo = process.env.PUBLIC_URL + '/logo512.png';
    const [intervalDate, setIntervalDate] = useState(null);
    const [lastTurns, setLastTurns] = useState([]);
    const [dateState, setDateState] = useState(moment());
    const [readySesionBranch, setReadySesionBranch] = useState(false);
    const [ads, setAds] = useState([]);
    const [currentAd, setCurrentAd] = useState(logo);
    const [intervalAd, setIntervalAd] = useState(null);

    const params = useParams();
    const dispatch = useDispatch();
    const sesion = useSelector((state) => state.sesion);
    const socketResponse = useSelector((state) => state.socketResponse);
    const { setSocket, socket } = useContext(AppContext);
    const [tabHasFocus, setTabHasFocus] = useState(true);

    useEffect(() => {
        const handleFocus = () => {
            // console.log('Tab has focus');
            setTabHasFocus(true);
        };
    
        const handleBlur = () => {
            // console.log('Tab lost focus');
            setTabHasFocus(false);
        };

        setIntervalDate(setInterval(() => {
            setDateState(moment());
        }, 1000));

        if (params.idBranch) {
            getTurns();
            getAds();
        }
        else {        
            window.addEventListener('focus', handleFocus);
            window.addEventListener('blur', handleBlur);
        }

        return(() => {
            clearInterval(intervalDate);

            if (!params.idBranch) {
                window.removeEventListener('focus', handleFocus);
                window.removeEventListener('blur', handleBlur);
            }
        })
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!params.idBranch && sesion && sesion.branch) {
            setReadySesionBranch(true);
        }
    }, [sesion]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (socketResponse && socketResponse.response) {
            if (socketResponse.response.method === 'callTurn') {
                const callTurn = socketResponse.response.info;

                const auxLastTurns = [...lastTurns];
                auxLastTurns.push(callTurn);
                const dataSort = auxLastTurns.sort((a, b) => {
                    if (new Date(a.startDate) > new Date(b.startDate)) {
                      return 1;
                    }
                    if (new Date(a.startDate) < new Date(b.startDate)) {
                      return -1;
                    }
                    // a must be equal to b
                    return 0;
                });
    
                const subDataSort = dataSort.length > 3 ? dataSort.slice(dataSort.length-3) : dataSort;
                setLastTurns(subDataSort);
            }
            else if (socketResponse.response.method === 'cancelTurn') {
                const cancelTurn = socketResponse.response.info;
                let auxLastTurns = [...lastTurns];
                auxLastTurns = auxLastTurns.filter(t => t.turn !== cancelTurn.turn);

                const dataSort = auxLastTurns.sort((a, b) => {
                    if (new Date(a.startDate) > new Date(b.startDate)) {
                      return 1;
                    }
                    if (new Date(a.startDate) < new Date(b.startDate)) {
                      return -1;
                    }
                    // a must be equal to b
                    return 0;
                });
    
                const subDataSort = dataSort.length > 3 ? dataSort.slice(dataSort.length-3) : dataSort;
                setLastTurns(subDataSort);
            }
            else if (socketResponse.response.method === 'finishTurnReception') {
                const finishTurn = socketResponse.response.info;

                let auxLastTurns = [...lastTurns];
                auxLastTurns = auxLastTurns.filter(t => t.turn !== finishTurn.turn);

                const dataSort = auxLastTurns.sort((a, b) => {
                    if (new Date(a.startDate) > new Date(b.startDate)) {
                      return 1;
                    }
                    if (new Date(a.startDate) < new Date(b.startDate)) {
                      return -1;
                    }
                    // a must be equal to b
                    return 0;
                });
    
                const subDataSort = dataSort.length > 3 ? dataSort.slice(dataSort.length-3) : dataSort;
                setLastTurns(subDataSort);
            }
            else if (socketResponse.response.method === 'callTurnTest') {
                const callTurn = socketResponse.response.info;

                const auxLastTurns = [...lastTurns];
                auxLastTurns.push(callTurn);
                const dataSort = auxLastTurns.sort((a, b) => {
                    if (new Date(a.startDate) > new Date(b.startDate)) {
                      return 1;
                    }
                    if (new Date(a.startDate) < new Date(b.startDate)) {
                      return -1;
                    }
                    // a must be equal to b
                    return 0;
                });
    
                const subDataSort = dataSort.length > 3 ? dataSort.slice(dataSort.length-3) : dataSort;
                setLastTurns(subDataSort);
            }
            else if (socketResponse.response.method === 'cancelTurnTest') {
                const cancelTurn = socketResponse.response.info;
                let auxLastTurns = [...lastTurns];
                auxLastTurns = auxLastTurns.filter(t => t.turn !== cancelTurn.turn);

                const dataSort = auxLastTurns.sort((a, b) => {
                    if (new Date(a.startDate) > new Date(b.startDate)) {
                      return 1;
                    }
                    if (new Date(a.startDate) < new Date(b.startDate)) {
                      return -1;
                    }
                    // a must be equal to b
                    return 0;
                });
    
                const subDataSort = dataSort.length > 3 ? dataSort.slice(dataSort.length-3) : dataSort;
                setLastTurns(subDataSort);
            }
            else if (socketResponse.response.method === 'finishTurnTest') {
                const finishTurn = socketResponse.response.info;

                let auxLastTurns = [...lastTurns];
                auxLastTurns = auxLastTurns.filter(t => t.turn !== finishTurn.turn);

                const dataSort = auxLastTurns.sort((a, b) => {
                    if (new Date(a.startDate) > new Date(b.startDate)) {
                      return 1;
                    }
                    if (new Date(a.startDate) < new Date(b.startDate)) {
                      return -1;
                    }
                    // a must be equal to b
                    return 0;
                });
    
                const subDataSort = dataSort.length > 3 ? dataSort.slice(dataSort.length-3) : dataSort;
                setLastTurns(subDataSort);
            }
            else if (socketResponse.response.method === 'freeTurnTest') {
                const finishTurn = socketResponse.response.info;

                let auxLastTurns = [...lastTurns];
                auxLastTurns = auxLastTurns.filter(t => t.turn !== finishTurn.turn);

                const dataSort = auxLastTurns.sort((a, b) => {
                    if (new Date(a.startDate) > new Date(b.startDate)) {
                      return 1;
                    }
                    if (new Date(a.startDate) < new Date(b.startDate)) {
                      return -1;
                    }
                    // a must be equal to b
                    return 0;
                });
    
                const subDataSort = dataSort.length > 3 ? dataSort.slice(dataSort.length-3) : dataSort;
                setLastTurns(subDataSort);
            }
        }
    }, [socketResponse]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (readySesionBranch) {
            getTurns();
            getAds();
        }
    }, [readySesionBranch]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let index = 0;
        if (intervalAd !== null) {
            clearInterval(intervalAd);
        }
        setIntervalAd(setInterval(() => {
            if (ads.length) {
                index = index < ads.length - 1 ? index + 1 : 0;
                setCurrentAd(ads[index].url);
            }
            else {
                setCurrentAd(logo);
            }
        }, 1000 * 60));    
    }, [ads]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let info;
        if (!params.idBranch && sesion.branch) {
            info = {
                idBrand: sesion.branch.idBrand,
                idBranch: sesion.branch._id
            };
        }
        else {
            info = {
                idBrand: params.idBrand,
                idBranch: params.idBranch
            };
        }

        if (socket && socket.readyState === socket.OPEN) {
            const data = JSON.stringify({
                acction: 'suscribe',
                data: {...info}
            });
            socket.send(data);
        }
    }, [socket]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (params.idBranch && tabHasFocus) {
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

    const getTurns = async () => {
        try {
            const idBranch = params.idBranch ? params.idBranch : sesion.branch._id;
            const states = await StateService.getAll();
            const inAtenttion = states.data.body.find(s => s.name === 'en atencion');
            const inTest = states.data.body.find(s => s.name === 'en toma');
            const recall = states.data.body.find(s => s.name === 're-call');
            const res = await TraceService.getTurns(params.idBrand, idBranch, `?idState=${inAtenttion._id}|eq&idState=${inTest._id}|eq|or&idState=${recall._id}|eq|or`)

            const dataSort = res.data.body.sort((a, b) => {
                if (new Date(a.startDate) > new Date(b.startDate)) {
                  return 1;
                }
                if (new Date(a.startDate) < new Date(b.startDate)) {
                  return -1;
                }
                // a must be equal to b
                return 0;
            });

            const subDataSort = dataSort.length > 3 ? dataSort.slice(dataSort.length-3) : dataSort;
            setLastTurns(subDataSort);
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

    const getAds = async () => {
        try {
            const res = await AdService.getAll(params.idBrand);
            setAds(res.data.body.files.filter(f => f.isActive));
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

    return [
        dateState,
        lastTurns,
        currentAd
    ];
}
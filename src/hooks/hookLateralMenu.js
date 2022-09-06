import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { useParams } from "react-router-dom";
import { AreaBranchService } from "../services/areaBranch";
import { StateService } from "../services/states";
import { TraceService } from "../services/trace";
import { setModule, setCurrentTurn } from "../redux/splices/sesionSlice";
import AppContext from "../context/app-context";

export const useLateralMenu = () => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [areas, setAreas] = useState([]);

    const { socket } = useContext(AppContext);
    const sesion = useSelector((state) => state.sesion);
    const socketResponse = useSelector((state) => state.socketResponse);
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (sesion && sesion.branch && !areas.length) {
            getAreas();
        }
    }, [sesion]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (socketResponse && socketResponse.response) {
            if (socketResponse.response.method === 'newTurn') {
                const newTurn = socketResponse.response.info;
                const auxAreas = [...areas];
                for (let index = 0; index < auxAreas.length; index++) {
                    const area = {...auxAreas[index]};
                    if (area.id === newTurn.area._id) {
                        area.number++;
                        auxAreas[index] = area;
                        break;
                    }
                }
                setAreas(auxAreas);
            }
            else if (socketResponse.response.method === 'callTurn') {
                const callTurn = socketResponse.response.info;
                const auxAreas = [...areas];
                for (let index = 0; index < auxAreas.length; index++) {
                    const item = {...auxAreas[index]};
                    if (item.id === callTurn.area._id) {
                        item.number--;
                        auxAreas[index] = item;
                        break;
                    }
                }
                setAreas(auxAreas);
            }
        }
    }, [socketResponse]);// eslint-disable-line react-hooks/exhaustive-deps

    const sendDataSocket = (idBrand, idBranch, method, info) => {
        if (socket && socket.readyState === socket.OPEN) {
            const auxInfo = JSON.stringify(info);
            const data = JSON.stringify({
                acction: 'emit',
                method: method,
                data: {
                    idBrand: idBrand,
                    idBranch: idBranch,
                    info: auxInfo
                }
            });
            socket.send(data);
        }
    };

    const getAreas = async () => {
        try {
            const states = await StateService.getAll();
            const inWait = states.data.body.find(state => state.name === 'espera');
            const resAreas = await AreaBranchService.getAll(params.idBrand, sesion.branch._id);
            const turns = await TraceService.getTurns(params.idBrand, sesion.branch._id, `?idState=${inWait._id}|eq`);

            const rows = [];
            resAreas.data.body.forEach(item => {
                const turnsAux = turns.data.body.filter(t => t.area._id === item.area._id);
                rows.push({
                    id: item.area._id,
                    name: item.area.name,
                    number: turnsAux.length
                });
            });

            setAreas(rows);
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

    const handlerNextTurn = async (idArea) => {
        try {
            const moduleAux = {...sesion.module};
            const data = moduleAux.mode === 'auto' ? {idModule: moduleAux._id} : {idModule: moduleAux._id, idArea: idArea};
            const res = await TraceService.nextTurn(params.idBrand, sesion.branch._id, data);
            const currentTurn = res.data.body;
            dispatch(setCurrentTurn(currentTurn));
            moduleAux.status = true;
            localStorage.setItem('module', JSON.stringify(moduleAux));
            dispatch(setModule(moduleAux));
            sendDataSocket(params.idBrand, sesion.branch._id, 'callTurn', currentTurn);
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

    const handlerRecallTurn = async () => {
        try {
            const res = await TraceService.recallTurn(params.idBrand, sesion.branch._id, {idModule: sesion.module._id});
            const currentTurn = res.data.body;
            dispatch(setCurrentTurn(currentTurn));
            sendDataSocket(params.idBrand, sesion.branch._id, 'recallTurn', currentTurn);
            dispatch(setAlertsList([
                {message: `Ha rellamado a: ${res.data.body.turn}`, visible: true, severity: 'info'}
            ]))
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

    const handlerCancelTurn = async () => {
        try {
            const moduleAux = {...sesion.module};
            const res = await TraceService.cancelTurn(params.idBrand, sesion.branch._id, {idModule: sesion.module._id});
            dispatch(setCurrentTurn(null));
            moduleAux.status = false;
            localStorage.setItem('module', JSON.stringify(moduleAux));
            dispatch(setModule(moduleAux));
            sendDataSocket(params.idBrand, sesion.branch._id, 'cancelTurn', res.data.body);
            handlerCloseConfirm();
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

    const handlerFinishTurn = async () => {
        try {
            const moduleAux = {...sesion.module};
            const res = await TraceService.finishTurn(params.idBrand, sesion.branch._id, {idModule: sesion.module._id});
            dispatch(setCurrentTurn(null));
            moduleAux.status = false;
            localStorage.setItem('module', JSON.stringify(moduleAux));
            dispatch(setModule(moduleAux));
            sendDataSocket(params.idBrand, sesion.branch._id, 'finishTurnReception', res.data.body);
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

    const handlerOpenConfirm = () => {
        setOpenConfirm(true);
    }

    const handlerCloseConfirm = () => {
        setOpenConfirm(false);
    }

    const handlerAcceptConfirm = () => {
        handlerCancelTurn();
    }

    return [
        areas,
        openConfirm,
        handlerNextTurn,
        handlerRecallTurn,
        handlerFinishTurn,
        handlerOpenConfirm,
        handlerCloseConfirm,
        handlerAcceptConfirm,
        sesion
    ];
}
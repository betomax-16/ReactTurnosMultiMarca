import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { useParams } from "react-router-dom";
import { AreaBranchService } from "../services/areaBranch";
import { StateService } from "../services/states";
import { TraceService } from "../services/trace";
import { setModule, setCurrentTurn } from "../redux/splices/sesionSlice";

export const useLateralMenu = () => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [areas, setAreas] = useState([]);

    const sesion = useSelector((state) => state.sesion);
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (sesion && sesion.branch && !areas.length) {
            getAreas();
        }
    }, [sesion]);// eslint-disable-line react-hooks/exhaustive-deps

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
            dispatch(setCurrentTurn(res.data.body));
            moduleAux.status = true;
            localStorage.setItem('module', JSON.stringify(moduleAux));
            dispatch(setModule(moduleAux));

            const auxAreas = [...areas];
            for (let index = 0; index < auxAreas.length; index++) {
                const item = {...auxAreas[index]};
                if (item.id === idArea) {
                    item.number--;
                    auxAreas[index] = item;
                    break;
                }
            }

            setAreas(auxAreas);

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
            dispatch(setCurrentTurn(res.data.body));
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
            await TraceService.cancelTurn(params.idBrand, sesion.branch._id, {idModule: sesion.module._id});
            dispatch(setCurrentTurn(null));
            moduleAux.status = false;
            localStorage.setItem('module', JSON.stringify(moduleAux));
            dispatch(setModule(moduleAux));
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
            await TraceService.finishTurn(params.idBrand, sesion.branch._id, {idModule: sesion.module._id});
            dispatch(setCurrentTurn(null));
            moduleAux.status = false;
            localStorage.setItem('module', JSON.stringify(moduleAux));
            dispatch(setModule(moduleAux));
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
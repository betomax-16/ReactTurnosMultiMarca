import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { useParams } from "react-router-dom";
import { AreaBranchService } from "../services/areaBranch";
import { StateService } from "../services/states";
import { TraceService } from "../services/trace";

export const useLateralMenu = () => {
    const [currentTurn, setCurrentTurn] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [areas, setAreas] = useState([]);
    const [module, setModule] = useState(null);
    const [branch, setBranch] = useState(null);

    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        setBranch(JSON.parse(localStorage.getItem('branch')));
        setModule(JSON.parse(localStorage.getItem('module')));
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (branch) {
            getAreas();
        }
    }, [branch]);// eslint-disable-line react-hooks/exhaustive-deps

    const getAreas = async () => {
        try {
            const states = await StateService.getAll();
            const inWait = states.data.body.find(state => state.name === 'espera');
            const resAreas = await AreaBranchService.getAll(params.idBrand, branch._id);
            const turns = await TraceService.getTurns(params.idBrand, branch._id, `?idState=${inWait._id}|eq`);

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
            const moduleAux = {...module};
            const data = moduleAux.mode === 'auto' ? {idModule: moduleAux._id} : {idModule: moduleAux._id, idArea: idArea};
            const res = await TraceService.nextTurn(params.idBrand, branch.idBranch, data);
            setCurrentTurn(res.data.body);
            moduleAux.status = true;
            localStorage.setItem('module', JSON.stringify(moduleAux));
            setModule(moduleAux);
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
            const res = await TraceService.recallTurn(params.idBrand, branch.idBranch, {idModule: module._id});
            setCurrentTurn(res.data.body);
            dispatch(setAlertsList([
                {message: 'Ha rellamado a: ', visible: true, severity: 'info'}
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
            const moduleAux = {...module};
            const res = await TraceService.cancelTurn(params.idBrand, branch.idBranch, {idModule: module._id});
            setCurrentTurn(res.data.body);
            moduleAux.status = false;
            localStorage.setItem('module', JSON.stringify(moduleAux));
            setModule(moduleAux);
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
            const moduleAux = {...module};
            const res = await TraceService.finishTurn(params.idBrand, branch.idBranch, {idModule: module._id});
            setCurrentTurn(res.data.body);
            moduleAux.status = false;
            localStorage.setItem('module', JSON.stringify(moduleAux));
            setModule(moduleAux);
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
        currentTurn,
        openConfirm,
        handlerNextTurn,
        handlerRecallTurn,
        handlerFinishTurn,
        handlerOpenConfirm,
        handlerCloseConfirm,
        handlerAcceptConfirm,
        module
    ];
}
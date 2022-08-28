import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { AreaBranchService } from "../services/areaBranch";
import { TraceService } from "../services/trace";
import { BranchService } from "../services/branch";
import { useParams } from "react-router-dom";

export const useTakeTurn = () => {
    const [areas, setAreas] = useState([]);
    const [branch, setBranch] = useState(null);
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        getAreas();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const getAreas = async () => {
        try {
            const resBranch = await BranchService.get(params.idBrand, params.idBranch)
            setBranch(resBranch.data.body);
            const res = await AreaBranchService.getAll(params.idBrand, params.idBranch)
            if (res.data.statusCode === 200) {
                setAreas(res.data.body);    
            }
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
    
    const takeTurn = async (idArea) => {
        try {
            await TraceService.newTurn(params.idBrand, params.idBranch, { idArea: idArea});
            
            // socket.emit('newTurn', {sucursal:sucursal, data:res.data.body});
            dispatch(setAlertsList([
                {message: 'Turno creado', visible: true, severity: 'success'}
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

    return [
        areas,
        takeTurn,
        branch
    ];
};
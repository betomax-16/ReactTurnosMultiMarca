import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { BranchService } from "../services/branch";
import { TraceService } from "../services/trace";
import { useParams } from "react-router-dom";
import moment from "moment";

export const useCurrentTurn = () => {
    const [idBranchSelected, setIdBranchSelected] = useState('');
    const [branches, setBranches] = useState([]);
    const [tab, setTab] = useState(0);
    const [trace, setTrace] = useState([]);
    const [turns, setTurns] = useState([]);
    const [turnSelected, setTurnSelected] = useState('');

    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        getBranches();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (idBranchSelected !== '') {
            getTurns(params.idBrand, idBranchSelected);   
        }
    }, [idBranchSelected]);// eslint-disable-line react-hooks/exhaustive-deps

    const getBranches = async () => {
        try {
            const res = await BranchService.getAll(params.idBrand);
            const rows = [];
            res.data.body.forEach(row => {
                rows.push({
                    id: row._id,
                    name: row.name, 
                    color: row.color,
                    timeLimit: row.timeLimit
                });
            });
            setBranches(rows);

            if (rows.length) {
                setIdBranchSelected(rows[0].id);
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

    const getTurns = async (idBrand, idBranch) => {
        try {
            const dateInit = moment().hour(0).minute(0).second(0).millisecond(0).toISOString();
            const dateEnd = moment().hour(23).minute(59).second(59).millisecond(999).toISOString();
            const query = `?startDate=${dateInit}|gte&startDate=${dateEnd}|lte|and`;
            const res = await TraceService.getTurns(idBrand, idBranch, query);
            const rows = [];
            res.data.body.forEach(row => {
                rows.push({
                    id: row.turn,
                    turn: row.turn,
                    area: row.area.name,
                    sucursal: row.branch.name,
                    state: row.state.name,
                    creationDate: moment(row.startDate).format("YYYY-MM-DD HH:mm:ss")
                });
            });

            setTurns(rows);
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

    const getTrace = async (idBrand, idBranch, turn) => {
        try {
            const res = await TraceService.getTrace(idBrand, idBranch, turn)
            const rows = [];
            res.data.body.forEach(row => {
                const aux = {
                    id: row._id,
                    turn: row.turn,
                    area: row.area.name,
                    sucursal: row.branch.name,
                    state: row.state.name,
                    startDate: moment(row.startDate).format("YYYY-MM-DD HH:mm:ss")
                };

                if (row.finalDate) {
                    aux.finalDate = moment(row.finalDate).format("YYYY-MM-DD HH:mm:ss")
                }

                if (row.user) {
                    aux.username = row.user.username
                }

                rows.push(aux);
            });
            setTrace(rows);
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

    const handleChangeBranch = (event) => {
        setIdBranchSelected(event.target.value);
        setTurnSelected('');
    };

    const handlerChangeTab = (index) => {
        setTab(index);
        if (index === 0 && idBranchSelected !== '') {
            getTurns(params.idBrand, idBranchSelected);
        }
        else if (index === 1 && idBranchSelected !== '' && turnSelected !== '') {
            getTrace(params.idBrand, idBranchSelected, turnSelected);
        }        
    }

    return [
        trace, turns,
        tab,
        branches,
        idBranchSelected,
        handleChangeBranch,
        handlerChangeTab,
        setTurnSelected
    ];
}
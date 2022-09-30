import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { BranchService } from "../services/branch";
import { TraceHisotryService } from "../services/traceHistory";
import { useParams } from "react-router-dom";
import moment from "moment";

export const useHistoryTurn = () => {
    const [idBranchSelected, setIdBranchSelected] = useState('');
    const [branches, setBranches] = useState([]);
    const [tab, setTab] = useState(0);
    const [trace, setTrace] = useState([]);
    const [turns, setTurns] = useState([]);
    const [date, setDate] = useState(moment());
    const [turnSelected, setTurnSelected] = useState('');

    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        getBranches();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (idBranchSelected !== '') {
            getTurns(params.idBrand, idBranchSelected, date.format('YYYY-MM-DD'));   
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

    const getTurns = async (idBrand, idBranch, date) => {
        try {
            const res = await TraceHisotryService.getTurns(idBrand, idBranch, date);
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

    const getTrace = async (idBrand, idBranch, date, turn) => {
        try {
            const res = await TraceHisotryService.getTrace(idBrand, idBranch, date, turn)
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
            getTurns(params.idBrand, idBranchSelected, date.format('YYYY-MM-DD'));
        }
        else if (index === 1 && idBranchSelected !== '' && turnSelected !== '') {
            getTrace(params.idBrand, idBranchSelected, date.format('YYYY-MM-DD'), turnSelected);
        }        
    }
 
    const handlerChangeDate = (newDate) => {
        setDate(newDate);
    };

    const handlerClickSearch = () => {
        // console.log('idBranchSelected', idBranchSelected);
        // console.log('date', date);
        getTurns(params.idBrand, idBranchSelected, date.format('YYYY-MM-DD'));   
    }

    return [
        trace, turns,
        tab,
        branches,
        idBranchSelected,
        handleChangeBranch,
        handlerChangeTab,
        setTurnSelected,
        date, handlerChangeDate,
        handlerClickSearch
    ];
}
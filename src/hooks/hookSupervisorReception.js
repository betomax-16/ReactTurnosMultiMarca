import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loadCurrentUser } from "../redux/splices/currentUserSlice";
import { useTopMenuReception } from "./hookTopMenuReception";
import { setAlertsList } from '../redux/splices/alertSlice';
import { SupervisorService } from "../services/supervisor";
import { TraceService } from "../services/trace";
import { useParams } from "react-router-dom";
import moment from "moment";

export const useSupervisorReception = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const user = useSelector((state) => state.currentUser.user);

    const [slaveModules, setSlaveModules] = useState([]);
    const [tab, setTab] = useState(0);

    const [trace, setTrace] = useState([]);
    const [turns, setTurns] = useState([]);
    const [turnSelected, setTurnSelected] = useState('');

    const [
        branches, modules, isBranch,
        selectBranch, selectModule,
        valueSelect, valuesItemList,
        handlerOnClickOpenBranch,
        handlerOnClickOpenModule,
        handlerOnClickChangeBranch,
        handlerOnClickChangeModule,
        handlerChangeSelectValue,
        handlerSelectValue,
        openSubMenu, anchorEl,
        handlerCloseSubMenu,
        handlerLogout,
        sesion
    ] = useTopMenuReception();

    useEffect(() => {
        dispatch(loadCurrentUser());
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (user) {
            if (sesion && sesion.branch && sesion.module && !slaveModules.length) {
                getSalves(params.idBrand, sesion.branch._id, sesion.module._id);
                getTurns(params.idBrand, sesion.branch._id);
            }
        }
    }, [user, sesion]);// eslint-disable-line react-hooks/exhaustive-deps

    const getSalves = async (idBrand, idBranch, idModule) => {
        try {
            const res = await SupervisorService.getAllSlaves(idBrand, idBranch, idModule);
            setSlaveModules(res.data.body);
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

    const handlerChangeTab = (index) => {
        setTab(index);
        if (sesion.branch) {
            if (index === 0) {
                // getTurns(params.idBrand, sesion.branch._id);
            }
            else if (index === 1 && turnSelected !== '') {
                getTrace(params.idBrand, sesion.branch._id, turnSelected);
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

    const getTurns = async (idBrand, idBranch) => {
        try {
            const res = await TraceService.getTurns(idBrand, idBranch);
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

    return [
        user,
        
        branches, modules, isBranch,
        selectBranch, selectModule,
        valueSelect, valuesItemList,
        handlerOnClickOpenBranch,
        handlerOnClickOpenModule,
        handlerOnClickChangeBranch,
        handlerOnClickChangeModule,
        handlerChangeSelectValue,
        handlerSelectValue,
        openSubMenu, anchorEl,
        handlerCloseSubMenu,
        handlerLogout, 
        sesion,


        slaveModules, tab,
        trace, turns,
        handlerChangeTab,
        setTurnSelected
    ];
};
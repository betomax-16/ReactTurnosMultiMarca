import { useState, useEffect, useMemo } from "react";
import { BrandService } from "../services/brand";
import { BranchService } from "../services/branch";
import { ModuleService } from "../services/module";
import { TraceService } from "../services/trace";
import { StateService } from "../services/states";
import { UserService } from "../services/user";
import { AreaBranchService } from "../services/areaBranch";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from "react-router-dom";
import { setAlertsList } from '../redux/splices/alertSlice';
import { setSocketResponse } from "../redux/splices/socketResponseSlice";
import { w3cwebsocket } from "websocket";
import moment from "moment";

export function useTakeTest() {
    const [trace, setTrace] = useState([]);
    const [filterLaboratorio, setFilterLab] = useState('');
    const [filterImgen, setFilterImg] = useState('');
    const [area, setArea] = useState(null);
    const [session, setSession] = useState({
        brand: null,
        branch: null,
        module: null
    });

    const [states, setStates] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTurn, setSelectedTurn] = useState(null);
    const [idExakta, setIdExakta] = useState({
        value: '',
        error: false
    });

    const [socket, setSocket] = useState(null);
    const [tabHasFocus, setTabHasFocus] = useState(true);
    const socketResponse = useSelector((state) => state.socketResponse);

    const { search } = useLocation();
    const query = useMemo(() => new URLSearchParams(search), [search]);
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        const init = async () => {
            const resStates = await StateService.getAll();
            setStates(resStates.data.body);
        }

        if (query.get('area')) {
            setArea(query.get('area'));
        }

        const handleFocus = () => {
            // console.log('Tab has focus');
            setTabHasFocus(true);
        };
    
        const handleBlur = () => {
            // console.log('Tab lost focus');
            setTabHasFocus(false);
        };
    
        window.addEventListener('focus', handleFocus);
        window.addEventListener('blur', handleBlur);

        init();
        getSession();
        getTrace();

        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
        };
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
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
    }, [socket]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (tabHasFocus) {
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

    useEffect(() => {
        if (socketResponse && socketResponse.response) {
            if (socketResponse.response.method === 'finishTurnReception') {
                const turnRes = {...socketResponse.response.info};
                const auxTurns = [...trace];

                auxTurns.push({
                    ...turnRes,
                    status: 'Libre',
                    id: turnRes._id,
                    startDate: moment(turnRes.startDate).format("YYYY-MM-DD HH:mm:ss")
                });

                setTrace(auxTurns);
            }
            else if (socketResponse.response.method === 'callTurnTest') {
                const turnRes = {...socketResponse.response.info};
                const auxTraces = [...trace];
                const shift = turnRes.turn;
                for (let index = 0; index < auxTraces.length; index++) {
                    let t = {...auxTraces[index]};
                    if (t.turn === shift) {
                        turnRes.startDate = moment(turnRes.startDate).format("YYYY-MM-DD HH:mm:ss");
                        turnRes.status = 'Activo';
                        auxTraces[index] = turnRes;
                    }
                }
                
                setTrace(auxTraces);
            }
            else if (socketResponse.response.method === 'freeTurnTest') {
                const turnRes = {...socketResponse.response.info};
                const auxTraces = [...trace];
                const shift = turnRes.turn;
                for (let index = 0; index < auxTraces.length; index++) {
                    let t = {...auxTraces[index]};
                    if (t.turn === shift) {
                        turnRes.startDate = moment(turnRes.startDate).format("YYYY-MM-DD HH:mm:ss");
                        turnRes.status = 'Libre';
                        auxTraces[index] = turnRes;
                    }
                }
                
                setTrace(auxTraces);
            }
            else if (socketResponse.response.method === 'cancelTurnTest') {
                const turnRes = {...socketResponse.response.info};
                let auxTraces = [...trace];
                const shift = turnRes.turn;
                auxTraces = auxTraces.filter(t => t.turn !== shift);

                setTrace(auxTraces);
            }
            else if (socketResponse.response.method === 'finishTurnTest') {
                const turnRes = {...socketResponse.response.info};
                let auxTraces = [...trace];
                const shift = turnRes.turn;
                auxTraces = auxTraces.filter(t => t.turn !== shift);

                setTrace(auxTraces);
            }
        }
    }, [socketResponse]);// eslint-disable-line react-hooks/exhaustive-deps

    const getSession = async () => {
        try {
            const resBrand = await BrandService.get(params.idBrand);
            const resBranch = await BranchService.get(params.idBrand, params.idBranch);
            const resModule = await ModuleService.get(params.idBrand, params.idBranch, params.idModule);
            const auxSession = {...session};
            auxSession.brand = resBrand.data.body;
            auxSession.branch = resBranch.data.body;
            auxSession.module = resModule.data.body;
            setSession(auxSession);
            localStorage.setItem('brand', JSON.stringify(auxSession.brand));
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

    const getTrace = async () => {
        try {
            const resStates = await StateService.getAll();
            const stateAwaitTest = resStates.data.body.find(s => s.name === 'espera toma');
            const stateOnTest = resStates.data.body.find(s => s.name === 'en toma');
            const stateRecall = resStates.data.body.find(s => s.name === 're-call');
            
            let newQuery = '';
            if (query.get('area')) {
                const auxArea = query.get('area');
                const areas = await AreaBranchService.getAll(params.idBrand, params.idBranch);
                const lab = areas.data.body.find(a => a.area.name === 'Laboratorio');
                const img = areas.data.body.find(a => a.area.name === 'Imagen');
                const cit = areas.data.body.find(a => a.area.name === 'Citas');
                if (auxArea === 'Laboratorio' && lab) {
                    newQuery = `?idArea=${lab.area._id}`
                }
                else if (auxArea === 'Imagen') {
                    if (img && cit) {
                        newQuery = `?idArea=${img?.area._id}&idArea=${cit?.area._id}`
                    }
                    else if (img && !cit) {
                        newQuery = `?idArea=${img.area._id}`
                    }
                    else if (!img && cit) {
                        newQuery = `?idArea=${cit.area._id}`
                    }
                }
            }
            const res = await TraceService.getTestPendingTurn(params.idBrand, params.idBranch, newQuery);
            const rows = [];
            let status = 'Libre';
            res.data.body.forEach(row => {
                if (row.state._id === stateAwaitTest._id) {
                    status = 'Libre';
                }
                else if (row.state._id === stateOnTest._id || row.state._id === stateRecall._id) {
                    status = 'Activo';
                }

                rows.push({
                    ...row,
                    status,
                    id: row._id,
                    startDate: moment(row.startDate).format("YYYY-MM-DD HH:mm:ss")
                });
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

    const keyPress = (e, source) => {
        if(e.keyCode === 13){
            if (source === 'Imagen') {
                filterImg();   
            }
            else if (source === 'Laboratorio') {
                filterLab();
            }
         }
    }

    const filterLab = async () => {
        try {
            // const resStates = await StateService.getAll();
            const stateAwaitTest = states.find(s => s.name === 'espera toma');
            const stateOnTest = states.find(s => s.name === 'en toma');
            const stateRecall = states.find(s => s.name === 're-call');
            
            let newQuery = '';
            const areas = await AreaBranchService.getAll(params.idBrand, params.idBranch);
            const lab = areas.data.body.find(a => a.area.name === 'Laboratorio');
            newQuery = `?idArea=${lab.area._id}`
            newQuery += `&turn=${filterLaboratorio.toUpperCase()}`;

            const res = await TraceService.getTestPendingTurn(params.idBrand, params.idBranch, newQuery);
            const rows = [];
            let status = 'Libre';
            res.data.body.forEach(row => {
                if (row.idState === stateAwaitTest._id) {
                    status = 'Libre';
                }
                else if (row.idState === stateOnTest._id || row.idState === stateRecall._id) {
                    status = 'Activo';
                }

                rows.push({
                    ...row,
                    status,
                    id: row._id,
                    startDate: moment(row.startDate).format("YYYY-MM-DD HH:mm:ss")
                });
            });

            const auxImageTraces = trace.filter(t => t.area.name.toLowerCase() === 'imagen' || t.area.name.toLowerCase() === 'citas');
            auxImageTraces.forEach(element => {
                rows.push(element);
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

    const selectTurn = (data) => {
        const stateAwaitTest = states.find(s => s.name === 'espera toma');
        const stateOnTest = states.find(s => s.name === 'en toma');
        const stateRecall = states.find(s => s.name === 're-call');
        if (data.state._id === stateAwaitTest._id) {
            handleOpenDialog(data, 'atender');
        }
        else if (data.state._id === stateOnTest._id || data.state._id === stateRecall._id) {
            handleOpenDialog(data, 'otra accion');
        }
    }

    const filterImg = async () => {
        try {
            // const resStates = await StateService.getAll();
            const stateAwaitTest = states.find(s => s.name === 'espera toma');
            const stateOnTest = states.find(s => s.name === 'en toma');
            const stateRecall = states.find(s => s.name === 're-call');
            
            let newQuery = '';
            const areas = await AreaBranchService.getAll(params.idBrand, params.idBranch);
            const img = areas.data.body.find(a => a.area.name === 'Imagen');
            const cit = areas.data.body.find(a => a.area.name === 'Citas');
            if (img && cit) {
                newQuery = `?idArea=${img?.area._id}&idArea=${cit?.area._id}`
            }
            else if (img && !cit) {
                newQuery = `?idArea=${img.area._id}`
            }
            else if (!img && cit) {
                newQuery = `?idArea=${cit.area._id}`
            }

            newQuery += `&turn=${filterImgen.toUpperCase()}`;

            const res = await TraceService.getTestPendingTurn(params.idBrand, params.idBranch, newQuery);
            const rows = [];
            let status = 'Libre';
            res.data.body.forEach(row => {
                if (row.idState === stateAwaitTest._id) {
                    status = 'Libre';
                }
                else if (row.idState === stateOnTest._id || row.idState === stateRecall._id) {
                    status = 'Activo';
                }

                rows.push({
                    ...row,
                    status,
                    id: row._id,
                    startDate: moment(row.startDate).format("YYYY-MM-DD HH:mm:ss")
                });
            });

            const auxLabTraces = trace.filter(t => t.area.name.toLowerCase() === 'laboratorio');
            auxLabTraces.forEach(element => {
                rows.push(element);
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

    const handleOpenDialog = (turn, action) => {
        setOpenDialog(true);
        setSelectedTurn({turn, action});
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedTurn(null);
        setIdExakta({
            value: '',
            error: false
        });
    };

    const handlerChangeIdExakta = (e) => {
        if (e.target.value === '') {
            setIdExakta({
                value: '',
                error: true
            });
        }
        else {
            setIdExakta({
                value: e.target.value,
                error: false
            });
        }
    }

    const validIdExakta = async (id, isNew = false) => {
        try {
            const res = await UserService.getAll(params.idBrand, `?username=${id}|eq`)
            const user = res.data.body.length > 0 ? res.data.body[0] : null;
            let exist = false;
            if (user) { 
                if (user.rol.toLowerCase() === 'recepcionista') {
                    if (isNew) {
                        const resTrace = await TraceService.getTestPendingTurnByUser(params.idBrand, params.idBranch, user._id)

                        if (resTrace.data.body.length === 0) {
                            exist = true;
                        }
                        else {
                            const turn = resTrace.data.body[0].turn;
                            throw new Error(`Aún tiene pacientes pendientes. [${turn.toUpperCase()}]`);
                        }
                    }
                    else {
                        const resTrace = await TraceService.getTestPendingTurnByUser(params.idBrand, params.idBranch, user._id, `?turn=${selectedTurn.turn.turn}`)
                        if (resTrace.data.body.length > 0) {
                            if (resTrace.data.body[0].user.username.toUpperCase() === id.toUpperCase()) {
                                exist = true;
                            }
                            else {
                                throw new Error(`El idExakta: ${id} no es el quien inicio la atención.`);
                            }
                        }
                        else {
                            throw new Error('No tiene pacientes pendientes.');
                        }
                    }
                }
                else {
                    throw new Error('IdExakta no corresponde a un tomador o recepcionista de muestras.');
                }
            }
            else {
                throw new Error('IdExakta inexistente.');
            }

            return exist;
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

    const submit = async (action) => {
        if (!idExakta.error) {
            if (action === 'Atender') {
                const res = await validIdExakta(idExakta.value, true);
                if (res) {
                    handleCloseDialog();
                    handlerAttendTurn(idExakta.value);
                }
            }
            else if (action === 'Rellamar') {
                const res = await validIdExakta(idExakta.value);
                if (res) {
                    handleCloseDialog();
                    handlerReCallTurn(idExakta.value);
                }
            }
            else if (action === 'Cancelar') {
                const res = await validIdExakta(idExakta.value);
                if (res) {
                    handleCloseDialog();
                    handlerCancelationTurn(idExakta.value);
                }
            }
            else if (action === 'Terminar') {
                const res = await validIdExakta(idExakta.value);
                if (res) {
                    handleCloseDialog();
                    handlerAttendedTurn(idExakta.value);
                }
            }
            else if (action === 'Liberar') {
                const res = await validIdExakta(idExakta.value);
                if (res) {
                    handleCloseDialog();
                    handlerFreeTurn(idExakta.value);
                }
            }
        }
    }

    const handlerAttendTurn = async (idExakta) => {
        try {
            const resUser = await UserService.getAll(params.idBrand, `?username=${idExakta}|eq`)
            const user = resUser.data.body.length > 0 ? resUser.data.body[0] : null;
            if (user) {
                const shift = selectedTurn.turn.turn;
                const data = {
                    turn: shift,
                    idModule: params.idModule,
                    idUser: user._id
                };
                
                const res = await TraceService.nextTurnTest(params.idBrand, params.idBranch, data);

                if (socket) {
                    const auxInfo = JSON.stringify(res.data.body);
                    const data = JSON.stringify({
                        acction: 'emit',
                        method: 'callTurnTest',
                        data: {
                            idBrand: params.idBrand,
                            idBranch: params.idBranch,
                            info: auxInfo
                        }
                    });
                    socket.send(data);
                }

                setOpenDialog(false);
                setSelectedTurn(null);
            }
            else {
                dispatch(setAlertsList([
                    {message: 'username not found.', visible: true, severity: 'error'}
                ]))
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

    const handlerReCallTurn = async (idExakta) => {
        try {
            const resUser = await UserService.getAll(params.idBrand, `?username=${idExakta}|eq`)
            const user = resUser.data.body.length > 0 ? resUser.data.body[0] : null;
            if (user) {
                const shift = selectedTurn.turn.turn;
                const data = {
                    turn: shift,
                    idModule: params.idModule,
                    idUser: user._id
                };
            
                const res = await TraceService.recallTurnTest(params.idBrand, params.idBranch, data);
                
                dispatch(setAlertsList([
                    {message: `Ha re-llamado a: ${shift}`, visible: true, severity: 'info'}
                ]))
        
                if (socket) {
                    const auxInfo = JSON.stringify(res.data.body);
                    const data = JSON.stringify({
                        acction: 'emit',
                        method: 'recallTurn',
                        data: {
                            idBrand: params.idBrand,
                            idBranch: params.idBranch,
                            info: auxInfo
                        }
                    });
                    socket.send(data);
                }
            }
            else {
                dispatch(setAlertsList([
                    {message: 'username not found.', visible: true, severity: 'error'}
                ]))
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

    const handlerCancelationTurn = async (idExakta) => {
        try {
            const resUser = await UserService.getAll(params.idBrand, `?username=${idExakta}|eq`)
            const user = resUser.data.body.length > 0 ? resUser.data.body[0] : null;
            if (user) {
                const shift = selectedTurn.turn.turn;
                const data = {
                    turn: shift,
                    idModule: params.idModule,
                    idUser: user._id
                };
            
                const res = await TraceService.cancelTurnTest(params.idBrand, params.idBranch, data);
        
                if (socket) {
                    const auxInfo = JSON.stringify(res.data.body);
                    const data = JSON.stringify({
                        acction: 'emit',
                        method: 'cancelTurnTest',
                        data: {
                            idBrand: params.idBrand,
                            idBranch: params.idBranch,
                            info: auxInfo
                        }
                    });
                    socket.send(data);
                }
            }
            else {
                dispatch(setAlertsList([
                    {message: 'username not found.', visible: true, severity: 'error'}
                ]))
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

    const handlerAttendedTurn = async (idExakta) => {
        try {
            const resUser = await UserService.getAll(params.idBrand, `?username=${idExakta}|eq`)
            const user = resUser.data.body.length > 0 ? resUser.data.body[0] : null;
            if (user) {
                const shift = selectedTurn.turn.turn;
                const data = {
                    turn: shift,
                    idModule: params.idModule,
                    idUser: user._id
                };
            
                const res = await TraceService.finishTurnTest(params.idBrand, params.idBranch, data);
    
                if (socket) {
                    const auxInfo = JSON.stringify(res.data.body);
                    const data = JSON.stringify({
                        acction: 'emit',
                        method: 'finishTurnTest',
                        data: {
                            idBrand: params.idBrand,
                            idBranch: params.idBranch,
                            info: auxInfo
                        }
                    });
                    socket.send(data);
                } 
            }
            else {
                dispatch(setAlertsList([
                    {message: 'username not found.', visible: true, severity: 'error'}
                ]))
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

    const handlerFreeTurn = async (idExakta) => {
        try {
            const resUser = await UserService.getAll(params.idBrand, `?username=${idExakta}|eq`)
            const user = resUser.data.body.length > 0 ? resUser.data.body[0] : null;
            if (user) {
                const shift = selectedTurn.turn.turn;
                const data = {
                    turn: shift,
                    idModule: params.idModule,
                    idUser: user._id
                };
            
                const res = await TraceService.freeTurnTest(params.idBrand, params.idBranch, data);

                if (socket) {
                    const auxInfo = JSON.stringify(res.data.body);
                    const data = JSON.stringify({
                        acction: 'emit',
                        method: 'freeTurnTest',
                        data: {
                            idBrand: params.idBrand,
                            idBranch: params.idBranch,
                            info: auxInfo
                        }
                    });
                    socket.send(data);
                }
            }
            else {
                dispatch(setAlertsList([
                    {message: 'username not found.', visible: true, severity: 'error'}
                ]))
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

    const connectSocket = () => {
        let client = new w3cwebsocket(`ws://${window.location.hostname}:4000/`);
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

        client.onclose = function(e) {
            setTimeout(() => {
                client = new w3cwebsocket(`ws://${window.location.hostname}:4000/?idBranch=${params.idBranch}`);
                if (client.readyState === client.OPEN) {
                    setSocket(client);   
                }
            }, 1000);
        }

        client.onerror = function(err) {
            if (client) {
                client.close();    
            }
            else {
                setTimeout(() => {
                    client = new w3cwebsocket(`ws://${window.location.hostname}:4000/?idBranch=${params.idBranch}`);
                    if (client.readyState === client.OPEN) {
                        setSocket(client);   
                    }
                }, 1000);
            }
        }
    }

    return[
        session, area, trace,
        filterLaboratorio, setFilterLab,
        filterImgen, setFilterImg, filterImg,
        keyPress, filterLab, selectTurn,
        openDialog, selectedTurn, idExakta,
        submit, handleCloseDialog, handlerChangeIdExakta
    ];
}
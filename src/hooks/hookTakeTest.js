import { useState, useEffect, useMemo } from "react";
import { BrandService } from "../services/brand";
import { BranchService } from "../services/branch";
import { ModuleService } from "../services/module";
import { TraceService } from "../services/trace";
import { StateService } from "../services/states";
import { AreaBranchService } from "../services/areaBranch";
import { useDispatch } from 'react-redux';
import { useParams, useLocation } from "react-router-dom";
import { setAlertsList } from '../redux/splices/alertSlice';
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
    const { search } = useLocation();
    const query = useMemo(() => new URLSearchParams(search), [search]);
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        if (query.get('area')) {
            setArea(query.get('area'));
        }

        getSession();
        getTrace();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

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
            const resStates = await StateService.getAll();
            const stateAwaitTest = resStates.data.body.find(s => s.name === 'espera toma');
            const stateOnTest = resStates.data.body.find(s => s.name === 'en toma');
            const stateRecall = resStates.data.body.find(s => s.name === 're-call');
            
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
        // if (data.state === 'espera toma') {
        //     handleOpenDialog(data, 'atender');
        // }
        // else if (data.state === 'en toma' || data.state === 're-call') {
        //     handleOpenDialog(data, 'otra accion');
        // }
    }

    const filterImg = async () => {
        try {
            const resStates = await StateService.getAll();
            const stateAwaitTest = resStates.data.body.find(s => s.name === 'espera toma');
            const stateOnTest = resStates.data.body.find(s => s.name === 'en toma');
            const stateRecall = resStates.data.body.find(s => s.name === 're-call');
            
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

    return[
        session, area, trace,
        filterLaboratorio, setFilterLab,
        filterImgen, setFilterImg, filterImg,
        keyPress, filterLab, selectTurn
    ];
}
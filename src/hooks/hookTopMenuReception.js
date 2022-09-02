import { useState, useEffect } from "react";
import { BranchService } from "../services/branch";
import { ModuleService } from "../services/module";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { setAlertsList } from '../redux/splices/alertSlice';
import { clearCurrentUser } from '../redux/splices/currentUserSlice';
import { setBranch, setModule, setCurrentTurn } from "../redux/splices/sesionSlice";
import { TraceService } from "../services/trace";

export function useTopMenuReception() {
    const user = useSelector((state) => state.currentUser.user);
    const dispatch = useDispatch();
    const params = useParams();
    const [branches, setBranches] = useState([]);
    const [selectBranch, setSelectBranch] = useState(null);
    const [modules, setModules] = useState([]);
    const [selectModule, setSelectModule] = useState(null);
    const [openSubMenu, setOpenSubMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    
    const [isBranch, setIsBranch] = useState(false);
    const [valuesItemList, setValuesItemList] = useState([]);
    const [valueSelect, setValueSelect] = useState('');

    const sesion = useSelector((state) => state.sesion);
    const [checkCurrenTurn, setCheckCurrenTurn] = useState(false);

    useEffect(() => {
        getBranches(params.idBrand);
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (user) {
            const branch = JSON.parse(localStorage.getItem('branch'));
            if (branch) {
                getMyModule(params.idBrand, branch, user.id);
            }
        }
    }, [user]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (user && sesion && sesion.branch) {
            setCheckCurrenTurn(true);
        }
    }, [user, sesion]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const init = async () => {
            const turn = await TraceService.getTurns(params.idBrand, sesion.branch._id, `?idUser=${user.id}|eq&sourceSection=recepcion|eq|and&finalDate=null|eq|and`);
            
            if (turn.data.body.length) {
                dispatch(setCurrentTurn(turn.data.body[0]));
                dispatch(setBranch(turn.data.body[0].branch));
                const module = await ModuleService.getAll(params.idBrand, turn.data.body[0].branch._id, `?idUser=${user.id}|eq`)
                dispatch(setModule(module.data.body[0]));

                localStorage.setItem('branch', JSON.stringify(turn.data.body[0].branch));
                localStorage.setItem('module', JSON.stringify(module.data.body));
            }
        }

        if (checkCurrenTurn) {
            init();
        }
    }, [checkCurrenTurn]);// eslint-disable-line react-hooks/exhaustive-deps


    const handlerOnClickOpenBranch = (event) => {
        setIsBranch(true);
        setValuesItemList(branches);
        handlerOpenSubMenu(event);
        if (branches.length) {
            const firstItem = branches.at(-1);
            setSelectBranch(firstItem);
            setValueSelect(firstItem._id);      
        }
        else {
            handlerOnClickChangeBranch()    
        }
    }

    const handlerOnClickOpenModule = (event) => {
        setIsBranch(false);
        setValuesItemList(modules);
        handlerOpenSubMenu(event);
        if (modules.length) {
            const firstItem = modules.at(-1);
            setSelectModule(firstItem);
            setValueSelect(firstItem._id);   
        } 
        else {
            handlerOnClickChangeModule();      
        } 
    }

    const handlerOnClickChangeBranch = () => {
        setSelectBranch(null);
        setValueSelect('');
        localStorage.removeItem('branch');
        localStorage.removeItem('module');
        if (sesion.module) {
            ModuleService.update(params.idBrand, sesion.branch._id, sesion.module._id, {idUser: ''});
        }
        dispatch(setBranch(null));
        dispatch(setModule(null));
        // setStoreValues({ branch: null, module: null });
    }

    const handlerOnClickChangeModule = async () => {
        setSelectModule(null);
        setValueSelect(''); 
        localStorage.removeItem('module');
        // const auxStore = {...sesion};
        await ModuleService.update(params.idBrand, sesion.branch._id, sesion.module._id, {idUser: ''});
        if (!modules.length) {
            getModules(params.idBrand, sesion.branch._id);   
        }
        dispatch(setModule(null));
        // auxStore.module = null;
        // setStoreValues(auxStore);
    }

    const handlerChangeSelectValue = (event) => {
        if (isBranch) {
            const res = branches.find(b => b._id === event.target.value);
            setSelectBranch(res);
        }
        else {
            const res = modules.find(m => m._id === event.target.value);
            setSelectModule(res);
        }
        
        setValueSelect(event.target.value);
    }

    const handlerSelectValue = () => {
        if (isBranch) {
            if (selectBranch) {
                const branch = branches.find(b => b._id === selectBranch?._id);
                localStorage.setItem('branch', JSON.stringify(branch));
                // const auxStore = {...storeValues};
                // auxStore.branch = branch;
                // setStoreValues(auxStore);
                dispatch(setBranch(branch));
                getMyModule(params.idBrand, branch, user.id);
            }
        }
        else {
            if (selectModule) {
                const module = modules.find(m => m._id === selectModule?._id);
                const auxModule = {...module};
                ModuleService.update(params.idBrand, auxModule.idSucursal, auxModule._id, {idUser: user.id});
                auxModule.idUser = user.id;
                localStorage.setItem('module', JSON.stringify(auxModule)); 
                // const auxStore = {...storeValues};
                // auxStore.module = module;
                // setStoreValues(auxStore);
                dispatch(setModule(auxModule));
            }
        }
        handlerCloseSubMenu();
    }

    const handlerOpenSubMenu = (event) => {
        setOpenSubMenu(true);
        setAnchorEl(event.currentTarget);
    }

    const handlerCloseSubMenu = () => {
        setOpenSubMenu(false);
    }

    const handlerLogout = async () => {
        if (sesion.branch && sesion.module) {
            await ModuleService.update(params.idBrand, sesion.branch._id, sesion.module._id, {idUser: ''});
        }
        localStorage.removeItem('branch');
        localStorage.removeItem('module');
        dispatch(setBranch(null));
        dispatch(setModule(null));
        dispatch(clearCurrentUser());
        // setStoreValues({ branch: null, module: null });
        // navigate(`/brands/${params.idBrand}/login`, {replace: true});
    }

    const getBranches = async (idBrand) => {
        try {
            const res = await BranchService.getAll(idBrand);
            setBranches(res.data.body);
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

    const getModules = async (idBrand, idBranch) => {
        try {
            const res = await ModuleService.getAll(idBrand, idBranch, '');
            setModules(res.data.body);
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

    const getMyModule = async (idBrand, branch, idUser) => {
        try {
            const res = await ModuleService.getAll(idBrand, branch._id, `?idUser=${idUser}|eq`)
            if (res.data.body.length) {
                const module = res.data.body[0];
                localStorage.setItem('module', JSON.stringify(module)); 
                // const auxStore = {...storeValues};
                // auxStore.branch = branch;
                // auxStore.module = module;
                // setStoreValues(auxStore);
                dispatch(setBranch(branch));
                dispatch(setModule(module));
            }
            else {
                getModules(idBrand, branch._id);
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

    return [
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
        handlerLogout, sesion
    ];
}
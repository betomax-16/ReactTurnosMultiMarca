import { useState, useEffect } from "react";
import { BranchService } from "../services/branch";
import { ModuleService } from "../services/module";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { setAlertsList } from '../redux/splices/alertSlice';
import { clearCurrentUser } from '../redux/splices/currentUserSlice';

export function useTopMenuReception() {
    const user = useSelector((state) => state.currentUser.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    const [storeValues, setStoreValues] = useState({
        branch: null,
        module: null
    });

    useEffect(() => {
        const branch = JSON.parse(localStorage.getItem('branch'));
        const module = JSON.parse(localStorage.getItem('module'));
        const auxStoreValues = {...storeValues};
        getBranches(params.idBrand);

        if (branch) {
            auxStoreValues.branch = branch;
        }

        if (module) {
            auxStoreValues.module = module;
        }

        setStoreValues(auxStoreValues);
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (user) {
            const branch = JSON.parse(localStorage.getItem('branch'));
            if (branch) {
                getMyModule(params.idBrand, branch, user.id);
            }
        }
    }, [user]);// eslint-disable-line react-hooks/exhaustive-deps

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
        if (storeValues.module) {
            ModuleService.update(params.idBrand, storeValues.branch._id, storeValues.module._id, {idUser: ''});
        }
        setStoreValues({ branch: null, module: null });
    }

    const handlerOnClickChangeModule = () => {
        setSelectModule(null);
        setValueSelect(''); 
        localStorage.removeItem('module');
        const auxStore = {...storeValues};
        ModuleService.update(params.idBrand, auxStore.branch._id, auxStore.module._id, {idUser: ''});
        auxStore.module = null;
        setStoreValues(auxStore);
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
                const auxStore = {...storeValues};
                auxStore.branch = branch;
                setStoreValues(auxStore);
                getMyModule(params.idBrand, branch, user.id);
            }
        }
        else {
            if (selectModule) {
                const module = modules.find(m => m._id === selectModule?._id);
                ModuleService.update(params.idBrand, module.idSucursal, module._id, {idUser: user.id});
                module.idUser = user.id;
                localStorage.setItem('module', JSON.stringify(module)); 
                const auxStore = {...storeValues};
                auxStore.module = module;
                setStoreValues(auxStore);
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

    const handlerLogout = () => {
        dispatch(clearCurrentUser());
        if (selectBranch && selectModule) {
            ModuleService.update(params.idBrand, selectBranch._id, selectModule._id, {idUser: ''});
        }
        localStorage.removeItem('branch');
        localStorage.removeItem('module');
        setStoreValues({ branch: null, module: null });
        navigate(`/brands/${params.idBrand}/login`, {replace: true});
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
                const auxStore = {...storeValues};
                auxStore.branch = branch;
                auxStore.module = module;
                setStoreValues(auxStore);
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
        handlerLogout, storeValues
    ];
}
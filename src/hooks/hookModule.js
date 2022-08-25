import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { BranchService } from "../services/branch";
import { ModuleService } from "../services/module";
import { useForm  } from "react-hook-form";
import { usePrivileges } from "./hookPrivileges";
import { useSupervisor } from "./hookSupervisor";
import { ButtonTable } from "../components/superAdmin/panel/module/styles";

export const useModule = () => {
    const [idBrand, setIdBrand] = useState('');
    const [idBranchSelected, setIdBranchSelected] = useState('');
    const [typeModuleSelected, setTypeModuleSelected] = useState('');
    const [branches, setBranches] = useState([]);
    const [modules, setModules] = useState([]);
    const [modulesSelectedID, setModulesSelectedID] = useState([]);
    const [modulesSelected, setModulesSelected] = useState([]);
    const [moduleSelectedButtonTable, setModuleSelectedButtonTable] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openFormModule, setOpenFormModule] = useState(false);
    const [isNew, setIsNew] = useState(true);
    const [
        openFormPrivileges,
        handleOpenFormPrivileges,
        handleCloseFormPrivileges,
        handleSavePrivileges,
        getAreas, areas,
        handleChangePrivileges,
        checkboxPrivilege, setCheckboxPrivilege
    ] = usePrivileges();

    const [
        openFormSupervisor,
        handleOpenFormSupervisor,
        handleCloseFormSupervisor,
        supervisors,
        handlerChangeSupervisor,
        handlerDeleteSupervisor,
        addItemSupervisor,
        saveSupervisors
    ] = useSupervisor();
    const dispatch = useDispatch();

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({defaultValues: {
        name: '',
        type: '',
        mode: 'auto'
    }});

    const getBranches = async () => {
        try {
            const res = await BranchService.getAll(idBrand);
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

    const getModules = async (query) => {
        try {
            const rows = [];
            const res = await ModuleService.getAll(idBrand, idBranchSelected, query);
            
            res.data.body.forEach(row => {
                const status = {
                    val: row.status,
                    id: row._id,
                };

                const mode = row.type === 'modulo' ? row.mode : '';
                const action = row.type === 'vigia' ? '' : row._id;
                
                rows.push({
                    id: row._id,
                    name: row.name,
                    type: row.type,
                    status: status,
                    idSucursal: row.idSucursal,
                    username: row.username,
                    mode: mode,
                    hasPrivilegedArrivalTime: row.hasPrivilegedArrivalTime,
                    action: action
                });
            });

            setModules(rows);
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

    const handlerOnSelectionModelChange = (ids) => {
        const auxData = [];
        ids.forEach(id => {
            const data = modules.find(item => item.id === id);
            auxData.push(data);
        });

        setModulesSelected(auxData);
        setModulesSelectedID(ids);
    }

    const handleChangeBranch = (event) => {
        setIdBranchSelected(event.target.value);
    };

    const handlerSaveModule = async (data) => {
        try {
            delete data.id;        
            delete data.status;
            delete data.idSucursal;
            delete data.username;
            delete data.hasPrivilegedArrivalTime;
            if (isNew) {
                if (data.type !== 'modulo') {
                    delete data.mode;
                }
                const res = await ModuleService.create(idBrand, idBranchSelected, data);

                const auxModules = [...modules];
                const newModule = res.data.body;
                const status = {
                    val: newModule.status,
                    id: newModule._id,
                };

                const mode = newModule.type === 'modulo' ? newModule.mode : '';
                const action = newModule.type === 'vigia' ? '' : newModule._id;
                auxModules.push({
                    id: newModule._id,
                    name: newModule.name,
                    type: newModule.type,
                    status: status,
                    idSucursal: newModule.idSucursal,
                    username: newModule.username,
                    mode: mode,
                    hasPrivilegedArrivalTime: newModule.hasPrivilegedArrivalTime,
                    action: action
                });
                setModules(auxModules);
                setOpenFormModule(false);
                dispatch(setAlertsList([
                    {message: "Cambios exitosos.", visible: true, severity: 'success'}
                ]));
            }
            else {
                const item = modulesSelected[0];
                const res = await ModuleService.update(idBrand, idBranchSelected, item.id, data);
                const newModule = res.data.body;
                const auxModules = [...modules];
                for (let index = 0; index < auxModules.length; index++) {
                    let element = {...auxModules[index]};
                    if (element.id === item.id) {
                        const status = {
                            val: newModule.status,
                            id: newModule._id,
                        };

                        const mode = newModule.type === 'modulo' ? newModule.mode : '';
                        const action = newModule.type === 'vigia' ? '' : newModule._id;
                        element = {
                            id: newModule._id,
                            name: newModule.name,
                            type: newModule.type,
                            status: status,
                            idSucursal: newModule.idSucursal,
                            username: newModule.username,
                            mode: mode,
                            hasPrivilegedArrivalTime: newModule.hasPrivilegedArrivalTime,
                            action: action
                        }

                        auxModules[index] = element;
                        break;
                    }
                }
                setModules(auxModules);
                setModulesSelected([]);
                setModulesSelectedID([]);
                setOpenFormModule(false);
                dispatch(setAlertsList([
                    {message: "Cambios exitosos.", visible: true, severity: 'success'}
                ]));
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

    const handlerDeleteModule = async () => {
        try {
            let auxModules = [...modules];
            for (let index = 0; index < modulesSelectedID.length; index++) {
                const id = modulesSelectedID[index];
                await ModuleService.delete(idBrand, idBranchSelected, id);
                auxModules = auxModules.filter(b => b.id !== id);
            }
            
            setModules(auxModules);
            dispatch(setAlertsList([
                {message: "Cambios exitosos.", visible: true, severity: 'success'}
            ]));
        } catch (error) {
            if (error.response && error.response.data) {
                const errors = [];
                error.response.data.body.errors.forEach(e => {
                    errors.push({message: e.msg, visible: true, severity: 'error'});
                });
                dispatch(setAlertsList(errors));
            }
            else {
                dispatch(setAlertsList([
                    {message: error.message, visible: true, severity: 'error'}
                ]));
            }
        }
    }

    const onSubmit = data => handlerSaveModule(data);

    const handlerOpenFormModule = (val) => {
        setIsNew(val);
        if (modulesSelected.length === 1 && !val) {
            const item = modulesSelected[0];
            for (const property in item) {
                if (property === 'type') {
                    setTypeModuleSelected(item[property]);
                }
                setValue(property, item[property], {
                    shouldValidate: true,
                    // shouldDirty: errors.username != null
                })
            }
        }
        else {
            if (modules.length > 0) {
                const item = modules[0];
                
                for (const property in item) {
                    if (property === 'type') {
                        setTypeModuleSelected('');
                    }
                    setValue(property, '', {
                        shouldValidate: false,
                    })
                }
            }
        }
        setOpenFormModule(true);
    };

    const handlerCloseFormModule = () => {
        setOpenFormModule(false);
    };

    const onChangeTypeModule = (e) => {
        const val = e.target.value;
        setTypeModuleSelected(val);
    }

    const changeStatusModule = async (data, newStatus) => {
        try {
            const res = await ModuleService.update(idBrand, idBranchSelected, data.id, {status: newStatus});

            if (res.data.statusCode === 200) {
                const auxModules = [...modules];
                for (let index = 0; index < auxModules.length; index++) {
                    const element = {...auxModules[index]};
                    if (element.id === data.id) {
                        const status = {
                            val: newStatus,
                            id: data._id,
                        };
                        element.status = status;
                        auxModules[index] = element;
                        break;
                    }
                }
                
                setModules(auxModules);

                // if (props.socket) {
                //     props.socket.emit('refresh', {sucursal: data.sucursal, module: data.name}); 
                // }
                
                dispatch(setAlertsList([
                    {message: "Cambios exitosos.", visible: true, severity: 'success'}
                ])); 
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

    const handleChangeSwitchState = (event, data) => {
        changeStatusModule(data, event.target.checked);
    }

    const handleShowConfirm = (flag) => {
        setOpenConfirm(flag);
    };

    const handleAcceptConfirm = async () => {
        handlerDeleteModule();
        setOpenConfirm(false);
    };

    const logoutModule = async (idBrand, idBranch, idModule) => {
        try {
            await ModuleService.update(idBrand, idBranch, idModule, {username: ''});
            
            const auxModules = [...modules];
            for (let index = 0; index < auxModules.length; index++) {
                const element = {...auxModules[index]};
                if (element.id === idModule) {
                    element.username = '';
                    auxModules[index] = element;
                    break;
                }
            }

            setModules(auxModules);
            dispatch(setAlertsList([
                {message: "Cambios exitosos.", visible: true, severity: 'success'}
            ]));
        } catch (error) {
            if (error.response && error.response.data) {
                const errors = [];
                error.response.data.body.errors.forEach(e => {
                    errors.push({message: e.msg, visible: true, severity: 'error'});
                });
                dispatch(setAlertsList(errors));
            }
            else {
                dispatch(setAlertsList([
                    {message: error.message, visible: true, severity: 'error'}
                ]));
            }
        }
    }

    const printButtonAssociate = (idModule, color) => {
        if (idModule) {
            const res = modules.find(m => m.id === idModule);
            if (res) {
                if (res.type === 'modulo') {
                    return  <>
                        <ButtonTable color={color} onClick={async () => {
                            openFormPrivilegesHandler(idBrand, res);
                        }}>Asignar Privilegios</ButtonTable> 
                        <ButtonTable color={color} onClick={() => {
                            setModuleSelectedButtonTable(res);
                            handleOpenFormSupervisor(idBrand, res.idSucursal, idModule);
                        }}>Asignar Supervisor</ButtonTable>
                        <ButtonTable color={color} onClick={() => {
                            logoutModule(idBrand, res.idSucursal, idModule);
                        }}>Cerra sesión</ButtonTable>
                    </>
                }
                else if (res.type === 'toma') {
                    return <ButtonTable color={color} onClick={() => {
                        
                    }}>Copiar url</ButtonTable>
                }
            }
        }
        else {
            return <></>
        }
    }

    const openFormPrivilegesHandler = (idBrand, module) => {
        handleOpenFormPrivileges();
        setModuleSelectedButtonTable(module);
        setCheckboxPrivilege(module.hasPrivilegedArrivalTime);
        getAreas(idBrand, module.idSucursal, module.id);
    }

    const closeFormPrivileges = () => {
        handleCloseFormPrivileges();
        setModuleSelectedButtonTable(null);
        setCheckboxPrivilege(false);
    }

    const handerChangeCheckbox = (e) => {
        setCheckboxPrivilege(e.target.checked);
    }

    const savePrivileges = async (idBrand, idBranch, idModule) => {
        await handleSavePrivileges(idBrand, idBranch, idModule);
        const auxModules = [...modules];
        
        for (let index = 0; index < auxModules.length; index++) {
            const auxModule = {...auxModules[index]};
            if (auxModule.id === moduleSelectedButtonTable.id) {
                auxModule.isPrivilegeByArrivalTime = checkboxPrivilege;
                auxModules[index] = auxModule;
                break;
            }
        }

        setModules(auxModules);
        closeFormPrivileges();
    }

    return [
        getModules, modules,
        handlerOnSelectionModelChange, modulesSelectedID,
        openFormModule,
        handlerOpenFormModule,
        handlerCloseFormModule,
        isNew,
        modulesSelected,
        control,
        errors,
        handleSubmit,
        onSubmit,
        setIdBrand, idBrand,
        getBranches, branches, idBranchSelected,
        handleChangeBranch,
        typeModuleSelected, onChangeTypeModule,
        handleChangeSwitchState,
        openConfirm,
        handleAcceptConfirm,
        handleShowConfirm,
        printButtonAssociate,
        openFormPrivileges,
        closeFormPrivileges,
        savePrivileges,
        moduleSelectedButtonTable,
        areas,
        handleChangePrivileges,
        checkboxPrivilege,
        handerChangeCheckbox,

        openFormSupervisor,
        handleCloseFormSupervisor,
        supervisors,
        handlerChangeSupervisor,
        handlerDeleteSupervisor,
        addItemSupervisor,
        saveSupervisors
    ];
}
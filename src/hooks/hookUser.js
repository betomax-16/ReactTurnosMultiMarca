import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { SuperAdminService } from "../services/superAdmin";
import { UserService } from "../services/user";
import { RolService } from "../services/rol";
import { useForm  } from "react-hook-form";
import { useFilterUser } from "./hookFilterUser";
import { useSelector } from 'react-redux';

export const useUser = (columns) => {
    const [idBrand, setIdBrand] = useState('');
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [userSelectedID, setUserSelectedID] = useState([]);
    const [userSelected, setUserSelected] = useState([]);
    const [openFormUser, setOpenFormUser] = useState(false);
    const [openFormChangePass, setOpenFormChangePass] = useState(false);
    const [pass, setPass] = useState({ value: '', error: false });
    const [openConfirm, setOpenConfirm] = useState(false);
    const [isNew, setIsNew] = useState(true);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const user = useSelector((state) => state.currentUser.user);
    const dispatch = useDispatch();

    const [
        open_menu,
        anchorEl,
        handlerOpenMenu, handlerCloseMenu,
        filters,
        addFilter, removeFilter,
        handlerChangeSelectColumn,
        handlerChangeSelectOperator,
        handlerChangeValue,
        handlerChangeSelectLogicOperator
    ] = useFilterUser(columns);

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({defaultValues: {
        username: '',
        name: '',
        firstLastName: '',
        secondLastName: '',
        rol: '',
        password: ''
    }});

    useEffect(() => {
        setIsSuperAdmin(user?.rol === 'Super-Admin');
    }, [user]);// eslint-disable-line react-hooks/exhaustive-deps

    const getRoles = async (currentUser) => {
        try {
            const res = await RolService.getAll();
            let rows = [];
            res.data.body.forEach(row => {
                rows.push({
                    id: row._id,
                    name: row.name
                });
            });

            if (currentUser && currentUser.rol === 'Admin') {
                switch (currentUser.rol) {
                    case 'Super-Admin':
                        
                        break;
                    case 'Admin':
                        rows = rows.filter(r => r.name !== 'Super-Admin');
                        break;
                    case 'Sub-Admin':
                        rows = rows.filter(r => (r.name !== 'Super-Admin' && r.name !== 'Admin'));
                        break;
                    default:
                        rows = rows.filter(r => (r.name !== 'Super-Admin' && r.name !== 'Admin' && r.name !== 'Sub-Admin'));
                        break;
                }
            }
            rows = rows.sort((a, b) => {
                if (a.name < b.name)
                  return -1;
                if (a.name > b.name)
                  return 1;
                return 0;
            });
            setRoles(rows);
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

    const getUsers = async (currenUser, query, isSuperAdmin) => {
        try {
            const rows = [];
            const res = isSuperAdmin ? await SuperAdminService.getAll() : await UserService.getAll(idBrand, query);
            
            res.data.body.forEach(row => {
                if (currenUser.username !== row.username) {
                    rows.push({
                        id: row._id,
                        username: row.username,
                        name: row.name,
                        firstLastName: row.firstLastName,
                        secondLastName: row.secondLastName,
                        rol: row.rol
                    });
                }
            });

            setUsers(rows);
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
            const data = users.find(item => item.id === id);
            auxData.push(data);
        });

        setUserSelected(auxData);
        setUserSelectedID(ids);
    }

    const handlerOpenFormUser = (val) => {
        setIsNew(val);
        if (userSelected.length === 1 && !val) {
            const item = userSelected[0];
            for (const property in item) {
                if (property === 'rol') {
                    setValue(property, item.rol, {
                        shouldValidate: false,
                    })
                }
                setValue(property, item[property], {
                    shouldValidate: true,
                    // shouldDirty: errors.username != null
                })
            }
        }
        else {
            if (users.length > 0) {
                const item = users[0];
                
                for (const property in item) {
                    setValue(property, '', {
                        shouldValidate: false,
                    })
                }
            }
        }
        setOpenFormUser(true);
    };

    const handlerCloseFormUser = () => {
        setOpenFormUser(false);
    };

    const handlerOpenFormChangePass = () => {
        setOpenFormChangePass(true);
    };

    const handlerCloseFormChangePass = () => {
        setOpenFormChangePass(false);
    };

    const onSubmit = data => handlerSave(data);

    const handlerSave = async (data) => {
        try {
            if (isNew) {
                const res = isSuperAdmin ? await SuperAdminService.create(data) : await UserService.create(idBrand, data);

                const auxUsers = [...users];
                const newUser = res.data.body;
                auxUsers.push({
                    id: newUser._id,
                    username: newUser.username,
                    name: newUser.name,
                    firstLastName: newUser.firstLastName,
                    secondLastName: newUser.secondLastName,
                    rol: newUser.rol
                });
                setUsers(auxUsers);
                setOpenFormUser(false);
                dispatch(setAlertsList([
                    {message: "Cambios exitosos.", visible: true, severity: 'success'}
                ]));
            }
            else {
                const item = userSelected[0];
                const res = isSuperAdmin ? await SuperAdminService.update(item.id, data) : await UserService.update(idBrand, item.id, data);
                const newUser = res.data.body;
                const auxUsers = [...users];
                for (let index = 0; index < auxUsers.length; index++) {
                    let element = {...auxUsers[index]};
                    if (element.id === item.id) {
                        element = {
                            id: newUser._id,
                            username: newUser.username,
                            name: newUser.name,
                            firstLastName: newUser.firstLastName,
                            secondLastName: newUser.secondLastName,
                            rol: newUser.rol
                        }

                        auxUsers[index] = element;
                        break;
                    }
                }
                setUsers(auxUsers);
                setUserSelected([]);
                setUserSelectedID([]);
                setOpenFormUser(false);
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

    const handlerDelete = async () => {
        try {
            let auxUsers = [...users];
            for (let index = 0; index < userSelectedID.length; index++) {
                const id = userSelectedID[index];
                if (isSuperAdmin) {
                    await SuperAdminService.delete(id);
                }
                else {
                    await UserService.delete(idBrand, id);
                }
                
                auxUsers = auxUsers.filter(b => b.id !== id);
            }
            
            setUsers(auxUsers);
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

    const handleShowConfirm = (flag) => {
        setOpenConfirm(flag);
    };

    const handleAcceptConfirm = async () => {
        handlerDelete();
        setOpenConfirm(false);
    };

    const handlerSaveChangePass = async () => {
        try {
            if (pass.value !== '') {
                const user = userSelected[0];
                if (isSuperAdmin) {
                    await SuperAdminService.update(user.id, {password: pass.value});
                }
                else {
                    await UserService.update(idBrand, user.id, {password: pass.value});
                }
                
                setPass({ value: '', error: false });
                setOpenFormChangePass(false);
                dispatch(setAlertsList([
                    {message: "Cambio de contraseña efectuado exitosamente.", visible: true, severity: 'success'}
                ]));
            }
            else {
                setPass({ value: '', error: true });
            }
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

    const handleChangeBrand = (event) => {
        setIdBrand(event.target.value);
    };

    return [
        getUsers, users,
        handlerOnSelectionModelChange, userSelectedID,
        userSelected,
        setIdBrand, idBrand,
        openFormUser,
        handlerOpenFormUser,
        handlerCloseFormUser,
        isNew,
        control,
        errors,
        handleSubmit,
        onSubmit,
        handleAcceptConfirm, openConfirm,
        handleShowConfirm,
        getRoles, roles,
        openFormChangePass,
        handlerOpenFormChangePass,
        handlerCloseFormChangePass,
        handlerSaveChangePass,
        setPass, pass,

        open_menu,
        anchorEl,
        handlerOpenMenu, handlerCloseMenu,
        filters,
        addFilter, removeFilter,
        handlerChangeSelectColumn,
        handlerChangeSelectOperator,
        handlerChangeValue,
        handlerChangeSelectLogicOperator,
        handleChangeBrand
    ];
}
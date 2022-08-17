import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { AreaService } from "../services/area";
import { useForm  } from "react-hook-form";

export const useArea = () => {
    const [idBrand, setIdBrand] = useState('');
    const [areas, setAreas] = useState([]);
    const [areaSelectedID, setAreaSelectedID] = useState([]);
    const [areaSelected, setAreaSelected] = useState([]);
    const [openFormArea, setOpenFormArea] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [isNew, setIsNew] = useState(true);
    const dispatch = useDispatch();

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({defaultValues: {
        name: '',
        prefix: ''
    }});


    const getAreas = async () => {
        try {
            const res = await AreaService.getAll(idBrand);
            const rows = [];
            res.data.body.forEach(row => {
                rows.push({
                    id: row._id,
                    name: row.name,
                    prefix: row.prefix
                });
            });
            setAreas(rows);
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
            const data = areas.find(item => item.id === id);
            auxData.push(data);
        });

        setAreaSelected(auxData);
        setAreaSelectedID(ids);
    }

    const onSubmit = data => handlerSave(data);

    const handlerSave = async (data) => {
        try {
            if (isNew) {
                const res = await AreaService.create(idBrand, data);

                const auxAreas = [...areas];
                const newArea = res.data.body;
                auxAreas.push({
                    id: newArea._id,
                    name: newArea.name,
                    prefix: newArea.prefix
                });
                setAreas(auxAreas);
                setOpenFormArea(false);
                dispatch(setAlertsList([
                    {message: "Cambios exitosos.", visible: true, severity: 'success'}
                ]));
            }
            else {
                const item = areaSelected[0];
                const res = await AreaService.update(idBrand, item.id, data);
                const newArea = res.data.body;
                const auxAreas = [...areas];
                for (let index = 0; index < auxAreas.length; index++) {
                    let element = {...auxAreas[index]};
                    if (element.id === item.id) {
                        element = {
                            id: newArea._id,
                            name: newArea.name,
                            prefix: newArea.prefix
                        }

                        auxAreas[index] = element;
                        break;
                    }
                }
                setAreas(auxAreas);
                setOpenFormArea(false);
                setAreaSelected([]);
                setAreaSelectedID([]);
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
                dispatch(setAlertsList(errors));
            }
            else {
                dispatch(setAlertsList([
                    {message: error.message, visible: true, severity: 'error'}
                ]));
            }
        }
    }

    const handlerDelete = async () => {
        try {
            let auxAreas = [...areas];
            for (let index = 0; index < areaSelectedID.length; index++) {
                const id = areaSelectedID[index];
                await AreaService.delete(idBrand, id);
                auxAreas = auxAreas.filter(b => b.id !== id);
            }
            
            setAreas(auxAreas);
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

    const handlerOpenFormArea = (val) => {
        setIsNew(val);
        if (areaSelected.length === 1 && !val) {
            const item = areaSelected[0];
            for (const property in item) {
                setValue(property, item[property], {
                    shouldValidate: true,
                    // shouldDirty: errors.username != null
                })
            }
        }
        else {
            if (areas.length > 0) {
                const item = areas[0];
                
                for (const property in item) {
                    setValue(property, '', {
                        shouldValidate: false,
                    })
                }
            }
        }
        setOpenFormArea(true);
    };

    const handlerCloseFormArea = () => {
        setOpenFormArea(false);
    };

    const handleShowConfirm = (flag) => {
        setOpenConfirm(flag);
    };

    const handleAcceptConfirm = async () => {
        handlerDelete();
        setOpenConfirm(false);
    };

    return [
        getAreas, areas,
        handlerOnSelectionModelChange, areaSelectedID,
        areaSelected,
        openFormArea,
        handlerOpenFormArea,
        handlerCloseFormArea,
        isNew,
        control,
        errors,
        handleSubmit,
        onSubmit,
        openConfirm,
        handleAcceptConfirm,
        handleShowConfirm,
        setIdBrand, idBrand
    ];
};
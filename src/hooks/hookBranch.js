import { useState } from "react";
import { BranchService } from "../services/branch";
import { AreaService } from "../services/area";
import { AreaBranchService } from "../services/areaBranch";
import { setAlertsList } from '../redux/splices/alertSlice';
import { useDispatch } from 'react-redux';
import { useForm  } from "react-hook-form";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export const useBranch = () => {
    const [idBranchSelected, setIdBranchSelected] = useState(null);
    const [idBrand, setIdBrand] = useState('');
    const [branches, setBranches] = useState([]);
    const [branchSelectedID, setBranchSelectedID] = useState([]);
    const [branchSelected, setBranchSelected] = useState([]);
    const [openFormBranch, setOpenFormBranch] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openFormArea, setOpenFormArea] = useState(false);
    const [isNew, setIsNew] = useState(true);
    const [areasSucursal, setAreasSucursal] = useState([]);
    const [copyAreasSucursal, setCopyAreasSucursal] = useState([]);
    const dispatch = useDispatch();

    const [color, setColor] = useState({hex: "#782929"});

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({defaultValues: {
        name: '',
        color: color?.hex,
        timeLimit: 15
    }});

    const getAreasBySucursal = async (idBranch) => {
        try {
            const resAssociation = await AreaBranchService.getAll(idBrand, idBranch);
            const resAreas = await AreaService.getAll(idBrand);

            let areasAssociation = [];
            if (resAssociation.status === 200) {
                areasAssociation = resAssociation.data.body;
            }

            const areas = resAreas.data.body.map(a => {return {...a, checked: false}});
            
            for (let index = 0; index < areasAssociation.length; index++) {
                const areasAssociate = areasAssociation[index];
                const area = areas.find(a => a._id === areasAssociate.area._id);
                if (area) {
                    area.checked = true;
                }
            }

            setAreasSucursal(areas);
            setCopyAreasSucursal(areas);
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

    const getBranches = async () => {
        try {
            const res = await BranchService.getAll(idBrand);
            const rows = [];
            res.data.body.forEach(row => {
                rows.push({
                    id: row._id,
                    name: row.name, 
                    urlTakeTurn: `${window.location.hostname}:${window.location.port}/brands/${row._id}/taketurn`,
                    urlScreen: `${window.location.hostname}:${window.location.port}/brands/${row._id}/screen`,
                    associate: row._id,
                    color: row.color,
                    timeLimit: row.timeLimit
                });
            });
            setBranches(rows);
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

    const handlerSave = async (data) => {
        try {
            if (isNew) {
                const res = await BranchService.create(idBrand, data);

                const auxBranches = [...branches];
                const newBranch = res.data.body;
                auxBranches.push({
                    id: newBranch._id,
                    name: newBranch.name, 
                    urlTakeTurn: `${window.location.hostname}:${window.location.port}/brands/${idBrand}/taketurn`,
                    urlScreen: `${window.location.hostname}:${window.location.port}/brands/${idBrand}/screen`,
                    associate: newBranch._id
                });
                setBranches(auxBranches);
                setOpenFormBranch(false);
                dispatch(setAlertsList([
                    {message: "Cambios exitosos.", visible: true, severity: 'success'}
                ]));
            }
            else {
                const item = branchSelected[0];
                const res = await BranchService.update(idBrand, item.id, data);
                const newBranch = res.data.body;
                const auxBranches = [...branches];
                for (let index = 0; index < auxBranches.length; index++) {
                    let element = {...auxBranches[index]};
                    if (element.id === item.id) {
                        element = {
                            id: newBranch._id,
                            name: newBranch.name, 
                            urlTakeTurn: `${window.location.hostname}:${window.location.port}/brands/${idBrand}/taketurn`,
                            urlScreen: `${window.location.hostname}:${window.location.port}/brands/${idBrand}/screen`,
                            associate: newBranch._id,
                            color: newBranch.color,
                            timeLimit: newBranch.timeLimit
                        }

                        auxBranches[index] = element;
                        break;
                    }
                }
                setBranches(auxBranches);
                setBranchSelected([]);
                setBranchSelectedID([]);
                setOpenFormBranch(false);
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
            let auxBranches = [...branches];
            for (let index = 0; index < branchSelectedID.length; index++) {
                const id = branchSelectedID[index];
                await BranchService.delete(idBrand, id);
                auxBranches = auxBranches.filter(b => b.id !== id);
            }
            
            setBranches(auxBranches);
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

    const onSubmit = data => handlerSave(data);

    const handlerOpenFormBranch = (val) => {
        setIsNew(val);
        if (branchSelected.length === 1 && !val) {
            const item = branchSelected[0];
            for (const property in item) {
                if (property === 'color') {
                    setColor({hex: item[property]});
                }
                setValue(property, item[property], {
                    shouldValidate: true,
                    // shouldDirty: errors.username != null
                })
            }
        }
        else {
            if (branches.length > 0) {
                const item = branches[0];
                
                for (const property in item) {
                    if (property === 'color') {
                        setColor({hex: "#782929"});
                    }

                    setValue(property, '', {
                        shouldValidate: false,
                    })
                }
            }
        }
        setOpenFormBranch(true);
    };

    const handlerCloseFormBranch = () => {
        setOpenFormBranch(false);
    };

    const handlerOpenFormAreas = (idBranch) => {
        setIdBranchSelected(idBranch);
        setOpenFormArea(true);
    }

    const handlerCloseFormAreas = () => {
        setIdBranchSelected(null);
        setOpenFormArea(false);
    }

    const handlerOnSelectionModelChange = (ids) => {
        const auxData = [];
        ids.forEach(id => {
            const data = branches.find(item => item.id === id);
            auxData.push(data);
        });

        setBranchSelected(auxData);
        setBranchSelectedID(ids);
    }

    const handlerChangeColor = (color) => {
        setValue("color", color.hex);
        setColor(color);
    };

    const handleShowConfirm = (flag) => {
        setOpenConfirm(flag);
    };

    const handleAcceptConfirm = async () => {
        handlerDelete();
        setOpenConfirm(false);
    };

    const handleChangeBrand = (event) => {
        setIdBrand(event.target.value);
    };

    const handlerCheckAllAreas = (event) => {
        const dataAux = [...areasSucursal];
        for (let index = 0; index < dataAux.length; index++) {
            const element = {...dataAux[index]};
            element.checked = event.target.checked;
            dataAux[index] = element;
        }

        setAreasSucursal(dataAux);
    }

    const handleCheckArea = (idArea, value) => {
        const dataAux = [...areasSucursal];
        for (let index = 0; index < dataAux.length; index++) {
            const element = {...dataAux[index]};
            if (element._id === idArea) {
                element.checked = value;
                dataAux[index] = element;
                break;
            }
        }

        setAreasSucursal(dataAux);
    }

    const printCheckBox = () =>  {
        const result = [];
        for (let index = 0; index < areasSucursal.length; index++) {
            const element = areasSucursal[index];
            result.push(<FormControlLabel key={index} control={<Checkbox onChange={(e) => handleCheckArea(element._id, e.target.checked)} checked={element.checked} />} label={element.name} />);
        }

        return result;
    }

    const handlerSaveAreas = () => {
        try {
            const deleteRow = [];
            const insertRow = [];

            for (let index = 0; index < areasSucursal.length; index++) {
                const areaChecked = areasSucursal[index];
                const area = copyAreasSucursal.find(a => a._id === areaChecked._id);
                if (area) {
                    if (area.checked !== areaChecked.checked) {
                        if (areaChecked.checked) {
                            insertRow.push(areaChecked);
                        }
                        else {
                            deleteRow.push(areaChecked);
                        }
                    }
                }
            }

            if (deleteRow.length > 0) {
                deleteRow.forEach(element => {
                    AreaBranchService.delete(idBrand, idBranchSelected, element._id);
                });
            }
    
            if (insertRow.length > 0) {
                insertRow.forEach(element => {
                    AreaBranchService.create(idBrand, idBranchSelected,  element._id);
                });  
            }

            setOpenFormArea(false);
            dispatch(setAlertsList([
                {message: "Cambios exitosos.", visible: true, severity: 'success'}
            ]));
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
        handlerOnSelectionModelChange, branchSelectedID,
        branchSelected,
        getBranches, branches,
        openFormBranch,
        handlerOpenFormBranch,
        handlerCloseFormBranch,
        isNew,
        color,
        handlerChangeColor,
        control,
        errors,
        handleSubmit,
        onSubmit,
        setIdBrand, idBrand,
        openConfirm,
        handleAcceptConfirm,
        handleShowConfirm,
        handleChangeBrand,
        getAreasBySucursal,
        openFormArea,
        handlerOpenFormAreas,
        handlerCloseFormAreas,
        handlerCheckAllAreas,
        handlerSaveAreas,
        printCheckBox
    ];
}
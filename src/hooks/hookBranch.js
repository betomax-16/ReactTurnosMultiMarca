import { useState } from "react";
import { BranchService } from "../services/branch";
import { setAlertsList } from '../redux/splices/alertSlice';
import { useDispatch } from 'react-redux';
import { useForm  } from "react-hook-form";

export const useBranch = () => {
    const [idBrand, setIdBrand] = useState('');
    const [branches, setBranches] = useState([]);
    const [branchSelectedID, setBranchSelectedID] = useState([]);
    const [branchSelected, setBranchSelected] = useState([]);
    const [openFormBranch, setOpenFormBranch] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [isNew, setIsNew] = useState(true);
    const dispatch = useDispatch();

    const [color, setColor] = useState({hex: "#782929"});

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({defaultValues: {
        name: '',
        color: color?.hex,
        timeLimit: 15
    }});

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
        handleChangeBrand
    ];
}
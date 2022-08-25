import { useState } from "react";
import { ModuleService } from "../services/module";
import { SupervisorService } from "../services/supervisor";
import { useDispatch } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';

export const useSupervisor = () => { 
    const [openFormSupervisor, setOpenFormSupervisor] = useState(false);
    const [supervisors, setSupervisors] = useState([]);
    const [vigias, setVigias] = useState([]);
    const dispatch = useDispatch();

    const handleCloseFormSupervisor = () => {
        setOpenFormSupervisor(false);
        setVigias([]);
        setSupervisors([]);
    }

    const handleOpenFormSupervisor = async (idBrand, idBranch, idModule) => {
        try {
            const query = `?type=vigia|eq`;
            const resModulesVigia = await ModuleService.getAll(idBrand, idBranch, query)
            const resSupervisors = await SupervisorService.getAll(idBrand, idBranch, idModule);
            
            const auxItems = [];
            if (resSupervisors.data.body) {
                resSupervisors.data.body.forEach(item => {
                    auxItems.push({
                        id: item._id,
                        options: resModulesVigia.data.body,
                        selectOption: item.vigia._id
                    });
                });
            }

            setVigias(resModulesVigia.data.body);
            setSupervisors(auxItems);
            setOpenFormSupervisor(true);
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

    const addItemSupervisor = () => {
        const auxItems = [...supervisors];
        if (vigias.length && auxItems.length < vigias.length) {
            const serial = (new Date()).getTime();
            auxItems.push({
                id: `id-${serial}`,
                options: vigias,
                selectOption: vigias[0]._id
            });
            setSupervisors(auxItems);
        }
    }

    const addSupervisor = async (idBrand, idBranch, idModule, idVigia) => {
        try {
            await SupervisorService.create(idBrand, idBranch, { idVigia, idModule })
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

    const deleteSupervisor = async (idBrand, idBranch, idSupervisor) => {
        try {
            await SupervisorService.delete(idBrand, idBranch, idSupervisor);
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

    const saveSupervisors = async (idBrand, idBranch, idModule) => {
        try {
            console.log(idModule);
            const auxItems = [...supervisors];
            for (let index = 0; index < auxItems.length; index++) {
                const item = auxItems[index];
                const resutl = supervisors.filter(i => i.selectOption === item.selectOption)
                if (resutl.length > 1) {
                    dispatch(setAlertsList([
                        {message: 'No se pueden repetir los vigias seleccionados.', visible: true, severity: 'error'}
                    ]));
                    return;
                }
            }

            const resSupervisors = await SupervisorService.getAll(idBrand, idBranch, idModule);
            
            if (resSupervisors.data.body) {
                supervisors.forEach(element => {
                    const result = resSupervisors.data.body.find(i => i.modulo._id === idModule && i.vigia._id === element.selectOption);
                    // add relation
                    if (!result) {
                        addSupervisor(idBrand, idBranch, idModule, element.selectOption);
                    }
                });

                resSupervisors.data.body.forEach(element => {
                    const result = supervisors.find(i => i.selectOption === element.vigia._id);
                    //delete
                    if (!result) {
                        deleteSupervisor(idBrand, idBranch, element._id);
                    }
                });
            }
            else {
                // add relation
                supervisors.forEach(element => {
                    addSupervisor(idBrand, idBranch, idModule, element.selectOption);
                });
            }
            
            setOpenFormSupervisor(false); 
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

    const handlerChangeSupervisor = (id, event) => {
        const auxItems = [...supervisors];
        for (let index = 0; index < auxItems.length; index++) {
            const item = {...auxItems[index]};
            if (item.id === id) {
                item.selectOption = event.target.value;
                auxItems[index] = item;
                setSupervisors(auxItems);
                break;
            }
        }
    }

    const handlerDeleteSupervisor = (id) => {
        const auxItemsSipervisor = supervisors.filter(i => i.id !== id);
        setSupervisors(auxItemsSipervisor);
    }

    return [
        openFormSupervisor,
        handleOpenFormSupervisor,
        handleCloseFormSupervisor,
        supervisors,
        handlerChangeSupervisor,
        handlerDeleteSupervisor,
        addItemSupervisor,
        saveSupervisors
    ];
}
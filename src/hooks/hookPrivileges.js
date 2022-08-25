import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { ModuleService } from "../services/module";
import { AreaBranchService } from "../services/areaBranch";
import { ModulePrivilegeService } from "../services/modulePrivilege";

export const usePrivileges = () => {
    const [areas, setAreas] = useState([]);
    const [checkboxPrivilege, setCheckboxPrivilege] = useState(false);
    const [openFormPrivileges, setOpenFormPrivileges] = useState(false);
    const dispatch = useDispatch();

    const getAreas = async (idBrand, idBranch, idModule) => {
        try {
            const res = await AreaBranchService.getAll(idBrand, idBranch)

            const auxData = [];
            res.data.body.forEach(element => {
                auxData.push({
                    idArea: element.area._id,
                    name: element.area.name,
                    privilege: 0
                });
            });

            const resPrivilege = await ModulePrivilegeService.getAll(idBrand, idBranch, idModule)

            if (resPrivilege.status === 200) {
                if (resPrivilege.data.body.length > 0) {
                    auxData.forEach(element => {
                        const exist = resPrivilege.data.body.find(e => e.idArea === element.idArea);
                        if (exist) {
                            element.privilege = exist.privilege;
                            element.idAssociate = exist._id;
                        }
                    });
                }
            }

            setAreas(auxData);
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

    const handleSavePrivileges = async (idBrand, idBranch, idModule) => {
        try {
            await ModuleService.update(idBrand, idBranch, idModule, { hasPrivilegedArrivalTime: checkboxPrivilege })

            for (let index = 0; index < areas.length; index++) {
                const element = {...areas[index]};

                if (!element.idAssociate) {
                    await ModulePrivilegeService.create(idBrand, idBranch, idModule, element);
                }
                else {
                    await ModulePrivilegeService.update(idBrand, idBranch, idModule, element.idAssociate, element);
                } 
            }
            
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

    const handleCloseFormPrivileges = () => {
        setOpenFormPrivileges(false);
    }

    const handleOpenFormPrivileges = () => {
        setOpenFormPrivileges(true);
    }

    const handleChangePrivileges = (idArea, value) => {
        const auxData = [...areas];
        const data = auxData.find(e => e.idArea === idArea);
        if (data) {
            data.privilege = value;
        }

        setAreas(auxData);
    }

    return [
        openFormPrivileges,
        handleOpenFormPrivileges,
        handleCloseFormPrivileges, 
        handleSavePrivileges,
        getAreas, areas,
        handleChangePrivileges,
        checkboxPrivilege, setCheckboxPrivilege
    ];
}
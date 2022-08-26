import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { setAlertsList } from '../redux/splices/alertSlice';
import { BranchService } from "../services/branch";
import { BrandService } from "../services/brand";
import { clearCurrentUser,loadCurrentUser } from '../redux/splices/currentUserSlice';

export const useMenu = () => {
    const user = useSelector((state) => state.currentUser.user);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [toggleTurn, setToggleTurn] = useState(false);
    const [openModalReset, setOpenModalReset] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectBrand, setSelectBrand] = useState('');
    const [brands, setBrands] = useState([]);
    const [selectBranch, setSelectBranch] = useState('');
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        try {
            dispatch(loadCurrentUser());    
        } catch (error) {
            dispatch(setAlertsList([
                {message: error.message, visible: true, severity: 'error'}
            ]))
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (selectBrand !== '') {
            getBranches();
        }
    }, [selectBrand]);// eslint-disable-line react-hooks/exhaustive-deps

    const getBrands = async () => {
        try {
            const res = await BrandService.getAll();
            const rows = [];
            res.data.body.forEach(row => {
                rows.push({
                    id: row._id,
                    name: row.name
                });
            });
            setBrands(rows);
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
            const res = await BranchService.getAll(selectBrand);
            const rows = [];
            res.data.body.forEach(row => {
                rows.push({
                    id: row._id,
                    name: row.name
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

    const logout = () => {
        dispatch(clearCurrentUser());
        if (params.idBrand) {
            navigate(`/brands/${params.idBrand}/login`, {replace: true});
        }
        else {
            navigate('/login', {replace: true});
        }
    }

    const handlerOpenModalReset = () =>  {
        try {
            setOpenModalReset(true);
            // const urlApi = `http://${window.location.hostname}:4000/api/sucursal`;
            // const res = await axios.get(urlApi, { 
            //     headers: {
            //         'auth': localStorage.getItem('token')
            //     }
            // });

            // if (res.data.body.length) {
            //     const auxSucursals = res.data.body.sort(( a, b ) => {
            //         if ( a.name < b.name ){
            //           return -1;
            //         }
            //         if ( a.name > b.name ){
            //           return 1;
            //         }
            //         return 0;
            //     });

            //     setSucursals(auxSucursals);
            //     setSelectSucursal(auxSucursals[0].name);
            // }
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

    const handlerCloseModalReset = () =>  {
        setOpenModalReset(false);
    }

    const onChangeBranch = (idBranch) => {
        setSelectBranch(idBranch);
    }

    const onChangeBrand = (idBrand) => {
        setSelectBrand(idBrand);
    }

    const handleAcceptConfirm = async () => {
        try {
            await BranchService.reset(selectBrand, selectBranch);
            dispatch(setAlertsList([
                {message: 'Reinicio exitoso.', visible: true, severity: 'success'}
            ]));
            handleCloseConfirm();
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

    const handleOpenConfirm = () => {
        if (selectBranch !== '') {
            setOpenConfirm(true);    
        }
    }

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    }

    return [
        user, toggleTurn, setToggleTurn, logout, 
        openModalReset, handlerOpenModalReset, handlerCloseModalReset,
        selectBranch, onChangeBranch, branches,
        openConfirm, handleCloseConfirm, handleOpenConfirm, handleAcceptConfirm,
        getBrands, selectBrand, setSelectBrand,
        onChangeBrand, brands
    ];
}
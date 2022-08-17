import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { BrandService } from "../services/brand";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useForm  } from "react-hook-form";

export const useBrand = () => {
    const user = useSelector((state) => state.currentUser.user);
    const [brand, setBrand] = useState(null);
    const [brands, setBrands] = useState([]);
    const [brandSelectedID, setBrandSelectedID] = useState([]);
    const [brandSelected, setBrandSelected] = useState([]);
    const [openFormBrand, setOpenFormBrand] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [isNew, setIsNew] = useState(true);
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [color, setColor] = useState({hex: "#782929"});

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({defaultValues: {
        color: color?.hex,
        name: '',
        myFiles: ''
    }});

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            localStorage.removeItem('brand');
        }
        
        if (params.idBrand) {
            getBrand(params.idBrand);
        }
        else {
            const storeBrand = localStorage.getItem('brand');
            if (storeBrand) {
                setBrand(JSON.parse(storeBrand));
            }
        }
    }, [user]);// eslint-disable-line react-hooks/exhaustive-deps

    const getBrand = async (idBrand) => {
        try {
            const path = location.pathname.split('/');
            if ((user && user.rol !== 'Super-Admin') || 
                 path.includes('login') || 
                 path.includes('screen') || 
                 path.includes('test') || 
                 path.includes('takeTurn')) 
            {
                const storeBrand = localStorage.getItem('brand');
                if (!storeBrand) {
                    const res = await BrandService.get(idBrand);
                    if (res.status === 204) {
                        navigate(`/notFound`, {replace: true});
                    }
                    else {
                        setBrand(res.data.body);
                        localStorage.setItem('brand', JSON.stringify(res.data.body));
                    }
                }
                else if (storeBrand) {
                    const auxBrand = JSON.parse(storeBrand);
                    if (auxBrand._id !== idBrand) {
                        const res = await BrandService.get(idBrand);
                        if (res.status === 204) {
                            navigate(`/notFound`, {replace: true});
                        }
                        else {
                            setBrand(res.data.body);
                            localStorage.setItem('brand', JSON.stringify(res.data.body));
                        }
                    }
                    else {
                        setBrand(JSON.parse(localStorage.getItem('brand')));
                    }
                }
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

            navigate(`/notFound`, {replace: true});
        }
    }

    const getBrands = async () => {
        try {
            const res = await BrandService.getAll();
            const rows = [];
            res.data.body.forEach(row => {
                rows.push({
                    id: row._id,
                    name: row.name,
                    url: row.url,
                    color: row.color,
                    pathLogin: `${window.location.hostname}:${window.location.port}/brands/${row._id}/login`
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

    const handlerOnSelectionModelChange = (ids) => {
        const auxData = [];
        ids.forEach(id => {
            const data = brands.find(item => item.id === id);
            auxData.push(data);
        });

        setBrandSelected(auxData);
        setBrandSelectedID(ids);
    }

    const onSubmit = data => handlerSave(data);

    const handlerSave = async (data) => {
        try {
            if (isNew) {
                const res = await BrandService.create(data);

                const auxBrands = [...brands];
                const newBrand = res.data.body;
                auxBrands.push({
                    id: newBrand._id,
                    name: newBrand.name,
                    url: newBrand.url,
                    color: newBrand.color,
                    pathLogin: `${window.location.hostname}:${window.location.port}/brands/${newBrand._id}/login`
                });
                setBrands(auxBrands);
                setOpenFormBrand(false);
                dispatch(setAlertsList([
                    {message: "Cambios exitosos.", visible: true, severity: 'success'}
                ]));
            }
            else {
                const item = brandSelected[0];
                const res = await BrandService.update(item.id, data);
                const newBrand = res.data.body;
                const auxBrands = [...brands];
                for (let index = 0; index < auxBrands.length; index++) {
                    let element = {...auxBrands[index]};
                    if (element.id === item.id) {
                        element = {
                            id: newBrand._id,
                            name: newBrand.name,
                            url: newBrand.url,
                            color: newBrand.color,
                            pathLogin: `${window.location.hostname}:${window.location.port}/brands/${newBrand._id}/login`
                        }

                        auxBrands[index] = element;
                        break;
                    }
                }
                setBrands(auxBrands);
                setOpenFormBrand(false);
                setBrandSelected([]);
                setBrandSelectedID([]);
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
            let auxBrands = [...brands];
            for (let index = 0; index < brandSelectedID.length; index++) {
                const id = brandSelectedID[index];
                await BrandService.delete(id);
                auxBrands = auxBrands.filter(b => b.id !== id);
            }
            
            setBrands(auxBrands);
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

    const handlerOpenFormBrand = (val) => {
        setIsNew(val);
        if (brandSelected.length === 1 && !val) {
            const item = brandSelected[0];
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
            if (brands.length > 0) {
                const item = brands[0];
                
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
        setOpenFormBrand(true);
    };

    const handlerCloseFormBrand = () => {
        setOpenFormBrand(false);
    };

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

    const copyUrlLogin = (url) => {
        navigator.clipboard.writeText(url);
    }

    return [
        brand, 
        getBrands, brands,
        handlerOnSelectionModelChange, brandSelectedID,
        brandSelected,
        openFormBrand,
        handlerOpenFormBrand,
        handlerCloseFormBrand,
        isNew,
        color,
        handlerChangeColor,
        control,
        errors,
        handleSubmit,
        onSubmit,
        openConfirm,
        handleAcceptConfirm,
        handleShowConfirm,
        copyUrlLogin
    ];
};
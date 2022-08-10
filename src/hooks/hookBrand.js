import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { BrandService } from "../services/brand";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

export const useBrand = () => {
    const user = useSelector((state) => state.currentUser.user);
    const [brand, setBrand] = useState(null);
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            console.log(user);
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

    return [brand];
};
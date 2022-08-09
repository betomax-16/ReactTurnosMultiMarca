import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { BrandService } from "../services/brand";
import { useParams, useNavigate } from "react-router-dom";

export const useBrand = () => {
    const [brand, setBrand] = useState(null);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            localStorage.removeItem('brand');
        }
        
        if (params.idBrand) {
            getBrand(params.idBrand);
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const getBrand = async (idBrand) => {
        try {
            const res = await BrandService.get(idBrand);
            setBrand(res.data.body);
            localStorage.setItem('brand', JSON.stringify(res.data.body));
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
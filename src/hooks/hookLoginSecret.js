import { useDispatch } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { LoginService } from "../services/login";
import { useBrand } from "./hookBrand";
import { useParams, useNavigate } from "react-router-dom";

export const useLoginSecrete = () => {
    const [brand] = useBrand();
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async (data) => {
        try {
            const res = await LoginService.loginSecret(params.idBrand, params.idBranch, data);
            localStorage.setItem('secret-token', res.data.body.token);
            const split = window.location.pathname.split('/');
            const dir = split[split.length - 2];
            if (params.idModule) {
                navigate(`/brands/${params.idBrand}/branches/${params.idBranch}/modules/${params.idModule}/${dir}`);
            }
            else {
                navigate(`/brands/${params.idBrand}/branches/${params.idBranch}/${dir}`);
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
    };

    return [login, brand];
};
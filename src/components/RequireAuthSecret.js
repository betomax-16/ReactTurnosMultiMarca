import jwt from 'jwt-decode';
import { useEffect } from "react";
import { LoginService } from "../services/login";
import { useDispatch } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { useParams, useNavigate } from "react-router-dom";
import { BranchService } from "../services/branch";

export function RequireAuthSecret({children}) {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            try {
                const res = await BranchService.get(params.idBrand, params.idBranch);
                if (res.data.statusCode !== 200) {
                    navigate(`/notFound`);
                }
                else {
                    const token = localStorage.getItem('secret-token');
                    if (token) {
                        const userToken = jwt(token);
                        await LoginService.loginSecret(params.idBrand, params.idBranch, {secretCode: window.atob(userToken.secretCode)});    
                    }
                    else {
                        const split = window.location.pathname.split('/');
                        const dir = split[split.length - 1];
                        navigate(`/brands/${params.idBrand}/branches/${params.idBranch}/${dir}/login`, {replace: true});
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

                localStorage.removeItem('secret-token');
                const split = window.location.pathname.split('/');
                const dir = split[split.length - 1];
                navigate(`/brands/${params.idBrand}/branches/${params.idBranch}/${dir}/login`, {replace: true});
            }
        }

        init();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return children;
};
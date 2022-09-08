import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { useParams, useNavigate } from "react-router-dom";
import { BranchService } from "../services/branch";

export function RequireNoAuthSecret({children}) {
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
                    const split = window.location.pathname.split('/');
                    const dir = split[split.length - 2];
                    if (token) {
                        if (params.idModule) {
                            navigate(`/brands/${params.idBrand}/branches/${params.idBranch}/modules/${params.idModule}/${dir}`, {replace: true});
                        }
                        else {
                            navigate(`/brands/${params.idBrand}/branches/${params.idBranch}/${dir}`, {replace: true});
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
            }
        }
        
        init();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return children;
};
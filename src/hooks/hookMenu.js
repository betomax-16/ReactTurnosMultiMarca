import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { setAlertsList } from '../redux/splices/alertSlice';
import { clearCurrentUser,loadCurrentUser } from '../redux/splices/currentUserSlice';

export const useMenu = () => {
    const user = useSelector((state) => state.currentUser.user);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [toggleTurn, setToggleTurn] = useState(false);

    useEffect(() => {
        try {
            dispatch(loadCurrentUser());    
        } catch (error) {
            dispatch(setAlertsList([
                {message: error.message, visible: true, severity: 'error'}
            ]))
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const logout = () => {
        dispatch(clearCurrentUser());
        if (params.idBrand) {
            navigate(`/brands/${params.idBrand}/login`, {replace: true});
        }
        else {
            navigate('/login', {replace: true});
        }
    }

    const handlerOpenModalSucursal = () =>  {

    }

    return [user, toggleTurn, setToggleTurn, logout, handlerOpenModalSucursal];
}
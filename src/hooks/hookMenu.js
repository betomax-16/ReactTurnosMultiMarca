import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setAlertsList } from '../redux/splices/alertSlice';
import { clearCurrentUser,loadCurrentUser } from '../redux/splices/currentUserSlice';

export const useMenu = () => {
    const user = useSelector((state) => state.currentUser.user);
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

    useEffect(() => {
        console.log(user);
    }, [user]);

    const logout = () => {
        dispatch(clearCurrentUser());
        navigate('/login', {replace: true});
    }

    const handlerOpenModalSucursal = () =>  {

    }

    return [user, toggleTurn, setToggleTurn, logout, handlerOpenModalSucursal];
}
import { useDispatch } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { saveCurrentUser } from '../redux/splices/currentUserSlice';
import { LoginService } from "../services/login";

export const useLogin = () => {
    const dispatch = useDispatch();

    const login = async (data) => {
        try {
            const res = await LoginService.loginSuperAdmin(data);
            dispatch(saveCurrentUser(res.data.body.token));
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

    return [login];
};
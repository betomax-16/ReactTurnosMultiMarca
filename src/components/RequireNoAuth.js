import jwt from 'jwt-decode';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { clearCurrentUser } from '../redux/splices/currentUserSlice';
import { useNavigate, useParams } from "react-router-dom";

export function RequireNoAuth({children}) {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser.user);
  const token = localStorage.getItem('token');
    
  useEffect(() => {
    if (user) {
      redirects(user);
    }
    else {
      if (token) {
        try {
          const userAux = jwt(token);
          const dateExp = new Date(userAux.exp);
          const dateNow = new Date().getTime();
          if (dateExp < dateNow / 1000) {
            dispatch(setAlertsList([
              {message: 'Token caducado.', visible: true, severity: 'error'}
            ]));
            // dispatch(clearCurrentUser());

            if (params.idBrand) {
              navigate(`/brands/${params.idBrand}/login`, {replace: true});
            }
            else {
              navigate(`/login`, {replace: true});
            }
          }

          redirects(userAux);
        } catch (error) {
          dispatch(setAlertsList([
            {message: error.message, visible: true, severity: 'error'}
          ]));
          // dispatch(clearCurrentUser());
          
          if (params.idBrand) {
            navigate(`/brands/${params.idBrand}/login`, {replace: true});
          }
          else {
            navigate(`/login`, {replace: true});
          }
        }
      }
    }
  }, [user]);// eslint-disable-line react-hooks/exhaustive-deps

  const redirects = (userAux) => {
    switch (userAux.rol.toLowerCase()) {
      case 'super-admin':
          navigate('/panel/brands', {replace: true});
        break;
      case 'admin':
          navigate(`/brands/${params.idBrand}/panel/branches`, {replace: true});
        break;
      case 'sub-admin':
          navigate(`/brands/${params.idBrand}/panel/branches`, {replace: true});
        break;
      case 'recepcionista':
          navigate(`/brands/${params.idBrand}/reception`, {replace: true});
        break;
      case 'vigia':
          navigate(`/brands/${params.idBrand}/supervisor`, {replace: true});
        break;
      default:
          dispatch(clearCurrentUser());
          dispatch(setAlertsList([
            {message: 'Sin permisos de acceso.', visible: true, severity: 'error'}
          ]));
        break;
    }
  }

  return children;
};
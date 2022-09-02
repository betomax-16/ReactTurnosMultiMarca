import { Navigate, useParams } from "react-router-dom";

export function RequireAuth({children}) {
    const params = useParams();    
    const token = localStorage.getItem('token');

    const redirect = () => {
        let component = children;
        let path = '/login';
        if (!token) {
            if (params.idBrand) {
                path = `/brands/${params.idBrand}/login`;
            }
            component = <Navigate to={path} replace={true}/>;
        }

        return component;
    }

    return redirect();
};
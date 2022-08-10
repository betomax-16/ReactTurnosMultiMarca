import { useNavigate, useParams } from "react-router-dom";
import { useBrand } from "../../../../../hooks/hookBrand";
import { useSelector } from 'react-redux';
import { useEffect } from "react";


export function Report() {
    useBrand();
    const navigate = useNavigate();
    const params = useParams();
    const user = useSelector((state) => state.currentUser.user);

    useEffect(() => {
        if ((user?.rol === 'Admin' || user?.rol === 'Sub-Admin') && !params.idBrand) {
            const brandStore = JSON.parse(localStorage.getItem('brand'));
            navigate(`/brands/${brandStore?._id}/panel/turns/report`, {replace: true});
        }
        else if (user?.rol === 'Super-Admin' && params.idBrand) {
            navigate(`/panel/turns/report`, {replace: true});
        }
    }, [user]);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <h1>Reports</h1>
    );
}